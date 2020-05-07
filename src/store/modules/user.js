import { login, logout, getInfo } from '@/api/system/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    id: '',
    roles: [],
    company: '',
    phone_number: '',
    department: '',
    position: '',
    email: '',
    tiny_drive_token: "",
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_COMPANY: (state, company) => {
        state.company = company
    },
    SET_PHONE_NUMBER: (state, phone_number) => {
        state.phone_number = phone_number
    },
    SET_POSITION: (state, position) => {
        state.position = position
    },
    SET_DEPARTMENT: (state, department) => {
        state.department = department
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    },
    SET_TINY_DRIVE_TOKEN: (state, tiny_drive_token) => {
        state.tiny_drive_token = tiny_drive_token
    },
}

const actions = {
    login({ commit }, userInfo) {
        const { email, password } = userInfo
        return new Promise((resolve, reject) => {

            login({ email: email.trim(), password: password }).then(response => {
                commit('SET_TOKEN', response.access_token)
                setToken(response.access_token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject('Verification failed, please Login again.')
                }

                const { id, roles, name, avatar, company, phone_number, department, position, email, tiny_drive_token } = data

                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_ID', id)
                commit('SET_AVATAR', avatar)
                commit('SET_COMPANY', company)
                commit('SET_PHONE_NUMBER', phone_number)
                commit('SET_DEPARTMENT', department)
                commit('SET_POSITION', position)
                commit('SET_EMAIL', email)
                commit('SET_TINY_DRIVE_TOKEN', tiny_drive_token)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

