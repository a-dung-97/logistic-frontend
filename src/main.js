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
import "./sass/custom.scss";
import "./plugins/base";
import "./plugins/chartist";
import "./plugins/vee-validate";
import "./plugins/vue-world-map";
import vuetify from "./plugins/vuetify";
import VuetifyConfirm from "vuetify-confirm";
import CURLMixin from "./mixins/crud";
Vue.use(VuetifyConfirm, { vuetify });
// import imageViewer from "vue-image-viewer";
// Vue.use(imageViewer);
import i18n from "./i18n";

import imageViewer from "image-viewer-vue";
Vue.use(imageViewer);
// Vue.mixin(CURLMixin);
// import Vuelidate from "vuelidate";
// Vue.use(Vuelidate);
import "@/permission"; // permission control
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
Vue.prototype.$snackbar = (text, type, timeout = 2000) => {
    store.dispatch("app/showSnackbar", { text, type, timeout });
};
Vue.prototype.$loader = loader => {
    store.dispatch("app/setLoader", loader);
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount("#app");
