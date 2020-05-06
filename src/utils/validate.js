/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}
export function validateMobileNumber(rule, value, callback) {

    if (value === "") {
        callback(new Error("Hãy nhập số điện thoại của bạn"));

    } else if (
        !value.match(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
    ) {
        callback(new Error("Số điện thoại bạn nhập không hợp lệ"));
    } else {
        callback();
    }
};
export function validateDomain(rule, value, callback) {

    if (value === "") {
        callback(new Error("Hãy nhập tên miền của bạn"));

    } else if (
        !value.match(
            /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
        )
    ) {
        callback(new Error("Tên miền bạn nhập không hợp lệ"));
    } else {
        callback();
    }
}
export function validateMobileNumberWithEmptyValue(rule, value, callback) {

    if (value === "" || value === null) {
        callback();

    } else if (
        !value.match(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
    ) {
        callback(new Error("Số điện thoại bạn nhập không hợp lệ"));
    } else {
        callback();
    }
};
export function validatePhoneNumber(rule, value, callback) {

    if (value === "" || value === null || value === undefined) {
        callback();

    } else if (
        !value.match(
            /^\(?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{3})$/
        ) && !value.match(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        )
    ) {
        callback(new Error("Số điện thoại bạn nhập không hợp lệ"));
    } else {
        callback();
    }
};