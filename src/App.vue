<template>
    <router-view />
</template>

<script>
//
import DeviceHandler from '@/js/DeviceHandler'
//
export default {
    data() {
        return {
            about: {
                id: 42
            },
            home: {
                id: 51
            }
        }
    },
    mounted() {
        // globals.eventBus.$emit("testEvent");
        setTimeout(() => {
            window.globals.eventBus.$emit('test-event', 1234)
        }, 1000)
    },
    methods: {
        onClickApp(evt) {
            globals.eventBus.$emit('app-touched')
        },
        onWindowResized(evt) {
            this.updateDevice()
        },
        updateDevice() {
            new DeviceHandler(this.$store).updateDevice()
        },
        updateAppHeight() {
            let height = this.$store.state.innerHeight
            if (height > 1250 && !this.$store.state.isMobile) {
                height = 1250
            }
            const yOffset = this.$store.state.isMobile ? 100 : 150
            const dy = this.$store.state.isMobile ? 50 : 30
            // $('.default-view .content-container .content .layers .scroll-area').height(height - yOffset - dy)
            // $('.default-view .content-container .content .layers .bg').height(height - yOffset - dy + 30)
            // $('.default-view .mobile-navigator .scroll-area').height(height - yOffset - dy + 30)
        },
        updateAppWidth(width) {
            const state = this.$store.state
            if (state.isMobile) {
                // $('.default-view .content-container').width(state.innerWidth - 32)
            } else {
                // $('.default-view .content-container').width('') // none-mobile situation driven by css
            }
        }
    },
    watch: {
        '$store.state.innerWidth'() {
            this.updateAppWidth()
            this.updateAppHeight()
        },
        '$store.state.innerHeight'(height) {
            this.updateAppHeight()
        },
        '$store.state.isMobile'() {
            this.updateAppWidth()
            this.updateAppHeight()
        }
    }
}
</script>

<style lang="scss">
@import '@/css/r2.scss';
</style>
