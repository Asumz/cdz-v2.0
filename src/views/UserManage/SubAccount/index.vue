<template>
  <div class="subAccount">
       <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" v-model="subAccountForm" size="mini">
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="subAccountForm.nick" placeholder="商户昵称" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="电话" class="form_right25">
                    <el-input v-model="subAccountForm.phone" placeholder="电话" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="form_right25">
                    <el-input v-model="subAccountForm.name" placeholder="商户姓名" clearable  size="small"></el-input>
                </el-form-item>

                <el-form-item label="所属商户电话" class="form_right25">
                    <el-input v-model="subAccountForm.mobile" placeholder="所属商户电话" clearable size="small"></el-input>
                </el-form-item>

                 <el-form-item label="所属商户昵称" class="form_right25">
                    <el-input v-model="subAccountForm.dealer" placeholder="所属商户昵称" clearable size="small"></el-input>
                </el-form-item>

                <el-form-item class="form_margin0 content_btn">
                     <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn">
                     <el-button type="primary" size="small" @click="handleBindSub" icon="el-icon-search">绑定子账户</el-button>
                </el-form-item>
            </el-form>
         </el-card>
    <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                label="序号"
                min-width="70"
                >
                <template slot-scope="scope">
                     {{(nowPage-1)*10+scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="130"
                >
                <template slot-scope="scope">
                     {{scope.row.username && scope.row.username.length >0 ? scope.row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="姓名"
                min-width="100"
                >
                <template slot-scope="scope">
                     {{scope.row.realname && scope.row.realname.length >0 ? scope.row.realname : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="phone_num"
                label="电话"
                min-width="120"
                >
                <template slot-scope="scope">
                     {{scope.row.phone_num && scope.row.phone_num.length >0 ? scope.row.phone_num : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="muusername"
                label="所属商户"
                min-width="120"
                >
                <template slot-scope="scope">
                     {{scope.row.muusername && scope.row.muusername.length >0 ? scope.row.muusername : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="muphonenum"
                label="商户电话"
                min-width="120"
                >
                <template slot-scope="scope">
                     {{scope.row.muphonenum && scope.row.muphonenum.length >0 ? scope.row.muphonenum : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="handle"
                label="操作"
                width="120"
                >
                    <template slot-scope="scope">
                        <div v-if="scope.row.merid != 0 && scope.row.merid != null">
                            <el-button type="danger" size="mini"  @click="handleDelete(scope.row)">删除</el-button>
                        </div>
                         <!-- <div v-else>
                            <el-button type="danger" size="mini" @click="handleBindOrUnBindMer(2,scope.row)">解绑商户</el-button>
                        </div> -->
                    </template> 
                </el-table-column>
            </el-table>
        </el-card>
        <!-- ban固定商户 -->
        <bindMerOrArea :bindInfo="bindInfo" @backFn="backFn" />
        <DialogWrapper 
            title="绑定子账户" 
            :dialogVisible="dialogVisible" 
            :handleSubmit="handleSubmit" 
            :handleCancen="handleCancen" 
            :handleClose="handleCancen"
            width="400px"
            >
            <div>
                <el-form ref="form" :model="bindForm" label-width="100px">
                    <el-form-item label="商户电话">
                        <el-input v-model="bindForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="子账号电话" label-width="100px">
                        <el-input v-model="bindForm.phone"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </DialogWrapper>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage"/>
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import bindMerOrArea from '@/components/common/bindMerOrArea'
import DialogWrapper from '@/components/DialogWrapper'
import { alertPassword,messageTip } from '@/utils/ele'
import { getSubAccountList,handleSubAccount } from '@/require/userManage'
import { reactive,onMounted,ref } from '@vue/composition-api'
export default {
    setup(props, context){
        console.log(props,context)  
        console.log('setup执行')
        let subAccountForm= ref({})
        let tableData= ref([])
        let loading= ref(false)
        let totalPage= ref(1)
        let nowPage= ref(1)
        let dialogVisible= ref(false) //子账户弹窗
        let bindInfo= ref({show: false,from: 1}) //绑定商户/小区弹框信息
        let selectUser= ref({}) //选中的子账户
        let bindForm= ref({}) //绑定商户form
        // 获取当前页码，注意： 不能在onMounted中获取，因为onMounted挂载时，页码组件的监听函数会执行两次，得到的数据不准确，所以需要在setup中进行获取currentPage
        subAccountForm.value= {...context.root._route.query}
        const currentPage= parseInt(context.root._route.query.currentPage)
        nowPage.value= isNaN(currentPage) ?  1 : currentPage
        onMounted(()=>{ 
            handleGetData(subAccountForm.value)
        })
        // 搜索种子账户条件
        function handleSearch(){
        context.root._router.push({query: {...subAccountForm.value,currentPage: 1}})
        handleGetData({...subAccountForm.value,currentPage:1})
        nowPage.value= 1
        }
        function getPage(page){
            subAccountForm.value= {...context.root._route.query,currentPage: page}
            context.root._router.push({query: {...subAccountForm.value}})
            nowPage.value= page
            handleGetData(subAccountForm.value)
        }
        function backFn(){
            console.log('backFn')
            handleGetData(subAccountForm.value)
        }
        function handleDelete(row){ 
           alertPassword(()=>{
               asyHandleSubAccount({type: 2,id: row.id})
           })
        }
        function handleSubmit(){ //提交绑定子账户
            asyHandleSubAccount({type: 1,...bindForm.value})
            handleCancen()
        }
        function handleCancen(){ //关闭绑定子账户页面
            dialogVisible.value= false
            bindForm.value= {}
        }
        function handleBindSub(){ //绑定子账户按钮
            dialogVisible.value= true
        }
        async function handleGetData(data){
            try {
                let info= await getSubAccountList(data)
                if(info.code === 200){
                tableData.value= info.listdata
                totalPage.value= info.totalRows
                }
            }catch(e){
                console.log(e)
            }
        }
        async function asyHandleSubAccount(data){
             try {
                let info= await handleSubAccount(data)
                if(info.code === 200){
                   let messStr= data.type== 1 ? '添加' : data.type== 2 ?'删除' : ''
                    messageTip('success',messStr+'成功')
                    handleGetData(subAccountForm.value)
                }else{
                    messageTip('error',info.message)
                }
            }catch(e){
                console.log(e)
            }
            
        }
     return {
         subAccountForm,
         tableData,
         loading,
         totalPage,
         nowPage,
         handleSearch,
         getPage,
         bindInfo,
         backFn,
         handleDelete,
         dialogVisible,
         bindForm,
         handleSubmit,
         handleCancen,
         handleBindSub
     }
    },
    data(){
        return {
            // subAccountForm: {}
        }
    },
    components: {
        MyPagination,
        bindMerOrArea,
        DialogWrapper
    }
}
</script>

<style>

</style>