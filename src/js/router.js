import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import DefaultPage from '../views/DefaultPage.vue'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        beforeEnter: (to, from, next) => next('/ui')
    },
    {
        path: '/ui',
        name: 'ui',
        props: true,
        component: DefaultPage
    }
]

const router = createRouter({
    history: createWebHashHistory(), // createWebHistory createWebHashHistory
    routes
})

const getRouter = config => {
    // do the dynamic config by structure here
    return router
}

export default getRouter
