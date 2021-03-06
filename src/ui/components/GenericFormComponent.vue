<template>
    <div class="form-container" :class="uid" v-show="true">
        <div class="index-group-space" :id="index"></div>
        <div v-for="(group, index) in form" :key="index" :id="index" class="index-group">
            <div v-for="(item, setup, key) in group" :key="key" @keydown="evt => onKeyDown(item, evt)">
                <div class="input-container" v-if="item.isInputElement">
                    <div class="input-cell" :class="item.key">
                        <generic-form-cell :config="item" @changed="onFormItemChanged" />
                    </div>
                </div>
                <div
                    class="ui-element"
                    :class="[item.key, item.layout.classes]"
                    v-if="item.isUiElement"
                    v-html="item.label !== null ? $t(item.label) : null"
                    @click.stop="evt => onClickItem(item, evt)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import DynamicFormHandler from '@/ui/js/DynamicFormHandler'
import GenericFormCell from '@/ui/components/GenericFormCell'
export default {
    components: {
        GenericFormCell
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
        this.updateForm(true)
        if (_.isFunction(this.config.onCreate)) {
            this.config.onCreate(this.config, this)
        }
    },
    onBeforeUnmount() {
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
        onClickItem(itemConfig, evt) {
            if (_.isFunction(this.config.onClickItem)) {
                this.config.onClickItem(itemConfig, evt, this)
            }
        },
        onKeyDown(itemConfig, evt) {
            if (_.isFunction(this.config.onKeyDown)) {
                this.config.onKeyDown(itemConfig, evt, this)
            }
        },
        onFormItemChanged(itemConfig, evt) {
            // TODO find reason why his event also is fired on clicking a ui element,
            // e.g. the close button!
            if (_.isFunction(this.config.onFormItemChanged)) {
                this.config.onFormItemChanged(itemConfig, evt, this)
            }
        },

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
                    console.log('GFC:updateListElement elm.plc = ', { ...elm }.plc)
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
                            // elm.plc = this.$t(`form.item.label.${elm.key}`)
                            if (elm.label !== null) {
                                if (elm.label === '') {
                                    elm.label = `form.item.label.${elm.key}`
                                }
                            }
                            if (elm.plc !== null) {
                                if (elm.plc === '') {
                                    elm.plc = `form.item.label.${elm.key}`
                                }
                            }
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
                            // TODO check this with the new label === null -> noLabel feature
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
