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
                                label="Tên phế liệu*"
                                dense
                                @input="$v.form.name.$touch()"
                                @blur="$v.form.name.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Mã phế liệu*"
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
                            <v-textarea
                                label="Mô tả"
                                type="textarea"
                                v-model="form.description"
                                dense
                            ></v-textarea>
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
import { required } from "vuelidate/lib/validators";
import { store, update } from "@/api/business/scrap";

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
                }
            }
        };
    },

    computed: {
        title() {
            return this.editing ? "Sửa phế liệu" : "Thêm phế liệu";
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required && errors.push("Hãy nhập tên phế liệu");
            return errors;
        },
        codeErrors() {
            const errors = [];
            if (!this.$v.form.code.$dirty) return errors;
            !this.$v.form.code.required && errors.push("Hãy nhập mã phế liệu");
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
