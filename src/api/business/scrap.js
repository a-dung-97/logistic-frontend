import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/scrap",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/scrap",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/scrap/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/scrap/${id}`,
        method: "delete"
    });
}
