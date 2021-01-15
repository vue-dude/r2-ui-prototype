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
        if (height > 80) {
            height = 80
        }
        $scrollThumb.height(`${height}%`)

        if ($scrollBar.height() < 200) {
            $scrollThumb.height(`${Math.floor($scrollBar.height() * 0.5)}px`)
        }
        if ($scrollBar.height() < 100) {
            $scrollThumb.height(`${Math.floor($scrollBar.height() * 0.8)}px`)
        }
        const deltaRailPix = Math.floor($scrollBar.height() - $scrollThumb.height()) - 2
        const deltaContentPix = $scrollContent[0].scrollHeight - $scrollContainer.height()
        scrollThumbDeltaFc = deltaRailPix / deltaContentPix

        updateThumbPosition()

        $scrollContainer.off('wheel', onMouseWheel)
        $scrollThumb.hide()
        if ($scrollContent[0].scrollHeight > $scrollContainer.height()) {
            $scrollThumb.show()
            $scrollContainer.on('wheel', onMouseWheel)
        }
    }

    const updateContentScrollPosition = top => {
        const delta1 = $scrollBar.height() - $scrollThumb.height()
        const delta2 = _.isNumber(top) ? top : $scrollThumb.position().top
        const fc = delta2 / delta1
        const deltaContentPix = $scrollContent[0].scrollHeight - $scrollContainer.height()
        yScrollPos = deltaContentPix * fc
        gsap.killTweensOf($scrollContent)
        gsap.to($scrollContent, 0.1, { top: -yScrollPos })
    }

    let lastClickTs = 0

    const onMouseClickBar = evt => {
        const fc = 1000000000000
        const clickEnabled = fc * evt.timeStamp - lastClickTs === 0 ? false : true
        lastClickTs = fc * evt.timeStamp
        if (clickEnabled) {
            const yPos = evt.originalEvent.offsetY
            const edgeUp = $scrollThumb.position().top
            const edgeDn = edgeUp + $scrollThumb.height()
            let top

            if (yPos > edgeDn) {
                top = yPos - $scrollThumb.height() + 20
            } else {
                top = yPos - 20
            }

            if (top < 0) {
                top = 0
            } else if (top > $scrollBar.height() - $scrollThumb.height()) {
                top = $scrollBar.height() - $scrollThumb.height()
            }

            gsap.killTweensOf($scrollThumb)
            gsap.to($scrollThumb, 0.15, { top })
            updateContentScrollPosition(top)
        }
    }

    this.destroy = () => {
        // TODO reset to top position, make optional
        // gsap.set($scrollContent, { top: 0 })
        // gsap.set($scrollThumb, { top: 0 })
        //
        $scrollContainer.off('wheel', onMouseWheel)
        destroyDraggable()
        $(window).off('resize', updateThumbDimensions)
        $scrollBar.off('click', onMouseClickBar)
        config.scrollContainer = null
        config = null
    }

    const destroyDraggable = () => {
        try {
            $scrollThumb.draggable('destroy')
        } catch (error) {
            //
        }
    }

    const init = () => {
        updateThumbDimensions()
        $scrollContainer.on('wheel', onMouseWheel)
        $scrollThumb.click(function(event) {
            event.stopPropagation()
        })
        $scrollThumb.dblclick(function(event) {
            event.stopPropagation()
        })
        $scrollThumb.draggable({
            containment: $scrollBar,
            scroll: false,
            axis: 'y',
            drag: updateContentScrollPosition
        })
        $scrollBar.on('click', onMouseClickBar)
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
