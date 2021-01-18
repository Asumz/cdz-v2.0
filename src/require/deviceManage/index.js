//设备管理请求
import ajax from "../ajax";

/**
 * 设置设备版本号信息
 */
export const setHardversion = function(data) {
    return ajax({
        url: "/deviceData/editDeviceHardversion",
        data: data,
    });
};

/**
 * 重置设备测试次数
 */
export const resetDeviceTestTime = function(data) {
    return ajax({
        url: "/deviceData/resetDeviceTestTime",
        data: data,
    });
};

/**
 * 蓝牙设备信息查询获取
 */
export const getBluetoothList = function(data) {
    return ajax({
        url: "/deviceData/getBluetoothDeviceData",
        data: data,
    });
};

/**
 * 查询设备日志
 */
export const getDeviceLogInfo = function(data) {
    return ajax({
        url: "/deviceData/inquireDeviceLogData",
        data: data,
    });
};

/**
 * 查询设备操作日志
 */
export const getDeviceHandleLogInfo = function(data) {
    return ajax({
        url: "/deviceData/inquireDeviceOperationData",
        data: data,
    });
};

/**
 * 获取设备详情信息
 */
export const getDeviceDetailInfo = function(data) {
    return ajax({
        url: "/deviceData/inquireDeviceDetail",
        data: data,
    });
};
/**
 * 获取设备的系统参数
 */
export const getsystemParma = function(data) {
    return ajax({
        url: "/readsysteminfo",
        data: data,
    });
};

/**
 * 保存设备的系统参数
 */
export const savesystemParma = function(data) {
    return ajax({
        url: "/equipment/setSysParam",
        data: data,
    });
};

/**
 * 更新端口状态
 */
export const getDeviceStatus = function(data) {
    return ajax({
        url: "/querystate",
        data: data,
        method: "post",
    });
};

/**
 * 锁定端口
 */
export const lockDevicePort = function(data) {
    return ajax({
        url: "/lock",
        data: data,
        method: "post",
    });
};

/**
 * 查询同类型设备
 */
export const getSimilarDevice = function(data) {
    return ajax({
        url: "/deviceData/inquireDeviceData",
        data: data,
    });
};

/**
 * 查询同类型设备(按小区排序)
 */
export const getSimilarDeviceByaid = function(data) {
    return ajax({
        url: "/deviceData/searchDeviceData",
        data: data,
    });
};

/**
 * 设备复用模板
 */
export const setDeviceMulDevice = function(data) {
    return ajax({
        url: "/deviceData/updateDeviceTemplate",
        data: data,
    });
};

/**
 * 端口远程充电
 */
export const remoteChargeByPort = function(data) {
    return ajax({
        url: "/testpaytoport",
        data: data,
        method: "post",
    });
};

/**
 * 端口远程断电
 */
export const remoteChargeBreakOff = function(data) {
    return ajax({
        url: "/stopRechargeByPort",
        data: data,
        method: "post",
    });
};

/**
 * 更新地图位置信息
 */
export const updateMapPosition = function(data) {
    return ajax({
        url: "/getLocationBySendData",
        data: data,
        method: "post",
    });
};

/**
 * 修改设备到期时间
 */
export const updateDeviceExpire = function(data) {
    return ajax({
        url: "/deviceData/setExpire",
        data: data,
        method: "post",
    });
};

/**
 * 修改设备的名称
 */
export const updateDeviceName = function(data) {
    return ajax({
        url: "/deviceData/editDeviceName",
        data: data,
        method: "post",
    });
};

/**
 * 修改主板信息
 */
export const getBoardInfoRotate = function(data) {
    return ajax({
        url: "/wolfmaininfo",
        data: data,
        method: "post",
    });
};

/**
 * 设置参数 （主板）
 */
export const getWolfsetsys = function(data) {
    return ajax({
        url: "/wolfsetsys",
        data: data,
        method: "post",
    });
};

