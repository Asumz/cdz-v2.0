export const superAdminMenuList = [
    {
        title: "数据统计分析",
        link: "/datastatis",
        index: "0",
        icon: "icon-shujuhuizong",
        children: [
            {
                title: "站点地图",
                link: "/datastatis/SiteMap",
                index: "0-0",
            },
        ],
    },
    {
        title: "用户管理",
        link: "/usermanage",
        index: "1",
        icon: "icon-yonghu",
        children: [
            {
                title: "用户信息",
                link: "/usermanage/userInfo",
                index: "1-0",
            },
            {
                title: "桩主信息",
                link: "/usermanage/merInfo",
                index: "1-1",
            },
            {
                title: "桩主申请记录",
                link: "/usermanage/merApply",
                index: "1-2",
            },
        ],
    },
    {
        title: "充电桩管理",
        index: "2",
        link: "/deviceManage",
        icon: "icon-charging_pile",
        children: [
            {
                title: "充电桩列表",
                link: "/deviceManage/deviceList",
                index: "2-0",
            },
        ],
    },
    {
        title: "站点管理",
        index: "3",
        link: "/siteManage",
        icon: "icon-zhandian",
        children: [
            {
                title: "计费模板",
                link: "/siteManage/ChargeTemplate",
                index: "3-0",
            },
            {
                title: "站点列表",
                link: "/siteManage/siteList",
                index: "3-1",
            },
            {
                title: "项目站点",
                link: "/siteManage/projectSite",
                index: "3-2",
            },
        ],
    },
    {
        title: "门店管理",
        index: "4",
        link: "/storeManage",
        icon: "icon-mendian",
        children: [
            {
                title: "门店列表",
                link: "/storeManage/storeList",
                index: "4-0",
            },
        ],
    },
    {
        title: "订单管理",
        index: "5",
        link: "/tradeRecord",
        icon: "icon-74wodedingdan",
        children: [
            {
                title: "充电记录",
                link: "/tradeRecord/chargeRecord",
                index: "5-0",
            },
            {
                title: "充值记录",
                link: "/tradeRecord/walletRecord",
                index: "5-1",
            },
            {
                title: "提现记录",
                link: "/tradeRecord/cashRecord",
                index: "5-2",
            },
            {
                title: "退款记录",
                link: "/tradeRecord/refundRecord",
                index: "5-3",
            },
        ],
    },
    {
        title: "充值管理",
        index: "6",
        link: "/payManage",
        icon: "icon-money",
        children: [
            {
                title: "充值商品",
                link: "/payManage/payProduct",
                index: "6-0",
            },
        ],
    },
    {
        title: "促销管理",
        index: "7",
        link: "/activityManage",
        icon: "icon-cuxiao",
        children: [
            {
                title: "优惠券",
                link: "/activityManage/discountCoupon",
                index: "7-0",
            },
            {
                title: "充值优惠",
                link: "/activityManage/chargeDiscounts",
                index: "7-1",
            },
            {
                title: "首充减免",
                link: "/activityManage/firstChargeFree",
                index: "7-2",
            },
        ],
    },
    {
        title: "广告管理",
        index: "8",
        link: "/adManage",
        icon: "icon-guanggaoguanli",
        children: [
            {
                title: "广告列表",
                link: "/adManage/banner",
                index: "8-0",
            },
        ],
    },
    {
        title: "系统设置",
        index: "9",
        link: "/systemSet",
        icon: "icon-shezhi",
        children: [
            {
                title: "管理员权限",
                link: "/systemSet/admin",
                index: "9-0",
            },
        ],
    },
    {
        title: "客户端配置",
        index: "10",
        link: "/clientConfig",
        icon: "icon-kehuduan1",
        children: [
            {
                title: "意见反馈",
                link: "/clientConfig/feedback",
                index: "10-0",
            },
            {
                title: "系统消息",
                link: "/clientConfig/SystemMessage",
                index: "10-1",
            },
            {
                title: "版本信息",
                link: "/clientConfig/VersionInformation",
                index: "10-2",
            },
            {
                title: "新闻资讯",
                link: "/clientConfig/News",
                index: "10-3",
            },
            {
                title: "服务电话",
                link: "/clientConfig/serviceCall",
                index: "10-4",
            },
            {
                title: "车辆类型",
                link: "/clientConfig/carType",
                index: "10-5",
            },
        ],
    },
    {
        title: "富文本管理",
        index: "11",
        link: "/richTextManage",
        icon: "icon-fuwenben",
        children: [
            {
                title: "页面列表",
                link: "/richTextManage/pageList",
                index: "11-0",
            },
        ],
    },
];
