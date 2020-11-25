function GetDataAndFormAPI() {
    // I consciously use a fantasy 'car brand and speed' data set to show the way it should work:

    // mock function to show
    this.getFormData = (key = 'cars-single-mockdata') => {
        switch (key) {
            case 'cars-single-mockdata':
                return singleMockdataCarsNode
            default:
                return multipleMockdataCarsNode
        }
    }

    // if the selected state of any field is null or undefined, it is recognized as empty / not selected
    // any object dealing with text can optional hold a i18nKey for accessing translations

    // form types: 
    // 'input' or 'input-text', 
    // 'textfield' (multiple lines), 
    // input-number, 
    // dropdown, 
    // radio, 
    // switch, (on/off - true/false)
    // multiselect, 
    // autocomplete (needs further specification for setup, api etc)
    // 

    const singleMockdataCarsNode = {
        cars: [
            {
                id: 'car-1', // if no id is set (type: string), the array index will be used
                controls: {
                    // if not set, no add/shift/control items will be set in form
                    // only control options with 'true' will be set
                    canAddNodeAbove: true,
                    canAddNodeBelow: true,
                    canMoveUp: false,
                    canMoveDown: false
                },
                data: {
                    carBrand: {
                        type: 'dropdown',
                        label: {
                            text: 'Car Brand',
                            i18nKey: 'cars.labels.brand' // optional, will be used instead of text
                        },
                        placeholder: {
                            text: 'Select yout car brand here'
                            // i18nKey optional
                        },
                        validation: {
                            mandatory: true, //
                            // rules to be specified, e.g. for vee-validate,
                            result: {
                                // this field gets an update after a trigger event
                                valid: false,
                                text: 'You need to select a car brand'
                                // i18nKey optional
                            }
                        },
                        options: { // options for select box / dropdown
                            ferrari: {
                                value: 'ferrari', // if not set, the property key will be used
                                text: 'Ferrari', // readable text. // if not set, the property key will be used
                                i18nKey: 'cars.brands.ferrari' // optional, will be used instead of text
                            },
                            lamborghini: {
                                text: 'Lamborghini'
                            },
                            maserati: {
                                text: 'Maserati'
                            },
                            porsche: {
                                text: 'Porsche'
                            }
                        },
                        selected: 'maserati' // if null, there is nothing selected and the placeholder appears
                    },
                    vMaxMinimum: {
                        type: 'input-number',
                        label: {
                            text: 'The maximum speed it can at least achieve (in km/h):'
                        },
                        placeholder: {
                            text: 'Type in the speed'
                        },
                        validation: {
                            mandatory: false, //
                            // rules to be specified, e.g. for vee-validate,
                            // here: minimum input number 260
                            // but nothing needs to be set
                            result: {
                                // this field gets an update after a trigger event
                                valid: false,
                                text: 'please enter a speed above 260'
                                // i18nKey optional
                            }
                        },
                        selected: 220 // current input is not valid
                    },
                    enginePoweredBy: {
                        type: 'radio',
                        validation: false, // this selection is optional and needs no validation
                        options: {
                            petrol: {
                                text: 'Petrol'
                                // i18nKey optional
                            },
                            diesel: {},
                            electric: {},
                            hybrid: {}
                        },
                        selected: null // nothing is set / selected
                    },
                    comment: {
                        type: 'textfield',
                        validation: false, // this selection is optional and needs no validation
                        options: {
                            maxLines: 5,
                            maxChars: 220,
                            filter: null // to be specified, e.g. a filter-function or regex 
                        },
                        selected: null // nothing is set / selected
                    }
                }
            }
        ]
    }

    const multipleMockdataCarsNode = {
        cars: [
            {
                id: 'car-1',
                controls: {
                    // only control options with 'true' will be set
                    canAddNodeAbove: true,
                    canMoveDown: true
                },
                data: {
                    // ... contains data as in example above
                }
            },
            {
                id: 'car-2',
                controls: {
                    canAddNodeAbove: true,
                    canMoveUp: true,
                    canMoveDown: true
                },
                data: {
                    // ... contains data as in example above
                }
            },
            {
                id: 'car-3',
                controls: {
                    canAddNodeAbove: true,
                    canAddNodeBelow: true,
                    canMoveUp: true
                },
                data: {
                    // ... contains data as in example above
                }
            }
        ]
    }
}

export default GetDataAndFormAPI
