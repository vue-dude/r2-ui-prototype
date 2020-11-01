import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import DefaultPage from '../views/DefaultPage.vue'
import About from '../views/About.vue'
// import View1 from '../views/View1.vue'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        beforeEnter: (to, from, next) => next('/home')
    },
    {
        path: '/home',
        name: 'home',
        props: true,
        component: DefaultPage
    },
    {
        path: '/about',
        name: 'about',
        props: true,
        // props: {
        //     user: 'lacca!'
        // },
        component: About
        // or lazy load via code splitting
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/booo',
        name: 'booo',
        props: true,
        redirect: 'home'
    },
    {
        path: '/template-1',
        name: 'template-1',
        component: () => import('../views/Template-1.vue')
    }
    // {
    //     path: '/view-1',
    //     name: 'view-1',
    //     component: View1
    // }
]

const createRoutes = value => {
    console.log('obj:arrow value = ', value)
}

const router = createRouter({
    history: createWebHashHistory(), // createWebHistory createWebHashHistory
    routes
})

const getRouter = config => {
    return router
}

export default getRouter

/** 
import VueRouter from 'vue-router'
import DefaultPage from '../views/DefaultPage.vue'


const root = {
    mode: 'hash', // hash history
    scrollBehavior: () => ({ y: 0 }),
    routes: null
}

const createDynamicConfig = config => {
    root.routes = config.root
    const rt = _.find(root.routes, { children: 'structure' })
    rt.component = DefaultPage
    rt.children = config.routes
    root.routes.push(
        {
            path: '/admin',
            beforeEnter: (to, from, next) => {
                globals.touchedAdmin()
                // setTimeout(() => next('/'), 100)
                setTimeout(() => next(from), 100)
            }
        },
        {
            path: '/auth-confirm/:token',
            beforeEnter: (to, from, next) => {
                const token = to.path.split('/').pop()
                datasource.authenticationConfirm(token)
                setTimeout(() => next('/'), 100)
            }
        },
        {
            path: '/area51',
            beforeEnter: (to, from, next) => {
                globals.showDeviceInfoDelayed()
                setTimeout(() => next(from), 100)
            }
        }
    )
    console.log('RT:createDynamicConfig routes root = ', root)
    return root
}
// mode: ‘history’
const getRouter = config => {
    // Vue.use(VueRouter)
    const router = new VueRouter(createDynamicConfig(config))
    globals.registerRouter(router)
    return router
}
export default getRouter

**/
