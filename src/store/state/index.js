let obj= {
    breadList: [ //面包列表导航
        {title: '数据汇总',link: '/datastatis/index',query: {name:'li',age: 20}},
        {title: '历史统计',link: '/datastatis/hisstatis',query: {name:'wi',age: 30}}
    ],
    breadcrumbList: [], //面包屑导航
    nowMenuLink: '数据汇总', //当前菜单名称，是为了做返回的时候，菜单保持对应用的
    userInfo: null,
    token: null,
    asyRouterMap: [], //router中的异步路由
    menuList: [], //菜单列表
    isShowSlide: true, //默认显示菜单
    cancelTokenArr: [], // 取消请求token数组
    temDetail: {},
    agentSelectMerInfo: {
        id: '',
        name: ''
    }, //代理商选择的商户信息
    agentTipDialog: true, //汇总页面 代理商提示是否显示,默认第一次显示
}
let state= JSON.parse(sessionStorage.getItem('state') || JSON.stringify(obj))
export default state