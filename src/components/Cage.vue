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
            privateView: false,
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
        this.updateHeadNav(this.privateView, true, 'HOME')
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
                    console.log('CG:onClick show-public-dataset this.getViewStack() = ', this.getViewStack())
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
        updateHeadNav(privateView, animateAll, info = 'HOME') {
            const view = '.v2-main-nav .view.default'
            $(view).css('opacity', 1) // fix this issue globally!
            $(view).removeClass('no-events')
            const $public = $(`${view} .element.nav-item.public`)
            const $private = $(`${view} .element.nav-item.private`)
            const $info = $(`${view} .element.info`)
            const $arrow = $(`${view} .element.arrow`)
            const $tg1 = privateView ? $public : $private
            const $tg2 = privateView ? $private : $public

            const html = 'views.default.elements.info.html'
            const infoNow = _.get(this.boxes['v2-main-nav'], html)
            _.set(this.boxes['v2-main-nav'], html, info)
            let delay = 0.6
            if (infoNow === info) {
                animateAll = false
                delay = 0
            }

            const resetInfo = () => {
                gsap.set($info, {
                    left: 150,
                    opacity: 0
                })
                gsap.set($arrow, {
                    left: 150,
                    opacity: 0
                })
            }

            const animateInfo = (delay = 0) => {
                gsap.to($arrow, 0.2, {
                    delay: delay + 0.1,
                    left: 165,
                    opacity: 1
                })
                gsap.to($info, 0.25, {
                    delay: delay + 0.2,
                    left: 182,
                    opacity: 1
                })
            }

            if (!animateAll) {
                if (info !== infoNow) {
                    resetInfo()
                    animateInfo(0.15)
                }
            } else {
                resetInfo()

                gsap.set($tg1, {
                    left: -50,
                    opacity: 0
                })

                gsap.to($tg1, 0.1, {
                    left: -30,
                    onComplete: () => {
                        gsap.to($tg1, 0.4, {
                            left: 0,
                            opacity: 1,
                            ease: Expo.easeOut
                        })
                    }
                })

                gsap.to($tg2, 0.1, {
                    left: 30,
                    ease: Sine.easeIn,
                    onComplete: () => {
                        gsap.to($tg2, 0.4, {
                            left: 75,
                            ease: Expo.easeOut
                        })
                        animateInfo()
                    }
                })
                $tg1.removeClass('right')
                $tg1.addClass('left')
                $tg1.addClass('no-events')
                //
                $tg2.removeClass('left')
                $tg2.addClass('right')
                $tg2.addClass('no-events')

                setTimeout(() => {
                    $tg1.removeClass('no-events')
                    $tg2.removeClass('no-events')
                }, 1300)
            }

            return delay
        },

        setViewMode(mode, options = {}) {
            // console.log('CG:setViewMode viewMode this.viewModePrev = ', this.viewModePrev)
            // console.log('CG:setViewMode viewMode this.viewMode = ', this.viewMode)
            // console.log('CG:setViewMode viewMode mode = ', mode)
            switch (mode) {
                case 'home':
                case 'mywork':
                    if (this.viewModePrev && this.viewMode === mode) {
                        return
                    }
            }

            this.viewModePrev = this.viewMode
            this.viewMode = mode || 'home'

            console.log('CG:setViewMode options = ', options)
            let path = 'Home'
            let headInfo = 'HOME'
            let privateView = false
            switch (this.viewMode) {
                case 'home':
                    path = 'Welcome!'
                    break
                case 'search':
                    path = 'List & Search Datasets' // Search datasets
                    headInfo = 'SEARCH DATASETS'
                    break
                case 'public-dataset':
                    path = 'View Dataset / DOI / 10.1002/0470841559.ch1'
                    headInfo = 'VIEW DATASET'
                    break
                case 'private-dataset':
                case 'dataset-actions':
                    privateView = true
                    headInfo = 'WORK ON MY DATASET'
                    path = 'View my Dataset / Dual Color Imaging from a Single BF2 ...'
                    break
                case 'mywork':
                    headInfo = 'ALL MY DATASETS'
                    privateView = true
                    path = 'My Work / List & Search Datasets'
                    break
                case 'file-list-public':
                    headInfo = 'FILES OF THIS DATASET'
                    path = 'List & Search Files of Dataset / DOI / 10.1002/0470841559.ch1'
                    break
                case 'file-list-private':
                    headInfo = 'FILES OF MY DATASET'
                    privateView = true
                    path = 'List & Search Files of my Dataset / Dual Color Imaging from a Single BF2 ...'
                    break
            }
            this.$store.dispatch('setSubPath', path)
            let animateAll = false
            let delay = 0.6 // 0
            if (privateView !== this.privateView) {
                animateAll = true
                delay = 0.6
            }
            delay = this.updateHeadNav(privateView, animateAll, headInfo)

            this.privateView = privateView

            let goOuts = [...Object.keys(this.boxes)]
            goOuts[goOuts.indexOf('v2-main-nav')] = null
            if (options._00 && _.isPlainObject(options._00.targets)) {
                goOuts = [...Object.keys(options._00.targets)]
            }

            let goIns = {}
            switch (this.viewMode) {
                // v2
                case 'home':
                    goIns = {
                        'v2-landing-page': { delay: 0.1, speed: 0.8 }
                    }
                    break
                case 'mywork':
                    goIns = {
                        'v2-mywork-page': { delay: 0.1, speed: 0.8 },
                        'v2-head-controls': { delay: 0.1, speed: 0.4, view: 'v2-head-controls-new-dataset-only' }
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
                // for non animated main-nav versions
                // goIns['v2-main-nav'] = {
                //     // view: privateView ? 'private' : 'public',
                //     view: 'default',
                //     delay: 0,
                //     speed: 0.2
                // }
            }
            this.animateOut(goOuts, goIns, options, delay)
        },

        animateOut(goOuts, goIns, options, delay = 0) {
            console.log('obj:fc goOuts = ', goOuts)
            const speed = 0.3
            const animationTargets = `.${this.modalClass}.cage.boxes .animate`
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
            gsap.delayedCall(delay, this.animateIn, [goOuts, goIns, options, animationTargets])
        },

        animateIn(goOuts, goIns, options, animationTargets) {
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
