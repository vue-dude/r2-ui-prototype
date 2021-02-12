<template>
    <div class="form-container" :class="uid" v-show="true">
        <div class="index-group-space" :id="index"></div>
        <div v-for="(group, index) in form" :key="index" :id="index" class="index-group">
            <div v-for="(item, setup, key) in group" :key="key">
                <div class="input-container" v-if="item.isInputElement">
                    <div class="input-cell" :class="item.key">
                        <dynamic-form-cell :config="item" @changed="onFormItemChanged" />
                    </div>
                </div>
                <div
                    class="ui-element"
                    :class="item.layout.classes"
                    v-if="item.isUiElement"
                    v-html="item.label"
                    @click.stop="onClickItem(item)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
// v-on="{ click: item.layout.onClick ? onClick(item.layout.onClick) : null }"

import DynamicFormHandler from '@/ui/js/DynamicFormHandler'
import DynamicFormCell from '@/ui/components/DynamicFormCell'
export default {
    components: {
        DynamicFormCell
    },
    props: {
        config: {}
    },
    data() {
        return {
            preload: false,
            fh: null,
            dataHandler: datasource.getR2DataHandler(), // make generic
            form: [],
            uid: globals.getUid(),
            lastTabIndex: 0,
            dataKey: null,
            schemaKey: null
        }
    },
    created() {
        // globals.eventBus.$on('invokeSaveDataAction', this.onSaveDataAction)
        console.log('GFC:created this.config = ', this.config)
        // if (this.sKey && this.dKey) {
        this.updateForm(true)
        // }
    },
    onBeforeUnmount() {
        // globals.eventBus.$off('updateMetaEditor', this.onUpdateMetaEditor)
        // globals.eventBus.$off('invokeSaveDataAction', this.onSaveDataAction)
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
        onClickItem(itemConfig) {
            if (_.isFunction(this.config.onClickItem)) {
                this.config.onClickItem(itemConfig)
            }
        },
        onFormItemChanged(itemConfig) {
            // TODO find reason why his event also is fired on clicking a ui element,
            // e.g. the close button!
            if (_.isFunction(this.config.onFormItemChanged)) {
                this.config.onFormItemChanged(itemConfig)
            }
        },
        onSaveDataAction() {
            // console.log('GFC:onSaveDataAction ')
            // if (this.formHandler) {
            //     let data = this.formHandler.getData() //[this.dataKey]
            //     data = data[this.dataKey] ? data[this.dataKey] : data
            //     console.log('GFC:onSaveDataAction data = ', data)
            //     this.dataHandler.setData(this.sKey, this.dKey, data)
            //     this.dataKey = null
            // }
        },

        // onUpdateMetaEditor() {
        //     if (this.dataKey !== `${this.sKey}-${this.dKey}`) {
        //         this.preload = true
        //         this.dataKey = `${this.sKey}-${this.dKey}`
        //         this.formHandler = null
        //         this.form = []
        //         this.expandableList = false
        //         this.updateForm(true)
        //         setTimeout(() => {
        //             this.preload = false
        //         }, 1000)
        //     }
        // },
        updateForm(createNew = false) {
            const schema = this.sKey ? this.dataHandler.getSchema(this.sKey, this.dKey) : this.config.schema
            console.log('GFC:updateForm createNew = ', createNew)
            console.log('GFC:updateForm schema = ', schema)
            if (createNew) {
                const rawData = this.dKey
                    ? this.dataHandler.getData(this.sKey, this.dKey)
                    : this.config.data
                    ? this.config.data
                    : {}
                console.log('GFC:updateForm this.sKey, this.dKey = ', this.sKey, this.dKey)
                console.log('GFC:updateForm rawData = ', rawData)
                console.log('GFC:updateForm schema = ', schema)
                if (schema) {
                    this.formHandler = new DynamicFormHandler({ convertSelectedArraysToStrings: false })
                    this.fhForm = this.formHandler.getForm(rawData, schema)
                }
            } else {
                this.fhForm = this.formHandler.getForm()
            }
            console.log('GFC:updateForm this.fhForm = ', this.fhForm)

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
                    elm.isUiElement = false
                    switch (elm.type) {
                        case 'ui':
                            elm.isUiElement = true
                            break
                        case 'input':
                        case 'select':
                        case 'radio':
                            elm.isInputElement = true
                            elm.plc = this.$t(`form.item.label.${elm.key}`)
                            elm.label = this.$t(`form.item.label.${elm.key}`)
                            if (elm.type === 'select') {
                                if (elm.options && elm.options.key) {
                                    const dropdownConfig = this.dataHandler.getDropdownConfig(
                                        elm.options.key,
                                        elm.selected
                                    )
                                    elm.options = dropdownConfig.options
                                    elm.selected = dropdownConfig.selected
                                    // TODO explore the placeholder-not-show bug in multiselect
                                    // elm.selected = null
                                }
                            }
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
        }
    }
}
</script>
