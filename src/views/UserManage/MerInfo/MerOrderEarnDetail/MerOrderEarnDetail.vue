<template>
    <div class="merOrderEarnDetail">
        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
            
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                v-if="paysource ==1"
                >
                </el-table-column>
                <el-table-column
                prop="expenditure"
                label="付款金额（元）"
                min-width="120"
                v-if="paysource ==1"
                >
                <!-- <template slot-scope="{row}">
                   {{ row.expenditure && row.expenditure.toFixed(2) }} 
                </template> -->
                </el-table-column>

                <el-table-column
                prop="durationtime"
                label="充电时间（分钟）"
                min-width="120"
                v-if="paysource ==1"
                >
                </el-table-column>

                <el-table-column
                prop="quantity"
                label="充电电量（度）"
                min-width="120"
                v-if="paysource ==1"
                >
                <template slot-scope="{row}">
                   {{ row.quantity/100 }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="paytype"
                label="付款方式"
                min-width="120"
                v-if="paysource ==1"
                >
                <template slot-scope="{row}">
                   {{ row.paytype == 1 ? "钱包" : row.paytype == 2 ? "微信" : row.paytype == 3 ? "支付宝" : "— —"  }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="begintime"
                label="充电时间"
                min-width="120"
                v-if="paysource ==1"
                >
                <template slot-scope="{row}">
                   {{ row.begintime | fmtDate }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="number"
                label="订单状态"
                min-width="120"
                v-if="paysource ==1"
                >
                <template slot-scope="{row}">
                  <el-link :underline="false" type="danger" v-if="row.number== 1 ">全额退款</el-link>
                  <el-link :underline="false" type="info" v-else-if="row.number== 2 ">部分退款(<span style="color: red;">row.refundMoney</span>)</el-link>
                  <el-link :underline="false" type="success" v-else>正常</el-link>
                </template>
                </el-table-column>

                <!-- 下面paysource == 2 -->

                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                v-if="paysource ==2"
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="付款金额（元）"
                min-width="120"
                v-if="paysource ==2"
                >
                <template slot-scope="{row}">
                   {{ row.money && row.money.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="coinNum"
                label="投币个数"
                min-width="120"
                v-if="paysource ==2"
                >
                </el-table-column>

                <el-table-column
                prop="handletype"
                label="支付方式"
                min-width="120"
                v-if="paysource ==2"
                >
                <template slot-scope="{row}">
                   {{ [1,4].includes(row.handletype) ? '微信' : [2,5].includes(row.handletype) ? '支付宝' : [3].includes(row.handletype) ? '投币' : [6,7].includes(row.handletype) ? '钱包' : [8,9].includes(row.handletype) ? '微信小程序' : [10,11].includes(row.handletype) ? '支付宝小程序' : ''}} 
                </template>
                </el-table-column>

                <el-table-column
                prop="beginTime"
                label="交易时间"
                min-width="120"
                v-if="paysource ==2"
                >
                <template slot-scope="{row}">
                     {{ row.beginTime | fmtDate }}
                </template>
                </el-table-column>

                <el-table-column
                prop="handletype"
                label="订单状态"
                min-width="120"
                v-if="paysource ==2"
                >
                <template slot-scope="{row}">
                    <el-link :underline="false" type="success" v-if="[1,2,3,6,8,10].includes(row.handletype)">正常</el-link>
                    <el-link :underline="false" type="danger" v-if="[4].includes(row.handletype)">微信已退费</el-link>
                    <el-link :underline="false" type="danger" v-if="[5].includes(row.handletype)">支付宝已退费</el-link>
                    <el-link :underline="false" type="danger" v-if="[7].includes(row.handletype)">已退款到钱包</el-link>
                    <el-link :underline="false" type="danger" v-if="[9].includes(row.handletype)">微信小程序已退费</el-link>
                    <el-link :underline="false" type="danger" v-if="[11].includes(row.handletype)">支付宝小程序已退费</el-link>
                </template>
                </el-table-column>

            <!-- 下面paysource == 3 -->
            <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                v-if="paysource ==3"
                >
                </el-table-column>
                <el-table-column
                prop="cardID"
                label="卡号"
                min-width="120"
                v-if="paysource ==3"
                >
                </el-table-column>

                <el-table-column
                prop="balance"
                label="卡余额"
                min-width="120"
                v-if="paysource ==3"
                >
                <template slot-scope="{row}">
                   {{ row.balance && row.balance.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="accountmoney"
                label="付款金额（元）"
                min-width="120"
                v-if="paysource ==3"
                >
                <template slot-scope="{row}">
                   {{ row.accountmoney && row.accountmoney.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="chargemoney"
                label="充卡金额（元）"
                min-width="120"
                v-if="paysource ==3"
                >
               <template slot-scope="{row}">
                   {{ row.chargemoney && row.chargemoney.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="paytype"
                label="支付方式"
                min-width="120"
                v-if="paysource ==3"
                >
               <template slot-scope="{row}">
                   {{ [1,3].includes(row.paytype) ? '微信' : [2,4].includes(row.paytype) ? '支付宝' : '' }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="beginTime"
                label="充值时间"
                min-width="120"
                v-if="paysource ==3"
                >
                <template slot-scope="{row}">
                     {{ row.beginTime | fmtDate }}
                </template>
                </el-table-column>

                <el-table-column
                prop="paytype"
                label="订单状态"
                min-width="120"
                v-if="paysource ==3"
                >
                <template slot-scope="{row}">
                    <el-link :underline="false" type="success" v-if="[1,2].includes(row.paytype)">正常</el-link>
                    <el-link :underline="false" type="danger" v-if="[3,4].includes(row.paytype)">退款</el-link>
                </template>
                </el-table-column>

            <!-- 下面paysource == 4 -->
                <el-table-column
                prop="withdrawnum"
                label="订单号"
                min-width="230"
                v-if="paysource ==4"
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="提现金额"
                min-width="120"
                v-if="paysource ==4"
                >
                <template slot-scope="{row}">
                   {{ row.money && row.money.toFixed(2) }} 
                </template>
                </el-table-column>
                <el-table-column
                prop="servicecharge"
                label="手续费"
                min-width="120"
                 v-if="paysource ==4"
                >
                 <template slot-scope="{row}">
                   {{ row.servicecharge && row.servicecharge.toFixed(2) }} 
                </template>
                </el-table-column>
                <el-table-column
                prop="userMoney"
                label="提现前金额	"
                min-width="120"
                 v-if="paysource ==4"
                >
                 <template slot-scope="{row}">
                   {{ row.userMoney && row.userMoney.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="bankname"
                label="银行	"
                min-width="150"
                 v-if="paysource ==4"
                >
                </el-table-column>

                <el-table-column
                prop="bankcardnum"
                label="银行卡号	"
                min-width="220"
                 v-if="paysource ==4"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="订单状态	"
                min-width="120"
                 v-if="paysource ==4"
                >
                <template slot-scope="{row}">
                    <el-link :underline="false" type="info" v-if="[0].includes(row.status)">待处理</el-link>
                    <el-link :underline="false" type="success" v-if="[1].includes(row.status)">已通过</el-link>
                    <el-link :underline="false" type="danger" v-if="[2].includes(row.status)">被拒绝</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="创建时间	"
                min-width="140"
                 v-if="paysource ==4"
                >
                <template slot-scope="{row}">
                    {{  row.createTime | fmtDate }}
                </template>
                </el-table-column>

             <!-- 下面paysource == 5 -->
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                v-if="paysource ==5"
                >
                </el-table-column>

                 <el-table-column
                prop="money"
                label="付款金额"
                min-width="120"
                v-if="paysource ==5"
                >
                <template slot-scope="{row}">
                   {{ row.money && row.money.toFixed(2) }} 
                </template>
                 </el-table-column>

                <el-table-column
                prop="balance"
                label="钱包金额（元）"
                min-width="120"
                v-if="paysource ==5"
                >
                <template slot-scope="{row}">
                   {{ row.balance && row.balance.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="accountmoney"
                label="支付方式"
                min-width="120"
                v-if="paysource ==5"
                >
                <template slot-scope="{row}">
                   微信
                </template>
                </el-table-column>

                <el-table-column
                prop="paytype"
                label="操作类型"
                min-width="120"
                v-if="paysource ==5"
                >
               <template slot-scope="{row}">
                   {{ row.paytype == 0 ? "钱包充值" : row.paytype == 1 ? "充值卡" : row.paytype == 2 ? "退款" : row.paytype == 3 ? "充电记录退费" : row.paytype == 4 ? "离线卡充值退费" : row.paytype == 5 ? "模拟投币退费" : "— —" }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="paytime"
                label="交易时间"
                min-width="120"
                v-if="paysource ==5"
                >
               <template slot-scope="{row}">
                   {{ row.paytime | fmtDate }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="paytype"
                label="订单状态"
                min-width="120"
                v-if="paysource ==5"
                >
                 <template slot-scope="{row}">
                    <el-link :underline="false" type="success" v-if="[0,1].includes(row.paytype)">正常</el-link>
                    <el-link :underline="false" type="danger" v-if="[2].includes(row.paytype)">钱包退款</el-link>
                    <el-link :underline="false" type="danger" v-if="[3,4,5].includes(row.paytype)">退费到钱包</el-link>
                </template>
                </el-table-column>
              <!-- 下面paysource == 6 -->

               <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                v-if="paysource ==6"
                >
               </el-table-column>

                 <el-table-column
                prop="cardID"
                label="卡号"
                min-width="120"
                v-if="paysource ==6"
                >
                 </el-table-column>

                <el-table-column
                prop="balance"
                label="余额"
                min-width="120"
                v-if="paysource ==6"
                >
                <template slot-scope="{row}">
                   {{ row.balance && row.balance.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="money"
                label="充值金额"
                min-width="120"
                v-if="paysource ==6"
                >
                <template slot-scope="{row}">
                   {{ row.money && row.money.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="accountmoney"
                label="到账金额"
                min-width="120"
                v-if="paysource ==6"
                >
                <template slot-scope="{row}">
                   {{ row.accountmoney && row.accountmoney.toFixed(2) }} 
                </template>
                </el-table-column>

                <el-table-column
                prop="type"
                label="类型"
                min-width="120"
                v-if="paysource ==6"
                >
                <template slot-scope="{row}">
                   {{ row.type == 1 ? "消费" : row.type == 2 ? "退款": row.type == 3 ? "充值" : row.type == 4 ? "卡操作"  : "其它"}} 
                </template>
                </el-table-column>

                <el-table-column
                prop="status"
                label="订单状态"
                min-width="120"
                v-if="paysource ==6"
                >
                <template slot-scope="{row}">
                    <el-link :underline="false" type="info" v-if="[0].includes(row.status)">未成功</el-link>
                    <el-link :underline="false" type="info" v-else-if="[1].includes(row.status)">成功</el-link>
                    <el-link :underline="false" type="info" v-else-if="[2].includes(row.status)">激活</el-link>
                    <el-link :underline="false" type="info" v-else-if="[3].includes(row.status)">绑定</el-link>
                    <el-link :underline="false" type="info" v-else-if="[4].includes(row.status)">解绑</el-link>
                    <el-link :underline="false" type="info" v-else-if="[5].includes(row.status)">解挂</el-link>
                    <el-link :underline="false" type="info" v-else-if="[6].includes(row.status)">注销</el-link>
                    <el-link :underline="false" type="info" v-else >激活</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="120"
                v-if="paysource ==6"
                >
                <template slot-scope="{row}">
                   {{ row.createTime | fmtDate }} 
                </template>
                </el-table-column>

            </el-table>
        </el-card>
        <!-- <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage"/> -->
    </div>
</template>

<script>
// import MyPagination from '@/components/common/MyPagination'
import { getDealerEarningsOrderDetail }  from '@/require/userManage'
import {messageTip} from '@/utils/ele'
export default {
    data(){
        return {
            paysource: 1,
            ordernum: '',
            type: '',
            tableData: [],
            loading:  false,
        
        }
    },
    created(){
        let { paysource,ordernum,type }= this.$route.query
        this.paysource= paysource
        this.ordernum= ordernum
        this.type= type
        this.asyGetDealerEarningsOrderDetail({paysource,ordernum,type})
    },
    methods: {
        async asyGetDealerEarningsOrderDetail(data){
            let _this= this
            try{
                let orderInfo= await getDealerEarningsOrderDetail(data)
                if(orderInfo.code  == 200){
                   _this.tableData= [orderInfo.order] 
                }else{
                    messageTip('error','获取数据失败')
                }
            }catch(error){

            }
        }
    }
}
</script>

<style>

</style>