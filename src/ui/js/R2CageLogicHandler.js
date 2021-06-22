function R2CageLogicHandler(vm) {
    //
    // Handles the logical states and click matrix
    //
    //
    let viewMode = 'home'
    let viewModePrev = null
    let isPrivateView = false
    this.getIsPrivateView = () => isPrivateView
    let viewStack = []
    const preloaders = {}

    this.initData = () => {
        initBoxes()
    }

    this.init = () => {
        modifyViewStack({ action: 'reset' })
        if (globals.uiStore.state.webpEnabled) {
            setViewMode('home')
            globals.eventBus.$on('click', onClick)
            globals.eventBus.$on('preloaders', onUpdatePreloaders)
        } else {
            const options = {}
            options['r2-messages'] = {
                view: 'webp-not-available'
            }
            setViewMode('no-webp', options)
        }
    }

    const updateMockConfigMenuState = () => {
        const $cfm = $('.cage.boxes .mock-config .config-menu')
        if ($cfm.hasClass('hidden')) {
            $(document).one('mouseup', () => {
                console.log('WIN:CLICK value = ')
                $cfm.addClass('hidden')
            })
            $cfm.on('mouseup', evt => {
                evt.stopPropagation()
            })
            $('.el-select__popper').on('mouseup', evt => {
                evt.stopPropagation()
            })
            $cfm.removeClass('hidden')
        } else {
            $cfm.off('mouseup', evt => {
                evt.stopPropagation()
            })
            $('.el-select__popper').off('mouseup', evt => {
                evt.stopPropagation()
            })
            $cfm.addClass('hidden')
        }
    }

    const updateDatasetControls = (args = {}) => {
        const element = '.dataset-controls .elements .element'
        if (args.reset === true) {
            args.edit = false
            args.actions = false
        }
        const setEditState = yes => {
            let targets = [`${element}.head-crtl-bt-edit`, `${element}.head-crtl-bt-edit-active`]
            let t1 = yes ? targets[1] : targets[0]
            let t2 = yes ? targets[0] : targets[1]
            gsap.set($(t1), {
                visibility: 'visible'
            })
            gsap.set($(t2), {
                visibility: 'hidden'
            })
        }
        if (!_.isNil(args.edit)) {
            setEditState(args.edit)
        }

        const setActionsState = yes => {
            let targets = [`${element}.head-crtl-bt-actions`, `${element}.head-crtl-bt-actions-active`]
            let t1 = yes ? targets[1] : targets[0]
            let t2 = yes ? targets[0] : targets[1]
            gsap.set($(t1), {
                visibility: 'visible'
            })
            gsap.set($(t2), {
                visibility: 'hidden'
            })
            vm.boxes['dataset-controls'].views['dataset-controls'].modal = yes === true
        }

        if (!_.isNil(args.actions)) {
            setActionsState(args.actions)
        }
    }

    const updateMetaEditor = (key, cfg = {}) => {
        const viewKey = 'meta-actions-edit-generic'
        const view = vm.boxes['dataset-actions'].views[viewKey]
        const tabs = view.tabs
        _.each(tabs, tab => {
            tab.active = false
            if (cfg.dataKey) {
                tab.dataKey = cfg.dataKey
            }
        })
        const tabKey = `tab-${key}`
        const tab = tabs[tabKey]
        tab.active = true

        // !! for the preview, schemaKey has a redundant config here, by tab and by clicksource!
        // TODO cleanup this

        view.scroll.components['meta-generic'].config.schemaKey = tab.schemaKey
        view.scroll.components['meta-generic'].config.dataKey = tab.dataKey
        //
        globals.eventBus.$emit('updateMetaEditor')
        globals.eventBus.$emit('updateActiveView', { targets: ['dataset-actions'] })
    }

    //
    const modifyViewStack = (args = {}) => {
        args.key = args.key || 'home'
        args.action = args.action || 'reset'
        if (args.action === 'reset') {
            viewStack = [args.key]
        } else if (args.action === 'add') {
            if (_.last(viewStack) !== args.key) {
                viewStack.push(args.key)
            }
        } else if (args.action === 'remove') {
            viewStack.pop()
            if (viewStack.length === 0) {
                modifyViewStack({ action: 'reset' })
            }
        }
    }

    const getViewStack = () => {
        return [...viewStack].reverse()
    }

    const onUpdatePreloaders = evt => {
        console.log('CAGE:onUpdatePreloaders +++++++++++ evt = ', evt)

        _.each(evt.preloaders, plKey => {
            console.log('CAGE:onUpdatePreloaders plKey = ', plKey)

            const pl = preloaders[plKey] || {}
            console.log('CAGE:onUpdatePreloaders pl = ', pl)

            const cfg = _.get(vm.boxes, `${pl.target}.config`)
            console.log('CAGE:onUpdatePreloaders cfg = ', cfg)

            if (cfg) {
                cfg.active = evt.key === 'activate'
            }
        })
    }

    const onClick = evt => {
        evt.box = evt.box || { id: null }
        console.log('CG:onClick evt = ', evt)
        let options = { _00: { targets: null }, modalClosed: false }

        if (!vm.isModalOverlay && evt.key === 'toggle-mock-config-menu-state') {
            updateMockConfigMenuState()
        }
        switch (true) {
            case evt.viewKey === 'meta-actions-edit-generic' && evt.args.isViewTab:
                updateMetaEditor(evt.key)
                return null

            case evt.viewKey === 'meta-actions-edit-generic' && evt.key === 'save':
                globals.eventBus.$emit('invokeSaveDataAction', { targets: ['meta-actions-edit-generic'] })
        }

        // setTimeout(() => {
        //     activatePreloaders(evt)
        // }, 100)

        // central click matrix for the whole app
        switch (evt.key) {
            // cancel and close
            case 'modal-bg':
            case 'cancel':
            case 'confirm':
            case 'close':
            case 'save':
                // case 'head-nav-back':
                options.modalClosed = true
                updateDatasetControls({ reset: true })
                return setViewMode(getViewStack()[0], options)
            case 'head-crtl-bt-close':
            case 'head-nav-back':
                modifyViewStack({ action: 'remove' })
                return setViewMode(getViewStack()[0], options)
            // base views
            case 'public':
                modifyViewStack({ action: 'reset' })
                return setViewMode('home', options)
            case 'private':
                modifyViewStack({ key: 'mywork', action: 'reset' })
                return setViewMode('mywork', options)
            // main stack views

            // show - dataset

            case 'show-dataset': // live
                modifyViewStack({ key: 'public-dataset', action: 'add' })
                return setViewMode('public-dataset', options)

            case 'show-public-dataset': // mock
                modifyViewStack({ key: 'public-dataset', action: 'add' })
                return setViewMode('public-dataset', options)
            case 'show-private-dataset': // mock
                modifyViewStack({ key: 'private-dataset', action: 'add' })
                return setViewMode('private-dataset', options)
            case 'create-new-dataset':
                modifyViewStack({ key: 'initial-dataset', action: 'add' })
                updateDatasetControls({ edit: true, actions: false })
                return setViewMode('initial-dataset', options)
            case 'show-search-page':
                modifyViewStack({ key: 'search', action: 'add' })
                return setViewMode('search', options)
            // file list stuff
            case 'show-filelist-public':
                modifyViewStack({ key: 'file-list-public', action: 'add' })
                return setViewMode('file-list-public', options)
            case 'show-filelist-private':
                modifyViewStack({ key: 'file-list-private', action: 'add' })
                return setViewMode('file-list-private', options)

            case 'open-file-collection':
                options._00 = {
                    targets: { 'file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-open' } }
                }
                return setViewMode(getViewStack()[0], options)
            case 'close-file-collection':
                options._00 = {
                    targets: { 'file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-closed' } }
                }
                return setViewMode(getViewStack()[0], options)

            // actions and messages

            case 'head-crtl-bt-prototype-info':
                options['r2-messages'] = {
                    view: 'msg-prototype-info'
                }
                console.log('CLG:head-crtl-bt-prototype-info options = ', options)

                return setViewMode(`${getViewStack()[0]}`, options)

            case 'download-all':
                options['r2-messages'] = {
                    view: 'msg-large-dataset'
                }
                return setViewMode(`${getViewStack()[0]}`, options)

            case 'dataset-edit-on':
                updateDatasetControls({ edit: true })
                return null
            case 'dataset-edit-off':
                updateDatasetControls({ edit: false })
                return null
            case 'dataset-actions-on':
                updateDatasetControls({ actions: true })
                options['dataset-actions'] = {
                    view: 'dataset-actions-publish'
                }
                return setViewMode(viewMode, options)
            case 'dataset-actions-off':
                updateDatasetControls({ actions: false })
                options['dataset-actions'] = {
                    view: 'dataset-actions'
                }
                return setViewMode(viewMode, options)
            case 'edit-meta-authors':
            case 'edit-meta-papers':
            case 'edit-meta-common':
                options['dataset-actions'] = {
                    view: 'meta-actions-edit-generic'
                }
                updateMetaEditor(evt.key.split('-')[2], {
                    dataKey: evt.args.dataKey,
                    schemaKey: evt.args.schemaKey
                })
                return setViewMode(viewMode, options)
        }
    }

    // view mode/state, needs connection to routing later

    const setViewMode = (mode, options = {}) => {
        // console.log('CG:setViewMode viewMode viewModePrev = ', viewModePrev)
        // console.log('CG:setViewMode viewMode viewMode = ', viewMode)
        // console.log('CG:setViewMode viewMode mode = ', mode)
        // console.log('CG:setViewMode viewMode options = ', options)

        switch (mode) {
            case 'home':
            case 'mywork':
                if (viewModePrev && viewMode === mode) {
                    switch (true) {
                        case _.isObject(options['r2-messages']):
                        case options.modalClosed:
                            break
                        default:
                            return
                    }
                }
        }

        viewModePrev = viewMode
        viewMode = mode || 'home'

        // if (viewModePrev != viewMode) {
        //     deactivatePreloaders()
        // }

        console.log('CG:setViewMode options = ', options)
        let path = 'Home'
        let headInfo = {
            html: '',
            length: 0
        }
        let privateView = false
        switch (viewMode) {
            case 'no-webp':
                path = ''
                break
            case 'home':
                path = 'Welcome!'
                break
            case 'search':
                path = 'List & Search Datasets' // Search datasets
                headInfo = {
                    html: 'SEARCH DATASETS',
                    length: 250
                }
                break
            case 'public-dataset':
                path = 'View Dataset / DOI / 10.1002/0470841559.ch1'
                headInfo = {
                    html: 'VIEW DATASET',
                    length: 250
                }
                break
            case 'private-dataset':
            case 'dataset-actions':
                privateView = true
                headInfo = {
                    html: 'WORK ON MY DATASET',
                    length: 250
                }
                path = 'Work on my Dataset / Dual Color Imaging from a Single BF2 ...'
                break
            case 'initial-dataset':
                privateView = true
                headInfo = {
                    html: 'CREATE NEW DATASET',
                    length: 250
                }
                path = 'Create new Dataset'
                break
            case 'mywork':
                privateView = true
                path = 'My Work / List & Search Datasets'
                break
            case 'file-list-public':
                headInfo = {
                    html: 'FILES OF THIS DATASET',
                    length: 250
                }
                path = 'List & Search Files of Dataset / DOI / 10.1002/0470841559.ch1'
                break
            case 'file-list-private':
                headInfo = {
                    html: 'FILES OF MY DATASET',
                    length: 250
                }
                privateView = true
                path = 'List & Search Files of my Dataset / Dual Color Imaging from a Single BF2 ...'
                break
        }
        globals.uiStore.setSubPath(path)

        const animateAll = privateView !== isPrivateView
        isPrivateView = privateView
        const delay = vm.viewHandler.updateHeadNav(privateView, animateAll, headInfo)

        let goOuts = [...Object.keys(vm.boxes)]
        goOuts[goOuts.indexOf('main-nav')] = null
        goOuts[goOuts.indexOf('mock-config')] = null
        if (options._00 && _.isPlainObject(options._00.targets)) {
            goOuts = [...Object.keys(options._00.targets)]
        }

        let goIns = {}

        switch (viewMode) {
            // v2
            case 'no-webp':
                goOuts.push('mock-config')
                goOuts.push('main-nav')
                goIns = {
                    // 'landing-page': { delay: 0.1, speed: 0.8 }
                    'r2-messages': { delay: 0.1, speed: 0.4 }
                }
                break

            case 'home':
                goIns = {
                    'landing-page': { delay: 0.1, speed: 0.8 },
                    'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-prototype-info' },
                    'r2-messages': { delay: 0.1, speed: 0.4 }
                }
                break
            case 'mywork':
                goIns = {
                    'mywork-page': { delay: 0.1, speed: 0.8 },
                    'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-new-dataset-only' }
                }
                break
            case 'search':
                goIns = {
                    'search-page': { delay: 0.1, speed: 0.8 },
                    'search-page-facets-dn-inner': { delay: 0.1, speed: 0.8 },
                    'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-prototype-info' },
                    'r2-messages': { delay: 0.1, speed: 0.4 }
                }
                break
            case 'public-dataset':
                goIns = {
                    'dataset-view-public': { delay: 0.1, speed: 0.4 },
                    'head-controls': { delay: 0.1, speed: 0.4 },
                    'r2-messages': { delay: 0.1, speed: 0.4 }
                }
                break
            case 'private-dataset':
            case 'initial-dataset':
                goIns = {
                    'dataset-view-private-content': {
                        delay: 0.1,
                        speed: 0.4,
                        view: 'dataset-view-private-content'
                    },
                    'dataset-view-private-infos': {
                        delay: 0.1,
                        speed: 0.4,
                        view: 'dataset-view-private-infos'
                    },
                    'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-new-dataset-only' },
                    'dataset-controls': { delay: 0.1, speed: 0.4 },
                    'r2-messages': { delay: 0.1, speed: 0.4 },
                    'dataset-actions': { delay: 0, speed: 0.4 }
                }
                if (viewMode === viewModePrev) {
                    goIns['dataset-controls'] = { delay: 0, speed: 0 }
                }
                if (viewMode === 'initial-dataset') {
                    goIns['dataset-view-private-content'].view = 'dataset-view-private-init-content'
                    goIns['dataset-view-private-infos'].view = 'dataset-view-private-init-infos'
                }
                break
            case 'file-list-public':
            case 'file-list-private':
                goIns = {
                    'file-list': { delay: 0.1, speed: 0.4, view: 'file-list-collection-closed' },
                    'r2-messages': { delay: 0.1, speed: 0.4 },
                    'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-prototype-info' }
                }
                break
        }

        if (options._00 && options._00.targets) {
            goIns = options._00.targets
        }
        vm.viewHandler.animateOut(goOuts, goIns, options, delay)
    }
    //
    const initBoxes = () => {
        _.each(vm.boxes, (box, key) => {
            box.id = box.id ? box.id : key
            box.visible = box.visible || false
            box.modal = box.modal || false
            box.views = box.views ? box.views : { [box.id]: {} }
            _.each(box.views, (view, key) => {
                view.visible = view.visible || false
                view.modal = _.isBoolean(view.modal) ? view.modal : box.modal
                view.id = view.id || key
                // fixed
                // TODO unify structure, add 'fixed' ?
                view.tabs = view.tabs || {}
                view.elements = view.elements || {}
                view.components = view.components || {}
                view.zones = view.zones || {}
                // scrollable
                view.scroll = view.scroll || {}
                view.scroll.id = view.scroll.id || view.id
                view.scroll.elements = view.scroll.elements || {}
                view.scroll.components = view.scroll.components || {}
                view.scroll.zones = view.scroll.zones || {}
                // overlay
                view.overlay = view.overlay || {}
                view.overlay.elements = view.overlay.elements || {}
                view.overlay.components = view.overlay.components || {}
                view.overlay.zones = view.overlay.zones || {}
                _.each(view.overlay.components, (cmp, key) => {
                    if (cmp.component === 'preloader') {
                        console.log('CLH:initBoxes preloader key = ', key)
                        if (preloaders[key]) {
                            console.error('Preloader key  is not unique! box, view, pl-key : ', box.id, view.id, key)
                        } else {
                            preloaders[key] = {
                                target: `${box.id}.views.${view.id}.overlay.components.${key}`
                            }
                        }
                    }
                })
            })
        })
    }
}

export default R2CageLogicHandler
