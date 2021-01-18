<template>
    <div class="tradeRecordCon">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="tradeRecordConForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="tradeRecordConForm.ordernum" placeholder="订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="tradeRecordConForm.usernick" placeholder="用户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="tradeRecordConForm.dealer" placeholder="商户名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="tradeRecordConForm.mobile" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="tradeRecordConForm.code" placeholder="设备号" clearable size="small"></el-input>
                </el-form-item>
                
                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="tradeRecordConForm.status" clearable placeholder="订单状态"  size="small">
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易来源" class="form_right25">
                     <el-select v-model="tradeRecordConForm.paysource" clearable placeholder="交易来源"  size="small">
                        <el-option label="充电" value="1" ></el-option>
                        <el-option label="脉冲" value="2" ></el-option>
                        <el-option label="离线充值机" value="3" ></el-option>
                        <el-option label="钱包" value="4" ></el-option>
                        <el-option label="在线卡" value="5" ></el-option>
                        <el-option label="虚拟充值" value="6" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="tradeRecordConForm.paytype" clearable placeholder="支付方式"  size="small">
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                        <el-option label="微信小程序" value="4" ></el-option>
                        <el-option label="支付宝小程序" value="5" ></el-option>
                        <el-option label="虚拟充值" value="6" ></el-option>
                        <el-option label="银联" value="12" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="tradeRecordConForm.startTime"
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
                        v-model="tradeRecordConForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn w260">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                    <el-button @click="export2Excel" size="small" type="primary">导出Excel</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
               <el-table
                :data="totalData"
                border
                style="width: 100%"
                :show-header="false"
                :cell-style="{background:'#f5f7fa',color:'#333'}"
                >
                <el-table-column
                prop="earnName"
                label="收益"
                min-width="80"
                >
                </el-table-column>
                 <el-table-column
                prop="earn"
                label="收益"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="earnMoneyName"
                label="收入"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="earnMoney"
                label="收入"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="expendName"
                label="支出"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="expend"
                label="支出"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="walletName"
                label="钱包消费"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="wallet"
                label="钱包消费"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="walletRefName"
                label="钱包退费"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="walletRef"
                label="钱包退费"
                min-width="80"
                >
                </el-table-column>

               </el-table>

              
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                v-loading="loading"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="80"
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
                    <template slot-scope="scope">
                        <!-- 充电记录 -->
                        <router-link :to="`/tradeRecord/chargeRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 1"> 
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                        <!-- 投币记录 -->
                        <router-link :to="`/tradeRecord/coinRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 2">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                        <!-- 离线卡记录 -->
                        <router-link :to="`/tradeRecord/offlineCardRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 3">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                         <!-- 钱包记录 -->
                        <router-link :to="`/tradeRecord/walletRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 4">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                         <!-- 在线卡消费记录 -->
                        <router-link :to="`/iccardManage/onlineCardConsume?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 5">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                         <!-- 包月记录 -->
                        <router-link :to="`/tradeRecord/monthlyRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 6">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="uusername"
                label="用户名"
                min-width="120"
                >
                <template slot-scope="{row}">
                     <router-link :to="`/usermanage/userInfo?condition=0&memberId=${('00000000'+row.uid).substr(-8)}`" v-if="row.uid !== 0 && row.uid !== null">
                        <el-link type="primary">
                            {{row.uusername && row.uusername.length > 0 ? row.uusername : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.uusername && row.uusername.length > 0 ? row.uusername : '— —'}}</span>
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
                prop="code"
                label="设备(卡)号"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="paysource"
                label="设备类型"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <span v-if="row.paysource === 5">— —</span>
                    <span v-else>
                        {{row.hardver=='00' ? "十路智慧款" : row.hardver=='01' ? "十路智慧款" : row.hardver=='02' ? "电轿款" : row.hardver=='03' ? "脉冲板子" :  row.hardver=='04' ? "离线充值机" : "— —"}}
                    </span>
                </template>
                </el-table-column>
                 <el-table-column
                prop="money"
                label="交易金额"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" v-if="scope.row.status==1">+{{scope.row.money != null ? scope.row.money.toFixed(2) : '— —'}}</el-link>
                    <el-link type="danger" :underline="false"  v-if="scope.row.status==2">-{{scope.row.money != null ? scope.row.money.toFixed(2) : '— —'}}</el-link>
                </template>
                </el-table-column>
                 <el-table-column
                prop="merMoney"
                label="商户金额"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="success" :underline="false" v-if="scope.row.status==1">+{{scope.row.mermoney != null ? scope.row.mermoney.toFixed(2) : '— —'}}</el-link>
                    <el-link type="danger" :underline="false"  v-if="scope.row.status==2">-{{scope.row.mermoney != null ? scope.row.mermoney.toFixed(2) : '— —'}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="partnerMoney"
                label="合伙人金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div v-if="scope.row.manmoney == 0"><el-button icon="el-icon-view" size="mini"  plain disabled style="width: 60px;padding: 7px 0;" >0</el-button></div>
                    <div v-else>
                        <el-button icon="el-icon-view" size="mini" type="success" plain v-if="scope.row.status == 1" style="width: 60px;padding: 7px 0;" @click="handlePartner(scope.row)">{{scope.row.manmoney}}</el-button>
                        <el-button icon="el-icon-view" size="mini" type="danger" plain v-if="scope.row.status == 2"  style="width: 60px;padding: 7px 0;" @click="handlePartner(scope.row)">{{scope.row.manmoney}}</el-button>
                    </div>
                </template>
                </el-table-column>

                <el-table-column
                prop="status"
                label="订单状态"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="success" :underline="false" v-if="scope.row.status==1">正常</el-link>
                    <el-link type="danger" :underline="false"  v-if="scope.row.status==2">退款</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="paytype"
                label="支付方式"
                min-width="80"
                >
                 <template slot-scope="{row}">
                    {{ row.paytype == 1 ? '钱包' : row.paytype == 2 ? '微信' : row.paytype == 3 ? '支付宝' : row.paytype == 4 ? '微信小程序' : row.paytype == 5 ? '支付宝小程序' : row.paytype == 6 ? '虚拟充值' : row.paytype == 12 ? '银联支付' : '— —'}}
                 </template>
                </el-table-column>
                <el-table-column
                prop="form"
                label="来源"
                min-width="80"
                >
                <template slot-scope="{row}">
                    {{ row.paysource == 1 ? "充电" : row.paysource == 2 ? "投币" : row.paysource == 3 ? "离线充值" : row.paysource == 4 ? "钱包" : row.paysource == 5 ? "在线卡" : row.paysource == 6 ? "包月卡" : "— —" }}
                </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="交易时间"
                min-width="180"
                >
                <template slot-scope="{row}">
                    {{row.create_time | fmtDate }}
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                fixed="right"
                >
                <template slot-scope="scope">
                    <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=${scope.row.paysource}&orderId=${scope.row.id}`" tag="div">
                        <el-button type="primary" size="mini">详情</el-button>
                    </router-link> 
                </template>
                </el-table-column>  
            </el-table>
         </el-card>

         <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

         <el-dialog title="合伙人金额明细" :visible.sync="dialogMoneyDetail" width="550px">
             <div class="orderNum">订单号：{{diaOrderNum}}</div>
            <el-table :data="gridData" border :header-cell-style="{background:'#f5f7fa',color:'#666'}">
                <el-table-column property="nickname" label="合伙人昵称" min-width="120">
                     <template slot-scope="{row}">
                        {{row.nickname && row.nickname.length > 0 ? row.nickname : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="realname" label="合伙人姓名" min-width="120">
                     <template slot-scope="{row}">
                        {{row.realname && row.realname.length > 0 ? row.realname : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="phone" label="合伙人电话" min-width="120">
                     <template slot-scope="{row}">
                        {{row.phone && row.phone.length > 0 ? row.phone : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="partmoney" label="合伙人金额" min-width="120">
                    <template slot-scope="scope">
                        <el-link :underline="false" type="danger"  v-if="scope.row.partmoney<0">{{scope.row.partmoney}}</el-link>
                         <el-link :underline="false" type="success" v-else>{{scope.row.partmoney}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import { getTradeRecord,getPartnerIncomeDetail } from '@/require/tradeRecord'
import { messageTip , alertConfim } from '@/utils/ele'
import Util from '@/utils/util'
import Excel from '@/utils/excel'
export default {
    data(){
        return {
            tradeRecordConForm: {},
            diaOrderNum: '',
            pickerOptions: dateTimeJS,
            tableData: [],
            totalData: [],
            totalRows: 0, //数据总条数
             totalPage: 1,
             nowPage: 1,
             loading: false,
             dialogMoneyDetail: false, //合伙人收益弹框
             gridData: [],
             loading_obj: null, //全局loading实例
        }
    },
    components: {
        MyPagination,
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',0.5)
            this.tradeRecordConForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.tradeRecordConForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',0.5)
            this.tradeRecordConForm= {startTime,endTime}
        }
       this.asyGetTradeRecord(this.tradeRecordConForm)
    },
    beforeDestroy(){
        // 销毁之前，有this.loading_obj的时候关闭
        this.loading_obj && this.loading_obj.close()
    },
    deactivated(){
        this.loading_obj && this.loading_obj.close()
    },
    methods: {
        getPage(page){
            let VNK= this.$route.query.VNK
            this.tradeRecordConForm= {...this.tradeRecordConForm,currentPage:page,VNK}
            this.$router.push({query: this.tradeRecordConForm,VNK})
            this.asyGetTradeRecord(this.tradeRecordConForm)
            this.nowPage = page
        },
        handlePartner(row){//处理点击合伙人分成金额
            getPartnerIncomeDetail({orderid: row.id}).then(res=>{
                if(res.code == 200){
                    this.gridData= res.listdata
                    this.diaOrderNum= res.ordernum
                }else{
                    this.gridData= []
                }
            }).catch(error=>{
                 this.gridData= []
            })
            this.dialogMoneyDetail= true
        },
        async asyGetTradeRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let tradeInfo= await getTradeRecord(data)
                 _this.loading= false
                 if(tradeInfo.code === 200){
                    _this.tableData = tradeInfo.listdata
                    _this.totalPage = tradeInfo.totalRows
                    let {totalmoney=0,incomemoney=0,reftotalmoney=0,walletmoney=0,refwalletmoney=0}= tradeInfo.mapdata
                    _this.totalData= [
                         {
                            earnName: '收益：',
                            earn: incomemoney,
                            earnMoneyName: '收入：',
                            earnMoney: totalmoney,
                            expendName: '支出：',
                            expend: reftotalmoney,
                            walletName: '钱包消费：',
                            wallet: walletmoney,
                            walletRefName: '钱包退费：',
                            walletRef: refwalletmoney
                        }
                    ]
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
            let VNK= this.$route.query.VNK
            this.$router.push({query:{... this.tradeRecordConForm,currentPage: 1,VNK}})
            this.asyGetTradeRecord({... this.tradeRecordConForm,currentPage: 1,click: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        },
        export2Excel() {
            //     import('@/vendor/Export2Excel').then(excel => {
            //     const tHeader = ['Id', 'Title']
            //     const filterVal = ['id', 'title']
            //     const list = [
            //         {id: 1, title: '标题1'},
            //         {id: 2, title: '标题2'}
            //     ]
            //     const data = this.formatJson(filterVal, list)
            //     excel.export_json_to_excel({
            //     header: tHeader,
            //     data,
            //     filename: '测试excel',
            //     autoWidth: true
            //     })
            // })
            let {startTime,endTime}= this.tradeRecordConForm
            startTime= !startTime ? "20190101000001" : moment(startTime).format('YYYYMMDDHHmmss')
            endTime= !endTime ? moment(new Date()).format('YYYYMMDDHHmmss') : moment(endTime).format('YYYYMMDDHHmmss')
         alertConfim('确认导出交易记录吗？',()=>{
                // 当导出条数大于10000之后就不请求
                if(this.totalPage > 10000) return messageTip('warning',`当前条数为 ${this.totalPage}条，超过最大导出条数（10000条），请缩短查询时间`)

                this.loading_obj = this.$loading({
                lock: true,
                text: '正在导出',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.8)'
                })  
             getTradeRecord({... this.tradeRecordConForm,isAlllData : 1}).then(res=>{
                this.loading_obj.close()
                if(res.code == 200){
                        const list=res.listdata
                        const tHeader= ["序号","订单号","用户名","商户名","设备(卡)号","设备类型","交易金额","商户金额","合伙人金额","订单状态","支付方式","来源","交易时间"]
                        const filterVal= ["index","ordernum","uusername","dealer","code","paysource","money","merMoney","partnerMoney","status","paytype","form","create_time"]
                        Excel({
                            tHeader: tHeader,
                            filterVal:  filterVal,
                            list: list,
                            filename: `交易记录${startTime}-${endTime}`,
                            formatJson: this.formatJson
                        })
                }else if(res.code == 201){
                   messageTip('warning',res.message || '导出数量超过最大限制')
                }else{
                   messageTip('error','导出失败，请缩短导出条数') 
                }
              }).catch(err=>{
                this.loading_obj.close()
                messageTip('error','导出失败，请缩短导出条数')
              })
         })
        },
        formatJson(filterVal, list) {
            // return list.map(item=> filterVal.map(jtem=>item[jtem]))
            return list.map((item,i)=>{
                return filterVal.map((jtem)=>{
                    let val
                    if(jtem == 'index'){
                        val= i+1
                    }else if(['uusername','dealer'].includes(jtem)){
                        val= item[jtem] == null ? '— —' : item[jtem]
                    }else if(jtem == 'paysource'){
                        if(item[jtem] == 5){
                            val= '— —'
                        }else{
                            val= item.hardver=='00' ? "十路智慧款" : item.hardver=='01' ? "十路智慧款" : item.hardver=='02' ? "电轿款" : item.hardver=='03' ? "脉冲板子" :  item.hardver=='04' ? "离线充值机" : "— —"
                        }
                    }else if(['money'].includes(jtem)){
                        if(item.status == 1){
                            val= item[jtem]
                        }else if(item.status == 2){
                            val= 0-item[jtem]
                        }
                    }else if(['merMoney'].includes(jtem)){
                        if(item.status == 1){
                            val= item.mermoney
                        }else if(item.status == 2){
                            val= 0-item.mermoney
                        }
                    }else if(jtem == 'partnerMoney'){
                        if(item.manmoney == 0){
                            val= 0
                        }else{
                             val= item.manmoney
                        }
                    }else if(jtem == 'status'){
                        val= item[jtem] == 1 ? '正常' : item[jtem] == 2 ? '退款' : '— —'
                    }else if(jtem == 'paytype'){
                        val=  item.paytype == 1 ? '钱包' : item.paytype == 2 ? '微信' : item.paytype == 3 ? '支付宝' : item.paytype == 4 ? '微信小程序' : item.paytype == 5 ? '支付宝小程序' : item.paytype == 6 ? '虚拟充值' : '— —'
                    }else if(jtem == 'form'){
                        val= item.paysource == 1 ? "充电" : item.paysource == 2 ? "投币" : item.paysource == 3 ? "离线充值" : item.paysource == 4 ? "钱包" : item.paysource == 5 ? "在线卡" : item.paysource == 6 ? "包月卡" : "— —"
                    }else if(jtem == 'create_time'){
                        val= moment(item[jtem]).format('YYYY-MM-DD HH:mm:ss')
                    }else {
                        val= item[jtem]
                    }

                    return val
                })
            })
        }
    },
    
}
</script>

<style lang="less">
    .tradeRecordCon {
        .el-dialog {
            .orderNum {
                text-align: center;
                padding-bottom: 15px;

            }
            a {
                text-decoration: none;
            }
        }
    }
</style>