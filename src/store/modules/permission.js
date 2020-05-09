import { asyncRoutes } from "@/router/index";
// import { getMenuList } from '@/api/company/role';
import { setPermissions } from "@/utils/auth";

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

export function filterAsyncRoutes(asyncRoutes, routes) {
    return asyncRoutes.filter(item => {
        return routes.includes(item.name);
    });
}

const state = {
    // permissions: []
};

const mutations = {
    // SET_PERMISSIONS: (state, permissions) => {
    //     state.permissions = permissions;
    // }
};

const actions = {
    generateRoutes({ commit }, menus) {
        return new Promise(resolve => {
            let accessedRoutes = [
                {
                    path: "/",
                    component: () => import("@/layouts/dashboard/Index"),
                    children: asyncRoutes
                },
                {
                    path: "*",
                    redirect: "/404"
                }
            ];
            resolve(accessedRoutes);
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
