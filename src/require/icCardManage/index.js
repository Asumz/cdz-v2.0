//IC卡管理请求
import ajax from '../ajax'

/**
 * 获取在线卡卡信息
 */
export const getIcCardInfo= function (data){ 
    return ajax({
             url: '/orderData/orderOnlineCardData',
             data: data
         })
}

/**
 * 获取在线卡操作记录
 */
export const getOrderOnlineOperateData= function (data){ 
    return ajax({
             url: '/orderData/orderOnlineOperateData',
             data: data
         })
}


/**
 * 获取在线卡消费记录
 */
export const getOrderOnlineCardRecordData= function (data){ 
    return ajax({
             url: '/orderData/orderOnlineCardRecordData',
             data: data
         })
}
