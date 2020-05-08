<template>
    <router-view />
    <!-- <v-snackbar v-model="snackbar" color="error" :top="true">
            {{ snackbarText }}
        </v-snackbar> -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "App",
    data() {
        return {
            color: "error",
            directions: [
                "top left",
                "top center",
                "top right",
                "bottom left",
                "bottom center",
                "bottom right"
            ],
            snackbar: true
        };
    },
    computed: {
        parsedDirection() {
            return this.direction.split(" ");
        },
        ...mapGetters(["snackbarShow", "snackbarType", "snackbarText"])
    },
    watch: {
        snackbarShow(val) {
            this.snackbar = val;
        },
        snackbarType(val) {
            this.color = val;
        }
    },
    methods: {
        $message(text, type = "error", timeout = 1000) {
            this.$store.commit("app/SET_SNACKBAR_TEXT", text);
            this.$store.commit("app/SET_SNACKBAR_TYPE", type);
            this.$store.commit("app/SET_SNACKBAR_SHOW", true);
            setTimeout(() => {
                this.$store.commit("app/SET_SNACKBAR_SHOW", false);
            }, timeout);
        }
    },
    created() {
        console.log(this.snackbarShow);
    }
};
</script>
