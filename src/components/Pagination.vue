<template>
    <v-row class="align-center">
        <v-col cols="12" sm="2" md="1">
            <v-select
                item-text="text"
                :items="items"
                item-value="value"
                v-model="params.per_page"
                @change="$emit('handle-change')"
            ></v-select>
        </v-col>
        <v-col cols="12" sm="10" md="11">
            <v-pagination
                class="justify-sm-start"
                v-model="params.page"
                :length="length"
                total-visible="10"
                @input="$emit('handle-change')"
            ></v-pagination>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: ["length", "params"],
    data() {
        return {
            items: [
                {
                    value: 20,
                    text: "20 / trang"
                },
                {
                    value: 50,
                    text: "50 / trang"
                },
                {
                    value: 100,
                    text: "100 / trang"
                }
            ]
        };
    },
    methods: {}
};
</script>
<style lang="scss"></style>
