<template>
    <div class="hisStatis">
         <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" v-model="hisStatisForm" size="mini">
                <el-form-item label="订单数" class="form_right25">
                     <el-select v-model="hisStatisForm.rankorder" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总金额" class="form_right25">
                     <el-select v-model="hisStatisForm.rankmoney" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="hisStatisForm.startTime"
                        size="small"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择开始时间"
                        
                        >
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="small"
                        v-model="hisStatisForm.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择结束时间"
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
                v-loading="loading"
                style="width: 100%"
                :summary-method="getSummaries" 
                :show-summary="true"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="count_time"
                label="时间"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="moneytotal"
                label="总金额"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="ordertotal"
                label="总订单"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="wecmoney"
                label="微信金额"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="wecorder"
                label="微信订单"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="alimoney"
                label="支付宝订单"
                min-width="120">
                </el-table-column>

                 <el-table-column
                prop="wecretmoney"
                label="微信退费金额"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="wecretord"
                label="微信退费订单"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="aliretmoney"
                label="支付宝退费金额"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="aliretord"
                label="支付宝退费订单"
                min-width="120">
                </el-table-column>
                 <el-table-column
                prop="incoinsmoney"
                label="投币金额"
                min-width="120">
                </el-table-column>
                 <el-table-column
                prop="incoinsorder"
                label="投币订单"
                min-width="120">
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
    </div>
</template>

<script>
import Vue from 'vue'
import MyPagination from '../../components/common/MyPagination'
import {handleHisStatis} from '@/require/datastatis'
import Util from '@/utils/util'
export default {
    data(){
        return {
           hisStatisForm: {
               rankorder: '',
               rankmoney: '',
               startTime: '',
               endTime: ''
           },
           loading: false,
           tableData: [], //每条数据
           gatherData: {},//汇总数据
           totalPage: 1, //共1条数据
           nowPage: 1 //当前页数    
        }
    },
    components: {
        MyPagination
    },
    created(){
       let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',30)
            this.hisStatisForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.hisStatisForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',30)
            this.hisStatisForm= {startTime,endTime}
        }
        this.getHisStatisData(this.hisStatisForm)
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
           let obj= {...this.hisStatisForm,currentPage:page}
            this.getHisStatisData(obj)
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
                            1: 'tmoneytotal',
                            2: 'tordertotal',
                            3: 'twecmoney',
                            4: 'twecorder',
                            5: 'talimoney',
                            6: 'taliorder',
                            7: 'twecretmoney',
                            8: 'twecretord',
                            9: 'taliretmoney',
                            10: 'taliretord',
                            11: 'tincoinsmoney',
                            12: 'tincoinsorder',
                          
                        }
                    sums[index]= this.gatherData[keyVal[index]]
                } else {
                    sums[index] = 'N/A';
                }
                });
                return sums;
               
            },
             async getHisStatisData(data){ //发送请求获取信息
                let _this= this
                try{
                    _this.loading= true
                    let hisStatisData= await handleHisStatis(data)
                    _this.loading= false
                    _this.tableData= hisStatisData.listdata
                    _this.gatherData= hisStatisData.totaldata
                    _this.totalPage= hisStatisData.totalRows
                }
                catch(error){
                    if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                       _this.loading= true
                       return 
                   }
                       _this.loading= false
                }
            },
            handleSearch(){ //点击搜索查询
                this.$router.push({query: this.hisStatisForm})
                this.getHisStatisData(this.hisStatisForm)
                this.nowPage= 1 //搜索完之后将nowPage置为1
            }
    
    }
}
</script>

<style lang="less" >
 
</style>