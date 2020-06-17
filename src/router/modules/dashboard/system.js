const systemRouter = [
    {
        name: "Người dùng",
        path: "users",
        component: () => import("@/views/dashboard/user/index")
    },
    {
        name: "Menu",
        path: "menus",
        component: () => import("@/views/dashboard/menu/index")
    },
    {
        name: "Quyền",
        path: "roles",
        component: () => import("@/views/dashboard/role/index")
    },
    {
        name: "Nhóm chức năng",
        path: "action/action-groups",
        component: () => import("@/views/dashboard/action/action-group/index")
    },
    {
        name: "Danh sách chức năng",
        path: "action/list",
        component: () => import("@/views/dashboard/action/list/index")
    }
];

export default systemRouter;
