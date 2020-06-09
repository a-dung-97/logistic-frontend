<template>
    <v-container>
        <v-row class="justify-center">
            <v-col cols="12" :md="5">
                <v-card z-depth="10">
                    <v-card-text>
                        <UserCard />
                        <EditProfileForm />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import EditProfileForm from "./components/EditProfileForm";
import UserCard from "./components/UserCard";

export default {
    components: {
        EditProfileForm,
        UserCard
    }
};
</script>
