const workRouter = [
    {
        name: "Danh sách công việc",
        path: "works",
        component: () => import("@/views/dashboard/work/index")
    }
];

export default workRouter;
