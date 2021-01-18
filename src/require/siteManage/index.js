//小区管理请求
import ajax from "../ajax";

/*
 * 获取小区详情
 */
export const getAreaDetails = function(data) {
    return ajax({
        url: "/areaData/areaDetails",
        data: data,
    });
};

/*
 * 修改小区名下合伙人的分成比
 */
export const editBindAreaPartner = function(data) {
    return ajax({
        url: "/areaData/editBindAreaPartner",
        data: data,
    });
};

/*
 * 绑定小区合伙人
 */
export const bindAreaPartner = function(data) {
    return ajax({
        url: "/areaData/bindAreaPartner",
        data: data,
    });
};

/*
 * 删除小区合伙人
 */
export const removeAreaPartner = function(data) {
    return ajax({
        url: "/areaData/removeAreaPartner",
        data: data,
    });
};

/*
 * 修改设备名
 */
export const editDeviceName = function(data) {
    return ajax({
        url: "/deviceData/editDeviceName",
        data: data,
    });
};

/*
 * 删除小区中的设备
 */
export const delAreaCode = function(data) {
    return ajax({
        url: "/areaData/delAreaCode",
        data: data,
    });
};

/*
 * 小区中添加设备
 */
export const addAreaCode = function(data) {
    return ajax({
        url: "/areaData/addAreaCode",
        data: data,
    });
};

/*
 * 修改小区名/地址
 */
export const editAreaInfo = function(data) {
    return ajax({
        url: "/areaData/editAreaInfo",
        data: data,
    });
};

/*
 * 获取小区详情下的在线卡模板/钱包模板
 */
export const dealAllTemp = function(data) {
    return ajax({
        url: "/areaData/dealAllTemp",
        data: data,
    });
};

/*
 * 添加小区详情下的在线卡主模板
 */
export const addstaironline = function(data) {
    return ajax({
        url: "/wctemplate/addstaironline",
        data: data,
    });
};

/*
 * 添加小区详情下的钱包主模板
 */
export const addstairwallet = function(data) {
    return ajax({
        url: "/wctemplate/addstairwallet",
        data: data,
    });
};

// * 获取站点列表
export const getCommunInfo = function(data) {
    return ajax({
        url: "/area/areaManageData",
        data: data,
        method: "post",
    });
};

// * 获取单个站点
export const selectAreaById = function(data) {
    return ajax({
        url: "/area/selectAreaById",
        data: data,
        method: "post",
    });
};

//  * 删除站点
export const delCommunInfo = function(data) {
    return ajax({
        url: "/area/deleteByArea",
        data: data,
    });
};

//  * 新增站点
export const addCommunInfo = function(data) {
    return ajax({
        url: "/area/insertByParame",
        data: data,
        method: "post",
    });
};

//  * 修改站点
export const updateCommunInfo = function(data) {
    return ajax({
        url: "/area/updateByParame",
        data: data,
        method: "post",
    });
};

//  * 计费版本下拉框
export const selectBillver = function(data) {
    return ajax({
        url: "/area/selectAllTemplateParent",
        data: data,
    });
};
