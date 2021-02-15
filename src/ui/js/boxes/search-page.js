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
                                        onClickItem: (item, evt, component) => {
                                            if (item.key === 'fire-search-button') {
                                                component.$emit('subClick', {
                                                    key: 'show-search-page',
                                                    args: {}
                                                })
                                            }
                                        },
                                        onKeyDown: (item, evt, component) => {
                                            if (evt.which === 13) {
                                                if (item.key === 'search-term-input') {
                                                    component.$emit('subClick', {
                                                        key: 'show-search-page',
                                                        args: {}
                                                    })
                                                }
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
