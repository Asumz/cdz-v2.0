import ajax from "../ajax";

// 查询 首单减免
export const queryFristOrderFree = data =>
    ajax({
        url: "/activeManage/queryFristOrderFree",
        data: data,
        method: "post",
    });

// 选择 首单减免
export const selectFristOrderFree = data =>
    ajax({
        url: "/activeManage/selectFristOrderFree",
        data: data,
        method: "post",
    });

// 新增 首单减免
export const createFristOrderFree = data =>
    ajax({
        url: "/activeManage/createFristOrderFree",
        data: data,
        method: "post",
    });

// 修改 首单减免
export const updateFristOrderFree = data =>
    ajax({
        url: "/activeManage/updateFristOrderFree",
        data: data,
        method: "post",
    });

// 修改 首单减免
export const indexPageUpdateFristOrderFree = data =>
    ajax({
        url: "/activeManage/indexPageUpdateFristOrderFree",
        data: data,
        method: "post",
    });

// 删除 首单减免
export const deleteFristOrderFree = data =>
    ajax({
        url: "/activeManage/deleteFristOrderFree",
        data: data,
        method: "post",
    });

// 立即终止 首单减免
export const stopFristOrderFree = data =>
    ajax({
        url: "/activeManage/stopFristOrderFree",
        data: data,
        method: "post",
    });

// 查询 充值优惠
export const selPageActive = function(data) {
    return ajax({
        url: "/charge/selPageActive",
        data: data,
        method: "post",
    });
};
// 新增 充值优惠
export const insertRechargeActive = function(data) {
    return ajax({
        url: "/charge/insertRechargeActive",
        data: data,
        method: "post",
    });
};
// 修改 充值优惠
export const updateRechargeActiveById = function(data) {
    return ajax({
        url: "/charge/updateRechargeActiveById",
        data: data,
        method: "post",
    });
};
// 删除 充值优惠(根据id)
export const delRechargeActiveById = function(data) {
    return ajax({
        url: "/charge/delRechargeActiveById",
        data: data,
        method: 'post'
    });
};
// 立即终止 充值优惠(根据id)
export const terminationRechargeActiveById = function(data) {
    return ajax({
        url: "/charge/terminationRechargeActiveById",
        data: data,
        method: 'post'
    });
};
// 修改金额 充值优惠
export const updateRechargeActiveGive = function(data) {
    return ajax({
        url: "/charge/updateRechargeActiveGive",
        data: data,
        method: 'post'
    });
};

// 查询 优惠券
export const selectPageActive = data =>
    ajax({
        url: "/coupon/selectPageActive",
        data: data,
    });

// 新增 优惠券
export const insertCoupon = data =>
    ajax({
        url: "/coupon/insertCoupon",
        data: data,
        method: "post",
    });

// 修改 优惠券
export const updateCoupon = data =>
    ajax({
        url: "/coupon/updateCoupon",
        data: data,
        method: "post",
    });

// 删除 优惠券
export const deleteCouponById = data =>
    ajax({
        url: "/coupon/deleteById",
        data: data,
    });

