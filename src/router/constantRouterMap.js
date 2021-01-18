/**这里存放的是路由权限设置 */
// 超级管理员路由
export const constantRouterMapSuperAdmin = [
    // {
    //     path: '/datastatis/total',
    //     name: '数据监控',
    //     component: () => import('@/views/DataStatis/DataTotal'),
    //     meta: {
    //         role: ['superAdmin']
    //     }
    // },
    {
        path: '/',
        component: () => import('@/components/Layout/layout'),
        meta: {
            role: ['superAdmin', 'admin']
        },
        children: [
            {
                path: '/',
                redirect: '/empty'
            },
            {
                path: '/empty',
                name: '空白页面',
                component: () => import('@/views/empty')
            },
            {
                path: '/datastatis/monitor',
                name: '场站地图',
                component: () => import('@/views/DataStatis/DataMonitor'),
                meta: {
                    role: []
                }
            },
            {
                path: '/datastatis/index',
                name: '数据汇总',
                component: () => import('@/views/DataStatis/DataStatis'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/datastatis/hisstatis',
                name: '历史统计',
                component: () => import('@/views/DataStatis/Hisstatis'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/datastatis/deviceearn',
                name: '设备收益',
                component: () => import('@/views/DataStatis/DeviceEarn'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/datastatis/merearn',
                name: '商户收益',
                component: () => import('@/views/DataStatis/MerEarn'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // 用户管理==================>
            {
                path: '/usermanage/merInfo',
                name: '桩主列表',
                component: () => import('@/views/UserManage/MerInfo/MerInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merApply',
                name: '桩主申请记录',
                component: () => import('@/views/UserManage/MerApply/MerApply'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merEarnDetail',
                name: '商户收益信息',
                component: () => import('@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merOrderEarnDetail',
                name: '商户订单收益信息',
                component: () => import('@/views/UserManage/MerInfo/MerOrderEarnDetail/MerOrderEarnDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merBinkInfo',
                name: '商户银行卡信息',
                component: () => import('@/views/UserManage/MerInfo/MerBinkInfo/MerBinkInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/MerInfoDetail',
                name: '商户信息详情',
                component: () => import('@/views/UserManage/MerInfo/MerInfoDetail/MerInfoDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo',
                name: '用户信息',
                component: () => import('@/views/UserManage/UserInfo/UserInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userWalletDetail',
                name: '用户钱包信息',
                component: () => import('@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userOrderDetail',
                name: '用户订单信息',
                component: () => import('@/views/UserManage/UserInfo/UserOrderDetail/UserOrderDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userWalletRecord',
                name: '用户钱包明细',
                component: () => import('@/views/UserManage/UserInfo/UserWalletRecord/UserWalletRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userOnlineCardInfo',
                name: '用户在线卡信息',
                component: () => import('@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userHandleInfo',
                name: '用户操作信息',
                component: () => import('@/views/UserManage/UserHandleInfo/UserHandleInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/agentManage',
                name: '代理商信息',
                component: () => import('@/views/UserManage/AgentManage/AgentManage'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/usermanage/subAccount',
                name: '子账号信息',
                component: () => import('@/views/UserManage/SubAccount'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/usermanage/agentManage/agentManageDetail',
                name: '代理商详情',
                component: () => import('@/views/UserManage/AgentManage/AgentManageDetail/AgentManageDetail'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 用户管理 <==================
            //  交易记录TradeRecord
            {
                path: '/tradeRecord/tradeRecordCon',
                name: '交易记录',
                component: () => import('@/views/TradeRecord/TradeRecordCon/TradeRecordCon'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/tradeRecordCon/orderDetail',
                name: '订单详情',
                component: () => import('@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/chargeRecord',
                name: '充电记录',
                component: () => import('@/views/TradeRecord/ChargeRecord/ChargeRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/chargeRecord/chargeRecordDetail',
                name: '充电详情',
                component: () => import('@/views/TradeRecord/ChargeRecord/ChargeRecordDetail/ChargeRecordDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/offlineCardRecord',
                name: '离线卡记录',
                component: () => import('@/views/TradeRecord/OfflineCardRecord/OfflineCardRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/coinRecord',
                name: '投币记录',
                component: () => import('@/views/TradeRecord/CoinRecord/CoinRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/monthlyRecord',
                name: '包月记录',
                component: () => import('@/views/TradeRecord/MonthlyRecord/MonthlyRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/cashManage',
                name: '提现管理',
                component: () => import('@/views/TradeRecord/CashManage/CashManage'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/tradeRecord/walletRecord',
                name: '钱包记录',
                component: () => import('@/views/TradeRecord/WalletRecord/WalletRecord'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/tradeRecord/feescaleRecord',
                name: '缴费记录',
                component: () => import('@/views/TradeRecord/FeescaleRecord/FeescaleRecord'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/tradeRecord/feescaleRecord/feescaleRecordDetail',
                name: '缴费详情',
                component: () => import('@/views/TradeRecord/FeescaleRecord/FeescaleRecordDetail/FeescaleRecordDetail'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 交易记录
            // 设备管理

            {
                path: '/deviceManage/deviceList',
                name: '设备列表',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceList'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList',
                name: '蓝牙设备',
                component: () => import('@/views/DeviceManage/BluetoothList/BluetoothList'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceLog',
                name: '设备日志',
                component: () => import('@/views/DeviceManage/DeviceLog/DeviceLog'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/handleLog',
                name: '操作日志',
                component: () => import('@/views/DeviceManage/HandleLog/HandleLog'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/deviceDetail',
                name: '设备详情',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceDetail/DeviceDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/merDetail',
                name: '关联桩主',
                component: () => import('@/views/DeviceManage/DeviceList/MerDetail/MerDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList/deviceDetail',
                name: '蓝牙设备详情',
                component: () => import('@/views/DeviceManage/BluetoothList/DeviceDetail/DeviceDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/temperhistory',
                name: '历史温度',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceDetail/components/AlarmConfig/TemperHistory'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/templateDetail',
                name: '模板详情',
                component: () => import('@/views/DeviceManage/DeviceList/TemplateDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList/templateDetail',
                name: '蓝牙模板详情',
                component: () => import('@/views/DeviceManage/bluetoothList/TemplateDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // 设备管理结束
            // IC卡管理开始
            {
                path: '/iccardManage/onlineCardQuery',
                name: '在线卡查询',
                component: () => import('@/views/ICCardManage/OnlineCardQuery/OnlineCardQuery'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/iccardManage/onlineCardHandle',
                name: '在线卡操作',
                component: () => import('@/views/ICCardManage/OnlineCardHandle/OnlineCardHandle'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/iccardManage/onlineCardConsume',
                name: '在线卡消费',
                component: () => import('@/views/ICCardManage/OnlineCardConsume/OnlineCardConsume'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // IC卡管理结束
            // 站点管理开始
            {
                path: '/communManage/communManageCon',
                name: '站点列表',
                component: () => import('@/views/CommunManage/CommunManageCon/CommunManageCon'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/communManage/communManageCon/comManageDetail',
                name: '小区详情',
                component: () => import('@/views/CommunManage/CommunManageCon/ComManageDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/communManage/communManageCon/tempdetail',
                name: '小区模板详情',
                component: () => import('@/views/CommunManage/CommunManageCon/ComManageDetail/Tempdetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },

            // 站点管理结束
            // 系统设置开始
            {
                path: '/systemSet/systemTem',
                name: '计费模板',
                component: () => import('@/views/SystemSet/SystemTem/SystemTem'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/systemSet/admin',
                name: '管理权限',
                component: () => import('@/views/SystemSet/Admin/Admin'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 系统设置结束
            // 结算收益
            {
                path: '/settlement/index',
                name: '结算收益',
                component: () => import('@/views/Settlement/Settlement'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/settlement/wechartOrder',
                name: '微信订单',
                component: () => import('@/views/Settlement/WechartOrder'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 充值管理开始
            {
                path: '/payManage/generalPay',
                name: '普通充值',
                component: () => import('@/views/PayManage/GeneralPay'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/payManage/activityPay',
                name: '活动充值',
                component: () => import('@/views/PayManage/ActivityPay'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 充值管理结束
            // 客户端配置开始
            {
                path: '/clientConfig/usingHelp',
                name: '使用帮助',
                component: () => import('@/views/ClientConfig/UsingHelp'),
            },
            {
                path: '/clientConfig/aboutUs',
                name: '关于我们',
                component: () => import('@/views/ClientConfig/AboutUs'),
            },
            {
                path: '/clientConfig/feedback',
                name: '意见反馈',
                component: () => import('@/views/ClientConfig/Feedback'),
            },
            {
                path: '/clientConfig/serviceCall',
                name: '服务电话',
                component: () => import('@/views/ClientConfig/ServiceCall'),
            },
            {
                path: '/clientConfig/carType',
                name: '车辆类型',
                component: () => import('@/views/ClientConfig/CarType'),
            },
            {
                path: '/clientConfig/banner',
                name: '轮播图',
                component: () => import('@/views/ClientConfig/banner'),
            },
            // 客户端配置结束
            {
                path: '*',
                component: () => import('@/components/NoFind/NoFind'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },

        ]
    },
]
// 管理员路由
export const constantRouterMapAdmin = [
    {
        path: '/',
        component: () => import('@/components/Layout/layout'),
        meta: {
            role: ['superAdmin', 'admin']
        },
        children: [
            {
                path: '/',
                redirect: '/datastatis/index'
            },
            {
                path: '/datastatis/index',
                name: '数据汇总',
                component: () => import('@/views/DataStatis/DataStatis'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/datastatis/deviceearn',
                name: '设备收益',
                component: () => import('@/views/DataStatis/DeviceEarn'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/datastatis/merearn',
                name: '商户收益',
                component: () => import('@/views/DataStatis/MerEarn'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo',
                name: '商户信息',
                component: () => import('@/views/UserManage/MerInfo/MerInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merEarnDetail',
                name: '商户收益信息',
                component: () => import('@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merOrderEarnDetail',
                name: '商户订单收益信息',
                component: () => import('@/views/UserManage/MerInfo/MerOrderEarnDetail/MerOrderEarnDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merBinkInfo',
                name: '商户银行卡信息',
                component: () => import('@/views/UserManage/MerInfo/MerBinkInfo/MerBinkInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo',
                name: '用户信息',
                component: () => import('@/views/UserManage/UserInfo/UserInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userWalletDetail',
                name: '用户钱包信息',
                component: () => import('@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userOrderDetail',
                name: '用户订单信息',
                component: () => import('@/views/UserManage/UserInfo/UserOrderDetail/UserOrderDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userOnlineCardInfo',
                name: '用户在线卡信息',
                component: () => import('@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userHandleInfo',
                name: '用户操作信息',
                component: () => import('@/views/UserManage/UserHandleInfo/UserHandleInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            //  交易记录TradeRecord
            {
                path: '/tradeRecord/tradeRecordCon',
                name: '交易记录',
                component: () => import('@/views/TradeRecord/TradeRecordCon/TradeRecordCon'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/tradeRecordCon/orderDetail',
                name: '订单详情',
                component: () => import('@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/chargeRecord',
                name: '充电记录',
                component: () => import('@/views/TradeRecord/ChargeRecord/ChargeRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/chargeRecord/chargeRecordDetail',
                name: '充电详情',
                component: () => import('@/views/TradeRecord/ChargeRecord/ChargeRecordDetail/ChargeRecordDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/offlineCardRecord',
                name: '离线卡记录',
                component: () => import('@/views/TradeRecord/OfflineCardRecord/OfflineCardRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/coinRecord',
                name: '投币记录',
                component: () => import('@/views/TradeRecord/CoinRecord/CoinRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/monthlyRecord',
                name: '包月记录',
                component: () => import('@/views/TradeRecord/MonthlyRecord/MonthlyRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/walletRecord',
                name: '钱包记录',
                component: () => import('@/views/TradeRecord/WalletRecord/WalletRecord'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/tradeRecord/feescaleRecord',
                name: '缴费记录',
                component: () => import('@/views/TradeRecord/FeescaleRecord/FeescaleRecord'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/tradeRecord/feescaleRecord/feescaleRecordDetail',
                name: '缴费详情',
                component: () => import('@/views/TradeRecord/FeescaleRecord/FeescaleRecordDetail/FeescaleRecordDetail'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 交易记录
            // 设备管理
            {
                path: '/deviceManage/deviceList',
                name: '设备列表',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceList'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList',
                name: '蓝牙设备',
                component: () => import('@/views/DeviceManage/BluetoothList/BluetoothList'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceLog',
                name: '设备日志',
                component: () => import('@/views/DeviceManage/DeviceLog/DeviceLog'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/handleLog',
                name: '操作日志',
                component: () => import('@/views/DeviceManage/HandleLog/HandleLog'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/deviceDetail',
                name: '设备详情',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceDetail/DeviceDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList/deviceDetail',
                name: '蓝牙设备详情',
                component: () => import('@/views/DeviceManage/BluetoothList/DeviceDetail/DeviceDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/temperhistory',
                name: '历史温度',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceDetail/components/AlarmConfig/TemperHistory'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/templateDetail',
                name: '模板详情',
                component: () => import('@/views/DeviceManage/DeviceList/TemplateDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList/templateDetail',
                name: '蓝牙模板详情',
                component: () => import('@/views/DeviceManage/bluetoothList/TemplateDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // 设备管理结束
            // IC卡管理开始
            {
                path: '/iccardManage/onlineCardQuery',
                name: '在线卡查询',
                component: () => import('@/views/ICCardManage/OnlineCardQuery/OnlineCardQuery'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/iccardManage/onlineCardHandle',
                name: '在线卡操作',
                component: () => import('@/views/ICCardManage/OnlineCardHandle/OnlineCardHandle'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/iccardManage/onlineCardConsume',
                name: '在线卡消费',
                component: () => import('@/views/ICCardManage/OnlineCardConsume/OnlineCardConsume'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // IC卡管理结束

            // 小区管理开始
            {
                path: '/communManage/communManageCon',
                name: '场站管理',
                component: () => import('@/views/CommunManage/CommunManageCon/CommunManageCon'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/communManage/communManageCon/comManageDetail',
                name: '小区详情',
                component: () => import('@/views/CommunManage/CommunManageCon/ComManageDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/communManage/communManageCon/tempdetail',
                name: '小区模板详情',
                component: () => import('@/views/CommunManage/CommunManageCon/ComManageDetail/Tempdetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // 小区管理结束
            {
                path: '*',
                component: () => import('@/components/NoFind/NoFind'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
        ]
    },
]

// 代理商路由
export const constantRouterMapAgent = [
    {
        path: '/',
        component: () => import('@/components/Layout/layout'),
        meta: {
            role: ['superAdmin', 'admin']
        },
        children: [
            {
                path: '/',
                redirect: '/datastatis/index'
            },
            {
                path: '/datastatis/index',
                name: '数据汇总',
                component: () => import('@/views/DataStatis/DataStatis'),
                meta: {
                    role: ['superAdmin']
                }
            },
            {
                path: '/datastatis/deviceearn',
                name: '设备收益',
                component: () => import('@/views/DataStatis/DeviceEarn'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/datastatis/merearn',
                name: '商户收益',
                component: () => import('@/views/DataStatis/MerEarn'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo',
                name: '商户信息',
                component: () => import('@/views/UserManage/MerInfo/MerInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merEarnDetail',
                name: '商户收益信息',
                component: () => import('@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merOrderEarnDetail',
                name: '商户订单收益信息',
                component: () => import('@/views/UserManage/MerInfo/MerOrderEarnDetail/MerOrderEarnDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/merInfo/merBinkInfo',
                name: '商户银行卡信息',
                component: () => import('@/views/UserManage/MerInfo/MerBinkInfo/MerBinkInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo',
                name: '用户信息',
                component: () => import('@/views/UserManage/UserInfo/UserInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userWalletDetail',
                name: '用户钱包信息',
                component: () => import('@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userOrderDetail',
                name: '用户订单信息',
                component: () => import('@/views/UserManage/UserInfo/UserOrderDetail/UserOrderDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userInfo/userOnlineCardInfo',
                name: '用户在线卡信息',
                component: () => import('@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/usermanage/userHandleInfo',
                name: '用户操作信息',
                component: () => import('@/views/UserManage/UserHandleInfo/UserHandleInfo'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            //  交易记录TradeRecord
            {
                path: '/tradeRecord/tradeRecordCon',
                name: '交易记录',
                component: () => import('@/views/TradeRecord/TradeRecordCon/TradeRecordCon'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/tradeRecordCon/orderDetail',
                name: '订单详情',
                component: () => import('@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/chargeRecord',
                name: '充电记录',
                component: () => import('@/views/TradeRecord/ChargeRecord/ChargeRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/chargeRecord/chargeRecordDetail',
                name: '充电详情',
                component: () => import('@/views/TradeRecord/ChargeRecord/ChargeRecordDetail/ChargeRecordDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/offlineCardRecord',
                name: '离线卡记录',
                component: () => import('@/views/TradeRecord/OfflineCardRecord/OfflineCardRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/coinRecord',
                name: '投币记录',
                component: () => import('@/views/TradeRecord/CoinRecord/CoinRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/monthlyRecord',
                name: '包月记录',
                component: () => import('@/views/TradeRecord/MonthlyRecord/MonthlyRecord'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/tradeRecord/walletRecord',
                name: '钱包记录',
                component: () => import('@/views/TradeRecord/WalletRecord/WalletRecord'),
                meta: {
                    role: ['superAdmin']
                }
            },
            // 交易记录
            // 设备管理
            {
                path: '/deviceManage/deviceList',
                name: '设备列表',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceList'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList',
                name: '蓝牙设备',
                component: () => import('@/views/DeviceManage/BluetoothList/BluetoothList'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceLog',
                name: '设备日志',
                component: () => import('@/views/DeviceManage/DeviceLog/DeviceLog'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/handleLog',
                name: '操作日志',
                component: () => import('@/views/DeviceManage/HandleLog/HandleLog'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/deviceDetail',
                name: '设备详情',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceDetail/DeviceDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList/deviceDetail',
                name: '蓝牙设备详情',
                component: () => import('@/views/DeviceManage/BluetoothList/DeviceDetail/DeviceDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/temperhistory',
                name: '历史温度',
                component: () => import('@/views/DeviceManage/DeviceList/DeviceDetail/components/AlarmConfig/TemperHistory'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/deviceList/templateDetail',
                name: '模板详情',
                component: () => import('@/views/DeviceManage/DeviceList/TemplateDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/deviceManage/bluetoothList/templateDetail',
                name: '蓝牙模板详情',
                component: () => import('@/views/DeviceManage/bluetoothList/TemplateDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // 设备管理结束
            // IC卡管理开始
            {
                path: '/iccardManage/onlineCardQuery',
                name: '在线卡查询',
                component: () => import('@/views/ICCardManage/OnlineCardQuery/OnlineCardQuery'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/iccardManage/onlineCardHandle',
                name: '在线卡操作',
                component: () => import('@/views/ICCardManage/OnlineCardHandle/OnlineCardHandle'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/iccardManage/onlineCardConsume',
                name: '在线卡消费',
                component: () => import('@/views/ICCardManage/OnlineCardConsume/OnlineCardConsume'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // IC卡管理结束

            // 小区管理开始
            {
                path: '/communManage/communManageCon',
                name: '场站管理',
                component: () => import('@/views/CommunManage/CommunManageCon/CommunManageCon'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/communManage/communManageCon/comManageDetail',
                name: '小区详情',
                component: () => import('@/views/CommunManage/CommunManageCon/ComManageDetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            {
                path: '/communManage/communManageCon/tempdetail',
                name: '小区模板详情',
                component: () => import('@/views/CommunManage/CommunManageCon/ComManageDetail/Tempdetail'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
            // 小区管理结束
            {
                path: '*',
                component: () => import('@/components/NoFind/NoFind'),
                meta: {
                    role: ['superAdmin', 'admin']
                }
            },
        ]
    },
]