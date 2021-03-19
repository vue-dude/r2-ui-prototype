// import { handleSearch } from '@/ui/js/R2BoxLogicHandler'

// const source = 'search-page-facets-dn-inner'

const config = {
    belowModalExclusive: true,
    views: {
        'search-page-facets-dn-inner': {
            elements: {
                'search-page-facets-dn-inner-box': {}
            },
            scroll: {
                elements: {
                    'search-page-facets-dn-inner-list-1': {},
                    'search-page-facets-dn-inner-list-2': {}
                }
            },
            overlay: {
                components: {
                    'preloader-facets-dn-list': {
                        component: 'preloader',
                        config: {}
                    }
                }
            }
        }
    }
}
export default config
