<template>
    <div>
        <v-snackbar v-model="snackbar" :color="snackbarType" :timeout="0" top>
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
            snackbar: false
        };
    },
    computed: {
        ...mapGetters(["snackbarShow", "snackbarType", "snackbarText"])
    },
    watch: {
        snackbarShow(val) {
            this.snackbar = val;
        },
        snackbar(val) {
            this.$store.commit("app/SET_SNACKBAR_SHOW", val);
        }
    }
};
</script>
