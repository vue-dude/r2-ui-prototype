<template>
    <!-- <div class="form-container" @keydown.tab.prevent="onKeyDownTab"> -->
    <div class="form-container">
        <div v-for="(group, index) in form" :key="index" class="index-group">
            <div v-for="(item, index) in group" :key="index">
                <!-- <div class="input-container"> -->
                <!-- <div class="input-container" v-if="item.tabIndex > -1"> -->
                <!-- <div class="input-container" v-if="item.tabYndex > 0"> -->
                <div class="input-container" v-if="item.isInputElement">
                    <div class="label" v-html="item.label"></div>

                    <el-input
                        v-if="item.type === 'input'"
                        v-model="item.selected"
                        :placeholder="item.label"
                        suffix-icon="el-icon-name"
                    />
                    <el-select
                        v-if="item.type === 'dropdown'"
                        v-model="item.selected"
                        :placeholder="item.label"
                        suffix-icon="el-icon-date"
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

    <div v-if="false" class="form-container" @keydown.tab.prevent="onKeyDownTab">
        <!-- <vue-dynamic-form v-model="dfData" :descriptors="dfDescriptors" :lang="lang"></vue-dynamic-form> -->
        <div class="form-elements form">
            <!-- <div v-for="(item, index) in form" :key="index" :class="item.__strc ? item.__strc.class : ''"> -->
            <div v-for="(item, index) in form" :key="index">
                <!-- <el-input
                    v-if="item.tabIndex > -1"
                    :placeholder="item.tabIndex.toString()"
                    :tabindex="item.tabIndex.toString()"    
                ></el-input> -->
                <div class="input-container" v-if="item.tabIndex > -1">
                    <div class="label" v-html="item.label"></div>
                    <el-input
                        :placeholder="item.label"
                        :tabindex="item.tabIndex.toString()"
                        v-model="item.selected"
                        suffix-icon="el-icon-date"
                    />
                </div>
                <div class="layout-container" v-else>{{ JSON.stringify(item) }}</div>
                <div>-----------------</div>
                <!-- <div v-else class="layout">{{ item.type }}</div> -->
            </div>

            <!-- <div v-for="(cell, index) in cells" :key="index" class="input-container">
                <el-input :placeholder="cell.plc" suffix-icon="el-icon-date" v-model="cell.selected"></el-input>
            </div> -->
            <!-- <b-form-group
                v-for="(item, index) in form"
                :key="index"
                :id="item.key"
                :label="item.type === 'button' ? null : item.label"
                :label-for="item.key"
                :description="item.description"
                :class="item.__strc ? item.__strc.class : ''"
            >
                <div v-if="item.type === 'LY'" class="layout">
                    <div class="line"></div>
                    <div class="label">{{ item.spLabel }}</div>
                    <div class="action">
                        <b-button
                            v-if="item.addNode"
                            class="add"
                            size="sm"
                            @click="onClickActionButton({ item, action: 'addNode' })"
                        >
                            (+) Add
                        </b-button>

                        <b-button
                            v-if="item.shift2FirstNode"
                            class="shift"
                            size="sm"
                            @click="onClickActionButton({ item, action: 'shift2FirstNode' })"
                        >
                            &#x25B2;&#x25B2;
                        </b-button>

                        <b-button
                            v-if="item.shift1UpNode"
                            class="shift"
                            size="sm"
                            @click="onClickActionButton({ item, action: 'shift1UpNode' })"
                        >
                            &#x25B2;
                        </b-button>

                        <b-button
                            v-if="item.shift1DownNode"
                            class="shift"
                            size="sm"
                            @click="onClickActionButton({ item, action: 'shift1DownNode' })"
                        >
                            &#x25BC;
                        </b-button>

                        <b-button
                            v-if="item.shift2LastNode"
                            class="shift"
                            size="sm"
                            @click="onClickActionButton({ item, action: 'shift2LastNode' })"
                        >
                            &#x25BC;&#x25BC;
                        </b-button>

                        <b-button
                            v-if="item.removeNode"
                            class="remove"
                            size="sm"
                            @click="onClickActionButton({ item, action: 'removeNode' })"
                        >
                            (-) Remove
                        </b-button>
                    </div>
                </div>

                <b-input-group
                    v-if="item.type === 'button' && item.show"
                    size="sm"
                    :prepend="item.prepend"
                    :append="item.append"
                >
                    <b-button :id="item.key" class="bt-form" size="sm" @click="onClickButton(item)">
                        {{ item.label }}
                    </b-button>
                </b-input-group>

                <b-input-group
                    v-if="item.type === 'input' && item.show"
                    size="sm"
                    :prepend="item.prepend"
                    :append="item.append"
                >
                    <b-form-input :id="item.key" :placeholder="item.placeholder" v-model="item.selected"></b-form-input>
                </b-input-group>

                <b-input-group
                    v-if="item.type === 'textarea' && item.show"
                    :prepend="item.prepend"
                    :append="item.append"
                >
                    <b-form-textarea
                        :id="item.key"
                        v-model="item.selected"
                        :placeholder="item.placeholder"
                        :rows="item.rows"
                        :max-rows="item.maxRows"
                    ></b-form-textarea>
                </b-input-group>
                <b-input-group
                    v-if="item.type === 'dropdown' && item.show"
                    :prepend="item.prepend"
                    :append="item.append"
                >
                    <b-form-select :id="item.key" v-model="item.selected" :options="item.options" size="sm">
                        <option :value="null" :name="item.key" disabled>{{ item.placeholder }}</option>
                    </b-form-select>
                </b-input-group>
                <b-input-group v-if="item.type === 'tags'" :prepend="item.prepend" :append="item.append">
                    <b-form-tags :id="item.key" v-model="item.selected" :options="item.options" size="md"></b-form-tags>
                </b-input-group>
                <b-input-group v-if="item.type === 'date' && item.show">
                    <b-form-datepicker :id="item.key" v-model="item.selected" class="mb-2"></b-form-datepicker>
                </b-input-group>
                <b-input-group v-if="item.type === 'multi-select'">
                    <b-form-checkbox-group
                        :id="item.key"
                        class="pointer"
                        v-model="item.selected"
                        :options="item.options"
                    ></b-form-checkbox-group>
                </b-input-group>
                <b-input-group v-if="item.type === 'single-select' && item.show">
                    <b-form-radio-group
                        :id="item.key"
                        class="pointer"
                        v-model="item.selected"
                        :options="item.options"
                    ></b-form-radio-group>
                </b-input-group>
                <b-input-group v-if="item.type === 'file-upload' && item.show" class="pointer">
                    <b-form-file
                        :id="item.key"
                        v-model="item.meta"
                        :state="Boolean(item.meta)"
                        :placeholder="item.placeholder"
                        :drop-placeholder="item.placeholder"
                        @input="onFileInput(item)"
                    ></b-form-file>
                </b-input-group>
                <value-cell
                    v-if="item.type === 'value-cell' && item.show"
                    :config="item"
                    v-model="item.selected"
                ></value-cell>
            </b-form-group> -->
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
                authors: [{}, {}, {}, {}, {}, {}, {}]
            },
            schemaXX: {
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
                                options: getMockOptions('department', 100)
                            }
                        },
                        givenName: {},
                        familyName: {},
                        nameIdentifier: {},
                        test1: {},
                        test2: {}

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
        // this.fh = new DynamicFormHandler()
        // this.form = this.fh.getForm(this.data, this.schema)
        // console.log('FORM:created this.form = ', this.form)
        let cnt = 0
        while (++cnt <= this.numOfTabs) {
            this.cells.push({ plc: `Text Input -${cnt}`, tabIndex: cnt })
        }
        // console.log('FORM:created this.cells = ',this.cells)
        // globals.eventBus.$on('updateActiveView', this.onUpdateActiveView)
    },
    mounted() {
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

            console.log('FORM:mounted elm lastIndex = ', elm.__strc.lastIndex)
            console.log('FORM:mounted elm lastIndex = ', lastIndex)
            if (elm.__strc.lastIndex >= 0) {
                if (elm.__strc.lastIndex > lastIndex) {
                    lastIndex = elm.__strc.lastIndex
                    target = []
                    this.form.push(target)
                    cnt++ // TEST
                }
                elm.selected = cnt // TEST
                target.push(elm)
            }

            // console.log('FORM:mounted elm level = ', elm.__strc.level)
            // console.log('FORM:mounted elm lastIndex = ', elm.__strc.lastIndex)
        })
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
        onKeyDownTab(evt) {
            // Simple test function for focus handling
            // default bowser method sadly destroys coded scroll setup
            // const $focused = $('.form-container .form-elements :focus')
            const $focused = $('.form-container :focus')

            let tabindex = parseInt($focused.attr('tabindex'))
            tabindex = isNaN(tabindex) ?  this.lastTabIndex : tabindex
            this.lastTabIndex = tabindex
            console.log('FORM:onKeyDownTab tabindex = ', tabindex)

            let nextIndex
            if (evt.shiftKey) {
                nextIndex = tabindex === 1 ? this.numOfTabs : tabindex - 1
            } else {
                nextIndex = tabindex >= this.numOfTabs ? 1 : tabindex + 1
            }
            console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            // const sel = `.form-container .form-elements input[tabindex=${nextIndex}]`
            const sel = `.form-container [tabindex=${nextIndex}]`
            const $next = $(sel)
            console.log('FORM:onKeyDownTab nextIndex = ', nextIndex)

            // $next.focus({ preventScroll: true }) // dont works and without its scroll hassle !!
            // $next.select()
            $next.focus()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-container {
    .index-group {
        background-color: gray;
        border: 1px solid white;
        border-radius: 10px;
        width: 500px;
        // height: 200px;
        margin-bottom: 20px;
        .input-container {
            margin: 20px;
            // margin-left: 20px;
            // margin-right: 20px;
            // margin-bottom: 10px;
            // margin-bottom: 10px;
            .label {
                margin-bottom: 5px;
                margin-left: 5px;
                color: #c8d3f3;
            }
        }
    }
}
</style>
