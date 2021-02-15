<template>
    <div class="content-cell" :class="uid" :key="uKey">
        <div class="cell-element" :class="[key]" v-for="(cmp, key) in components" :key="key">
            <r2-components
                :cmp="cmp"
                :classes="[key, cmp.classes]"
                :data="data"
                @subClick="onSubClick"
            ></r2-components>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        config: {},
        data: {}
    },
    computed: {
        components() {
            return this.config && this.config.components ? this.config.components : {}
        }
    },
    methods: {
        onSubClick(props) {
            this.$emit('subClick', props)
        }
    }
}
</script>
