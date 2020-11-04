function R2UiBoxDefinitions() {
    this.boxes = {
        recent: {},
        globe: {},
        login: {
            close: true,
            views: {
                login: {
                    zones: {
                        register: {
                            key: 'register',
                            pos: {
                                left: '160px',
                                top: '138px',
                                width: '130px',
                                height: '30px'
                            }
                        },
                        login: {
                            key: 'login',
                            pos: {
                                left: '20px',
                                top: '138px',
                                width: '90px',
                                height: '30px'
                            }
                        }
                    }
                }
            }
        },
        register: {
            close: true,
            views: {
                'step-1': {
                    elements: {
                        headline: { html: 'Create new Account' },
                        'head-seperator': {},
                        'register-step-1-mail': { classes: 'scale-default' },
                        info: {
                            html: 'Please enter your email first:',
                            classes: 'text'
                        },
                        'bt-continue': {
                            html: 'Continue',
                            classes: 'button bt-ok',
                            click: true,
                            args: { view: 'step-2' }
                        }
                    }
                },
                'step-2': {
                    elements: {
                        headline: { html: 'Create new Account for:' },
                        'head-seperator': {},
                        'register-step-2': { classes: 'scale-default' },
                        'bt-send': {
                            html: 'Send Request',
                            classes: 'button bt-ok',
                            click: true,
                            args: { view: 'step-3' }
                        }
                    }
                },
                'step-3': {
                    elements: {
                        headline: { html: 'Create new Account - ready for confirmation!' },
                        'head-seperator': {},
                        info: {
                            html:
                                'You request was sended!<br/>Please click the link in the confirmation mail to validate your account.',
                            classes: 'text'
                        },
                        'bt-close': {
                            html: 'Close',
                            classes: 'button',
                            click: true
                        }
                    }
                }
            }
        },
        'login-animation': {
            events: false
        },
        'flow-show': {},
        'login-bt-top': {
            views: {
                'login-bt-top': {
                    elements: {
                        'login-start': { html: 'Login', click: true, classes: 'text' }
                    }
                }
            }
        },
        'create-dataset': {
            close: true,
            views: {
                'create-dataset': {
                    elements: {
                        headline: { html: 'Create Dataset' },
                        'head-seperator': {}
                    }
                }
            }
        },
        'my-datasets': {
            views: {
                'my-datasets': {
                    // id: 'mywork-all-list',
                    elements: {
                        headline: { html: 'My Work - all Datasets' },
                        'head-seperator': {},
                        'mywork-box-sym': {
                            classes: 'scale x50 t-l'
                        },
                        'bt-create-dataset': {
                            key: 'create-dataset',
                            click: true,
                            classes: 'scale x50 t-r'
                        },
                        'mywork-all-list': {
                            classes: 'scale x50 t-l'
                        }
                    },
                    zones: {
                        'show-dataset': {
                            key: 'show-dataset',
                            pos: {
                                top: '170px',
                                right: '3px',
                                width: '30px',
                                height: '30px'
                            }
                        },
                        'show-history': {
                            key: 'show-history',
                            pos: {
                                top: '205px',
                                right: '3px',
                                width: '30px',
                                height: '30px'
                            }
                        }
                    }
                },
                'dataset-history': {
                    elements: {
                        headline: { html: 'My Work - Dataset - History' },
                        'head-seperator': {},
                        'box-back-bt': { key: 'view-back', classes: 'scale x50 t-r', click: true }, // TODO move to abstract box definitions
                        'mywork-box-sym': {
                            classes: 'scale x50 t-l'
                        },
                        'mywork-ds-history': {
                            classes: 'scale x50 t-l'
                        }
                    }
                }
            }
        }
    }
}

export default R2UiBoxDefinitions
