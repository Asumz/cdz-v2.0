import ajax from "../ajax";

// 查询使用帮助下拉框列表
export const selectUseHelp = data =>
    ajax({
        url: "/personal/system/personal/selectUseHelp",
        data: data,
        method: 'post'
    });

// 查询使用帮助内容
export const selectUseHelpById = data =>
    ajax({
        url: "/personal/system/personal/selectUseHelpById",
        data: data,
        method: 'post'
    });

// 新增/修改 使用帮助
export const insertOrupdateHelp = data =>
    ajax({
        url: "/personal/system/personal/insertOrupdateHelp",
        data: data,
        method: "post",
    });

// 查询关于我们
export const selectAbout = data =>
    ajax({
        url: "/personal/system/personal/selectAbout",
        data: data,
    });

// 编辑 关于我们
export const inOrUpAboutInfo = data =>
    ajax({
        url: "/personal/system/personal/inOrUpAboutInfo",
        data: data,
        method: "post",
    });

// 查询 用户协议
export const selectAgreeement = data =>
    ajax({
        url: "/personal/system/personal/selectAgreeement",
        data: data,
    });

// 新增(修改) 用户协议
export const updateOrInsertAgreement = data =>
    ajax({
        url: "/personal/system/personal/updateOrInsertAgreement",
        data: data,
        method: "post",
    });
