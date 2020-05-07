import Vue from 'vue'
import Router from 'vue-router'
import pagesRouter from './modules/pages/index';
import dashboardRouter from './modules/dashboard/index';
Vue.use(Router)
export const routes = [
    pagesRouter,
    dashboardRouter,
    {
        path: '*',
        component: () => import('@/layouts/pages/Index'),
        children: [
            {
                name: '404 Error',
                path: '',
                component: () => import('@/views/pages/Error'),
            },
        ],
    },
]
const createRouter = () =>
    new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
const router = createRouter();
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;