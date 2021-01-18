<template>
    <div class="merEarnDetail">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="merEarnDetailForm" size="mini" >
                <el-form-item label="订单号" class="form_right25">
                    <el-input v-model="merEarnDetailForm.order" placeholder="请输入订单号"  size="small" clearable></el-input>
                </el-form-item>

                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="merEarnDetailForm.type"  placeholder="请选择支付方式"  size="small" clearable>
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="类型" class="form_right25">
                     <el-select v-model="merEarnDetailForm.status"  placeholder="请选择支付方式"  size="small" clearable>
                        <el-option label="收入" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25 w200" clearable>
                     <el-date-picker
                        v-model="merEarnDetailForm.startTime"
                        size="small"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        placeholder="选择开始时间"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200" clearable>
                     <el-date-picker
                        v-model="merEarnDetailForm.endTime"
                        size="small"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
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
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="60"
                >
                <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo/merOrderEarnDetail?ordernum=${row.ordernum}&paysource=${row.paysource}&type=${row.status}`" v-if="row.paysource != 0">
                        <el-link type="primary">{{row.ordernum}}</el-link>
                    </router-link>
                    <span v-else> {{ row.ordernum }}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额"
                min-width="120"
                >
                    <template slot-scope="scope">
                        <el-link  type="success" :underline="false" v-if="scope.row.status==1">+{{scope.row.money}}</el-link>
                        <el-link type="danger" :underline="false" v-else>-{{scope.row.money}}</el-link>
                    </template>
                 </el-table-column>
                <el-table-column
                prop="balance"
                label="余额"
                min-width="120"
                >
                 </el-table-column>
                <el-table-column
                prop="paytype"
                label="支付方式"
                min-width="120"
                >
                 <template slot-scope="scope">
                        <el-link  type="success" :underline="false" v-if="scope.row.paytype==1">钱包支付</el-link>
                        <el-link  type="success" :underline="false" v-if="scope.row.paytype==2">微信支付</el-link>
                        <el-link  type="success" :underline="false" v-if="scope.row.paytype==3">支付宝支付</el-link>
                        <el-link  type="success" :underline="false" v-if="scope.row.paytype==4">银联支付</el-link>
                    </template>
                 </el-table-column>
                <el-table-column
                prop="tyle"
                label="类型"
                min-width="120"
                >
                    <template slot-scope="scope">
                       <el-link type="success" :underline="false" v-if="scope.row.status==1">收入</el-link>
                       <el-link type="danger" :underline="false" v-else>支出</el-link>
                    </template>
                 </el-table-column>
                <el-table-column
                prop="date"
                label="时间"
                min-width="180"
                >create_time
                    <template slot-scope="scope">
                        {{scope.row.create_time|fmtDate}}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage"/>
    </div>
</template>
<script>
import MyPagination from '@/components/common/MyPagination'
import { merEarnDetail } from '@/require/userManage'
import Util from '@/utils/util'
export default {
    data(){
        return {
            merEarnDetailForm: {
                order: '',
                type: '',
                status: '',
                startTime: '',
                endTime: ''
            },
            tableData: [],
            totalPage: 1,
            loading: false,
            dealer: '',
            nowPage: 1 //当前页数
        }
    },
    created(){
        let {VNK,dealer,...routerKey}=  this.$route.query
        this.dealer= dealer
        if(Object.keys(routerKey).length > 0){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',15)
            this.merEarnDetailForm= {...this.$route.query,endTime}
            this.nowPage= parseInt(this.merEarnDetailForm.currentPage) || 1
        }else {
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',15)
            this.merEarnDetailForm= {startTime,endTime}
        }
        this.asyMerEarnDetail({...this.merEarnDetailForm,dealer})
    },
    methods: {
        getPage(page){
            let obj= {...this.merEarnDetailForm,currentPage:page,dealer: this.dealer}
            this.$router.push({query: obj})
            this.asyMerEarnDetail(obj)
            this.nowPage = page
        },
        async asyMerEarnDetail(data){
            let _this= this
                try {
                    _this.loading= true
                    let deviceInfo= await merEarnDetail(data)
                    _this.loading= false
                    if(deviceInfo.code == 200){
                        this.tableData= deviceInfo.listdata
                        this.totalPage= deviceInfo.totalRows
                    }
                    
                } catch (error) {
                   if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                       _this.loading= true
                       return 
                   }
                       _this.loading= false
                }
        },
        handleSearch(){ //点击搜索查询
            this.$router.push({query: {...this.merEarnDetailForm,dealer: this.dealer}})
            this.asyMerEarnDetail({...this.merEarnDetailForm,dealer: this.dealer})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    },
    components: {
        MyPagination
    }
}
</script>

<style lang="less">
.merEarnDetail {
    .el-link.el-link--success {
        text-decoration: none;
    }   
}

</style>