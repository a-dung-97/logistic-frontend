<template>
    <v-container class="my-container" fluid>
        <v-row>
            <v-col class="pb-0" cols="12">
                <Search
                    :params="params"
                    @handle-search="getData(1)"
                    @handle-reset="reset"
            /></v-col>
            <v-col class="pt-0" cols="12"
                ><DataTable
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit', $event)"
                    @handle-create="showDialogForm('create')"
                    @handle-delete="getData()"
                    :loading.sync="loading"
                />
            </v-col>
            <v-col cols="12">
                <Pagination
                    :length="pagination.last_page"
                    :params="params"
                    @handle-change="getData"
                />
            </v-col>
        </v-row>
        <DialogForm
            @reload="getData(1)"
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
import { index } from "@/api/system/user";
import { index as getRoles } from "@/api/system/role";
export default {
    components: { DataTable, Search, DialogForm, Pagination },
    data() {
        return {
            loading: false,
            showDialog: false,
            editing: false,
            defaultParams: {
                search: "",
                page: 1,
                per_page: 20
            },
            params: {},
            pagination: {
                last_page: 1
            },
            tableData: [],
            options: {
                roles: []
            },
            form: {
                id: "",
                name: "",
                username: "",
                email: "",
                phone_number: "",
                password: "",
                password_confirmation: "",
                active: true,
                role_id: ""
            }
        };
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                const { data, meta } = await index(this.params);
                this.tableData = data;
                this.pagination = meta;
            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        async getOption() {
            try {
                const results = await Promise.all([getRoles()]);
                [this.options.roles] = results.map(item => item.data);
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
                this.form.active = true;
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
