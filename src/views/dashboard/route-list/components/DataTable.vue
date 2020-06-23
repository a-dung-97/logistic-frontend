<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tableData"
            disable-pagination
            disable-sort
            hide-default-footer
            disable-filtering
            class="elevation-1"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    @click="$emit('handle-create', item.id)"
                    fab
                    color="primary"
                    :disabled="item.status != 4 || item.receipt_count == 1"
                >
                    <v-icon dark>mdi-check</v-icon>
                </v-btn>
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip class="info" v-if="item.status == 1"
                    >Đã giao việc</v-chip
                >
                <v-chip class="blue" v-if="item.status == 2">Chấp nhận</v-chip>
                <v-chip class="warning" v-if="item.status == 3">Từ chối</v-chip>
                <v-chip class="success" v-if="item.status == 4"
                    >Hoàn thành</v-chip
                >
                <v-chip class="error" v-if="item.status == 5">Đã huỷ</v-chip>
            </template>

            <template v-slot:no-data>
                <v-btn color="primary" @click="$emit('handle-reset')"
                    >Refresh</v-btn
                >
            </template>
            <template v-slot:item.work.customers="{ item }">
                <p
                    class="mt-0 mb-0"
                    v-for="customer in item.work.customers"
                    :key="customer.id"
                >
                    {{ customer.name }}
                </p>
            </template>
        </v-data-table>
        <image-viewer-vue
            v-if="imageViewerFlag"
            @closeImageViewer="imageViewerFlag = false"
            :imgUrlList="imgUrlList"
            :index="currentIndex"
            :title="title"
            :closable="true"
            :cyclical="false"
        ></image-viewer-vue>
    </div>
</template>
<script>
import { destroy } from "@/api/business/warehouse";

export default {
    props: ["tableData", "loading", "form"],
    data() {
        return {
            imageViewerFlag: false,
            imgUrlList: [],
            currentIndex: 0,
            title: "issue",
            headers: [
                { text: "Ngày", value: "work.date" },
                { text: "Xe", value: "truck.number_plate" },
                { text: "Lái xe", value: "user.name" },
                { text: "Khách hàng", value: "work.customers" },
                { text: "Trạng thái", value: "status", align: "center" },
                {
                    text: "Lưu kho",
                    value: "receipt.warehouse.name",
                    align: "center"
                },
                { text: "Hành động", value: "actions", align: "center" }
            ]
        };
    },

    methods: {
        async handleDelete(id) {
            try {
                const res = await this.$confirm("Bạn có chắc chắn muốn xoá?", {
                    title: "Xác nhận xoá",
                    buttonTrueText: "Xác nhận",
                    buttonFalseText: "Huỷ"
                });
                if (res) {
                    await destroy(id);
                    this.$snackbar("Xoá dữ liệu thành công", "success");
                    this.$emit("handle-delete");
                }
            } catch (error) {
                console.log(error);
            }
        },
        showImages(images) {
            this.imgUrlList = images.map(
                item => process.env.VUE_APP_SERVER + item
            );
            this.currentIndex = 0;
            this.imageViewerFlag = true;
        }
    }
};
</script>
<style lang="scss">
.custom-toolbar {
    .v-toolbar__content {
        padding-left: 8px;
    }
}
</style>
