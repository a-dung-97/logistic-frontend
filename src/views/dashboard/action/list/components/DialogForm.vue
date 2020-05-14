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
                                label="Tên chức năng*"
                                dense
                                @input="$v.form.name.$touch()"
                                @blur="$v.form.name.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                v-model="form.reference"
                                :error-messages="referenceErrors"
                                label="Reference*"
                                dense
                                @input="$v.form.reference.$touch()"
                                @blur="$v.form.reference.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-autocomplete
                                v-model="form.action_group_id"
                                @input="$v.form.action_group_id.$touch()"
                                @blur="$v.form.action_group_id.$touch()"
                                :error-messages="actionGroupErrors"
                                :items="options.groups"
                                item-text="name"
                                item-value="id"
                                label="Nhóm*"
                                clearable
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-autocomplete
                                v-model="form.menu_id"
                                :items="options.menus"
                                item-text="title"
                                item-value="id"
                                label="Menu"
                                clearable
                            ></v-autocomplete>
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
import {
    required,
    minLength,
    sameAs,
    between,
    email
} from "vuelidate/lib/validators";
import { store, update } from "@/api/system/action";

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
                reference: {
                    required
                },
                action_group_id: {
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
                errors.push("Hãy nhập tên chức năng");
            return errors;
        },
        referenceErrors() {
            const errors = [];
            if (!this.$v.form.reference.$dirty) return errors;
            !this.$v.form.reference.required &&
                errors.push("Hãy nhập reference");
            return errors;
        },
        actionGroupErrors() {
            const errors = [];
            if (!this.$v.form.action_group_id.$dirty) return errors;
            !this.$v.form.action_group_id.required &&
                errors.push("Hãy chọn nhóm chức năng");
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
                    if (this.form.menu_id === undefined) this.form.menu_id = "";
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
