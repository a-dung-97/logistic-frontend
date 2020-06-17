import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/truck-manufacturers",
        method: "get",
        params
    });
}
export function store(data) {
    return request({
        url: "/truck-manufacturers",
        method: "post",
        data
    });
}
export function update(id, data) {
    return request({
        url: `/truck-manufacturers/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/truck-manufacturers/${id}`,
        method: "delete"
    });
}
