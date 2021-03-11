<template>
    <div class="cage boxes" :class="[{ hidden: !showCage }, modalClass]">
        <box class="animate" :config="boxes['main-nav']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['head-controls']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['landing-page']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['search-page']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['search-page-facets-dn-inner']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['mywork-page']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['dataset-view-public']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['dataset-view-private-content']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['dataset-view-private-infos']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['dataset-controls']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['dataset-actions']" :isModalOverlay="isModalOverlay"></box>
        <box class="animate" :config="boxes['r2-messages']" :isModalOverlay="isModalOverlay"></box>
        <!--  -->
        <box class="animate" :config="boxes['file-list']" :isModalOverlay="isModalOverlay"></box>

        <box class="animate" :config="boxes['mock-config']" :isModalOverlay="isModalOverlay"></box>
    </div>
</template>

<script>
//
import Box from '@/ui/components/Box.vue'
import BoxDefinitions from '@/ui/js/R2UiBoxDefinitions.js'
import CageViewHandler from '@/ui/js/R2CageViewHandler.js'
import CageLogicHandler from '@/ui/js/R2CageLogicHandler.js'
//
export default {
    components: {
        Box
    },
    props: {
        isModalOverlay: {
            default: false
        }
    },
    data() {
        return {
            viewHandler: null,
            logicHandler: null,
            showCage: false,
            boxes: new BoxDefinitions().boxes,
            modalClass: this.isModalOverlay ? 'modal-overlay' : 'modal-below'
        }
    },
    created() {
        this.viewHandler = new CageViewHandler(this)
        this.logicHandler = new CageLogicHandler(this)
        this.logicHandler.initData()
    },
    mounted() {
        this.viewHandler.showModalOverlay(false)
        this.viewHandler.updateHeadNav(this.logicHandler.getIsPrivateView(), true)
        setTimeout(() => {
            if (!this.isModalOverlay) {
                this.showCage = true
            }
            this.logicHandler.init()
        }, 400)
    }
}
</script>

<style lang="scss" scoped>
.hidden {
    display: none;
}
</style>
