import categoryRouter from "./category";
import systemRouter from "./system";
import truckRouter from "./truck";
import workRouter from "./work";
import warehouseRouter from "./warehouse";
import reportRouter from "./report";
const dashboardRouter = [
    // Dashboard
    ...systemRouter,
    ...categoryRouter,
    ...truckRouter,
    ...workRouter,
    ...warehouseRouter,
    ...reportRouter,
    {
        name: "Khách hàng",
        path: "customers",
        component: () => import("@/views/dashboard/customer/index")
    },
    {
        name: "Lái xe",
        path: "drivers",
        component: () => import("@/views/dashboard/driver/index")
    }
    // Components
    // Forms

    //Root Level
];

export default dashboardRouter;
