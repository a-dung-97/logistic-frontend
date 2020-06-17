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
    </v-container>
</template>

<script>
import DataTable from "./components/DataTable";
import Search from "./components/Search";
import DialogForm from "./components/DialogForm";
import Pagination from "@/components/Pagination";
import { index } from "@/api/business/truck";
import { index as getTruckManufacturers } from "@/api/business/truck-manufacturer";
import { index as getTruckTypes } from "@/api/business/truck-type";
import { index as getUsers } from "@/api/system/user";
export default {
    components: { DataTable, Search, DialogForm, Pagination },
    data() {
        return {
            showDialog: false,
            showDialog1: false,
            editing: false,
            defaultParams: {
                search: "",
                truck_type_id: "",
                truck_manufacturer_id: "",
                page: 1,
                per_page: 20
            },
            params: {},
            pagination: {
                last_page: 1
            },
            tableData: [],
            options: {
                manufacturers: [],
                types: [],
                users: []
            },
            form: {
                id: undefined,
                owner_name: "",
                number_plate: "",
                truck_manufacturer_id: "",
                truck_type_id: "",
                user_id: "",
                manufacturing_year: ""
            }
        };
    },
    methods: {
        async getData(page = null) {
            try {
                this.$loader(true);
                if (page) this.params.page = page;
                const { data, meta } = await index(this.params);
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
                    getTruckManufacturers(),
                    getTruckTypes(),
                    getUsers({ driver: true })
                ]);
                [
                    this.options.manufacturers,
                    this.options.types,
                    this.options.users
                ] = results.map(item => item.data);
            } catch (error) {
                console.log(error);
            }
        },
        showDialogForm(mode, data = null) {
            if (mode == "edit") {
                this.editing = true;
                for (let field in this.form) {
                    this.form[field] = data[field];
                }
            } else {
                for (let field in this.form) this.form[field] = "";
                this.form.id = undefined;
                this.editing = false;
            }
            this.showDialog = true;
        },
        reset() {
            this.params = { ...this.defaultParams };
            this.getData();
        }
    },
    created() {
        this.params = { ...this.defaultParams };
        this.getOption();
        this.getData();
    }
};
</script>
