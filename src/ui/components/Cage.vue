<template>
    <div class="cage boxes" :class="[{ hidden: !showCage }, modalClass]">
        <box class="animate" :config="boxes['main-nav']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['head-controls']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['landing-page']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['search-page']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['search-page-facets-dn-inner']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['mywork-page']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['dataset-view-public']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['dataset-view-private-content']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['dataset-view-private-infos']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['dataset-controls']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['dataset-actions']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['r2-messages']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['file-list']" :isModalOverlay="isModalOverlay"></box>

        <box class="animate" :config="boxes['mock-config']" :isModalOverlay="isModalOverlay"></box>
    </div>
</template>

<script>
//
import Box from '@/ui/components/Box.vue'
import BoxDefinitions from '@/ui/js/R2UiBoxDefinitions.js'
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
            uiStore: globals.uiStore,
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
                // fixed
                // TODO unify structure, add 'fixed' ?
                view.tabs = view.tabs || {}
                view.elements = view.elements || {}
                view.components = view.components || {}
                view.zones = view.zones || {}
                // scrollable
                view.scroll = view.scroll || {}
                view.scroll.id = view.scroll.id || view.id
                view.scroll.elements = view.scroll.elements || {}
                view.scroll.components = view.scroll.components || {}
                view.scroll.zones = view.scroll.zones || {}
                // overlay
                view.overlay = view.overlay || {}
                view.overlay.elements = view.overlay.elements || {}
                view.overlay.components = view.overlay.components || {}
                view.overlay.zones = view.overlay.zones || {}
            })
        })
    },
    mounted() {
        this.setModalOverlay(false)
        this.updateHeadNav(this.privateView, true)
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
        updateDatasetControls(args = {}) {
            const element = '.dataset-controls .elements .element'
            if (args.reset === true) {
                args.edit = false
                args.actions = false
            }
            const setEditState = yes => {
                let targets = [`${element}.head-crtl-bt-edit`, `${element}.head-crtl-bt-edit-active`]
                let t1 = yes ? targets[1] : targets[0]
                let t2 = yes ? targets[0] : targets[1]
                gsap.set($(t1), {
                    visibility: 'visible'
                })
                gsap.set($(t2), {
                    visibility: 'hidden'
                })
            }
            if (!_.isNil(args.edit)) {
                setEditState(args.edit)
            }

            const setActionsState = yes => {
                let targets = [`${element}.head-crtl-bt-actions`, `${element}.head-crtl-bt-actions-active`]
                let t1 = yes ? targets[1] : targets[0]
                let t2 = yes ? targets[0] : targets[1]
                gsap.set($(t1), {
                    visibility: 'visible'
                })
                gsap.set($(t2), {
                    visibility: 'hidden'
                })
                this.boxes['dataset-controls'].views['dataset-controls'].modal = yes === true
            }

            if (!_.isNil(args.actions)) {
                setActionsState(args.actions)
            }
        },
        updateHeadNav(privateView, animateAll, info = { length: 0, html: '' }) {
            //
            const mock = '.mock-config .view.default'
            $(mock).css('opacity', 1) // fix this issue globally!
            $(mock).removeClass('no-events')
            //
            const view = '.main-nav .view.default'
            $(view).css('opacity', 1) // fix this issue globally!
            $(view).removeClass('no-events')
            const $public = $(`${view} .element.nav-item.public`)
            const $private = $(`${view} .element.nav-item.private`)
            const $back = $(`${view} .element.nav-item.head-nav-back`)
            const $info = $(`${view} .element.info`)
            const $arrow = $(`${view} .element.arrow`)
            const $sp1_a = $(`${view} .element.sp-1-a`)
            const $sp1_b = $(`${view} .element.sp-1-b`)
            const $sp2_a = $(`${view} .element.sp-2-a`)
            const $sp2_b = $(`${view} .element.sp-2-b`)
            const $sp3_a = $(`${view} .element.sp-3-a`)
            const $sp3_b = $(`${view} .element.sp-3-b`)
            const $sp4_a = $(`${view} .element.sp-4-a`)
            const $sp4_b = $(`${view} .element.sp-4-b`)
            //
            const $tg1 = privateView ? $public : $private
            const $tg2 = privateView ? $private : $public

            const updatePositions = hasInfo => {
                const stopL1 = $public.position().left + $public.width() + 10
                const stopR1 = $private.position().left + $private.width() + 15
                const reset = [
                    [$sp1_a, null, true, 0, { opacity: 1 }],
                    [$sp1_b, null, true, 0, { opacity: 1 }],
                    [$info, null, true, 0, { clearProps: 'all' }],
                    [$public, null, true, 0, { clearProps: 'all' }],
                    [$public, null, true, 0, { opacity: 1 }],
                    [$private, null, true, 0, { clearProps: 'all' }],
                    [$private, null, true, 0, { opacity: 1 }],
                    [$back, null, true, 0, { clearProps: 'all' }],
                    [$arrow, null, true, 0, { clearProps: 'all' }],
                    [$sp4_a, null, true, 0, { visibility: 'hidden' }],
                    [$sp4_b, null, true, 0, { visibility: 'hidden' }]
                ]
                // const reset2 = [
                //     [$sp1_a, null, true, 0, { opacity: 1 }],
                //     [$sp1_b, null, true, 0, { opacity: 1 }],
                //     [$info, null, true, 0, { clearProps: 'all' }],
                //     [$public, null, true, 0, { clearProps: 'all' }],
                //     [$public, null, true, 0, { opacity: 1 }],
                //     [$private, null, true, 0, { clearProps: 'all' }],
                //     [$private, null, true, 0, { opacity: 1 }],
                //     [$back, null, true, 0, { clearProps: 'all' }],
                //     [$arrow, null, true, 0, { clearProps: 'all' }],
                //     [$sp4_a, null, true, 0, { visibility: 'hidden' }],
                //     [$sp4_b, null, true, 0, { visibility: 'hidden' }]
                // ]
                const queue1 = [
                    ...reset,
                    [$sp2_a, stopL1, true, 0, { opacity: 1 }],
                    [$sp2_b, 1, false, 0, { opacity: 1 }],
                    [$sp3_a, stopR1, true, 0, { opacity: 1 }],
                    [$sp3_b, 1, false, 0, { opacity: 1 }]
                ]
                const queue2 = [
                    ...reset,
                    // set start values
                    [$arrow, stopL1 - 5, true, 0, {}],
                    [$info, 18 - 10, false, 0, { visibility: 'visible' }],
                    [$sp2_a, $info.width() + 22, false, 0, {}],
                    [$sp2_b, 1, false, 0, {}],
                    [$back, 5, false, 0, { visibility: 'visible' }],
                    [$sp3_a, $back.width() + 15, false, 0, {}],
                    [$sp3_b, 1, false, 0, {}],
                    //
                    [$arrow, stopL1, true, 0.2, { delay: 0.1, opacity: 1 }],
                    [$info, 18, false, 0.2, { delay: 0.1, opacity: 1 }],
                    [$sp2_a, $info.width() + 10, false, 0.2, { delay: 0.2, opacity: 1 }],
                    [$sp2_b, 1, false, 0.2, { delay: 0.2, opacity: 1 }],
                    [$back, 10, false, 0.15, { delay: 0.25, opacity: 1 }],
                    [$sp3_a, $back.width() + 10, false, 0.4, { delay: 0.35, opacity: 1 }],
                    [$sp3_b, 1, false, 0.3, { delay: 0.4, opacity: 1 }],
                    [$private, 10, false, 0.3, { ease: Expo.easeOut }],
                    [$sp4_a, $private.width() + 15, false, 0, { visibility: 'visible', opacity: 0 }],
                    [$sp4_b, 1, false, 0, { visibility: 'visible', opacity: 0 }]
                ]

                const queue3 = [
                    ...reset,
                    [$arrow, stopR1 - 5, true, 0, {}],
                    [$info, 18 - 10, false, 0, { visibility: 'visible' }],
                    [$sp2_a, $info.width() + 22, false, 0, {}],
                    [$sp2_b, 1, false, 0, {}],
                    [$back, 5, false, 0, { visibility: 'visible' }],
                    [$sp3_a, $back.width() + 15, false, 0, {}],
                    [$sp3_b, 1, false, 0, {}],
                    //
                    [$arrow, stopR1, true, 0.2, { delay: 0.1, opacity: 1 }],
                    [$info, 18, false, 0.2, { delay: 0.1, opacity: 1 }],
                    [$sp2_a, $info.width() + 10, false, 0.2, { delay: 0.2, opacity: 1 }],
                    [$sp2_b, 1, false, 0.2, { delay: 0.2, opacity: 1 }],
                    [$back, 10, false, 0.15, { delay: 0.25, opacity: 1 }],
                    [$sp3_a, $back.width() + 10, false, 0.4, { delay: 0.35, opacity: 1 }],
                    [$sp3_b, 1, false, 0.3, { delay: 0.4, opacity: 1 }]
                    // [$private, 10, false, 0.3, { ease: Expo.easeOut }],
                    // [$sp4_a, $private.width() + 15, false, 0, { visibility: 'visible', opacity: 0 }],
                    // [$sp4_b, 1, false, 0, { visibility: 'visible', opacity: 0 }]
                ]

                // const queue3 = [
                //     ...reset,
                //     [$sp2_a, stopL1, true, 0, {}],
                //     [$sp2_b, 1, false, 0, {}],
                //     //
                //     [$arrow, stopR1, true, 0, { opacity: 1 }],
                //     [$info, 18, false, 0, { visibility: 'visible' }],
                //     [$sp3_a, $info.width() + 10, false, 0, {}],
                //     [$sp3_b, 1, false, 0, {}],
                //     [$back, 10, false, 0, { visibility: 'visible' }],
                //     [$sp4_a, $back.width() + 10, false, 0, { visibility: 'visible' }],
                //     [$sp4_b, 1, false, 0, { visibility: 'visible' }]
                // ]

                let queue = queue1
                if (hasInfo) {
                    queue = privateView ? queue3 : queue2
                }

                let left = 0
                _.each(queue, elm => {
                    left = elm[2] ? elm[1] : left + elm[1]
                    const args = { left, ...elm[4] }
                    if (elm[3]) {
                        gsap.to(elm[0], elm[3], args)
                    } else {
                        gsap.set(elm[0], args)
                    }
                })
            }

            $tg1.removeClass('selected')
            $tg2.addClass('selected')

            const htmlPath = 'views.default.elements.info.html'
            const infoNow = _.get(this.boxes['main-nav'], htmlPath)
            const hasInfo = info.html.length > 0
            _.set(this.boxes['main-nav'], htmlPath, info.html)

            let delay = 0
            let update = true

            switch (true) {
                case hasInfo && infoNow === info.html:
                    update = false
                    break
                case hasInfo && infoNow !== info.html:
                    delay = 0.3
            }

            if (update) {
                this.$nextTick(() => updatePositions(hasInfo))
            }

            return delay
        },

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
        },
        getViewStack() {
            return [...this.viewStack].reverse()
        },

        updateMetaEditor(key, cfg = {}) {
            console.log('CG:updateMetaEditor key = ', key)
            console.log('CG:updateMetaEditor cfg = ', cfg)

            // let dataKey = cfg.dataKey || null

            const viewKey = 'meta-actions-edit-generic'
            const view = this.boxes['dataset-actions'].views[viewKey]
            const tabs = view.tabs
            _.each(tabs, tab => {
                console.log('CG:updateMetaEditor tab = ', tab)
                tab.active = false
                if (cfg.dataKey) {
                    tab.dataKey = cfg.dataKey
                }
            })
            const tabKey = `tab-${key}`
            const tab = tabs[tabKey]
            tab.active = true
            console.log('CG:updateMetaEditor tabs = ', tabs)
            console.log('CG:updateMetaEditor tabs[tabKey].dataKey = ', tabs[tabKey].dataKey)

            // !! for the preview, schemaKey has a redundant config here, by tab and by clicksource!
            // TODO cleanup this

            view.scroll.components['meta-generic'].config.schemaKey = tab.schemaKey
            view.scroll.components['meta-generic'].config.dataKey = tab.dataKey

            globals.eventBus.$emit('updateMetaEditor')
            globals.eventBus.$emit('updateActiveView', { targets: ['dataset-actions'] })
        },
        updateMockConfigMenuState() {
            const $cfm = $('.cage.boxes .mock-config .config-menu')
            if ($cfm.hasClass('hidden')) {
                $(document).one('mouseup', () => {
                    console.log('WIN:CLICK value = ')
                    $cfm.addClass('hidden')
                })
                $cfm.on('mouseup', evt => {
                    evt.stopPropagation()
                })
                $('.el-select__popper').on('mouseup', evt => {
                    evt.stopPropagation()
                })
                $cfm.removeClass('hidden')
            } else {
                // $(document).off('mouseup')
                $cfm.off('mouseup', evt => {
                    evt.stopPropagation()
                })
                $('.el-select__popper').off('mouseup', evt => {
                    evt.stopPropagation()
                })
                $cfm.addClass('hidden')
            }
        },
        onClick(evt) {
            evt.box = evt.box || { id: null }
            console.log('CG:onClick evt = ', evt)
            let options = { _00: { targets: null } }

            if (!this.isModalOverlay && evt.key === 'toggle-mock-config-menu-state') {
                this.updateMockConfigMenuState()
            }

            switch (true) {
                case evt.viewKey === 'meta-actions-edit-generic' && evt.args.isViewTab:
                    this.updateMetaEditor(evt.key)
                    return null

                case evt.viewKey === 'meta-actions-edit-generic' && evt.key === 'save':
                    globals.eventBus.$emit('invokeSaveDataAction', { targets: ['meta-actions-edit-generic'] })
            }

            switch (evt.key) {
                // cancel and close
                case 'modal-bg':
                case 'cancel':
                case 'confirm':
                case 'close':
                case 'save':
                    // case 'head-nav-back':
                    this.updateDatasetControls({ reset: true })
                    return this.setViewMode(this.getViewStack()[0], options)
                case 'head-crtl-bt-close':
                case 'head-nav-back':
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

                // show - dataset

                case 'show-dataset': // live
                    this.modifyViewStack({ key: 'public-dataset', action: 'add' })
                    return this.setViewMode('public-dataset', options)

                case 'show-public-dataset': // mock
                    this.modifyViewStack({ key: 'public-dataset', action: 'add' })
                    return this.setViewMode('public-dataset', options)
                case 'show-private-dataset': // mock
                    this.modifyViewStack({ key: 'private-dataset', action: 'add' })
                    return this.setViewMode('private-dataset', options)
                case 'create-new-dataset':
                    this.modifyViewStack({ key: 'initial-dataset', action: 'add' })
                    this.updateDatasetControls({ edit: true, actions: false })
                    return this.setViewMode('initial-dataset', options)
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
                        targets: { 'file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-open' } }
                    }
                    return this.setViewMode(this.getViewStack()[0], options)
                case 'close-file-collection':
                    options._00 = {
                        targets: { 'file-list': { delay: 0, speed: 0.3, view: 'file-list-collection-closed' } }
                    }
                    return this.setViewMode(this.getViewStack()[0], options)

                // actions and messages
                case 'download-all':
                    options['r2-messages'] = {
                        view: 'msg-large-dataset'
                    }
                    return this.setViewMode(`${this.getViewStack()[0]}`, options)

                case 'dataset-edit-on':
                    this.updateDatasetControls({ edit: true })
                    return null
                case 'dataset-edit-off':
                    this.updateDatasetControls({ edit: false })
                    return null
                case 'dataset-actions-on':
                    this.updateDatasetControls({ actions: true })
                    options['dataset-actions'] = {
                        view: 'dataset-actions-publish'
                    }
                    return this.setViewMode(this.viewMode, options)
                case 'dataset-actions-off':
                    this.updateDatasetControls({ actions: false })
                    options['dataset-actions'] = {
                        view: 'dataset-actions'
                    }
                    return this.setViewMode(this.viewMode, options)
                case 'edit-meta-authors':
                case 'edit-meta-papers':
                case 'edit-meta-common':
                    options['dataset-actions'] = {
                        view: 'meta-actions-edit-generic'
                    }
                    this.updateMetaEditor(evt.key.split('-')[2], {
                        dataKey: evt.args.dataKey,
                        schemaKey: evt.args.schemaKey
                    })
                    return this.setViewMode(this.viewMode, options)
            }
        },
        setLoggedIn() {
            // $('.nav.quick-actions').removeClass('hidden')
            // this.uiStore.dispatch('setLoggedInState', true)
            // this.setViewMode('mywork')
            // this.boxes.facets.close = false
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
            let headInfo = {
                html: '',
                length: 0
            }
            let privateView = false
            switch (this.viewMode) {
                case 'home':
                    path = 'Welcome!'
                    break
                case 'search':
                    path = 'List & Search Datasets' // Search datasets
                    headInfo = {
                        html: 'SEARCH DATASETS',
                        length: 250
                    }
                    break
                case 'public-dataset':
                    path = 'View Dataset / DOI / 10.1002/0470841559.ch1'
                    headInfo = {
                        html: 'VIEW DATASET',
                        length: 250
                    }
                    break
                case 'private-dataset':
                case 'dataset-actions':
                    privateView = true
                    headInfo = {
                        html: 'WORK ON MY DATASET',
                        length: 250
                    }
                    path = 'View my Dataset / Dual Color Imaging from a Single BF2 ...'
                    break
                case 'initial-dataset':
                    privateView = true
                    headInfo = {
                        html: 'CREATE NEW DATASET',
                        length: 250
                    }
                    path = 'Create new Dataset'
                    break
                case 'mywork':
                    privateView = true
                    path = 'My Work / List & Search Datasets'
                    break
                case 'file-list-public':
                    headInfo = {
                        html: 'FILES OF THIS DATASET',
                        length: 250
                    }
                    path = 'List & Search Files of Dataset / DOI / 10.1002/0470841559.ch1'
                    break
                case 'file-list-private':
                    headInfo = {
                        html: 'FILES OF MY DATASET',
                        length: 250
                    }
                    privateView = true
                    path = 'List & Search Files of my Dataset / Dual Color Imaging from a Single BF2 ...'
                    break
            }
            this.uiStore.setSubPath(path)

            const animateAll = privateView !== this.privateView
            this.privateView = privateView
            const delay = this.updateHeadNav(privateView, animateAll, headInfo)

            let goOuts = [...Object.keys(this.boxes)]
            goOuts[goOuts.indexOf('main-nav')] = null
            goOuts[goOuts.indexOf('mock-config')] = null
            if (options._00 && _.isPlainObject(options._00.targets)) {
                goOuts = [...Object.keys(options._00.targets)]
            }

            let goIns = {}
            switch (this.viewMode) {
                // v2
                case 'home':
                    goIns = {
                        'landing-page': { delay: 0.1, speed: 0.8 }
                    }
                    break
                case 'mywork':
                    goIns = {
                        'mywork-page': { delay: 0.1, speed: 0.8 },
                        'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-new-dataset-only' }
                    }
                    break
                case 'search':
                    goIns = {
                        'search-page': { delay: 0.1, speed: 0.8 },
                        'search-page-facets-dn-inner': { delay: 0.1, speed: 0.8 }
                    }
                    break
                case 'public-dataset':
                    goIns = {
                        'dataset-view-public': { delay: 0.1, speed: 0.4 },
                        'head-controls': { delay: 0.1, speed: 0.4 },
                        'r2-messages': { delay: 0.1, speed: 0.4 }
                    }
                    break
                case 'private-dataset':
                case 'initial-dataset':
                    goIns = {
                        'dataset-view-private-content': {
                            delay: 0.1,
                            speed: 0.4,
                            view: 'dataset-view-private-content'
                        },
                        'dataset-view-private-infos': {
                            delay: 0.1,
                            speed: 0.4,
                            view: 'dataset-view-private-infos'
                        },
                        'head-controls': { delay: 0.1, speed: 0.4, view: 'head-controls-new-dataset-only' },
                        'dataset-controls': { delay: 0.1, speed: 0.4 },
                        'r2-messages': { delay: 0.1, speed: 0.4 },
                        'dataset-actions': { delay: 0, speed: 0.4 }
                    }
                    if (this.viewMode === this.viewModePrev) {
                        goIns['dataset-controls'] = { delay: 0, speed: 0 }
                    }
                    if (this.viewMode === 'initial-dataset') {
                        goIns['dataset-view-private-content'].view = 'dataset-view-private-init-content'
                        goIns['dataset-view-private-infos'].view = 'dataset-view-private-init-infos'
                    }
                    break
                case 'file-list-public':
                case 'file-list-private':
                    goIns = {
                        'file-list': { delay: 0.1, speed: 0.4, view: 'file-list-collection-closed' },
                        'r2-messages': { delay: 0.1, speed: 0.4 }
                    }
                    break
            }

            if (options._00 && options._00.targets) {
                goIns = options._00.targets
            }
            this.animateOut(goOuts, goIns, options, delay)
        },

        animateOut(goOuts, goIns, options, delay = 0) {
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
                //
                let visibility = 'visible'
                switch (true) {
                    case view.modal && !this.isModalOverlay:
                    case !view.modal && this.isModalOverlay:
                        visibility = 'hidden'
                }
                gsap.set($targetView, {
                    visibility
                })
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
            setTimeout(() => {
                globals.eventBus.$emit('updateActiveView')
            }, 10)
        },

        setModalOverlay(yes) {
            yes = yes === true
            if (this.isModalOverlay) {
                const tg = `.centered-view .modal-bg`
                yes ? $(tg).css('visibility', 'visible') : $(tg).css('visibility', 'hidden')
                this.showCage = yes
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
