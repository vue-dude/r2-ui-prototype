import { handleSearch } from '@/ui/js/R2BoxLogicHandler'

const source = 'landing-page'

const config = {
    belowModalExclusive: true,
    views: {
        'landing-page': {
            scroll: {
                components: {
                    'search-box': {
                        component: 'content-cell',
                        config: {
                            components: {
                                'recent-uploads-label': {
                                    type: 'ui',
                                    text: 'ui.interface.recent-uploads'
                                },
                                'search-input': {
                                    component: 'generic-form',
                                    config: {
                                        schema: {
                                            'label-search': {
                                                __0: {
                                                    type: 'ui',
                                                    label: 'Search:'
                                                }
                                            },
                                            'search-term-input': {
                                                __0: {
                                                    label: null,
                                                    plc: '',
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
                    }
                },

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
                }
            }
        }
    }
}
export default config
