<template>
    <div class="box cage"></div>
    <!-- <box :config="box.recent"></box> -->
    <box :config="box.globe"></box>
</template>

<script>
//
import Box from '@/components/Box.vue'
// import SubBar from '@/components/SubBar.vue'
//
export default {
    components: {
        Box
        // SubBar
    },
    data() {
        return {
            box: {
                recent: {
                    id: 'recent'
                },
                globe: {
                    id: 'globe'
                }
            }
        }
    },
    mounted() {
        // $('.nav.quick-actions')
    }
}
</script>
