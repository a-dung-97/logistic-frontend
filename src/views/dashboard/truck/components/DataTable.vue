<template>
    <v-data-table
        :headers="headers"
        :items="tableData"
        disable-pagination
        disable-sort
        hide-default-footer
        item-key="id"
        disable-filtering
        id="my-table"
        @click="handleTableClick"
    >
        <template v-slot:top>
            <v-toolbar class="custom-toolbar" flat>
                <v-toolbar-title>Danh sách xe</v-toolbar-title>

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
        <template v-slot:item.actions="{ item }">
            <!-- <v-icon small class="mr-2" @click="$emit('handle-edit', item)"
                >mdi-pencil</v-icon
            >-->
            <v-btn
                x-small
                @click="$emit('handle-edit', item)"
                fab
                dark
                color="primary"
            >
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                x-small
                @click="handleDelete(item.id)"
                class="ml-2"
                fab
                dark
                color="error"
            >
                <v-icon dark>mdi-delete</v-icon>
            </v-btn>

            <!-- <v-icon small @click="handleDelete(item.id)">mdi-delete</v-icon> -->
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="$emit('handle-reset')"
                >Refresh</v-btn
            >
        </template>
    </v-data-table>
</template>
<script>
import { destroy } from "@/api/business/customer";

export default {
    props: ["tableData", "loading", "form"],
    data() {
        return {
            headers: [
                { text: "BKS", value: "number_plate" },
                { text: "Hãng xe", value: "manufacturer.name" },
                { text: "Loại xe", value: "type.name" },
                { text: "Lái xe", value: "driver.name" },
                { text: "Chủ sở hữu", value: "owner_name" },
                { text: "Năm SX", value: "manufacturing_year" },
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
        handleTableClick(row) {
            console.log(row);
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
