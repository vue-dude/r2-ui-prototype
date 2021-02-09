<template>
    <div class="dataset-list-item">
        <div class="title">{{ data.metadata.title }}</div>
        <div class="teaser">{{ data.metadata.description }}</div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        config: {},
        data: {}
    },
    data() {
        return {
            // uid: globals.getUid(),
            // dataKey: null,
            // uKey: 0,
            // r2DataHandler: datasource.getR2DataHandler()
        }
    },
    created() {
        console.log('DLI:created this.config.showAs = ',this.config.showAs)
        console.log('DLI:created this.data.familyName = ',this.data.familyName)
        // globals.eventBus.$on('invokeSaveDataAction', this.onSaveDataAction)
        // this.updateList()
    },
    onBeforeUnmount() {
        // globals.eventBus.$off('invokeSaveDataAction', this.onSaveDataAction)
    },
    methods: {
        update() {
            this.uKey = this.uKey > 1000 ? 1 : ++this.uKey
        }
    }
}
</script>
