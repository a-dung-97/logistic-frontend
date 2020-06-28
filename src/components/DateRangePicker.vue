<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="dateRangeText"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                outlined
                dense
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="dateLocal"
            range
            @input="handleInput"
        ></v-date-picker>
    </v-menu>
</template>
<script>
export default {
    props: ["value"],
    data: () => ({
        menu: false,
        dateLocal: null
    }),
    computed: {
        dateRangeText() {
            return this.value.join("  -  ");
        }
    },
    watch: {
        menu(val) {
            if (!val) {
                if (this.dateLocal.length === 1) {
                    this.dateLocal = [this.dateLocal[0], this.dateLocal[0]];
                    this.$emit("update:value", [
                        this.dateLocal[0],
                        this.dateLocal[0]
                    ]);
                }
            }
        },
        dateLocal(val) {
            if (val[0] > val[1]) {
                this.dateLocal = val.sort();
                this.$emit("update:value", val.sort());
            }
            this.$emit("update:value", val);
            if (val.length > 1) this.menu = false;
        }
    },
    methods: {
        handleInput(value) {}
    },
    mounted() {
        this.dateLocal = this.value;
    }
};
</script>
