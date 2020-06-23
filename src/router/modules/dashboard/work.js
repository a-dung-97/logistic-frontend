const workRouter = [
    {
        name: "Danh sách công việc",
        path: "works",
        component: () => import("@/views/dashboard/work/index")
    },
    {
        name: "Danh sách biên bản giao nhận",
        path: "issues",
        component: () => import("@/views/dashboard/issue/index")
    },
    {
        name: "Danh sách lộ trình",
        path: "route-lists",
        component: () => import("@/views/dashboard/route-list/index")
    }
];

export default workRouter;
