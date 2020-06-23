import categoryRouter from "./category";
import systemRouter from "./system";
import truckRouter from "./truck";
import workRouter from "./work";
import warehouseRouter from "./warehouse";
const dashboardRouter = [
    // Dashboard
    ...systemRouter,
    ...categoryRouter,
    ...truckRouter,
    ...workRouter,
    ...warehouseRouter,
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
