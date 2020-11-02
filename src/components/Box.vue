<template>
    <div class="box" :class="[config.id, { 'no-events': !config.visible }]">
        <div
            v-for="(view, vKey) in config.views"
            :key="vKey"
            class="view"
            :class="[view.id, { 'no-events': !view.visible }]"
        >
            <div class="inner bg-img" :class="[view.id]"></div>
            <div class="elements">
                <div
                    v-for="(elm, key) in view.elements"
                    class="element"
                    :class="[key, { clickable: elm.click }]"
                    :key="key"
                    @click="elm.click ? onClickElement(key, elm.args) : null"
                >
                    <div v-if="elm.html" v-html="elm.html" :class="[key, elm.classes]"></div>
                    <div v-else class="bg-img" :class="[key, elm.classes]"></div>
                </div>
            </div>
            <div class="click-zones">
                <div
                    v-for="(zone, key) in view.zones"
                    :key="key"
                    class="click-zone"
                    :style="zone.pos"
                    @click="onClickZone(key, zone.args)"
                ></div>
            </div>
        </div>
        <div v-if="config.close" class="box-close" @click="onClickZone('close')">
            <div class="inner bg-img close-x"></div>
        </div>
    </div>
</template>

<script>
//
export default {
    props: {
        config: {}
    },
    mounted() {
        console.log('BOX: this.config = ', this.config)
        const index = 2
        // console.log('BOX: this.config = ', _.get(`this.config.elements[${index}]`, html))
    },
    methods: {
        onClickZone(key, args = {}) {
            console.log('BOX:onClickZone key, box.id = ', key, this.config.id)
            globals.eventBus.$emit('click', { key, box: this.config, args })
        },
        onClickElement(key, args = {}) {
            console.log('BOX:onClickElement key, box.id = ', key, this.config.id)
            globals.eventBus.$emit('click', { key, box: this.config, args })
        }
    }
}
</script>

<style lang="scss" scoped>
.click-zone {
    position: absolute;
    background-color: rgba(255, 0, 0, 0.3);
    cursor: pointer;
}
.click-zones {
    z-index: 10;
}
</style>
