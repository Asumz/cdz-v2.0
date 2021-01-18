<template>
    <div class="onlineCardHandle">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="onlineCardHandleForm"  size="mini">
               <el-form-item label="用户名" class="form_right25 w120" >
                    <el-input v-model="onlineCardHandleForm.usernick" placeholder="用户名" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardHandleForm.cardnumber" placeholder="卡号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态" class="form_right25 w120">
                     <el-select v-model="onlineCardHandleForm.status"  placeholder="端口状态" clearable  size="small">
                        <el-option label="激活" value="2" ></el-option>
                        <el-option label="绑定" value="3" ></el-option>
                        <el-option label="删除" value="4" ></el-option>
                        <el-option label="挂失" value="5" ></el-option>
                        <el-option label="解挂" value="6" ></el-option>
                        <el-option label="卡号修改" value="7" ></el-option>
                        <el-option label="修改备注" value="8" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardHandleForm.startTime"
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
                        v-model="onlineCardHandleForm.endTime"
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
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                width="80"
                >
                <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="操作时间"
                width="180"
                >
                <template slot-scope="scope">
                     {{ scope.row.create_time |fmtDate }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="单号"
                width="220"
                >
                 <template slot-scope="scope">
                     <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=5&orderId=${scope.row.id}&status=${scope.row.type}&orderNum=${scope.row.ordernum}`">
                        <el-link type="primary">{{scope.row.ordernum}}</el-link>
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
                prop="operanick"
                label="操作人"
                min-width="120"
                >
                <template slot-scope="scope">
                   {{ scope.row.operanick && scope.row.operanick.length > 0 ? scope.row.operanick : '— —' }}
                </template>
                </el-table-column>
                <el-table-column
                prop="balance"
                label="卡余额"
                min-width="100"
                >
                 <template slot-scope="scope">
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
                prop="status"
                label="状态"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link v-if="scope.row.status == 2" type="success" :underline="false">激活</el-link>
                    <el-link v-else-if="scope.row.status == 3"  type="success" :underline="false">绑定</el-link>
                    <el-link  v-else-if="scope.row.status == 4"  type="danger" :underline="false">删除</el-link>
                    <el-link  v-else-if="scope.row.status == 5" type="warning" :underline="false">挂失</el-link>
                    <el-link  v-else-if="scope.row.status == 6" type="success" :underline="false">解挂</el-link>
                    <el-link  v-else-if="scope.row.status == 7" type="info" :underline="false">卡号修改</el-link>
                    <el-link  v-else-if="scope.row.status == 8" type="info" :underline="false">修改备注</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="remarks"
                label="备注"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.remarks && scope.row.remarks.length >0">{{scope.row.remarks}}</span>
                    <span v-else>— —</span>
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
 import { getOrderOnlineOperateData } from '@/require/icCardManage'
export default { 
    data(){
        return {
            onlineCardHandleForm: {},
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
        if(JSON.stringify(this.$route.query) != "{}"){
            this.onlineCardHandleForm= {...this.$route.query} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.onlineCardHandleForm.currentPage) || 1
        }
       this.asyGetOrderOnlineOperateData(this.onlineCardHandleForm)
    },
    methods: {
        getPage(page){
            this.onlineCardHandleForm= {...this.onlineCardHandleForm,currentPage:page}
            this.$router.push({query: this.onlineCardHandleForm})
            this.asyGetOrderOnlineOperateData(this.onlineCardHandleForm)
            this.nowPage = page
        },
         async asyGetOrderOnlineOperateData(data){
            let _this= this
            try{
                 _this.loading= true
                let onlineHandleInfo= await getOrderOnlineOperateData(data)
                 _this.loading= false
                 if(onlineHandleInfo.code === 200){
                    _this.tableData = onlineHandleInfo.listdata
                    _this.totalPage = onlineHandleInfo.totalRows
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
            this.$router.push({query:{... this.onlineCardHandleForm,currentPage: 1}})
            this.asyGetOrderOnlineOperateData({... this.onlineCardHandleForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>