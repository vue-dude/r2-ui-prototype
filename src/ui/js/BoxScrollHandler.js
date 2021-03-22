function BoxScrollHandler(config) {
    //
    // gsap/js based scroller dropped, needs better solution for momentum scroll and design.
    //
    const $scrollContainer = $(`${config.view} .scrollable`)
    const $scrollContent = $(`${config.view} .scrollable .content`)
    const $scrollThumb = $(`${config.view} .scrollbar .thumb`)
    const $scrollBar = $(`${config.view} .scrollbar`)
    //
    let yScrollValue = 0
    let yScrollPos = 0
    let scrollTopLimitCrossed = false
    let scrollDownLimitCrossed = false
    let dirty = false
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
        if (dirty) {
            dirty = false
            yScrollPos += $scrollContainer.scrollTop()
            $scrollContainer.scrollTop(0)
        }
        const dim = getScrollDimensions()
        if (dim.scrollDownEdge <= 0) {
            return gsap.set($($scrollContent), {
                top: 0
            })
        }
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

    const updateThumbPosition = outerOffset => {
        const top = _.isNumber(outerOffset) ? outerOffset + yScrollPos : yScrollPos
        const speed = _.isNumber(outerOffset) ? 0.1 : 0
        gsap.to($scrollThumb, speed, { top: top * scrollThumbDeltaFc })
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
        evt.stopPropagation()
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

    this.reset = () => {
        // this is optional, e.g. not triggered if want to keep position after scroller update
        gsap.set($scrollContent, { clearProps: 'all' })
        gsap.set($scrollThumb, { clearProps: 'all' })
    }

    this.destroy = () => {
        $scrollContainer.off('wheel', onMouseWheel)
        $scrollContainer.off('keyup', onKeyUp)
        destroyDraggable()
        $(window).off('resize', updateThumbDimensions)
        $scrollBar.off('click', onMouseClickBar)
        $scrollBar.off('wheel', onMouseWheel)
        config.scrollContainer = null
        config = null
    }

    this.getScrollProperties = () => {
        const props = {
            yScrollPosition: $scrollContent.position().top
        }
        return props
    }

    const destroyDraggable = () => {
        try {
            $scrollThumb.draggable('destroy')
        } catch (error) {
            //
        }
    }

    const onKeyUp = evt => {
        if (evt.which === 9) {
            dirty = true
            // TODO initiate better update here, e.g. frameloop
            setTimeout(() => {
                const top = $scrollContainer.scrollTop()
                updateThumbPosition(top)
            }, 50)
        }
    }

    const init = () => {
        // console.log('BSH:init config = ', config)
        config.props = config.props || {}
        const scrollY = config.props.yScrollPosition || null

        updateThumbDimensions()
        $scrollContainer.on('wheel', onMouseWheel)
        $scrollContainer.on('keyup', onKeyUp)
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
        $scrollBar.on('wheel', onMouseWheel)
        $scrollBar.on('click', onMouseClickBar)
        $(window).on('resize', updateThumbDimensions)
        setScrollPosition(scrollY)
        if (_.isFunction(config.animateIn)) {
            config.animateIn($scrollBar)
        }
    }

    const setScrollPosition = scrollY => {
        // TODO improve this for edge cases
        if (!scrollY) {
            scrollY = 0
        }else{
            const dim = getScrollDimensions()
            yScrollPos = -scrollY
            // console.log('BSH:setScrollPosition dim = ', dim)
            // console.log('BSH:setScrollPosition scrollY = ', scrollY)
            if (yScrollPos > dim.scrollDownEdge) {
                yScrollPos = dim.scrollDownEdge
            }
        }
        gsap.set($scrollContent, { top: -yScrollPos })
        gsap.set($scrollThumb, { top: yScrollPos * scrollThumbDeltaFc })
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
