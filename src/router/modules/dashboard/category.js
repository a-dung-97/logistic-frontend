const categoryRouter = [
    {
        name: "Hãng xe",
        path: "truck-manufacturers",
        component: () => import("@/views/dashboard/truck-manufacturer/index")
    },
    {
        name: "Loại xe",
        path: "truck-types",
        component: () => import("@/views/dashboard/truck-type/index")
    },
    {
        name: "Phế liệu",
        path: "scrap",
        component: () => import("@/views/dashboard/scrap/index")
    }
];

export default categoryRouter;
