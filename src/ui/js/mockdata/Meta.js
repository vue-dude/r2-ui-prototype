const metaSchemes = {
    authors: [
        {
            __0: {
                sublist: true
            },
            department: {
                __0: {
                    type: 'select',
                    allowMultipleSelections: true,
                    canCreateTags: true,
                    options: { key: 'departments' },
                    layout: {
                        classes: 'right'
                    }
                }
            },
            givenName: {
                // default: 'default-joe',
                __0: {
                    layout: {
                        classes: 'left'
                    }
                }
            },
            familyName: {
                __0: {
                    layout: {
                        classes: 'left'
                    }
                }
            },
            nameIdentifier: {
                __0: {
                    layout: {
                        classes: 'right'
                    }
                }
            }
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
    ],
    papers: [
        {
            __0: {
                sublist: true
            },
            url: {},
            type: {},
            identifier: {
                __0: {
                    layout: {
                        classes: 'right'
                    }
                }
            },
            identifierType: {
                __0: {
                    layout: {
                        classes: 'right'
                    }
                }
            }
        }
    ],
    common: {
        language: {
            __0: {
                type: 'select',
                options: { key: 'languages' },
                layout: {
                    classes: 'left'
                }
            }
        },
        license: {
            __0: {
                type: 'select',
                options: { key: 'licenses' },
                layout: {
                    classes: 'left'
                }
            }
        },
        genres: {
            __0: {
                type: 'select',
                canCreateTags: true,
                allowMultipleSelections: true,
                options: { key: 'genre' },
                layout: {
                    classes: 'right'
                }
            }
        },
        keywords: {
            __0: {
                type: 'select',
                canCreateTags: true,
                allowMultipleSelections: true,
                options: { key: 'kwd' },
                layout: {
                    classes: 'left'
                }
            }
        },
        studyType: {
            __0: {
                type: 'select',
                options: { key: 'study-type' },
                layout: {
                    classes: 'right'
                }
            }
        },
        funding: {
            __0: {
                type: 'input',
                isTextArea: true,
                autoSize: { minRows: 2, maxRows: 8 },
                layout: {
                    classes: 'right'
                }
            }
        }
    }
}


const metaData = {
    'authors-mock55c4': [
        {
            familyName: 'Schatz',
            givenName: 'George',
            department: ['Missouri Botanical Garden'],
            nameIdentifier: '0000-0002-8281-3226'
        },
        {
            familyName: 'Sevathian',
            givenName: 'Jean Claude',
            department: ['BOKU Wien'],
            nameIdentifier: '0000-0002-8047-3030'
        },
        {
            familyName: 'Edwards',
            givenName: 'Christine',
            department: ['TUM'],
            nameIdentifier: '0000-0002-9755-4411'
        },

        {
            familyName: 'Edwards',
            givenName: 'Alexander',
            department: ['Missouri Botanical Garden'],
            nameIdentifier: '0000-0002-8281-1346'
        },
        {
            familyName: 'Miller',
            givenName: 'Allison',
            department: ['Saint Louis University']
        }
    ],
    'papers-mock55c4': [
        {
            url: 'Science Today'
        },
        {}
    ],
    'common-mock55c4': {
        language: 'en',
        license: 0,
        studyType: 'Observational',
        genres: ['Physics'],
        keywords: ['Imaging', 'Lymph', 'Fluorophore'],
        funding:
            'Irish Government Department of BusinessEnterprise and Innovation’s Disruptive Technology Innovation Fund. Grant number: 17/TIDA/4936, AMBER 12/RC/2278 P2'
    },
    //
    'authors-init': [
        {
            familyName: 'Linan',
            givenName: 'Alexander',
            department: ['Missouri Botanical Garden'],
            nameIdentifier: '0000-0002-8281-1346'
        }
    ],
    'papers-init': [],
    'common-init': {}
}



export { metaSchemes, metaData }
