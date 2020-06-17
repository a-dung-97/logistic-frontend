<template>
    <v-dialog v-model="showDialog" persistent max-width="700">
        <v-card :loading="loading">
            <v-card-title>
                <span class="headline">Cập nhật phế liệu</span>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="5">
                        <v-select
                            v-model="form.id"
                            :items="options.scraps"
                            item-text="name"
                            item-value="id"
                            dense
                            clearable
                            label="Loại phế liệu"
                            :error-messages="idErrors"
                            @input="$v.form.id.$touch()"
                            @blur="$v.form.id.$touch()"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field
                            type="number"
                            :error-messages="priceErrors"
                            @input="$v.form.price.$touch()"
                            @blur="$v.form.price.$touch()"
                            v-model="form.price"
                            label="Đơn giá"
                            dense
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-btn
                            x-small
                            class="float-right"
                            fab
                            dark
                            @click="updateScraps"
                            color="primary"
                        >
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-data-table
                        :headers="headers"
                        :items="tableData"
                        disable-pagination
                        disable-sort
                        hide-default-footer
                        style="width:100%"
                        disable-filtering
                    >
                        <template v-slot:item.actions="{ item }">
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
                        </template>
                    </v-data-table>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog"
                    >Huỷ</v-btn
                >

                <!-- <v-btn color="blue darken-1" text @click="updateActions"
                    >Cập nhật</v-btn
                >-->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { updateScraps, getScraps, deleteScrap } from "@/api/business/customer";
import { required, minValue } from "vuelidate/lib/validators";

export default {
    props: ["showDialog", "options", "currentRole", "id"],
    data() {
        return {
            loading: false,
            tableData: [],
            headers: [
                { text: "Tên", value: "name" },
                { text: "Mã", value: "code" },
                { text: "Giá", value: "pivot.price", align: "right" },
                { text: "Hành động", value: "actions", align: "center" }
            ],
            form: {
                id: "",
                price: ""
            }
        };
    },
    validations() {
        return {
            form: {
                id: {
                    required
                },
                price: {
                    required,
                    minValue: minValue(0)
                }
            }
        };
    },
    watch: {
        showDialog(val) {
            if (val) {
                this.getScraps();
            }
        }
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.form.id = "";
            this.form.price = "";
            this.$v.form.$reset();
        },
        async handleDelete(id) {
            try {
                const res = await this.$confirm("Bạn có chắc chắn muốn xoá?", {
                    title: "Xác nhận xoá",
                    buttonTrueText: "Xác nhận",
                    buttonFalseText: "Huỷ"
                });
                if (res) {
                    await deleteScrap(this.id, id);
                    this.$snackbar("Xoá dữ liệu thành công", "success");
                    this.getScraps();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getScraps() {
            try {
                this.loading = true;
                const { data } = await getScraps(this.id);
                this.tableData = data;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        async updateScraps() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            try {
                this.loading = true;
                await updateScraps(this.id, this.form);
                this.loading = false;
                this.$snackbar("Cập nhật phế liệu", "success");
                this.form.id = "";
                this.form.price = "";
                this.$v.form.$reset();
                this.getScraps();
                this.$emit("updated");
            } catch (error) {
                this.loading = false;
            }
        }
    },
    computed: {
        idErrors() {
            const errors = [];
            if (!this.$v.form.id.$dirty) return errors;
            !this.$v.form.id.required && errors.push("Hãy chọn loại phế liệu");
            return errors;
        },
        priceErrors() {
            const errors = [];
            if (!this.$v.form.price.$dirty) return errors;
            !this.$v.form.price.required &&
                errors.push("Hãy nhập giá phế liệu");
            !this.$v.form.price.minValue &&
                errors.push("Giá phế liệu phải lớn hơn 0");
            return errors;
        }
    }
};
</script>
