const pagesRouter = {
    path: "/pages",
    component: () => import("@/layouts/pages/Index"),
    children: [
        {
            name: "Lock",
            path: "lock",
            component: () => import("@/views/pages/Lock")
        },
        {
            name: "Login",
            path: "login",
            component: () => import("@/views/pages/Login")
        },
        {
            name: "Pricing",
            path: "pricing",
            component: () => import("@/views/pages/Pricing")
        },
        {
            name: "Register",
            path: "register",
            component: () => import("@/views/pages/Register")
        },

        {
            name: "404 Error",
            path: "/404",
            component: () => import("@/views/pages/Error")
        }
    ]
};
export default pagesRouter;
