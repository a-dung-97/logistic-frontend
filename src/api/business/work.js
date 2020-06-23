import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/works",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/works",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/works/${id}`,
        method: "put",
        data
    });
}
export function coordinate(id, data) {
    return request({
        url: `/works/${id}/coordinate`,
        method: "post",
        data
    });
}
export function cancel(id) {
    return request({
        url: `/works/${id}/cancel`,
        method: "post"
    });
}
export function cancelTask(id) {
    return request({
        url: `/tasks/${id}/cancel`,
        method: "put"
    });
}
export function getTasks(id) {
    return request({
        url: `/works/${id}/tasks`,
        method: "get"
    });
}
export function getRouteLists(params) {
    return request({
        url: `route-lists`,
        method: "get",
        params
    });
}
export function saveToWarehouse(data) {
    return request({
        url: `route-lists`,
        method: "get",
        data
    });
}
