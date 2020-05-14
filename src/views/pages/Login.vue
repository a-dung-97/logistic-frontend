<template>
    <v-container id="login" class="fill-height justify-center" tag="section">
        <v-row justify="center">
            <v-slide-y-transition appear>
                <base-material-card
                    color="success"
                    light
                    max-width="100%"
                    width="400"
                    class="px-5 py-3"
                >
                    <template v-slot:heading>
                        <div class="text-center">
                            <h1 class="display-2 font-weight-bold mb-2">Đăng nhập với</h1>

                            <v-btn
                                v-for="(social, i) in socials"
                                :key="i"
                                :href="social.href"
                                class="ma-1"
                                icon
                                rel="noopener"
                                target="_blank"
                            >
                                <v-icon v-text="social.icon" />
                            </v-btn>
                        </div>
                    </template>

                    <v-card-text class="text-center">
                        <div
                            class="text-center grey--text body-1 font-weight-light"
                        >hoặc nhập tài khoản và mật khẩu</div>
                        <v-form ref="form" lazy-validation v-model="valid">
                            <v-text-field
                                color="secondary"
                                v-model="form.username"
                                :disabled="loading"
                                label="Tên đăng nhập..."
                                :rules="rule.nameRules"
                                prepend-icon="mdi-account"
                                class="mt-10"
                            />

                            <v-text-field
                                class="mb-8"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show"
                                color="secondary"
                                v-model="form.password"
                                :disabled="loading"
                                :rules="rule.passwordRules"
                                label="Mật khẩu..."
                                prepend-icon="mdi-lock-outline"
                                :type="show ? 'text' : 'password'"
                            />
                        </v-form>

                        <pages-btn
                            large
                            color
                            depressed
                            @click="login"
                            :loading="loading"
                            class="v-btn--text success--text"
                        >Đăng nhập</pages-btn>
                    </v-card-text>
                </base-material-card>
            </v-slide-y-transition>
        </v-row>
        <!-- <v-snackbar
            v-model="snackbar"
            :bottom="y === 'bottom'"
            :color="color"
            :left="x === 'left'"
            :multi-line="mode === 'multi-line'"
            :right="x === 'right'"
            :timeout="timeout"
            :top="y === 'top'"
            :vertical="mode === 'vertical'"
        >
            {{ text }}
        </v-snackbar>-->
    </v-container>
</template>

<script>
export default {
    name: "PagesLogin",

    components: {
        PagesBtn: () => import("@/layouts/pages/components/Btn")
    },

    data: () => ({
        valid: true,
        show: false,
        loading: false,
        form: {
            username: "sysadmin",
            password: "12345678"
        },
        rule: {
            nameRules: [v => !!v || "Bạn chưa nhập tên đăng nhập"],
            passwordRules: [v => !!v || "Bạn chưa nhập password"]
        },
        socials: [
            {
                href: "#",
                icon: "mdi-facebook"
            },
            {
                href: "#",
                icon: "mdi-twitter"
            },
            {
                href: "#",
                icon: "mdi-github"
            }
        ]
    }),
    methods: {
        login() {
            this.$refs.form.validate();
            if (!this.valid) return;
            this.loading = true;
            this.$store
                .dispatch("user/login", this.form)
                .then(token => {
                    let payload = JSON.parse(atob(token.split(".")[1]));
                    this.loading = false;
                    this.$router
                        .push({
                            path: payload.home_url || "/"
                        })
                        .catch(err => {
                            // console.log(err);
                        });
                })
                .catch(error => {
                    this.loading = false;
                    if (error.response.status === 401) {
                        this.$snackbar("Sai tài khoản hoặc mật khẩu", "error");
                        this.loading = false;
                    }
                });
            // .catch(error => {
            //     if (error.response.status === 401) {
            //         this.loading = false;
            //         this.$message.error("Sai tài khoản hoặc mật khẩu");
            //     } else
            //         this.$router.push({
            //             name: "email-confirmation",
            //             params: {
            //                 user_id: error.response.data.data.user_id
            //             }
            //         });
            // });
        }
    }
};
</script>
