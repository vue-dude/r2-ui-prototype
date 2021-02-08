import EventBus from 'mitt'
const gBus = new EventBus()

function Globals() {
    //
    // Global Event Bus, keep vue 2.6 compatibility
    //
    this.eventBus = {
        $on: gBus.on,
        $off: gBus.off,
        $emit: gBus.emit
    }
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
    // 
    //

    //
    this.registerI18n = () => null
    this.registerStore = () => null
    this.registerRouter = () => null
    this.init = () => null

    let uid = 0
    this.getUid = () => `uid-${++uid}`
}

export default Globals
