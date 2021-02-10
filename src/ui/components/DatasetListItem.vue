<template>
    <div class="component dataset-list-item">
        <div class="text-cage">
            <div class="title" v-html="data.title"></div>
            <div class="authors" v-html="data.authors"></div>
            <div class="teaser-cage">
                <div class="teaser" v-html="data.teaser"></div>
            </div>
        </div>
        <div class="icon dataset-open-eye"></div>
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
        console.log('DLI:created this.config.showAs = ', this.config.showAs)
        console.log('DLI:created this.data.familyName = ', this.data.familyName)
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
