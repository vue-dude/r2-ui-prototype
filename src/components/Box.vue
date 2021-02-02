<template>
    <div
        v-if="boxEnabled"
        class="box"
        :class="[config.id, uid, { 'no-events': !config.visible }]"
        @keydown.tab="onKeyDownTab"
    >
        <div
            v-for="(view, vKey) in config.views"
            :key="vKey"
            class="view"
            :class="[view.id, { 'no-events': !view.visible, active: view.visible }]"
        >
            <div class="fixed">
                <div class="tabs">
                    <div
                        v-for="(tab, key) in view.tabs"
                        class="tab"
                        :class="[tab.classes, { active: tab.active }]"
                        :key="key"
                        @click.stop="onClickThing(tab.key || key, { isViewTab: true })"
                    >
                        <div class="shape-l">
                            <div class="shape sh-1"></div>
                        </div>
                        <div class="shape-r">
                            <div class="shape sh-2"></div>
                        </div>
                        <div class="shape-c">
                            <div class="shape"></div>
                        </div>
                        <div class="label" v-html="tab.html"></div>
                    </div>
                </div>

                <div class="components">
                    <!-- TODO add  typeof component, like form, upload -->
                    <!-- TODO unify structure, add 'fixed' ? -->
                    <div
                        v-for="(cmp, key) in view.components"
                        class="component"
                        :class="[key, { clickable: cmp.click }, cmp.classes]"
                        :key="key"
                        @click.stop="cmp.click ? onClickThing(cmp.key || key, cmp.args) : null"
                    >
                        <dynamic-form v-if="cmp.component === 'dynamic-form'" :config="cmp.config"></dynamic-form>
                    </div>
                </div>
                <div class="inner" v-if="!view.setBgImageOverElements">
                    <div
                        class="inner bg-img"
                        :class="[view.id]"
                        @click.stop="view.click ? onClickThing(view.id) : null"
                    ></div>
                </div>
                <div class="elements">
                    <div
                        v-for="(elm, key) in view.elements"
                        class="element"
                        :class="[key, { clickable: elm.click }, elm.classes]"
                        :key="key"
                        @click.stop="elm.click ? onClickThing(elm.key || key, elm.args) : null"
                    >
                        <div v-if="elm.html" v-html="elm.html" :class="[key, elm.classes]"></div>
                        <div v-else class="bg-img" :class="[key, elm.classes]"></div>
                    </div>
                </div>

                <div class="inner" v-if="view.setBgImageOverElements">
                    <div class="inner bg-img" :class="[view.id]"></div>
                </div>
                <div class="click-zones">
                    <div
                        v-for="(zone, key) in view.zones"
                        :key="key"
                        class="click-zone"
                        :class="[key]"
                        @click.stop="onClickThing(zone.key || key, zone.args)"
                    ></div>
                </div>
            </div>
            <div class="scrollable">
                <div class="content">
                    <div class="inner" v-if="!view.setScrollBgImageOverElements">
                        <div class="inner bg-img" :class="[`${view.id}-scroll`]"></div>
                    </div>
                    <div class="elements">
                        <div
                            v-for="(elm, key) in view.scroll.elements"
                            class="element"
                            :class="[key, { clickable: elm.click }, elm.classes]"
                            :key="key"
                            @click.stop="elm.click ? onClickThing(elm.key || key, elm.args) : null"
                        >
                            <div v-if="elm.html" v-html="elm.html" :class="[key, elm.classes]"></div>
                            <div v-else class="bg-img" :class="[key, elm.classes]"></div>
                        </div>
                    </div>

                    <div class="inner" v-if="view.setScrollBgImageOverElements">
                        <div
                            class="inner bg-img"
                            :class="[`${view.id}-scroll`]"
                            @click.stop="view.click ? onClickThing(`${view.id}-scroll`) : null"
                        ></div>
                    </div>

                    <div class="components">
                        <!-- TODO add  typeof component, like form, upload -->
                        <!-- figure out reason components gets overlayed by inner if other position -->
                        <div
                            v-for="(cmp, key) in view.scroll.components"
                            class="component"
                            :class="[key, { clickable: cmp.click }, cmp.classes]"
                            :key="key"
                            @click.stop="cmp.click ? onClickThing(cmp.key || key, cmp.args) : null"
                        >
                            <dynamic-form v-if="cmp.component === 'dynamic-form'" :config="cmp.config"></dynamic-form>
                            <active-list v-if="cmp.component === 'active-list'" :config="cmp.config"></active-list>
                        </div>
                    </div>

                    <div class="click-zones">
                        <div
                            v-for="(zone, key) in view.scroll.zones"
                            :key="key"
                            class="click-zone"
                            :class="[key]"
                            @click.stop="onClickThing(zone.key || key, zone.args)"
                        ></div>
                    </div>
                    <div class="scroll-bg"></div>
                </div>
            </div>
            <div class="scrollbar" v-if="showScrollbar">
                <div class="thumb">
                    <div class="edge up bg-img scrollbar-edge-arrow"></div>
                    <div class="center bg-img scrollbar-center-grid "></div>
                    <div class="edge dn bg-img scrollbar-edge-arrow"></div>
                </div>
            </div>

            <div class="overlay">
                <div class="elements">
                    <div
                        v-for="(elm, key) in view.overlay.elements"
                        class="element"
                        :class="[key, { clickable: elm.click }, elm.classes]"
                        :key="key"
                        @click.stop="elm.click ? onClickThing(elm.key || key, elm.args) : null"
                    >
                        <div v-if="elm.html" v-html="elm.html" :class="[key, elm.classes]"></div>
                        <div v-else class="bg-img" :class="[key, elm.classes]"></div>
                    </div>
                </div>
                <div class="components">
                    <!-- TODO add  typeof component, like form, upload -->
                    <div
                        v-for="(cmp, key) in view.overlay.components"
                        class="component"
                        :class="[key, { clickable: cmp.click }, cmp.classes]"
                        :key="key"
                        @click.stop="cmp.click ? onClickThing(cmp.key || key, cmp.args) : null"
                    >
                        <dynamic-form v-if="cmp.component === 'dynamic-form'" :config="cmp.config"></dynamic-form>
                        <active-list v-if="cmp.component === 'active-list'" :config="cmp.config"></active-list>
                    </div>
                </div>
                <div class="click-zones">
                    <div
                        v-for="(zone, key) in view.overlay.zones"
                        :key="key"
                        class="click-zone"
                        :class="[key]"
                        @click.stop="onClickThing(zone.key || key, zone.args)"
                    ></div>
                </div>
            </div>
        </div>
        <div v-if="config.close" class="box-close" @click.stop="onClickThing('close')">
            <div class="inner bg-img close-x"></div>
        </div>
    </div>
