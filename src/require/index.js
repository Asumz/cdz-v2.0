import ajax from './ajax'
// const base_url= 'http://192.168.3.45:8888/manage'
// const base_url= 'http://127.0.0.1/webenter/enterindex'
// export const handleLogin= function (data){ //处理login
//     return ajax({
//              url: '/login',
//              data: data
//          })
// }
export const handleLogin= function (data){ //处理login
    // console.log(data)
    return ajax({
             url: '/login/accountEnter',
             data: data,
             method: 'post',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
             }
         })
}

export const handleMessageLogin= function (data){ //获取短信登录验证码
    return ajax({
             url: '/basicsInfo/getCaptchaData',
             data: data,
             method: 'post'
         })
}

export const handleCaptcha= function (data){ //处理短信登录
    return ajax({
             url: '/webenter/captchaEnter',
             data: data,
             method: 'post'
         })
}

export const handleWXQRcode= function (data){ //将扫描二维码微信回调的数据，发送后台
    return ajax({
             url: '/webenter/wechatEnter',
             data: data,
             method: 'post'
         })
}



export const handleGetMerEarn= function (data){ //处理 商户收益
    return ajax({
             url: '/dataCollectInfo/dealerEarningsData',
             data: data
         })
}

/**
 * 检验密码
 */
export const checkPassword= function (data){
    return ajax({
        url: '/pcadminiStrator/verification',
        data: data
    })
}

/**
 *  
 * 强制绑定小区或商户时查询对应信息
 */ 
 export const getMerOrAreaList= function (data){
    return ajax({
        url: '/AccountInfo/bindingInquireData',
        data: data
    })
}

/**
 *  
 * 强制用户绑定商户
 */ 
export const userBindMer= function (data){
    return ajax({
        url: '/AccountInfo/bindingDealer',
        data: data
    })
}

/**
 *  
 * 强制用户绑定小区
 */ 
export const userBindArea= function (data){
    return ajax({
        url: '/AccountInfo/bindingArea',
        data: data
    })
}

/**
 *  
 * 强制用户解绑商户
 */ 
export const userUnbindMer= function (data){
    return ajax({
        url: '/AccountInfo/unbindDealer',
        data: data
    })
}

/**
 *  
 * 强制用户解绑小区
 */ 
export const userUnbindArea= function (data){
    return ajax({
        url: '/AccountInfo/unbindArea',
        data: data
    })
}

/**
 *  绑定设备
 */ 
export const bindDevice= function (data){
    return ajax({
        url: '/deviceData/bindingDevice',
        data: data
    })
}

/**
 *  解绑设备
 */ 
export const unbindDevice= function (data){
    return ajax({
        url: '/deviceData/disbindingDevice',
        data: data
    })
}

/**
 * 代理商绑定商户
 */
export const merBindAgent= function (data){ 
    return ajax({
             url: '/AccountInfo/bindAgent',
             data: data
         })
}

/**
 * 代理商解绑商户
 */
export const merUnbindAgent= function (data){ 
    return ajax({
             url: '/AccountInfo/removeMer',
             data: data
         })
}


