<template>
    <div class="cage boxes" :class="[{ hidden: !showCage }, modalClass]" @click="onClickCage">
        <box class="animate" :config="boxes['v2-main-nav']"></box>
        <box class="animate" :config="boxes['login-bt-top']"></box>
        <box class="animate" :config="boxes['v2-head-controls']"></box>
        <!--  -->
        <box class="animate" :config="boxes['v2-landing-page']"></box>
        <box class="animate" :config="boxes['v2-search-page']"></box>
        <box class="animate" :config="boxes['v2-search-page-facets-dn-inner']"></box>
        <box class="animate" :config="boxes['v2-mywork-page']"></box>
        <!--  -->
        <box class="animate" :config="boxes['v2-dataset-view-public']"></box>
        <box class="animate" :config="boxes['v2-dataset-view-private-content']"></box>
        <box class="animate" :config="boxes['v2-dataset-view-private-infos']"></box>
        <!--  -->

        <box class="animate" :config="boxes['v2-dataset-actions']"></box>
        <box class="animate" :config="boxes['v2-messages']"></box>

        <!--  -->
        <box class="animate" :config="boxes['v2-file-list']"></box>
    </div>
</template>

<script>
//
import Box from '@/components/Box.vue'
import BoxDefinitions from '@/js/R2UiBoxDefinitions.js'
//
export default {
    components: {
        Box
    },
    props: {
        isModalOverlay: {
            default: false
        }
    },
    data() {
        return {
            viewMode: 'home',
            viewModePrev: null,
            showCage: false,
            boxes: new BoxDefinitions().boxes,
            modalClass: this.isModalOverlay ? 'modal-overlay' : 'modal-below',
            viewStack: []
        }
    },
    created() {
        window.globals.eventBus.$on('click', this.onClick)
        _.each(this.boxes, (box, key) => {
            box.id = box.id ? box.id : key
            box.visible = box.visible || false
            box.modal = box.modal || false
            box.views = box.views ? box.views : { [box.id]: {} }
            _.each(box.views, (view, key) => {
                view.visible = view.visible || false
                view.modal = _.isBoolean(view.modal) ? view.modal : box.modal
                view.id = view.id || key
                view.elements = view.elements || {}
                view.zones = view.zones || {}
                view.scroll = view.scroll || {}
                view.scroll.id = view.scroll.id || view.id
                view.scroll.elements = view.scroll.elements || {}
                view.scroll.zones = view.scroll.zones || {}
                view.overlay = view.overlay || {}
                view.overlay.elements = view.overlay.elements || {}
                view.overlay.zones = view.overlay.zones || {}
            })
        })
        console.log('obj:fc this.boxes = ', this.boxes)
    },
    mounted() {
        this.setModalOverlay(false)
        // this.setBoxConnectedNavState('inspector-nav', 'info')
        // this.setBoxConnectedNavState('facets-nav', 'f0')
        setTimeout(() => {
            if (!this.isModalOverlay) {
                this.showCage = true
            }
            this.modifyViewStack({ action: 'reset' })
            this.setViewMode('home')
        }, 400)
    },
    methods: {
        setBoxConnectedNavState(target, key) {
            const tg = `.box.${target} .element`
            $(tg).css('visibility', 'hidden')
            $(`${tg}.all`).removeAttr('style')
            $(`${tg}.${key}`).removeAttr('style')
        },
        modifyViewStack(args = {}) {
            args.key = args.key || 'home'
            args.action = args.action || 'reset'
            if (args.action === 'reset') {
                this.viewStack = [args.key]
            } else if (args.action === 'add') {
                this.viewStack.push(args.key)
            } else if (args.action === 'remove') {
                this.viewStack.pop()
                if (this.viewStack.length === 0) {
                    this.modifyViewStack({ action: 'reset' })
                }
            }
            console.log('modifyViewStack this.viewStack = ', this.viewStack)
        },
        getViewStack() {
            return [...this.viewStack].reverse()
        },
        onClickCage() {
            if (this.isModalOverlay && this.showCage) {
                globals.eventBus.$emit('click', { key: 'modal-bg' })
            }
        },
        onClick(evt) {
            evt.box = evt.box || { id: null }
            console.log('CG:onClick evt = ', evt)
            console.log('CG:onClick this.$store.state.loggedIn = ', this.$store.state.loggedIn)
            let options = { _00: { targets: null } }
            switch (evt.key) {
                // cancel and close
                case 'modal-bg':
                    return this.setViewMode(this.getViewStack()[0], options)
                case 'confirm':
                case 'cancel':
                case 'close':
                    return this.setViewMode(this.getViewStack()[0], options)
                case 'v2-head-crtl-bt-close':
                    this.modifyViewStack({ action: 'remove' })
                    return this.setViewMode(this.getViewStack()[0], options)
                // base views
                case 'public':
                    this.modifyViewStack({ action: 'reset' })
                    return this.setViewMode('home', options)
                case 'private':
                    this.modifyViewStack({ key: 'mywork', action: 'reset' })
                    return this.setViewMode('mywork', options)
                // main stack views
                case 'show-public-dataset':
                    this.modifyViewStack({ key: 'public-dataset', action: 'add' })
                    return this.setViewMode('public-dataset', options)
                case 'show-private-dataset':
                    this.modifyViewStack({ key: 'private-dataset', action: 'add' })
                    return this.setViewMode('private-dataset', options)
                case 'show-search-page':
                    this.modifyViewStack({ key: 'search', action: 'add' })
                    return this.setViewMode('search', options)

                // file list stuff
                case 'show-filelist-public':
                    this.modifyViewStack({ key: 'file-list-public', action: 'add' })
                    return this.setViewMode('file-list-public', options)

                case 'show-filelist-private':
                    this.modifyViewStack({ key: 'file-list-private', action: 'add' })
                    return this.setViewMode('file-list-private', options)

                case 'open-file-collection':
                    options._00 = {
                        targets: { 'v2-file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-open' } }
                    }
                    return this.setViewMode(this.getViewStack()[0], options)
                case 'close-file-collection':
                    options._00 = {
                        targets: { 'v2-file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-closed' } }
                    }
                    return this.setViewMode(this.getViewStack()[0], options)

                // actions and messages
                case 'download-all':
                    options['v2-messages'] = {
                        view: 'msg-large-dataset'
                    }
                    return this.setViewMode(`${this.getViewStack()[0]}`, options)
                case 'v2-head-crtl-bt-actions':
                    options['v2-dataset-actions'] = {
                        view: 'v2-dataset-actions-publish'
                    }
                    options['v2-head-controls'] = {
                        delay: 0,
                        speed: 0.3,
                        view: 'v2-head-controls-edit-actions-active'
                    }

                    return this.setViewMode(`${this.getViewStack()[0]}`, options)
            }
        },

        setLoggedIn() {
            // $('.nav.quick-actions').removeClass('hidden')
            // this.$store.dispatch('setLoggedInState', true)
            // this.setViewMode('mywork')
            // this.boxes.facets.close = false
        },
        setViewMode(mode, options = {}) {
            const speed = 0.3
            this.viewModePrev = this.viewMode
            this.viewMode = mode || 'home'
            console.log('CG:setViewMode viewMode prev = ', this.viewModePrev)
            console.log('CG:setViewMode viewMode new = ', this.viewMode)
            console.log('CG:setViewMode options = ', options)
            let path = 'Home'
            let privateView = false
            switch (this.viewMode) {
                case 'home':
                    path = 'Welcome!'
                    break
                case 'search':
                    path = 'List & Search Datasets' // Search datasets
                    break
                case 'public-dataset':
                    path = 'View Dataset / DOI / 10.1002/0470841559.ch1'
                    break
                case 'private-dataset':
                case 'dataset-actions':
                    privateView = true
                    path = 'View my Dataset / Dual Color Imaging from a Single BF2 ...'
                    break
                case 'mywork':
                    privateView = true
                    path = 'My Work / List & Search Datasets'
                    break
                case 'file-list-public':
                    path = 'List & Search Files of Dataset / DOI / 10.1002/0470841559.ch1'
                    break
                case 'file-list-private':
                    privateView = true
                    path = 'List & Search Files of my Dataset / Dual Color Imaging from a Single BF2 ...'
                    break
            }
            this.$store.dispatch('setSubPath', path)

            const animationTargets = `.${this.modalClass}.cage.boxes .animate`
            let goOuts = [...Object.keys(this.boxes)]
            goOuts[goOuts.indexOf('v2-main-nav')] = null
            if (options._00 && _.isPlainObject(options._00.targets)) {
                goOuts = [...Object.keys(options._00.targets)]
            }
            _.each(goOuts, key => {
                if (key) {
                    gsap.to($(`${animationTargets}.${key}`), speed, {
                        opacity: 0,
                        ease: Expo.easeOut,
                        display: 'none'
                    })
                    this.boxes[key].visible = false
                }
            })
            let goIns = {}
            switch (mode) {
                // v2
                case 'home':
                    goIns = {
                        'v2-landing-page': { delay: 0.1, speed: 0.8 }
                    }
                    break
                case 'mywork':
                    goIns = {
                        'v2-mywork-page': { delay: 0.1, speed: 0.8 },
                        'v2-head-controls': { delay: 0.1, speed: 0.4, view: 'v2-head-controls-close-only' }
                    }
                    break
                case 'search':
                    goIns = {
                        'v2-search-page': { delay: 0.1, speed: 0.8 },
                        'v2-search-page-facets-dn-inner': { delay: 0.1, speed: 0.8 },
                        'v2-head-controls': { delay: 0.1, speed: 0.4, view: 'v2-head-controls-close-only' }
                    }
                    break
                case 'public-dataset':
                    goIns = {
                        'v2-dataset-view-public': { delay: 0.1, speed: 0.4 },
                        'v2-head-controls': { delay: 0.1, speed: 0.4 },
                        'v2-messages': { delay: 0.1, speed: 0.4 }
                    }
                    break
                case 'private-dataset':
                    goIns = {
                        'v2-dataset-view-private-content': { delay: 0.1, speed: 0.4 },
                        'v2-dataset-view-private-infos': { delay: 0.1, speed: 0.4 },
                        'v2-head-controls': { delay: 0.1, speed: 0.4, view: 'v2-head-controls-edit' },
                        'v2-messages': { delay: 0.1, speed: 0.4 },
                        'v2-dataset-actions': { delay: 0, speed: 0.4 }
                    }
                    break

                case 'file-list-public':
                case 'file-list-private':
                    goIns = {
                        'v2-file-list': { delay: 0.1, speed: 0.4, view: 'file-list-collection-closed' },
                        'v2-head-controls': { delay: 0.1, speed: 0.4, view: 'v2-head-controls-close-only' },
                        'v2-messages': { delay: 0.1, speed: 0.4 }
                    }
                    break
            }

            if (options._00 && options._00.targets) {
                goIns = options._00.targets
            } else {
                goIns['v2-main-nav'] = {
                    view: privateView ? 'private' : 'public',
                    delay: 0,
                    speed: 0.2
                }
                if (!this.$store.state.loggedIn) {
                    goIns['login-bt-top'] = { delay: 0, speed: 0.1 }
                }
            }

            let hasModal = false

            _.each(goIns, (args, boxId) => {
                // handle the box
                gsap.killTweensOf($(`${animationTargets}.${boxId}`))
                let prms = { ...args }
                if (options[boxId]) {
                    prms = { ...args, ...options[boxId] }
                }
                prms.view = prms.view || boxId

                this.boxes[boxId].visible = true
                const sp = _.isNumber(prms.speed) ? prms.speed : speed

                let opc = _.isNumber(prms.opacity) ? prms.opacity : 1
                const $targetBox = $(`${animationTargets}.${boxId}`)
                gsap.to($targetBox, sp, {
                    opacity: opc,
                    delay: _.isNumber(prms.delay) ? prms.delay : 0,
                    ease: Expo.easeOut,
                    display: 'block'
                })

                // handle the different views inside the box
                const view = this.boxes[boxId].views[prms.view]

                _.each(this.boxes[boxId].views, vu => {
                    if (view !== vu) {
                        gsap.killTweensOf($(`${animationTargets}.${boxId} .${vu.id}`))
                        gsap.set($(`${animationTargets}.${boxId} .${vu.id}`), {
                            clearProps: 'all'
                        })
                        vu.visible = false
                    }
                })

                // handle the 'split' of boxes above and below the modal layer
                let vOpacity = _.isNumber(view.opacity) ? view.opacity : _.isNumber(prms.opacity) ? prms.opacity : 1
                if (view.modal) {
                    hasModal = true
                } else if (this.isModalOverlay) {
                    vOpacity = 0
                }
                const $targetView = $(`${animationTargets}.${boxId} .${view.id}`)

                if (view.modal) {
                    if (!this.isModalOverlay) {
                        gsap.set($targetView, {
                            visibility: 'hidden'
                        })
                    }
                }
                //
                if (vOpacity === 0) {
                    // avoid invisible views could be clicked anyway
                    gsap.set($targetView, {
                        visibility: 'hidden'
                    })
                } else if (!view.visible) {
                    view.visible = true
                    const vDelay = _.isNumber(view.delay) ? view.delay : _.isNumber(prms.delay) ? prms.delay : 0.1
                    const vSpeed = _.isNumber(view.speed) ? view.speed : _.isNumber(prms.speed) ? prms.speed : 0.3
                    gsap.to($targetView, vDelay, {
                        opacity: vOpacity,
                        delay: vDelay,
                        ease: Expo.easeOut
                    })
                }
            })

            this.setModalOverlay(hasModal)
        },

        setModalOverlay(yes) {
            yes = yes === true
            if (this.isModalOverlay) {
                const tg = `.centered-view .modal-bg`
                yes ? $(tg).css('visibility', 'visible') : $(tg).css('visibility', 'hidden')
                this.showCage = yes
                console.log('obj:setModalOverlay this.showCage = ', this.showCage)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.hidden {
    display: none;
}
</style>
