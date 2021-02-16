const handleSearch = async (searchTerm, component) => {
    globals.uiStore.updateSearchTerm(searchTerm)
    if (globals.uiStore.state.api !== 'mock') {
        const res = await datasource.getDatasets({
            searchTerm,
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
