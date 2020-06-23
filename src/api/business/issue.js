import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/issues",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/issues",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/issues/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/issues/${id}`,
        method: "delete"
    });
}
