<template>
    <div class="orderDetail">
         <el-card class="box-card">
             <!-- paysource    1 -->
            <div v-if="paysource == 1">
                <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    min-width="230"
                    >
                    </el-table-column>

                     <el-table-column
                        prop="payMoney"
                        label="付款金额（元）"
                        min-width="120"
                        >
                        <template slot-scope="scope">
                            <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                            <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                        </template>
                    </el-table-column>

                    <el-table-column
                    prop="chargeTime"
                    label="充电时间（分钟）"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="quantity"
                    label="充电电量（度）"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="payType"
                    label="付款方式"
                    min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="充电时间"
                    min-width="200"
                    >
                    <template slot-scope="scope">
                        {{scope.row.date | fmtDate}}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="status"
                    label="订单状态"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                    <span v-html="scope.row.status"></span>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <div v-if="paysource ==1">
                            <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3,8,12].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,1,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==2">
                            <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                            @click="refundMoneyBtn(row.id,2,row.handletype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==3">
                            <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,3,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==4">
                            <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,4,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==5">
                            <el-button type="danger" size="mini" v-if="row.flag == 1"
                            @click="refundMoneyBtn(row.id,5,row.type)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==6">
                            <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                            @click="refundMoneyBtn(row.id,6,'2')"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>
                    
                    </template>
                    </el-table-column>

                </el-table>
            </div>

             <!-- paysource    2 -->
            <div v-if="paysource == 2">
                <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    min-width="230"
                    >
                    </el-table-column>

                     <el-table-column
                        prop="payMoney"
                        label="付款金额（元）"
                        min-width="120"
                        >
                        <template slot-scope="scope">
                            <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                            <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                        </template>
                    </el-table-column>

                     <el-table-column
                    prop="num"
                    label="投币个数"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="payType"
                    label="支付方式"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="handleTime"
                    label="交易时间"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                        {{scope.row.handleTime | fmtDate}}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="status"
                    label="订单状态"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                    <span v-html="scope.row.status"></span>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <div v-if="paysource ==1">
                            <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,1,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==2">
                            <el-button type="danger" size="mini" v-if="[1,2,6,8,10,12].includes(row.handletype)"
                            @click="refundMoneyBtn(row.id,2,row.handletype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==3">
                            <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,3,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==4">
                            <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,4,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==5">
                            <el-button type="danger" size="mini" v-if="row.flag == 1"
                            @click="refundMoneyBtn(row.id,5,row.type)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==6">
                            <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                            @click="refundMoneyBtn(row.id,6,'2')"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>
                    
                    </template>
                    </el-table-column>

                </el-table>
            </div>

             <!-- paysource    3 -->
            <div v-if="paysource == 3">
                <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    min-width="230"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="cardNum"
                    label="卡号"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="cardMoney"
                    label="卡余额"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="payType"
                    label="支付方式"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="time"
                    label="充值时间"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                        {{scope.row.time | fmtDate}}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="status"
                    label="订单状态"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                    <span v-html="scope.row.status"></span>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <div v-if="paysource ==1">
                            <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,1,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==2">
                            <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                            @click="refundMoneyBtn(row.id,2,row.handletype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==3">
                            <el-button type="danger" size="mini" v-if="[1,2,8].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,3,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==4">
                            <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,4,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==5">
                            <el-button type="danger" size="mini" v-if="row.flag == 1"
                            @click="refundMoneyBtn(row.id,5,row.type)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==6">
                            <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                            @click="refundMoneyBtn(row.id,6,'2')"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>
                    
                    </template>
                    </el-table-column>

                </el-table>
            </div>

             <!-- paysource    4 -->
            <div v-if="paysource == 4">
                <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    min-width="230"
                    >
                    </el-table-column>

                     <el-table-column
                        prop="payMoney"
                        label="操作金额（元）"
                        min-width="150"
                        >
                        <template slot-scope="scope">
                            <div>
                                充值金额：
                                <el-link :type=" scope.row.tomoney >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.money.toFixed(2)}}</el-link>
                            </div>
                            <div>
                                赠送金额：
                                <el-link :type=" scope.row.tomoney >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.sendmoney.toFixed(2)}}</el-link>
                            </div>
                            <!-- <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                            <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link> -->
                        </template>
                    </el-table-column>

                    <el-table-column
                    prop="walletMoney"
                    label="钱包余额（元）"
                    min-width="150"
                    >
                     <template slot-scope="scope">
                        <!-- {{ scope.row.balance != null ? scope.row.balance.toFixed(2) : '— —' }} -->
                        <div>
                            充值余额：
                            <el-link type="primary" :underline="false">
                                    {{ scope.row.topupbalance != null ? scope.row.topupbalance.toFixed(2)  :  '— —'}}
                            </el-link>
                        </div>
                        <div>
                            赠送余额：
                            <el-link type="primary" :underline="false">
                                    {{ scope.row.givebalance != null ? scope.row.givebalance.toFixed(2)  :  '— —'}}
                            </el-link>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="payType"
                    label="支付方式"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="handleType"
                    label="操作类型"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="handleTime"
                    label="交易时间"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                        {{scope.row.handleTime | fmtDate}}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="status"
                    label="订单状态"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                    <span v-html="scope.row.status"></span>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <div v-if="paysource ==1">
                            <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,1,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==2">
                            <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                            @click="refundMoneyBtn(row.id,2,row.handletype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==3">
                            <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,3,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==4">
                            <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,4,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==5">
                            <el-button type="danger" size="mini" v-if="row.flag == 1"
                            @click="refundMoneyBtn(row.id,5,row.type)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==6">
                            <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                            @click="refundMoneyBtn(row.id,6,'2')"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>
                    
                    </template>
                    </el-table-column>

                </el-table>
            </div>

             <!-- paysource   5 -->
            <div v-if="paysource == 5">
                <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    min-width="230"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="cardNum"
                    label="卡号"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="money1"
                    label="金额"
                    min-width="160"
                    >
                    <template slot-scope="scope">
                        <div>
                            充值金额：
                            <el-link type="default" >
                                    {{ scope.row.money != null ? scope.row.money.toFixed(2)  :  '— —'}}
                            </el-link>
                        </div>
                        <div>
                            赠送金额：
                            <el-link type="default" >
                                    {{ scope.row.sendmoney != null ? scope.row.sendmoney.toFixed(2)  :  '— —'}}
                            </el-link>
                        </div>
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="money2"
                    label="到账金额"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="cardMoney"
                    label="卡余额"
                    min-width="160"
                    >
                     <template slot-scope="scope">
                        <div>
                            充值金额：
                            <el-link type="default" >
                                    {{ scope.row.topupbalance != null ? scope.row.topupbalance.toFixed(2)  :  '— —'}}
                            </el-link>
                        </div>
                        <div>
                            赠送金额：
                            <el-link type="default" >
                                    {{ scope.row.givebalance != null ? scope.row.givebalance.toFixed(2)  :  '— —'}}
                            </el-link>
                        </div>
                    </template>
                    </el-table-column>

                     <el-table-column
                    prop="handleType"
                    label="操作类型"
                    min-width="120"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="status"
                    label="订单状态"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                    <span v-html="scope.row.status"></span>
                    </template>
                    </el-table-column>

                     <el-table-column
                    prop="time3"
                    label="创建时间"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                        {{scope.row.time3 | fmtDate}}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <div v-if="paysource ==1">
                            <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,1,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==2">
                            <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                            @click="refundMoneyBtn(row.id,2,row.handletype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==3">
                            <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,3,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==4">
                            <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,4,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==5">
                            <el-button type="danger" size="mini" v-if="row.flag == 1"
                            @click="refundMoneyBtn(row.id,5,row.type)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==6">
                            <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                            @click="refundMoneyBtn(row.id,6,'2')"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>
                    
                    </template>
                    </el-table-column>
                </el-table>
            </div>

             <!-- paysource    6 -->
            <div v-if="paysource == 6">
                <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                    <el-table-column
                    prop="orderNum"
                    label="订单号"
                    min-width="230"
                    >
                    </el-table-column>

                    <el-table-column
                    prop="money1"
                    label="充值金额"
                    min-width="120"
                    >
                    </el-table-column>

                     <el-table-column
                    prop="status"
                    label="订单状态"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                    <span v-html="scope.row.status"></span>
                    </template>
                    </el-table-column>

                     <el-table-column
                    prop="time3"
                    label="创建时间"
                    min-width="120"
                    >
                    <template slot-scope="scope">
                        {{scope.row.time3 | fmtDate}}
                    </template>
                    </el-table-column>

                    <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <div v-if="paysource ==1">
                            <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,1,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==2">
                            <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                            @click="refundMoneyBtn(row.id,2,row.handletype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==3">
                            <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,3,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==4">
                            <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                            @click="refundMoneyBtn(row.id,4,row.paytype)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==5">
                            <el-button type="danger" size="mini" v-if="row.flag == 1"
                            @click="refundMoneyBtn(row.id,5,row.type)"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>

                        <div v-if="paysource ==6">
                            <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                            @click="refundMoneyBtn(row.id,6,'2')"
                            >退款</el-button>
                            <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                        </div>
                    
                    </template>
                    </el-table-column>

                </el-table>
            </div>


            <!-- <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="orderNum"
                label="订单号"
                min-width="230"
                v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="cardNum"
                label="卡号"
                min-width="120"
                v-if="['3','5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="cardMoney"
                label="卡余额"
                min-width="120"
                v-if="['3','5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="money1"
                label="充值金额"
                min-width="120"
                v-if="['5','6'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="money2"
                label="到账金额"
                min-width="120"
                v-if="['5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="payMoney"
                label="付款金额（元）"
                min-width="120"
                 v-if="['1','2','4'].includes(paysource)"
                >
                <template slot-scope="scope">
                    <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="walletMoney"
                label="钱包金额（元）"
                min-width="120"
                v-if="['4'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="num"
                label="投币个数"
                min-width="120"
                 v-if="['2'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="120"
                 v-if="['2','3','4'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="handleType"
                label="操作类型"
                min-width="120"
                 v-if="['4','5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="handleTime"
                label="交易时间"
                min-width="120"
                 v-if="['2','4'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.handleTime | fmtDate}}
                </template>
                </el-table-column>

                <el-table-column
                prop="chargeTime"
                label="充电时间（分钟）"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="time"
                label="充值时间"
                min-width="120"
                v-if="['3'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.time | fmtDate}}
                </template>
                </el-table-column>
               
                <el-table-column
                prop="quantity"
                label="充电电量（度）"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="payType"
                label="付款方式"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="充电时间"
                min-width="200"
                v-if="['1'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.date | fmtDate}}
                </template>
                </el-table-column>
                   
                <el-table-column
                prop="status"
                label="订单状态"
                min-width="120"
                 v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                   <span v-html="scope.row.status"></span>
                </template>
                </el-table-column>

                <el-table-column
                prop="time3"
                label="创建时间"
                min-width="120"
                 v-if="['5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.time3 | fmtDate}}
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                 v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                <template slot-scope="{row}">
                    <div v-if="paysource ==1">
                         <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                        @click="refundMoneyBtn(row.id,1,row.paytype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                    <div v-if="paysource ==2">
                         <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                        @click="refundMoneyBtn(row.id,2,row.handletype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==3">
                         <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                        @click="refundMoneyBtn(row.id,3,row.paytype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==4">
                         <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                        @click="refundMoneyBtn(row.id,4,row.paytype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==5">
                         <el-button type="danger" size="mini" v-if="row.flag == 1"
                        @click="refundMoneyBtn(row.id,5,row.type)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==6">
                         <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                        @click="refundMoneyBtn(row.id,6,'2')"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>
                   
                </template>
                </el-table-column>
            </el-table> -->
         </el-card>

         <el-dialog
            title="请输入右边的验证码"

            :visible.sync="dialogVisible"
            width="400px"
            :before-close="handleClose">
            <el-row>
                <el-col :span="16">
                     <el-input placeholder="请输入验证码" v-model="userVerifiCode"></el-input>
                </el-col>
                <el-col :span="7" :offset="1" >
                    <VerifiCode @backCode= "backCode" ref="verifi" />
                </el-col>
            </el-row>
            <p style="color: red; margin-top: 5px;" v-show="tipText">验证码不正确</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;userVerifiCode= '';tipText= false; $refs.verifi.initCode();" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmVerifiCode" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getOrderTradeDataDetail,getOtherOrderTradeDataDetail,tradeRefEntrance} from '@/require/tradeRecord'
