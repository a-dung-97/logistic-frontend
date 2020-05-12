import { login, logout, getInfo } from "@/api/system/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const state = {
    token: getToken(),
    name: "",
    id: "",
    roles: [],
    menus: [],
    routes: [],
    phone_number: "",
    username: "",
    email: "",
    home_url: ""
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ID: (state, id) => {
        state.id = id;
    },
    SET_USERNAME: (state, username) => {
        state.username = username;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_MENUS: (state, menus) => {
        state.menus = menus;
    },
    SET_ROUTES: (state, routes) => {
        state.routes = routes;
    },
    SET_PHONE_NUMBER: (state, phone_number) => {
        state.phone_number = phone_number;
    },
    SET_EMAIL: (state, email) => {
        state.email = email;
    },
    SET_HOME_URL: (state, home_url) => {
        state.home_url = home_url;
    }
};

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password })
                .then(response => {
                    commit("SET_TOKEN", response.access_token);
                    setToken(response.access_token);
                    resolve(response.access_token);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then(response => {
                    const { data } = response;

                    if (!data) {
                        reject("Verification failed, please Login again.");
                    }

                    const {
                        id,
                        roles,
                        name,
                        phone_number,
                        email,
                        username,
                        menus,
                        routes,
                        home_url
                    } = data;

                    // roles must be a non-empty array
                    if (!roles || roles.length <= 0) {
                        reject("getInfo: roles must be a non-null array!");
                    }

                    commit("SET_ROLES", roles);
                    commit("SET_MENUS", menus);
                    commit("SET_ROUTES", routes);
                    commit("SET_NAME", name);
                    commit("SET_USERNAME", username);
                    commit("SET_ID", id);
                    commit("SET_PHONE_NUMBER", phone_number);
                    commit("SET_EMAIL", email);
                    commit("SET_HOME_URL", home_url);
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    // user logout
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout()
                .then(() => {
                    commit("SET_TOKEN", "");
                    commit("SET_ROLES", []);
                    removeToken();
                    resetRouter();
                    resolve();
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resetRouter();
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
