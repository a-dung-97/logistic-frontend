import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/roles",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/roles",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/roles/${id}`,
        method: "put",
        data
    });
}
export function updateActions(id, data) {
    return request({
        url: `/roles/${id}/actions`,
        method: "put",
        data
    });
}
// export function getMenus(id) {
//     return request({
//         url: `/roles/${id}/menu`,
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
        url: `/roles/${id}`,
        method: "delete"
    });
}
