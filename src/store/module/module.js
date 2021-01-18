const moduleA = {
    state: { 
        asyRouterMap: [], //router中的异步路由
    },
    mutations: {
        storeAsyRouterMap(state,asyRouterMap){ //更新异步路由
            state.asyRouterMap= asyRouterMap
        },
        handleLayoutRemoveAsyRouterMap(state){ //推出登录移除路由
            state.asyRouterMap= []
        }
    },
    actions: {
        
    },
    getters: {
        
    }
  }
  export default moduleA