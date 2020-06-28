const reportRouter = [
    {
        name: "Báo cáo xe",
        path: "report/driver",
        component: () => import("@/views/dashboard/driver-report/index")
    },
    {
        name: "Báo cáo khách hàng",
        path: "report/customer",
        component: () => import("@/views/dashboard/customer-report/index")
    }
];

export default reportRouter;
