<template>
  <div class="bluetoothList">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" size="mini" :model="bluetoothListForm">
                <el-form-item label="设备号" class="form_right25 w100">
                    <el-input v-model="bluetoothListForm.devicenum" placeholder="设备号"  clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="昵称" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.nick" placeholder="所属人昵称" clearable size="small"></el-input>
                </el-form-item>
                 <el-form-item label="姓名" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.realname" placeholder="所属人姓名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="电话" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.phone" placeholder="电话" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="小区名称" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.areaname" placeholder="小区名称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="硬件版本" class="form_right25 w100">
                     <el-select v-model="bluetoothListForm.hardversion"  placeholder="硬件版本" clearable size="small">
                        <!-- <el-option label="01" value="01" ></el-option>
                        <el-option label="02" value="02" ></el-option> -->
                        <el-option label="03" value="03" ></el-option>
                        <!-- <el-option label="04" value="04" ></el-option> -->
                    </el-select>
                </el-form-item>

                <el-form-item label="软件版本" class="form_right25 w100">
                    <el-input v-model="bluetoothListForm.softversion" placeholder="软件版本" clearable size="small"></el-input>
                </el-form-item>


                <el-form-item label="绑定" class="form_right25 w120">
                     <el-select v-model="bluetoothListForm.binding"  placeholder="是否绑定" clearable  size="small">
                        <el-option label="已绑定" value="1" ></el-option>
                        <el-option label="未绑定" value="0" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="测试状态" class="form_right25 w180">
                     <el-select v-model="bluetoothListForm.teststatus"  placeholder="测试状态" clearable size="small">
                        <el-option label="设备不可测式" value="1" ></el-option>
                        <el-option label="设备可测试" value="2" ></el-option>
                        <el-option label="设备测试达限" value="3" ></el-option>
                    </el-select>
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
                prop="code"
                label="设备号"
                width="80"
                >
                <template slot-scope="scope">
                    <router-link :to="`/deviceManage/deviceLog?devicenum=${scope.row.code}`">
                         <el-link type="primary">{{scope.row.code}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="设备名"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <span v-if="row.remark && row.remark.length > 0">{{row.remark}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="所属人"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <span v-if="row.username && row.username.length > 0">{{row.username}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="phone_num"
                label="电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?phone=${row.phone_num}`"  v-if="row.phone_num && row.phone_num.length > 0">
                        <el-link type="primary">{{row.phone_num}}</el-link>
                    </router-link>
                   <span v-else>— —</span>
                </template>
                </el-table-column>
                
                <el-table-column
                prop="expiration_time"
                label="到期日期"
                min-width="125"
                v-if="userInfo.classify== 'superAdmin'" 
                >
                <template slot-scope="{row}">
                    <el-link :type="contrastData(row.expiration_time)" :underline="false" >
                        <span v-if="row.expiration_time == null">&nbsp;&nbsp;&nbsp;&nbsp;{{ '— —' }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span v-else>{{ row.expiration_time | fmtDate('YYYY-MM-DD') }}</span>
                    </el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="device_id_android"
                label="android设备id"
                min-width="150"
                >
               </el-table-column>
               <el-table-column
                prop="device_id_ios"
                label="IOS设备id"
                min-width="320"
                >
               </el-table-column>
               <el-table-column
                prop="hardversion"
                label="硬件版本"
                min-width="80"
                >
                 <template slot-scope="{row}">
                    <el-button icon="el-icon-edit" type="primary" size="mini" @click="handleHwVerBtn(row)" plain v-if="userInfo.classify=='superAdmin'">{{row.hardversion}}</el-button>
                    <span v-else>{{row.hardversion}}</span>
                </template>
               </el-table-column>
               <el-table-column
                prop="hardversionnum"
                label="硬件版本号"
                min-width="80"
                >
               </el-table-column>
               <el-table-column
                prop="softversionnum"
                label="软件版本号"
                min-width="80"
                >
               </el-table-column>
               <el-table-column
                prop="testStatus"
                label="测试状态"
                min-width="100"
                v-if="userInfo.classify== 'superAdmin'"
                >
                <template slot-scope="scope">
                   <el-button type="primary" size="mini" :disabled="scope.row.bindtype == 0" :plain="scope.row.bindtype == 0">
                       <div style="min-width: 37px;" @click="resetHandle(scope.row)">重置{{10-scope.row.several}}</div>
                   </el-button>
                </template>
               </el-table-column>
                <el-table-column
                prop="qrCode"
                label="操作	"
                min-width="100"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="$router.push({ path: '/deviceManage/bluetoothList/deviceDetail',query:{ code: scope.row.code }})">详情</el-button>
                </template>
               </el-table-column>
              
               <el-table-column
                prop="qrCode"
                label="二维码	"
                min-width="100"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleCreateQrCode(scope.row.code)">生成</el-button>
                </template>
               </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
         <!-- 显示二维码 -->
        <el-dialog
        :show-close="false"
        :visible.sync="dialogVisible"
        width="300px"
        :modal="false"
        custom-class="dialog"
       >
        <div class="qeCodeContent">
            <QRCode :alertDeviceCode="alertDeviceCode" v-if="dialogVisible" :from="2" />
        </div>
        </el-dialog>

        <el-dialog
        :show-close="false"
        :visible.sync="modifyHversonVisable"
        width="400px"
        :modal="false"
        title="修改硬件版本号"
        custom-class="dialogHverson"
       >    
        <el-form label-position="top" :model="modifyHversonForm">
            <el-form-item label="设备号" class="form_right25">
                <el-input v-model="modifyHversonForm.code" placeholder="设备号" disabled clearable ></el-input>
            </el-form-item>
            <el-form-item label="硬件版本" class="form_right25" style="width: 100%;">
                <el-select v-model="modifyHversonForm.hardversion"  placeholder="硬件版本"  style="width: 100%;">
                    <el-option label="00出厂默认设置" value="00" ></el-option>
                    <el-option label="01十路智慧款" value="01" ></el-option>
                    <el-option label="02电轿款" value="02" ></el-option>
                    <el-option label="03脉冲板子" value="03" ></el-option>
                    <el-option label="04离线充值机" value="04" ></el-option>
                    <el-option label="05十六路智慧款" value="05" ></el-option>
                    <el-option label="06二十路智慧款" value="06" ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="modifyHversonVisable = false" size="middle">取 消</el-button>
            <el-button type="primary" @click="setHardversionBtn" size="middle">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import QRCode from '@/components/common/QRCode'
import {alertPassword,messageTip} from '@/utils/ele'
import { getBluetoothList,setHardversion,resetDeviceTestTime } from '@/require/deviceManage'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            bluetoothListForm: {},
            modifyHversonForm: {}, //修改硬件版本号的容器
            modifyHversonVisable: false,
            tableData: [],
            totalPage: 1,
            nowPage: 1,
            loading: false,
            dialogVisible: false,
            alertDeviceCode: 0 //当前选中的二维码
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created(){
         if(JSON.stringify(this.$route.query) != "{}"){
            this.bluetoothListForm= {...this.$route.query}
            this.nowPage= parseInt(this.bluetoothListForm.currentPage) || 1
        }
        this.asyGetBluetoothList(this.bluetoothListForm)
    },
    methods: {
        contrastData(data){
            const dataTime= new Date(moment(data).format('YYYY-MM-DD')).getTime()
            const nowTime= new Date(moment(new Date()).format('YYYY-MM-DD')).getTime()
            if(dataTime- nowTime <= 0){
                return 'danger'
            }else if((dataTime- nowTime) > 0 && (dataTime- nowTime) <= 15*1000*60*60*24){
                return 'warning'
            }else{
                return 'primary'
            }
        },
        getPage(page){
            this.bluetoothListForm= {...this.bluetoothListForm,currentPage:page}
            this.$router.push({query: this.bluetoothListForm})
            this.asyGetBluetoothList(this.bluetoothListForm)
            this.nowPage = page
        },
        handleHwVerBtn(row){
            alertPassword(()=>{
               this.modifyHversonVisable= true
               let {code,hardversion}= row
               this.modifyHversonForm= {code,hardversion}
            })
        },
         handleCreateQrCode(code){ //生成二维码
            this.alertDeviceCode= code
            this.dialogVisible= true
        },
        async asyGetBluetoothList(data){
            let _this= this
            try{
                 _this.loading= true
                let bluetoothInfo= await getBluetoothList(data)
                 _this.loading= false
                 if(bluetoothInfo.code === 200){
                    _this.tableData = bluetoothInfo.listdata
                    _this.totalPage = bluetoothInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        setHardversionBtn(){ //设置硬件版本号
            setHardversion(this.modifyHversonForm).then(res=>{
                if(res.code === 200){
                    this.modifyHversonVisable= false
                    messageTip('success','修改成功')
                    for(const item of this.tableData){
                        if(item.code === this.modifyHversonForm.code){
                            item.hardversion= this.modifyHversonForm.hardversion
                            
                            return
                        }
                    }
                }else{
                    messageTip('danger','修改失败')
                    this.modifyHversonVisable= false
                }
               
                console.log(this.modifyHversonVisable)
            }).catch(error=>{
                this.modifyHversonVisable= false
            })
        },
         resetHandle(row){ //点击重置
            resetDeviceTestTime({code: row.code,testTime: 0}).then(res=>{
               if(res.code === 200){
                   row.several= 0
               }
            }).catch(error=>{
                
            })
        },
        handleSearch(){
            this.$router.push({query:{... this.bluetoothListForm,currentPage: 1}})
            this.asyGetBluetoothList({... this.bluetoothListForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    },
    components: {
        MyPagination,
        QRCode
    }
}
</script>

<style lang="less">
.bluetoothList{
    .dialog {
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 15px 20px;
        }
    }
}
</style>