import VerifiCode from '@/components/common/VerifiCode'
import { messageTip,alertPassword } from '@/utils/ele'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            tableData: [],
            loading: false,
            paysource: 1,
            orderid: 0,
            status: undefined,
            orderNum: undefined,
            dialogVisible: false,
            verifiCode: '', //验证码
            userVerifiCode: '', //用户输入的验证码
            tipText: false,
            refComtent: {} //退费订单信息，包含orderid paysorse,paytype
        }
    },
    components: { VerifiCode },
    computed: {
        ...mapState(['userInfo'])
    },
    created(){
        let {paysource,orderId,status,orderNum}=  this.$route.query
        this.paysource= paysource
        this.orderid= orderId
        this.status= status
        this.orderNum= orderNum
        if(typeof this.status == 'undefined'){ //从交易记录中进去
            this.asyGetOrderTradeDataDetail({orderid: this.orderid,paysource: 1})
        }else{ //从其他地方中进去
            this.asyGetOtherOrderTradeDataDetail({orderid: this.orderid,paysource: this.paysource, status : this.status,ordernum: this.orderNum})
        } 
    },
    methods: {
        async asyGetOrderTradeDataDetail(data){ 
            let _this= this
            try {
                 _this.loading= true
                let tradeDataDetail= await getOrderTradeDataDetail(data)
                 _this.loading= false
                 if(tradeDataDetail.code == 200){
                     _this.handleData(tradeDataDetail.order,tradeDataDetail.ordertrade)
                 }

            }catch(error){
                console.log(error)
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
         async asyGetOtherOrderTradeDataDetail(data){  //从其他记录中进去
            let _this= this
            try {
                 _this.loading= true
                let tradeDataDetail= await getOtherOrderTradeDataDetail(data)
                 _this.loading= false
                 if(tradeDataDetail.code == 200){
                     _this.handleData(tradeDataDetail.order,tradeDataDetail.ordertrade)
                 }

            }catch(error){
                console.log(error)
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleData(order,ordertrade){
            let obj= {}
            if(this.paysource == 1){
                let {ordernum,number,durationtime,quantity,paytype,begintime,expenditure,refundMoney,id} = order
                obj.orderNum= ordernum
                expenditure= expenditure== null ? 0 : expenditure
                obj.payMoney= [1,2].includes(number) ? (0-expenditure).toFixed(2) : expenditure.toFixed(2) 
                obj.chargeTime= durationtime
                obj.quantity= quantity/100
                obj.payType= paytype == 1 ? "钱包" : paytype == 2 ? "微信" : paytype == 3 ? "支付宝" : paytype == 4 ? "包月" :  paytype == 8 ? "支付宝小程序" :  paytype == 12 ? "银联" : "— —" 
                obj.date= begintime
                obj.status= number == 1 ? '全额退款' : number == 0 ? '正常' : number == 2 ?  `部分退款(<span style="color: red;">${refundMoney}</span>)` : '— —'
                obj.number= number
                obj.paytype= paytype
                obj.id= id
                this.tableData= [obj]
            }else if(this.paysource == 2){
                let {ordernum,money,status,handletype,beginTime,coinNum,id} = order
                obj.id= id
                obj.payMoney= status == 1 ? money.toFixed(2) : status == 2 ? (0-money).toFixed(2) : '— —'
                obj.orderNum= ordernum
                obj.num= coinNum
                console.log(handletype)
                obj.payType= [1,4].includes(handletype) ? '微信' : [2,5].includes(handletype) ? '支付宝' : [3].includes(handletype) ? '投币' : [6,7].includes(handletype) ? '钱包': [8,9].includes(handletype) ? '微信小程序' : [10,11].includes(handletype) ? '支付宝小程序' : [12].includes(handletype) ? '银联' : '— —'
                obj.handleTime= beginTime
                obj.status= [1,2,3,6,8,10,12].includes(handletype) ? '正常' : [4].includes(handletype) ? '微信已退费' :  [5].includes(handletype) ? '支付宝已退费' : [7].includes(handletype) ? '已退款到钱包' : [9].includes(handletype) ? '微信小程序已退费' : [11].includes(handletype) ? '支付宝小程序已退费' : [13].includes(handletype) ? '银联已退费' : '— —'
                obj.handletype= handletype
                this.tableData= [obj]
            }else if(this.paysource == 3){
                let {ordernum,cardID,balance,paytype,beginTime,status,id} = order
                obj.id= id
                obj.orderNum= ordernum
                obj.cardNum= cardID
                obj.cardMoney= balance.toFixed(2)
                obj.payType= [1,3].includes(paytype) ? '微信' : [2,4].includes(paytype) ? '支付宝' : [8].includes(paytype) ? '支付宝小程序' : '查询'
                obj.time= beginTime
                obj.status= [1,2,5,8].includes(paytype) ? '正常' : [3,4,6,9].includes(paytype) ? '退款' :  '— —'
                obj.paytype= paytype
                this.tableData= [obj]
            }else if(this.paysource == 4){
                let {ordernum,money,balance,paytype,paytime,id,sendmoney,givebalance,topupbalance,tomoney}= order
                obj.money= money
                obj.walletMoney= balance.toFixed(2)
                obj.orderNum= ordernum
                obj.payType= [0,2].includes(paytype) ? '微信' : [1,6].includes(paytype) ? '虚拟操作' : [3,4,5].includes(paytype) ? '自动退费' : [7,8].includes(paytype) ? '支付宝' : '— —'
                obj.handleType= paytype == 0 ? "微信钱包充值" : paytype == 1 ? "虚拟充值钱包" : paytype == 2 ? "钱包退款" : paytype == 3 ? "充电记录退费" : 
						paytype == 4 ? "离线卡充值退费" : paytype == 5 ? "模拟投币退费" : paytype == 6 ? "虚拟钱包退费" : 
                        paytype == 7 ? "支付宝钱包充值" : paytype == 8? "钱包退款" : "— —" 
                obj.handleTime= paytime
                obj.status= [0,1,7].includes(paytype) ? '正常' : [2,6,8].includes(paytype) ? '钱包退款' :  [3,4,5].includes(paytype) ? '退费到钱包' : '— —'
                obj.paytype= paytype
                obj.id= id
                obj.sendmoney= sendmoney
                obj.givebalance= givebalance
                obj.topupbalance= topupbalance
                obj.tomoney= tomoney
                this.tableData= [obj]

            }else if(this.paysource == 5){
                let {ordernum,cardID,balance,money,accountmoney,type,flag,status,createTime,id,givebalance,topupbalance,sendmoney} = order
                obj.orderNum= ordernum
                obj.cardNum= cardID
                obj.cardMoney= balance.toFixed(2)
                obj.money= money
                obj.money2= accountmoney.toFixed(2)
                obj.handleType= type == 1 ? "消费" : type == 2 ? "余额回收": type == 3 ? "微信充值" : type == 4 ? "卡操作" : type == 5 ? "微信退款" : type == 6 ? "支付宝充值" :
                 type == 7 ? "支付宝退款" : type == 8 ? "虚拟充值" : type == 9 ? "虚拟充值退款" : type == 10 ? "支付宝小程序充值": type == 11 ? "支付宝小程序退款" : "其它"
                let payType= ''
                if(flag == 1){
                   payType=  status==1 ? "正常" : status==2 ? "激活" : status==3 ? "绑定" : 
							type==4 ? "删除" : status==5 ? "挂失" : status==6 ? "解挂" : status==7 ? "卡号修改" : "修改备注"
                }else{
                   payType= '已退款'
                }
                obj.type= type
                obj.flag= flag
                obj.status= payType 
                obj.time3= createTime
                obj.id= id
                obj.givebalance= givebalance
                obj.topupbalance= topupbalance
                obj.sendmoney= sendmoney
                this.tableData= [obj]
            }else if(this.paysource == 6){
                let {ordernum,money,accountmoney,ifrefund,status,createTime,id} = order
                obj.orderNum= ordernum
                obj.money1= money
                obj.status= ifrefund == 1 ? '已退款' : ifrefund == 0 ? (status == 2 ? '已退款' : '正常')  : '— —'
                obj.time3= createTime
                obj.status2= status
                obj.ifrefund= ifrefund
                obj.id= id
                this.tableData= [obj]
            }
        },
        handleClose(){
            this.userVerifiCode= ''
            this.dialogVisible = false
            this.$refs.verifi.initCode()
        },
        backCode(verifiCode){ //普通管理员验证码回调
        this.verifiCode= verifiCode
        },
        confirmVerifiCode(){ //点击提交，验证验证码
            let userVerifiCode=  this.userVerifiCode.toLowerCase()
            let verifiCode=  this.verifiCode.toLowerCase()
            if(userVerifiCode != verifiCode){
                this.tipText= true
            }else{
                this.tipText= false
                this.dialogVisible= false
                // 发送请求请求
                this.refDetail()
            }
            this.$refs.verifi.initCode()
        },
        refundMoneyBtn(orderid,paysource,paytype){ //退费

            this.refComtent= {
                orderid,
                paysource,
                paytype
            }
            if(this.userInfo.classify === 'superAdmin' ){
                alertPassword(()=>{
                    this.refDetail()
                })
            }else{
                 this.dialogVisible = true
            }
        },
        refDetail(){
            let {orderid,paysource,paytype} = this.refComtent
            let refundState
            console.log(this.refComtent)
            let utype= this.userInfo.classify === 'superAdmin' ?  3 : 2
            let url= ''
            let data= null
            if(paysource == 1){
                refundState= 1
                if(paytype==1){
                    url = "/wxpay/doWalletReturn";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==2){
                    url = "/wxpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==3 || paytype==8){
                    url = "/alipay/alipayRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==4){
                    url = "/wxpay/wxDoRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==12){
                    url = "/unionpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }
            }else if(paysource==2){//脉冲模块 1微信、2支付宝、3投币、4 微信退款、5 支付宝退款、6 钱包、7钱包退款、8微信小程序、9微信小程序退款、10支付宝小程序、11支付宝小程序退款*/
                refundState = 3;
                if(paytype==1){
                    url = "/wxpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==2){
                    url = "/alipay/alipayRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==6){
                    url = "/wxpay/doWalletReturn";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==8){
                    url = "/wxpay/wxDoRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype,wolfkey:3};
                }else if(paytype==10){
                    url = "/alipay/aliDoRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype,wolfkey:4};
                }else if(paytype==12){
                    url = "/unionpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype};
                }
            }else if(paysource==3){//离线充值机 1-wx、2-alipay、3-wx refund、4-alipay refund、5-wallet、6-wallet refund*/
                refundState = 2;
                if(paytype==1){
                    url = "/wxpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if([2,8].includes(paytype)){
                    url = "/alipay/alipayRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==5){
                    url = "/wxpay/doWalletReturn";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }
            }else if(paysource==4){//钱包
                refundState = 4;
                if(paytype==0){
                    url = "/wxpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==1){
                    url = "/wxpay/mercVirtualReturn";
                    data ={id : orderid,type : 1}
                }else if(paytype==7){
                    url = "/alipay/alipayRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }
            }else if(paysource==5){//在线卡  onlineCard
                refundState = 5;
                if(paytype==3){//微信
                    url = "/wxpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if([6,10].includes(paytype)){//支付宝
                    url = "/alipay/alipayRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
                }else if(paytype==8){
                    url = "/wxpay/mercVirtualReturn";
                    data ={id : orderid,type : 2}
                }
            }else if(paysource==6){//包月
                refundState = 6;
                    url = "/wxpay/doRefund";
                    data ={id : orderid,refundState : refundState,pwd : '',utype : utype}
            }
            tradeRefEntrance({url,data}).then(res=>{
                if(res.ok== 'ok'){ //当返回成功的话，让其重新请求渲染页面
                    if(typeof this.status == 'undefined'){ //从交易记录中进去
                    this.asyGetOrderTradeDataDetail({orderid: this.orderid,paysource: 1})
                    }else{ //从其他地方中进去
                        this.asyGetOtherOrderTradeDataDetail({orderid: this.orderid,paysource: this.paysource, status : this.status,ordernum: this.orderNum})
                    } 
                    messageTip('success','退款成功')
                }else{ 
                    messageTip('error','退款失败')
                }
            }).catch(error=>{
                messageTip('error','退款出错')
            })
        }
    }
}
</script>
<style>

</style>