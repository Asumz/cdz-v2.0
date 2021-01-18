<template>
    <div class="wechartOrder">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline"  size="mini">
                <el-form-item label="商户订单号" class="form_right25">
                    <el-input v-model="wechartOrderForm.order" placeholder="商户订单号" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="微信订单号" class="form_right25">
                    <el-input v-model="wechartOrderForm.number" placeholder="微信订单号" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="选择时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="wechartOrderForm.time"
                        size="small"
                        type="date"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

		 <!-- <el-card class="box-card">
            <el-table
                :data="totalContent"
                border
                v-loading="loading"
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="a"
                label="总交易单数"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="b"
                label="应结订单总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="c"
                label="退款总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="d"
                label="充值券退款总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="e"
                label="手续费总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="f"
                label="订单总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="g"
                label="申请退款总金额"
                min-width="80"
                >
                </el-table-column>
            </el-table>
        </el-card> -->


         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                fit
                style="width: 100%"
                :row-style="rowClass"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                width="80"
                >
                <template slot-scope="{$index}">
                    <!-- {{ (nowPage-1)*10+$index+1 }} -->
                    {{ $index+1 }}
                </template>
                </el-table-column>

				 <el-table-column
	                prop="WxOrderNo"
	                label="微信订单号"
	                min-width="200"
	                >
                </el-table-column>
	   		
				 <el-table-column
	                prop="BusinessOrderNo"
	                label="商户订单号"
	                min-width="200"
	                >
                </el-table-column>

				<el-table-column
	                prop="BusinessName"
	                label="类型"
	                min-width="200"
	            >
                <template slot-scope="scope">
                    {{ scope.row.BusinessName | fmtType }}
                </template>
                </el-table-column>
				
				<el-table-column
	                prop="WxRefundNo"
	                label="微信退款单号"
	                min-width="200"
	                >
                </el-table-column>

				 <el-table-column
	                prop="BusinessRefundNo"
	                label="商户退款单号"
	                min-width="200"
	                >
                </el-table-column>

				<el-table-column
	                prop="RefundAmount"
	                label="退款金额"
	                min-width="80"
	                >
                </el-table-column>

				<el-table-column
	                prop="RefundType"
	                label="退款类型"
	                min-width="80"
	            >
				<template slot-scope="{row}">
					{{ row.RefundType === 'ORIGINAL' ? '原路退款' : row.RefundType === 'BALANCE' ?  '转退到用户的微信支付零钱' : '— —'}}
				</template>
                </el-table-column>

				<el-table-column
	                prop="RefundStatus"
	                label="退款状态"
	                min-width="80"
	            >
				<template slot-scope="{row}">
					{{ row.RefundStatus === 'SUCCES' ? '退款成功' : row.RefundStatus === 'FAIL' ?  '退款失败' : row.RefundStatus === 'PROCESSING' ? '退款处理中'  : '— —'}}
				</template>
                </el-table-column>

				<el-table-column
	                prop="creattime"
	                label="交易时间"
	                min-width="150"
	                >
                </el-table-column>
                <el-table-column
	                label="操作"
	                min-width="100"
                    fixed="right"
	            >
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleRef(scope.row)" :disabled="scope.row.RefundStatus === 'SUCCESS'">退款</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage"/>
    </div>
</template>

<script>

import { inquireWeChatLostOrder,lostDoReturn } from '@/require/settlement'
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {messageTip,alertPassword} from '@/utils/ele'
// const tabList= {
// 	   	creattime: "交易时间",
// 	   	commonId: "公众账号ID",
// 	   	businessnum: "商户号",
// 	   	childBusinessnum: "子商户号",
// 	   	equipmentnum: "设备号",
// 	   	WxOrderNo: "微信订单号",
// 	   	BusinessOrderNo: "商户订单号",
// 	   	UserIdentity: "用户标识",
// 	   	TransType: "交易类型",
		
// 		TransStatus: "交易状态",
// 	   	PaymentBank: "付款银行",
// 	   	Currency: "货币种类",
// 	   	TotalAmount: "总金额",
// 	   	RedEnvelopesAmount: "企业红包金额",

// 	   	WxRefundNo: "微信退款单号",
// 	   	BusinessRefundNo: "商户退款单号",
// 	   	RefundAmount: "退款金额",
// 	   	RedEnvelopesRefundAmount: "企业红包退款金额",
// 	   	RefundType: "退款类型",

// 	   	RefundStatus: "退款状态",
// 	   	BusinessName: "商品名称",
// 	   	BusinessData: "商户数据包",
// 	   	Fee: "手续费",
// 	   	Rate: "费率",
//        }
//     const keyList= Object.keys(tabList) 
//     const valueList= Object.values(tabList) 

const map= ['a','b','c','d','e','f','g']
const reg= /\((.+)\)/
export default {
    data(){
        return {
            pickerOptions: dateTimeJS,
            wechartOrderForm: {},
            tableData: [],
            loading: false,
            totalPage: 1, //共1条数据
            nowPage: 1, //当前页数 
			// totalHeader: [],
            // totalContent: [],
            // listlost: []
        }
    },
    components: {
        MyPagination
    },
	created(){
        let {VNK,...query}= this.$route.query
        if(Object.keys(query).length > 0){
             this.wechartOrderForm= {...this.$route.query}
             let page= parseInt(this.$route.query.currentPage)
             this.nowPage= isNaN(page) ? 1  :page
        }else {
             this.nowPage=  1
             this.wechartOrderForm= {...this.$route.query,time: this.$route.query.time || this.$fmtDate(new Date()-24*60*60*1000,'YYYY-MM-DD')}
        }
        this.asyGetWechartList({... this.wechartOrderForm,currentPage: this.nowPage})
	},
    methods: {
		async asyGetWechartList(data){
			let _this= this
            this.loading= true
            try {
                let info= await inquireWeChatLostOrder(data)
                if(info.code === 200){
                    this.tableData= info.listdata
                    this.totalPage= info.totalRows
                }
            }
            finally {
                this.loading= false
            }
        },
        rowClass({row,rowIndex}){ //改变选中行的颜色
            if(row.isLost){
                return {"backgroundColor": 'rgba(255,0,0,.1)'}
            }
        },
        handleSearch(){
            this.nowPage= 1
            this.$router.push({query: {...this.wechartOrderForm,VNK: this.$route.query.VNK,currentPage: 1}})
			this.asyGetWechartList({...this.wechartOrderForm,currentPage: 1})
        },
        handleRef(row){ //退费接口
            try {
                alertPassword(async ()=>{
                    let info= await lostDoReturn({ordernum: row.BusinessOrderNo,id: row.id})
                    if(info.code === 200){
                        this.asyGetWechartList({time:this.time,currentPage: this.nowPage})
                        messageTip('success','退款成功')
                    }else{
                        messageTip('error',info.message)
                    }
                }) 
            }
            catch(e){
                console.log(e)
            }
        },
        getPage(page){ //分页发改变时，触发回调
            this.nowPage = page
            this.wechartOrderForm= { ...this.$route.query, currentPage: page }
            this.$router.push({query: {...this.wechartOrderForm,VNK: this.$route.query.VNK}})
            this.asyGetWechartList(this.wechartOrderForm)
        }
    },
    filters: {
        fmtType(value){
            if(!value) return ''
            return value.replace(/(.+)?\((.+)\)(.+)?/,'$2')
        }
    }
}
</script>

<style lang="less">
.wechartOrder {
    .el-table tbody tr:hover>td { 
        background-color:transparent !important;
    }
}
</style>