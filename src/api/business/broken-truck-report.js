import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/broken-truck-reports",
        method: "get",
        params
    });
}
export function approve(id, data) {
    return request({
        url: `/broken-truck-reports/${id}/approve`,
        method: "put",
        data
    });
}
