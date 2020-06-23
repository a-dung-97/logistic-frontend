<template>
    <v-row>
        <v-col md="8" cols="12" class="pb-0">
            <v-row>
                <v-col cols="12" md="6" lg="4" class="pb-0">
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
                                v-model="params.date"
                                label="Ngày"
                                dense
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="params.date"
                            @input="menu = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="6" lg="4" class="pb-0">
                    <v-select
                        :items="status"
                        item-text="name"
                        v-model="params.status"
                        item-value="id"
                        label="Trạng thái"
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
                class="float-md-right mr-4"
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
            menu: false,
            drawer: true,
            status: [
                {
                    id: 1,
                    name: "Đã giao việc"
                },
                {
                    id: 2,
                    name: "Chấp nhận"
                },
                {
                    id: 3,
                    name: "Từ chối"
                },
                {
                    id: 4,
                    name: "Hoàn thành"
                },
                {
                    id: 5,
                    name: "Bị huỷ"
                }
            ]
        };
    }
};
</script>
<style lang=""></style>
