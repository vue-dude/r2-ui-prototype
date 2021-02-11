import Globals from './Globals'

function R2UiBoxDefinitions() {
    this.boxes = {
        'mock-config': {
            visible: true,
            views: {
                default: {
                    zones: {
                        'toggle-mock-config-menu-state': {}
                    },
                    components: {
                        'config-menu': {
                            component: 'generic-form',
                            config: {
                                dataKey: 'data',
                                schemaKey: 'mock-config',
                                onChange: config => {
                                    if (config.key === 'scroll-type') {
                                        // console.log('CB:onChange config = ', config)
                                        globals.uiStore.setNativeScrollState(config.selected === 'native')
                                        return globals.eventBus.$emit('updateActiveView')
                                    }
                                }
                            },
                            classes: 'hidden'
                        }
                    }
                }
            }
        },
        'main-nav': {
            visible: true,
            views: {
                default: {
                    elements: {
                        'sp-1-a': { classes: 'sp-h' },
                        'sp-1-b': { classes: 'sp-h' },
                        'sp-2-a': { classes: 'sp-h' },
                        'sp-2-b': { classes: 'sp-h' },
                        'sp-3-a': { classes: 'sp-h' },
                        'sp-3-b': { classes: 'sp-h' },
                        'sp-4-a': { classes: 'sp-h' },
                        'sp-4-b': { classes: 'sp-h' },
                        public: { click: true, html: 'HOME', classes: 'nav-item left selected' },
                        private: { click: true, html: 'MY DATASETS', classes: 'nav-item right' },
                        'head-nav-back': { click: true, classes: 'nav-item' },
                        arrow: {},
                        info: { html: '-' }
                    }
                }
            }
        },

        'file-list': {
            belowModalExclusive: true,
            views: {
                'file-list-collection-closed': {
                    elements: {
                        'file-view-headline': {},
                        'file-view-pager': {},
                        sp: {},
                        'file-view-download': {},
                        'file-view-facets-top': {}
                    },
                    zones: {
                        'download-all': {}
                    },
                    scroll: {
                        elements: {
                            'file-view-list-collection-closed': {}
                        },
                        zones: {
                            'open-file-collection': {}
                        }
                    }
                },
                'file-list-collection-open': {
                    elements: {
                        'file-view-headline': {},
                        'file-view-pager': {},
                        sp: {},
                        'file-view-download': {},
                        'file-view-facets-top': {}
                    },
                    zones: {
                        'download-all': {}
                    },
                    scroll: {
                        elements: {
                            'file-view-list-collection-open': {}
                        },
                        zones: {
                            'close-file-collection': {}
                        }
                    }
                }
            }
        },
        'landing-page': {
            belowModalExclusive: true,
            views: {
                'landing-page': {
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
        'mywork-page': {
            belowModalExclusive: true,
            views: {
                'mywork-page': {
                    elements: {
                        'search-bar-top-with-pager': {},
                        sp: {},
                        'mywork-page-facets-term': {},
                        'mywork-page-facets-up': {}
                    },
                    scroll: {
                        zones: {
                            'show-ds-1': {
                                key: 'show-private-dataset'
                            },
                            'show-ds-2': {
                                key: 'show-private-dataset'
                            },
                            'show-ds-3': {
                                key: 'show-private-dataset'
                            },
                            'show-ds-4': {
                                key: 'show-private-dataset'
                            },
                            'show-ds-5': {
                                key: 'show-private-dataset'
                            },
                            'show-ds-6': {
                                key: 'show-private-dataset'
                            },
                            'show-ds-7': {
                                key: 'show-private-dataset'
                            }
                        }
                    }
                }
            }
        },
        'search-page-facets-dn-inner': {
            belowModalExclusive: true,
            views: {
                'search-page-facets-dn-inner': {
                    elements: {
                        'search-page-facets-dn-inner-box': {}
                    },
                    scroll: {
                        elements: {
                            'search-page-facets-dn-inner-list-1': {},
                            'search-page-facets-dn-inner-list-2': {}
                        }
                    }
                }
            }
        },
        'search-page': {
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
        },
        'dataset-view-public': {
            belowModalExclusive: true,
            views: {
                'dataset-view-public': {
                    scroll: {
                        elements: {
                            'dataset-view-public-content': {},
                            'dataset-view-public-infos': {}
                        },
                        zones: {
                            'show-filelist-1': {
                                key: 'show-filelist-public'
                            },
                            'show-filelist-2': {
                                key: 'show-filelist-public'
                            },
                            'download-all': {
                                click: true
                            }
                        }
                    }
                }
            }
        },
        'dataset-view-private-content': {
            belowModalExclusive: true,
            views: {
                'dataset-view-private-content': {
                    scroll: {
                        zones: {
                            'show-filelist-1': {
                                key: 'show-filelist-private'
                            },
                            'show-filelist-2': {
                                key: 'show-filelist-private'
                            },
                            'download-all': {
                                click: true
                            }
                        },
                        components: {
                            'list-authors': {
                                component: 'active-list',
                                config: {
                                    schemaKey: 'authors',
                                    dataKey: 'mock55c4',
                                    listFilterKey: 'authors-list-in-private-dataset-view'
                                },
                                click: true,
                                key: 'edit-meta-authors',
                                args: { dataKey: 'mock55c4', schemaKey: 'authors' }
                            },
                            'list-common': {
                                component: 'active-list',
                                config: {
                                    schemaKey: 'common',
                                    dataKey: 'mock55c4',
                                    listFilterKey: 'common-list-in-private-dataset-view'
                                },
                                click: true,
                                key: 'edit-meta-common',
                                args: { dataKey: 'mock55c4', schemaKey: 'common' }
                            }
                        }
                    }
                },
                'dataset-view-private-init-content': {
                    scroll: {
                        zones: {
                            'show-filelist-1': {
                                key: null
                            },
                            'edit-authors': {
                                key: 'edit-meta-authors',
                                args: { dataKey: 'init', schemaKey: 'authors' }
                            },
                            'edit-papers': {
                                key: 'edit-meta-papers',
                                args: { dataKey: 'init', schemaKey: 'papers' }
                            },
                            'edit-common': {
                                key: 'edit-meta-common',
                                args: { dataKey: 'init', schemaKey: 'common' }
                            }
                        },
                        components: {
                            'list-authors': {
                                component: 'active-list',
                                config: {
                                    schemaKey: 'authors',
                                    dataKey: 'init',
                                    listFilterKey: 'authors-list-in-private-dataset-view'
                                }
                            },
                            'list-common': {
                                component: 'active-list',
                                config: {
                                    schemaKey: 'common',
                                    dataKey: 'init',
                                    listFilterKey: 'common-list-in-private-dataset-view'
                                }
                            }
                        }
                    }
                }
            }
        },
        'dataset-view-private-infos': {
            belowModalExclusive: true,
            views: {
                'dataset-view-private-infos': {},
                'dataset-view-private-init-infos': {
                    scroll: {
                        zones: {
                            'edit-meta': {
                                key: 'edit-meta-authors'
                            }
                        }
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
        'head-controls': {
            views: {
                'head-controls': {
                    elements: {
                        'head-crtl-bt-close': { click: true },
                        'head-crtl-bt-open-in-tab': { click: true },
                        'head-crtl-sharing-bar ': { click: true }
                    }
                },
                'head-controls-edit': {
                    elements: {
                        'head-crtl-bt-close': { click: true },
                        'head-crtl-sep-1': {},
                        'head-crtl-bt-actions': { click: true },
                        'head-crtl-bt-edit': {},
                        'head-crtl-sep-2': {},
                        'head-crtl-sym-upload': {},
                        'upload-info': { html: 'Upload files here:', classes: 'text' }
                    }
                },
                'head-controls-edit-actions-active': {
                    modal: true,
                    elements: {
                        'head-crtl-bt-close': { click: true },
                        'head-crtl-sep-1': {},
                        'head-crtl-bt-actions-active': { key: 'cancel', click: true }
                    }
                },

                'head-controls-close-only': {
                    elements: {
                        'head-crtl-bt-close': { click: true }
                    }
                },
                'head-controls-new-dataset-only': {
                    elements: {
                        'head-crtl-label-new-dataset': {
                            key: 'create-new-dataset',
                            click: true,
                            html: 'Create new Dataset',
                            classes: 'text'
                        },
                        'head-crtl-bt-new-dataset': { key: 'create-new-dataset', click: true }
                    }
                }
            }
        },
        'dataset-controls': {
            views: {
                'dataset-controls': {
                    modal: null, // gets set via state dynamical
                    elements: {
                        'dataset-view-private-controls-bg': {},
                        'head-crtl-bt-actions-active': { key: 'dataset-actions-off', click: true },
                        'head-crtl-bt-actions': { key: 'dataset-actions-on', click: true },
                        'head-crtl-bt-edit-active': { key: 'dataset-edit-off', click: true },
                        'head-crtl-bt-edit': { key: 'dataset-edit-on', click: true },

                        'sp-1-a': { classes: 'sp-h' },
                        'sp-1-b': { classes: 'sp-h' },
                        'head-crtl-sym-upload': {},
                        'upload-info': { html: 'Upload files here:', classes: 'text' }
                    }
                }
            }
        },
        'dataset-actions': {
            modal: true,
            overModalExclusive: true,
            views: {
                'dataset-actions': {
                    modal: false
                },
                'dataset-actions-publish': {
                    elements: {
                        'dataset-actions-publish': { key: 'actions-panel-close', click: true }
                    },
                    zones: {
                        'dataset-actions-close': { key: 'cancel' },
                        'dataset-actions-submit': { key: 'cancel' },
                        'dataset-actions-withdraw': { key: 'cancel' }
                    }
                },
                'meta-actions-edit-generic': {
                    tabs: {
                        'tab-papers': {
                            key: 'papers',
                            schemaKey: 'papers',
                            dataKey: null,
                            html: 'Corresponding Papers',
                            classes: 'papers'
                        },
                        'tab-common': {
                            key: 'common',
                            schemaKey: 'common',
                            dataKey: null,
                            html: 'Common Data',
                            classes: 'common'
                        },
                        'tab-authors': {
                            key: 'authors',
                            schemaKey: 'authors',
                            dataKey: null,
                            html: 'Authors',
                            classes: 'authors',
                            active: true
                        }
                    },
                    elements: {
                        'box-bg': {},
                        'sp-up': { classes: 'box-sp' },
                        'sp-dn': { classes: 'box-sp' },
                        'bt-save': { key: 'save', click: true, html: 'Save', classes: 'bt' },
                        'bt-close': { key: 'close', click: true, html: 'Close', classes: 'bt' }
                    },
                    scroll: {
                        components: {
                            'meta-generic': { component: 'dynamic-form', config: { key: null, test: 100 } }
                        }
                    }
                }
            }
        },
        'r2-messages': {
            modal: true,
            views: {
                'r2-messages': {
                    modal: false
                },
                'msg-large-dataset': {
                    elements: {
                        'msg-large-dataset': {}
                    },
                    zones: {
                        confirm: {},
                        cancel: {}
                    }
                }
            }
        }
    }
}

export default R2UiBoxDefinitions
