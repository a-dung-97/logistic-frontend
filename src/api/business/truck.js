import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/trucks",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/trucks",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/trucks/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/trucks/${id}`,
        method: "delete"
    });
}
