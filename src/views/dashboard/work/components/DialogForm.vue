<template>
    <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card :loading="loading">
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
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
                                        v-model="form.date"
                                        label="Ngày"
                                        readonly
                                        dense
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="form.date"
                                    @input="menu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-select
                                :items="shifts"
                                item-text="name"
                                v-model="form.shift"
                                item-value="id"
                                label="Ca"
                                dense
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-select
                                :items="options.customers"
                                item-text="code"
                                v-model="form.customers"
                                item-value="id"
                                label="Khách hàng"
                                dense
                                multiple
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="options.truck_types"
                                item-text="code"
                                v-model="truck_type.id"
                                item-value="id"
                                label="Loại xe"
                                dense
                                clearable
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="truck_type.quantity"
                                label="Số lượng"
                                dense
                                type="number"
                                :min="0"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-data-table
                            style="width:100%"
                            :items="form.truck_types"
                            :headers="[
                                { text: 'Tên loại xe', value: 'id' },
                                {
                                    text: 'Số lượng',
                                    value: 'quantity',
                                    align: 'right'
                                },
                                {
                                    text: 'Hành động',
                                    value: 'actions',
                                    align: 'center'
                                }
                            ]"
                            disable-pagination
                            disable-sort
                            hide-default-footer
                            disable-filtering
                            class="elevation-1"
                        >
                            <template v-slot:item.id="{ item }">
                                {{
                                    options.truck_types.find(
                                        val => val.id == item.id
                                    ).name
                                }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn
                                    x-small
                                    class="ml-2"
                                    @click="
                                        form.truck_types.splice(
                                            form.truck_types.findIndex(
                                                val => val.id == item.id
                                            ),
                                            1
                                        )
                                    "
                                    fab
                                    dark
                                    color="error"
                                >
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:no-data>
                                Chưa chọn loại xe nào
                            </template>
                        </v-data-table>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="addTruckType"
                    >Thêm yêu cầu</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog"
                    >Huỷ</v-btn
                >
                <v-btn
                    v-if="!editing"
                    color="blue darken-1"
                    text
                    @click="createData"
                    >Thêm</v-btn
                >
                <v-btn v-else color="blue darken-1" text @click="updateData"
                    >Cập nhật</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { store, update } from "@/api/business/work";

export default {
    props: ["form", "editing", "showDialog", "options"],
    data: () => ({
        dialog: true,
        loading: false,
        menu: false,
        truck_type: {
            id: null,
            quantity: 0
        },
        shifts: [
            {
                id: 1,
                name: "Ca sáng"
            },
            {
                id: 2,
                name: "Ca chiều"
            }
        ]
    }),
    validations() {
        return {
            form: {
                name: {
                    required
                },
                code: {
                    required
                }
            }
        };
    },

    computed: {
        title() {
            return this.editing ? "Sửa công việc" : "Thêm công việc";
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required &&
                errors.push("Hãy nhập tên công việc");
            return errors;
        },
        codeErrors() {
            const errors = [];
            if (!this.$v.form.code.$dirty) return errors;
            !this.$v.form.code.required && errors.push("Hãy nhập mã công việc");
            return errors;
        }
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$v.form.$reset();
        },
        async createData() {
            try {
                if (!this.form.date) {
                    this.$snackbar("Bạn chưa chọn ngày", "error");
                    return;
                }
                if (!this.form.shift) {
                    this.$snackbar("Bạn chưa chọn ca", "error");
                    return;
                }
                if (this.form.customers.length == 0) {
                    this.$snackbar("Bạn chưa chọn khách hàng", "error");
                    return;
                }
                if (this.form.truck_types.length == 0) {
                    this.$snackbar("Bạn chưa chọn yêu cầu", "error");
                    return;
                }
                this.loading = true;
                await store(this.form);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        async updateData() {
            try {
                if (!this.form.date) {
                    this.$snackbar("Bạn chưa chọn ngày", "error");
                    return;
                }
                if (!this.form.shift) {
                    this.$snackbar("Bạn chưa chọn ca", "error");
                    return;
                }
                if (this.form.customers.length == 0) {
                    this.$snackbar("Bạn chưa chọn khách hàng", "error");
                    return;
                }
                if (this.form.truck_types.length == 0) {
                    this.$snackbar("Bạn chưa chọn yêu cầu", "error");
                    return;
                }
                this.loading = true;
                await update(this.form.id, this.form);
                this.reload();
            } catch (error) {
                this.loading = false;
            }
        },
        reload() {
            this.loading = false;
            this.$snackbar(
                this.editing ? "Cập nhật thành công" : "Thêm mới thành công",
                "success"
            );
            this.closeDialog();
            this.$emit(this.editing ? "updated" : "created");
        },
        addTruckType() {
            if (
                this.form.truck_types.some(
                    item => item.id == this.truck_type.id
                )
            ) {
                this.$snackbar("Loại xe đã được thêm", "error");
                return;
            }
            if (!this.truck_type.id) {
                this.$snackbar("Bạn chưa chọn loại xe", "error");
                return;
            }
            if (!this.truck_type.quantity) {
                this.$snackbar("Bạn chưa nhập số lượng", "error");
                return;
            }
            this.form.truck_types.push({
                id: this.truck_type.id,
                quantity: this.truck_type.quantity
            });
            this.truck_type = {
                id: null,
                quantity: 0
            };
        }
    }
};
</script>
