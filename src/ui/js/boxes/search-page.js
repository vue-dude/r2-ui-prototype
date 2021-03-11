import { handleSearch } from '@/ui/js/R2BoxLogicHandler'

const config = {
    belowModalExclusive: true,
    views: {
        'search-page': {
            elements: {
                'search-bar-top-with-pager': {},
                sp: {},
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
                                                label: '',
                                                __0: {
                                                    label: '',
                                                    type: 'input'
                                                }
                                            },
                                            'fire-search-button': {
                                                label: '',
                                                __0: {
                                                    type: 'ui',
                                                    onClick: true,
                                                    label: ''
                                                }
                                            }
                                        },
                                        data: {
                                            'search-term-input': 'UI_STORE:searchTerm'
                                        },
                                        onClickItem: async (item, evt, component) => {
                                            if (item.key === 'fire-search-button') {
                                                const searchTerm = component.formHandler.getData()['search-term-input']
                                                handleSearch({ searchTerm }, component)
                                            }
                                        },
                                        onKeyDown: async (item, evt, component) => {
                                            if (evt.which === 13) {
                                                if (item.key === 'search-term-input') {
                                                    const searchTerm = item.selected
                                                    handleSearch({ searchTerm }, component)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'search-header': {
                        component: 'content-cell',
                        config: {
                            components: {
                                'sort-properties': {
                                    component: 'generic-form',
                                    config: {
                                        schema: {
                                            // 'sort-by': {
                                            //     label: '',
                                            //     __0: {
                                            //         label: '',
                                            //         type: 'select',
                                            //         options: [
                                            //             { value: 'date', label: 'date' },
                                            //             { value: 'size', label: 'size' }
                                            //         ]
                                            //     }
                                            // },
                                            'order-by': {
                                                label: '',
                                                __0: {
                                                    label: '',
                                                    type: 'select',
                                                    options: [
                                                        { value: 'ascending', label: 'asc' },
                                                        { value: 'descending', label: 'desc' }
                                                    ]
                                                }
                                            }
                                        },
                                        data: {
                                            'order-by': 'UI_STORE:orderBy'
                                            // 'sort-by': 'UI_STORE:sortBy'
                                        },
                                        onCreate() {
                                            globals.uiStore.updateSearch({ orderBy: 'ascending' })
                                        },
                                        onFormItemChanged: (item, evt, component) => {
                                            if (item.key === 'order-by') {
                                                handleSearch({ orderBy: item.selected }, component)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            scroll: {
                zones: {
                    'show-ds-1': {
                        key: 'show-public-dataset'
                    },
                    'show-ds-2': {
                        key: 'show-public-dataset'
                    },
                    'show-ds-3': {
                        key: 'show-public-dataset'
                    },
                    'show-ds-4': {
                        key: 'show-public-dataset'
                    },
                    'show-ds-5': {
                        key: 'show-public-dataset'
                    },
                    'show-ds-6': {
                        key: 'show-public-dataset'
                    },
                    'show-ds-7': {
                        key: 'show-public-dataset'
                    }
                },
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
