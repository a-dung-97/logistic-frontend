// =========================================================
// * Vuetify Material Dashboard PRO - v2.1.0
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vuetify-material-dashboard-pro
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import "./plugins/vue-world-map";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";

// import Vuelidate from "vuelidate";
// Vue.use(Vuelidate);
import "@/permission"; // permission control
Vue.prototype.$snackbar = (text, type = "info", timeout = 2000) => {
    store.dispatch("app/showSnackbar", { text, type, timeout });
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount("#app");
