<script>
//
import MetaForm from '@/ui/components/MetaFormComponent.vue'
import GenericForm from '@/ui/components/GenericFormComponent.vue'
import ActiveList from '@/ui/components/ActiveListComponent.vue'
import ContentList from '@/ui/components/ContentList.vue'
import ContentCell from '@/ui/components/ContentCell.vue'
import DatasetListItem from '@/ui/components/DatasetListItem.vue'
import Preloader from '@/ui/components/Preloader.vue'

// TODO find something to mmake this automatic
const cp = {
    'meta-form': MetaForm,
    'generic-form': GenericForm,
    'active-list': ActiveList,
    'content-list': ContentList,
    'content-cell': ContentCell,
    'dataset-list-item': DatasetListItem,
    'preloader': Preloader
}

import { h } from 'vue'
//
export default {
    components: {
        MetaForm,
        GenericForm,
        ActiveList,
        ContentList,
        ContentCell,
        DatasetListItem,
        Preloader
    },
    props: {
        cmp: {},
        classes: '',
        data: null
    },
    methods: {
        onSubClick(props) {
            this.$emit('subClick', props)
        }
    },
    render() {
        const component = cp[this.cmp.component]
        if (component) {
            return h(component, {
                config: this.cmp.config,
                data: this.data,
                class: this.classes || '',
                onSubClick: this.onSubClick
            })
        } else if (this.cmp.type === 'ui') {
            return h('div', this.$t(this.cmp.text))
        }
        return null
    }
}
</script>

<templateDEACT>
    <!-- This now is replaced by the render function above -->
    <preloader v-if="cmp.component === 'preloader'" :config="cmp.config" @subClick="onSubClick"></preloader>
    <meta-form v-if="cmp.component === 'meta-form'" :config="cmp.config" @subClick="onSubClick"></meta-form>
    <active-list v-if="cmp.component === 'active-list'" :config="cmp.config" @subClick="onSubClick"></active-list>
    <content-list v-if="cmp.component === 'content-list'" :config="cmp.config" @subClick="onSubClick"></content-list>
    <content-cell v-if="cmp.component === 'content-cell'" :config="cmp.config" @subClick="onSubClick"></content-cell>
    <generic-form
        v-if="cmp.component === 'generic-form'"
        :class="classes"
        :config="cmp.config"
        :data="data"
        @subClick="onSubClick"
    ></generic-form>
    <dataset-list-item
        v-if="cmp.component === 'dataset-list-item'"
        :class="classes"
        :config="cmp.config"
        :data="data"
        @subClick="onSubClick"
    ></dataset-list-item>
    <div v-if="cmp.type === 'ui'" class="ui-element" :class="[key, cmp.classes]" v-html="$t(cmp.text)"></div>
</templateDEACT>
