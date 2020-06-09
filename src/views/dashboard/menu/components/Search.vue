<template>
    <v-row>
        <v-col md="8" cols="12" class="pb-0">
            <v-row>
                <v-col cols="12" md="6" lg="4" class="pb-0">
                    <v-text-field
                        label="Tìm kiếm"
                        placeholder="Nhập thông tin tìm kiếm"
                        clearable
                        outlined
                        dense
                        v-model="params.search"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" lg="4" class="pb-0">
                    <v-select
                        v-model="params.menu_id"
                        :items="options.menus"
                        item-text="title"
                        item-value="id"
                        label="Menu cha"
                        clearable
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" style="padding-top:20px" md="4">
            <v-btn
                class="float-md-right mr-md-0"
                @click="$emit('handle-search')"
                color="primary"
                medium
                >Tìm kiếm</v-btn
            >
            <v-btn
                class="float-md-right  mr-4"
                @click="$emit('handle-reset')"
                color="primary"
                >Reset</v-btn
            >
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: ["params", "options"],
    data() {
        return {
            drawer: true
        };
    }
};
</script>
<style lang=""></style>
