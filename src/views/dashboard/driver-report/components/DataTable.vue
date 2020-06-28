<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="tableData"
            disable-pagination
            hide-default-footer
            item-key="id"
            disable-filtering
            @click="handleTableClick"
        >
            <template v-slot:top>
                <v-toolbar class="custom-toolbar" flat>
                    <v-toolbar-title>Báo cáo xe</v-toolbar-title>
                </v-toolbar>
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
import { approve } from "@/api/business/broken-truck-report";

export default {
    props: ["tableData", "loading", "form"],
    data() {
        return {
            imageViewerFlag: false,
            imgUrlList: [],
            currentIndex: 1,
            title: "broken_truck_report",
            headers: [
                { text: "BKS", value: "number_plate" },
                { text: "Lái xe", value: "driver" },
                { text: "Dòng xe", value: "type" },
                { text: "Tổng KL", value: "quantity", align: "right" },
                {
                    text: "KL/trọng tải(%)",
                    value: "efficiency",
                    align: "right"
                }
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
