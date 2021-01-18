import ajax from "../ajax";

// lzh 查询 轮播图
export const selectBanner = data =>
    ajax({
        url: "/ad/query",
        data: data,
        method: "post",
    });

// lzh 新增 轮播图
export const insertBanner = data =>
    ajax({
        url: "/ad/create",
        data: data,
        method: "post",
    });

// lzh 修改 轮播图
export const updateBanner = data =>
    ajax({
        url: "/ad/update",
        data: data,
        method: "post",
    });

// lzh 删除 轮播图
export const delBanner = data =>
    ajax({
        url: "/ad/delete",
        data: data,
        method: "post",
    });

// lzh 获取 轮播图位置下拉框
export const getPositions = data =>
    ajax({
        url: "/ad/positions",
        data: data,
        method: "post",
    });