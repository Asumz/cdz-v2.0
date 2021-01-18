<template>
    <div class="onlineCardConsume">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="onlineCardConsumeForm" size="mini">
               <el-form-item label="订单号" class="form_right25 w220" >
                    <el-input v-model="onlineCardConsumeForm.ordernum" placeholder="订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="持卡人" class="form_right25 w120" >
                    <el-input v-model="onlineCardConsumeForm.usernick" placeholder="持卡人" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="原始卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardConsumeForm.cardnumber" placeholder="卡号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25 w120" >
                    <el-input v-model="onlineCardConsumeForm.dealer" placeholder="商户名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25 w120" >
                    <el-input v-model="onlineCardConsumeForm.devicenum" placeholder="设备号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型" class="form_right25 w120">
                     <el-select v-model="onlineCardConsumeForm.type"  placeholder="类型" clearable size="small">
                        <el-option label="消费" value="1" ></el-option>
                        <el-option label="余额回收" value="2" ></el-option>
                        <el-option label="微信充值" value="3" ></el-option>
                        <el-option label="卡操作" value="4" ></el-option>
                        <el-option label="微信退款" value="5" ></el-option>
                        <el-option label="支付宝充值" value="6" ></el-option>
                        <el-option label="支付宝退费" value="7" ></el-option>
                        <el-option label="虚拟充值" value="8" ></el-option>
                        <el-option label="虚拟退款" value="9" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardConsumeForm.startTime"
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
                        v-model="onlineCardConsumeForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn w80">
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
                width="80"
                >
                <template slot-scope="{$index}">
                    {{ (nowPage-1)*10+$index+1 }}
                </template>
                </el-table-column>

                <el-table-column
                prop="ordernum"
                label="单号"
                width="220"
                >
                 <template slot-scope="scope">
                    <router-link :to="
                    scope.row.type == 1 ?
                    `/tradeRecord/tradeRecordCon?&ordernum=${scope.row.ordernum}` :
                    `/tradeRecord/tradeRecordCon/orderDetail?paysource=5&orderId=${scope.row.id}&status=${scope.row.type}&orderNum=${scope.row.ordernum}`
                    ">
                        <el-link type="primary" ::underline="false">
                            {{ scope.row.ordernum }}
                        </el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="nickname"
                label="用户名"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/userInfo?condition=0&memberId=${('00000000'+row.uid).substr(-8)}`" v-if="row.uid !== 0 && row.uid !== null">
                        <el-link type="primary">
                            {{row.nickname && row.nickname.length > 0 ? row.nickname : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.nickname && row.nickname.length > 0 ? row.nickname : '— —'}}</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="cardID"
                label="卡号"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/iccardManage/onlineCardQuery?cardnumber=${row.cardID}`" v-if="row.cardID !== 0 && row.cardID !== null">
                        <el-link type="primary">
                            {{row.cardID && row.cardID.length > 0 ? row.cardID : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.cardID && row.cardID.length > 0 ? row.cardID : '— —'}}</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="dealer"
                label="商户名"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?merid=${row.merid}`" v-if="row.merid !== 0 && row.merid !== null">
                        <el-link type="primary">
                            {{row.dealer && row.dealer.length > 0 ? row.dealer : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.dealer && row.dealer.length > 0 ? row.dealer : '— —'}}</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="money"
                label="操作金额"
                min-width="150"
                >
                <template slot-scope="scope">
                    <div>
                    充值金额：
                    <el-link v-if="[1,5,7,9,11].includes(scope.row.type)" type="danger" :underline="false">-{{scope.row.money.toFixed(2)}}</el-link>
                    <el-link v-else-if="[2,3,6,8,10].includes(scope.row.type)" type="success" :underline="false">+{{scope.row.money.toFixed(2)}}</el-link>
                    <!-- <el-link v-else-if="[8].includes(scope.row.type)" :type="scope.row.money >= 0 ? 'success': 'danger'" :underline="false">
                        {{(scope.row.money >= 0 ? '+' : '')+scope.row.money.toFixed(2)}}
                    </el-link> -->
                    <el-link v-else :underline="false" type="info">{{scope.row.money.toFixed(2)}}</el-link>
                    </div>
                    <div>
                    赠送金额：
                    <el-link v-if="[1,5,7,9].includes(scope.row.type)" type="danger" :underline="false">-{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    <el-link v-else-if="[2,3,6,8].includes(scope.row.type)" type="success" :underline="false">+{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    <!-- <el-link v-else-if="[8].includes(scope.row.type)" :type="scope.row.sendmoney >= 0 ? 'success': 'danger'" :underline="false">
                        {{(scope.row.sendmoney >= 0 ? '+' : '')+scope.row.sendmoney.toFixed(2)}}
                    </el-link> -->
                    <el-link v-else :underline="false" type="info">{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    </div>
                </template>
                </el-table-column>

                <el-table-column
                prop="accountmoney"
                label="到账金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link v-if="[1,5,7,9,11].includes(scope.row.type)" type="danger" :underline="false">{{(0-scope.row.accountmoney).toFixed(2)}}</el-link>
                    <el-link v-else-if="[2,3,6,8,10].includes(scope.row.type)" type="success" :underline="false">
                        {{ scope.row.accountmoney.toFixed(2)}}
                    </el-link>
                    <!-- <el-link v-else-if="[8].includes(scope.row.type)" :type="scope.row.accountmoney >= 0 ? 'success': 'danger'" :underline="false">{{(scope.row.accountmoney >= 0 ? '+' : '') +scope.row.accountmoney.toFixed(2)}}</el-link> -->
                    <el-link v-else :underline="false" type="info">{{scope.row.accountmoney.toFixed(2)}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="balance"
                label="卡余额"
                min-width="150"
                >
                 <template slot-scope="scope">
                    <!-- {{ scope.row.balance.toFixed(2) }} -->
                      <div>
                        充值余额：
                        <el-link type="default" >
                                {{ scope.row.topupbalance != null ? scope.row.topupbalance.toFixed(2)  :  '— —'}}
                        </el-link>
                    </div>
                    <div>
                        赠送余额：
                        <el-link type="default" >
                                {{ scope.row.givebalance != null ? scope.row.givebalance.toFixed(2)  :  '— —'}}
                        </el-link>
                    </div>
                </template>
                </el-table-column>

                <el-table-column
                prop="type"
                label="类型"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link v-if="[1,5,7,9,11].includes(scope.row.type)" type="danger" :underline="false">
                        {{scope.row.type == 1 ? "消费" : scope.row.type == 5 ? "微信退费": scope.row.type == 7 ? "支付宝退费" :  scope.row.type == 9 ? "虚拟退费" : scope.row.type == 11 ? "支付宝小程序退费" : "— —" }}
                    </el-link>
                    <el-link v-else-if="[2,3,6,8,10].includes(scope.row.type)" type="success" :underline="false">
                        {{ scope.row.type == 2 ? "余额回收" : scope.row.type == 3 ? "微信充值": scope.row.type == 6 ? "支付宝充值" :  scope.row.type == 8 ? "虚拟充值" : scope.row.type == 10 ? "支付宝小程序充值"  : "— —" }}
                    </el-link>
                    <el-link v-else :underline="false" type="info">卡操作</el-link>
                 </template>
                </el-table-column>

                <el-table-column
                prop="code"
                label="设备号"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.code && scope.row.code.length >0">{{scope.row.code}}</span>
                    <span v-else>— —</span>
                 </template>
                </el-table-column>
                 <el-table-column
                prop="create_time"
                label="创建时间"
                min-width="150"
                >
                 <template slot-scope="scope">
                    <span>{{ scope.row.create_time | fmtDate }}</span>
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
 import { getOrderOnlineCardRecordData } from '@/require/icCardManage'
 import Util from '@/utils/util'
export default {
    data(){
        return {
            onlineCardConsumeForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
            totalPage: 1,
            loading: false,
            nowPage: 1
        }
    },
    components: {
        MyPagination
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr()
            this.onlineCardConsumeForm= {...routerKey,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.onlineCardConsumeForm.currentPage) || 1
        }else{
            let [startTime,endTime]= Util.formatTimeArr()
            this.onlineCardConsumeForm= {startTime,endTime}
        }
       this.asyGetOrderOnlineCardRecordData(this.onlineCardConsumeForm)
    },
    methods: {
       getPage(page){
            this.onlineCardConsumeForm= {...this.onlineCardConsumeForm,currentPage:page}
            this.$router.push({query: this.onlineCardConsumeForm})
            this.asyGetOrderOnlineCardRecordData(this.onlineCardConsumeForm)
            this.nowPage = page
        },
         async asyGetOrderOnlineCardRecordData(data){
            let _this= this
            try{
                 _this.loading= true
                let onlineConsumeInfo= await getOrderOnlineCardRecordData(data)
                 _this.loading= false
                 if(onlineConsumeInfo.code === 200){
                    _this.tableData = onlineConsumeInfo.listdata
                    _this.totalPage = onlineConsumeInfo.totalRows
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
            this.$router.push({query:{... this.onlineCardConsumeForm,currentPage: 1}})
            this.asyGetOrderOnlineCardRecordData({... this.onlineCardConsumeForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>