/**
 * 读取参数 （主板）
 */
export const getWolfreadsys = function(data) {
    return ajax({
        url: "/wolfreadsys",
        data: data,
        method: "post",
    });
};

/**
 * 开始充电 （主板）
 */
export const getWolftestpay = function(data) {
    return ajax({
        url: "/wolftestpay",
        data: data,
        method: "post",
    });
};

/**
 * 升级通知 （主板）
 */
export const sendUpdataTip = function(data) {
    return ajax({
        url: "/updradeInform",
        data: data,
        method: "post",
    });
};

/**
 * 发送升级程序（主板）
 */
export const sendUpdataInfo = function(data) {
    return ajax({
        url: "/updradeDataSend",
        data: data,
        method: "post",
    });
};

/**
 * 更换设备IMEI号
 */
export const changeDeviceIMEI = function(data) {
    return ajax({
        url: "/deviceData/transpositionImei",
        data: data,
        method: "post",
    });
};

/**
 * 更换设备号
 */
export const changeDeviceCode = function(data) {
    return ajax({
        url: "/deviceData/customizationCode",
        data: data,
        method: "post",
    });
};

/**
 * 设置报警系统值
 */
export const setDeviceAlarm = function(data) {
    return ajax({
        url: "/setDeviceArgument",
        data: data,
        method: "post",
    });
};

/**
 * 获取当前报警系统值
 */
export const getNowDeviceAlarm = function(data) {
    return ajax({
        url: "/getDeviceNowArgument",
        data: data,
        method: "post",
    });
};

/**
 * 获取设置的报警系统值
 */
export const getDeviceSetAlarm = function(data) {
    return ajax({
        url: "/getDeviceSetArgument",
        data: data,
        method: "post",
    });
};

/**
 * 获取设置的报警系统值
 */
export const wolfConstomSendData = function(data) {
    return ajax({
        url: "/wolfConstomSendData",
        data: data,
        method: "post",
    });
};

/**
 * 导出设备列表
 */
export const exportDeviceData = function(data) {
    return ajax({
        url: "/deviceData/exportDeviceData",
        data: data,
        method: "post",
    });
};

// * 添加设备列表信息
export const addDeviceList = function(data) {
    return ajax({
        url: "/equipmentNew/insetDevice",
        data: data,
        method: "post",
    });
};

// * 修改设备列表信息
export const updateDeviceList = function(data) {
    return ajax({
        url: "/equipmentNew/updateDevice",
        data: data,
        method: "post",
    });
};

//  * 删除设备列表信息
export const delDeviceList = function(data) {
    return ajax({
        url: "/equipmentNew/delEquipmentNewById",
        data: data,
    });
};

//  * 获取所有站点下拉框
export const selectAllArea = function() {
    return ajax({
        url: "/equipmentNew/selectAllArea",
    });
};

//  * 判断设备编号是否存在
export const selectDeviceExist = function(data) {
    return ajax({
        url: "/equipmentNew/selectDeviceExsit",
        data,
    });
};

// * 获取设备列表信息
export const getDeviceList = function(data) {
    return ajax({
        url: "/equipmentNew/getDeviceData",
        data: data,
    });
};

// * 设备关联桩主查询
export const queryMeruserDevice = function(data) {
    return ajax({
        url: "/equipmentNew/queryMeruserDevice",
        data: data,
    });
};

// * 修改设备分润
export const editMeruserDevice = function(data) {
    return ajax({
        url: "/equipmentNew/editMeruserDevice",
        data: data,
        method: "post",
    });
};

// * 添加关联
export const addMeruserDevice = function(data) {
    return ajax({
        url: "/equipmentNew/addMeruserDevice",
        data: data,
        method: "post",
    });
};

// * 解除关联
export const removeMeruserDevice = function(data) {
    return ajax({
        url: "/equipmentNew/removeMeruserDevice",
        data: data,
        method: "post",
    });
};
