function R2UiBoxDefinitions() {
    this.boxes = {
        'v2-main-nav': {
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
        'v2-file-list': {
            views: {
                'file-list-collection-closed': {
                    elements: {
                        'v2-file-view-headline': {},
                        'v2-file-view-pager': {},
                        sp: {},
                        'v2-file-view-download': {},
                        'v2-file-view-facets-top': {}
                    },
                    zones: {
                        'download-all': {}
                    },
                    scroll: {
                        elements: {
                            'v2-file-view-list-collection-closed': {}
                        },
                        zones: {
                            'open-file-collection': {}
                        }
                    }
                },
                'file-list-collection-open': {
                    elements: {
                        'v2-file-view-headline': {},
                        'v2-file-view-pager': {},
                        sp: {},
                        'v2-file-view-download': {},
                        'v2-file-view-facets-top': {}
                    },
                    zones: {
                        'download-all': {}
                    },
                    scroll: {
                        elements: {
                            'v2-file-view-list-collection-open': {}
                        },
                        zones: {
                            'close-file-collection': {}
                        }
                    }
                }
            }
        },
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
        'v2-mywork-page': {
            views: {
                'v2-mywork-page': {
                    elements: {
                        'v2-search-bar-top-with-pager': {},
                        sp: {},
                        'v2-mywork-page-facets-term': {},
                        'v2-mywork-page-facets-up': {}
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
        'v2-search-page-facets-dn-inner': {
            views: {
                'v2-search-page-facets-dn-inner': {
                    elements: {
                        'v2-search-page-facets-dn-inner-box': {}
                    },
                    scroll: {
                        elements: {
                            'v2-search-page-facets-dn-inner-list-1': {},
                            'v2-search-page-facets-dn-inner-list-2': {}
                        }
                    }
                }
            }
        },
        'v2-search-page': {
            views: {
                'v2-search-page': {
                    elements: {
                        'v2-search-bar-top-with-pager': {},
                        sp: {},
                        'v2-search-page-facets-term': {},
                        'v2-search-page-facets-up': {},
                        'v2-search-page-facets-dn-box': {},
                        'v2-search-page-facets-dn-head': {}
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
                    }
                }
            }
        },
        'v2-dataset-view-public': {
            views: {
                'v2-dataset-view-public': {
                    scroll: {
                        elements: {
                            'v2-dataset-view-public-content': {},
                            'v2-dataset-view-public-infos': {}
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
        'v2-dataset-view-private-content': {
            views: {
                'v2-dataset-view-private-content': {
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
                        }
                    }
                },
                'v2-dataset-view-private-init-content': {
                    scroll: {
                        zones: {
                            'show-filelist-1': {
                                // key: 'show-filelist-private',
                                key: null
                            }
                            // 'show-filelist-2': {
                            //     key: 'show-filelist-private'
                            // },
                            // 'download-all': {
                            //     click: true
                            // }
                        }
                    }
                }
            }
        },
        'v2-dataset-view-private-infos': {
            views: {
                'v2-dataset-view-private-infos': {},
                'v2-dataset-view-private-init-infos': {
                    elements: {
                        // 'v2-dataset-view-private-controls-bg': {},
                        // 'v2-head-crtl-bt-actions': { key: 'dataset-actions', click: true },
                        // 'v2-head-crtl-bt-edit': {},
                        // 'sp-1-a': { classes: 'sp-h' },
                        // 'sp-1-b': { classes: 'sp-h' },
                        // 'v2-head-crtl-sym-upload': {},
                        // 'v2-upload-info': { html: 'Upload files here:', classes: 'text' }
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
                        'sym-work': { key: 'private', click: true }
                    }
                },
                private: {
                    elements: {
                        'bg-1': { key: 'public', click: true, classes: 'circ-bg' },
                        'sym-diamond': { key: 'public', click: true },
                        'bg-2': { key: 'private', click: true, classes: 'circ-bg-sel' },
                        'sym-work-sel': { key: 'private', click: true }
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
                'v2-head-controls-edit': {
                    elements: {
                        'v2-head-crtl-bt-close': { click: true },
                        'v2-head-crtl-sep-1': {},
                        'v2-head-crtl-bt-actions': { click: true },
                        'v2-head-crtl-bt-edit': {},
                        'v2-head-crtl-sep-2': {},
                        'v2-head-crtl-sym-upload': {},
                        'v2-upload-info': { html: 'Upload files here:', classes: 'text' }
                    }
                },
                'v2-head-controls-edit-actions-active': {
                    modal: true,
                    elements: {
                        'v2-head-crtl-bt-close': { click: true },
                        'v2-head-crtl-sep-1': {},
                        'v2-head-crtl-bt-actions-active': { key: 'cancel', click: true }
                    }
                },

                'v2-head-controls-close-only': {
                    elements: {
                        'v2-head-crtl-bt-close': { click: true }
                    }
                },
                'v2-head-controls-new-dataset-only': {
                    elements: {
                        'v2-head-crtl-label-new-dataset': {
                            key: 'create-new-dataset',
                            click: true,
                            html: 'Create new Dataset',
                            classes: 'text'
                        },
                        'v2-head-crtl-bt-new-dataset': { key: 'create-new-dataset', click: true }
                    }
                }
            }
        },
        'v2-dataset-controls': {
            views: {
                'v2-dataset-controls': {
                    modal: null, // gets set via state dynamical
                    elements: {
                        'v2-dataset-view-private-controls-bg': {},
                        'v2-head-crtl-bt-actions-active': { key: 'dataset-actions-off', click: true },
                        'v2-head-crtl-bt-actions': { key: 'dataset-actions-on', click: true },
                        'v2-head-crtl-bt-edit-active': { key: 'dataset-edit-off', click: true },
                        'v2-head-crtl-bt-edit': { key: 'dataset-edit-on', click: true },

                        'sp-1-a': { classes: 'sp-h' },
                        'sp-1-b': { classes: 'sp-h' },
                        'v2-head-crtl-sym-upload': {},
                        'v2-upload-info': { html: 'Upload files here:', classes: 'text' }
                    }
                }
            }
        },
        'v2-dataset-actions': {
            modal: true,
            views: {
                'v2-dataset-actions': {
                    modal: false
                },
                'v2-dataset-actions-publish': {
                    elements: {
                        'v2-dataset-actions-publish': { key: 'actions-panel-close', click: true }
                    },
                    zones: {
                        'v2-dataset-actions-close': { key: 'cancel' }
                    }
                }
            }
        },
        'v2-messages': {
            modal: true,
            views: {
                'v2-messages': {
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
