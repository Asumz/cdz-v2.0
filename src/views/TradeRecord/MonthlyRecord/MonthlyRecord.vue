<template>
    <div class="monthlyRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="monthlyRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="monthlyRecordForm.ordernum"  placeholder="请输入订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="monthlyRecordForm.usernick" placeholder="请输入用户昵称" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="monthlyRecordForm.startTime"
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
                        v-model="monthlyRecordForm.endTime"
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
                    {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="220"
                > 
                <template slot-scope="scope">
                    <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=6&orderId=${scope.row.id}&status=${scope.row.status}&orderNum=${scope.row.ordernum}`">
                        <el-link type="primary" ::underline="false">
                            {{ scope.row.ordernum }}
                        </el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="姓名"
                min-width="100"
                >
                <template slot-scope="scope">
                    {{ scope.row.nickname && scope.row.nickname.length>0 ? scope.row.nickname : '— —' }}
                </template>
                </el-table-column>
                
                <el-table-column
                prop="money"
                label="金额"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="paysource"
                label="来源"
                >
                <template slot-scope="scope">
                    {{ scope.row.paysource == 1 ? '开通包月' : scope.row.paysource == 2 ? '包月充电' : '— —' }}
                </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                <template slot-scope="scope">
                   <el-link type="success" v-if="scope.row.status == 1">正常</el-link>
                   <el-link type="warning" v-else-if="scope.row.status == 2">退回</el-link>
                   <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="everydaynum"
                label="每日次数"
                min-width="100"
                >
                <template slot-scope="scope">
                   {{ scope.row.everydaynum == -1 ? '无限' : scope.row.everydaynum }}
                </template>
                </el-table-column>
                <el-table-column
                prop="changenum"
                label="变动次数"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="surpnum"
                label="剩余次数"
                min-width="100"
                >
                <template slot-scope="scope">
                   {{ scope.row.surpnum == -1 ? '无限' : scope.row.surpnum }}
                </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="记录时间"
                min-width="150"
                >
                 <template slot-scope="scope">
                  {{ scope.row.create_time | fmtDate }}
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
import {alertPassword} from '@/utils/ele'
import { getMonthRecordInfo } from '@/require/tradeRecord'
import Util from '@/utils/util'
export default {
    data(){
        return {
            monthlyRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                  index: 1,
                  orderNum: '20191026091752648002291',
                  userName: '',
                  money: 0.6,
                  form: 2,
                  status: 1,
                  everyDayTimes: 1,
                  changeTimes: 1,
                  surTimes: 43,
                  handleTime: '2019-10-26 10:34:55'
                },
                {
                  index: 1,
                  orderNum: '20191026091752648002291',
                  userName: '',
                  money: 0.6,
                  form: 2,
                  status: 1,
                  everyDayTimes: 1,
                  changeTimes: 1,
                  surTimes: 43,
                  handleTime: '2019-10-26 10:34:55'
                }
            ],  
             totalPage: 1,
             nowPage: 1,
             loading: false
        }
    },
    components: {
        MyPagination
    },
    created(){
         let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr()
            this.monthlyRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.monthlyRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr()
            this.monthlyRecordForm= {startTime,endTime}
        }
       this.asyGetMonthRecordInfo(this.monthlyRecordForm)
    },
    methods: {
         getPage(page){
            this.monthlyRecordForm= {...this.monthlyRecordForm,currentPage:page}
            this.$router.push({query: this.monthlyRecordForm})
            this.asyGetMonthRecordInfo(this.monthlyRecordForm)
            this.nowPage = page
        },
        async asyGetMonthRecordInfo(data){
            let _this= this
            try{
                 _this.loading= true
                let monthlyInfo= await getMonthRecordInfo(data)
                 _this.loading= false
                 if(monthlyInfo.code === 200){
                    _this.tableData = monthlyInfo.listdata
                    _this.totalPage = monthlyInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleRefBtn(){
            alertPassword(function(){
                console.log(1)
            })
        },
        handleSearch(){
            this.$router.push({query:{... this.monthlyRecordForm,currentPage: 1}})
            this.asyGetMonthRecordInfo({... this.monthlyRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>