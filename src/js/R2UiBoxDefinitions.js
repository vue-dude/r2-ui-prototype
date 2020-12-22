function R2UiBoxDefinitions() {
    this.boxes = {
        'v2-main-nav': {
            visible: true,
            views: {
                public: {
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
                                key: 'show-private-dataset'
                            },
                            'show-ds-2': {
                                key: 'show-private-dataset'
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
                        // 'v2-mywork-page-search-bar-top': {},
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
                            // 'v2-search-page-pager-go-bt': { click: true },
                            // 'v2-search-page-pager-left': {}
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
                                key: 'show-private-dataset'
                            },
                            'show-ds-2': {
                                key: 'show-private-dataset'
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
                            // 'v2-search-page-pager-go-bt': { click: true },
                            // 'v2-search-page-pager-left': {}
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
                                key: 'show-filelist-public'
                            },
                            'show-filelist-2': {
                                key: 'show-filelist-public'
                            },
                            'download-all': {
                                key: 'show-filelist',
                                click: true
                            }
                        }
                    }
                }
            }
        },
        'v2-dataset-view-private-infos': {
            views: {
                'v2-dataset-view-private-infos': {}
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
                        'v2-head-crtl-bt-actions-active': { click: true }
                    }
                },

                'v2-head-controls-close-only': {
                    elements: {
                        'v2-head-crtl-bt-close': { click: true }
                    }
                }
            }
        },
        'v2-dataset-actions': {
            modal: true,
            views: {
                'v2-dataset-actions': {
                    click: true,
                    elements: {
                        'v2-dataset-actions-publish': {}
                    },
                    zones: {
                        'v2-dataset-actions-close': {}
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
