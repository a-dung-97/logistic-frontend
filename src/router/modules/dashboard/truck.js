const truckRouter = [
    {
        name: "Danh sách xe",
        path: "trucks",
        component: () => import("@/views/dashboard/truck/index")
    },
    {
        name: "Báo cáo hỏng xe",
        path: "broken-truck-reports",
        component: () => import("@/views/dashboard/broken-truck-report/index")
    }
];

export default truckRouter;
