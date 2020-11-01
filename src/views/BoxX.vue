<template>
    <div class="box" :class="[config.id]"></div>
</template>

<script>
//
// import Box from '@/components/Box.vue'
//
export default {
    components: {
        // Box
    },
    props: {
        config: {}
    }
}
</script>