</template>

<script>
//
import BoxScrollHandler from '@/js/BoxScrollHandler.js'
import DynamicForm from '@/components/DynamicFormComponent.vue'
import ActiveList from '@/components/ActiveListComponent.vue'
//
export default {
    components: {
        DynamicForm,
        ActiveList
    },
    props: {
        config: {},
        isModalOverlay: false
    },
    data() {
        return {
            uid: globals.getUid(),
            showScrollbar: false,
            tme1: null,
            tme2: null,
            boxScrollHandler: null
        }
    },
    created() {
        if (this.boxEnabled) {
            globals.eventBus.$on('updateActiveView', this.onUpdateActiveView)
        }
        console.log('BOX:created this.isModalOverlay = ', this.isModalOverlay)
    },
    beforeUnmount() {
        this.destroyBoxScrollHandler()
    },
    computed: {
        boxEnabled() {
            if (this.config.overModalExclusive && !this.isModalOverlay) {
                return false
            }
            if (this.config.belowModalExclusive && this.isModalOverlay) {
                return false
            }
            return true
        }
    },
    methods: {
        onKeyDownTab(evt) {
            // setTimeout(() => {
            //     const view = `.box.${this.config.id}.${this.uid} .view.active`
            //     const $scrollable = $(`${view} .scrollable`)
            //     const $scrollContent = $(`${view} .scrollable .content`)
            //     const $components = $(`${view} .scrollable .content .components`)
            //     // $.tabNext()
            //     console.log('BOX:onKeyDownTab $scrollable.scrollTop() = ', $scrollable.scrollTop())
            //     console.log('BOX:onKeyDownTab $scrollContent.scrollTop() = ', $scrollContent.scrollTop())
            //     console.log('BOX:onKeyDownTab $components.scrollTop() = ', $components.scrollTop())
            // }, 100)
        },
        destroyBoxScrollHandler(reset) {
            clearTimeout(this.tme1)
            clearTimeout(this.tme2)
            if (this.boxScrollHandler) {
                reset ? this.boxScrollHandler.reset() : null
                this.boxScrollHandler.destroy()
            }
            this.boxScrollHandler = null
        },
        onUpdateActiveView(args = {}) {
            if (args.targets && !_.includes(args.targets, this.config.id)) {
                return
            }
            const props = this.boxScrollHandler ? this.boxScrollHandler.getScrollProperties() : {}
            // console.log('BOX:onUpdateActiveView props = ', props)
            if (!args.keepScrollPosition) {
                props.yScrollPosition = 0
            }
            const keepPosition = _.isNumber(props.yScrollPosition) && Math.abs(props.yScrollPosition) > 0
            this.destroyBoxScrollHandler(!keepPosition)
            const view = `.box.${this.config.id}.${this.uid} .view.active`
            this.showScrollbar = false
            this.tme1 = setTimeout(() => {
                const $scrollContent = $(`${view} .scrollable .content`)
                this.showScrollbar = $scrollContent[0] && $scrollContent[0].scrollHeight > 0 ? true : false
                if (this.showScrollbar) {
                    const animateIn = $scrollbar => {
                        gsap.to($scrollbar, 0.4, {
                            opacity: 1
                        })
                    }
                    this.tme2 = setTimeout(() => {
                        this.boxScrollHandler = new BoxScrollHandler({
                            view,
                            animateIn,
                            uid: this.uid,
                            props
                        })
                    }, 10)
                }
            }, 200)
        },
        onClickThing(key, args = {}) {
            let viewKey = null
            _.each(this.config.views, (view, key) => {
                if (view.visible) {
                    viewKey = key
                }
            })
            globals.eventBus.$emit('click', { key, box: this.config, args, viewKey })
        }
    }
}
</script>
