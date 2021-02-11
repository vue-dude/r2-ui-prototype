import Globals from '@/ui/js/Globals'
import Datasource from '@/ui/js/Datasource'
window.globals = new Globals()
window.datasource = new Datasource()
window.globals.init()

import { createApp } from 'vue'
import App from './App.vue'
import getRouter from './ui/js/router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { createI18n } from 'vue-i18n' // is vue-i18n@next

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
// TODO explore scss vars override
// import 'element-plus/packages/theme-chalk/src/index.scss'

const createVueApp = async () => {
    gsap.config({ nullTargetWarn: false })
    await datasource.getInitialData().then(data => {
        //
        console.log('MAIN:createVueApp data.translations = ',data.translations)
        const i18n = createI18n({
            fallbackLocale: data.setup.fallbackLocale || 'en',
            locale: 'en', // set locale
            messages: data.translations, // set locale messages
            silentTranslationWarn: true,
            fallbackWarn: false,
            missingWarn: false
        })
        globals.registerI18n(i18n)
        //
        const router = getRouter()
        globals.registerRouter(router)
        //
        setTimeout(() => {
            const app = createApp(App)
                .use(VueAxios, axios)
                .use(i18n)
                .use(router)
                .use(ElementPlus)
            // app.config.errorHandler = () => null
            app.config.warnHandler = () => null
            app.mount('#app')
        }, 500)
        //
    })
}
createVueApp()
