export default {
    //处理传过来的list,是数组扁平化，遍历出每一项
    transformList(state){
        let newList=[]
        state.menuList.forEach((item,i)=>{
            if(item.children && item.children.length ){
                newList.push(item.children)
            }
        })
        newList= Array.prototype.concat.apply([],newList)
        return newList
    },
    //处理传过来的异步路由,使数组扁平化，遍历出每一项
    transformAsyRouterMap(state){
        let newList=[]
        state.asyRouterMap.forEach((item,i)=>{
            if(item.path == '/'){
                item.children.forEach((jtem,j)=>{
                    newList.push(jtem)
                })
            }else{
                newList.push(item) 
            }
        })
        return newList
    }
}