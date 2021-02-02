<template>
    <div class="active-list" :class="uid">
        <div class="list-container">
            <div class="list-element" v-for="(row, indexRow) in list" :key="indexRow">
                <div v-for="(col, classes) in row" :key="classes" :class="classes" v-html="col"></div>
            </div>
        </div>
    </div>
</template>

<script>
// Linan, Alexander, Missouri Botanical Garden,       0000-0002-8281-1346
// Lowry II, Porter, Missouri Botanical Garden,       0000-0002-8047-5019
// Miller, Allison, Saint Louis UniversitySchatz,
// George, Missouri Botanical GardenSevathian,
// Jean Claude,Edwards,
// Christine, Missouri Botanical Garden

export default {
    components: {},
    props: {
        config: {}
    },
    data() {
        return {
            uid: globals.getUid(),
            dataKey: null,
            r2DataHandler: datasource.getR2DataHandler()
        }
    },
    created() {
        const data = this.r2DataHandler.getData(this.config.schemaKey, this.config.dataKey)
        this.list = this.getList(data, this.config.listFilterKey)
        console.log('ALC:created this.config.dataKey = ', this.config.dataKey)
        console.log('ALC:created this.config.schemaKey = ', this.config.schemaKey)
        console.log('ALC:created data = ', data)
    },
    onBeforeUnmount() {},
    methods: {
        getList(data) {
            const list = []
            if (this.config.listFilterKey === 'authors-list-in-private-dataset-view') {
                _.each(data[`${this.config.schemaKey}-${this.config.dataKey}`], row => {
                    const elm = {}
                    if (row.familyName) {
                        elm['col familyName'] = row.familyName
                        elm['sp familyName'] = ','
                    }
                    if (row.givenName) {
                        elm['col givenName'] = row.givenName
                        elm['sp givenName'] = ','
                    }
                    if (row.department) {
                        elm['col department'] = row.department
                    }
                    if (row.nameIdentifier) {
                        elm['sp department'] = ','
                        elm['icon nameIdentifier orchid'] = ''
                        elm['sp nameIdentifier'] = row.nameIdentifier
                    }
                    list.push(elm)
                })
            }
            return list
        }
    }
}
</script>
