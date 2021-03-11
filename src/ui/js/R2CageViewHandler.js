function R2CageViewHandler(vm) {
    //
    // Handles the animation and visible states of all cage boxes and views
    //
    const showModalOverlay = (yes) => {
        yes = yes === true
        if (vm.isModalOverlay) {
            const tg = `.centered-view .modal-bg`
            yes ? $(tg).css('visibility', 'visible') : $(tg).css('visibility', 'hidden')
            vm.showCage = yes
        }
    }
    this.showModalOverlay = showModalOverlay

    this.animateOut = (goOuts, goIns, options, delay = 0) => {
        const speed = 0.3
        const animationTargets = `.${vm.modalClass}.cage.boxes .animate`
        _.each(goOuts, key => {
            if (key) {
                gsap.to($(`${animationTargets}.${key}`), speed, {
                    opacity: 0,
                    ease: Expo.easeOut,
                    display: 'none'
                })
                vm.boxes[key].visible = false
            }
        })
        gsap.delayedCall(delay, animateIn, [goOuts, goIns, options, animationTargets])
    }

    const animateIn = (goOuts, goIns, options, animationTargets) => {
        let hasModal = false
        _.each(goIns, (args, boxId) => {
            // handle the box
            gsap.killTweensOf($(`${animationTargets}.${boxId}`))
            let prms = { ...args }
            if (options[boxId]) {
                prms = { ...args, ...options[boxId] }
            }
            prms.view = prms.view || boxId

            vm.boxes[boxId].visible = true
            const sp = _.isNumber(prms.speed) ? prms.speed : speed

            let opc = _.isNumber(prms.opacity) ? prms.opacity : 1
            const $targetBox = $(`${animationTargets}.${boxId}`)
            gsap.to($targetBox, sp, {
                opacity: opc,
                delay: _.isNumber(prms.delay) ? prms.delay : 0,
                ease: Expo.easeOut,
                display: 'block'
            })

            // handle the different views inside the box
            const view = vm.boxes[boxId].views[prms.view]
            _.each(vm.boxes[boxId].views, vu => {
                if (view !== vu) {
                    gsap.killTweensOf($(`${animationTargets}.${boxId} .${vu.id}`))
                    gsap.set($(`${animationTargets}.${boxId} .${vu.id}`), {
                        clearProps: 'all'
                    })
                    vu.visible = false
                }
            })

            // handle the 'split' of boxes above and below the modal layer
            let vOpacity = _.isNumber(view.opacity) ? view.opacity : _.isNumber(prms.opacity) ? prms.opacity : 1
            if (view.modal) {
                hasModal = true
            } else if (vm.isModalOverlay) {
                vOpacity = 0
            }
            const $targetView = $(`${animationTargets}.${boxId} .${view.id}`)
            //
            let visibility = 'visible'
            switch (true) {
                case view.modal && !vm.isModalOverlay:
                case !view.modal && vm.isModalOverlay:
                    visibility = 'hidden'
            }
            gsap.set($targetView, {
                visibility
            })
            //
            if (vOpacity === 0) {
                // avoid invisible views could be clicked anyway
                gsap.set($targetView, {
                    visibility: 'hidden'
                })
            } else if (!view.visible) {
                view.visible = true
                const vDelay = _.isNumber(view.delay) ? view.delay : _.isNumber(prms.delay) ? prms.delay : 0.1
                const vSpeed = _.isNumber(view.speed) ? view.speed : _.isNumber(prms.speed) ? prms.speed : 0.3
                gsap.to($targetView, vDelay, {
                    opacity: vOpacity,
                    delay: vDelay,
                    ease: Expo.easeOut
                })
            }
        })
        // TODO refacor this not to be set in animations handler
        showModalOverlay(hasModal)
        setTimeout(() => {
            globals.eventBus.$emit('updateActiveView')
        }, 10)
    }

    this.updateHeadNav = (privateView, animateAll, info = { length: 0, html: '' }) => {
        const navBox = vm.boxes['main-nav']
        //
        const mock = '.mock-config .view.default'
        $(mock).css('opacity', 1) // fix this issue globally!
        $(mock).removeClass('no-events')
        //
        const view = '.main-nav .view.default'
        $(view).css('opacity', 1) // fix this issue globally!
        $(view).removeClass('no-events')
        const $public = $(`${view} .element.nav-item.public`)
        const $private = $(`${view} .element.nav-item.private`)
        const $back = $(`${view} .element.nav-item.head-nav-back`)
        const $info = $(`${view} .element.info`)
        const $arrow = $(`${view} .element.arrow`)
        const $sp1_a = $(`${view} .element.sp-1-a`)
        const $sp1_b = $(`${view} .element.sp-1-b`)
        const $sp2_a = $(`${view} .element.sp-2-a`)
        const $sp2_b = $(`${view} .element.sp-2-b`)
        const $sp3_a = $(`${view} .element.sp-3-a`)
        const $sp3_b = $(`${view} .element.sp-3-b`)
        const $sp4_a = $(`${view} .element.sp-4-a`)
        const $sp4_b = $(`${view} .element.sp-4-b`)
        //
        const $tg1 = privateView ? $public : $private
        const $tg2 = privateView ? $private : $public

        const updatePositions = hasInfo => {
            const stopL1 = $public.position().left + $public.width() + 10
            const stopR1 = $private.position().left + $private.width() + 15
            const reset = [
                [$sp1_a, null, true, 0, { opacity: 1 }],
                [$sp1_b, null, true, 0, { opacity: 1 }],
                [$info, null, true, 0, { clearProps: 'all' }],
                [$public, null, true, 0, { clearProps: 'all' }],
                [$public, null, true, 0, { opacity: 1 }],
                [$private, null, true, 0, { clearProps: 'all' }],
                [$private, null, true, 0, { opacity: 1 }],
                [$back, null, true, 0, { clearProps: 'all' }],
                [$arrow, null, true, 0, { clearProps: 'all' }],
                [$sp4_a, null, true, 0, { visibility: 'hidden' }],
                [$sp4_b, null, true, 0, { visibility: 'hidden' }]
            ]
            const queue1 = [
                ...reset,
                [$sp2_a, stopL1, true, 0, { opacity: 1 }],
                [$sp2_b, 1, false, 0, { opacity: 1 }],
                [$sp3_a, stopR1, true, 0, { opacity: 1 }],
                [$sp3_b, 1, false, 0, { opacity: 1 }]
            ]
            const queue2 = [
                ...reset,
                // set start values
                [$arrow, stopL1 - 5, true, 0, {}],
                [$info, 18 - 10, false, 0, { visibility: 'visible' }],
                [$sp2_a, $info.width() + 22, false, 0, {}],
                [$sp2_b, 1, false, 0, {}],
                [$back, 5, false, 0, { visibility: 'visible' }],
                [$sp3_a, $back.width() + 15, false, 0, {}],
                [$sp3_b, 1, false, 0, {}],
                //
                [$arrow, stopL1, true, 0.2, { delay: 0.1, opacity: 1 }],
                [$info, 18, false, 0.2, { delay: 0.1, opacity: 1 }],
                [$sp2_a, $info.width() + 10, false, 0.2, { delay: 0.2, opacity: 1 }],
                [$sp2_b, 1, false, 0.2, { delay: 0.2, opacity: 1 }],
                [$back, 10, false, 0.15, { delay: 0.25, opacity: 1 }],
                [$sp3_a, $back.width() + 10, false, 0.4, { delay: 0.35, opacity: 1 }],
                [$sp3_b, 1, false, 0.3, { delay: 0.4, opacity: 1 }],
                [$private, 10, false, 0.3, { ease: Expo.easeOut }],
                [$sp4_a, $private.width() + 15, false, 0, { visibility: 'visible', opacity: 0 }],
                [$sp4_b, 1, false, 0, { visibility: 'visible', opacity: 0 }]
            ]

            const queue3 = [
                ...reset,
                [$arrow, stopR1 - 5, true, 0, {}],
                [$info, 18 - 10, false, 0, { visibility: 'visible' }],
                [$sp2_a, $info.width() + 22, false, 0, {}],
                [$sp2_b, 1, false, 0, {}],
                [$back, 5, false, 0, { visibility: 'visible' }],
                [$sp3_a, $back.width() + 15, false, 0, {}],
                [$sp3_b, 1, false, 0, {}],
                //
                [$arrow, stopR1, true, 0.2, { delay: 0.1, opacity: 1 }],
                [$info, 18, false, 0.2, { delay: 0.1, opacity: 1 }],
                [$sp2_a, $info.width() + 10, false, 0.2, { delay: 0.2, opacity: 1 }],
                [$sp2_b, 1, false, 0.2, { delay: 0.2, opacity: 1 }],
                [$back, 10, false, 0.15, { delay: 0.25, opacity: 1 }],
                [$sp3_a, $back.width() + 10, false, 0.4, { delay: 0.35, opacity: 1 }],
                [$sp3_b, 1, false, 0.3, { delay: 0.4, opacity: 1 }]
            ]
            let queue = queue1
            if (hasInfo) {
                queue = privateView ? queue3 : queue2
            }
            let left = 0
            _.each(queue, elm => {
                left = elm[2] ? elm[1] : left + elm[1]
                const args = { left, ...elm[4] }
                if (elm[3]) {
                    gsap.to(elm[0], elm[3], args)
                } else {
                    gsap.set(elm[0], args)
                }
            })
        }

        $tg1.removeClass('selected')
        $tg2.addClass('selected')

        const htmlPath = 'views.default.elements.info.html'
        const infoNow = _.get(navBox, htmlPath)
        const hasInfo = info.html.length > 0
        _.set(navBox, htmlPath, info.html)

        let delay = 0
        let update = true

        switch (true) {
            case hasInfo && infoNow === info.html:
                update = false
                break
            case hasInfo && infoNow !== info.html:
                delay = 0.3
        }

        if (update) {
            vm.$nextTick(() => updatePositions(hasInfo))
        }

        return delay
    }
}

export default R2CageViewHandler
