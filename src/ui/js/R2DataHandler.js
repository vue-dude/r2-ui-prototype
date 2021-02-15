import { languages, licenses, getMockOptions } from '@/ui/js/mockdata/Base'
import { metaSchemes, metaData } from '@/ui/js/mockdata/Meta'
// import { datasets } from '@/ui/js/mockdata/Datasets'
import { datasets } from '@/ui/js/mockdata/ZnDatasets'

const R2D2DataHandler = function() {
    this.getDropdownSelection = (key, selection, empty = '-') => {
        // console.log('R2:getDropdownSelection key, selection = ', key, selection)
        if (_.isArray(selection)) {
            // console.log('R2:getDropdownSelection _.isArray(selection) = ', _.isArray(selection))
            // TODO refine this
            return selection.length === 0 ? empty : selection.join(', ')
        }
        const res = this.getDropdownConfig(key, selection)
        // TODO i18n this
        return _.isNumber(res.selected) || _.isString(res.selected) ? res.selectedLabel : empty
    }

    this.getDropdownConfig = (key, selected) => {
        const res = {
            options: getMockOptions(key, 40),
            selected
        }
        const index = res.options.findIndex(elm => elm.value === selected)
        // console.log('R2:getDropdownConfig selected = ', selected)
        // console.log('R2:getDropdownConfig options = ', res.options)
        // console.log('R2:getDropdownConfig find index = ', index)
        if (index > -1) {
            selected = index
            // console.log('R2:getDropdownConfig index > -1 selected = ', selected)
        }
        if (_.isNumber(selected)) {
            res.selected = res.options[selected].value
            res.selectedLabel = res.options[selected].label
            // console.log('R2:getDropdownConfig index > -1 selected = ', selected)
        }
        return res
    }

    this.getSchema = (schemaKey, dataKey) => {
        let schema = metaSchemes[schemaKey] || {}
        if (_.isArray(metaSchemes[schemaKey])) {
            schema = {
                [`${schemaKey}-${dataKey}`]: metaSchemes[schemaKey] || []
            }
        }
        return schema
    }

    this.getData = (schemaKey, dataKey) => {
        if (schemaKey === 'datasets') {
            return filter(datasets[dataKey], 'zenodo-dataset-list')
        }
        // this is special for the form generator
        const key = `${schemaKey}-${dataKey}`
        const res = _.isArray(metaData[key]) ? { [key]: metaData[key] || [] } : metaData[key]
        return res
    }

    this.setMetaData = (schemaKey, dataKey, dataset) => {
        const key = `${schemaKey}-${dataKey}`
        metaData[key] = dataset
        return { [key]: metaData[key] || [] }
    }

    this.setData = (schemaKey, dataKey, data) => {
        if (schemaKey === 'datasets') {
            datasets[dataKey] = data
            return datasets[dataKey]
        }
        return null
    }

    //

    const filter = (data, key) => {
        if (key === 'zenodo-dataset-list') {
            const res = []
            _.each(data, elm => {
                let authors = []
                _.each(elm.metadata.creators, creator => {
                    authors.push(creator.name)
                })
                let teaser = elm.metadata.description
                teaser = teaser.substr(0, 3) === '<p>' ? teaser.substr(3) : teaser
                authors = authors.join(', ')
                res.push({
                    dataKey: elm.id,
                    schemaKey: 'dataset',
                    title: elm.metadata.title,
                    authors,
                    teaser,
                    numOfFiles: _.random(8, 4563327)
                })
            })
            return res
        }
        return data
    }
}

export default R2D2DataHandler
