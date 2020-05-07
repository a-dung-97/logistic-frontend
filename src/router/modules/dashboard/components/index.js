const componentsRouter = [
    {
        name: 'Buttons',
        path: 'components/buttons',
        component: () => import('@/views/dashboard/component/Buttons'),
    },
    {
        name: 'Grid System',
        path: 'components/grid-system',
        component: () => import('@/views/dashboard/component/Grid'),
    },
    {
        name: 'Tabs',
        path: 'components/tabs',
        component: () => import('@/views/dashboard/component/Tabs'),
    },
    {
        name: 'Notifications',
        path: 'components/notifications',
        component: () => import('@/views/dashboard/component/Notifications'),
    },
    {
        name: 'Icons',
        path: 'components/icons',
        component: () => import('@/views/dashboard/component/Icons'),
    },
    {
        name: 'Typography',
        path: 'components/typography',
        component: () => import('@/views/dashboard/component/Typography'),
    },
]
export default componentsRouter