<template>
    <div class="boxes cage" :class="{ hidden: !show }">
        <box class="bg-darkXX" :config="boxes['main-nav']"></box>

        <box :config="boxes['login-bt-top']"></box>
        <box class="bg-dark" :config="boxes['create-dataset']"></box>
        <box class="bg-dark" :config="boxes['dataset']"></box>
        <box class="bg-dark" :config="boxes.recent"></box>
        <box class="bg-dark" :config="boxes['my-datasets']"></box>
        <!--  -->
        <box class="bg-dark" :config="boxes.inspector"></box>
        <box :config="boxes['inspector-nav']"></box>
        <!--  -->
        <box :config="boxes.globe"></box>
        <box class="bg-dark" :config="boxes['register']"></box>
        <box class="bg-dark" :config="boxes.login"></box>
        <login-animation :config="boxes['login-animation']"></login-animation>
        <!--  -->
        <flow-show :config="boxes['flow-show']"></flow-show>
        <!--  -->
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
            box.visible = box.visible || false
            box.views = box.views ? box.views : { [box.id]: {} }
            _.each(box.views, (view, key) => {
                view.visible = view.visible || false
                view.id = view.id ? view.id : key
                view.elements = view.elements ? view.elements : {}
                view.zones = view.zones ? view.zones : {}
            })
        })
        console.log('obj:fc this.boxes = ', this.boxes)
    },
    mounted() {
        this.setViewMode('init')
        this.setInspectorNavState('info')
        setTimeout(() => {
            this.show = true
            // this.setViewMode('mywork')
            this.setViewMode('home')
            // this.setViewMode('register')
        }, 400)
    },
    methods: {
        setInspectorNavState(key) {
            const tg = '.box.inspector-nav .element'
            $(tg).css('visibility', 'hidden')
            $(`${tg}.all`).removeAttr('style')
            $(`${tg}.${key}`).removeAttr('style')
        },
        onClick(evt) {
            evt.box = evt.box || { id: null }
            console.log('CG:onClick evt = ', evt)
            console.log('CG:onClick this.$store.state.loggedIn = ', this.$store.state.loggedIn)

            let options = { _00: { targets: null } }
            switch (true) {
                case evt.key === 'close':
                    //
                    // upfront, needs deper implementation
                    if (evt.box.id === 'dataset') {
                        if (this.$store.state.loggedIn) {
                            return this.setViewMode('mywork', options)
                        }
                        return this.setViewMode('home', options)
                    }
                    //
                    if (evt.box.id === 'create-dataset') {
                        return this.setViewMode('mywork', options)
                    }
                    if (evt.box.id === 'login') {
                        options.globe = { delay: 0 }
                    }
                    return this.setViewMode('home', options)
                case evt.key === 'show-dataset' && evt.box.id === 'recent':
                    options._NAV = {
                        // backOnCloseTo: 'home' // needs implementation
                    }
                    return this.setViewMode('view-dataset', options)
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
                case evt.key === 'private' && !this.$store.state.loggedIn:
                    return globals.eventBus.$emit('trigger-login-animation')

                case evt.key === 'private' && this.$store.state.loggedIn:
                    return this.setViewMode('mywork')

                case evt.key === 'public':
                    return this.setViewMode('home')

                case evt.key === 'login-start':
                    return this.setViewMode('login')
                case evt.box.id === 'my-datasets':
                    switch (evt.key) {
                        case 'view-back':
                            options._00 = {
                                targets: { 'my-datasets': { delay: 0, speed: 0.3 } }
                            }
                            return this.setViewMode('mywork', options)
                        case 'show-history':
                            options._00 = {
                                targets: { 'my-datasets': { delay: 0, speed: 0.3 } }
                            }
                            options['my-datasets'] = {
                                view: 'dataset-history'
                            }
                            return this.setViewMode('mywork', options)
                        case 'create-dataset':
                            return this.setViewMode('create-dataset')
                        case 'show-dataset':
                            options._NAV = {
                                // backOnCloseTo: 'mywork' // needs implementation
                            }
                            return this.setViewMode('view-dataset', options)
                    }
                case evt.box.id === 'inspector-nav':
                    options._00 = {
                        targets: { inspector: { delay: 0, speed: 0.3 } }
                    }
                    options.inspector = {
                        view: evt.key
                    }
                    this.setInspectorNavState(evt.key)
                    return this.setViewMode('mywork', options)
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
            let privateView = true
            switch (this.viewMode) {
                case 'home':
                    path = 'Home'
                    privateView = false
                    break
                case 'login':
                    path = 'Home / Login'
                    privateView = false
                    break
                case 'register':
                    path = 'Home / Create an Account'
                    privateView = false
                    break
                case 'mywork':
                    path = 'Home / My Work'
                    break
                case 'create-dataset':
                    path = 'Home / My Work / Create New Dataset'
                    break
                case 'view-dataset':
                    // privateView = this.$store.state.loggedIn
                    path = 'Home / View Dataset / Reproduction Data for: TRex, a fast multi-animal tracking system ...'
                    break
            }
            this.$store.dispatch('setSubPath', path)

            const tgBoxes = '.cage.boxes'
            let goOuts = [...Object.keys(this.boxes)]
            goOuts[goOuts.indexOf('main-nav')] = null
            if (options._00 && _.isPlainObject(options._00.targets)) {
                goOuts = [...Object.keys(options._00.targets)]
            }

            // const goOuts = 'recent,register,globe'.split(',')

            _.each(goOuts, key => {
                if (key) {
                    gsap.to($(`${tgBoxes} .${key}`), speed, {
                        opacity: 0,
                        ease: Expo.easeOut
                    })
                    this.boxes[key].visible = false
                }
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
                    // goIns['login-bt-top'] = { delay: 0, speed: 0.1 }

                    globals.eventBus.$emit('reset-login-animation')
                    break

                case 'mywork':
                    // goIns = { 'my-datasets': { delay: 0.1, speed: 0.8 } }
                    goIns = {
                        'my-datasets': { delay: 0.1, speed: 0.8 },
                        inspector: { delay: 0.1, speed: 0.8, view: 'info' },
                        // inspector: { delay: 0.1, speed: 0.8, view: 'uploads' },
                        //
                        // inspector-nav opacity: 0.99 is part of the opacity:1 / transparency problem workaround
                        'inspector-nav': { delay: 0.1, speed: 0.3, opacity: 0.99 }
                    }
                    // TODO extract this to funtion
                    if (options.inspector && options.inspector.view) {
                        goIns.inspector.view = options.inspector.view
                    }

                    globals.eventBus.$emit('reset-login-animation')
                    break

                case 'create-dataset':
                    goIns = { 'create-dataset': { delay: 0.1, speed: 0.6 } }
                    globals.eventBus.$emit('reset-login-animation')
                    break

                case 'view-dataset':
                    goIns = { dataset: { delay: 0.1, speed: 0.6 } }
                    globals.eventBus.$emit('reset-login-animation')
                    break

                case 'register':
                    console.log('setViewMode:register options = ', options)
                    goIns = { register: { delay: 0.25, speed: 0.6, view: 'step-1' } }
                    // TODO extract this to funtion
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

            if (options._00 && options._00.targets) {
                goIns = options._00.targets
            } else {
                goIns['main-nav'] = {
                    view: privateView ? 'private' : 'public',
                    delay: 0,
                    speed: 0.2
                }
                if (!this.$store.state.loggedIn) {
                    goIns['login-bt-top'] = { delay: 0, speed: 0.1 }
                }
            }

            _.each(goIns, (args, boxId) => {
                // handle the box
                gsap.killTweensOf($(`${tgBoxes} .${boxId}`))
                let prms = { ...args }
                if (options[boxId]) {
                    prms = { ...args, ...options[boxId] }
                }
                prms.view = prms.view || boxId

                this.boxes[boxId].visible = true
                const sp = _.isNumber(prms.speed) ? prms.speed : speed

                let opc = _.isNumber(prms.opacity) ? prms.opacity : 1
                const $targetBox = $(`${tgBoxes} .${boxId}`)
                gsap.to($targetBox, sp, {
                    opacity: opc,
                    delay: _.isNumber(prms.delay) ? prms.delay : 0,
                    ease: Expo.easeOut
                })

                // handle the different views inside the box

                const view = this.boxes[boxId].views[prms.view]

                _.each(this.boxes[boxId].views, vu => {
                    if (view !== vu) {
                        gsap.killTweensOf($(`${tgBoxes} .${boxId} .${vu.id}`))
                        gsap.set($(`${tgBoxes} .${boxId} .${vu.id}`), {
                            clearProps: 'all'
                        })
                        vu.visible = false
                    }
                })

                if (!view.visible) {
                    view.visible = true
                    const $targetView = $(`${tgBoxes} .${boxId} .${view.id}`)
                    let vOpc = _.isNumber(view.opacity) ? view.opacity : 1
                    gsap.to($targetView, 0.3, {
                        opacity: vOpc,
                        delay: 0.1,
                        ease: Expo.easeOut
                    })
                }
            })
        }
    }
}
</script>
