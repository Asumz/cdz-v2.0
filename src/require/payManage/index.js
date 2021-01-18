import ajax from "../ajax";

// 查询 普通充值
export const selectPageCommon = function(data) {
    return ajax({
        url: "/charge/selectPageCommon",
        data: data,
    });
};
// 新增 普通充值
export const insertRechargeCommon = function(data) {
    return ajax({
        url: "/charge/insertRechargeCommon",
        data: data,
        method: "post",
    });
};
// 修改 普通充值
export const updateRechargeCommon = function(data) {
    return ajax({
        url: "/charge/updateRechargeCommon",
        data: data,
        method: "post",
    });
};
// 删除 普通充值(根据id)
export const delRechargeCommonById = function(data) {
    return ajax({
        url: "/charge/delRechargeCommonById",
        data: data,
    });
};
