const formRouter = [
    {
        name: 'Regular Forms',
        path: 'forms/regular',
        component: () => import('@/views/dashboard/forms/RegularForms'),
    },
    {
        name: 'Extended Forms',
        path: 'forms/extended',
        component: () => import('@/views/dashboard/forms/ExtendedForms'),
    },
    {
        name: 'Validation Forms',
        path: 'forms/validation',
        component: () => import('@/views/dashboard/forms/ValidationForms'),
    },
    {
        name: 'Wizard',
        path: 'forms/wizard',
        component: () => import('@/views/dashboard/forms/Wizard'),
    },
]
export default formRouter