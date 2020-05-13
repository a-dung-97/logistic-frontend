<template>
    <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card :loading="loading">
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="form.name"
                                :error-messages="nameErrors"
                                label="Tên*"
                                dense
                                @input="$v.form.name.$touch()"
                                @blur="$v.form.name.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Tên đăng nhập*"
                                v-model="form.username"
                                dense
                                :error-messages="usernameErrors"
                                @input="$v.form.username.$touch()"
                                @blur="$v.form.username.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Email*"
                                v-model="form.email"
                                dense
                                :error-messages="emailErrors"
                                @input="$v.form.email.$touch()"
                                @blur="$v.form.email.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Số điện thoại*"
                                v-model="form.phone_number"
                                dense
                                :error-messages="phoneNumberErrors"
                                @input="$v.form.phone_number.$touch()"
                                @blur="$v.form.phone_number.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="!editing">
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Mật khẩu*"
                                v-model="form.password"
                                dense
                                type="password"
                                :error-messages="passwordErrors"
                                @input="$v.form.password.$touch()"
                                @blur="$v.form.password.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                label="Nhập lại mật khẩu"
                                type="password"
                                v-model="form.password_confirmation"
                                dense
                                :error-messages="passwordConfirmationErrors"
                                @input="$v.form.password_confirmation.$touch()"
                                @blur="$v.form.password_confirmation.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-switch v-model="form.active" label="Active"></v-switch>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="form.role_id"
                                :items="options.roles"
                                item-text="name"
                                item-value="id"
                                label="Quyền"
                                single-line
                                :error-messages="roleIdErrors"
                                @input="$v.form.role_id.$touch()"
                                @blur="$v.form.role_id.$touch()"
                            ></v-select>
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
import {
    required,
    minLength,
    sameAs,
    between,
    email
} from "vuelidate/lib/validators";
import { store, update } from "@/api/system/user";

export default {
    props: ["form", "editing", "showDialog", "options"],
    data: () => ({
        dialog: true,
        loading: false
    }),
    validations() {
        if (!this.editing)
            return {
                form: {
                    name: {
                        required
                    },
                    username: {
                        required
                    },
                    email: {
                        required,
                        email
                    },
                    phone_number: {
                        required
                    },
                    password: {
                        required,
                        minLength: minLength(6)
                    },
                    password_confirmation: {
                        required,
                        sameAsPassword: sameAs("password")
                    },
                    role_id: {
                        required
                    }
                }
            };
        else
            return {
                form: {
                    name: {
                        required
                    },
                    username: {
                        required
                    },
                    email: {
                        required,
                        email
                    },
                    phone_number: {
                        required
                    },
                    role_id: {
                        required
                    }
                }
            };
    },

    computed: {
        title() {
            return this.editing ? "Sửa người dùng" : "Thêm người dùng";
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required &&
                errors.push("Hãy nhập tên người dùng");
            return errors;
        },
        usernameErrors() {
            const errors = [];
            if (!this.$v.form.username.$dirty) return errors;
            !this.$v.form.username.required &&
                errors.push("Hãy nhập tên đăng nhập");
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.form.email.$dirty) return errors;
            !this.$v.form.email.required &&
                errors.push("Hãy nhập địa chỉ email");
            !this.$v.form.email.email &&
                errors.push("Địa chỉ email không đúng");
            return errors;
        },
        phoneNumberErrors() {
            const errors = [];
            if (!this.$v.form.phone_number.$dirty) return errors;
            !this.$v.form.phone_number.required &&
                errors.push("Hãy nhập số điện thoại");
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.form.password.$dirty) return errors;
            !this.$v.form.password.required && errors.push("Hãy nhập mật khẩu");
            !this.$v.form.password.minLength &&
                errors.push("Mật khẩu tối thiểu 6 kí tự");
            return errors;
        },
        passwordConfirmationErrors() {
            const errors = [];
            if (!this.$v.form.password_confirmation.$dirty) return errors;
            !this.$v.form.password_confirmation.required &&
                errors.push("Hãy xác nhận lại mật khẩu");
            !this.$v.form.password_confirmation.sameAsPassword &&
                errors.push("Mật khẩu không trùng khớp");
            return errors;
        },
        roleIdErrors() {
            const errors = [];
            if (!this.$v.form.role_id.$dirty) return errors;
            !this.$v.form.role_id.required &&
                errors.push("Hãy chọn quyền người dùng");
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
            this.$emit(editing ? "handle-updated" : "handle-created");
        }
    }
};
</script>
