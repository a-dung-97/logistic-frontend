<template>
    <v-content>
        <v-card class="my-container">
            <router-view />
        </v-card>

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
