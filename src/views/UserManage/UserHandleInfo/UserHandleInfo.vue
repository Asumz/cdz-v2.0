<template>
  <div class="userHandleInfo">
      <el-card class="box-card card_bottom0 cardForm">
          <el-form :inline="true"  class="demo-form-inline" :model="userHandleInfo"  size="mini">
              <el-form-item label="操作人" class="form_right25">
                  <el-input v-model="userHandleInfo.operator" placeholder="操作人" clearable  size="small"></el-input>
              </el-form-item>
              <el-form-item label="操作对象" class="form_right25">
                  <el-input v-model="userHandleInfo.beoperated" placeholder="操作对象" clearable size="small"></el-input>
              </el-form-item>
              <el-form-item label="操作内容" class="form_right25">
                  <el-input v-model="userHandleInfo.content" placeholder="操作内容" clearable size="small"></el-input>
              </el-form-item>
             
              <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                      v-model="userHandleInfo.startTime"
                      size="small"
                      type="datetime"
                      placeholder="选择开始时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions"
                      clearable
                      >
                    </el-date-picker>
              </el-form-item>
                <el-form-item label="结束时间" class="form_right25 w200">
                    <el-date-picker
                      v-model="userHandleInfo.endTime"
                      size="small"
                      type="datetime"
                      placeholder="选择结束时间"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions"
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
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="80"
                >
                <template slot-scope="scope">
                    {{(nowPage-1)*10+scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="operate_time"
                label="操作时间"
                min-width="180"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="操作内容"
                min-width="140"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.name && scope.row.name.length >0 ">{{scope.row.name}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="openick"
                label="操作人"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.openick && scope.row.openick.length >0 ">{{scope.row.openick}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="objnick"
                label="操作对象"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.objnick && scope.row.objnick.length >0 ">{{scope.row.objnick}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                min-width="220"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.remark && scope.row.remark.length >0 ">{{scope.row.remark}}</span>
                    <span v-else>无</span>
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
import { getUserHandleInfo } from '@/require/userManage'
export default {
    data(){
        return {
            userHandleInfo: {},
            pickerOptions: dateTimeJS,
            loading: false,
            tableData: [], //每条数据
            totalPage: 1, //共1条数据
            nowPage: 1, //当前页数   
            dialogSetVisible: false, //set模态框显示隐藏
        }
    },
    components:{MyPagination},
    created(){
       if(JSON.stringify(this.$route.query) != "{}"){
            this.userHandleInfo= {...this.$route.query}
            this.nowPage= parseInt(this.userHandleInfo.currentPage) || 1
        }
       this.asyGetUserHandleInfo(this.userHandleInfo)
    },
     methods: {
        getPage(page){
            this.userHandleInfo= {...this.userHandleInfo,currentPage:page}
            this.$router.push({query: this.userHandleInfo})
            this.asyGetUserHandleInfo(this.userHandleInfo)
            this.nowPage = page
        },
        async asyGetUserHandleInfo(data){
            let _this= this
            try{
                _this.loading= true
                let handleInfo=  await getUserHandleInfo(data)
                _this.loading= false
                if(handleInfo.code === 200){
                   _this.tableData= handleInfo.listdata
                   _this.totalPage= handleInfo.totalRows
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
            this.$router.push({query:{... this.userHandleInfo,currentPage: 1}})
            this.asyGetUserHandleInfo({... this.userHandleInfo,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style>

</style>