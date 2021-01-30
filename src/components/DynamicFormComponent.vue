<template>
    <!-- <div class="form-container" @keydown.tab.prevent="onKeyDownTab"> -->
    <!-- <div class="preloader" v-show="preload">
        <i class="el-icon-loading"></i>
    </div>
    -->
    <div class="form-container" v-show="true">
        <div class="top space" v-if="form.length > 0">
            <div class="add-index-group">
                <div class="r2-circle-button bt-action icon add"></div>
            </div>
        </div>
        <div v-for="(group, index) in form" :key="index" class="index-group">
            <!-- <div class="left-side">
                <div v-for="(item, setup, index) in group" :key="index">
                    <div class="input-container" v-if="item.isInputElement">
                        <div class="input-cell" v-if="item.__strc.classes === 'left'">
                            <div class="label" v-html="item.label"></div>
                            <el-input
                                v-if="item.type === 'input'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                suffix-icon="el-icon-date"
                                size="mini"
                            />
                            <el-select
                                v-if="item.type === 'dropdown'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                prefix-icon="el-icon-date"
                                size="mini"
                                setup="getDropdownConfig(item.options.key)"
                            >
                                <el-option
                                    v-for="(option, index) in setup.options"
                                    :key="index"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="right-side">
                <!-- <div v-for="(item, index) in group" :key="index" :setup="(item.ddc = getDropdownConfig('departments'))"> -->
                <div v-for="(item, index) in group" :key="index" :setup="(item = addItemConfig(item))">
                    <div class="input-container" v-if="item.isInputElement">
                        <div class="input-cell" v-if="item.__strc.classes === 'right'">
                            <div class="label" v-html="item.label"></div>
                            <el-input
                                v-if="item.type === 'input'"
                                v-model="item.selected"
                                :placeholder="item.selected"
                                suffix-icon="el-icon-date"
                                size="mini"
                            />
                            <el-select
                                v-if="item.type === 'dropdown'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                prefix-icon="el-icon-date"
                                size="mini"
                            >
                                <el-option
                                    v-for="(option, index) in item.ddc.options"
                                    :key="index"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="r2-circle-button bt-danger icon trash"></div>
            <div class="add-index-group">
                <div class="r2-circle-button bt-action icon add"></div>
            </div>
            <div class="move-controls">
                <div class="buttons">
                    <div class="r2-circle-button bt-action violet icon move-to-first"></div>
                    <div class="r2-circle-button bt-action violet icon move-1-up"></div>
                    <div class="space"></div>
                    <div class="r2-circle-button bt-action violet icon move-1-down"></div>
                    <div class="r2-circle-button bt-action violet icon move-to-end"></div>
                </div>
            </div>
            <div class="group-headline">
                <div class="shape sh-1"></div>
                <div class="shape sh-2"></div>
                <div class="label" v-html="group[0].label"></div>
            </div>
        </div>
    </div>
</template>

<script>
import DynamicFormHandler from '@/js/DynamicFormHandler'
// import VueDynamicForm from 'vue-dynamic-form-component' // dont works with vue-3
export default {
    components: {
        // VueDynamicForm
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
            dataKey: null
        }
    },
    created() {
        globals.eventBus.$on('updateMetaEditor', this.onUpdateMetaEditor)
    },
    onBeforeUnmount() {
        globals.eventBus.$off('updateMetaEditor', this.onUpdateMetaEditor)
        this.fh = null
    },
    methods: {
        addItemConfig(item) {
            console.log('DFC:getItemConfig item ', item)
            if (item.type === 'dropdown') {
                item.ddc = this.r2DataHandler.getDropdownConfig('departments')
                console.log('DFC:getItemConfig item.selected ', item.selected)
                if (_.isNumber(item.selected)) {
                    item.selected = item.ddc.options[item.selected].value
                }
            }
            return item
        },
        getDropdownConfig(key) {
            const res = this.r2DataHandler.getDropdownConfig(key)
            console.log('DFC:getOptions res ', res)

            return res.options
        },
        onUpdateMetaEditor() {
            if (this.dataKey !== this.config.key) {
                this.preload = true
                this.dataKey = this.config.key
                console.log('DFC:onUpdateMetaEditor uid ', this.uid)
                this.fh = null
                this.form = []
                this.updateForm()
                setTimeout(() => {
                    this.preload = false
                }, 1000)
            }
        },
        updateForm() {
            console.log('DFC:updateForm this.config.key = ', this.config.key)
            const data = this.r2DataHandler.meta[`data-${this.config.key}`]
            const schema = this.r2DataHandler.meta[`schema-${this.config.key}`]
            if (schema) {
                this.fh = new DynamicFormHandler()
                this.fhForm = this.fh.getForm(data, schema)
                let tabIndex = 0
                this.form = []
                let target = null
                let lastIndex = -1
                _.each(this.fhForm, elm => {
                    switch (elm.type) {
                        case 'input':
                        case 'dropdown':
                            elm.tabIndex = ++tabIndex
                    }
                    elm.isInputElement = false
                    switch (elm.type) {
                        case 'input':
                        case 'dropdown':
                            elm.isInputElement = true
                    }

                    if (elm.__strc.lastIndex >= 0) {
                        if (elm.__strc.lastIndex > lastIndex) {
                            lastIndex = elm.__strc.lastIndex
                            target = []
                            this.form.push(target)
                        }
                        target.push(elm)
                    }
                })
                this.form.pop() // mock, remove the last 'add' element
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
            console.log('FORM:onKeyDownTab tabindex = ', tabindex)

            let nextIndex
            if (evt.shiftKey) {
                nextIndex = tabindex === 1 ? this.numOfTabs : tabindex - 1
            } else {
                nextIndex = tabindex >= this.numOfTabs ? 1 : tabindex + 1
            }
            console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            const sel = `.form-container [tabindex=${nextIndex}]`
            const $next = $(sel)
            console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            // $next.focus({ preventScroll: true }) // dont works and without its scroll hassle !!
            // $next.select() // this dont works with dropdowns, drops key enter feature
            $next.focus()
        }
    }
}
</script>
