<template>
    <v-container fluid>
        <v-row>
            <v-col class="pb-0" cols="12">
                <Search
                    :params="params"
                    @handle-search="getData(1)"
                    @handle-reset="reset"
                    :data="tableData"
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
        </v-row>
    </v-container>
</template>

<script>
import DataTable from "./components/DataTable";
import Search from "./components/Search";
import { index } from "@/api/business/report";

export default {
    components: { DataTable, Search },
    data() {
        return {
            showDialog: false,
            showDialog1: false,
            editing: false,
            defaultParams: {
                date: [
                    new Date().toISOString().substr(0, 10),
                    new Date().toISOString().substr(0, 10)
                ],
                type: "driver"
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
            form: {}
        };
    },
    methods: {
        async getData(page = null) {
            try {
                this.$loader(true);
                if (page) this.params.page = page;
                const { data, meta } = await index(this.params);
                this.tableData = data;
            } catch (error) {
                console.log(error);
            } finally {
                this.$loader(false);
            }
        },
        async getOption() {},
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
