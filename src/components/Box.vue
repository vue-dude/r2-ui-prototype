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
            <!-- <vue-custom-scrollbar class="scrollable" :settings="scrConfig"> -->
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
            <!-- </vue-custom-scrollbar> -->
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
            uid: globals.getUid(),
            // scroll
            scrollContainer: null,
            $scrollContent: null,
            // wheel
            yScrollValue: 0,
            yScrollPos: 0,
            scrollTopLimitCrossed: false,
            scrollDownLimitCrossed: false,
            borderDown: 0
            // touch
            // lastTouchY: null,
            // touchY: null,
            // touchDeltaY: null,
            // touchDecayY: null,
            // decayTouchValue: null,
            //
            // scrConfig: {
            //     suppressScrollX: true
            // }
        }
    },
    created() {
        globals.eventBus.$on('updateActiveView', this.onUpdateActiveView)
    },
    methods: {
        onUpdateActiveView() {
            $(this.scrollContainer).off('wheel', this.onMouseWheel)
            this.scrollContainer = `.box.${this.config.id}.${this.uid} .view.active .scrollable`
            this.$scrollContent = $(`${this.scrollContainer} .content`)
            $(this.scrollContainer).on('wheel', this.onMouseWheel)
            // console.log('BOX:onUpdateActiveView this.scrollContainer = ', this.scrollContainer)
            // console.log('BOX:onUpdateActiveView $(this.scrollContainer) = ', $(this.scrollContainer))
            // console.log('BOX:onUpdateActiveView this.$scrollContent = ', this.$scrollContent)
        },
        // Implement later
        // frameStepTouch() {
        //     if (this.touchDecayY !== null) {
        //         this.touchDecayY *= 0.96
        //         this.yScrollValue = this.touchDecayY
        //         if (Math.abs(this.touchDecayY) <= 1) {
        //             this.touchDecayY = null
        //         }
        //     }
        //     if (this.yScrollValue !== 0) {
        //         const delta = this.yScrollValue
        //         this.yScrollPos += delta
        //         this.yScrollValue -= delta
        //         if (this.yScrollValue === -1) {
        //             this.yScrollValue++
        //             this.yScrollPos--
        //         }
        //         this.$scrollContent.css('top', -this.yScrollPos)
        //     }
        // },
        getScrollDimensions() {
            return {
                scrollTopEdge: 0,
                scrollDownEdge: this.$scrollContent[0].scrollHeight - $(this.scrollContainer).height()
            }
        },
        // TODO move this to external handler
        onMouseWheel(evt) {
            const accelerateFc = 1.2
            const dim = this.getScrollDimensions()
            if (this.yScrollPos < dim.scrollTopEdge && !this.scrollTopLimitCrossed) {
                const edgeDelta = Math.abs(evt.originalEvent.deltaY) * accelerateFc
                // top border
                this.scrollTopLimitCrossed = true
                this.yScrollPos = dim.scrollTopEdge
                this.yScrollValue = 0
                gsap.set(this.$scrollContent, { top: dim.scrollTopEdge + edgeDelta })
                gsap.to($(this.$scrollContent), 0.6, {
                    top: 0,
                    ease: Expo.easeOut
                })
            } else if (this.yScrollPos > dim.scrollDownEdge && !this.scrollDownLimitCrossed) {
                const edgeDelta = Math.abs(evt.originalEvent.deltaY) * accelerateFc
                // down border
                this.scrollDownLimitCrossed = true
                this.yScrollPos = dim.scrollDownEdge
                this.yScrollValue = 0
                gsap.set(this.$scrollContent, { top: -dim.scrollDownEdge - edgeDelta })
                gsap.to($(this.$scrollContent), 0.6, {
                    top: -dim.scrollDownEdge,
                    ease: Expo.easeOut
                })
            } else {
                if (this.scrollTopLimitCrossed) {
                    if (evt.originalEvent.deltaY > 0) {
                        gsap.killTweensOf(this.$scrollContent)
                        this.scrollTopLimitCrossed = false
                    }
                } else if (this.scrollDownLimitCrossed) {
                    if (evt.originalEvent.deltaY < 0) {
                        gsap.killTweensOf(this.$scrollContent)
                        this.scrollDownLimitCrossed = false
                    }
                } else {
                    this.yScrollValue += evt.originalEvent.deltaY
                    const delta = Math.round(this.yScrollValue / 2)
                    this.yScrollPos += delta
                    this.yScrollValue -= delta
                    gsap.set(this.$scrollContent, { top: -this.yScrollPos })
                }
            }
        },

        onTouchMove(evt) {
            // implement later
            // this.scrollEventType = 'touch'
            // this.touchDecayY = null
            // const touchobj = evt.originalEvent.changedTouches[0] // reference first touch point
            // this.touchY = parseInt(touchobj.clientY) // get x coord of touch point
            // this.touchDeltaY = this.touchY - this.lastTouchY
            // this.yScrollValue -= this.touchDeltaY
            // this.lastTouchY = this.touchY
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
