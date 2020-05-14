<template>
    <v-overlay :value="loader">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters(["loader"])
    }
};
</script>
