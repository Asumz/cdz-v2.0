import ajax from '../ajax'

export const handleDataStatis= function (data){ //处理 数据汇总（超级管理员）
    return ajax({
             url: '/dataCollectInfo/dataCollectQuery',
             data: data
         })
}
export const handleDataStatisAdmin= function (data){ //处理 数据汇总(普通管理员)
    return ajax({
             url: '/dataCollectInfo/agentdatacollect',
             data: data
         })
}


export const handleHisStatis= function (data){ //处理 历史统计
    return ajax({
             url: '/dataCollectInfo/historyStatisticsData',
             data: data
         })
}

export const handleGetDeviceEarn= function (data){ //处理 设备收益
    return ajax({
             url: '/dataCollectInfo/deviceEarningsData',
             data: data
         })
}

export const handleExportMerEarn= function (data){ //导出商户收益
    return ajax({
             url: '/dataCollectInfo/dealerEarningsDownload',
             data: data
         })
}

export const getDevicesPosition= function (data){ //获取商户位置信息
    return ajax({
             url: '/dataCollectInfo/locationData',
             data: data,
             method: 'post'
         })
}



/*查询昨日设备收益记录 排行*/ 
export const deviceEvenRank= function (data){ //获取商户位置信息
    return ajax({
             url: '/dataCollectInfo/inquireDeviceIncomeInfo',
             data: data,
             method: 'post'
         })
}

/*查询最近十五天平台交易金额*/ 
export const formIncomeInfo= function (data){ 
    return ajax({
             url: '/dataCollectInfo/inquirePlatformIncomeInfo',
             data: data,
             method: 'post'
         })
}

/*昨日支付占比*/ 
export const paymentratioInfo= function (data){ 
    return ajax({
             url: '/dataCollectInfo/inquirePaymentratioInfo',
             data: data,
             method: 'post'
         })
}

/*监控页面顶部数据*/ 
export const inquireGraphInfo= function (data){ 
    return ajax({
             url: '/dataCollectInfo/inquireGraphInfo',
             data: data,
             method: 'post'
         })
}

/*最近15条实时订单*/ 
export const tradeRealtimeInfo= function (data){ 
    return ajax({
             url: '/dataCollectInfo/tradeRealtimeInfo',
             data: data,
             method: 'post'
         })
}

// * 获取站点地图统计 
export const getMapAreaTotal= function (data){ 
    return ajax({
             url: '/area/getAreaTotal',
             data: data,
         })
}



