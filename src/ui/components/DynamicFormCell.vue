<template>
    <div class="label" v-html="$t(config.label)"></div>
    <div class="form-element radio-cage" @change="onChange" v-if="config.type === 'radio'">
        <el-radio-group v-model="config.selected">
            <el-radio v-for="(option, index) in config.options" :key="index" :label="option.value">
                {{ $t(option.label) }}
            </el-radio>
        </el-radio-group>
    </div>

    <el-input
        class="form-element"
        v-if="config.type === 'input'"
        v-model="config.selected"
        :placeholder="$t(config.plc)"
        :suffix-icon="config.suffixIcon"
        :prefix-icon="config.prefixIcon"
        size="mini"
        :type="config.isTextArea ? 'textarea' : 'input'"
        :autosize="config.autoSize || false"
    />

    <el-select
        class="form-element"
        v-if="config.type === 'select'"
        v-model="config.selected"
        @change="onChange"
        :placeholder="$t(config.plc)"
        :prefix-icon="config.prefixIcon"
        size="mini"
        :multiple="config.allowMultipleSelections"
        :filterable="config.allowMultipleSelections || config.canFilter"
        :allow-create="config.canCreateTags"
        default-first-option
    >
        <el-option
            v-for="(option, index) in config.options"
            :key="index"
            :label="$t(option.label)"
            :value="option.value"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        config: {}
    },
    data() {
        return {
            uiStore: globals.uiStore,
            storeBinding: null
        }
    },
    created() {
        if (_.isString(this.config.selected)) {
            const spl = this.config.selected.split(':')
            // dynamical set this.$watch dont works, vue 3 problem ??
            if (spl[0] === 'UI_STORE') {
                this.config.selected = this.uiStore.state.searchTerm
                this.storeBinding = spl[1]
            }
        }
    },
    methods: {
        onChange() {
            // this dont works in text input fields!
            this.$emit('changed', this.config)
        }
    },
    watch: {
        'uiStore.state.uKey'() {
            if (this.storeBinding) {
                console.log(this.uiStore.state[this.storeBinding])
                this.config.selected = this.uiStore.state[this.storeBinding]
            }
        },
        deep: true
    }
}
</script>
