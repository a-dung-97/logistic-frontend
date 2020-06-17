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
                                label="Tên loại xe*"
                                dense
                                @input="$v.form.name.$touch()"
                                @blur="$v.form.name.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Mã loại xe*"
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
                                label="Trọng tải (tấn)*"
                                v-model="form.tonnage"
                                dense
                                type="number"
                                :error-messages="tonnageErrors"
                                @input="$v.form.tonnage.$touch()"
                                @blur="$v.form.tonnage.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Huỷ</v-btn>
                <v-btn v-if="!editing" color="blue darken-1" text @click="createData">Thêm</v-btn>
                <v-btn v-else color="blue darken-1" text @click="updateData">Cập nhật</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { required, minValue } from "vuelidate/lib/validators";
import { store, update } from "@/api/business/truck-type";

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
                tonnage: {
                    required,
                    minValue: minValue(0)
                }
            }
        };
    },

    computed: {
        title() {
            return this.editing ? "Sửa loại xe" : "Thêm loại xe";
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required && errors.push("Hãy nhập tên loại xe");
            return errors;
        },
        codeErrors() {
            const errors = [];
            if (!this.$v.form.code.$dirty) return errors;
            !this.$v.form.code.required && errors.push("Hãy nhập mã loại xe");
            return errors;
        },
        tonnageErrors() {
            const errors = [];
            if (!this.$v.form.tonnage.$dirty) return errors;
            !this.$v.form.tonnage.required &&
                errors.push("Hãy nhập trọng tải loại xe");
            !this.$v.form.tonnage.minValue &&
                errors.push("Trọng tải phải lớn hơn 0");
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
