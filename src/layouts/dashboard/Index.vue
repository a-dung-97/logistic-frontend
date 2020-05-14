<template>
    <v-app>
        <dashboard-core-app-bar v-model="expandOnHover" />

        <dashboard-core-drawer :expand-on-hover.sync="expandOnHover" />

        <dashboard-core-view />

        <dashboard-core-settings v-model="expandOnHover" />
        <Snackbar />
        <Loader />
    </v-app>
</template>

<script>
export default {
    name: "DashboardIndex",
    components: {
        DashboardCoreAppBar: () => import("./components/AppBar"),
        DashboardCoreDrawer: () => import("./components/Drawer"),
        DashboardCoreSettings: () => import("./components/Settings"),
        DashboardCoreView: () => import("./components/View"),
        Snackbar: () => import("../../components/SnackBar"),
        Loader: () => import("../../components/Loader")
    },

    data: () => ({
        expandOnHover: false,
        color: "error",
        snackbar: true
    })
};
</script>
