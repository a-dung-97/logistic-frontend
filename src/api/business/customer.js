import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/customers",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/customers",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/customers/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/customers/${id}`,
        method: "delete"
    });
}
export function updateScraps(id, data) {
    return request({
        url: `/customers/${id}/scraps`,
        method: "put",
        data
    });
}
export function getScraps(id) {
    return request({
        url: `/customers/${id}/scraps`,
        method: "get"
    });
}
export function deleteScrap(customerId, scrapId) {
    return request({
        url: `/customers/${customerId}/scraps/${scrapId}`,
        method: "delete"
    });
}
