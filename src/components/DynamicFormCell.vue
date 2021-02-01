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
        v-if="config.type === 'dropdown'"
        v-model="config.selected"
        :placeholder="config.plc"
        prefix-icon="el-icon-date"
        size="mini"
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
