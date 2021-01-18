<template>
    <div class="deviceLog">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="deviceLogForm"  size="mini">
                <el-form-item label="设备号" class="form_right25 w100">
                    <el-input v-model="deviceLogForm.devicenum" placeholder="设备号" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="端口号" class="form_right25 w100">
                    <el-input v-model="deviceLogForm.port" placeholder="端口号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="最大实时功率" class="form_right25 w120" >
                    <el-input v-model="deviceLogForm.power" placeholder="最大实时功率" clearable  size="small"></el-input>
                </el-form-item>
               <!-- <el-form-item label="最大剩余电量 " class="form_right25 w120">
                    <el-input v-model="deviceLogForm.maxEle" placeholder="最大剩余电量" clearable size="small"></el-input>
                </el-form-item> -->
                 <el-form-item label="最大剩余时间 " class="form_right25 w120" >
                    <el-input v-model="deviceLogForm.elec" placeholder="最大剩余时间" clearable size="small" ></el-input>
                </el-form-item>
                <el-form-item label="端口状态" class="form_right25 w100">
                     <el-select v-model="deviceLogForm.status"  placeholder="端口状态" clearable size="small">
                        <el-option label="空闲" value="1" ></el-option>
                        <el-option label="剩余" value="2" ></el-option>
                        <el-option label="禁用" value="3" ></el-option>
                        <el-option label="故障" value="4" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="deviceLogForm.startTime"
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
                        v-model="deviceLogForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        clearable
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
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="recordTime"
                label="记录时间"
                width="220"
                >
                </el-table-column>
                <el-table-column
                prop="code"
                label="设备号"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="port"
                label="端口号"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="portStatus"
                label="端口状态"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="lastTime"
                label="剩余时间"
                min-width="220"
                >
                </el-table-column>
                <el-table-column
                prop="power"
                label="实时功率"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="ele"
                label="剩余电量"
                min-width="100"
                >
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
 import MyPagination from '@/components/common/MyPagination'
 import dateTimeJS from '@/utils/dateTime'
 import { getDeviceLogInfo } from '@/require/deviceManage'
 import Util from '@/utils/util'
export default {
    data(){
        return {
            deviceLogForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
            totalPage: 1,
            nowPage: 1,
            loading: false
        }
    },
    components: {
        MyPagination
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
           if(Util.checkKeyOnlyObj('devicenum',this.$route.query)){//从设备管理进来的 栏没有参数的时候（第一次进入的时候）
                let [startTime,endTime]= Util.formatTimeArr()
                this.deviceLogForm= {startTime,endTime,...this.$route.query}
            }else{
                this.deviceLogForm= {...this.$route.query}
                this.nowPage= parseInt(this.deviceLogForm.currentPage) || 1
            }
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr()
             this.deviceLogForm= {startTime,endTime}
        }
        this.asyGetDeviceLogInfo(this.deviceLogForm)
    },
    methods: {
        getPage(page){
            this.deviceLogForm= {...this.deviceLogForm,currentPage:page}
            this.$router.push({query: this.deviceLogForm})
            this.asyGetDeviceLogInfo(this.deviceLogForm)
            this.nowPage = page
        },
        async asyGetDeviceLogInfo(data){
            let _this= this
            try{
                 _this.loading= true
                let deviceLogInfo= await getDeviceLogInfo(data)
                 _this.loading= false
                 if(deviceLogInfo.code === 200){
                    _this.tableData = deviceLogInfo.listdata
                    _this.totalPage = deviceLogInfo.totalRows
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
            this.$router.push({query:{... this.deviceLogForm,currentPage: 1}})
            this.asyGetDeviceLogInfo({... this.deviceLogForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>