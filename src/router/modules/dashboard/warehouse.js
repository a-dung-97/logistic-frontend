const warehouseRouter = [
    {
        name: "Danh sách kho",
        path: "warehouses",
        component: () => import("@/views/dashboard/warehouse/index")
    },
    {
        name: "Danh sách hàng lưu kho",
        path: "receipts",
        component: () => import("@/views/dashboard/broken-truck-report/index")
    }
];

export default warehouseRouter;
