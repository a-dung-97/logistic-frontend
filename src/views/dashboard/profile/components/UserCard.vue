<template>
    <v-card :elevation="5" class="mx-auto pt-4" height="343" max-width="350">
        <v-img
            class="mx-auto"
            height="180px"
            style="border-radius:50%"
            width="180px"
            :src="avatar || `https://ui-avatars.com/api/?name=${name}`"
        ></v-img>
        <v-card-title class="pt-3">
            <p style="text-align:center;width:100%">{{ name }}</p>
        </v-card-title>
        <v-card-subtitle class="pt-1 text-center">{{
            roles[0]
        }}</v-card-subtitle>
        <v-card-actions>
            <v-btn
                color="blue"
                v-if="!isSelectedImage"
                class="mx-auto"
                @click="handleUpload"
                text
                >Đổi ảnh đại diện</v-btn
            >
            <v-btn
                color="blue"
                v-else
                class="mx-auto"
                @click="changeAvatar"
                :loading="loading"
                text
                >Cập nhật</v-btn
            >
        </v-card-actions>
        <input
            ref="upload-image"
            @change="onImageChange($event)"
            class="upload-image"
            type="file"
        />
    </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { changeAvatar } from "@/api/system/user";

export default {
    data() {
        return {
            isSelectedImage: false,
            avatar: "",
            loading: false
        };
    },
    computed: {
        ...mapGetters(["name", "roles"])
    },
    methods: {
        handleUpload() {
            this.$refs["upload-image"].click();
        },
        onImageChange(e) {
            this.isSelectedImage = true;
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                this.isSelectedImage = false;
                return;
            }
            if (!/\.(png|jpg)$/.test(files[0].name)) {
                this.$snackbar("Hãy upload file jpg hoặc png", "error");
                this.isSelectedImage = false;
                return;
            }
            this.createImage(files[0]);
        },
        createImage(file) {
            let reader = new FileReader();
            let vm = this;
            reader.onload = e => {
                vm.avatar = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        async changeAvatar() {
            try {
                this.loading = true;
                let newAvatar = await changeAvatar({
                    avatar: this.avatar
                });
                this.isSelectedImage = false;
                this.loading = false;
                this.$store.commit("user/SET_AVATAR", newAvatar.data.avatar);
                this.$snackbar("Cập nhật thành công", "success");
            } catch (error) {
                this.loading = false;
            }
        }
    },
    created() {
        this.avatar = this.$store.getters.avatar;
    }
};
</script>
<style>
.upload-image {
    display: none;
    z-index: -9999;
}
</style>
