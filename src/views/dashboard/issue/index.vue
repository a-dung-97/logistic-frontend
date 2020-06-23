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
import { index } from "@/api/business/issue";
export default {
    components: { DataTable, Search, DialogForm, Pagination },
    data() {
        return {
            showDialog: false,
            editing: false,
            defaultParams: {
                search: "",
                page: 1,
                per_page: 20,
                date: new Date().toISOString().substr(0, 10)
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
                id: undefined,
                code: "",
                name: ""
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
            // try {
            //     const results = await Promise.all([getRoles()]);
            //     [this.options.roles] = results.map(item => item.data);
            // } catch (error) {
            //     console.log(error);
            // }
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
