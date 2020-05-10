<template>
    <v-container class="my-container" fluid>
        <v-row>
            <v-col class="pb-0" cols="12">
                <Search :params="params" @handle-search="getData(1)"
            /></v-col>
            <v-col class="pt-0" cols="12"
                ><DataTable
                    :form="form"
                    :table-data="tableData"
                    @handle-edit="showDialogForm('edit')"
                    @handle-delete="getData()"
                    :loading.sync="loading"
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
import { index } from "@/api/system/user";
import { index as getRoles } from "@/api/system/role";
export default {
    components: { DataTable, Search, DialogForm },
    data() {
        return {
            loading: false,
            showDialog: false,
            editing: false,
            params: {
                search: "",
                page: 1,
                per_page: 20
            },
            pagination: {},
            tableData: [],
            options: {
                roles: []
            },
            form: {
                name: "",
                username: "",
                email: "",
                phone_number: "",
                password: "",
                password_confirmation: "",
                active: ""
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
        }
    },
    created() {
        this.getOption();
        this.getData();
    }
};
</script>
