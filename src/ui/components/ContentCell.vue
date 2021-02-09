<template>
    <div class="content-cell" :class="uid" :key="uKey">
        <div class="cell-element" v-for="(cmp, index) in components" :key="index">
            <!-- <dynamic-form v-if="cmp.component === 'dynamic-form'" :config="cmp.config"></dynamic-form> -->
            <!-- <active-list v-if="cmp.component === 'active-list'" :config="cmp.config"></active-list> -->
            <dataset-list-item
                v-if="cmp.component === 'dataset-list-item'"
                :config="cmp.config"
                :data="data"
            ></dataset-list-item>
        </div>
    </div>
</template>

<script>
//
import ActiveListComponent from '@/ui/components/ActiveListComponent.vue'
import DatasetListItem from '@/ui/components/DatasetListItem.vue'

export default {
    components: {
        ActiveListComponent,
        DatasetListItem
    },
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
        console.log('CC:created this.config = ', this.config)
        console.log('CC:created this.data = ', this.data)

        // globals.eventBus.$on('invokeSaveDataAction', this.onSaveDataAction)
        // this.updateList()
    },
    onBeforeUnmount() {
        // globals.eventBus.$off('invokeSaveDataAction', this.onSaveDataAction)
    },
    computed: {
        components() {
            return this.config && this.config.components ? this.config.components : {}
        }
    },
    methods: {
        // update() {
        //     this.uKey = this.uKey > 1000 ? 1 : ++this.uKey
        // },
        // onSaveDataAction() {
        //     this.updateList()
        //     this.update()
        // },
        // updateList() {
        //     const data = this.r2DataHandler.getData(this.config.schemaKey, this.config.dataKey)
        //     this.list = this.getList(data, this.config.listFilterKey)
        // },
        // getList(data) {
        //     const list = []
        //     const key = `${this.config.schemaKey}-${this.config.dataKey}`
        //     switch (this.config.listFilterKey) {
        //         case 'authors-list-in-private-dataset-view':
        //             _.each(data[key], row => {
        //                 const elm = {}
        //                 if (row.familyName) {
        //                     elm['col familyName'] = row.familyName
        //                     elm['sp familyName'] = ','
        //                 }
        //                 if (row.givenName) {
        //                     elm['col givenName'] = row.givenName
        //                     elm['sp givenName'] = ','
        //                 }
        //                 if (row.department) {
        //                     elm['col department'] = row.department
        //                 }
        //                 if (row.nameIdentifier) {
        //                     elm['sp department'] = ','
        //                     elm['icon nameIdentifier orchid'] = ''
        //                     elm['col nameIdentifier'] = row.nameIdentifier
        //                 }
        //                 list.push(elm)
        //             })
        //             return list
        //         case 'common-list-in-private-dataset-view':
        //             console.log('ALC:getList common data = ', data)
        //             list.push({
        //                 'left language': 'Language:',
        //                 'right language': this.r2DataHandler.getDropdownSelection('languages', data.language, '-')
        //             })
        //             list.push({
        //                 'left genres': 'Generes:',
        //                 'right genres': this.r2DataHandler.getDropdownSelection('genres', data.genres, '-')
        //             })
        //             list.push({
        //                 'left keywords': 'Keywords:',
        //                 'right keywords': this.r2DataHandler.getDropdownSelection('keywords', data.keywords, '-')
        //             })
        //             list.push({
        //                 'left studyType': 'StudyType:',
        //                 'right studyType': data.studyType ? data.studyType : '-'
        //             })
        //             list.push({
        //                 'left license': 'License:',
        //                 // TODO solve the missing options-key in a generic way
        //                 'right license': this.r2DataHandler.getDropdownSelection('licenses', data.license, '-')
        //             })
        //             list.push({
        //                 'left funding': 'Funding:',
        //                 'right funding': data.funding ? data.funding : '-'
        //             })
        //             return list
        //     }
        //     return list
        // }
    }
}
</script>
