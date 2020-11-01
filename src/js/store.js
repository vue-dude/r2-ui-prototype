import { createStore } from 'vuex'

const store = createStore({
    state: {
        preloadActive: false,
        loggedIn: false,
        deviceClasses: '',
        mediaTag: '',
        os: '',
        isMobile: false,
        innerWidth: 0,
        innerHeight: 0,
        rKey: 0,
        subPath: 'HOME'
    },
    actions: {
        setPreloadActiveState(context, yes) {
            this.state.preloadActive = yes
        },
        setLoggedInState(context, yes) {
            this.state.loggedIn = yes
        },
        setSubPath(context, path) {
            this.state.subPath = path
        },
        updateDevice(context, deviceStates) {
            this.state.deviceClasses = deviceStates.classes
            this.state.os = deviceStates.os
            this.state.mediaTag = deviceStates.mediaTag
            this.state.isMobile = deviceStates.isMobile
            this.state.innerWidth = deviceStates.innerWidth
            this.state.innerHeight = deviceStates.innerHeight
        },
        orientationChanged(context) {
            this.state.rKey++
            if (this.state.rKey > 1000) {
                this.state.rKey = 0
            }
        }
    }
})

export default store
