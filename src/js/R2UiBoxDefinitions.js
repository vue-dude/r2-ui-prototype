function R2UiBoxDefinitions() {
    this.boxes = {
        'v2-landing-page': {
            views: {
                'v2-landing-page': {
                    scroll: {
                        zones: {
                            'bt-search': {
                                key: 'show-search-page'
                            },
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
        },

        'v2-search-page': {
            views: {
                'v2-search-page': {
                    elements: {
                        'v2-search-page-search-bar-top': {},
                        sp: {},
                        'v2-search-page-facets-up': {},
                        'v2-search-page-facets-dn': {}
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
                        }
                    },
                    overlay: {
                        elements: {
                            'v2-search-page-pager-go-bt': { click: true },
                            'v2-search-page-pager-left': {}
                            // 'v2-search-page-pager-right': {}
                        }
                    }
                }
            }
        },

        'v2-dataset-view-public': {
            views: {
                'v2-dataset-view-public': {
                    scroll: {
                        zones: {
                            // 'show-ds-1': {
                            //     key: 'show-public-dataset'
                            // }
                        }
                    }
                }
            }
        },
        'main-nav': {
            visible: true,
            views: {
                public: {
                    visible: true,
                    elements: {
                        'bg-1': { key: 'public', click: true, classes: 'circ-bg-sel' },
                        'sym-diamond-sel': { key: 'public', click: true },
                        'bg-2': { key: 'private', click: true, classes: 'circ-bg' },
                        'sym-circ': { key: 'private', click: true }
                    }
                },
                private: {
                    elements: {
                        'bg-1': { key: 'public', click: true, classes: 'circ-bg' },
                        'sym-diamond': { key: 'public', click: true },
                        'bg-2': { key: 'private', click: true, classes: 'circ-bg-sel' },
                        'sym-circ-sel': { key: 'private', click: true }
                    }
                }
            }
        },
        'login-bt-top': {
            views: {
                'login-bt-top': {
                    elements: {
                        'login-start': { html: 'Login', click: true, classes: 'text' }
                    }
                }
            }
        },
        'v2-head-controls': {
            views: {
                'v2-head-controls': {
                    elements: {
                        'v2-head-crtl-bt-close': { click: true },
                        'v2-head-crtl-bt-open-in-tab': { click: true },
                        'v2-head-crtl-sharing-bar ': { click: true }
                    }
                },
                'v2-head-controls-close-only': {
                    elements: {
                        'v2-head-crtl-bt-close': { click: true }
                    }
                }
            }
        }
    }
}

export default R2UiBoxDefinitions
