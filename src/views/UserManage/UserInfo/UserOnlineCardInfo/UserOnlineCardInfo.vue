<template>
    <div class="userOnlineCardInfo">
        <el-card class="box-card">
             <el-table
                :data="tableData"
                border
                style="width: 100%"
                v-loading="loading"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="50"
                >
                <template slot-scope="scope">
                    {{scope.$index+1}} 
                </template>
                </el-table-column>
                <el-table-column
                prop="cardID"
                label="卡号"
                min-width="100"
                >
                <template slot-scope="scope">
                    <router-link :to="`/iccardManage/onlineCardConsume?cardnumber=${scope.row.cardID}`">
                        <el-link type="primary" :underline="false">{{scope.row.cardID}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额"
                min-width="100"
                >
                 <template slot-scope="scope">
                     <el-link type="success" :underline="false">
                         {{ scope.row.relevawalt == 1 ? scope.row.walletmoney.toFixed(2) : scope.row.money.toFixed(2) }} 
                     </el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                <template slot-scope="scope">
                     <el-link v-if="scope.row.status === 0" type="info" :underline="false">未激活</el-link>
                     <el-link v-if="scope.row.status === 1" type="success" :underline="false">正常</el-link>
                     <el-link v-if="scope.row.status === 2" type="danger" :underline="false">挂失</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="创建时间"
                min-width="150"
                >
                 <template slot-scope="scope">
                     {{scope.row.create_time | fmtDate}}
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { getUserOnlineCardInfo } from '@/require/userManage'
export default {
    data(){
        return{
            tableData: [],
            loading: false
        }
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
             this.asyGetUserOnlineCardInfo(this.$route.query)
        }
       
    },
    methods: {
        async asyGetUserOnlineCardInfo(data){
            let _this= this
            try {
                this.loading= true
                let onlineCardInfo = await getUserOnlineCardInfo(data)
                 this.loading= false
                if(onlineCardInfo.code === 200){
                    _this.tableData= onlineCardInfo.listdata
                }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        }
    }
}
</script>

<style lang="less">
    .userOnlineCardInfo{
        .el-link {
            text-decoration: none;
        } 
    }
</style>