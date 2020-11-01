<template>
    <div class="flow-show">
        <div class="inner"></div>
    </div>
</template>

<script>
//
//
export default {
    props: {
        config: {}
    },
    data() {
        return {
            // loginOpen: false
        }
    },
    created() {
        globals.eventBus.$on('reset-flow-show', this.reset)
    },
    methods: {
        onClick() {
            // console.log('obj:fc onClick = ')
            // this.loginOpen ? null : this.openLog()
            // this.loginOpen = true
            // globals.eventBus.$emit('click', { key: 'login-start', id: 'login-animation' })
        },
        reset() {
            // if (this.loginOpen) {
            //     const speed = 0.4
            //     const tg = '.login-animation'
            //     gsap.to($('.login-animation .pie'), speed, {
            //         left: '+=130',
            //         ease: Expo.easeOut
            //     })
            //     gsap.to($('.login-animation .sym-circle'), speed, {
            //         left: '+=140',
            //         ease: Expo.easeOut,
            //         delay: 0
            //     })
            //     gsap.to($('.login-animation .sym-arrow'), speed, {
            //         left: '-=210',
            //         ease: Expo.easeOut,
            //         delay: 0,
            //         onComplete: () => this.finalizeReset()
            //     })
            // } else {
            //     this.finalizeReset()
            // }
        },
        finalizeReset() {
            // const tg = '.login-animation'
            // gsap.set(`${tg} .pie`, { clearProps: 'left' })
            // gsap.set(`${tg} .sym-circle`, { clearProps: 'left' })
            // gsap.set(`${tg} .sym-arrow`, { clearProps: 'left' })
        }

        // openLog() {
        //     const speed = 0.5
        //     gsap.to($('.login-animation .pie'), speed, {
        //         left: '-=130',
        //         ease: Expo.easeOut
        //     })
        //     gsap.to($('.login-animation .sym-circle'), speed, {
        //         left: '-=140',
        //         ease: Expo.easeOut,
        //         delay: 0
        //     })
        //     gsap.to($('.login-animation .sym-arrow'), speed, {
        //         left: '+=210',
        //         ease: Expo.easeOut,
        //         delay: 0
        //     })
        // }
    }
}
</script>

<style lang="scss" scoped>
.login-animation {
    position: absolute;
    top: 40px;
    left: 570px;
    width: 510px;
    height: 400px;
    // border: 1px solid white;
    overflow: hidden;
    pointer-events: none;
    .clickable {
        cursor: pointer;
        pointer-events: all;
    }
    //
    .pie {
        position: absolute;
        top: 22px;
        left: 130px;
        width: 40px;
        height: 300px;
        overflow: hidden;
        .inner {
            width: 250px;
            height: 250px;
            border: 3px solid rgb(172, 255, 199);
            border-radius: 50%;
        }
    }
    .sym-circle {
        position: absolute;
        top: 111px;
        left: 165px;
        .inner {
            width: 60px;
            height: 60px;
            border: 2px solid rgb(172, 255, 199);
            background-color: rgba(0, 0, 0, 0.35);
            border-radius: 50%;
            div {
                width: 100%;
                height: 100%;
                transform: scale(0.7);
                transform-origin: center;
            }
        }
    }

    .sym-arrow {
        position: absolute;
        top: 111px;
        left: 223px;
        .inner {
            width: 60px;
            height: 60px;
            // border: 2px solid rgb(172, 255, 199);
            // background-color: rgba(0, 0, 0, 0.35);
            // border-radius: 50%;
            div {
                width: 100%;
                height: 100%;
                transform: scale(0.7);
                transform-origin: center;
            }
        }
    }
}
</style>
