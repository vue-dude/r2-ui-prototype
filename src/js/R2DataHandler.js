const languages = {
    ar: 'Arabic',
    bg: 'Bulgarian',
    zh: 'Chinese',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    pl: 'Polish',
    pt: 'Portuguese',
    ru: 'Russian',
    es: 'Spanish',
    sv: 'Swedish'
}

const licenses = 'Creative Commons CC_BY,Open Publication License,Design Science License (DSL),FreeBSD Documentation License,GNU Free Documentation License'.split(
    ','
)

const R2D2DataHandler = function() {
    const getMockOptions = (key, num) => {
        // non generic for element-ui dropdowns, key-value
        const res = []
        if (key === 'languages') {
            _.each(languages, (label, value) =>
                res.push({
                    label,
                    value
                })
            )
        } else if (key === 'licenses') {
            _.each(licenses, (label, value) =>
                res.push({
                    label,
                    value
                })
            )
        } else {
            for (let index = 1; index < num; index++) {
                res.push({
                    label: `${key}-${index}`,
                    value: `${key}-${index}`
                })
            }
        }
        return res
    }

    this.getDropdownConfig = (key, selected) => {
        const res = {
            options: getMockOptions(key, 50),
            selected
        }
        if (_.isNumber(selected)) {
            res.selected = res.options[selected].value
        }
        return res
    }

    this.meta = {
        'schema-authors': {
            authors: [
                {
                    __0: {
                        sublist: true
                    },
                    department: {
                        __0: {
                            type: 'dropdown',
                            options: { key: 'departments' },
                            // TODO replace classes by custom setup, which can contain everything
                            classes: 'right'
                        }
                    },
                    givenName: {
                        default: 'default-joe',
                        __0: {
                            classes: 'left'
                        }
                    },
                    familyName: {
                        __0: {
                            classes: 'left'
                        }
                    },
                    nameIdentifier: {
                        __0: {
                            classes: 'right'
                        }
                    }
                    // test1: {
                    //     __0: {
                    //         classes: 'right'
                    //     }
                    // }

                    // affiliations: [
                    //     {
                    //         __0: {
                    //             sublist: true
                    //         },
                    //         department: {},
                    //         organization: { default: 'default organization' },
                    //         id: {
                    //             default: 'no id set'
                    //         }
                    //     }
                    // ]
                }
            ]
        },

        'data-authors': {
            authors: [
                {
                    givenName: 'author 1',
                    familyName: 'foo 1',
                    nameIdentifier: 'https://orcid.org/1234-1234-1234-1234',
                    department: 4
                },
                {
                    givenName: 'author 2',
                    familyName: 'foo 2',
                    nameIdentifier: 'https://orcid.org/1234-1234-1234-1234'
                },
                {},
                {},
                {},
                {
                    department: 16
                },
                {},
                {}
            ]
        },
        'schema-papers': {
            papers: [
                {
                    __0: {
                        sublist: true
                    },
                    url: {},
                    type: {},
                    identifier: {
                        __0: {
                            classes: 'right'
                        }
                    },
                    identifierType: {
                        __0: {
                            classes: 'right'
                        }
                    }
                }
            ]
        },
        'data-papers': {
            papers: [
                {
                    url: 'Science Today'
                },
                {}
            ]
        },
        'schema-common': {
            language: {
                __0: {
                    type: 'dropdown',
                    options: { key: 'languages' },
                    classes: 'left'
                }
            },
            license: {
                __0: {
                    type: 'dropdown',
                    options: { key: 'licenses' },
                    classes: 'left'
                }
            },
            genres: {
                __0: {
                    classes: 'right'
                }
            },
            keywords: {
                __0: {
                    classes: 'right'
                }
            }
        },
        'data-common': {
            language: 3,
            license: 0
        }
    }

    // correspondingPapers: {type: "label", label: "correspondingPapers:", __strc: {…}, selected: null, key: "correspondingPapers", …}
    // correspondingPapers.0: {type: "label", label: "correspondingPapers.0:", __strc: {…}, selected: null, key: "correspondingPapers--0", …}
    // correspondingPapers.0._ACTIONS: {type: "LY", label: "", spLabel: "correspondingPapers.0._ACTIONS", __strc: {…}, startNode: false, …}
    // correspondingPapers.0._ADD: {type: "LY", label: "", spLabel: "correspondingPapers.0._ADD", __strc: {…}, startNode: false, …}
    // correspondingPapers.0._END: {type: "LY", label: "", spLabel: "correspondingPapers.0._END", __strc: {…}, startNode: true, …}
    // correspondingPapers.0._START: {type: "LY", label: "", spLabel: "correspondingPapers.0._START", __strc: {…}, startNode: true, …}
    // correspondingPapers.0.identifier: {type: "input", label: "identifier:", __strc: {…}, selected: null, key: "correspondingPapers--0--identifier", …}
    // correspondingPapers.0.identifierType: {type: "input", label: "identifierType:", __strc: {…}, selected: null, key: "correspondingPapers--0--identifierType", …}
    // correspondingPapers.0.type: {type: "input", label: "type:", __strc: {…}, selected: null, key: "correspondingPapers--0--type", …}
    // correspondingPapers.0.url: {type: "input", label: "url:", __strc: {…}, selected: null, key: "correspondingPapers--0--url", …}
    // correspondingPapers.1: {type: "label", label: "correspondingPapers.1:", __strc: {…}, selected: null, key: "correspondingPapers--1", …}
    // correspondingPapers.1._ACTIONS: {type: "LY", label: "", spLabel: "correspondingPapers.1._ACTIONS", __strc: {…}, startNode: false, …}
    // correspondingPapers.1._ADD: {type: "LY", label: "", spLabel: "correspondingPapers.1._ADD", __strc: {…}, startNode: false, …}
    // correspondingPapers.1._END: {type: "LY", label: "", spLabel: "correspondingPapers.1._END", __strc: {…}, startNode: true, …}
    // correspondingPapers.1._START: {type: "LY", label: "", spLabel: "correspondingPapers.1._START", __strc: {…}, startNode: true, …}
    // correspondingPapers.1.identifier: {type: "input", label: "identifier:", __strc: {…}, selected: null, key: "correspondingPapers--1--identifier", …}
    // correspondingPapers.1.identifierType: {type: "input", label: "identifierType:", __strc: {…}, selected: null, key: "correspondingPapers--1--identifierType", …}
    // correspondingPapers.1.type: {type: "input", label: "type:", __strc: {…}, selected: null, key: "correspondingPapers--1--type", …}
    // correspondingPapers.1.url: {type: "input", label: "url:", __strc: {…}, selected: null, key: "correspondingPapers--1--url", …}
    // correspondingPapers.2._ADD: {type: "LY", label: "", spLabel: "correspondingPapers.2._ADD", __strc: {…}, startNode: false, …}
    // __proto__: Object
    // [[IsRevoked]]: false

    const metadata = {
        title: {
            __0: {
                type: 'input',
                default: 'no title set'
            }
        },
        description: {
            __0: {
                type: 'textarea'
            }
        },
        language: {
            type: 'autocomplete'
        },
        doi: {
            default: 'no DOI set'
        },
        license: {},
        genres: {},
        keywords: {},
        authors: [
            {
                __0: {
                    sublist: true
                },
                givenName: {},
                familyName: {},
                nameIdentifier: {},
                affiliations: [
                    {
                        __0: {
                            sublist: true
                        },
                        department: {},
                        organization: { default: 'default organization' },
                        id: {
                            default: 'no id set'
                        }
                    }
                ]
            }
        ],
        correspondingPapers: [
            {
                __0: {
                    sublist: true
                },
                url: {},
                type: {},
                identifier: {},
                identifierType: {}
            }
        ]
    }
}

export default R2D2DataHandler
