function BoxScrollHandler(config) {
    //
    const $scrollContainer = $(config.scrollContainer)
    const $scrollContent = $(`${config.scrollContainer} .content`)
    const $scrollThumb = $(`${config.scrollContainer} .scrollbar .thumb`)
    const $scrollBar = $(`${config.scrollContainer} .scrollbar`)
    //
    let yScrollValue = 0
    let yScrollPos = 0
    let scrollTopLimitCrossed = false
    let scrollDownLimitCrossed = false
    //
    const ACCELERATE_FC = 1.2
    const SCROLL_THUMB_MAX_HEIGHT_PIX = 70
    //
    let scrollThumbDeltaFc = 0

    const getScrollDimensions = () => {
        return {
            scrollTopEdge: 0,
            scrollDownEdge: $scrollContent[0].scrollHeight - $scrollContainer.height()
        }
    }
    const onMouseWheel = evt => {
        const dim = getScrollDimensions()
        if (yScrollPos < dim.scrollTopEdge && !scrollTopLimitCrossed) {
            const edgeDelta = Math.abs(evt.originalEvent.deltaY) * ACCELERATE_FC
            // top border
            scrollTopLimitCrossed = true
            yScrollPos = dim.scrollTopEdge
            yScrollValue = 0
            gsap.set($scrollContent, { top: dim.scrollTopEdge + edgeDelta })
            gsap.to($($scrollContent), 0.6, {
                top: 0,
                ease: Expo.easeOut
            })
        } else if (yScrollPos > dim.scrollDownEdge && !scrollDownLimitCrossed) {
            const edgeDelta = Math.abs(evt.originalEvent.deltaY) * ACCELERATE_FC
            // down border
            scrollDownLimitCrossed = true
            yScrollPos = dim.scrollDownEdge
            yScrollValue = 0
            gsap.set($scrollContent, { top: -dim.scrollDownEdge - edgeDelta })
            gsap.to($($scrollContent), 0.6, {
                top: -dim.scrollDownEdge,
                ease: Expo.easeOut
            })
        } else {
            if (scrollTopLimitCrossed) {
                if (evt.originalEvent.deltaY > 0) {
                    gsap.killTweensOf($scrollContent)
                    scrollTopLimitCrossed = false
                }
            } else if (scrollDownLimitCrossed) {
                if (evt.originalEvent.deltaY < 0) {
                    gsap.killTweensOf($scrollContent)
                    scrollDownLimitCrossed = false
                }
            } else {
                yScrollValue += evt.originalEvent.deltaY
                const delta = Math.round(yScrollValue / 2)
                yScrollPos += delta
                yScrollValue -= delta
                gsap.set($scrollContent, { top: -yScrollPos })
            }
        }
        updateThumbPosition()
    }

    const updateThumbPosition = () => {
        gsap.set($scrollThumb, { top: yScrollPos * scrollThumbDeltaFc })
    }

    const updateThumbDimensions = () => {
        let height = (100 * $scrollContainer.height()) / $scrollContent[0].scrollHeight
        if (height > SCROLL_THUMB_MAX_HEIGHT_PIX) {
            height = SCROLL_THUMB_MAX_HEIGHT_PIX
        }
        $scrollThumb.height(`${height}%`)
        const deltaRailPix = Math.floor($scrollBar.height() - $scrollThumb.height()) - 2
        const deltaContentPix = $scrollContent[0].scrollHeight - $scrollContainer.height()
        scrollThumbDeltaFc = deltaRailPix / deltaContentPix
        updateThumbPosition()
    }

    this.destroy = () => {
        // TODO reset to top position, make optional
        // gsap.set($scrollContent, { top: 0 })
        // gsap.set($scrollThumb, { top: 0 })
        //
        $scrollContainer.off('wheel', onMouseWheel)
        $(window).off('resize', updateThumbDimensions)
        config.scrollContainer = null
        config = null
    }

    const init = () => {
        updateThumbDimensions()
        $scrollContainer.on('wheel', onMouseWheel)
        $(window).on('resize', updateThumbDimensions)
        if (_.isFunction(config.animateIn)) {
            config.animateIn($scrollBar)
        }
    }

    init()

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
}

export default BoxScrollHandler
