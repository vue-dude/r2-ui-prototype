<template>
    <div class="label" v-html="config.label"></div>
    <div class="form-element radio-cage" @change="onChange" v-if="config.type === 'radio'">
        <el-radio-group v-model="config.selected">
            <el-radio v-for="(option, index) in config.options" :key="index" :label="option.value">
                {{ option.label }}
            </el-radio>
        </el-radio-group>
    </div>

    <el-input
        class="form-element"
        v-if="config.type === 'input'"
        v-model="config.selected"
        :placeholder="config.plc"
        suffix-icon="el-icon-date"
        size="mini"
        :type="config.isTextArea ? 'textarea' : 'input'"
        :autosize="config.autoSize || false"
    />

    <el-select
        class="form-element"
        v-if="config.type === 'select'"
        v-model="config.selected"
        :placeholder="config.plc"
        prefix-icon="el-icon-date"
        size="mini"
        :multiple="config.allowMultipleSelections"
        :filterable="config.allowMultipleSelections || config.canFilter"
        :allow-create="config.canCreateTags"
        default-first-option
    >
        <el-option
            v-for="(option, index) in config.options"
            :key="index"
            :label="option.label"
            :value="option.value"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        config: {}
    },
    created() {
        console.log('DC: this.config = ', this.config)
    },
    methods: {
        onChange() {
            this.$emit('changed', this.config)
        }
    }
}
</script>
