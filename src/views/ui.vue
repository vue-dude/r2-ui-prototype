<template>
    <div class="app" :class="[$store.state.deviceClasses]" @click="onClickApp">
        <router-view />
    </div>
</template>

<script>
//
import DeviceHandler from '@/js/DeviceHandler'
//
export default {
    data() {
        return {
            itvl: null,
            itvlCnt: 0
        }
    },
    created() {
        // TODO move this into the device control class
        globals.eventBus.$on('windowResized', this.onWindowResized)
        window.onorientationchange = () => {
            this.updateDevice()
            this.itvlCnt = 5
            clearInterval(this.itvl)
            this.itvl = setInterval(() => {
                this.updateDevice()
                if (--itvlCnt < 1) {
                    clearInterval(this.itvl)
                }
            }, 2000)
        }
    },
    mounted() {
        this.updateDevice()
        setTimeout(() => {
            this.updateAppHeight(this.$store.state.innerHeight)
        }, 100)
        $(document).on('touchmove', function(e) {
            globals.eventBus.$emit('app-touched')
        })
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
            // const yOffset = this.$store.state.isMobile ? 100 : 150
            // const dy = this.$store.state.isMobile ? 50 : 30
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
// @import '@/css/r2.scss';
// @import './test.scss'; // points to 'views' folder
@import '@/css/r2.scss';
</style>
