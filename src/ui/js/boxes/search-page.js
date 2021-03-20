import { handleSearch } from '@/ui/js/R2BoxLogicHandler'

const source = 'search-page'

const config = {
    belowModalExclusive: true,
    views: {
        'search-page': {
            elements: {
                'search-bar-top-with-pager': {},
                'sp': {},
                'search-page-facets-term': {},
                'search-page-facets-up': {},
                'search-page-facets-dn-box': {},
                'search-page-facets-dn-head': {}
            },
            overlay: {
                components: {
                    'search-box': {
                        component: 'content-cell',
                        config: {
                            components: {
                                'search-input': {
                                    component: 'generic-form',
                                    config: {
                                        schema: {
                                            'search-term-input': {
                                                __0: {
                                                    label: null,
                                                    plc: '',
                                                    type: 'input'
                                                }
                                            },
                                            'fire-search-button': {
                                                __0: {
                                                    type: 'ui',
                                                    onClick: true,
                                                    label: null
                                                }
                                            }
                                        },
                                        data: {
                                            'search-term-input': 'UI_STORE:searchTerm'
                                        },
                                        onClickItem: async (item, evt, component) => {
                                            if (item.key === 'fire-search-button') {
                                                const searchTerm = component.formHandler.getData()['search-term-input']
                                                handleSearch(
                                                    {
                                                        searchTerm,
                                                        source,
                                                        preloaders: [
                                                            'preloader-content-list',
                                                            'preloader-facets-dn-list'
                                                        ]
                                                    },
                                                    component
                                                )
                                            }
                                        },
                                        onKeyDown: async (item, evt, component) => {
                                            if (evt.which === 13) {
                                                if (item.key === 'search-term-input') {
                                                    const searchTerm = item.selected
                                                    handleSearch(
                                                        {
                                                            searchTerm,
                                                            source,
                                                            preloaders: [
                                                                'preloader-content-list',
                                                                'preloader-facets-dn-list'
                                                            ]
                                                        },
                                                        component
                                                    )
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'search-header-cover': {},
                    'search-header': {
                        component: 'content-cell',
                        config: {
                            components: {
                                'pager': {
                                    component: 'generic-form',
                                    config: {
                                        schema: {
                                            'go-to-page': {
                                                __0: {
                                                    type: 'input',
                                                    plc: null,
                                                    label: null,
                                                    restrict: 'numbers-int'
                                                }
                                            }
                                        },
                                        data: {
                                            'go-to-page': 'UI_STORE:pageNum'
                                        },
                                        onCreate() {
                                            globals.uiStore.updateSearch({ pageNum: 1 })
                                        },
                                        onKeyDown: async (item, evt, component) => {
                                            if (evt.which === 13) {
                                                if (item.key === 'go-to-page') {
                                                    handleSearch(
                                                        {
                                                            pageNum: item.selected,
                                                            source,
                                                            preloaders: ['preloader-content-list']
                                                        },
                                                        component
                                                    )
                                                }
                                            }
                                        }
                                    }
                                },
                                'sort-properties': {
                                    component: 'generic-form',
                                    config: {
                                        schema: {
                                            'label': {
                                                __0: {
                                                    type: 'ui',
                                                    label: 'form.item.label.sort-by'
                                                }
                                            },
                                            'sort-by': {
                                                __0: {
                                                    label: null,
                                                    type: 'select',
                                                    options: [
                                                        { value: 'recent', label: 'form.item.value.recent' },
                                                        { value: 'date', label: 'form.item.value.date' },
                                                        { value: 'size', label: 'form.item.value.size' }
                                                    ]
                                                }
                                            },
                                            'spc-1': {
                                                __0: {
                                                    type: 'ui',
                                                    label: null
                                                }
                                            },
                                            'order-by': {
                                                label: '',
                                                __0: {
                                                    label: null,
                                                    type: 'select',
                                                    options: [
                                                        { value: 'ascending', label: 'form.item.value.asc' },
                                                        { value: 'descending', label: 'form.item.value.desc' }
                                                    ]
                                                }
                                            }
                                        },
                                        data: {
                                            'order-by': 'UI_STORE:orderBy',
                                            'sort-by': 'UI_STORE:sortBy'
                                        },
                                        onCreate() {
                                            globals.uiStore.updateSearch({ orderBy: 'ascending', sortBy: 'recent' })
                                        },
                                        onFormItemChanged: (item, evt, component) => {
                                            if (item.key === 'order-by') {
                                                handleSearch(
                                                    {
                                                        orderBy: item.selected,
                                                        source,
                                                        preloaders: ['preloader-content-list']
                                                    },
                                                    component
                                                )
                                            }
                                            if (item.key === 'sort-by') {
                                                handleSearch(
                                                    {
                                                        sortBy: item.selected,
                                                        source,
                                                        preloaders: ['preloader-content-list']
                                                    },
                                                    component
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'preloader-content-list': {
                        component: 'preloader',
                        config: {}
                    }
                }
            },
            scroll: {
                components: {
                    'my-datasets': {
                        component: 'content-list',
                        config: {
                            schemaKey: 'datasets',
                            dataKey: 'pub-c819',
                            contentCellConfig: {
                                components: {
                                    'dataset-list-item': {
                                        component: 'dataset-list-item',
                                        config: { showAs: 'public-dataset' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
export default config
