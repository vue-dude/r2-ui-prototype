<template>
    <div class="content-cell" :class="uid" :key="uKey">
        <div class="cell-element" v-for="(cmp, key) in components" :key="key">
            <dataset-list-item
                v-if="cmp.component === 'dataset-list-item'"
                :class="[key, cmp.classes]"
                :config="cmp.config"
                :data="data"
                @subClick="onSubClick"
            ></dataset-list-item>
            <generic-form
                v-if="cmp.component === 'generic-form'"
                :class="[key, cmp.classes]"
                :config="cmp.config"
            ></generic-form>
            <div v-if="cmp.type === 'ui'" class="ui-element" :class="[key, cmp.classes]" v-html="cmp.text"></div>
        </div>
    </div>
</template>

<script>
//
import ActiveListComponent from '@/ui/components/ActiveListComponent.vue'
import DatasetListItem from '@/ui/components/DatasetListItem.vue'
import GenericForm from '@/ui/components/GenericFormComponent.vue'

export default {
    components: {
        ActiveListComponent,
        DatasetListItem,
        GenericForm
    },
    props: {
        config: {},
        data: {}
    },
    computed: {
        components() {
            return this.config && this.config.components ? this.config.components : {}
        }
    },
    methods: {
        onSubClick(props) {
            this.$emit('subClick', props)
        }
    }
}
</script>
