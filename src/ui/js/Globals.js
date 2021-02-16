import EventBus from 'mitt'
import { reactive, readonly } from 'vue'

function Globals() {
    //
    // Global Event Bus, keep vue 2.6 compatibility
    //
    const gBus = new EventBus()
    this.eventBus = {
        $on: gBus.on,
        $off: gBus.off,
        $emit: gBus.emit
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
            sortDirection: ''
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
        this.updateSearchTerm = (searchTerm = '') => {
            state.searchTerm = searchTerm
            update()
        }
        this.updateSortDirection = (direction = '') => {
            state.sortDirection = direction
            update()
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
