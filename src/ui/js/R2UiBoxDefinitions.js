import mockConfig from '@/ui/js/boxes/mock-config'
import landingPage from '@/ui/js/boxes/landing-page'
import searchPage from '@/ui/js/boxes/search-page'
import searchPageFacetsDn from '@/ui/js/boxes/search-page-facets-dn-inner'

const MSG_NO_WEBP = `
<b>This page shows a UI-Prototype based on webp-images.</b>
<br/><br/>
webp is a super-compressing, high-quality image codec that greatly improves the loading speed of image-based content.
<br/><br/>
Unfortunately, your browser does not support this format, so please try another one.
<br/><br/>
<a href='https://caniuse.com/webp'>https://caniuse.com/webp</a>"
`
const PROTOTYPE_INFO = `
<b>This page shows a UI-Prototype for a scientific data repository.</b>
<br/><br/>
In order to present the decision-makers with a realistic, interactive prototype as early as possible, the page was initially built based on images and graphics, but already provides real interactions and ui-animations.
<br/><br/>
The resulting framework offered itself to create the final page directly from the prototype, with the advantage of being able to continue to react quickly to ideas and extensions, to test & optimize usability 'live' and to always have a visually complete application available.
<br/><br/>
The amazing freedom and flexibility of Vue.js supports this progressive approach in an optimal way.
<br/><br/>
The layout is currently still static, but individual parts of the page already contain the first real functionality and data flow.
<br/><br/>
The data is provided by an internal mock system. By clicking on the 'Edmond' logo, a real data source (Zenodo) can optionally be selected.
<br/><br/>
<b>Dev-Stack:</b>
<br/><br/>
<b>vue.js 3 & core libraries:  </b><a href='https://vuejs.org' target='_blank'><img class='link-sym' src="/img/link.png" /></a>
<br/>
<b>vue-i18n for internationalization:  </b><a href='https://kazupon.github.io/vue-i18n/' target='_blank'><img class='link-sym' src="/img/link.png" /></a>
<br/>
<b>element-plus as base for ui elements:  </b><a href='https://element-plus.org' target='_blank'><img class='link-sym' src="/img/link.png" /></a>
<br/>
<b>lodash for data handling:  </b><a href='https://lodash.com' target='_blank'><img class='link-sym' src="/img/link.png" /></a>
<br/>
<b>axios as promise based http client:  </b><a href='https://axios-http.com' target='_blank'><img class='link-sym' src="/img/link.png" /></a>
<br/>
<b>custom dynamic, multilevel form-generation</b>
<br/>
<b>custom device detection</b>
<br/><br/>
<b>gsap-3 animation library:  </b><a href='https://greensock.com/gsap/' target='_blank'><img class='link-sym' src="/img/link.png" /></a>

`

function R2UiBoxDefinitions() {
    this.boxes = {
        'mock-config': mockConfig,
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
                        'public': { click: true, html: 'HOME', classes: 'nav-item left selected' },
                        'private': { click: true, html: 'MY DATASETS', classes: 'nav-item right' },
                        'head-nav-back': { click: true, classes: 'nav-item' },
                        'arrow': {},
                        'info': { html: '-' }
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
                        'sp': {},
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
                        'sp': {},
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
        'landing-page': landingPage,
        'mywork-page': {
            belowModalExclusive: true,
            views: {
                'mywork-page': {
                    elements: {
                        'search-bar-top-with-pager': {},
                        'sp': {},
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
        'search-page': searchPage,
        'search-page-facets-dn-inner': searchPageFacetsDn,
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
                'head-controls-prototype-info': {
                    elements: {
                        'head-crtl-bt-prototype-info': { click: true }
                    }
                },
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
                },
                'webp-not-available': {
                    elements: {
                        'msg-webp-not-available': {
                            html: MSG_NO_WEBP,
                            click: false,
                            classes: 'text'
                        }
                    },
                    zones: {
                        confirm: {},
                        cancel: {}
                    }
                },
                'msg-prototype-info': {
                    elements: {
                        text: {
                            html: PROTOTYPE_INFO
                        },
                        close: { classes: 'button', click: true, html: 'close' }
                    }
                }
            }
        }
    }
}

export default R2UiBoxDefinitions
