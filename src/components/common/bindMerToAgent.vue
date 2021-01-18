<template>
  <div class="bindMerToAgent">
    <div v-if="bindInfo.from == 1">
        <el-dialog title="绑定商户" :visible.sync="bindInfo.show" width="900px" custom-class="bindDialog" :modal="false" >
        <el-form :inline="true"  class="demo-form-inline" :model="bindMerToAgentForm" size="mini">
                    <el-form-item label="昵称" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="bindMerToAgentForm.nick" clearable placeholder="商户昵称"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label="商户名" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="bindMerToAgentForm.realName" clearable placeholder="商户姓名"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="bindMerToAgentForm.phone" clearable placeholder="手机号"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label class="form_right25" style="width: 80px;">
                        <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                    </el-form-item>
            </el-form>
            <el-table :data="gridData" :max-height="warpHeight" v-loading="loading" border>
                <el-table-column property="username" label="昵称" min-width="150">
                    <template slot-scope="{row}">
                        {{row.username ? row.username : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="realname" label="商户名" min-width="120">
                    <template slot-scope="{row}">
                        {{row.realname ? row.realname : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="phone_num" label="手机号" min-width="120">
                    <template slot-scope="{row}">
                        {{row.phone_num ? row.phone_num : '— —'}}
                    </template>
                </el-table-column>

                <el-table-column property="phone_num" label="权限" min-width="120">
                    <template slot-scope="{row}">
                        {{row.rank == 0 ? '超级管理员' : row.rank == 1 ? '用户' : row.rank == 2 ? '商户' : row.rank == 3 ? '代理商' : '— —'}}
                    </template>
                </el-table-column>
                
                <el-table-column property="address" label="绑定" min-width="120">
                    <template slot-scope="{row}">
                        <div v-if="row.rank == 2" >
                            <el-button type="primary" size="small" @click="handleBindMer(row.id)" v-if="row.agent_id == 0" >绑定商户</el-button>
                            <el-button type="primary" size="small" disabled  plain v-else >已被绑定</el-button>
                        </div>
                        <div v-else >
                            <el-button type="primary" size="small" disabled  plain >禁止绑定</el-button>
                        </div>
                    
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
    
    <div v-if="bindInfo.from == 2">
        <el-dialog title="绑定到代理商" :visible.sync="bindInfo.show" width="900px" custom-class="bindDialog" :modal="false" >
        <el-form :inline="true"  class="demo-form-inline" :model="bindMerToAgentForm" size="mini">
                    <el-form-item label="昵称" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="bindMerToAgentForm.nick" clearable placeholder="代理商昵称"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="bindMerToAgentForm.name" clearable placeholder="代理商姓名"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="bindMerToAgentForm.phone" clearable placeholder="手机号"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                    <el-form-item label class="form_right25" style="width: 80px;">
                        <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                    </el-form-item>
            </el-form>
            <el-table :data="gridData" :max-height="warpHeight" v-loading="loading" border>
                <el-table-column property="username" label="代理商昵称" min-width="150">
                    <template slot-scope="{row}">
                        {{row.username ? row.username : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="realname" label="代理商名" min-width="120">
                    <template slot-scope="{row}">
                        {{row.realname ? row.realname : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="phone_num" label="手机号" min-width="120">
                    <template slot-scope="{row}">
                        {{row.phone_num ? row.phone_num : '— —'}}
                    </template>
                </el-table-column>

                <el-table-column property="phone_num" label="权限" min-width="120">
                    <template slot-scope="{row}">
                        {{row.rank == 0 ? '超级管理员' : row.rank == 1 ? '用户' : row.rank == 2 ? '商户' : row.rank == 3 ? '代理商' : '— —'}}
                    </template>
                </el-table-column>
                
                <el-table-column property="address" label="绑定" min-width="120">
                    <template slot-scope="{row}">
                        <el-button type="primary" size="small" @click="handleBindMer(row.id)">绑定代理商</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
    

  </div>
</template>

<script>
import { getMerOrAreaList,merBindAgent } from '@/require'
import { selectAgent } from '@/require/userManage'
import { messageTip } from '@/utils/ele'
export default {
    data(){
        return {
            gridData:[],
            bindMerToAgentForm: {},
            loading: false,
            warpHeight: 500
        }
    },
    created(){
        const warpHeight= (document.documentElement.clientHeight - 80)*0.75
        this.warpHeight= warpHeight
    },
    props: ['bindInfo'], //{ show: true/false, from: 1, id }  1、到代理商绑定商户  2，是查询所有的代理商，并将用户绑定到代理商上去
    /* 设备绑定商户信息框 用户页面传的信息{show: true,from: 1,page: {id: 125}}  page里是用户的信息，包含id等，设备详情传的信息{show: true,from: 1,page: {code: '000001'}}*/
    watch:{
        'bindInfo': {
            handler: function(newValue,oldValue){
                this.gridData= [] //只要监听到 bindInfo的变化，就重新初始化数据
                this.bindMerToAgentForm = {}
                if(newValue.from == 2){ //避免加载就请求
                    this.asyGetAllagentList({searchInfo: {}})
                }
                
            },
             immediate: true,  
        }
    },
    methods: {
        //请求只在点击的时候发送请求
         async asyGetMerOrAreaList(newVal){ //查询所有的商户 rank= 2
         let _this= this
             try{
                 let info
                 _this.loading= true
                 info= await getMerOrAreaList({source: 1,...newVal.searchInfo}) //获取商户
                 _this.loading= false
                 if(info.code === 200){
                     _this.gridData= info.listdata 
                 } 
             }
             catch(error){
                 this.loading= false
             }
         },
        async asyGetAllagentList(newVal){ //查询所有的代理商 rank= 3
         let _this= this
             try{
                 let info
                 _this.loading= true
                 info= await selectAgent(newVal.searchInfo) //获取商户

                 _this.loading= false
                 if(info.code === 200){
                     _this.gridData= info.result.agentData 
                 } 
             }
             catch(error){
                 
                 this.loading= false
             }
         },
        handleSearch(){
            if(this.bindInfo.from == 1){ //查询所有商户
                this.asyGetMerOrAreaList({from: 1,searchInfo: {...this.bindMerToAgentForm}})
            }else if(this.bindInfo.from == 2){  //查询所有代理商    
                this.asyGetAllagentList({searchInfo: {...this.bindMerToAgentForm}})
            }
            
        },
        handleBindMer(merId){ 
            this.bindInfo.show= false
            if(this.bindInfo.from == 1) { //绑定商户
                if(this.bindInfo.page && this.bindInfo.page.id){ //来自用户页面的绑定
                    let data= merBindAgent({id:this.bindInfo.page.id,merId})
                    data.then(res=>{
                        if(res.code== 200){
                            messageTip('success','绑定成功')
                            this.$emit('backFn')
                        
                        }else{
                            messageTip('error','绑定失败')
                        }
                    }).catch(error=>{
                        
                    })
                }
            }else if(this.bindInfo.from == 2){ //绑定到代理商
                // 此时merId为代理商的id
                let id= merId
                if(this.bindInfo.page && this.bindInfo.page.id){ //来自用户页面的绑定
                    let merId= this.bindInfo.page.id //商户id
                    let data= merBindAgent({id,merId})
                    data.then(res=>{
                        if(res.code== 200){
                            messageTip('success','绑定成功')
                            this.$emit('backFn')
                        }else{
                            messageTip('error','绑定失败')
                        }
                    }).catch(error=>{
                        
                    })
                }

            }
            
        }
    }
}
</script>

<style lang="less">
.bindMerToAgent{
    .bindDialog {
        min-width: 500px;
        margin-top: 5vh !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5) !important;
    }
}
</style>