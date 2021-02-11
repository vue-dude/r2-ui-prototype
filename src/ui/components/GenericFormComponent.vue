<template>
    <div class="form-container" :class="uid" v-show="true">
        <div class="index-group-space" :id="index"></div>
        <div v-for="(group, index) in form" :key="index" :id="index" class="index-group">
            <div v-for="(item, setup, index) in group" :key="index">
                <div class="input-container" v-if="item.isInputElement">
                    <div class="input-cell">
                        <dynamic-form-cell :config="item" @changed="onFormCellChanged" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        if (this.sKey && this.dKey) {
            this.updateForm(true)
        }
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
        onFormCellChanged(cellConfig) {
            console.log('GFC:onFormCellChanged this.config = ', this.config)
            console.log('GFC:onFormCellChanged cellConfig = ', cellConfig)
            if (_.isFunction(this.config.onChange)) {
                this.config.onChange(cellConfig)
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
            const schema = this.dataHandler.getSchema(this.sKey, this.dKey)
            console.log('GFC:updateForm createNew = ', createNew)
            console.log('GFC:updateForm schema = ', schema)
            if (createNew) {
                const data = this.dataHandler.getData(this.sKey, this.dKey)
                console.log('GFC:updateForm this.sKey, this.dKey = ', this.sKey, this.dKey)
                console.log('GFC:updateForm data = ', data)
                if (schema) {
                    this.formHandler = new DynamicFormHandler({ convertSelectedArraysToStrings: false })
                    this.fhForm = this.formHandler.getForm(data, schema)
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
                    switch (elm.type) {
                        case 'input':
                        case 'select':
                        case 'radio':
                            elm.isInputElement = true
                    }
                    switch (elm.type) {
                        case 'select':
                            console.log('GFC:SCAN select elm.options = ', elm.options)
                            if (elm.options && elm.options.key) {
                                const dropdownConfig = this.dataHandler.getDropdownConfig(elm.options.key, elm.selected)
                                elm.options = dropdownConfig.options
                                elm.selected = dropdownConfig.selected
                            }
                        // TODO explore the placeholder-not-show bug in multiselect
                        // elm.selected = null
                    }
                    console.log('GFC:SCAN select elm.options = ', elm.options)

                    elm.plc = this.$t(`form.item.label.${elm.key}`)
                    elm.label = this.$t(`form.item.label.${elm.key}`)
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
