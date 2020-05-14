import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/action-groups",
        method: "get",
        params
    });
}
export function detail(params) {
    return request({
        url: "/action-groups/detail",
        method: "get"
    });
}
export function store(data) {
    return request({
        url: "/action-groups",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/action-groups/${id}`,
        method: "put",
        data
    });
}
// export function updateMenu(data, id) {
//     return request({
//         url: `/action-groups/${id}/menu`,
//         method: "put",
//         data
//     });
// }
// export function getMenus(id) {
//     return request({
//         url: `/action-groups/${id}/menu`,
//         method: "get"
//     });
// }

// export function getMenuList(params) {
//     return request({
//         url: "/menus",
//         method: "get",
//         params
//     });
// }
export function destroy(id) {
    return request({
        url: `/action-groups/${id}`,
        method: "delete"
    });
}
