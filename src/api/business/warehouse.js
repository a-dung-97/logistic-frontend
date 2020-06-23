import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/warehouses",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/warehouses",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/warehouses/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/warehouses/${id}`,
        method: "delete"
    });
}
