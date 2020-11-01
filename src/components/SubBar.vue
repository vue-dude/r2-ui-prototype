<template>
    <div class="sub-bar">
        <div class="path">{{ $store.state.subPath }}</div>
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
        this.uKey++
    },
    beforeUnmount() {
        // globals.eventBus.$off('routeWillChange', this.onRouteWillChange)
    },
    methods: {
        // onRouteWillChange(args) {
        //     // TODO may needs update for level 3 !
        //     if (args.mainKey !== this.path.mainKey || args.subKey !== this.path.subKey) {
        //         this.path.mainKey = args.mainKey
        //         this.path.subKey = args.subKey
        //         clearTimeout(this.showPathTimeout)
        //         this.showPath = false
        //         if (args.subKey) {
        //             this.showPathTimeout = setTimeout(() => {
        //                 this.showPath = true
        //             }, 350)
        //         }
        //     }
        // },
        // setNextRoute(circle) {
        //     let path = this.$router.history.current.fullPath
        //     const index = circle.indexOf(path) + 1
        //     path = circle[index] ? circle[index] : circle[0]
        //     this.$router.push({ path })
        // },
        // goPrev() {
        //     this.setNextRoute([...datasource.getConfig().circleNav].reverse())
        // },
        // goNext() {
        //     this.setNextRoute([...datasource.getConfig().circleNav])
        // }
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
    // isMobile() {
    //     const uKey = this.uKey // triggers update
    //     // console.log('SUB:CP isMobile this.$store.state.mediaTag = ', this.$store.state.mediaTag)
    //     return this.$store.state.isMobile
    // },
    // shiftLeft() {
    //     const state = this.$store.state
    //     return !state.isMobile && state.innerHeight < 740
    // },
    // routePathList() {
    //     const res = []
    //     _.each(this.$route.matched, obj => {
    //         if (obj.meta && _.isString(obj.meta.i18nKey)) {
    //             res.push(obj.meta.i18nKey)
    //         }
    //     })
    //     //
    //     setTimeout(() => {
    //         let txt
    //         //
    //         txt = $('.sub-nav .main').text()
    //         txt = txt.split('\n').join(' ')
    //         txt.trim()
    //         this.path.main = txt
    //         //
    //         txt = $('.sub-nav .sub').text()
    //         txt = txt.split('\n').join(' ')
    //         txt.trim()
    //         this.path.sub = txt
    //         //
    //         // TODO level3 / i18n check and do proper implementation
    //         // may needs update to the onRouteWillChange event
    //         txt = $('.sub-nav .level3').text()
    //         txt = txt.split('\n').join(' ')
    //         txt.trim()
    //         this.path.level3 = txt
    //     }, 150)
    //     //
    //     return res
    // }
}
</script>

<style scoped lang="scss">
// @import '@/css/basics.scss';
.sub-bar {
    .logo {
        position: absolute;
        width: 140px;
        height: 45px;
        right: -10px;
        bottom: 0px;
        background-color: #f9f9f1;
        border-radius: 10px 0 0 0;
        .image {
            position: absolute;
            $url: '../assets/mpdl-logo.png';
            background-image: url($url);
            background-repeat: no-repeat;
            background-size: contain;
            width: 120px;
            height: 60px;
            margin: 5px;
        }
    }
    .terms {
        position: absolute;
        bottom: -10px;
        height: 40px;
        color: white;
        a {
            color: white !important;
        }
    }
    // .path{
    //     margin-top: 10px;
    //     color: white;
    // }
    // border-radius: 8px;
    // height: 25px;
    // line-height: 17px;
    // font-size: 14px;
    // font-weight: bold;
    // width: unset;
    // // overwritten by color worlds in rdm.scss
    // color: #ffffff;
    // background-image: linear-gradient(to top, rgba(180, 248, 255, 0.45), rgba(189, 221, 230, 0.78));
    // //
    // .home {
    //     margin-top: 10px;
    //     margin-left: 12px;
    //     float: left;
    //     cursor: pointer;
    //     display: none;
    //     // @media (max-width: 769px) {
    //     &.media-width-768 {
    //         display: inline;
    //     }
    //     .burger-line {
    //         width: 25px;
    //         height: 3px;
    //         background-color: white;
    //         margin: 6px 0;
    //     }
    // }
    // .inner {
    //     overflow: hidden;
    //     position: absolute;
    //     margin: 4px;
    //     margin-left: 10px;
    //     &.shift-left {
    //         margin-left: 25px;
    //     }
    //     &.clickable {
    //         cursor: pointer;
    //     }
    //     .path {
    //         overflow: hidden;
    //         opacity: 0;
    //         white-space: nowrap;
    //         max-height: 15px;
    //         @include transition(opacity 0.2s);
    //         &.show {
    //             opacity: 1;
    //             @include transition(opacity 0.3s);
    //         }
    //         div {
    //             float: left;
    //             white-space: nowrap;
    //             &.sp {
    //                 margin-left: 4px;
    //                 margin-right: 4px;
    //             }
    //         }
    //     }
    // }
    // .nav {
    //     position: absolute;
    //     margin-top: 0px;
    //     right: 0px;
    //     .bt {
    //         float: left;
    //         margin-left: 5px;
    //         .circle {
    //             border-radius: 50%;
    //             background-color: #ffffffa7;
    //             width: 23px;
    //             height: 23px;
    //             cursor: pointer;
    //             &:hover {
    //                 background-color: #ffffffdb;
    //             }
    //             &:active {
    //                 background-color: #ffffff;
    //             }
    //         }
    //         .arrow {
    //             position: absolute;
    //             font-size: 40px;
    //             line-height: 20px;
    //             margin-left: 6px;
    //             transform: scaleY(0.75);
    //             top: 0px;
    //             color: #505050;
    //             cursor: pointer;
    //         }
    //     }
    //     // @media (max-width: 769px) {
    //     &.media-width-768 {
    //         margin-top: 12px;
    //         .bt {
    //             margin-left: 4px;
    //             .circle {
    //                 width: 30px;
    //                 height: 30px;
    //             }
    //             .arrow {
    //                 font-size: 45px;
    //                 line-height: 25px;
    //                 margin-left: 9px;
    //                 pointer-events: none;
    //             }
    //         }
    //     }
    // }
}
//
</style>
