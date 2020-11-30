<template>
    <div class="box" :class="[config.id, { 'no-events': !config.visible }]">
        <div
            v-for="(view, vKey) in config.views"
            :key="vKey"
            class="view"
            :class="[view.id, { 'no-events': !view.visible }]"
        >
            <div class="fixed">
                <div class="inner" v-if="!view.setBgImageOverElements">
                    <div class="inner bg-img" :class="[view.id]"></div>
                </div>
                <div class="elements">
                    <div
                        v-for="(elm, key) in view.elements"
                        class="element"
                        :class="[key, { clickable: elm.click }]"
                        :key="key"
                        @click="elm.click ? onClickThing(elm.key || key, elm.args) : null"
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
                        @click="onClickThing(zone.key || key, zone.args)"
                    ></div>
                </div>
            </div>
            <vue-custom-scrollbar class="scrollable" :settings="scrConfig">
                <!-- <div class="scrollable"> -->
                <div class="content">
                    <div class="inner" v-if="!view.setScrollBgImageOverElements">
                        <div class="inner bg-img" :class="[`${view.id}-scroll`]"></div>
                    </div>
                    <div class="elements">
                        <div
                            v-for="(elm, key) in view.scroll.elements"
                            class="element"
                            :class="[key, { clickable: elm.click }]"
                            :key="key"
                            @click="elm.click ? onClickThing(elm.key || key, elm.args) : null"
                        >
                            <div v-if="elm.html" v-html="elm.html" :class="[key, elm.classes]"></div>
                            <div v-else class="bg-img" :class="[key, elm.classes]"></div>
                        </div>
                    </div>
                    <div class="inner" v-if="view.setScrollBgImageOverElements">
                        <div class="inner bg-img" :class="[`${view.id}-scroll`]"></div>
                    </div>
                    <div class="click-zones">
                        <div
                            v-for="(zone, key) in view.scroll.zones"
                            :key="key"
                            class="click-zone"
                            :class="[key]"
                            @click="onClickThing(zone.key || key, zone.args)"
                        ></div>
                    </div>
                    <div class="scroll-bg"></div>
                </div>
            </vue-custom-scrollbar>
            <div class="overlay">
                <div class="elements">
                    <div
                        v-for="(elm, key) in view.overlay.elements"
                        class="element"
                        :class="[key, { clickable: elm.click }]"
                        :key="key"
                        @click="elm.click ? onClickThing(elm.key || key, elm.args) : null"
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
                        @click="onClickThing(zone.key || key, zone.args)"
                    ></div>
                </div>
            </div>
            <!-- <div class="overlay">
                <div class="v2-search-page-pager-left">
                    <div class="bg-img v2-search-page-pager-left"></div>
                </div>
            </div> -->
        </div>
        <div v-if="config.close" class="box-close" @click="onClickThing('close')">
            <div class="inner bg-img close-x"></div>
        </div>
    </div>
</template>

<script>
//
// This is a quick self customized version for vue 3, uses 'beforeUnmount' instead of 'beforeDestroy' and seems to work.
import vueCustomScrollbar from '@/lib/vue-custom-scrollbar-next.vue'
//
export default {
    components: {
        vueCustomScrollbar
    },
    props: {
        config: {}
    },
    data() {
        return {
            scrConfig: {
                suppressScrollX: true
            }
        }
    },
    mounted() {
        // console.log('BOX: this.config = ', this.config)
        // const index = 2
        // console.log('BOX: this.config = ', _.get(`this.config.elements[${index}]`, html))
    },
    methods: {
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
