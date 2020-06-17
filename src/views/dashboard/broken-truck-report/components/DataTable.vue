<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tableData"
            disable-pagination
            disable-sort
            hide-default-footer
            item-key="id"
            disable-filtering
            @click="handleTableClick"
        >
            <template v-slot:top>
                <v-toolbar class="custom-toolbar" flat>
                    <v-toolbar-title>Danh sách báo cáo hỏng xe</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:item.status="{ item }">
                <v-chip v-if="item.status == 1" color="info" dark
                    >Chờ phê duyệt</v-chip
                >
                <v-chip v-else-if="item.status == 2" color="success" dark
                    >Chấp nhận</v-chip
                >
                <v-chip v-else color="warning" dark>Từ chối</v-chip>
            </template>
            <template v-slot:item.images="{ item }">
                <v-btn
                    x-small
                    :disabled="item.images.length == 0"
                    @click="showImages(item.images)"
                    fab
                    color="success"
                >
                    <v-icon dark>mdi-eye</v-icon>
                </v-btn>
            </template>
            <template v-slot:item.actions="{ item }">
                <!-- <v-icon small class="mr-2" @click="$emit('handle-edit', item)"
                >mdi-pencil</v-icon
            >-->
                <v-btn
                    x-small
                    :disabled="item.status != 1"
                    @click="approve(item.id, 2)"
                    fab
                    color="success"
                >
                    <v-icon dark>mdi-check</v-icon>
                </v-btn>
                <v-btn
                    x-small
                    :disabled="item.status != 1"
                    @click="approve(item.id, 3)"
                    class="ml-2"
                    fab
                    color="error"
                >
                    <v-icon dark>mdi-close</v-icon>
                </v-btn>

                <!-- <v-icon small @click="handleDelete(item.id)">mdi-delete</v-icon> -->
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
        >
        </image-viewer-vue>
    </div>
</template>
<script>
import { approve } from "@/api/business/broken-truck-report";

export default {
    props: ["tableData", "loading", "form"],
    data() {
        return {
            imageViewerFlag: false,
            imgUrlList: [],
            currentIndex: 1,
            title: "abc",
            headers: [
                { text: "Thời gian", value: "created_at" },
                { text: "BKS", value: "truck.number_plate" },
                { text: "Lái xe", value: "user.name" },
                { text: "Mô tả", value: "description" },
                { text: "Trạng thái", value: "status", align: "center" },
                { text: "Hình ảnh", value: "images", align: "center" },
                { text: "Hành động", value: "actions", align: "center" }
            ]
        };
    },

    methods: {
        transformSrc(src) {
            return process.env.VUE_APP_SERVER + src;
        },
        async approve(id, status) {
            try {
                const res = await this.$confirm(
                    "Bạn có chắc chắn muốn duyệt?",
                    {
                        title: "Duyệt báo cáo hỏng xe",
                        buttonTrueText: "Xác nhận",
                        buttonFalseText: "Huỷ"
                    }
                );
                if (res) {
                    await approve(id, { status });
                    this.$snackbar("Duyệt báo cáo thành công", "success");
                    this.$emit("handle-delete");
                }
            } catch (error) {
                console.log(error);
            }
        },
        handleTableClick(row) {
            console.log(row);
        },
        showImages(images) {
            this.imgUrlList = images.map(
                item => process.env.VUE_APP_SERVER + item
            );
            this.currentIndex = 1;
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
#my-table {
    tr {
        cursor: pointer !important;
    }
}
</style>
