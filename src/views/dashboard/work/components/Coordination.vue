<template>
    <v-dialog v-model="showDialog" persistent max-width="700px">
        <v-card :loading="loading">
            <v-card-title>
                <span class="headline">Điều phối</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select
                                :items="options.trucks"
                                item-text="number_plate"
                                v-model="truck.id"
                                item-value="id"
                                label="Xe"
                                dense
                                clearable
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="truck.time"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="truck.time"
                                        label="Thời gian"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        dense
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menu"
                                    v-model="truck.time"
                                    :use-seconds="true"
                                    full-width
                                    @click:second="$refs.menu.save(truck.time)"
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-data-table
                            style="width:100%"
                            :items="trucks"
                            height="400"
                            :headers="[
                                {
                                    text: 'Biển kiểm soát',
                                    value: 'number_plate'
                                },
                                {
                                    text: 'Lái xe',
                                    value: 'name'
                                },
                                {
                                    text: 'Thời gian',
                                    value: 'time'
                                },
                                {
                                    text: 'Trạng thái',
                                    value: 'status',
                                    align: 'center'
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
                            <template v-slot:item.status="{ item }">
                                <v-chip color="info" v-if="item.status == 1"
                                    >Đã giao việc</v-chip
                                >
                                <v-chip
                                    color="blue"
                                    dark
                                    v-if="item.status == 2"
                                    >Chấp nhận</v-chip
                                >
                                <v-chip color="warning" v-if="item.status == 3"
                                    >Từ chối</v-chip
                                >
                                <v-chip color="success" v-if="item.status == 4"
                                    >Hoàn thành</v-chip
                                >
                                <v-chip color="error" v-if="item.status == 5"
                                    >Đã huỷ</v-chip
                                >
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn
                                    x-small
                                    @click="cancelTask(item.id, item.truck_id)"
                                    class="ml-2"
                                    fab
                                    :disabled="item.status == 5"
                                    color="error"
                                >
                                    <v-icon dark>mdi-close</v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:no-data
                                >Chưa chọn loại xe nào</template
                            >
                        </v-data-table>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="addTruck"
                    >Thêm xe</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog"
                    >Đóng</v-btn
                >
                <v-btn
                    color="blue darken-1"
                    v-if="work.status == 1"
                    text
                    @click="coordinate"
                    >Điều phối</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { cancelTask, coordinate, getTasks } from "@/api/business/work";

export default {
    props: ["showDialog", "options", "work"],
    data: () => ({
        dialog: true,
        loading: false,
        trucks: [],
        menu: false,
        truck: {
            id: null,
            time: "00:00:00"
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

    watch: {
        showDialog(val) {
            if (val) this.getData();
        }
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.truck = {
                id: null,
                time: "00:00:00"
            };
        },
        async getData() {
            try {
                this.loading = true;
                const { data } = await getTasks(this.work.id);
                this.trucks = data;
                this.loading = false;
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        async coordinate() {
            try {
                if (this.trucks.length == 0) {
                    this.$snackbar("Bạn chưa chọn xe nào", "error");
                    return;
                }
                this.loading = true;
                await coordinate(this.work.id, { trucks: this.trucks });
                this.reload();
            } catch (error) {
                console.log(error);
                this.loading = false;
            }
        },
        reload() {
            this.$snackbar("Điều phối thành công", "success");
            this.$emit("coordinated");
            this.work.status = 2;
            this.getData();
            this.loading = false;
        },
        async addTruck() {
            if (this.trucks.some(item => item.truck_id == this.truck.id)) {
                this.$snackbar("Xe đã được thêm", "error");
                return;
            }
            const truck = this.options.trucks.find(
                item => item.id == this.truck.id
            );
            if (this.work.status == 1)
                this.trucks.push({
                    truck_id: truck.id,
                    time: this.truck.time,
                    name: truck.driver.name,
                    number_plate: truck.number_plate
                });
            else {
                this.loading = true;
                await coordinate(this.work.id, {
                    trucks: [{ truck_id: truck.id, time: this.truck.time }]
                });
                this.getData();
            }
            this.truck = {
                id: null,
                time: "00:00:00"
            };
        },
        async cancelTask(id, truck_id) {
            if (id === undefined) {
                this.trucks.splice(
                    this.trucks.findIndex(val => val.truck_id == truck_id),
                    1
                );
            } else {
                const res = await this.$confirm("Bạn có chắc chắn muốn huỷ?", {
                    title: "Xác nhận huỷ",
                    buttonTrueText: "Xác nhận",
                    buttonFalseText: "Huỷ"
                });
                if (res) {
                    this.loading = true;
                    await cancelTask(id);
                    this.$snackbar("Huỷ xe thành công", "success");
                    this.getData();
                }
            }
        }
    }
};
</script>
