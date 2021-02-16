const config = {
    visible: true,
    belowModalExclusive: true,
    views: {
        default: {
            zones: {
                'toggle-mock-config-menu-state': {}
            },
            components: {
                'config-menu': {
                    component: 'generic-form',
                    config: {
                        // dataKey: 'data',
                        // schemaKey: 'mock-config',
                        schema: {
                            'close-button': {
                                __0: {
                                    label: 'x',
                                    type: 'ui',
                                    layout: {
                                        classes: 'close-button',
                                        onClick: true
                                    }
                                }
                            },
                            'scroll-type': {
                                __0: {
                                    type: 'radio',
                                    options: [
                                        { value: 'native', label: 'Native' },
                                        { value: 'custom', label: 'Custom' }
                                    ]
                                }
                            },
                            'api-select': {
                                __0: {
                                    type: 'select',
                                    options: [
                                        { value: 'mock', label: 'Internal Mockdata' },
                                        { value: 'edmond', label: 'Edmond II API' },
                                        { value: 'zenodo', label: 'Zenodo API' }
                                    ]
                                }
                            }
                        },
                        data: {
                            'scroll-type': 'native',
                            'api-select': 'mock'
                        },
                        onCreate(config, component){
                            console.log('MC:onCreate config = ', config)
                            globals.uiStore.setApi(config.data['api-select'])
                        },
                        onClickItem: (item, evt) => {
                            if (item.key === 'close-button') {
                                // this simulates a click outside the form box, which
                                // closes the box in the cage-logic
                                $(document).trigger('mouseup')
                            }
                        },
                        onFormItemChanged: item => {
                            console.log('MC:onFormItemChanged item.key = ', item.key)
                            if (item.key === 'scroll-type') {
                                globals.uiStore.setNativeScrollState(item.selected === 'native')
                                return globals.eventBus.$emit('updateActiveView')
                            }
                            if (item.key === 'api-select') {
                                globals.uiStore.setApi(item.selected)
                            }
                        }
                    },
                    classes: 'hidden'
                }
            }
        }
    }
}
export default config
