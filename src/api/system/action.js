import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/actions",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/actions",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/actions/${id}`,
        method: "put",
        data
    });
}
// export function updateMenu(data, id) {
//     return request({
//         url: `/actions/${id}/menu`,
//         method: "put",
//         data
//     });
// }
// export function getMenus(id) {
//     return request({
//         url: `/actions/${id}/menu`,
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
        url: `/actions/${id}`,
        method: "delete"
    });
}
