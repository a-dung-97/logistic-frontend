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
                <v-toolbar-title>Danh sách công việc</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-btn @click="$emit('handle-create')" class="mx-2" small fab dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>
        </template>
        <template v-slot:item.customers="{ item }">
            <p
                class="mt-0 mb-0"
                v-for="customer in item.customers"
                :key="customer.id"
            >{{ customer.code }}</p>
        </template>
        <template v-slot:item.truck_types="{ item }">
            <p
                class="mt-0 mb-0"
                v-for="type in item.truck_types"
                :key="type.id"
            >{{ type.name + " : " + type.pivot.quantity }}</p>
        </template>
        <template v-slot:item.status="{ item }">
            <v-chip class="info" v-if="item.status == 1">Mới tạo</v-chip>
            <v-chip class="success" v-if="item.status == 2">Đã điều phối</v-chip>
            <v-chip class="warning" v-if="item.status == 3">Đã huỷ</v-chip>
        </template>
        <template v-slot:item.shift="{ item }">{{ item.shift==1?'Sáng':'Chiều' }}</template>

        <template v-slot:item.actions="{ item }">
            <v-btn
                x-small
                @click="$emit('handle-edit', item)"
                fab
                :disabled="item.status != 1"
                color="primary"
            >
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                x-small
                @click="cancel(item.id)"
                class="ml-2"
                :disabled="item.status == 3"
                fab
                color="error"
            >
                <v-icon dark>mdi-close</v-icon>
            </v-btn>
            <v-btn
                x-small
                @click="$emit('handle-coordinate', {id:item.id,status:item.status})"
                class="ml-2"
                :disabled="item.status == 3"
                fab
                color="blue"
            >
                <v-icon dark>mdi-cog</v-icon>
            </v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="$emit('handle-reset')">Refresh</v-btn>
        </template>
    </v-data-table>
</template>
<script>
import { cancel } from "@/api/business/work";

export default {
    props: ["tableData", "loading", "form"],
    data() {
        return {
            headers: [
                { text: "Ngày", value: "date" },
                { text: "Ca", value: "shift" },
                { text: "Khách hàng", value: "customers" },
                { text: "Yêu cầu", value: "truck_types" },
                { text: "Người tạo", value: "user.name" },
                { text: "Người điều phối", value: "coordinator.name" },
                { text: "Trạng thái", value: "status", align: "center" },
                { text: "Hành động", value: "actions", align: "center" }
            ]
        };
    },

    methods: {
        async cancel(id) {
            try {
                const res = await this.$confirm("Bạn có chắc chắn muốn huỷ?", {
                    title: "Xác nhận huỷ",
                    buttonTrueText: "Xác nhận",
                    buttonFalseText: "Huỷ"
                });
                if (res) {
                    await cancel(id);
                    this.$snackbar("Huỷ thành công thành công", "success");
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
