//用户管理请求
import ajax from "../ajax";

export const handleMerInfo = function(data) {
    //请求 商户信息
    return ajax({
        url: "/AccountInfo/getDealerListInfo",
        data: data,
    });
};

export const handleMerInfoSet = function(data) {
    //请求 商户信息中的设置信息
    return ajax({
        url: "/allowAuthority/selectMessSwitch",
        data: data,
    });
};

/**
 *
 *  设置 商户信息中的设置信息
 */
export const setMerInfoSetInfo = function(data) {
    return ajax({
        url: "/allowAuthority/settingSwitch",
        data: data,
    });
};

/**
 * 修改提现费率
 */
export const updataFeerate = function(data) {
    return ajax({
        url: "/AccountInfo/editDealerPersonRate",
        data: data,
    });
};

/**
 * 修改对公账户提现费率
 */
export const updataRate = function(data) {
    return ajax({
        url: "/AccountInfo/editDealerCorporateRate",
        data: data,
    });
};

/**
 * 商户收益信息
 */

export const merEarnDetail = function(data) {
    return ajax({
        url: "/AccountInfo/dealerEarningsDetail",
        data: data,
    });
};

/**
 * 商户银行卡信息
 */

export const merBankInfo = function(data) {
    return ajax({
        url: "/AccountInfo/dealerBankCardData",
        data: data,
    });
};

/**
 * 查询包月信息记录
 */

export const getUserMonthlyInfo = function(data) {
    return ajax({
        url: "/AccountInfo/inquireMonthlyData",
        data: data,
    });
};

/**
 * 查询用户钱包详情
 */

export const getUserWalletDetail = function(data) {
    return ajax({
        url: "/AccountInfo/touristWalletData",
        data: data,
    });
};

/**
 * 查询用户在线卡信息
 */

export const getUserOnlineCardInfo = function(data) {
    return ajax({
        url: "/AccountInfo//inquireTouristOnlineData",
        data: data,
    });
};

/**
 * 查询用户管理的操作信息
 */

export const getUserHandleInfo = function(data) {
    return ajax({
        url: "/AccountInfo/accountOperateInfo",
        data: data,
    });
};

/**
 * 商户订单收益明细
 */

export const getDealerEarningsOrderDetail = function(data) {
    return ajax({
        url: "/AccountInfo/dealerEarningsOrderDetail",
        data: data,
    });
};

/**
 * 获取商户缴费模板
 */

export const getMerPayTem = function(data) {
    return ajax({
        url: "/AccountInfo/getListFeescale",
        data: data,
    });
};

/**
 * 修改商家缴费模板收费标准
 */

export const updateMerPayTem = function(data) {
    return ajax({
        url: "/AccountInfo/updateMerFeescale",
        data: data,
    });
};

/**
 * 修改商家授权
 */

export const updatesetAgent = function(data) {
    return ajax({
        url: "/AccountInfo/setAgent",
        data: data,
    });
};

/**
 * 查询代理商列表
 */

export const selectAgent = function(data) {
    return ajax({
        url: "/AccountInfo/selectAgent",
        data: data,
    });
};

/**
 * 通过id查询代理商详情信息
 */

export const selectAgentUnderMer = function(data) {
    return ajax({
        url: "/AccountInfo/selectAgentUnderMer",
        data: data,
    });
};

/**
 * 通过id查询代理商详情信息
 */

export const selectMerinfoByid = function(data) {
    return ajax({
        url: "/deviceData/searchDealerDeviceData",
        data: data,
    });
};

/**
 * 通过id查询商戶名信息
 */

export const selectMerDetailByMerid = function(data) {
    return ajax({
        url: "/AccountInfo/getDealerInfo",
        data: data,
    });
};

/**
 * 转移商户下的财产到另一商户
 */

export const transformMerToMer = function(data) {
    return ajax({
        url: "/deviceData/deviceDataTransfer",
        data: data,
    });
};

/**
 * 添加、修改，删除特约商户
 */

export const configMchidapi = function(data) {
    return ajax({
        url: "/AccountInfo/configMchid",
        data: data,
        method: "post",
    });
};

/**
 * 商户实名认证接口
 */

export const setMername = function(data) {
    return ajax({
        url: "/AccountInfo/setMername",
        data: data,
        method: "post",
    });
};

/**
 * 获取子账户列表
 */

export const getSubAccountList = function(data) {
    return ajax({
        url: "/AccountInfo/getBypassAccountData",
        data: data,
        method: "post",
    });
};

/**
 * 操作子商户
 */

export const handleSubAccount = function(data) {
    return ajax({
        url: "/AccountInfo/addOrDelChileUser",
        data: data,
        method: "post",
    });
};

/**
 * 检验商户是否有设备或是合伙人
 */

export const verifyMerchIsUser = function(data) {
    return ajax({
        url: "/merchant/verifyMerchIsUser",
        data: data,
        method: "post",
    });
};

/**
 * 更改商户权限
 */

export const editAccountType = function(data) {
    return ajax({
        url: "/merchant/editAccountType",
        data: data,
        method: "post",
    });
};

// * 用户信息
export const getUserInfo = function(data) {
    return ajax({
        url: "/user/getAccountListInfo",
        data: data,
    });
};

// lzh 用户信息 > 明细 > 公共信息
export const getUserBalance = function(data) {
    return ajax({
        url: "/user/getUserBalance",
        data: data,
        method: 'post'
    });
};

// lzh 用户信息 > 余额明细
export const getUserBalanceChangeRecord = function(data) {
    return ajax({
        url: "/user/getUserBalanceChangeRecord",
        data: data,
        method: 'post'
    });
};

// lzh 用户信息 > 充电明细
export const queryChargeRecordCopy = function(data) {
    return ajax({
        url: "/user/queryChargeRecordCopy",
        data: data,
        method: 'post'
    });
};

// lzh 新增用户
export const createUser = function(data) {
    return ajax({
        url: "/user/createUser",
        data: data,
        method: 'post'
    });
};

// * 查询桩主列表
export const queryMeruserlist = function(data) {
    return ajax({
        url: "/meruser/queryMeruserlist",
        data: data,
    });
};

// * 添加桩主
export const insertMeruser = function(data) {
    return ajax({
        url: "/meruser/insertMeruser",
        data: data,
        method: "post",
    });
};

// * 修改桩主
export const updateMeruser = function(data) {
    return ajax({
        url: "/meruser/updateMeruser",
        data: data,
        method: "post",
    });
};

// * 桩主申请记录
export const queryUserOperlist = function(data) {
    return ajax({
        url: "/meruser/queryUserOperlist",
        data: data,
    });
};

// * 审批桩主操作
export const editUserOper = function(data) {
    return ajax({
        url: "/meruser/editUserOper",
        data: data,
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    });
};

// * 通过手机号查询用户
export const queryUserByPhonenum = function(data) {
    return ajax({
        url: "/meruser/queryUserByPhonenum",
        data: data,
    });
};
