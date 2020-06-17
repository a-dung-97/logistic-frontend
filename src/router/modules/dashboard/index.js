import categoryRouter from "./category";
import systemRouter from "./system";
import truckRouter from "./truck";
const dashboardRouter = [
    // Dashboard
    ...systemRouter,
    ...categoryRouter,
    ...truckRouter,
    {
        name: "Khách hàng",
        path: "customers",
        component: () => import("@/views/dashboard/customer/index")
    }
    // Components
    // Forms

    //Root Level
];

export default dashboardRouter;
