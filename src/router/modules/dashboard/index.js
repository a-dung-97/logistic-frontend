import componentsRouter from './components/index';
import formRouter from './forms/index';
const dashboardRouter = {
    path: '/',
    component: () => import('@/layouts/dashboard/Index'),
    children: [
        // Dashboard
        {
            name: 'Dashboard',
            path: '',
            component: () => import('@/views/dashboard/Dashboard'),
        },
        // Components
        ...componentsRouter,
        // Forms
        ...formRouter,
        //Root Level
        {
            name: 'Widgets',
            path: 'widgets',
            component: () => import('@/views/dashboard/Widgets'),
        },
        {
            name: 'Charts',
            path: 'charts',
            component: () => import('@/views/dashboard/Charts'),
        },
        {
            name: 'Calendar',
            path: 'calendar',
            component: () => import('@/views/dashboard/Calendar'),
        },
    ],
}
export default dashboardRouter