<template>
    <div class="content-list">
        <content-cell
            v-for="(row, indexRow) in list"
            :key="indexRow"
            :config="config.contentCellConfig"
            :data="row"
            @subClick="onSubClick"
        ></content-cell>
    </div>
</template>

<script>
//
import ContentCell from '@/ui/components/ContentCell.vue'

export default {
    components: {
        ContentCell
    },
    props: {
        config: {}
    },
    created() {
        this.updateList()
    },
    methods: {
        onSubClick(props) {
            this.$emit('subClick', props)
        },
        updateList() {
            this.list = datasource.getR2DataHandler().getData(this.config.schemaKey, this.config.dataKey)
        }
    }
}
</script>
