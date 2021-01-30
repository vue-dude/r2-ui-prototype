const R2D2DataHandler = function() {
    const getMockOptions = (key, num) => {
        // non generic for element-ui dropdowns, key-value
        const res = []
        for (let index = 1; index < num; index++) {
            res.push({
                label: `${key}-${index}`,
                value: `${key}-${index}`
            })
            // res.push(`${key}-${index}`)
        }
        return res
    }

    this.getDropdownConfig = (key, selected) => {
        return {
            options: getMockOptions(key, 50),
            selected: '4'
        }
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
                            // options: ['a-1', 'a-2', 'a-3', 'a-4']
                            // options: getMockOptions('department', 100),
                            options: { key: 'departments' },
                            // TODO replace classes by custom setup, which can contain everything
                            classes: 'right'
                        }
                    },
                    givenName: {
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
                {},
                {},
                {}
            ]
        },
        'schema-papers': {},
        'data-papers': {},
        'schema-common': {},
        'data-common': {}
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
}

export default R2D2DataHandler
