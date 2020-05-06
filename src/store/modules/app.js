const state = {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
    drawer: null,
};
const mutations = {
    SET_BAR_IMAGE(state, payload) {
        state.barImage = payload
    },
    SET_DRAWER(state, payload) {
        state.drawer = payload
    },
    SET_SCRIM(state, payload) {
        state.barColor = payload
    },
};
const actions = {
    setBarImage({ commit }, payload) {
        console.log(payload);
        commit('SET_BAR_IMAGE', payload)
    },
    setDrawer({ commit }, payload) {
        commit('SET_DRAWER', payload)
    },
    setScrim({ commit }, payload) {
        commit('SET_SCRIM', payload)
    },

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
