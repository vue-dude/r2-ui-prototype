const stopPreloaders = preloaders => {
    if (preloaders) {
        globals.eventBus.$emit('preloaders', {
            key: 'deactivate',
            preloaders
        })
    }
}

const handleSearch = async (options, component) => {
    globals.uiStore.updateSearch(options)
    component.$emit('subClick', {
        key: 'show-search-page',
        args: {}
    })

    const preloaders = options.preloaders || null
    if (preloaders) {
        globals.eventBus.$emit('preloaders', {
            key: 'activate',
            preloaders
        })
    }

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
            stopPreloaders(preloaders)
        } else {
            setTimeout(() => stopPreloaders(preloaders), 1000)
        }
    }
    setTimeout(fetchData, 200)
}

export { handleSearch }
