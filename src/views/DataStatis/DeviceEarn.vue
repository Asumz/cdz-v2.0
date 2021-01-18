<template>
   <div class="deviceEarn">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" size="mini" v-model="deviceEarnForm">
                <el-form-item label="订单数" class="form_right25">
                     <el-select v-model="deviceEarnForm.rankorder" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总金额" class="form_right25">
                     <el-select v-model="deviceEarnForm.rankmoney" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="deviceEarnForm.devicenum" placeholder="请输入设备号"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="deviceEarnForm.realname" placeholder="请输入商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25" >
                    <el-input v-model="deviceEarnForm.phone" placeholder="请输入手机号"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="deviceEarnForm.startTime"
                        size="small"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择开始时间">
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="small"
                        v-model="deviceEarnForm.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择结束时间">
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
                style="width: 100%"
                v-loading="loading"
                 element-loading-text="加载中"
                :summary-method="getSummaries" 
                :show-summary="true"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="count_time"
                label="时间"
                min-width="100"
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="code"
                label="设备号"
                min-width="100"
                fixed
                >
                <template slot-scope="scope">
                    <router-link :to="`/deviceManage/deviceList?devicenum=${scope.row.code}`">
                        <el-link type="primary" >{{scope.row.code}}</el-link>
                    </router-link>
                </template>
               
                </el-table-column>
                <el-table-column
                prop="realname"
                label="归属商户"
                min-width="100"
                >
                <template slot-scope="scope">
                    {{scope.row.realname && scope.row.realname.length > 0 ? scope.row.realname : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="手机号"
                min-width="120"
                >
                 <template slot-scope="scope">
                    <router-link :to="`/usermanage/merInfo?phone=${scope.row.phone}`">
                        <el-link type="primary" >{{scope.row.phone}}</el-link>
                    </router-link>
                </template>
                </el-table-column>

                 <el-table-column
                prop="arename"
                label="归属小区"
                min-width="100">
                 <template slot-scope="scope">
                    {{scope.row.arename && scope.row.arename.length > 0 ? scope.row.arename : '— —'}}
                 </template>
                </el-table-column>
                <el-table-column
                prop="moneytotal"
                label="总收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="ordertotal"
                label="总订单"
                min-width="100">
                </el-table-column>

                <el-table-column
                prop="wechatmoney"
                label="微信收益"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="wechatorder"
                label="微信订单"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="alipaymoney"
                label="支付宝收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="alipayorder"
                label="支付宝订单"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="wechatretmoney"
                label="微信退费"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="wechatretord"
                label="微信退费订单"
                min-width="100">
                </el-table-column>

                 <el-table-column
                prop="alipayretmoney"
                label="支付宝退费"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="alipayretord"
                label="支付宝退费订单"
                min-width="100">
                </el-table-column>

                  <el-table-column
                prop="incoinsmoney"
                label="投币金额"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="incoinsorder"
                label="投币订单"
                min-width="100">
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" :nowPage="nowPage" @getPage="getPage"/>
   </div>
</template>

<script>
import MyPagination from '../../components/common/MyPagination'
import { handleGetDeviceEarn } from '@/require/datastatis'
import Util from '@/utils/util'
export default {
   data(){
       return {
           deviceEarnForm: {
               rankmoney: '',
               rankorder: '',
               devicenum: '',
               phone: '',
               realname: '',
               startTime: '',
               endTime: ''
           },
           loading: false,
           tableData: [], //每条数据
           gatherData: {},//汇总数据
           totalPage: 1, //共500条数据
           nowPage: 1 //当前页数   
       }
   },
    components: {
       MyPagination 
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',7)
            this.deviceEarnForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.deviceEarnForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',7)
            this.deviceEarnForm= {startTime,endTime}
        }

        // if(JSON.stringify(this.$route.query) != "{}"){
        //     this.deviceEarnForm= {...this.$route.query}
        // }
        this.asyHandleGetDeviceEarn(this.deviceEarnForm)
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            let obj= {...this.deviceEarnForm,currentPage:page}
            this.asyHandleGetDeviceEarn(obj)
            this.nowPage = page
        },
        getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                const values = data.map(item => Number(item[column.property])); 
                if (!values.every(value => isNaN(value))) {
                  let keyVal={
                            5: 'moneytotal',
                            6: 'ordertotal',
                            7: 'wechatmoney',
                            8: 'wechatorder',
                            9: 'alipaymoney',
                            10: 'alipayorder',
                            11: 'wechatretmoney',
                            12: 'wechatretord',
                            13: 'alipayretmoney',
                            14: 'alipayretord',
                            15: 'incoinsmoney',
                            16: 'incoinsorder'
                        }
                    sums[index]= this.gatherData[keyVal[index]]
                } else {
                    sums[index] = 'N/A';
                }
                });
                return sums;
               
            },
            async asyHandleGetDeviceEarn(data){
                let _this= this
                try {
                    _this.loading= true
                    let deviceInfo= await handleGetDeviceEarn({...data,exportType:1})
                    _this.loading= false
                    _this.tableData= deviceInfo.listdata
                    _this.gatherData= deviceInfo.totaldata
                    _this.totalPage= deviceInfo.totalRows
                } catch (error) {
                   if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                       _this.loading= true
                       return 
                   }
                       _this.loading= false
                }
            },
             handleSearch(){ //点击搜索查询
                this.$router.push({query: this.deviceEarnForm})
                this.asyHandleGetDeviceEarn(this.deviceEarnForm)
                this.nowPage= 1 //搜索完之后将nowPage置为1
            }
    }
}
</script>

<style lang="less">
    // .deviceEarn {
       
    // }
</style>