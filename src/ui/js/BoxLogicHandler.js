const handleSearch = async (options, component) => {
    if (options.searchTerm) {
        globals.uiStore.updateSearchTerm(options.searchTerm)
    }
    if (options.direction) {
        globals.uiStore.updateSortDirection(options.direction)
    }
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
