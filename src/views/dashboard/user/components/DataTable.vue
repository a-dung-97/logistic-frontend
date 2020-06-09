<template>
    <v-data-table
        :headers="headers"
        :items="tableData"
        disable-pagination
        disable-sort
        hide-default-footer
        disable-filtering
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar class="custom-toolbar" flat>
                <v-toolbar-title>Danh sách người dùng</v-toolbar-title>

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
            <v-chip v-if="item.active" color="success" dark>Hoạt động</v-chip>
            <v-chip v-else color="warning" dark>Không hoạt động</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
            <!-- <v-icon small class="mr-2" @click="$emit('handle-edit', item)"
                >mdi-pencil</v-icon
            > -->
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
import { destroy } from "@/api/system/user";

export default {
    props: ["tableData", "loading", "form"],
    data() {
        return {
            headers: [
                { text: "Tên người dùng", value: "name" },
                { text: "Username", value: "username" },
                { text: "Email", value: "email" },
                { text: "SĐT", value: "phone_number" },
                { text: "Quyền", value: "role" },
                { text: "Active", value: "active", align: "center" },
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
