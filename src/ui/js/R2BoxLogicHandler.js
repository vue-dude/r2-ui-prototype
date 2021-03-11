const handleSearch = async (options, component) => {
    globals.uiStore.updateSearch(options)
    if (globals.uiStore.state.api !== 'mock') {
        const res = await datasource.getDatasets({
            searchTerm: globals.uiStore.state.searchTerm,
            sortDirection: globals.uiStore.state.sortDirection,
            size: 30,
            schemaKey: 'datasets',
            dataKey: 'pub-c819'
        })
    }
    component.$emit('subClick', {
        key: 'show-search-page',
        args: {}
    })
}

export { handleSearch }
