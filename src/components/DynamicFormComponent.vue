<template>
    <div class="form-container" @keydown.tab.prevent="onKeyDownTab">
        <div class="form-elements form">
            <div v-for="(cell, index) in cells" :key="index" class="input-container">
                <el-input
                    :placeholder="cell.plc"
                    suffix-icon="el-icon-date"
                    v-model="cell.selected"
                    :tabindex="cell.tabIndex"
                ></el-input>
                <!-- <input type="text" :tabindex="index" ref="ip" :data-key="index" /> -->
            </div>
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
import DynamicFormHandler from '@/js/DynamicFormHandler'
export default {
    props: {
        config: {}
    },
    data() {
        return {
            //
            input1: null,
            cells: [],
            numOfCells: 50, // TEST
            //
            fh: null,
            form: null,
            data: {
                correspondingPapers: [{}, {}]
            },
            schema: {
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
    },
    created() {
        this.fh = new DynamicFormHandler()
        this.form = this.fh.getForm(this.data, this.schema)
        // console.log('FORM:created this.form = ', this.form)
        let cnt = 0
        while (++cnt <= this.numOfCells) {
            this.cells.push({ plc: `Text Input -${cnt}`, tabIndex: cnt })
        }
        // console.log('FORM:created this.cells = ',this.cells)
        // globals.eventBus.$on('updateActiveView', this.onUpdateActiveView)
    },
    methods: {
        onKeyDownTab(evt) {
            // Simple test function for focus handling
            // default bowser method sadly destroys coded scroll setup
            const $focused = $('.form-container .form-elements :focus')
            let tabindex = parseInt($focused.attr('tabindex'))
            let nextIndex
            if (evt.shiftKey) {
                nextIndex = tabindex === 1 ? this.numOfCells : tabindex - 1
            } else {
                nextIndex = tabindex >= this.numOfCells ? 1 : tabindex + 1
            }
            const sel = `.form-container .form-elements input[tabindex=${nextIndex}]`
            const $next = $(sel)
            // $next.focus({ preventScroll: true }) // dont works and without its scroll hassle !!
            $next.select()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-container {
    margin-bottom: 10px;
}
</style>
