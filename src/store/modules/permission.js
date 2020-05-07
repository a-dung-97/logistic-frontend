import { routes } from '@/router/index'
// import { getMenuList } from '@/api/company/role';
import { setPermissions } from '@/utils/auth'


// function hasPermission(roles, route) {
//     if (route.meta && route.meta.roles) {
//         return roles.some(role => route.meta.roles.includes(role))
//     } else {
//         return true
//     }
// }

// /**
//  * Filter asynchronous routing tables by recursion
//  * @param routes asyncRoutes
//  * @param roles
//  */
// function getPermission(routeName) {
//     let roles = state.permissions.find(permission => permission.name == routeName);
//     if (roles)
//         return roles.roles.map(role => role.id);
//     else return [];
// }
// function addRolesToRoute(routes) {
//     const res = []
//     routes.forEach(route => {
//         const tmp = { ...route }
//         if (tmp.children) {
//             tmp.children = addRolesToRoute(tmp.children)
//         }
//         tmp.meta = { ...tmp.meta, roles: getPermission(tmp.name) };
//         res.push(tmp)
//     })
//     // console.log(res);
//     return res
// }

// export function filterAsyncRoutes(routes, roles) {
//     const res = []
//     // console.log(routes);
//     routes = addRolesToRoute(routes);
//     routes.forEach(route => {
//         const tmp = { ...route }
//         if (hasPermission(roles, tmp)) {
//             if (tmp.children) {
//                 tmp.children = filterAsyncRoutes(tmp.children, roles)

//             }
//             res.push(tmp)
//         }
//     })
//     return res
// }

const state = {
    routes: [],
    permissions: JSON.parse(localStorage.getItem("permissions"))
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.routes = routes
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes
            // if (roles.includes('admin')) accessedRoutes = asyncRoutes;
            // else
            //console.log(asyncRoutes);
            //accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
            accessedRoutes = asyncRoutes;
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    },
    getPermissions({ commit, state }) {
        return new Promise((resolve, reject) => {
            getMenuList().then((result) => {
                commit('SET_PERMISSIONS', result.data)
                setPermissions(JSON.stringify(result.data));
                resolve()
            }).catch((err) => {
                reject(err);
            });
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
