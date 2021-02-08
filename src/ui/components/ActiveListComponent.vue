<template>
    <div class="active-list" :class="uid" :key="uKey">
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
            uKey: 0,
            r2DataHandler: datasource.getR2DataHandler()
        }
    },
    created() {
        globals.eventBus.$on('invokeSaveDataAction', this.onSaveDataAction)
        this.updateList()
    },
    onBeforeUnmount() {
        globals.eventBus.$off('invokeSaveDataAction', this.onSaveDataAction)
    },
    methods: {
        update() {
            this.uKey = this.uKey > 1000 ? 1 : ++this.uKey
        },
        onSaveDataAction() {
            this.updateList()
            this.update()
        },
        updateList() {
            const data = this.r2DataHandler.getData(this.config.schemaKey, this.config.dataKey)
            this.list = this.getList(data, this.config.listFilterKey)
            // console.log('ALC:updateList this.config.dataKey = ', this.config.dataKey)
            // console.log('ALC:updateList this.config.schemaKey = ', this.config.schemaKey)
            // console.log('ALC:updateList data = ', data)
        },
        getList(data) {
            const list = []
            const key = `${this.config.schemaKey}-${this.config.dataKey}`
            switch (this.config.listFilterKey) {
                case 'authors-list-in-private-dataset-view':
                    _.each(data[key], row => {
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
                            elm['col nameIdentifier'] = row.nameIdentifier
                        }
                        list.push(elm)
                    })

                    return list
                case 'common-list-in-private-dataset-view':
                    console.log('ALC:getList common data = ', data)
                    list.push({
                        'left language': 'Language:',
                        'right language': this.r2DataHandler.getDropdownSelection('languages', data.language, '-')
                    })
                    list.push({
                        'left genres': 'Generes:',
                        'right genres': this.r2DataHandler.getDropdownSelection('genres', data.genres, '-')
                    })
                    list.push({
                        'left keywords': 'Keywords:',
                        'right keywords': this.r2DataHandler.getDropdownSelection('keywords', data.keywords, '-')
                    })
                    list.push({
                        'left studyType': 'StudyType:',
                        'right studyType': data.studyType ? data.studyType : '-'
                    })
                    list.push({
                        'left license': 'License:',
                        // TODO solve the missing options-key in a generic way
                        'right license': this.r2DataHandler.getDropdownSelection('licenses', data.license, '-')
                    })
                    list.push({
                        'left funding': 'Funding:',
                        'right funding': data.funding ? data.funding : '-'
                    })
                    return list
            }

            return list
        }
    }
}
</script>
