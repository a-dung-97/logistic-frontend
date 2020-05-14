<template>
    <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card :loading="loading">
            <v-card-title>
                <span class="headline">{{ title }}</span>
            </v-card-title>
            <v-card-text>
                <v-treeview
                    ref="treeview"
                    selectable
                    :items="options.actions"
                    v-model="currentRole.actions"
                ></v-treeview
            ></v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog"
                    >Huỷ</v-btn
                >

                <v-btn color="blue darken-1" text @click="updateActions"
                    >Cập nhật</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import { updateActions } from "@/api/system/role";
export default {
    props: ["showDialog", "options", "currentRole"],
    data() {
        return {
            title: "Cập nhật quyền hạn",
            loading: false
        };
    },
    methods: {
        closeDialog() {
            this.$emit("update:showDialog", false);
            this.$refs["treeview"].updateAll();
        },
        async updateActions() {
            try {
                this.loading = true;
                await updateActions(this.currentRole.id, {
                    actions: this.currentRole.actions
                });
                this.loading = false;
                this.$snackbar("Cập nhật quyền thành công", "success");
                this.closeDialog();
                this.$emit("updated");
            } catch (error) {
                this.loading = false;
            }
        }
    }
};
</script>
