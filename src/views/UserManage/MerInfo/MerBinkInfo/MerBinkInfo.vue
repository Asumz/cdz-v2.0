<template>
  <div class="merBinkInfo">
         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="serialNum"
                label="序号"
                min-width="60"
                fixed
                >
                <template slot-scope="scope">
                      {{scope.$index+1}} 
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="130"
                fixed
                >
                <template slot-scope="scope">
                     {{scope.row.username && scope.row.username.length >0 ? scope.row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="姓名"
                min-width="130"
                >
                <template slot-scope="scope">
                     {{scope.row.realname && scope.row.realname.length >0 ? scope.row.realname : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="phone_num"
                label="电话"
                min-width="130"
                >
                <template slot-scope="scope">
                     {{scope.row.phone_num && scope.row.phone_num.length >0 ? scope.row.phone_num : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="bankcardnum"
                label="银行账号"
                min-width="200"
                >
                <template slot-scope="scope">
                     {{scope.row.bankcardnum && scope.row.bankcardnum.length >0 ? scope.row.bankcardnum : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="bankname"
                label="所属银行"
                min-width="150"
                >
                <template slot-scope="scope">
                     {{scope.row.bankname && scope.row.bankname.length >0 ? scope.row.bankname : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="type"
                label="类型"
                min-width="130"
                >
                <template slot-scope="scope">
                     <span v-if="scope.row.type == 1">个人</span>
                     <span v-else-if="scope.row.type == 2">对公</span>
                     <span v-else>— —</span>
                </template>
                </el-table-column>
                 <el-table-column
                prop="rate"
                label="费率"
                min-width="130"
                >
                <template slot-scope="scope">
                     <span v-if=" typeof scope.row.rate == 'undefined'">— —</span>
                     <span v-else>{{scope.row.rate}}‰</span>
                </template>
                </el-table-column>
            </el-table>
         </el-card>
  </div>
</template>

<script>
import { merBankInfo } from '@/require/userManage'
export default {
    data(){
        return {
            id: '', //商户id
            tableData: [],
            loading: false
        }
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
           let {id}= this.$route.query
           this.id= id
        }
        this.asyMerBankInfo({id: this.id})
    },
    methods: {
        async asyMerBankInfo(data){
            let _this= this
            this.loading= true
            try{
                let bankInfo= await merBankInfo(data)
                this.loading= false
                if(bankInfo.code === 200){
                    this.tableData = bankInfo.listdata
                }
            }catch(error){
                if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                    _this.loading= true
                    return 
                   }
                 _this.loading= false
            }
        }
    }
}
</script>

<style>

</style>