<template>
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
        <v-btn
            class="mr-3"
            elevation="1"
            fab
            small
            @click="
                $vuetify.breakpoint.smAndDown
                    ? setDrawer(!drawer)
                    : $emit('input', !value)
            "
        >
            <v-icon v-if="value">
                mdi-view-quilt
            </v-icon>

            <v-icon v-else>
                mdi-dots-vertical
            </v-icon>
        </v-btn>

        <v-toolbar-title
            class="hidden-sm-and-down font-weight-light"
            v-text="$route.name"
        />

        <v-spacer />

        <v-text-field
            :label="$t('search')"
            color="secondary"
            hide-details
            style="max-width: 165px;"
        >
            <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
                <v-btn class="mt-n2" elevation="1" fab small>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
        </v-text-field>

        <div class="mx-3" />

        <v-btn class="ml-2" min-width="0" text to="/">
            <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>

        <v-menu
            bottom
            left
            offset-y
            origin="top right"
            transition="scale-transition"
        >
            <template v-slot:activator="{ attrs, on }">
                <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
                    <v-badge color="red" overlap bordered>
                        <template v-slot:badge>
                            <span>5</span>
                        </template>

                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
            </template>

            <v-list :tile="false" nav>
                <div>
                    <app-bar-item
                        v-for="(n, i) in notifications"
                        :key="`item-${i}`"
                    >
                        <v-list-item-title v-text="n" />
                    </app-bar-item>
                </div>
            </v-list>
        </v-menu>

        <v-menu
            bottom
            left
            min-width="200"
            offset-y
            origin="top right"
            transition="scale-transition"
        >
            <template v-slot:activator="{ attrs, on }">
                <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>

            <v-list :tile="false" flat nav>
                <template v-for="(p, i) in profile">
                    <v-divider
                        v-if="p.divider"
                        :key="`divider-${i}`"
                        class="mb-2 mt-2"
                    />

                    <app-bar-item :to="p.to" v-else :key="`item-${i}`">
                        <v-list-item-title v-text="p.title" />
                    </app-bar-item>
                </template>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
// Components

import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "DashboardCoreAppBar",

    components: {
        AppBarItem: {
            render(h) {
                return h(VHover, {
                    scopedSlots: {
                        default: ({ hover }) => {
                            return h(
                                VListItem,
                                {
                                    attrs: this.$attrs,
                                    class: {
                                        "black--text": !hover,
                                        "white--text secondary elevation-12": hover
                                    },
                                    props: {
                                        activeClass: "",
                                        dark: hover,
                                        link: true,
                                        ...this.$attrs
                                    }
                                },
                                this.$slots.default
                            );
                        }
                    }
                });
            }
        }
    },

    props: {
        value: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        notifications: [
            "Mike John Responded to your email",
            "You have 5 new tasks",
            "You're now friends with Andrew",
            "Another Notification",
            "Another one"
        ],
        profile: [
            { title: "Hồ sơ cá nhân", to: "/profile" },
            { divider: true },
            { title: "Đăng xuất", to: "/logout" }
        ]
    }),

    computed: {
        ...mapGetters(["drawer"])
    },

    methods: {
        ...mapMutations({
            setDrawer: "app/SET_DRAWER"
        })
    },
    mounted() {
        // this.$refs["abc-2"][0].addEventListener("click", function() {
        //     console.log("ok");
        // });
    }
};
</script>
