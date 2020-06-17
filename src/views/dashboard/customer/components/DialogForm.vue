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
                            <v-text-field
                                v-model="form.name"
                                :error-messages="nameErrors"
                                label="Tên khách hàng*"
                                dense
                                @input="$v.form.name.$touch()"
                                @blur="$v.form.name.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Mã khách hàng*"
                                v-model="form.code"
                                dense
                                :error-messages="codeErrors"
                                @input="$v.form.code.$touch()"
                                @blur="$v.form.code.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="SĐT"
                                v-model="form.phone_number"
                                dense
                                :error-messages="phoneNumberErrors"
                                @input="$v.form.phone_number.$touch()"
                                @blur="$v.form.phone_number.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Địa chỉ"
                                v-model="form.address"
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Kinh độ"
                                v-model="form.latitude"
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Vĩ độ"
                                v-model="form.longitude"
                                dense
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
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
import { required, numeric } from "vuelidate/lib/validators";
import { store, update } from "@/api/business/customer";

export default {
    props: ["form", "editing", "showDialog", "options"],
    data: () => ({
        dialog: true,
        loading: false
    }),
    validations() {
        return {
            form: {
                name: {
                    required
                },
                code: {
                    required
                },
                phone_number: {
                    numeric
                }
            }
        };
    },

    computed: {
        title() {
            return this.editing ? "Sửa khách hàng" : "Thêm khách hàng";
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required &&
                errors.push("Hãy nhập tên khách hàng");
            return errors;
        },
        codeErrors() {
            const errors = [];
            if (!this.$v.form.code.$dirty) return errors;
            !this.$v.form.code.required &&
                errors.push("Hãy nhập mã khách hàng");
            return errors;
        },
        phoneNumberErrors() {
            const errors = [];
            if (!this.$v.form.phone_number.$dirty) return errors;
            !this.$v.form.phone_number.numeric &&
                errors.push("Hãy nhập số điện thoại");
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
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                } else {
                    this.loading = true;
                    await store(this.form);
                    this.reload();
                }
            } catch (error) {
                this.loading = false;
            }
        },
        async updateData() {
            try {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                } else {
                    this.loading = true;
                    await update(this.form.id, this.form);
                    this.reload();
                }
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
        }
    }
};
</script>
