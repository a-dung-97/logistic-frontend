import request from "@/utils/request";

export function login(data) {
    return request({
        url: "/auth/login",
        method: "post",
        data
    });
}

export function getInfo(token) {
    return request({
        url: "/auth/me",
        method: "post"
    });
}

export function logout() {
    return request({
        url: "/auth/logout",
        method: "post"
    });
}
export function refreshToken() {
    return request({
        url: "/auth/refresh",
        method: "post"
    });
}
export function index(params) {
    return request({
        url: "/users",
        method: "get",
        params
    });
}
export function update(id, data) {
    return request({
        url: `/users/${id}`,
        method: "put",
        data
    });
}
export function destroy(id) {
    return request({
        url: `/users/${id}`,
        method: "delete"
    });
}
