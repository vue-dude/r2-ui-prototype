<template>
    <!-- <div class="form-container" @keydown.tab.prevent="onKeyDownTab"> -->
    <!-- <div class="preloader" v-show="preload">
        <i class="el-icon-loading"></i>
    </div>
    -->
    <div class="form-container" :class="uid" v-show="true">
        <div class="top space">
            <div class="add-index-group" v-if="expandableList" @click="onControlClick(0, 'addNode')">
                <div class="r2-circle-button bt-action icon add"></div>
            </div>
        </div>
        <div class="index-group-space" :id="index"></div>
        <div
            v-for="(group, index) in form"
            :key="index"
            :id="index"
            class="index-group"
            :class="[{ expandable: expandableList }]"
        >
            <div class="left-side">
                <div v-for="(item, setup, index) in group" :key="index">
                    <div class="input-container" v-if="item.isInputElement">
                        <div class="input-cell" v-if="item.layout.classes === 'left'">
                            <generic-form-cell :config="item" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <!-- the :setup thing works but bad, it retriggers because it causes a mutation -->
                <!-- <div v-for="(item, index) in group" :key="index" :setup="(item = addItemConfig(item))"> -->
                <div v-for="(item, index) in group" :key="index">
                    <div class="input-container" v-if="item.isInputElement">
                        <div class="input-cell" v-if="item.layout.classes === 'right'">
                            <generic-form-cell :config="item" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="expandableList">
                <div class="r2-circle-button bt-danger icon trash" @click="onControlClick(index, 'removeNode')"></div>
                <div class="add-index-group" @click="onControlClick(index + 1, 'addNode')">
                    <div class="r2-circle-button bt-action icon add"></div>
                </div>
                <div class="move-controls">
                    <div class="buttons">
                        <div
                            class="r2-circle-button bt-action violet icon move-to-first"
                            @click="onControlClick(index, 'shift2FirstNode')"
                        ></div>
                        <div
                            class="r2-circle-button bt-action violet icon move-1-up"
                            @click="onControlClick(index, 'shift1UpNode')"
                        ></div>
                        <div class="space"></div>
                        <div
                            class="r2-circle-button bt-action violet icon move-1-down"
                            @click="onControlClick(index, 'shift1DownNode')"
                        ></div>
                        <div
                            class="r2-circle-button bt-action violet icon move-to-end"
                            @click="onControlClick(index, 'shift2LastNode')"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="group-headline" :class="[{ expandable: expandableList }]">
                <div class="shape sh-1"></div>
                <div class="shape sh-2"></div>
                <div class="label" v-html="`${group[0].label.split('-')[0]}.${index}`"></div>
            </div>
        </div>
    </div>
</template>

