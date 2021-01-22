<template>
    <div class="box" :class="[config.id, uid, { 'no-events': !config.visible }]">
        <div
            v-for="(view, vKey) in config.views"
            :key="vKey"
            class="view"
            :class="[view.id, { 'no-events': !view.visible, active: view.visible }]"
        >
            <div class="fixed">
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
                <div class="components">
                    <!-- TODO add  typeof component, like form, upload -->
                    <div
                        v-for="(cmp, key) in view.scroll.components"
                        class="component"
                        :class="[key, { clickable: cmp.click }, cmp.classes]"
                        :config="cmp.config"
                        :key="key"
                        @click.stop="cmp.click ? onClickThing(cmp.key || key, cmp.args) : null"
                    ></div>
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

                    <div class="components">
                        <!-- TODO add  typeof component, like form, upload -->
                        <div
                            v-for="(cmp, key) in view.scroll.components"
                            class="component"
                            :class="[key, { clickable: cmp.click }, cmp.classes]"
                            :key="key"
                            @click.stop="cmp.click ? onClickThing(cmp.key || key, cmp.args) : null"
                        >
                            <dynamic-form v-if="cmp.component === 'dynamic-form'" :config="cmp.config"></dynamic-form>
                        </div>
                    </div>

                    <div class="inner" v-if="view.setScrollBgImageOverElements">
                        <div
                            class="inner bg-img"
                            :class="[`${view.id}-scroll`]"
                            @click.stop="view.click ? onClickThing(`${view.id}-scroll`) : null"
                        ></div>
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
                <div class="scrollbar" v-if="showScrollbar">
                    <div class="thumb">
                        <div class="edge up bg-img scrollbar-edge-arrow"></div>
                        <div class="center bg-img scrollbar-center-grid "></div>
                        <div class="edge dn bg-img scrollbar-edge-arrow"></div>
                    </div>
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
//
export default {
    components: {
        DynamicForm
    },
    props: {
        config: {}
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
        globals.eventBus.$on('updateActiveView', this.onUpdateActiveView)
    },
    beforeUnmount() {
        this.destroyBoxScrollHandler()
    },
    methods: {
        destroyBoxScrollHandler() {
            clearTimeout(this.tme1)
            clearTimeout(this.tme2)
            this.boxScrollHandler ? this.boxScrollHandler.destroy() : null
            this.boxScrollHandler = null
        },
        onUpdateActiveView() {
            this.destroyBoxScrollHandler()
            const scrollContainer = `.box.${this.config.id}.${this.uid} .view.active .scrollable`
            this.showScrollbar = false
            this.tme1 = setTimeout(() => {
                const $scrollContent = $(`${scrollContainer} .content`)
                this.showScrollbar = $scrollContent[0] && $scrollContent[0].scrollHeight > 0 ? true : false
                if (this.showScrollbar) {
                    const animateIn = $scrollbar => {
                        gsap.to($scrollbar, 0.4, {
                            opacity: 1
                        })
                    }
                    this.tme2 = setTimeout(() => {
                        console.log('boxScrollHandler CREATE = ', this.uid)
                        this.boxScrollHandler = new BoxScrollHandler({
                            scrollContainer,
                            animateIn,
                            uid: this.uid
                        })
                    }, 10)
                }
            }, 300)
        },
        onClickThing(key, args = {}) {
            let viewKey = null
            _.each(this.config.views, (view, key) => {
                if (view.visible) {
                    viewKey = key
                }
            })
            console.log('BOX:onClickThing key, box.id, args = ', key, this.config.id, args)
            globals.eventBus.$emit('click', { key, box: this.config, args, viewKey })
        }
    }
}
</script>
