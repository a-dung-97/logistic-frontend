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
                                v-model="form.number_plate"
                                :error-messages="numberPlateErrors"
                                label="Biển kiểm soát*"
                                dense
                                @input="$v.form.number_plate.$touch()"
                                @blur="$v.form.number_plate.$touch()"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-select
                                v-model="form.truck_manufacturer_id"
                                :items="options.manufacturers"
                                item-text="name"
                                item-value="id"
                                label="Hãng xe*"
                                single-line
                                :error-messages="truckManufacturerIdErrors"
                                @input="$v.form.truck_manufacturer_id.$touch()"
                                @blur="$v.form.truck_manufacturer_id.$touch()"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-select
                                v-model="form.truck_type_id"
                                :items="options.types"
                                item-text="name"
                                item-value="id"
                                label="Loại xe*"
                                single-line
                                :error-messages="truckTypeIdErrors"
                                @input="$v.form.truck_type_id.$touch()"
                                @blur="$v.form.truck_type_id.$touch()"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-select
                                v-model="form.user_id"
                                :items="options.users"
                                item-text="name"
                                item-value="id"
                                label="Lái xe"
                                single-line
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field label="Chủ sở hữu" v-model="form.owner_name" dense></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                type="number"
                                min="0"
                                label="Năm sản xuất"
                                v-model="form.manufacturing_year"
                                dense
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
import { required, numeric } from "vuelidate/lib/validators";
import { store, update } from "@/api/business/truck";

export default {
    props: ["form", "editing", "showDialog", "options"],
    data: () => ({
        dialog: true,
        loading: false
    }),
    validations() {
        return {
            form: {
                number_plate: {
                    required
                },
                truck_manufacturer_id: {
                    required
                },
                truck_type_id: {
                    required
                }
            }
        };
    },

    computed: {
        title() {
            return this.editing ? "Sửa xe" : "Thêm xe";
        },
        numberPlateErrors() {
            const errors = [];
            if (!this.$v.form.number_plate.$dirty) return errors;
            !this.$v.form.number_plate.required &&
                errors.push("Hãy nhập biển kiếm soát");
            return errors;
        },
        truckManufacturerIdErrors() {
            const errors = [];
            if (!this.$v.form.truck_manufacturer_id.$dirty) return errors;
            !this.$v.form.truck_manufacturer_id.required &&
                errors.push("Hãy chọn hãng sản xuất");
            return errors;
        },
        truckTypeIdErrors() {
            const errors = [];
            if (!this.$v.form.truck_type_id.$dirty) return errors;
            !this.$v.form.truck_type_id.required &&
                errors.push("Hãy chọn loại xe");
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