<script>
// TODO refactor to "MetaFormComponent"
import DynamicFormHandler from '@/ui/js/DynamicFormHandler'
import GenericFormCell from '@/ui/components/GenericFormCell'
// import VueDynamicForm from 'vue-dynamic-form-component' // dont works with vue-3
export default {
    components: {
        // VueDynamicForm
        GenericFormCell
    },
    props: {
        config: {}
    },
    data() {
        return {
            preload: false,
            fh: null,
            r2DataHandler: datasource.getR2DataHandler(),
            form: [],
            uid: globals.getUid(),
            lastTabIndex: 0,
            dataKey: null,
            schemaKey: null
        }
    },
    created() {
        globals.eventBus.$on('updateMetaEditor', this.onUpdateMetaEditor)
        globals.eventBus.$on('invokeSaveDataAction', this.onSaveDataAction)
        if (this.sKey && this.dKey) {
            this.updateForm(true)
        }
    },
    onBeforeUnmount() {
        globals.eventBus.$off('updateMetaEditor', this.onUpdateMetaEditor)
        globals.eventBus.$off('invokeSaveDataAction', this.onSaveDataAction)
        this.formHandler = null
    },
    computed: {
        sKey() {
            return this.config.schemaKey
        },
        dKey() {
            return this.config.dataKey
        }
    },
    methods: {
        animateUpdate(index, action) {
            if (action === 'addNode') {
                const sel = `.form-container.${this.uid} .index-group.expandable#${index}`
                const $target = $(sel)
                gsap.set($target, { opacity: 0 })
                gsap.to($target, 0.4, { opacity: 1, ease: Expo.easeOut })
                gsap.from($target, 0.7, { 'margin-left': -40, ease: Expo.easeOut })
            } else {
                const all = `.form-container.${this.uid} .index-group.expandable`
                const $all = $(all)
                gsap.set($all, { clearProps: 'all' })
            }
        },
        animateAction(index, action, finalize) {
            const sel = `.form-container.${this.uid} .index-group.expandable#${index}`
            const $target = $(sel)
            // console.log('DFC:animateAction sel ', sel)
            // console.log('DFC:animateAction $target ', $target)
            // console.log('DFC:animateAction index ', index)
            // console.log('DFC:animateAction this.form.length ', this.form.length)
            // return finalize(index, action)

            const onComplete = silent => {
                silent ? null : finalize(index, action)
                gsap.killTweensOf($target)
                gsap.set($target, {
                    clearProps: 'all'
                })
            }

            switch (action) {
                case 'addNode':
                    if (index >= this.form.length) {
                        return onComplete() // no out animation needed!
                    }
                    gsap.delayedCall(0.2, onComplete)
                    return gsap.to($target, 0.6, {
                        'margin-top': 230, // ui-preview hardcoded
                        ease: Expo.easeOut
                    })

                case 'removeNode':
                    gsap.set($target, { overflow: 'hidden' })
                    gsap.to($target, 0.4, { opacity: 0, 'margin-left': 600 })
                    return gsap.to($target, 0.3, {
                        delay: 0.2,
                        height: 0,
                        'margin-bottom': 0,
                        ease: Expo.easeOut,
                        onComplete
                    })

                case 'shift1UpNodeDEAKT':
                    const selUp = `.form-container.${this.uid} .index-group.expandable#${index - 1}`
                    const $targetUp = $(selUp)
                    const selDn = `.form-container.${this.uid} .index-group.expandable#${index + 1}`
                    const $targetDn = $(selDn)

                    // console.log('DFC:animateAction $target.height() = ', $target.height())
                    // console.log('DFC:animateAction $target.targetUp() = ', $targetUp.height())

                    const space = `.form-container.${this.uid} .index-group-space#${index - 1}`
                    const $space = $(space)

                    // index-group-space

                    // gsap.to($target, 10.6, {
                    //     'margin-top': -230 * 2, // ui-preview hardcoded
                    //     ease: Expo.easeOut,
                    //     onComplete
                    // })
                    // gsap.to($targetUp, 10.6, {
                    //     'margin-top': 230, // ui-preview hardcoded
                    //     ease: Expo.easeOut,
                    //     onComplete: () => onComplete(true)
                    // })
                    // gsap.to($targetDn, 10.6, {
                    //     'margin-top': 230 * 2, // ui-preview hardcoded
                    //     ease: Expo.easeOut,
                    //     onComplete: () => onComplete(true)
                    // })
                    return
                default:
                    return finalize(index, action)
            }
        },

        onControlClick(index, action) {
            // console.log('DFC:onControlClick IN uid, index ', this.uid, index)
            // console.log('DFC:onControlClick action ', action)
            const finalize = (index, action) => {
                // console.log('DFC:onControlClick:finalize index, action ', index, action)
                const mod = {
                    tree: [this.dataKey, index, 'url'],
                    action
                }
                this.formHandler.modifyForm(mod)
                this.updateForm(false)
                this.$nextTick(() => this.animateUpdate(index, action))
                // this.form = []
                setTimeout(() => {
                    // update scroller and scroll position
                    globals.eventBus.$emit('updateActiveView', {
                        targets: ['dataset-actions'],
                        keepScrollPosition: true
                    })
                }, 100)
            }
            return this.animateAction(index, action, finalize)
        },

        onSaveDataAction() {
            console.log('DFC:onSaveDataAction ')
            if (this.formHandler) {
                let data = this.formHandler.getData() //[this.dataKey]
                data = data[this.dataKey] ? data[this.dataKey] : data
                console.log('DFC:onSaveDataAction data = ', data)
                this.r2DataHandler.setMetaData(this.sKey, this.dKey, data)
                this.dataKey = null
            }
        },

        onUpdateMetaEditor() {
            if (this.dataKey !== `${this.sKey}-${this.dKey}`) {
                this.preload = true
                this.dataKey = `${this.sKey}-${this.dKey}`
                this.formHandler = null
                this.form = []
                this.expandableList = false
                this.updateForm(true)
                setTimeout(() => {
                    this.preload = false
                }, 1000)
            }
        },
        updateForm(createNew = false) {
            const schema = this.r2DataHandler.getSchema(this.sKey, this.dKey)
            console.log('DFC:updateForm createNew = ', createNew)
            console.log('DFC:updateForm schema = ', schema)
            if (createNew) {
                const data = this.r2DataHandler.getData(this.sKey, this.dKey)
                console.log('DFC:updateForm this.sKey, this.dKey = ', this.sKey, this.dKey)
                console.log('DFC:updateForm data = ', data)
                if (schema) {
                    this.formHandler = new DynamicFormHandler({ convertSelectedArraysToStrings: false })
                    this.fhForm = this.formHandler.getForm(data, schema)
                }
            } else {
                this.fhForm = this.formHandler.getForm()
            }
            console.log('DFC:updateForm this.fhForm = ', this.fhForm)

            if (schema) {
                //
                let tabIndex = 0
                this.form = []
                let target = null
                let lastIndex = -1
                this.expandableList = true

                const updateListElement = elm => {
                    switch (elm.type) {
                        case 'input':
                        case 'select':
                            elm.tabIndex = ++tabIndex
                    }
                    elm.isInputElement = false
                    switch (elm.type) {
                        case 'input':
                        case 'select':
                            elm.isInputElement = true
                    }
                    switch (elm.type) {
                        case 'select':
                            const dropdownConfig = this.r2DataHandler.getDropdownConfig(elm.options.key, elm.selected)
                            elm.options = dropdownConfig.options
                            elm.selected = dropdownConfig.selected
                        // TODO explore the placeholder-not-show bug in multiselect
                        // elm.selected = null
                    }
                    elm.plc = this.$t(`form.item.plc.${elm.label}`)
                    elm.label = this.$t(`form.item.label.${elm.label}`)
                    if (!elm.layout.classes) {
                        elm.layout.classes = 'left'
                    }
                }

                if (schema[`${this.sKey}-${this.dKey}`]) {
                    _.each(this.fhForm, elm => {
                        updateListElement(elm)
                        if (elm.__strc.lastIndex >= 0) {
                            if (elm.__strc.lastIndex > lastIndex) {
                                lastIndex = elm.__strc.lastIndex
                                target = []
                                this.form.push(target)
                            }
                            target.push(elm)
                        }
                    })
                    this.form.pop()
                } else {
                    this.expandableList = false
                    target = [
                        {
                            label: this.$t(`form.group.label.${this.sKey}`)
                        }
                    ]
                    _.each(this.fhForm, elm => {
                        updateListElement(elm)
                        target.push(elm)
                    })
                    this.form.push(target)
                }
            }
        },

        initTabSetup() {
            const $sel = $('.form-container .controls button')
            $sel.attr('tabindex', -1)
            this.numOfTabs = tabIndex
        },
        // obsolete for now, returned to browser native tabbing
        onKeyDownTab(evt) {
            // Simple test function for focus handling
            // default bowser method sadly destroys coded scroll setup
            // const $focused = $('.form-container .form-elements :focus')
            const $focused = $('.form-container :focus')

            let tabindex = parseInt($focused.attr('tabindex'))
            tabindex = isNaN(tabindex) ? this.lastTabIndex : tabindex
            this.lastTabIndex = tabindex
            // console.log('FORM:onKeyDownTab tabindex = ', tabindex)

            let nextIndex
            if (evt.shiftKey) {
                nextIndex = tabindex === 1 ? this.numOfTabs : tabindex - 1
            } else {
                nextIndex = tabindex >= this.numOfTabs ? 1 : tabindex + 1
            }
            // console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            const sel = `.form-container [tabindex=${nextIndex}]`
            const $next = $(sel)
            // console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            // $next.focus({ preventScroll: true }) // dont works and without its scroll hassle !!
            // $next.select() // this dont works with dropdowns, drops key enter feature
            $next.focus()
        }
    }
}
</script>
