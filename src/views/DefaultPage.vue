<template>
    <nav-bar></nav-bar>
    <sub-bar></sub-bar>
    <cage></cage>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Cage from '@/components/Cage.vue'
import SubBar from '@/components/SubBar.vue'


export default {
    components: {
        NavBar,  Cage, SubBar
    },
    props: {
        user: { type: String },
        config: {
            id: { type: String }
        }
    },
    setup(props) {
        // console.log('SETUP: props = ', props)
        // console.log('SETUP: props.user = ', props.user)
        // console.log('SETUP: props.config = ', props.config)
        return {} // anything returned here will be available for the rest of the component
    },
    mounted() {
        // TODO move this into the device control class
        // globals.eventBus.$emit("testEvent");
        window.globals.eventBus.$on('test-event', this.onTestEvent)
    },
    methods: {
        onTestEvent(evt) {
            console.log('onTestEvent: evt = ', evt)
        }
    }
}
</script>
