<template>
    <v-container fluid>
        <v-row>
            <v-col class="pb-0" cols="12">
                <Search
                    :params="params"
                    @handle-search="getData(1)"
                    @handle-reset="reset"
                    :options="options"
                />
            </v-col>
            <v-col class="pt-0" cols="12">
                <DataTable
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit', $event)"
                    @handle-coordinate="showDialogForm1($event)"
                    @handle-create="showDialogForm('create')"
                    @handle-delete="getData()"
                />
            </v-col>
            <v-col cols="12">
                <Pagination
                    :length="pagination.last_page"
                    :params="params"
                    @handle-change-page="getData"
                    @handle-change-per-page="getData(1)"
                />
            </v-col>
        </v-row>
        <DialogForm
            @created="getData(1)"
            @updated="getData"
            :options="options"
            :show-dialog.sync="showDialog"
            :editing="editing"
            :form="form"
        />
        <Coordination
            @coordinated="getData"
            :work="currentWork"
            :options="options"
            :show-dialog.sync="showDialog1"
        />
    </v-container>
</template>
<script>
import DataTable from "./components/DataTable";
import Search from "./components/Search";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination";
import Coordination from "./components/Coordination";
import { index } from "@/api/business/work";
import { index as getCustomers } from "@/api/business/customer";
import { index as getTruckTypes } from "@/api/business/truck-type";
import { index as getTrucks } from "@/api/business/truck";
export default {
    components: { DataTable, Search, DialogForm, Pagination, Coordination },
    data() {
        return {
            showDialog: false,
            showDialog1: false,
            currentWork: "",
            editing: false,
            defaultParams: {
                date: new Date().toISOString().substr(0, 10),
                page: 1,
                per_page: 20,
                status: null
            },
            params: {},
            pagination: {
                last_page: 1
            },
            tableData: [],
            options: {
                customers: [],
                truck_types: [],
                trucks: []
            },
            form: {
                id: undefined,
                date: "",
                shift: "",
                customers: [],
                truck_types: []
            }
        };
    },
    methods: {
        async getData(page = null) {
            try {
                this.$loader(true);
                if (page) this.params.page = page;
                const { data, meta } = await index(this.params);
                data.forEach(item => {
                    item.truck_types.forEach(
                        val => (val.quantity = val.pivot.quantity)
                    );
                });
                this.tableData = data;
                this.pagination = meta;
            } catch (error) {
                console.log(error);
            } finally {
                this.$loader(false);
            }
        },
        async getOption() {
            try {
                const results = await Promise.all([
                    getCustomers(),
                    getTruckTypes(),
                    getTrucks()
                ]);
                [
                    this.options.customers,
                    this.options.truck_types,
                    this.options.trucks
                ] = results.map(item => item.data);
            } catch (error) {
                console.log(error);
            }
        },
        showDialogForm(mode, data = null) {
            if (mode == "edit") {
                this.editing = true;
                this.form.id = data.id;
                this.form.date = data.date;
                this.form.shift = data.shift;
                this.form.customers = data.customers.map(item => item.id);
                this.form.truck_types = [...data.truck_types];
            } else {
                this.form = {
                    id: undefined,
                    date: "",
                    shift: "",
                    customers: [],
                    truck_types: []
                };
                this.form.id = undefined;
                this.editing = false;
            }
            this.showDialog = true;
        },
        reset() {
            this.params = { ...this.defaultParams };
            this.getData();
        },
        showDialogForm1(work) {
            this.currentWork = work;
            this.showDialog1 = true;
        }
    },
    created() {
        this.params = { ...this.defaultParams };
        this.getOption();
        this.getData();
    }
};
</script>
