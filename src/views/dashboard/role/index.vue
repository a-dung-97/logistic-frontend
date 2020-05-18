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
                    @handle-change-actions="showSelectActionsDialog"
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
        <SelectAction
            :current-role="currentRole"
            :show-dialog.sync="showDialog1"
            @updated="getData"
            :options="options"
        />
    </v-container>
</template>

<script>
import DataTable from "./components/DataTable";
import Search from "./components/Search";
import DialogForm from "./components/DialogForm";
import SelectAction from "./components/SelectAction";
import Pagination from "@/components/Pagination";
import { index } from "@/api/system/role";
import { detail } from "@/api/system/action-group";
export default {
    components: { DataTable, Search, DialogForm, Pagination, SelectAction },
    data() {
        return {
            showDialog: false,
            showDialog1: false,
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
                actions: []
            },
            form: {
                id: undefined,
                name: "",
                code: "",
                home_url: "",
                description: ""
            },
            currentRole: {}
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
                const results = await Promise.all([detail()]);
                [this.options.actions] = results.map(item => item.data);
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
        showSelectActionsDialog(data) {
            this.currentRole = { ...data };
            this.showDialog1 = true;
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
