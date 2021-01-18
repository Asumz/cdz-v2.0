<template>
  <div class="userWalletDetail">
      <el-card class="box-card card_bottom0 cardForm">
          <el-form :inline="true"  class="demo-form-inline" :model="userWalletDetail" size="mini">
              <el-form-item label="订单号" class="form_right25">
                  <el-input v-model="userWalletDetail.order" placeholder="请输入订单号" clearable size="small"></el-input>
              </el-form-item>

              <el-form-item label="类型" class="form_right25">
                    <el-select v-model="userWalletDetail.paysource"  placeholder="类型"  clearable size="small">
                      <el-option label="充值" value="1" ></el-option>
                      <el-option label="消费" value="2" ></el-option>
                      <el-option label="退款到钱包" value="5" ></el-option>
                      <el-option label="钱包退款" value="6" ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="开始时间" clearable class="form_right25 w200">
                    <el-date-picker
                      v-model="userWalletDetail.startTime"
                      size="small"
                      type="datetime"
                      placeholder="选择开始时间"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      >
                    </el-date-picker>
              </el-form-item>
                <el-form-item label="结束时间" clearable class="form_right25 w200">
                    <el-date-picker
                      v-model="userWalletDetail.endTime"
                      size="small"
                      type="datetime"
                      placeholder="选择结束时间"
                      :picker-options="pickerOptions"
                      value-format="yyyy-MM-dd HH:mm:ss"
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
                    {{scope.$index+1}} 
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="220"
                >
                  <template slot-scope="scope">
                    <router-link tag="li" :to="`/usermanage/userInfo/userOrderDetail`"><el-link type="primary" >{{scope.row.ordernum}}</el-link></router-link>
                  </template>
                </el-table-column>
                 <!-- <el-table-column
                prop="money"
                label="金额"
                min-width="120"
                >
                 <template slot-scope="scope">
                    <div>
                        充值金额：
                        <el-link type="success" :underline="false" v-if="[1,5].includes(scope.row.paysource)">+{{scope.row.money.toFixed(2)}}</el-link>
                        <el-link :type="scope.row.money >= 0 ? 'success' : 'danger'" :underline="false" v-if="[7].includes(scope.row.paysource)">{{(scope.row.money >= 0 ? '+' : '') + scope.row.money.toFixed(2)}}</el-link>
                        <el-link type="danger" :underline="false" v-if="[2,3,4,6,8].includes(scope.row.paysource)">-{{scope.row.money.toFixed(2)}}</el-link>
                    </div>
                    <div>
                        赠送金额：
                        <el-link type="success" :underline="false" v-if="[1,5].includes(scope.row.paysource)">+{{scope.row.sendmoney.toFixed(2)}}</el-link>
                        <el-link :type="scope.row.sendmoney >= 0 ? 'success' : 'danger'" :underline="false" v-if="[7].includes(scope.row.paysource)">{{(scope.row.sendmoney >= 0 ? '+' : '') + scope.row.sendmoney.toFixed(2)}}</el-link>
                        <el-link type="danger" :underline="false" v-if="[2,3,4,6,8].includes(scope.row.paysource)">-{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    </div>
                    
                  </template>
                </el-table-column> -->
                <el-table-column
                prop="paysource"
                label="充值金额"
                min-width="120"
                >
                 <template slot-scope="scope">
                    <div>
                        <el-link type="success" :underline="false" v-if="[1,5,7].includes(scope.row.paysource)">
                          <span class="el-icon-plus"></span>&nbsp;&nbsp;
                          {{scope.row.money.toFixed(2)}}</el-link>
                        <!-- <el-link :type="scope.row.money >= 0 ? 'success' : 'danger'" :underline="false" v-if="[7,8].includes(scope.row.paysource)">{{(scope.row.money >= 0 ? '+' : '') + scope.row.money.toFixed(2)}}</el-link> -->
                        <el-link type="danger" :underline="false" v-if="[2,3,4,6,8].includes(scope.row.paysource)">
                          <span class="el-icon-minus"></span>&nbsp;&nbsp;
                          {{scope.row.money.toFixed(2)}}</el-link>
                    </div>
                  </template>
                </el-table-column>

                 <el-table-column
                prop="paysource"
                label="赠送金额"
                min-width="120"
                >
                 <template slot-scope="scope">
                  <div>
                        <el-link type="success" :underline="false" v-if="[1,5,7].includes(scope.row.paysource)">
                          <span class="el-icon-plus"></span>&nbsp;&nbsp;
                          {{scope.row.sendmoney.toFixed(2)}}</el-link>
                        <!-- <el-link :type="scope.row.sendmoney >= 0 ? 'success' : 'danger'" :underline="false" v-if="[7,8].includes(scope.row.paysource)">{{(scope.row.sendmoney >= 0 ? '+' : '') + scope.row.sendmoney.toFixed(2)}}</el-link> -->
                        <el-link type="danger" :underline="false" v-if="[2,3,4,6,8].includes(scope.row.paysource)">
                          <span class="el-icon-minus"></span>&nbsp;&nbsp;
                          {{scope.row.sendmoney.toFixed(2)}}</el-link>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                prop="balance"
                label="钱包充值余额"
                min-width="120"
                >
                 <template slot-scope="scope">
                   <el-link type="primary" :underline="false">
                    {{scope.row.topupbalance != null ? scope.row.topupbalance.toFixed(2)  :  '— —'}}
                  </el-link>
                </template>
                </el-table-column>

                 <el-table-column
                prop="balance"
                label="钱包赠送余额"
                min-width="120"
                >
                  <template slot-scope="scope">
                    <el-link type="primary" :underline="false">
                       {{ scope.row.givebalance != null ? scope.row.givebalance.toFixed(2)  :  '— —'}}
                    </el-link>
                  </template>
                </el-table-column>

                <el-table-column
                prop="type"
                label="操作类型"
                min-width="120"
                >
                  <template slot-scope="{row}">
                    <el-link :type="[1,5].includes(row.paysource) ? 'success': [2,3,4,6,8].includes(row.paysource) ? 'danger' : 'default'" :underline="false" >
                       {{
                      row.paysource == 1 ? "充值" : row.paysource == 2 ? "消费" : row.paysource == 3 ? "消费" : row.paysource == 4 ? "消费" : 
						row.paysource == 5 ? "退款到钱包" : row.paysource == 6 ? "钱包退款"  : row.paysource == 7 ? "虚拟充值" : row.paysource == 8 ? "虚拟退款" : "其它"
                    }}
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="时间"
                min-width="200"
                >
                 <template slot-scope="scope">
                   {{ scope.row.create_time | fmtDate }}
                </template>
                </el-table-column>
            </el-table>
         </el-card>
         <MyPagination :totalPage="totalPage" @getPage="getPage"/>
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import { getUserWalletDetail } from '@/require/userManage'
export default {
  data(){
    return {
      userWalletDetail: {},
      pickerOptions: dateTimeJS,
      tableData: [],
      totalPage: 1,
      nowPage: 1,
      loading: false
    }
  },
  created(){
     if(JSON.stringify(this.$route.query) != "{}"){
          this.userWalletDetail= {...this.$route.query}
      }
      this.asyGetUserWalletDetail(this.userWalletDetail)
  },
  methods: {
    getPage(page){
      this.userWalletDetail= {...this.userWalletDetail,currentPage:page}
      this.$router.push({query: this.userWalletDetail})
      this.asyGetUserWalletDetail(this.userWalletDetail)
      this.nowPage = page
    },
    async asyGetUserWalletDetail(data){
      let _this= this
      try{
        _this.loading= true
        let wattleData= await getUserWalletDetail(data)
         _this.loading= false
         if(wattleData.code == 200){
           this.tableData= wattleData.listdata
           this.totalPage= wattleData.totalRows
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
      this.$router.push({query:{...this.userWalletDetail,currentPage: 1}})
      this.asyGetUserWalletDetail({...this.userWalletDetail,currentPage: 1})
      this.nowPage= 1 //搜索完之后将nowPage置为1
    }
  },
  components: {
    MyPagination
  }
}
</script>

<style lang="less">
.userWalletDetail {
    .el-link.el-link--success,.el-link.el-link--danger {
        text-decoration: none;
    }   
}
</style>