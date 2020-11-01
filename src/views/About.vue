<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>
<script>
export default {
    //   components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
    // props: {
    //     user: { type: String }
    // },
    props: {
        user: String //,
        // config: {
        //     type: Object,
        //     default() {
        //         return {
        //             id: 'xyz'
        //         }
        //     }
        // }
    },
    // setup(props) {
    //     console.log('SETUP:ABOUT props = ', props)
    //     console.log('SETUP:ABOUT props.user = ', props.user)
    //     console.log('SETUP:ABOUT props.config = ', props.config)
    //     // console.log('SETUP:ABOUT props.config.id = ', props.config.id)
    //     return {} // anything returned here will be available for the rest of the component
    // },
    mounted() {
        console.log('CREATED:ABOUT this.user = ', this.user)
        console.log('CREATED:ABOUT this.config = ', this.config)
    }
    // the "rest" of the component
}
</script>
