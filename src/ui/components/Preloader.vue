<template>
    <div v-if="config.active" class="preloader">
        <div class="loader animation"></div>
    </div>
</template>

<script>
//
export default {
    props: {
        config: {
            active: false
        }
    }
}
</script>
