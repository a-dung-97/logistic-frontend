<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tableData"
            disable-pagination
            :single-expand="true"
            disable-sort
            hide-default-footer
            show-expand
            disable-filtering
            class="elevation-1"
        >
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-container>
                        <v-row class="justify-center">
                            <v-col cols="8">
                                <v-data-table
                                    :headers="[
                                        {
                                            text: 'Mã hàng hoá',
                                            value: 'scrap.code'
                                        },
                                        {
                                            text: 'Tên hàng hoá',
                                            value: 'scrap.name'
                                        },
                                        {
                                            text: 'Khối lượng',
                                            value: 'quantity',
                                            align: 'right'
                                        }
                                    ]"
                                    :items="item.details"
                                    disable-pagination
                                    disable-sort
                                    hide-default-footer
                                    disable-filtering
                                    class="elevation-1"
                                ></v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </td>
            </template>
            <template v-slot:top>
                <v-toolbar class="custom-toolbar" flat>
                    <v-toolbar-title
                        >Danh sách biên bản giao nhận</v-toolbar-title
                    >

                    <v-spacer></v-spacer>
                    <v-btn
                        @click="$emit('handle-create')"
                        class="mx-2"
                        small
                        fab
                        dark
                        color="indigo"
                    >
                        <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </v-toolbar>
            </template>
            <template v-slot:item.active="{ item }">
                <v-chip v-if="item.active" color="success" dark
                    >Hoạt động</v-chip
                >
                <v-chip v-else color="warning" dark>Không hoạt động</v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn
                    :disabled="!item.images || item.images.length == 0"
                    @click="showImages(item.images)"
                    x-small
                    fab
                    color="blue"
                >
                    <v-icon dark>mdi-eye</v-icon>
                </v-btn>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="$emit('handle-reset')"
                    >Refresh</v-btn
                >
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
                { text: "Ngày", value: "date" },
                { text: "Khách hàng", value: "customer.name" },
                { text: "Xe", value: "task.truck.number_plate" },
                { text: "Lái xe", value: "task.user.name" },
                { text: "Khối lượng", value: "quantity", align: "right" },
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
