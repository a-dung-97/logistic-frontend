import request from "@/utils/request";

export function index(params) {
    return request({
        url: "/report",
        method: "get",
        params
    });
}
