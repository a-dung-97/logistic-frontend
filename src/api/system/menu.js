import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/menus",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/menus",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/menus/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/menus/${id}`,
        method: "delete"
    });
}
