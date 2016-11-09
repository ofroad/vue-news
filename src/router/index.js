import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
            name: 'index',
            path: '/',
            component: (resolve) => {
                require(['../views/zhihu/list.vue'], resolve)
            },
            meta: { scrollToTop: true }
        },
        {
            name: 'themes',
            path: '/themes',
            component: (resolve) => {
                require(['../views/zhihu/themes.vue'], resolve)
            }
        },
        {
            name: 'theme-list',
            path: '/themes/:id',
            component: (resolve) => {
                require(['../views/zhihu/themeList.vue'], resolve)
            }
        },
        {
            name: 'news',
            path: '/news/:id',
            component: (resolve) => {
                require(['../views/zhihu/news.vue'], resolve)
            }
        },
        {
            name: 'about',
            path: '/about/',
            component: (resolve) => {
                require(['../views/zhihu/about.vue'], resolve)
            }
        }
    ]
})

export default router