<template>
  <div class="feescaleRecord">
     <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="feescaleRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="feescaleRecordForm.ordernum" placeholder="请输入订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户昵称" class="form_right25">
                    <el-input v-model="feescaleRecordForm.usernick" placeholder="请输入商户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="电话" class="form_right25">
                    <el-input v-model="feescaleRecordForm.mobile" placeholder="请输入商户电话" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="feescaleRecordForm.code" placeholder="请输入缴费设备号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="feescaleRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="feescaleRecordForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>
          <el-card class="box-card">
             
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="75"
                >
                <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="220"
                >
                    <template slot-scope="scope">
                        <router-link :to="`/tradeRecord/feescaleRecord/feescaleRecordDetail?ordernum=${scope.row.ordernum}`">
                            <el-link type="primary" :underlined="false">{{scope.row.ordernum}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="商户昵称"
                min-width="120"
                >
                <template slot-scope="{row}">
                        {{row.username && row.username.length > 0 ? row.username : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="phone_num"
                label="手机号"
                min-width="120"
                >
                <template slot-scope="{row}">
                     <router-link :to="`/usermanage/merInfo?phone=${row.phone_num}`" v-if="row.phone_num && row.phone_num.length > 0">
                        <el-link type="primary">
                            {{row.phone_num && row.phone_num.length > 0 ? row.phone_num : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.phone_num && row.phone_num.length > 0 ? row.phone_num : '— —'}}</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="equipmentnum"
                label="设备号"
                min-width="120"
                >
                </el-table-column>

                
                <el-table-column
                prop="merpaymoney"
                label="商家缴费"
                min-width="100"
                >
                <template slot-scope="scope">
                        <el-link :type=" scope.row.merpaymoney >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.merpaymoney.toFixed(2)}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="price"
                label="设备应缴金额"
                min-width="100"
                >
                 <template slot-scope="scope">
                     {{ scope.row.price != null ? scope.row.price.toFixed(2) : '— —' }}
                </template>
                </el-table-column>

                <el-table-column
                prop="renewal"
                label="续费时长"
                min-width="100"
                >
                <template slot-scope="{row}">
                    {{ row.renewal+'月' }}
                </template>
                </el-table-column>
                
                <el-table-column
                prop="paytype"
                label="缴费方式"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <el-link v-if=" [0,1,2,3].includes(row.paytype)" type="success" :underline="false">钱包缴费</el-link>
                    <el-link v-else-if="[4].includes(row.paytype)" type="warning" :underline="false">微信缴费</el-link>
                    <el-link v-else type="default" :underline="false">未知</el-link>
                    
                </template>
                </el-table-column>

                <el-table-column
                prop="createtime"
                label="续费时间"
                min-width="150"
                >
                <template slot-scope="{row}">
                    {{ row.createtime | fmtDate }}
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
  </div>
</template>

<script>

import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {alertPassword,messageTip} from '@/utils/ele'
import { merFeescaleRecode } from '@/require/tradeRecord'
import Util from '@/utils/util'
export default {
    data(){
        return {
            feescaleRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],  
            totalPage: 1,
            nowPage: 1,
            loading:  false,

        }
    },
    components: {
        MyPagination
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',1)
            this.feescaleRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.feescaleRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',1)
            this.feescaleRecordForm= {startTime,endTime}
        }
       this.asyGetWalletRecord(this.feescaleRecordForm)
    },
    methods: {
        getPage(page){
            this.feescaleRecordForm= {...this.feescaleRecordForm,currentPage:page}
            this.$router.push({query: this.feescaleRecordForm})
            this.asyGetWalletRecord(this.feescaleRecordForm)
            this.nowPage = page
        },
        async asyGetWalletRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let info= await merFeescaleRecode(data)
                 _this.loading= false
                 if(info.code === 200){
                    _this.tableData = info.dateMap.listMap
                    _this.totalPage = info.dateMap.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleSearch(){
            this.$router.push({query:{... this.feescaleRecordForm,currentPage: 1}})
            this.asyGetWalletRecord({... this.feescaleRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>