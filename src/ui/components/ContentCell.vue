<template>
    <div class="content-cell" :class="uid" :key="uKey">
        <div class="cell-element" v-for="(cmp, index) in components" :key="index">
            <!-- <dynamic-form v-if="cmp.component === 'dynamic-form'" :config="cmp.config"></dynamic-form> -->
            <!-- <active-list v-if="cmp.component === 'active-list'" :config="cmp.config"></active-list> -->
            <dataset-list-item
                v-if="cmp.component === 'dataset-list-item'"
                :config="cmp.config"
                :data="data"
                @subClick="onSubClick"
            ></dataset-list-item>
            <!-- <dynamic-form-cell
                v-if="cmp.component === 'dynamic-form-cell'"
                :config="cmp.config"
                :data="data"
                @subClick="onSubClick"
            ></dynamic-form-cell> -->
        </div>
    </div>
</template>

<script>
//
import ActiveListComponent from '@/ui/components/ActiveListComponent.vue'
import DatasetListItem from '@/ui/components/DatasetListItem.vue'
//
// import DynamicFormHandler from '@/ui/js/DynamicFormHandler'
// import DynamicFormCell from '@/ui/components/DynamicFormCell'
//

export default {
    components: {
        ActiveListComponent,
        DatasetListItem
        // DynamicFormCell
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
