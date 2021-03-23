import EventBus from 'mitt'
import { reactive, readonly } from 'vue'

function Globals() {
    //
    // Global Event Bus, keep vue 2.6 compatibility
    //
    const gBus = new EventBus()
    let pastEvents = {}
    const emit = (id, props = {}) => {
        const ts = new Date().getTime()
        const deltaMsec = 100
        let send = true
        _.each(pastEvents, (pEvt, pKey) => {
            pKey *= 1
            const diff = ts - pKey
            if (diff > deltaMsec) {
                delete pastEvents[pKey]
            } else {
                if (pEvt.id === id) {
                    if (_.isEqual(pEvt.props, props)) {
                        send = false
                    }
                }
            }
        })

        if (send) {
            pastEvents[ts] = { id, props: _.cloneDeep(props) }
            gBus.emit(id, props)
            console.log('BUS:SEND id, props = ',id, props)
        } else {
            console.warn('EVENTBUS: Double Event Detected, not sended:  id, props = ', id, props)
        }
    }
    this.eventBus = {
        $on: gBus.on,
        $off: gBus.off,
        $emit: emit
    }

    // uiStore, solution is Vue.js 3 only, uses 'reactive'
    // for vue 2.6, watch out for a solution based on 'observable'
    // Use a isolated store to prevent collisions on vuex-store on integration

    const UiStore = function() {
        const state = reactive({
            uKey: 0,
            rKey: 0,
            useNativeScroll: true,
            api: '',
            preloadActive: false,
            deviceClasses: '',
            mediaTag: '',
            os: '',
            isMobile: false,
            innerWidth: 0,
            innerHeight: 0,
            subPath: '',
            // search handling
            searchTerm: '',
            orderBy: '', // asc, desc
            sortBy: '', // Date, Size, ...
            pageNum: 0 // Date, Size, ...
        })
        this.state = readonly(state)

        const update = () => {
            state.uKey++
            if (state.uKey > 1000) {
                state.uKey = 0
            }
        }

        // dispatch: keep compatibility with the access model of vuex store
        this.dispatch = (target, args) => {
            this[target](args)
        }
        // access the mutations directly is also possible
        this.setNativeScrollState = yes => {
            state.useNativeScroll = yes
        }
        this.setPreloadActiveState = yes => {
            state.preloadActive = yes
        }
        this.setSubPath = path => {
            state.subPath = path
        }
        this.updateDevice = deviceStates => {
            state.deviceClasses = deviceStates.classes
            state.os = deviceStates.os
            state.mediaTag = deviceStates.mediaTag
            state.isMobile = deviceStates.isMobile
            state.innerWidth = deviceStates.innerWidth
            state.innerHeight = deviceStates.innerHeight
        }
        this.orientationChanged = () => {
            state.rKey++
            if (state.rKey > 1000) {
                state.rKey = 0
            }
        }
        this.setApi = (api = 'mock') => {
            state.api = api
        }
        this.updateSearch = (options = {}) => {
            const keys = Object.keys(options)
            _.each(keys, key => {
                state[key] = options[key]
            })
            update()
        }
        this.getStates = states => {
            const s = _.isArray(states) ? states : states.split(',')
            const res = {}
            _.each(s, key => {
                res[key] = state[key]
            })
            return res
        }
    }

    this.uiStore = new UiStore()

    //
    // Resize Engine, needed for device manager
    //
    const dimensions = {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    }

    const onResize = evt => {
        const prev = { ...dimensions }
        dimensions.innerWidth = evt.target.innerWidth
        dimensions.innerHeight = evt.target.innerHeight
        this.eventBus.$emit('windowResized', {
            prev,
            now: { ...dimensions },
            dWidth: evt.target.innerWidth - prev.innerWidth,
            dHeight: evt.target.innerHeight - prev.innerHeight
        })
    }

    window.addEventListener('resize', onResize)

    this.getDimensions = () => dimensions

    //
    this.registerI18n = () => null
    this.registerStore = () => null
    this.registerRouter = () => null
    this.init = () => null

    let uid = 0
    this.getUid = () => `uid-${++uid}`
}

export default Globals
