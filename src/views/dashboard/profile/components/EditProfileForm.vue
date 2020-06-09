<template>
    <v-card class="pt-4 pb-3">
        <v-card-text>
            <v-text-field
                disabled
                v-model="user.name"
                label="Tên người dùng"
                dense
            ></v-text-field>
            <v-text-field
                disabled
                v-model="user.username"
                label="Tên đăng nhập"
                dense
            ></v-text-field>
            <v-text-field
                disabled
                v-model="user.role"
                label="Quyền"
                dense
            ></v-text-field>
            <v-text-field
                disabled
                v-model="user.email"
                label="Email"
                dense
            ></v-text-field>
            <v-text-field
                disabled
                v-model="user.phone_number"
                label="Số điện thoại"
                dense
            ></v-text-field>
            <v-btn
                color="blue"
                class="d-block mx-auto"
                @click="showDialog = true"
                size="small"
                >Đổi mật khẩu</v-btn
            >
            <v-dialog v-model="showDialog" persistent max-width="500px">
                <v-card :loading="loading">
                    <v-card-title>
                        <span class="headline">Đổi mật khẩu</span>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="form.old_password"
                            :error-messages="oldPasswordErrors"
                            @input="$v.form.old_password.$touch()"
                            @blur="$v.form.old_password.$touch()"
                            label="Mật khẩu cũ"
                            dense
                            type="password"
                        ></v-text-field>
                        <v-text-field
                            v-model="form.password"
                            :error-messages="passwordErrors"
                            @input="$v.form.password.$touch()"
                            @blur="$v.form.password.$touch()"
                            label="Mật khẩu mới"
                            dense
                            type="password"
                        ></v-text-field>
                        <v-text-field
                            label="Nhập lại mật khẩu"
                            type="password"
                            v-model="form.password_confirmation"
                            dense
                            :error-messages="passwordConfirmationErrors"
                            @input="$v.form.password_confirmation.$touch()"
                            @blur="$v.form.password_confirmation.$touch()"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            class="d-block mx-auto"
                            color="blue darken-1"
                            text
                            @click="closeDialog"
                            >Huỷ</v-btn
                        >
                        <v-btn
                            class="d-block mx-auto"
                            color="blue darken-1"
                            text
                            @click="changePassword"
                            >Xác nhận</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>
<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { changePassword } from "@/api/system/user";
export default {
    name: "edit-profile-form",
    props: {
        dataBackgroundColor: {
            type: String,
            default: ""
        }
    },
    validations() {
        return {
            form: {
                old_password: {
                    required
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                password_confirmation: {
                    required,
                    sameAsPassword: sameAs("password")
                }
            }
        };
    },
    data() {
        return {
            loading: false,
            showDialog: false,
            form: {
                old_password: "",
                password: "",
                password_confirmation: ""
            },
            user: {
                name: "",
                username: "",
                role: "",
                email: "",
                phone_number: ""
            }
        };
    },
    computed: {
        oldPasswordErrors() {
            const errors = [];
            if (!this.$v.form.old_password.$dirty) return errors;
            !this.$v.form.old_password.required &&
                errors.push("Hãy nhập mật khẩu cũ");
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
        }
    },
    methods: {
        closeDialog() {
            this.showDialog = false;
            for (const field in this.form) this.form[field] = "";
            this.$v.form.$reset();
        },
        async changePassword() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            } else {
                try {
                    this.loading = true;
                    await changePassword(this.form);
                    this.loading = false;
                    this.closeDialog();
                    this.$snackbar("Cập nhật thành công", "success");
                } catch (error) {
                    this.loading = false;
                }
            }
        }
    },
    created() {
        for (const key in this.user) {
            console.log(key);
            this.user[key] = this.$store.getters[key];
        }
        this.user.role = this.$store.getters.roles[0];
    }
};
</script>
<style></style>
