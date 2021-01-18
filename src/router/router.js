export default [
    {
        path: "/",
        component: () => import("@/components/Layout/layout"),
        children: [
            {
                path: "/",
                redirect: "/empty",
            },
            {
                path: "/empty",
                name: "空白页面",
                component: () => import("@/views/empty"),
            },
            {
                path: "/datastatis/SiteMap",
                name: "站点地图",
                component: () => import("@/views/DataStatis/SiteMap"),
            },
            {
                path: "/datastatis/index",
                name: "数据汇总",
                component: () => import("@/views/DataStatis/DataStatis"),
            },
            {
                path: "/datastatis/hisstatis",
                name: "历史统计",
                component: () => import("@/views/DataStatis/Hisstatis"),
            },
            {
                path: "/datastatis/deviceearn",
                name: "设备收益",
                component: () => import("@/views/DataStatis/DeviceEarn"),
            },
            {
                path: "/datastatis/merearn",
                name: "商户收益",
                component: () => import("@/views/DataStatis/MerEarn"),
            },
            // ! 用户管理
            {
                path: "/usermanage/merInfo",
                name: "桩主信息",
                component: () => import("@/views/UserManage/MerInfo"),
            },
            {
                path: "/usermanage/merInfo/deviceRecord",
                name: "充电桩明细",
                component: () => import("@/views/UserManage/MerInfo/DeviceRecord"),
            },
            {
                path: "/usermanage/merInfo/edit",
                name: "桩主编辑",
                component: () => import("@/views/UserManage/MerInfo/edit"),
            },
            {
                path: "/usermanage/merApply",
                name: "桩主申请记录",
                component: () => import("@/views/UserManage/MerApply/MerApply"),
            },
            {
                path: "/usermanage/merInfo/merEarnDetail",
                name: "商户收益信息",
                component: () => import("@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail"),
            },
            {
                path: "/usermanage/merInfo/merOrderEarnDetail",
                name: "商户订单收益信息",
                component: () =>
                    import("@/views/UserManage/MerInfo/MerOrderEarnDetail/MerOrderEarnDetail"),
            },
            {
                path: "/usermanage/merInfo/merBinkInfo",
                name: "商户银行卡信息",
                component: () => import("@/views/UserManage/MerInfo/MerBinkInfo/MerBinkInfo"),
            },
            {
                path: "/usermanage/merInfo/MerInfoDetail",
                name: "商户信息详情",
                component: () => import("@/views/UserManage/MerInfo/MerInfoDetail/MerInfoDetail"),
            },
            {
                path: "/usermanage/userInfo",
                name: "用户信息",
                component: () => import("@/views/UserManage/UserInfo/UserInfo"),
            },
            {
                path: "/usermanage/userInfo/userWalletDetail",
                name: "用户钱包信息",
                component: () =>
                    import("@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail"),
            },
            {
                path: "/usermanage/userInfo/userOrderDetail",
                name: "用户订单信息",
                component: () =>
                    import("@/views/UserManage/UserInfo/UserOrderDetail/UserOrderDetail"),
            },
            {
                path: "/usermanage/userInfo/userWalletRecord",
                name: "余额明细",
                component: () =>
                    import("@/views/UserManage/UserInfo/UserWalletRecord/UserWalletRecord"),
            },
            {
                path: "/usermanage/userInfo/userChargeRecord",
                name: "充电明细",
                component: () =>
                    import("@/views/UserManage/UserInfo/UserChargeRecord/UserChargeRecord"),
            },
            {
                path: "/usermanage/userInfo/userOnlineCardInfo",
                name: "用户在线卡信息",
                component: () =>
                    import("@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo"),
            },
            {
                path: "/usermanage/userHandleInfo",
                name: "用户操作信息",
                component: () => import("@/views/UserManage/UserHandleInfo/UserHandleInfo"),
            },
            {
                path: "/usermanage/agentManage",
                name: "代理商信息",
                component: () => import("@/views/UserManage/AgentManage/AgentManage"),
            },
            {
                path: "/usermanage/subAccount",
                name: "子账号信息",
                component: () => import("@/views/UserManage/SubAccount"),
            },
            {
                path: "/usermanage/agentManage/agentManageDetail",
                name: "代理商详情",
                component: () =>
                    import("@/views/UserManage/AgentManage/AgentManageDetail/AgentManageDetail"),
            },
            // ! 订单管理
            {
                path: "/tradeRecord/tradeRecordCon",
                name: "交易记录",
                component: () => import("@/views/TradeRecord/TradeRecordCon/TradeRecordCon"),
            },
            {
                path: "/tradeRecord/tradeRecordCon/orderDetail",
                name: "订单详情",
                component: () =>
                    import("@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail"),
            },
            {
                path: "/tradeRecord/chargeRecord",
                name: "充电记录",
                component: () => import("@/views/TradeRecord/ChargeRecord/ChargeRecord"),
            },
            {
                path: "/tradeRecord/chargeRecord/chargeRecordDetail",
                name: "充电详情",
                component: () =>
                    import(
                        "@/views/TradeRecord/ChargeRecord/ChargeRecordDetail/ChargeRecordDetail"
                    ),
            },
            {
                path: "/tradeRecord/offlineCardRecord",
                name: "离线卡记录",
                component: () => import("@/views/TradeRecord/OfflineCardRecord/OfflineCardRecord"),
            },
            {
                path: "/tradeRecord/coinRecord",
                name: "投币记录",
                component: () => import("@/views/TradeRecord/CoinRecord/CoinRecord"),
            },
            {
                path: "/tradeRecord/monthlyRecord",
                name: "包月记录",
                component: () => import("@/views/TradeRecord/MonthlyRecord/MonthlyRecord"),
            },
            {
                path: "/tradeRecord/cashRecord",
                name: "提现记录",
                component: () => import("@/views/TradeRecord/CashRecord"),
            },
            {
                path: "/tradeRecord/walletRecord",
                name: "充值记录",
                component: () => import("@/views/TradeRecord/WalletRecord/WalletRecord"),
            },
            {
                path: "/tradeRecord/refundRecord",
                name: "退款记录",
                component: () => import("@/views/TradeRecord/RefundRecord"),
            },
            {
                path: "/tradeRecord/feescaleRecord",
                name: "缴费记录",
                component: () => import("@/views/TradeRecord/FeescaleRecord/FeescaleRecord"),
            },
            {
                path: "/tradeRecord/feescaleRecord/feescaleRecordDetail",
                name: "缴费详情",
                component: () =>
                    import(
                        "@/views/TradeRecord/FeescaleRecord/FeescaleRecordDetail/FeescaleRecordDetail"
                    ),
            },
            // ! 设备管理

            {
                path: "/deviceManage/deviceList",
                name: "设备列表",
                component: () => import("@/views/DeviceManage/DeviceList/DeviceList"),
            },
            {
                path: "/deviceManage/bluetoothList",
                name: "蓝牙设备",
                component: () => import("@/views/DeviceManage/BluetoothList/BluetoothList"),
            },
            {
                path: "/deviceManage/deviceLog",
                name: "设备日志",
                component: () => import("@/views/DeviceManage/DeviceLog/DeviceLog"),
            },
            {
                path: "/deviceManage/handleLog",
                name: "操作日志",
                component: () => import("@/views/DeviceManage/HandleLog/HandleLog"),
            },
            {
                path: "/deviceManage/deviceList/deviceDetail",
                name: "设备详情",
                component: () =>
                    import("@/views/DeviceManage/DeviceList/DeviceDetail/DeviceDetail"),
            },
            {
                path: "/deviceManage/deviceList/merDetail",
                name: "关联桩主",
                component: () => import("@/views/DeviceManage/DeviceList/MerDetail/MerDetail"),
            },
            {
                path: "/deviceManage/bluetoothList/deviceDetail",
                name: "蓝牙设备详情",
                component: () =>
                    import("@/views/DeviceManage/BluetoothList/DeviceDetail/DeviceDetail"),
            },
            {
                path: "/deviceManage/deviceList/temperhistory",
                name: "历史温度",
                component: () =>
                    import(
                        "@/views/DeviceManage/DeviceList/DeviceDetail/components/AlarmConfig/TemperHistory"
                    ),
            },
            {
                path: "/deviceManage/deviceList/templateDetail",
                name: "模板详情",
                component: () => import("@/views/DeviceManage/DeviceList/TemplateDetail"),
            },
            {
                path: "/deviceManage/bluetoothList/templateDetail",
                name: "蓝牙模板详情",
                component: () => import("@/views/DeviceManage/bluetoothList/TemplateDetail"),
            },
            // ! IC卡管理开始
            {
                path: "/iccardManage/onlineCardQuery",
                name: "在线卡查询",
                component: () => import("@/views/ICCardManage/OnlineCardQuery/OnlineCardQuery"),
            },
            {
                path: "/iccardManage/onlineCardHandle",
                name: "在线卡操作",
                component: () => import("@/views/ICCardManage/OnlineCardHandle/OnlineCardHandle"),
            },
            {
                path: "/iccardManage/onlineCardConsume",
                name: "在线卡消费",
                component: () => import("@/views/ICCardManage/OnlineCardConsume/OnlineCardConsume"),
            },
            // ! 站点管理
            {
                path: "/siteManage/ChargeTemplate",
                name: "计费模板",
                component: () => import("@/views/SiteManage/ChargeTemplate"),
            },
            {
                path: "/siteManage/siteList",
                name: "站点列表",
                component: () => import("@/views/SiteManage/SiteList"),
            },
            {
                path: "/siteManage/siteList/edit",
                name: "站点编辑",
                component: () => import("@/views/SiteManage/SiteList/edit"),
            },
            {
                path: "/siteManage/projectSite",
                name: "项目站点",
                component: () => import("@/views/SiteManage/ProjectSite"),
            },
            // {
            //     path: "/communManage/communManageCon/comManageDetail",
            //     name: "小区详情",
            //     component: () => import("@/views/CommunManage/CommunManageCon/ComManageDetail"),
            // },
            // {
            //     path: "/communManage/communManageCon/tempdetail",
            //     name: "小区模板详情",
            //     component: () =>
            //         import("@/views/CommunManage/CommunManageCon/ComManageDetail/Tempdetail"),
            // },
            // ! 门店管理
            {
                path: "/storeManage/storeList",
                name: "门店列表",
                component: () => import("@/views/StoreManage/StoreList"),
            },

            // ! 系统设置
            {
                path: "/systemSet/admin",
                name: "管理权限",
                component: () => import("@/views/SystemSet/Admin/Admin"),
            },
            // 结算收益
            {
                path: "/settlement/index",
                name: "结算收益",
                component: () => import("@/views/Settlement/Settlement"),
            },
            {
                path: "/settlement/wechartOrder",
                name: "微信订单",
                component: () => import("@/views/Settlement/WechartOrder"),
            },
            // ! 充值管理
            {
                path: "/payManage/payProduct",
                name: "充值商品",
                component: () => import("@/views/PayManage/PayProduct"),
            },
            // ! 促销管理
            {
                path: "/activityManage/discountCoupon",
                name: "优惠券",
                component: () => import("@/views/ActivityManage/DiscountCoupon"),
            },
            {
                path: "/activityManage/chargeDiscounts",
                name: "充值优惠",
                component: () => import("@/views/ActivityManage/ChargeDiscounts"),
            },
            {
                path: "/activityManage/firstChargeFree",
                name: "首充减免",
                component: () => import("@/views/ActivityManage/FirstChargeFree"),
            },
            // ! 广告管理
            {
                path: "/adManage/banner",
                name: "广告列表",
                component: () => import("@/views/AdManage/Banner"),
            },
            {
                path: "/adManage/banner/edit",
                name: "广告编辑",
                component: () => import("@/views/AdManage/Banner/edit"),
            },
            // ! 富文本管理
            {
                path: "/richTextManage/pageList",
                name: "页面列表",
                component: () => import("@/views/RichTextManage"),
            },
            {
                path: "/richTextManage/pageList/edit",
                name: "富文本编辑",
                component: () => import("@/views/RichTextManage/EditRichText"),
            },
            // ! 客户端配置
            {
                path: "/clientConfig/feedback",
                name: "意见反馈",
                component: () => import("@/views/ClientConfig/Feedback"),
            },
            {
                path: "/clientConfig/serviceCall",
                name: "服务电话",
                component: () => import("@/views/ClientConfig/ServiceCall"),
            },
            {
                path: "/clientConfig/carType",
                name: "车辆类型",
                component: () => import("@/views/ClientConfig/CarType"),
            },
            {
                path: "/clientConfig/SystemMessage",
                name: "系统消息",
                component: () => import("@/views/ClientConfig/SystemMessage"),
            },
            {
                path: "/clientConfig/News",
                name: "新闻资讯",
                component: () => import("@/views/ClientConfig/News"),
            },
            {
                path: "/clientConfig/VersionInformation",
                name: "版本信息",
                component: () => import("@/views/ClientConfig/VersionInformation"),
            },
            //  404
            {
                path: "*",
                component: () => import("@/components/NoFind/NoFind"),
            },
        ],
    },
];
