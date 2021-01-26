<template>
    <!-- <div class="form-container" @keydown.tab.prevent="onKeyDownTab"> -->
    <div class="form-container">
        <div class="top space">
            <div class="add-index-group">
                <div class="r2-circle-button bt-action icon add"></div>
            </div>
        </div>
        <div v-for="(group, index) in form" :key="index" class="index-group">
            <div class="left-side">
                <div v-for="(item, index) in group" :key="index">
                    <div class="input-container" v-if="item.isInputElement">
                        <div class="input-cell" v-if="item.__strc.classes === 'left'">
                            <div class="label" v-html="item.label"></div>
                            <el-input
                                v-if="item.type === 'input'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                suffix-icon="el-icon-date"
                                size="small"
                            />
                            <el-select
                                v-if="item.type === 'dropdown'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                prefix-icon="el-icon-date"
                                size="small"
                            >
                                <el-option
                                    v-for="(option, index) in item.options"
                                    :key="index"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side">
                <div v-for="(item, index) in group" :key="index">
                    <div class="input-container" v-if="item.isInputElement">
                        <div class="input-cell" v-if="item.__strc.classes === 'right'">
                            <div class="label" v-html="item.label"></div>
                            <el-input
                                v-if="item.type === 'input'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                suffix-icon="el-icon-date"
                                size="mini"
                            />
                            <el-select
                                v-if="item.type === 'dropdown'"
                                v-model="item.selected"
                                :placeholder="item.label"
                                prefix-icon="el-icon-date"
                                size="mini"
                            >
                                <el-option
                                    v-for="(option, index) in item.options"
                                    :key="index"
                                    :label="option.label"
                                    :value="option.value"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="controls">
                <div class="r2-circle-button bt-danger icon trash"></div>
                <!-- <el-button type="danger" icon="el-icon-delete" circle size="mini" tabindex="-1"></el-button> -->
            </div>

            <div class="add-index-group">
                <div class="r2-circle-button bt-action icon add"></div>
            </div>
            <div class="move-controls">
                <div class="buttons">
                    <div class="r2-circle-button bt-action icon move"></div>
                    <div class="r2-circle-button bt-action icon move"></div>
                    <div class="r2-circle-button bt-action icon move"></div>
                    <div class="r2-circle-button bt-action icon move"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const getMockOptions = (key, num) => {
    const res = []
    for (let index = 1; index < num; index++) {
        res.push(`${key}-${index}`)
    }
    return res
}

import DynamicFormHandler from '@/js/DynamicFormHandler'
// import VueDynamicForm from 'vue-dynamic-form-component' // dont works with vue-3
export default {
    components: {
        // VueDynamicForm
    },
    props: {
        config: {}
    },
    data() {
        return {
            selected: {},
            lastTabIndex: 0,
            //
            dfData: {},
            dfDescriptors: {
                name: { type: 'string', min: 3, mex: 15, required: true },
                homepage: { type: 'url', message: 'The homepage must be an url' },
                company: {
                    type: 'object',
                    fields: {
                        name: { type: 'string', required: true },
                        address: {
                            type: 'object',
                            fields: {
                                province: { type: 'string', required: true },
                                city: { type: 'string' }
                            }
                        }
                    }
                },
                children: {
                    type: 'array',
                    defaultField: {
                        type: 'object',
                        fields: {
                            name: { type: 'string', min: 3, max: 15, required: true },
                            age: { type: 'number', min: 1, max: 100, required: true }
                        }
                    }
                }
            },
            data: {},

            //
            input1: null,
            cells: [],
            numOfTabs: 50, // TEST
            //
            fh: null,
            form: null,
            data: {
                authors: [
                    {
                        givenName: 'author 1',
                        familyName: 'foo 1',
                        nameIdentifier: 'https://orcid.org/1234-1234-1234-1234'
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
            dataXX: {
                // authors: []
            },
            schema: {
                authors: [
                    {
                        __0: {
                            sublist: true
                        },
                        department: {
                            __0: {
                                type: 'dropdown',
                                // options: ['a-1', 'a-2', 'a-3', 'a-4']
                                options: getMockOptions('department', 100),
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
            }
        }
    },
    created() {
        // let cnt = 0
        // while (++cnt <= this.numOfTabs) {
        //     this.cells.push({ plc: `Text Input -${cnt}`, tabIndex: cnt })
        // }
        // globals.eventBus.$on('updateActiveView', this.onUpdateActiveView)
    },
    mounted() {
        const $sel = $('.form-container .controls button')
        $sel.attr('tabindex', -1)

        // all: none;

        //
        this.fh = new DynamicFormHandler()
        this.fhForm = this.fh.getForm(this.data, this.schema)
        let tabIndex = 0
        this.form = []
        let target = null
        let lastIndex = -1
        let cnt = 0
        _.each(this.fhForm, elm => {
            switch (elm.type) {
                case 'input':
                case 'dropdown':
                    elm.tabIndex = ++tabIndex
            }
            elm.isInputElement = false
            switch (elm.type) {
                case 'input':
                case 'dropdown':
                    elm.isInputElement = true
            }

            if (elm.__strc.lastIndex >= 0) {
                if (elm.__strc.lastIndex > lastIndex) {
                    lastIndex = elm.__strc.lastIndex
                    target = []
                    this.form.push(target)
                    cnt++ // TEST
                }
                // elm.selected = elm.selected || cnt // TEST
                target.push(elm)
            }
        })
        this.form.pop() // mock, remove the last 'add' element

        this.numOfTabs = tabIndex
        console.log('FORM:mounted this.form = ', this.form)

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
    },
    methods: {
        // obsolete for now, returned to browser native tabbing
        onKeyDownTab(evt) {
            // Simple test function for focus handling
            // default bowser method sadly destroys coded scroll setup
            // const $focused = $('.form-container .form-elements :focus')
            const $focused = $('.form-container :focus')

            let tabindex = parseInt($focused.attr('tabindex'))
            tabindex = isNaN(tabindex) ? this.lastTabIndex : tabindex
            this.lastTabIndex = tabindex
            console.log('FORM:onKeyDownTab tabindex = ', tabindex)

            let nextIndex
            if (evt.shiftKey) {
                nextIndex = tabindex === 1 ? this.numOfTabs : tabindex - 1
            } else {
                nextIndex = tabindex >= this.numOfTabs ? 1 : tabindex + 1
            }
            console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            const sel = `.form-container [tabindex=${nextIndex}]`
            const $next = $(sel)
            console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            // $next.focus({ preventScroll: true }) // dont works and without its scroll hassle !!
            // $next.select() // this dont works with dropdowns, drops key enter feature
            $next.focus()
        }
    }
}
</script>
