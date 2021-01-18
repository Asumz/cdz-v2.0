// yarn add xlsx file-saver script-loader
// 向外暴露出带出excel的方法
/**
 * tHeader: 是 excel的表头
 * filterVal: 是表头对应的字段
 * list： 是数据
 * filename： 是下载的xlxs名称
 * formatJson： 过滤函数
 */

export default ({tHeader=[],filterVal=[],list=[],filename="文件",formatJson})=>{
    import('@/vendor/Export2Excel').then(excel => { //异步导入
        // const tHeader = ['Id', 'Title']
        // const filterVal = ['id', 'title']
        // const list = [
        //     {id: 1, title: '标题1'},
        //     {id: 2, title: '标题2'}
        // ]
        // 判断 formatJson 函数传没有，传了就用传过来的，否则就用默认的
        formatJson= typeof formatJson == 'function' ? formatJson : (filterVal, jsonData)=> jsonData.map(v => filterVal.map(j => v[j]))
        const data = formatJson(filterVal, list)
        excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: filename,
        autoWidth: true
        })
    })
}

// function formatJson(filterVal, jsonData) {
//     return jsonData.map(v => filterVal.map(j => v[j]))
// }

