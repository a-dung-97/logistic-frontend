<template>
    <v-footer fixed id="dashboard-core-footer" class="pt-2 pb-2">
        <v-container>
            <v-row align="center" no-gutters>
                <!-- <v-col
                    v-for="(link, i) in links"
                    :key="i"
                    class="text-center mb-sm-0 mb-5"
                    cols="auto"
                >
                    <a
                        :href="link.href"
                        class="mr-0 grey--text text--darken-3"
                        rel="noopener"
                        target="_blank"
                        v-text="link.text"
                    />
                </v-col> -->

                <v-col cols="12" md="auto">
                    <div
                        class="body-1 font-weight-light pt-6 pt-md-0 text-center"
                    >
                        Logistic Management System
                    </div>
                </v-col>
                <v-spacer class="hidden-sm-and-down" />
                <v-col cols="12" md="auto">
                    <div
                        class="body-1 font-weight-light pt-6 pt-md-0 text-center"
                    >
                        <span class="font-weight-bold"
                            >Copyright &copy; 2020 SKYMAP GLOBAL.</span
                        >
                        All rights reserved.
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script>
export default {
    name: "DashboardCoreFooter",

    data: () => ({
        links: [
            // {
            //     href: "#",
            //     text: "Creative Tim"
            // },
            // {
            //     href: "#",
            //     text: "About Us"
            // },
            // {
            //     href: "#",
            //     text: "Blog"
            // },
            // {
            //     href: "#",
            //     text: "Licenses"
            // }
        ]
    })
};
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
