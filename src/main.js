import Globals from '@/js/Globals'
import Datasource from '@/js/Datasource'
window.globals = new Globals()
window.datasource = new Datasource()
window.globals.init()

import { createApp } from 'vue'
import App from './App.vue'
import store from './js/store'
import getRouter from './js/router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { createI18n } from 'vue-i18n' // is vue-i18n@next

import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/index.scss'

const createVueApp = async () => {
    await datasource.getInitialData().then(data => {
        console.log('MAIN: data = ', data)
        //
        const i18n = createI18n({
            fallbackLocale: data.setup.fallbackLocale || 'en',
            locale: 'en', // set locale
            messages: data.translations, // set locale messages
            silentTranslationWarn: true
        })
        globals.registerI18n(i18n)
        //
        const router = getRouter()
        console.log('MAIN: router = ', router)
        globals.registerRouter(router)

        setTimeout(() => {
            const app = createApp(App)
                .use(VueAxios, axios)
                .use(i18n)
                .use(store)
                .use(router)
                .use(ElementPlus)
            app.mount('#app')
            //
            globals.registerStore(app.$store)
        }, 500)
        //
    })
}
createVueApp()
