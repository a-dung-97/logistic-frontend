import { setTimeout } from "core-js";

const state = {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
        "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg",
    drawer: null,
    snackbarShow: false,
    snackbarText: "",
    snackbarType: "info"
};
const mutations = {
    SET_BAR_IMAGE(state, payload) {
        state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
        state.drawer = payload;
    },
    SET_SCRIM(state, payload) {
        state.barColor = payload;
    },
    SET_SNACKBAR_SHOW(state, payload) {
        state.snackbarShow = payload;
    },
    SET_SNACKBAR_TEXT(state, payload) {
        state.snackbarText = payload;
    },
    SET_SNACKBAR_TYPE(state, payload) {
        state.snackbarType = payload;
    }
};
const actions = {
    setBarImage({ commit }, payload) {
        console.log(payload);
        commit("SET_BAR_IMAGE", payload);
    },
    setDrawer({ commit }, payload) {
        commit("SET_DRAWER", payload);
    },
    setScrim({ commit }, payload) {
        commit("SET_SCRIM", payload);
    },
    showSnackbar({ commit }, { text, type = "info", timeout = 6 }) {
        commit("SET_SNACKBAR_TEXT", text);
        commit("SET_SNACKBAR_TYPE", type);
        commit("SET_SNACKBAR_SHOW", true);
        setTimeout(() => commit("SET_SNACKBAR_SHOW", false), timeout);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
