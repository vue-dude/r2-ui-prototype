<template>
    <div class="label" v-html="config.label"></div>
    <el-input
        v-if="config.type === 'input'"
        v-model="config.selected"
        :placeholder="config.plc"
        suffix-icon="el-icon-date"
        size="mini"
    />

    <el-select
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
    }
}
</script>
