<template>
    <v-footer id="pages-core-footer" absolute color="transparent" dark>
        <v-container>
            <v-row align="center" no-gutters>
                <v-col cols="12">
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
    name: "PagesCoreFooter",

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
#pages-core-footer
  a
    color: #FFFFFF
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
