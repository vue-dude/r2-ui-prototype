import EventBus from 'mitt'
const gBus = new EventBus()



function Globals() {
    this.eventBus = {
        $on: gBus.on,
        $off: gBus.off,
        $emit: gBus.emit
    }
    this.registerI18n = () => null
    this.registerStore = () => null
    this.registerRouter = () => null
    this.init = () => null

    let uid = 0
    this.getUid = () => `uid-${++uid}`
}






export default Globals
