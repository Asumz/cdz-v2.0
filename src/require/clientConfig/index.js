import ajax from "../ajax";

// 建议反馈
export const selectFeedback = data =>
    ajax({
        url: "/personal/system/personal/selectFeedback",
        data: data,
    });

// 查询 车辆类型
export const selectCarType = data =>
    ajax({
        url: "/car/selectCarType",
        data: data,
    });

// 新增 车辆类型
export const insertCarType = data =>
    ajax({
        url: "/car/insertCarType",
        data: data,
        method: "post",
    });

// 修改 车辆类型
export const updateCarType = data =>
    ajax({
        url: "/car/updateCarType",
        data: data,
        method: "post",
    });

// 删除 车辆类型
export const delCarType = data =>
    ajax({
        url: "/car/delCarType",
        data: data,
    });

// 查询 服务电话
export const phoneManageData = data =>
    ajax({
        url: "/serve/phoneManageData",
        data: data,
    });

// 新增 服务电话
export const insertByParame = data =>
    ajax({
        url: "/serve/insertByParame",
        data: data,
        method: "post",
    });

// 修改 服务电话
export const updateByParame = data =>
    ajax({
        url: "/serve/updateByParame",
        data: data,
        method: "post",
    });

// 删除 服务电话
export const deleteById = data =>
    ajax({
        url: "/serve/deleteById",
        data: data,
    });

// 查询 系统消息
export const selectSysMessage = data =>
    ajax({
        url: "/message/selectSysMessage",
        data: data,
    });

// 新增 系统消息
export const insertSysMessage = data =>
    ajax({
        url: "/message/insertSysMessage",
        data: data,
        method: "post",
    });

// 修改 系统消息
export const updateSysMessage = data =>
    ajax({
        url: "/message/updateSysMessage",
        data: data,
        method: "post",
    });

// 删除 系统消息
export const delSysMessage = data =>
    ajax({
        url: "/message/delSysMessage",
        data: data,
    });

// 查询 新闻资讯
export const selectArticleList = data =>
    ajax({
        url: "/article/selectArticleList",
        data: data,
    });

// 新增 新闻资讯
export const insertArticle = data =>
    ajax({
        url: "/article/insertArticle",
        data: data,
        method: "post",
    });

// 修改 新闻资讯
export const updateArticle = data =>
    ajax({
        url: "/article/updateArticle",
        data: data,
        method: "post",
    });

// 删除 新闻资讯
export const delArticle = data =>
    ajax({
        url: "/article/delArticle",
        data: data,
    });

// 查询 版本内容
export const getApkVersionList = data =>
    ajax({
        url: "/personal/getApkVersionList",
        data: data,
    });

// 新增 版本内容
export const addApk = data =>
    ajax({
        url: "/personal/addApk",
        data: data,
        method: "post",
    });

// 修改 版本内容
export const updateApk = data =>
    ajax({
        url: "/personal/updateApk",
        data: data,
        method: "post",
    });
