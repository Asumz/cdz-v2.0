<template>
    <div class="offlineCardRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="offlineCardRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="offlineCardRecordForm.ordernum" placeholder="订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="offlineCardRecordForm.usernick" placeholder="用户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户昵称" class="form_right25">
                    <el-input v-model="offlineCardRecordForm.dealer" placeholder="商户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="offlineCardRecordForm.mobile" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>
               <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="offlineCardRecordForm.devicenum" placeholder="设备号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="离线卡号" class="form_right25">
                    <el-input v-model="offlineCardRecordForm.cardID" placeholder="离线卡号" clearable size="small"></el-input>
                </el-form-item>
                
                <el-form-item label="操作类型" class="form_right25">
                     <el-select v-model="offlineCardRecordForm.type"  placeholder="操作类型" clearable size="small">
                        <el-option label="扣费" value="0" ></el-option>
                        <el-option label="充值" value="1" ></el-option>
                        <el-option label="查询" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="回复类型" class="form_right25">
                     <el-select v-model="offlineCardRecordForm.recycletype"  placeholder="回复类型" clearable size="small">
                        <el-option label="操作成功" value="0" ></el-option>
                        <el-option label="余额不足" value="1" ></el-option>
                        <el-option label="无卡" value="2" ></el-option>
                        <el-option label="卡号不统一" value="3" ></el-option>
                        <el-option label="其他错误" value="4" ></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="支付类型" class="form_right25">
                     <el-select v-model="offlineCardRecordForm.paytype"  placeholder="支付类型" clearable  size="small">
                        <el-option label="微信" value="1" ></el-option>
                        <el-option label="支付宝" value="2" ></el-option>
                        <el-option label="微信退费" value="3" ></el-option>
                        <el-option label="支付宝退费" value="4" ></el-option>
                        <el-option label="钱包" value="5" ></el-option>
                        <el-option label="钱包退费" value="6" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="offlineCardRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="offlineCardRecordForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="结束时间"
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
                min-width="50"
                >
                <template slot-scope="scope">
                     {{(nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="220"
                >
                <template slot-scope="scope">
                    <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=3&orderId=${scope.row.id}&status=${scope.row.status}&orderNum=${scope.row.ordernum}`">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="姓名"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/userInfo?condition=0&memberId=${('00000000'+row.uid).substr(-8)}`" v-if="row.uid !== 0 && row.uid !== null">
                        <el-link type="primary">
                            {{row.username && row.username.length > 0 ? row.username : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.username && row.username.length > 0 ? row.username : '— —'}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="dealer"
                label="商户名"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?merid=${row.merchantid}`" v-if="row.merchantid !== 0 && row.merchantid !== null">
                        <el-link type="primary">
                            {{row.dealer && row.dealer.length > 0 ? row.dealer : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.dealer && row.dealer.length > 0 ? row.dealer : '— —'}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="equipmentnum"
                label="设备号"
                width="80"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/deviceManage/deviceList?devicenum=${row.equipmentnum}`" v-if="row.equipmentnum !== 0 && row.equipmentnum !== null">
                        <el-link type="primary">
                            {{row.equipmentnum && row.equipmentnum.length > 0 ? row.equipmentnum : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.equipmentnum && row.equipmentnum.length > 0 ? row.equipmentnum : '— —'}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="cardID"
                label="卡号"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="balance"
                label="余额"
                >
                <template slot-scope="{row}">
                   <span v-if="row.balance == -1">— —</span>
                   <el-link type="success" :underline="false" v-else> {{row.balance != null ? row.balance.toFixed(2) : '0.00'}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="chargemoney"
                label="充值金额"
               
                >
                <template slot-scope="{row}">
                     <el-link type="success" :underline="false">{{row.chargemoney != null ? row.chargemoney.toFixed(2) : '0.00'}}</el-link> 
                </template>
                </el-table-column>
                <el-table-column
                prop="accountmoney"
                label="到账金额"
               
                >
                 <template slot-scope="{row}">
                     <el-link type="success" :underline="false">{{row.accountmoney != null ? row.accountmoney.toFixed(2) : '0.00'}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="discountmoney"
                label="优惠金额"
                
                >
                <template slot-scope="{row}">
                    <el-link type="success" :underline="false">{{row.discountmoney != null ? row.discountmoney.toFixed(2) : '0.00'}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="payType"
                label="支付类型"
                min-width="80"
                >
                <template slot-scope="{row}">
                    {{row.paytype==1 ? "微信" : row.paytype==2 ? "支付宝" : row.paytype==3 ? "微信退款" : row.paytype==4?"支付宝退款": row.paytype==7 ?"刷卡": row.paytype==8 ?"支付宝小程序" : row.paytype==9 ?"支付宝小程序退款" : "— —" }}
                </template>
                </el-table-column>
                <el-table-column
                prop="handleType"
                label="操作类型"
                min-width="70"
                >
                 <template slot-scope="{row}">
                     <span v-if="row.handletype == 0">扣费</span>
                     <span v-else-if="row.handletype == 1">充值</span>
                     <span v-else-if="row.handletype == 2">查询</span>
                 </template>
                </el-table-column>
                <el-table-column
                prop="recycletype"
                label="回复类型"
                min-width="100"
                >
                <template slot-scope="{row}">
                     <span v-if="row.recycletype == 0">操作成功</span>
                     <span v-else-if="row.recycletype == 1">余额不足</span>
                     <span v-else-if="row.recycletype == 2">无卡</span>
                     <span v-else-if="row.recycletype == 3">卡号不统一</span>
                     <span v-else-if="row.recycletype == 4">其他错误</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="begin_time"
                label="操作时间"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <span v-html="$fmtDate(row.begin_time)"></span>
                </template>
                </el-table-column>
                <el-table-column
                prop="refund_time"
                label="退款时间"
                min-width="100"
                >
                <template slot-scope="{row}">
                     <span v-html="$fmtDate(row.refund_time)"></span>
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <div v-if="scope.row.handletype == 1">
                        <el-button type="danger" size="mini" plain disabled v-if="scope.row.paytype == 3  || scope.row.paytype == 9">退款</el-button>
                        <el-button type="danger" size="mini" v-else @click="handleRefBtn(scope.row)">退款</el-button>
                    </div>
                    <div v-else><el-button  size="mini" plain disabled >退款</el-button></div>
                    
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
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
                    <VerifiCode @backCode= "backCode" ref="verifi"/>
                </el-col>
            </el-row>
            <p style="color: red; margin-top: 5px;" v-show="tipText">验证码不正确</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;userVerifiCode= '';tipText= false; $refs.verifi.initCode()" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmVerifiCode" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {alertPassword,messageTip} from '@/utils/ele'
import { getOfflineRecord,tradeRefEntrance } from '@/require/tradeRecord'
import VerifiCode from '@/components/common/VerifiCode'
import Util from '@/utils/util'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            offlineCardRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
             totalPage: 1,
             nowPage: 1,
             loading: false,
            dialogVisible: false,
            verifiCode: '', //验证码
            userVerifiCode: '', //用户输入的验证码
            tipText: false,
            row: {} //这里是点击退费/撤回所存的订单一列信息，为了退费的时候使用他
        }
    },
    components: {
        MyPagination,
        VerifiCode
    },
    computed: {
        ...mapState(['userInfo'])
    },
     created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',1)
            this.offlineCardRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.offlineCardRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',1)
            this.offlineCardRecordForm= {startTime,endTime}
        }
       this.asyGetOfflineRecord(this.offlineCardRecordForm)
    },
    methods: {
         getPage(page){
            this.offlineCardRecordForm= {...this.offlineCardRecordForm,currentPage:page}
            this.$router.push({query: this.offlineCardRecordForm})
            this.asyGetOfflineRecord(this.offlineCardRecordForm)
            this.nowPage = page
        },
         async asyGetOfflineRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let offlineInfo= await getOfflineRecord(data)
                 _this.loading= false
                 if(offlineInfo.code === 200){
                    _this.tableData = offlineInfo.listdata
                    _this.totalPage = offlineInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleRefBtn(row){
            this.row= row
            if(this.userInfo.classify === 'superAdmin' ){ //超级管理员
                alertPassword(()=>{
                    this.handleRef(3)
                })
            }else{ //普通管理员
                let utype= 2 //普通管理员
                 this.dialogVisible = true
            }
        },
        handleClose(){ //点击管理验证码框
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
                this.handleRef(2)
                this.userVerifiCode= ''
            }
            this.$refs.verifi.initCode()
        },
        handleRef(utype){ //处理退费 逻辑
            //utype= 3超级管理员  2普通管理员       
            let url =  this.row.paytype == 1 ? '/wxpay/doRefund' :  [2,8].includes(this.row.paytype) ? '/alipay/alipayRefund' : ''
            let data= {
                id: this.row.id,
                refundState : 2,
                pwd: '',
                utype: utype
            }
            tradeRefEntrance({url,data}).then(res=>{
                if(res.ok== 'ok'){
                    messageTip('success','退款成功')
                    this.asyGetOfflineRecord(this.offlineCardRecordForm)
                }else{
                    res.message= res.message || '退款失败'
                    messageTip('error',res.message)
                }
            }).catch(error=>{})        
        },
        handleSearch(){
            this.$router.push({query:{... this.offlineCardRecordForm,currentPage: 1}})
            this.asyGetOfflineRecord({... this.offlineCardRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>