<template>
    <div>
        <v-snackbar v-model="snackbar" :color="color" :timeout="0" top>
            {{ snackbarText }}
            <v-btn dark text @click="snackbar = false">
                Đóng
            </v-btn>
        </v-snackbar>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            snackbar: false,
            color: "info"
        };
    },
    computed: {
        ...mapGetters(["snackbarShow", "snackbarType", "snackbarText"])
    },
    watch: {
        snackbarShow(val) {
            this.snackbar = val;
        },
        snackbarType(val) {
            this.color = val;
        },
        snackbar(val) {
            this.$store.commit("app/SET_SNACKBAR_SHOW", val);
        }
    }
};
</script>
