<template>
    <div class="boxes cage" :class="{ hidden: !show }">
        <box class="" :config="boxes['login-bt-top']"></box>
        <box class="bg-dark" :config="boxes['create-dataset']"></box>
        <box class="bg-dark" :config="boxes.recent"></box>
        <box class="bg-dark" :config="boxes['my-datasets']"></box>
        <box :config="boxes.globe"></box>
        <box class="bg-dark" :config="boxes['register']"></box>
        <box class="bg-dark" :config="boxes.login"></box>
        <login-animation :config="boxes['login-animation']"></login-animation>
        <flow-show :config="boxes['flow-show']"></flow-show>
    </div>
</template>

<script>
//
import Box from '@/components/Box.vue'
import LoginAnimation from '@/components/LoginAnimation.vue'
import FlowShow from '@/components/FlowShow.vue'
import BoxDefinitions from '@/js/R2UiBoxDefinitions.js'
//
export default {
    components: {
        Box,
        LoginAnimation,
        FlowShow
    },
    data() {
        return {
            viewMode: 'home',
            show: false,
            boxes: new BoxDefinitions().boxes
        }
    },
    created() {
        window.globals.eventBus.$on('click', this.onClick)
        _.each(this.boxes, (box, key) => {
            box.id = box.id ? box.id : key
            box.visible = false
            box.views = box.views ? box.views : { [box.id]: {} }
            _.each(box.views, (view, key) => {
                view.visible = false
                view.id = view.id ? view.id : key
                view.elements = view.elements ? view.elements : {}
                view.zones = view.zones ? view.zones : {}
            })
        })
        console.log('obj:fc this.boxes = ', this.boxes)
    },
    mounted() {
        this.setViewMode('init')
        setTimeout(() => {
            this.show = true
            // this.setViewMode('mywork')
            this.setViewMode('home')
            // this.setViewMode('register')
        }, 400)
    },
    methods: {
        onClick(evt) {
            evt.box = evt.box || { id: null }
            console.log('CG:onClick evt = ', evt)
            let options = {}
            switch (true) {
                case evt.key === 'close':
                    if (evt.box.id === 'create-dataset') {
                        return this.setViewMode('mywork', options)
                    }
                    if (evt.box.id === 'login') {
                        options.globe = { delay: 0 }
                    }
                    return this.setViewMode('home', options)
                case evt.key === 'register':
                    return this.setViewMode('register', options)
                case evt.key === 'bt-continue' && evt.box.id === 'register':
                case evt.key === 'bt-send' && evt.box.id === 'register':
                    options.register = {
                        view: evt.args.view
                    }
                    return this.setViewMode('register', options)
                case evt.key === 'login':
                    return this.setLoggedIn()
                case evt.key === 'login-start' && evt.box.id === 'login-bt-top':
                    return globals.eventBus.$emit('trigger-login-animation')
                case evt.key === 'login-start':
                    return this.setViewMode('login')
                case evt.box.id === 'my-datasets':
                    switch (evt.key) {
                        case 'view-back':
                            return this.setViewMode('mywork')
                        case 'show-history':
                            options['my-datasets'] = {
                                view: 'dataset-history'
                            }
                            return this.setViewMode('mywork', options)
                        case 'create-dataset':
                            return this.setViewMode('create-dataset')
                    }

                default:
                    this.setViewMode('home')
            }
        },
        setLoggedIn() {
            $('.nav.quick-actions').removeClass('hidden')
            this.$store.dispatch('setLoggedInState', true)
            this.setViewMode('mywork')
        },
        setViewMode(mode, options = {}) {
            const speed = 0.5
            console.log('CG:setViewMode this.viewMode, mode = ', this.viewMode, mode)
            this.viewMode = mode || 'home'

            let path = 'Home'
            switch (this.viewMode) {
                case 'login':
                    path = 'Home / Login'
                    break
                case 'register':
                    path = 'Home / Create an Account'
                    break
                case 'mywork':
                    path = 'Home / My Work'
                    break
                case 'create-dataset':
                    path = 'Home / My Work / Create New Dataset'
                    break
            }
            this.$store.dispatch('setSubPath', path)

            //
            const tg = '.cage.boxes'
            const goOuts = Object.keys(this.boxes)
            // const goOuts = 'recent,register,globe'.split(',')
            _.each(goOuts, key => {
                gsap.to($(`${tg} .${key}`), speed, {
                    opacity: 0,
                    ease: Expo.easeOut
                })
                this.boxes[key].visible = false
            })
            let goIns = {}
            switch (mode) {
                case 'init':
                    break
                case 'home':
                    goIns = { recent: { delay: 0.1, speed: 0.8 } }
                    if (!this.$store.state.loggedIn) {
                        goIns.globe = { delay: 0.3, speed: 0.8 }
                        goIns['login-animation'] = { delay: 0.4, speed: 0.8 }
                        goIns['flow-show'] = { delay: 0.9, speed: 6 }
                    }
                    goIns['login-bt-top'] = { delay: 0, speed: 0.1 }

                    globals.eventBus.$emit('reset-login-animation')
                    break
                case 'mywork':
                    // goIns = { 'my-datasets': { delay: 0.1, speed: 0.8 } }
                    goIns = { 'my-datasets': { delay: 0.25, speed: 0.6 } }
                    globals.eventBus.$emit('reset-login-animation')
                    break

                case 'create-dataset':
                    goIns = { 'create-dataset': { delay: 0.25, speed: 0.6 } }
                    globals.eventBus.$emit('reset-login-animation')
                    break

                case 'register':
                    console.log('setViewMode:register options = ', options)
                    goIns = { register: { delay: 0.25, speed: 0.6, view: 'step-1' } }
                    if (options.register && options.register.view) {
                        goIns.register.view = options.register.view
                    }
                    globals.eventBus.$emit('reset-login-animation')
                    break
                case 'login':
                    goIns = {
                        recent: {},
                        login: { delay: 0, speed: 0.5 },
                        'login-animation': {},
                        globe: { opacity: 0.35, speed: 0.8 }
                    }
                    break
            }

            console.log('CG:setViewMode goIns = ', goIns)

            _.each(goIns, (args, boxId) => {
                // handle the box
                gsap.killTweensOf($(`${tg} .${boxId}`))
                let prms = { ...args }
                if (options[boxId]) {
                    prms = { ...args, ...options[boxId] }
                }
                prms.view = prms.view || boxId
                // console.log('CG:setViewMode:E1 prms = ', prms)
                // console.log('CG:setViewMode:E1 this.boxes[boxId] = ', this.boxes[boxId])

                // console.log('CG:setViewMode:E1 boxId = ', boxId)

                this.boxes[boxId].visible = true
                const sp = _.isNumber(prms.speed) ? prms.speed : speed
                gsap.to($(`${tg} .${boxId}`), sp, {
                    opacity: _.isNumber(prms.opacity) ? prms.opacity : 1,
                    delay: _.isNumber(prms.delay) ? prms.delay : 0,
                    ease: Expo.easeOut
                })

                // handle the different views inside the box

                const view = this.boxes[boxId].views[prms.view]

                _.each(this.boxes[boxId].views, vu => {
                    if (view !== vu) {
                        gsap.killTweensOf($(`${tg} .${boxId} .${vu.id}`))
                        gsap.set($(`${tg} .${boxId} .${vu.id}`), {
                            clearProps: 'all'
                        })
                        vu.visible = false
                    }
                })

                console.log('CG:setViewMode:E1 boxId = ', boxId)
                console.log('CG:setViewMode:E1 prms.view = ', prms.view)
                console.log('CG:setViewMode:E1 this.boxes[boxId] = ', this.boxes[boxId])

                // const view = this.boxes[boxId].views[prms.view]
                console.log('CG:setViewMode:E1 view = ', view)
                // console.log('CG:setViewMode:E1 SEL = ', `${tg} .${boxId} .${view.id}`)

                if (!view.visible) {
                    view.visible = true
                    gsap.to($(`${tg} .${boxId} .${view.id}`), 0.3, {
                        opacity: 1,
                        delay: 0.1,
                        ease: Expo.easeOut
                    })
                }
            })
        }
    }
}
</script>
