<template>
    <v-row>
        <v-col md="8" cols="12" class="pb-0">
            <v-row>
                <v-col cols="12" md="6" lg="4" class="pb-0"
                    ><DateRangePicker :value.sync="params.date" />
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
            <download-excel
                :fields="{
                    'Biển kiểm soát': 'number_plate',
                    'Lái xe': 'driver',
                    'Dòng xe': 'type',
                    'Tổng KL': 'quantity',
                    'KL/trọng tải': 'efficiency'
                }"
                :data="data"
                name="driver.xls"
            >
                <v-btn
                    :disabled="data.length === 0"
                    class="float-md-right mr-4"
                    color="primary"
                    >Xuất Excel</v-btn
                >
            </download-excel>
        </v-col>
    </v-row>
</template>
<script>
import DateRangePicker from "../../../../components/DateRangePicker";
import DownloadExcel from "vue-json-excel";
export default {
    props: ["params", "options", "data"],
    components: { DateRangePicker, DownloadExcel },
    data() {
        return {
            drawer: true,
            menu: false,
            status: [
                {
                    id: 1,
                    name: "Chờ phê duyệt"
                },
                {
                    id: 2,
                    name: "Chấp nhận"
                },
                {
                    id: 3,
                    name: "Từ chối"
                }
            ]
        };
    }
};
</script>
<style lang=""></style>
