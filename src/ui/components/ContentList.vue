<template>
    <div class="content-list" :key="uKey">
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
    data() {
        return {
            uKey: 0
        }
    },
    created() {
        globals.eventBus.$on('updateDataView', this.onUpdateDataView)
        this.updateList()
    },
    onBeforeUnmount() {
        globals.eventBus.$off('updateDataView', this.onUpdateDataView)
    },
    methods: {
        update() {
            this.uKey = this.uKey > 1000 ? 1 : ++this.uKey
        },
        onUpdateDataView(args) {
            if (args.schemaKey === this.config.schemaKey && args.dataKey === this.config.dataKey) {
                this.updateList()
                this.update()
            }
        },
        onSubClick(props) {
            this.$emit('subClick', props)
        },
        updateList() {
            this.list = datasource.getR2DataHandler().getData(this.config.schemaKey, this.config.dataKey)
        }
    }
}
</script>
