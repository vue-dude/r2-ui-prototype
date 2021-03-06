import axios from 'axios'
import R2DataHandler from '@/ui/js/R2DataHandler'

function Datasource() {
    // ui prptptype

    let r2DataHandler = null
    this.getR2DataHandler = () => {
        if (!r2DataHandler) {
            r2DataHandler = new R2DataHandler()
        }
        return r2DataHandler
    }

    //
    let base = {
        cms: '/',
        pathMap: {},
        pathname: null
    }
    if (window.BASE_CONFIG) {
        base.cms = _.isString(window.BASE_CONFIG.cms) ? window.BASE_CONFIG.cms : base.cms
        base.pathMap = _.isPlainObject(window.BASE_CONFIG.pathMap) ? window.BASE_CONFIG.pathMap : base.pathMap
    }

    base.pathname = window.location.pathname.split('')
    while (base.pathname.length > 0 && base.pathname.pop() !== '/') {}
    base.pathname = `${base.pathname.join('')}/`

    _.each(base.pathMap, (path, key) => (base.pathMap[key] = _.replace(path, '{cms}/', base.cms)))

    console.log('DS:INIT window.BASE_CONFIG = ', window.BASE_CONFIG)
    console.log('DS:INIT base = ', base)
    console.log('DS:INIT base.pathMap = ', base.pathMap)

    const config = {
        pathMap: base.pathMap,
        structure: null,
        translations: {},
        setup: {}
    }

    console.log('DS:INIT config = ', config)

    const getConfig = () => config
    this.getConfig = getConfig

    const getPath = path => {
        if (path.substr(0, 1) === '/') {
            if (config.pathMap[path]) {
                if (config.pathMap[path].substr(0, 1) === '/') {
                    return `${base.pathname}${config.pathMap[path].substr(1)}`
                }
                return config.pathMap[path]
            }
            return `${base.pathname}${path.substr(1)}`
        }
        // this resolves a absolute path from a remote api
        return path
    }
    this.getPath = getPath

    const get = async (api, data = {}, options = {}) => {
        return axios.create().get(getPath(api), data, options)
    }

    this.getDatasets = async args => {
        console.log('DS:getDatasets args = ', args)
        // string	optional	Sort order (bestmatch or mostrecent). Prefix with minus to change form ascending to descending (e.g. -mostrecent).
        const dir = args.orderBy === 'ascending' ? 'bestmatch' : '-bestmatch'
        // TEST hardcoded
        // const res = await get(
        //     `https://zenodo.org/api/records/?q=${args.searchTerm}&sort=${dir}&page=${args.pageNum}&size=${args.size}`
        // )
        const res = await get('https://zenodo.org/api/records', {
            params: {
                q: args.searchTerm,
                sort: dir,
                page: args.pageNum,
                size: args.size
            }
        })
        const opts = {
            pageNum: args.pageNum,
            pageSize: args.size,
            resetData: args.resetData
        }

        r2DataHandler.addData(args.schemaKey, args.dataKey, res.data, opts)
        globals.eventBus.$emit('updateDataView', { schemaKey: args.schemaKey, dataKey: args.dataKey })
        return r2DataHandler.getData('datasets', 'pub-c819')
    }

    // const post = async (api, data = {}, options = {}) => {
    //     return axios.create().post(getPath(api), data, options)
    // }

    // const getValidI18nKey = i18nKey => {
    //     const trns = _.get(config.translations, `${globals.getLocale()}.${i18nKey}.__0`)
    //     return _.isString(trns) ? `${i18nKey}.__0` : i18nKey
    // }
    // this.getValidI18nKey = getValidI18nKey

    // only UI elements
    const setTranslationFallbacks = (translations, lng, key, i18n) => {
        let strg = _.get(translations, `${lng}.${i18n}`)
        if (!_.isString(strg)) {
            strg = _.get(translations, `${lng}._global.${key}`)
            if (!_.isString(strg)) {
                strg = key
            }
            _.set(translations, `${lng}.${i18n}`, strg)
        }
    }

    const addTranslations = trns => {
        console.log('DS:addTranslations trns = ', trns)
        // trns == new loaded
        _.each(trns, (tr, lng) => {
            _.each(config.structure.navigation, (l1, keyL1) => {
                setTranslationFallbacks(trns, lng, keyL1, l1.i18nKey)
                const add = _.get(trns, `${lng}.special.ui.nav.${keyL1}`) || {}
                add.icon = _.isString(add.icon) ? add.icon : keyL1
                config.structure.navigation[keyL1] = { ...l1, ...add }
                _.each(l1.sub, (l2, keyL2) => {
                    setTranslationFallbacks(trns, lng, keyL2, l2.i18nKey)
                    _.each(l2.sub, (l3, keyL3) => {
                        setTranslationFallbacks(trns, lng, keyL3, l3.i18nKey)
                    })
                })
            })
        })
        config.translations = _.merge(config.translations, trns) // TODO check _.defaultsDeep
    }

    const updateConfig = data => {
        config.setup.scrollHintDelayMsec = _.isNumber(data.setup.scrollHintDelayMsec)
            ? data.setup.scrollHintDelayMsec
            : 1500

        config.home = _.isArray(data.setup.home) ? data.setup.home : config.home
    }

    const getInitialData = () => {
        return getStructure().then(strc => {
            console.log('DS:getInitialData: strc = ', strc)
            return getTranslations().then(trns => {
                console.log('DS:getInitialData: trns = ', trns)
                addTranslations(trns)
                strc.translations = config.translations
                return strc
            })
        })
    }
    this.getInitialData = () => getInitialData()

    const getStructure = () => {
        if (config.structure) {
            return config.structure
        }
        console.log('DS:getStructure: config.structure = ', config.structure)
        return get('/structure')
            .then(res => {
                updateConfig(res.data)
                config.structure = generateStructure(res.data)
                console.log('DS:getStructure config.structure = ', config.structure)
                return config.structure
            })
            .catch(error => console.warn('DS:getStructure ERROR error.message = ', error.message))
    }
    this.getStructure = getStructure

    const getTranslations = () => {
        return get('/translations')
            .then(res => {
                config.translations = res.data // TODO merge
                return res.data
            })
            .catch(error => console.warn('DS:getTranslations ERROR error.message = ', error.message))
    }
    this.getTranslations = getTranslations

    const generateStructure = raw => {
        const navigation = {}
        const routes = []
        //
        // Commented out code as example for creating router and navigation by structure
        //
        // navigation
        // _.each(raw.structure, (itemL1, keyL1) => {
        //     const ui = _.get(raw, `ui.nav.${keyL1}`) || {}
        //     const nav = (navigation[keyL1] = { ...itemL1, ...ui })
        //     nav.i18nKey = `nav.${keyL1}.label`
        //     nav.sub = {}
        //     // router
        //     const mainRoute = {
        //         path: keyL1,
        //         // name: key,
        //         // alias: `${key}/*`,
        //         props: true,
        //         params: {
        //             mainKey: keyL1
        //         },
        //         meta: {
        //             mainKey: keyL1,
        //             subKey: null,
        //             i18nKey: `nav.${keyL1}.label`
        //         },
        //         children: []
        //     }
        //     routes.push(mainRoute)

        //     _.each(itemL1.sub, (itemL2, keyL2) => {
        //         // navigation
        //         itemL2 = _.isPlainObject(itemL2) ? itemL2 : {}
        //         itemL2.i18nKey = `nav.${keyL1}.sub.${keyL2}.label`
        //         itemL2.mainNav = itemL2.mainNav !== false
        //         itemL2.circleNav = itemL2.circleNav !== false
        //         // add to main navigation L2
        //         if (itemL2.mainNav) {
        //             navigation[keyL1].sub[keyL2] = itemL2
        //         }
        //         // add to circle navigation L2
        //         if (itemL2.circleNav) {
        //             config.circleNav.push(`/${keyL1}/${keyL2}`)
        //         }
        //         // router
        //         mainRoute.children.push({
        //             path: keyL2,
        //             props: true,
        //             params: {
        //                 subKey: keyL2
        //             },
        //             meta: {
        //                 mainKey: keyL1,
        //                 subKey: keyL2,
        //                 i18nKey: `nav.${keyL1}.sub.${keyL2}.label`
        //             }
        //         })
        //         const subRoute = _.last(mainRoute.children)
        //         subRoute.children = []

        //         _.each(itemL2.sub, (itemL3, keyL3) => {
        //             if (keyL3 !== '__0') {
        //                 // navigation
        //                 itemL3 = _.isPlainObject(itemL3) ? itemL3 : {}
        //                 itemL3.i18nKey = `nav.${keyL1}.sub.${keyL2}.sub.${keyL3}.label`
        //                 itemL3.mainNav = itemL3.mainNav !== false
        //                 itemL3.circleNav = itemL3.circleNav !== false
        //                 // add to main navigation L3
        //                 if (itemL3.mainNav) {
        //                     navigation[keyL1].sub[keyL2].sub[keyL3] = itemL3
        //                 }
        //                 // add to circle navigation L3
        //                 if (itemL3.circleNav) {
        //                     config.circleNav.push(`/${keyL1}/${keyL2}/${keyL3}`)
        //                 }
        //                 // router
        //                 subRoute.children.push({
        //                     path: keyL3,
        //                     props: true,
        //                     params: {
        //                         keyL3
        //                     },
        //                     meta: {
        //                         mainKey: keyL1,
        //                         subKey: keyL2,
        //                         keyL3,
        //                         i18nKey: `nav.${keyL1}.sub.${keyL2}.sub.${keyL3}.label`
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // })

        return {
            navigation,
            router: {
                root: raw.router,
                routes
            },
            setup: raw.setup
        }
    }
}

export default Datasource
