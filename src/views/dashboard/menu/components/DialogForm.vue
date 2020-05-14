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
                                v-model="form.title"
                                :error-messages="titleErrors"
                                label="Tên*"
                                dense
                                @input="$v.form.title.$touch()"
                                @blur="$v.form.title.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Đường dẫn*"
                                v-model="form.to"
                                dense
                                :error-messages="toErrors"
                                @input="$v.form.to.$touch()"
                                @blur="$v.form.to.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                label="Icon"
                                v-model="form.icon"
                                dense
                                :append-icon="form.icon"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-switch
                                v-model="hiddenMenu"
                                label="Menu ẩn"
                            ></v-switch>
                        </v-col>
                    </v-row>
                    <v-row v-if="!hiddenMenu">
                        <v-col cols="12" sm="12">
                            <v-slider
                                v-model="form.priority"
                                min="1"
                                max="100"
                                label="Độ ưu tiên"
                                :thumb-size="24"
                                thumb-label="always"
                            ></v-slider>
                        </v-col>
                    </v-row>
                    <v-row v-if="!hiddenMenu">
                        <v-col cols="12" sm="12">
                            <v-select
                                v-model="form.menu_id"
                                :items="menus"
                                item-text="title"
                                item-value="id"
                                label="Menu cha"
                                clearable
                            ></v-select>
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
import { store, update } from "@/api/system/menu";
import { index } from "@/api/system/menu";

export default {
    props: ["form", "editing", "showDialog", "options"],
    data: () => ({
        dialog: true,
        loading: false,
        hiddenMenu: false,
        menus: []
    }),
    validations() {
        return {
            form: {
                to: {
                    required
                },
                title: {
                    required
                },
                priority: {
                    required
                }
            }
        };
    },
    watch: {
        showDialog(val) {
            if (val) this.getParentMenus();
            if (this.form.priority == 0 && editing) this.hiddenMenu = true;
        },
        hiddenMenu(val) {
            if (val) {
                this.form.priority = 0;
                this.form.menu_id = "";
            }
        }
    },
    computed: {
        title() {
            return this.editing ? "Sửa người dùng" : "Thêm người dùng";
        },
        titleErrors() {
            const errors = [];
            if (!this.$v.form.title.$dirty) return errors;
            !this.$v.form.title.required && errors.push("Hãy nhập tên menu");
            return errors;
        },
        toErrors() {
            const errors = [];
            if (!this.$v.form.to.$dirty) return errors;
            !this.$v.form.to.required && errors.push("Hãy nhập đường dẫn");
            return errors;
        },
        priorityErrors() {
            const errors = [];
            if (!this.$v.form.priority.$dirty) return errors;
            !this.$v.form.priority.required &&
                errors.push("Hãy nhập độ ưu tiên");
        }
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$v.form.$reset();
            this.hiddenMenu = false;
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
        },
        async getParentMenus() {
            try {
                const { data } = await index({
                    page: 1,
                    per_page: 9999,
                    parent_menu: true
                });
                this.menus = data;
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
