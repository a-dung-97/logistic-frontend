<template>
    <v-content>
        <router-view transition="scale-transition" />

        <dashboard-core-footer />
    </v-content>
</template>

<script>
export default {
    name: "DashboardCoreView",

    components: {
        DashboardCoreFooter: () => import("./Footer")
    }
};
</script>
