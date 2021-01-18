import {UPDATEUSERINFO} from '../mutation-types'
export default {
    handleChargeNowMenuLink(state,data){ //更新当前是哪个菜单
        state.nowMenuLink= data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    handleMenuList(state,menuList){ //更新菜单列表
        state.menuList= menuList
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    handleLayoutStore(state,dd){ //退出登录
       
        state.breadList= [ //面包列表导航
            {title: '数据汇总',link: '/datastatis/index',query: {name:'li',age: 20}},
            {title: '历史统计',link: '/datastatis/hisstatis',query: {name:'wi',age: 30}}
        ]
        state.breadcrumbList= [] //面包屑导航
        state.nowMenuLink= '数据汇总' //当前菜单名称，是为了做返回的时候，菜单保持对应用的
        state.userInfo= null
        state.token = null
        state.asyRouterMap= []  //router中的异步路由
        state.menuList= [] //菜单列表
        state.isShowSlide= null, //slide状态
        state.cancelTokenArr= []
        state.temDetail= {}
        state.agentSelectMerInfo= {
            id: '',
            name: ''
        }
        state.agentTipDialog= true
        sessionStorage.removeItem('state')
    },
    [UPDATEUSERINFO](state,data){ //更新用户信息
        state.userInfo= data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    updateToken(state, token){
        state.token = token;
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    handleChargeBreadList(state,data){ //更新面包屑
        let breadList= state.breadList
        const flag= breadList.some((item,i)=>{ //检验要存储的元素是否在这里面，有的话返回true,否则返回false
            return item.title == data.title
        })
        if(!flag){
            if(breadList.length>=7){
                breadList.shift() 
            }
            breadList.push({...data})
            state.breadList= breadList
        }
        sessionStorage.setItem('state',JSON.stringify(state))  
    },
    removeBreadListItem(state,title){ //移除面包屑的一项
        let breadList= state.breadList
        breadList= breadList.filter((item,i)=>{
            return item.title != title
        })
        state.breadList= breadList
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    storeAsyRouterMap(state,asyRouterMap){ //更新异步路由
        state.asyRouterMap= asyRouterMap
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    updateSlideStatus(state,flag){ //更新Slide是否显示
        // let {isShowSlide}= state
        state.isShowSlide= flag
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    updataBreadcrumbList(state,data){ //更新新的面包屑列表 首页/活动管理/活动列表/活动详情
        state.breadcrumbList= data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    pushToken (state, payload) { //添加请求token数组
        state.cancelTokenArr.push(payload)
        // sessionStorage.setItem('state',JSON.stringify(state))
    },
    clearToken (state) { //取消token数组里的请求，并清空数组
        try {
            state.cancelTokenArr.forEach(item => {
                // console.log(item)
                if(item.cancelToken){
                    item.cancelToken('路由跳转取消请求')
                } 
            })
        }catch(err){
            console.log('clearToken',err)
        }
       
        state.cancelTokenArr = []
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    updateTemDetail(state,data){
        state.temDetail=data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    setAgentSelectMerInfo(state,data){ //设置代理商选择的商户id
        state.agentSelectMerInfo=data
        sessionStorage.setItem('state',JSON.stringify(state))
    },
    setAgentTipDialog(state,data){
        state.agentTipDialog=data
        sessionStorage.setItem('state',JSON.stringify(state))
    }
}