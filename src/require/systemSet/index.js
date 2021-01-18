//系统设置请求
import ajax from '../ajax'

/**
 * 获取小区信息
 */
export const getSystemSetInfo= function (data){ 
    return ajax({
             url: '/systemSetting/systemTemplateData',
             data: data
         })
}

/**
 * 修改商户缴费系统模板
 */
export const updateSystemMerPay= function (data){ 
    return ajax({
             url: '/systemSetting/updateSystemFeescale',    
             data: data
         })
}

/**
 * 修改充电配置信息
 */
export const changeChargeInfo= function (data){ 
    return ajax({
             url: '/setTimerTaskSys/setOfflineTime',    
             data: data,
             method: 'post'
         })
}

//  * 查询管理员列表
export const selectAdminList= function (data){ 
    return ajax({
             url: '/user/selectAdminlist',    
             data: data,
         })
}

//  * 修改管理员信息
export const editAdmin= function (data){ 
    return ajax({
             url: '/user/editAdmin',    
             data: data,
             method: 'post'
         })
}

//  * 添加管理员
export const addAdmin= function (data){ 
    return ajax({
             url: '/user/addAdmin',    
             data: data,
             method: 'post'
         })
}

//  * 查询管理员权限
export const selectAdminMenu= function (data){ 
    return ajax({
             url: '/user/selectSetAdminMenu',    
             data: data,
         })
}

//  * 修改管理员权限
export const updateAdminMenu= function (data){ 
    return ajax({
             url: '/user/updateAdminMenu',    
             data: data,
             method: 'post'
         })
}

//  * 查询管理员权限(渲染左侧菜单栏)
export const getSlide= function (data){ 
    return ajax({
             url: '/user/selectAdminMenu',    
             data: data,
         })
}