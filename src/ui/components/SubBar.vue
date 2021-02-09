<template>
    <div class="sub-bar">
        <div class="bar-background">
            <div class="border left"></div>
            <div class="border right"></div>
        </div>
        <div class="left-adjusted-text path">{{ uiStore.state.subPath }}</div>
        <div class="legal" v-html="legal"></div>
        <div class="logo">
            <div class="image"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        config: Object
    },
    data() {
        return {
            uiStore: globals.uiStore,
            path: {
                main: '',
                sub: '',
                level3: '',
                mainKey: null,
                subKey: null,
                level3Key: null
            },
            showPath: null,
            showPathTimeout: null,
            uKey: 0
        }
    },
    created() {
        // globals.eventBus.$on('routeWillChange', this.onRouteWillChange)
    },
    mounted() {
        this.update()
    },
    beforeUnmount() {},
    methods: {
        update() {
            this.uKey = this.uKey > 1000 ? 1 : ++this.uKey
        }
    },
    computed: {
        legal() {
            const keyz = 'terms,sp,imprint,sp,privacy'.split(',')
            const trns = []
            _.each(keyz, key => {
                const i18n = this.$t(`head.${key}`)
                trns.push(`<a href='#/legal/${key}'>${i18n}</a>`)
            })
            return trns.join(' ')
        }
    }
}
</script>
