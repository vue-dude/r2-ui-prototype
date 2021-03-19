const stopPreloaders = preloaders => {
    if (_.isArray(preloaders)) {
        _.each(preloaders, pl => {
            pl.deactivate()
        })
    }
}

const handleSearch = async (options, component) => {
    globals.uiStore.updateSearch(options)
    let args = {
        preloaders: options.preloaders || null
    }
    component.$emit('subClick', {
        key: 'show-search-page',
        args
    })
    const fetchData = async () => {
        if (globals.uiStore.state.api !== 'mock') {
            const res = await datasource.getDatasets({
                searchTerm: globals.uiStore.state.searchTerm,
                orderBy: globals.uiStore.state.orderBy,
                sortBy: globals.uiStore.state.sortBy,
                size: 30,
                schemaKey: 'datasets',
                dataKey: 'pub-c819'
            })
            stopPreloaders(args.preloaders)
        } else {
            setTimeout(() => stopPreloaders(args.preloaders), 1000)
        }
    }
    setTimeout(fetchData, 200)
}

export { handleSearch }
