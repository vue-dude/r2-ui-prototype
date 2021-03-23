const stopPreloaders = preloaders => {
    if (preloaders) {
        globals.eventBus.$emit('preloaders', {
            key: 'deactivate',
            preloaders
        })
    }
}

const lastSearch = {}

const handleSearch = async (options, component) => {
    console.log('BLH:handleSearch options = ', options)
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
            const changables = 'searchTerm,orderBy,sortBy'.split(',')
            const states = globals.uiStore.getStates([...changables, 'pageNum'])
            const prms = {
                resetData: false,
                size: 30,
                schemaKey: 'datasets',
                dataKey: 'pub-c819',
                ...states
            }
            _.each(changables, key => {
                if (!prms.resetData && prms[key] !== lastSearch[key]) {
                    prms.resetData = true
                }
                lastSearch[key] = prms[key]
            })

            if (prms.resetData) {
                lastSearch.pageNum = 1
                prms.pageNum = 1
                globals.uiStore.updateSearch({ pageNum: 1 })
                globals.eventBus.$emit('updateActiveView', {
                    keepScrollPosition: false
                })
            }
            await datasource.getDatasets(prms)
            stopPreloaders(preloaders)
        } else {
            setTimeout(() => stopPreloaders(preloaders), 1000)
        }
    }
    setTimeout(fetchData, 200)
}

export { handleSearch }
