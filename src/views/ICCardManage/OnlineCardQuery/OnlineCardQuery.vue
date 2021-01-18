<template>
    <div class="onlineCardQuery">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="onlineCardQueryForm" size="mini">
                <el-form-item label="十六进制卡号" class="form_right25 w150">
                    <el-input v-model="onlineCardQueryForm.cardnumber" placeholder="十六进制卡号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="原始卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardQueryForm.figurecard" placeholder="原始卡号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户名" class="form_right25 w120" >
                    <el-input v-model="onlineCardQueryForm.usernick" placeholder="用户名" clearable  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="用户电话" class="form_right25 w120" >
                    <el-input v-model="onlineCardQueryForm.mobile" placeholder="用户电话" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="所属商户 " class="form_right25 w120">
                    <el-input v-model="onlineCardQueryForm.dealer" placeholder="所属商户" clearable size="small"></el-input>
                </el-form-item>
                 <el-form-item label="商户电话 " class="form_right25 w150">
                    <el-input v-model="onlineCardQueryForm.phone" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="小区名 " class="form_right25 w120" >
                    <el-input v-model="onlineCardQueryForm.areaname" placeholder="小区名" clearable size="small" ></el-input>
                </el-form-item>
                <el-form-item label="状态" class="form_right25 w120">
                     <el-select v-model="onlineCardQueryForm.status"  placeholder="卡状态" clearable size="small">
                        <el-option label="未激活" value="0" ></el-option>
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="挂失" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardQueryForm.startTime"
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
                        v-model="onlineCardQueryForm.endTime"
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
                prop="userName"
                label="用户名"
                min-width="120"
                >
                <template slot-scope="scope">
                     {{ scope.row.touristnick !=null ? scope.row.touristnick : "— —" }}
                </template>
                </el-table-column>

                <el-table-column
                prop="touristphone"
                label="用户电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/userInfo?condition=0&phone=${row.touristphone}`" v-if="row.touristphone !== '' && row.uid !== null">
                        <el-link type="primary">
                            {{row.touristphone && row.touristphone.length > 0 ? row.touristphone : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.touristphone && row.touristphone.length > 0 ? row.touristphone : '— —'}}</span>
                </template>
                </el-table-column>
                
                <el-table-column
                prop="cardID"
                label="十六进制卡号"
                min-width="120"
                >
                <template slot-scope="scope">
                    <router-link :to="`/iccardManage/onlineCardHandle?cardnumber=${scope.row.cardID}`">
                        <el-link type="primary">{{scope.row.cardID}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="figure"
                label="原始卡号"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="dealernick"
                label="所属商户"
                min-width="120"
                >
                 <template slot-scope="{row}">
                     <router-link :to="`/usermanage/merInfo??merid=${row.merid}`" v-if="row.merid !== 0 && row.merid !== null">
                        <el-link type="primary">
                            {{row.dealernick && row.dealernick.length > 0 ? row.dealernick : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.dealernick && row.dealernick.length > 0 ? row.dealernick : '— —'}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="relevawalt"
                label="充值金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <router-link :to="`/usermanage/userInfo/userWalletDetail?uid=${scope.row.uid}`" v-if="scope.row.relevawalt == 1">
                        <el-link type="primary">{{scope.row.touristbalance.toFixed(2)}}</el-link>
                    </router-link>
                     <router-link :to="`/iccardManage/onlineCardConsume?cardnumber=${scope.row.cardID}`" v-if="scope.row.relevawalt == 2">
                        <el-link type="primary">{{scope.row.money.toFixed(2)}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="sendmoney"
                label="赠送金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <router-link :to="`/usermanage/userInfo/userWalletDetail?uid=${scope.row.uid}`" v-if="scope.row.relevawalt == 1">
                        <el-link type="primary">{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    </router-link>
                     <router-link :to="`/iccardManage/onlineCardConsume?cardnumber=${scope.row.cardID}`" v-if="scope.row.relevawalt == 2">
                        <el-link type="primary">{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <el-link type="default" v-if="scope.row.status ==0" :underline="false">未激活</el-link>
                    <el-link type="success" v-else-if="scope.row.status ==1" :underline="false">正常</el-link>
                    <el-link type="danger" v-else-if="scope.row.status ==2" :underline="false">挂失</el-link>
                    <el-link type="info" v-else-if="scope.row.status ==3" :underline="false">挂失</el-link>
                     <el-link type="info" v-else :underline="false">其他</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="relevawalt"
                label="关联钱包"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="success" v-if="scope.row.relevawalt ==1" :underline="false">是</el-link>
                    <el-link type="warning" v-else :underline="false">否</el-link>
                 </template>
                </el-table-column>
                <el-table-column
                prop="areaname"
                label="归属小区"
                min-width="120"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.areaname && scope.row.areaname.length >0">{{scope.row.areaname}}</span>
                    <span v-else>——</span>
                 </template>
                </el-table-column>
                <el-table-column
                prop="remarks"
                label="备注"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.remark && scope.row.remark.length >0">{{scope.row.remark}}</span>
                    <span v-else>— —</span>
                 </template>
                </el-table-column>
                 <el-table-column
                prop="create_time"
                label="创建时间"
                min-width="150"
                >
                 <template slot-scope="scope">
                   {{ scope.row.create_time | fmtDate }}
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
 import { getIcCardInfo } from '@/require/icCardManage'
export default {
    data(){
        return {
            onlineCardQueryForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
            totalPage: 1,
            nowPage: 1,
            loading: false,
        }
    },
    components: {
        MyPagination
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.onlineCardQueryForm= {...this.$route.query} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.onlineCardQueryForm.currentPage) || 1
        }
       this.asyGetIcCardInfo(this.onlineCardQueryForm)
    },
    methods: {
        getPage(page){
            this.onlineCardQueryForm= {...this.onlineCardQueryForm,currentPage:page}
            this.$router.push({query: this.onlineCardQueryForm})
            this.asyGetIcCardInfo(this.onlineCardQueryForm)
            this.nowPage = page
        },
         async asyGetIcCardInfo(data){
            let _this= this
            try{
                 _this.loading= true
                let icCardInfo= await getIcCardInfo(data)
                 _this.loading= false
                 if(icCardInfo.code === 200){
                    _this.tableData = icCardInfo.listdata
                    _this.totalPage = icCardInfo.totalRows
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
            this.$router.push({query:{... this.onlineCardQueryForm,currentPage: 1}})
            this.asyGetIcCardInfo({... this.onlineCardQueryForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>