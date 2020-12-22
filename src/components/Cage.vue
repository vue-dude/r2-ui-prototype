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
            // fast hardcoded stuff
            myDatasetsHistoryView: false,
            modalClass: this.isModalOverlay ? 'modal-overlay' : 'modal-below',
            modalViewKey: null, // temp solution !! 2Do
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
        this.setViewMode('init')
        this.setModalOverlay(false)
        // this.setBoxConnectedNavState('inspector-nav', 'info')
        // this.setBoxConnectedNavState('facets-nav', 'f0')
        setTimeout(() => {
            if (!this.isModalOverlay) {
                this.showCage = true
            }
            this.setViewMode('home')
            this.modifyViewStack({ action: 'reset' })
        }, 400)
    },
    methods: {
        setBoxConnectedNavState(target, key) {
            console.log('CAGE:setBoxConnectedNavState target, key = ', target, key)
            const tg = `.box.${target} .element`
            console.log('CAGE:setBoxConnectedNavState tg = ', tg)
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
            if (this.modalViewKey) {
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
                    return this.setViewMode(`${this.getViewStack()[0]}`, options)
            }
        },

        onClickXXX(evt) {
            evt.box = evt.box || { id: null }
            console.log('CG:onClick evt = ', evt)
            console.log('CG:onClick this.$store.state.loggedIn = ', this.$store.state.loggedIn)
            let options = { _00: { targets: null } }
            switch (evt.key) {
                case 'modal-bg':
                    return this.onClick({ key: 'cancel', viewKey: this.modalViewKey })
                case 'confirm':
                case 'cancel':
                case 'close':
                    if (evt.viewKey === 'msg-large-dataset') {
                        return this.setViewMode('private-dataset', options)
                    }
                    if (evt.viewKey === 'v2-dataset-actions') {
                        return this.setViewMode('private-dataset', options)
                    }
                    return null

                case 'v2-head-crtl-bt-close':
                    // new: view stack thing
                    const stack = this.getViewStack()
                    switch (stack[0]) {
                        case 'search':
                        case 'public-dataset':
                        case 'file-list-public':
                            this.modifyViewStack({ action: 'remove' })
                            return this.setViewMode(stack[1], options)
                    }

                    switch (true) {
                        case this.viewMode === 'dataset-actions':
                            return this.setViewMode('private-dataset', options)
                    }
                    return this.setViewMode('home', options)
                case 'public':
                    this.modifyViewStack({ action: 'reset' })
                    return this.setViewMode('home', options)
                case 'private':
                    this.modifyViewStack({ key: 'mywork', action: 'reset' })
                    return this.setViewMode('mywork', options)
                case 'show-public-dataset':
                    this.modifyViewStack({ key: 'public-dataset', action: 'add' })
                    return this.setViewMode('public-dataset', options)
                case 'show-private-dataset':
                    return this.setViewMode('private-dataset', options)
                case 'show-search-page':
                    this.modifyViewStack({ key: 'search', action: 'add' })
                    return this.setViewMode('search', options)
                case 'show-filelist-public':
                    this.modifyViewStack({ key: 'file-list-public', action: 'add' })
                    return this.setViewMode('file-list-public', options)
                case 'open-file-collection':
                    options._00 = {
                        targets: { 'v2-file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-open' } }
                    }
                    return this.setViewMode('file-list-public', options)
                case 'close-file-collection':
                    options._00 = {
                        targets: { 'v2-file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-closed' } }
                    }
                    return this.setViewMode('file-list-public', options)
                case 'v2-head-crtl-bt-actions':
                    return this.setViewMode('dataset-actions', options)

                case 'v2-head-crtl-bt-actions-active':
                    return this.setViewMode('private-dataset', options)

                case 'show-filelist':
                    return this.setViewMode('private-dataset-msg', options)

                case 'v2-head-crtl-bt-open-in-tab':
                    // const evt = new MouseEvent('contextmenu', {
                    //     bubbles: true,
                    //     cancelable: true,
                    //     view: window,
                    //     buttons: 2
                    // })
                    // window.dispatchEvent(evt)

                    const redirectWindow = window.open('localhost:8080/view-dataset/ccg466rgx43222', '_blank')
                    // redirectWindow.location
                    if (this.viewModePrev === 'search') {
                        return this.setViewMode('search', options)
                    }
                    return this.setViewMode('home', options)
            }

            // evt.box = evt.box || { id: null }
            // console.log('CG:onClick evt = ', evt)
            // console.log('CG:onClick this.$store.state.loggedIn = ', this.$store.state.loggedIn)
            // let options = { _00: { targets: null } }
            // switch (true) {
            //     case evt.key === 'close' && evt.box.id === 'facets':
            //     case evt.key === 'hide-facets' && evt.box.id === 'recent':
            //         return this.setViewMode('home', options)
            //     case evt.key === 'close':
            //         //
            //         // upfront, needs deper implementation
            //         if (evt.box.id === 'dataset') {
            //             if (evt.viewKey === 'my-dataset-edit' || evt.viewKey === 'my-dataset-private') {
            //                 options['my-datasets'] = {
            //                     view: 'dataset-history-with-private'
            //                 }
            //                 return this.setViewMode('mywork', options)
            //             }
            //             if (evt.viewKey === 'my-dataset-from-history') {
            //                 options['my-datasets'] = {
            //                     view: 'dataset-history-create-private'
            //                 }
            //                 return this.setViewMode('mywork', options)
            //             }
            //             if (evt.viewKey === 'my-dataset-published') {
            //                 // list / history view here ?
            //                 return this.setViewMode('mywork', options)
            //             }
            //             // ++++++++++++++++++++++++
            //             // ++++++++++++++++++++++++
            //             // ++++++++++++++++++++++++
            //             if (evt.viewKey === 'public-dataset') {
            //                 return this.setViewMode('home', options)
            //             }
            //             // catch the rest
            //             return this.setViewMode('home', options)
            //             // if (this.$store.state.loggedIn) {
            //             //     return this.setViewMode('mywork', options)
            //             // }
            //             // return this.setViewMode('home', options)
            //         }
            //         //
            //         if (evt.box.id === 'create-dataset') {
            //             // options.dataset = {
            //             //     view: 'dataset-public'
            //             // }
            //             return this.setViewMode('mywork', options)
            //         }
            //         if (evt.box.id === 'login') {
            //             options.globe = { delay: 0 }
            //         }
            //         return this.setViewMode('home', options)
            //     case evt.box.id === 'dataset':
            //         options._00 = {
            //             targets: { dataset: { delay: 0, speed: 0 } }
            //         }
            //         switch (evt.key) {
            //             case 'start-dataset-edit':
            //                 options.dataset = {
            //                     view: 'my-dataset-edit'
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //             case 'start-edit-text':
            //                 options.dataset = {
            //                     view: 'my-dataset-edit-text'
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //             case 'stop-dataset-edit':
            //                 options.dataset = {
            //                     view: 'my-dataset-private' // my-dataset-published
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //             case 'keep-changes':
            //                 options.dataset = {
            //                     view: 'my-dataset-edit' // my-dataset-private
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //         }
            //     case evt.box.id === 'recent':
            //         switch (evt.key) {
            //             case 'show-public-dataset':
            //                 options._NAV = {
            //                     // backOnCloseTo: 'home' // needs implementation
            //                 }
            //                 options['dataset-wf'] = {
            //                     view: 'public-dataset-wf'
            //                 }
            //                 return this.setViewMode('view-dataset-wf', options)
            //             case 'show-facets':
            //                 options['recent'] = {
            //                     view: 'recent-facets'
            //                 }
            //                 return this.setViewMode('facets', options)
            //             case 'hide-facets':
            //                 return null
            //         }
            //         return null
            //     case evt.key === 'register':
            //         return this.setViewMode('register', options)
            //     case evt.key === 'bt-continue' && evt.box.id === 'register':
            //     case evt.key === 'bt-send' && evt.box.id === 'register':
            //         options.register = {
            //             view: evt.args.view
            //         }
            //         return this.setViewMode('register', options)
            //     case evt.key === 'login':
            //         return this.setLoggedIn()
            //     case evt.key === 'login-start' && evt.box.id === 'login-bt-top':
            //     case evt.key === 'private' && !this.$store.state.loggedIn:
            //         return globals.eventBus.$emit('trigger-login-animation')
            //     case evt.key === 'private' && this.$store.state.loggedIn:
            //         return this.setViewMode('mywork')
            //     case evt.key === 'public':
            //         return this.setViewMode('home')
            //     case evt.key === 'login-start':
            //         return this.setViewMode('login')
            //     case evt.box.id === 'my-datasets':
            //         switch (evt.key) {
            //             case 'publish-version':
            //                 return null
            //             case 'withdraw-dataset':
            //                 options._00 = {
            //                     targets: { inspector: { delay: 0, speed: 0.3, view: 'withdraw' } }
            //                 }
            //                 this.setBoxConnectedNavState('inspector-nav', null)
            //                 return this.setViewMode('mywork', options)
            //             case 'view-back':
            //                 options._00 = {
            //                     targets: { 'my-datasets': { delay: 0, speed: 0.3 } }
            //                 }
            //                 return this.setViewMode('mywork', options)
            //             case 'show-history':
            //                 options._00 = {
            //                     targets: { 'my-datasets': { delay: 0, speed: 0.3 } }
            //                 }
            //                 options['my-datasets'] = {
            //                     view: 'dataset-history-create-private'
            //                 }
            //                 this.myDatasetsHistoryView = true
            //                 return this.setViewMode('mywork', options)
            //             case 'create-dataset':
            //                 return this.setViewMode('create-dataset')
            //             case 'show-my-dataset':
            //                 options._NAV = {
            //                     // backOnCloseTo: 'mywork' // needs implementation
            //                 }
            //                 options.dataset = {
            //                     view: 'my-dataset-published' // public-dataset my-dataset-published
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //             case 'show-my-dataset-from-history':
            //                 options.dataset = {
            //                     view: 'my-dataset-from-history'
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //             case 'show-private-dataset-from-history': // editable
            //                 options.dataset = {
            //                     view: 'my-dataset-private' // public-dataset my-dataset-published / my-dataset-edit
            //                 }
            //                 return this.setViewMode('view-dataset', options)
            //         }
            //     case evt.box.id === 'inspector-nav':
            //         options._00 = {
            //             targets: { inspector: { delay: 0, speed: 0.3 } }
            //         }
            //         options.inspector = {
            //             view: evt.key
            //         }
            //         this.setBoxConnectedNavState(evt.box.id, evt.key)
            //         return this.setViewMode('mywork', options)
            //         this.setBoxConnectedNavState(evt.box.id, evt.key)
            //     case evt.box.id === 'facets-nav':
            //         this.setBoxConnectedNavState(evt.box.id, evt.key)
            //         return null
            //     default:
            //         this.setViewMode('home')
            // }
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
            this.modalViewKey = null
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
                    path = 'View my Dataset / xxxx'
                    break
                case 'mywork':
                    privateView = true
                    path = 'My Work / List & Search Datasets'
                    break
                case 'file-list-public':
                    path = 'List & Search Files of Dataset / DOI / 10.1002/0470841559.ch1'
                    break

                // case 'home':
                // case 'facets':
                //     path = 'Browse Datasets'
                //     privateView = false
                //     break
                // case 'login':
                //     path = 'Login'
                //     privateView = false
                //     break
                // case 'register':
                //     path = 'Create an Account'
                //     privateView = false
                //     break
                // case 'mywork':
                //     path = 'My Work'
                //     break
                // case 'create-dataset':
                //     path = 'My Work / Create New Dataset'
                //     break
                // case 'view-dataset':
                //     // privateView = this.$store.state.loggedIn
                //     // path = 'View Dataset / Reproduction Data for: TRex, a fast multi-animal tracking system ...'
                //     path = 'View Dataset / DOI / 10.1002/0470841559.ch1'
                //     break
                // case 'view-dataset-wf':
                //     path = 'View Dataset / DOI / 10.1002/0470841559.ch1'
                //     break
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
                // v1
                case 'init':
                    break
                case 'facets':
                    goIns = {
                        // 'landing-page': { delay: 0, speed: 0.6 }
                        // facets: { delay: 0.08, speed: 1.2 },
                        // 'facets-nav': { delay: 0.1, speed: 0.8 }
                    }
                    // globals.eventBus.$emit('reset-login-animation')
                    break
                case 'home':
                    // goIns = { recent: { delay: 0.1, speed: 0.8 } }
                    goIns = {
                        // 'landing-page': { delay: 0.1, speed: 0.8 }
                        // facets: { delay: 0.1, speed: 0.8 },
                        // 'facets-nav': { delay: 0.1, speed: 0.8 }
                    }
                    // if (!this.$store.state.loggedIn) {
                    //     delete goIns.facets
                    //     delete goIns['facets-nav']
                    //     goIns.globe = { delay: 0.3, speed: 0.8 }
                    //     goIns['login-animation'] = { delay: 0.4, speed: 0.8 }
                    //     goIns['flow-show'] = { delay: 0.9, speed: 6 }
                    // }
                    // globals.eventBus.$emit('reset-login-animation')
                    break
                case 'mywork':
                    // const delay = this.viewModePrev === 'login' ? 0.3 : 0.1
                    // console.log('obj:fc this.viewMode = ', this.viewMode)
                    // console.log('obj:fc mode = ', mode)
                    // console.log('obj:fc delay = ', delay)
                    // goIns = {
                    //     'my-datasets': { delay, speed: 1.2 },
                    //     inspector: { delay, speed: 1.2, view: 'info' },
                    //     // inspector-nav opacity: 0.99 is part of the opacity:1 / transparency problem workaround
                    //     'inspector-nav': { delay, speed: 0.3, opacity: 0.99 }
                    // }
                    // // TODO extract this to function
                    // if (options.inspector && options.inspector.view) {
                    //     goIns.inspector.view = options.inspector.view
                    // }
                    // globals.eventBus.$emit('reset-login-animation')
                    break

                case 'create-dataset':
                    // goIns = { 'create-dataset': { delay: 0.1, speed: 0.6 } }
                    // globals.eventBus.$emit('reset-login-animation')
                    break

                case 'view-dataset':
                    // goIns = { dataset: { delay: 0.1, speed: 0.6 } }
                    // globals.eventBus.$emit('reset-login-animation')
                    break

                case 'view-dataset-wf':
                    // goIns = { 'dataset-wf': { delay: 0.1, speed: 0.6 } }
                    // globals.eventBus.$emit('reset-login-animation')
                    break
                case 'register':
                    // console.log('setViewMode:register options = ', options)
                    // goIns = { register: { delay: 0.25, speed: 0.6, view: 'step-1' } }
                    // // TODO extract this to funtion
                    // if (options.register && options.register.view) {
                    //     goIns.register.view = options.register.view
                    // }
                    // globals.eventBus.$emit('reset-login-animation')
                    break

                case 'login':
                    // goIns = {
                    //     recent: {},
                    //     login: { delay: 0, speed: 0.5 },
                    //     'login-animation': {},
                    //     globe: { opacity: 0.35, speed: 0.8 }
                    // }
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
                    this.modalViewKey = view.id
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
