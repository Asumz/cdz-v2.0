<template>
    <div class="topDetailInfo">
        <el-card class="box-card">
            <el-row>
                    <div class="colCon" v-if="userInfo.classify== 'superAdmin'" >
                        绑定状态： <el-link :type="bindtype != 0 ? 'success' : 'danger'">{{bindtype != 0 ? '已绑定' : '未绑定'}}</el-link>
                    </div>
                    <div class="colCon" v-if="userInfo.classify== 'superAdmin'" >
                        <el-button type="danger" size="mini" v-if="bindtype != 0" @click="handleTaggleBind(2)">解绑设备</el-button>
                        <el-button type="primary" size="mini" v-else @click="handleTaggleBind(1)">绑定设备</el-button>
                    </div>
                    <div class="colCon">
                            设备号: <router-link :to="`/deviceManage/deviceList?devicenum=${code}`"><el-link type="primary">{{code}}</el-link></router-link>
                    </div>
                    <div class="colCon" v-if="userInfo.classify== 'superAdmin'" >
                            绑定商户：
                            <router-link :to="`/usermanage/merInfo?nick=${username}`" v-if="bindtype != 0"><el-link type="primary">{{username}}</el-link></router-link>
                            <span v-else>— —</span> 
                    </div>
                    <div class="colCon" >
                        到期时间：
                        <el-button  
                        icon="el-icon-edit" 
                        size="mini" 
                        @click="handleExpiration(expirationTime)" 
                        plain 
                        :type="contrastData(expirationTime)"
                        v-if="userInfo.classify== 'superAdmin'"
                        >   
                            <span v-if="expirationTime == null || typeof expirationTime == undefined">&nbsp;&nbsp;&nbsp;&nbsp;{{' — — '}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span v-else>{{ expirationTime | fmtDate('YYYY-MM-DD') }}</span>
                        </el-button>
                        <el-link v-else :type="contrastData(expirationTime)" :underline="false">{{ expirationTime | fmtDate('YYYY-MM-DD') }}</el-link>
                    </div>
                    <div class="colCon">
                            设备名：
                        <span v-if="!isShowDeviceName">
                            <el-button  type="primary" icon="el-icon-edit" size="mini" plain @click="handleShowDeviceName"> {{ remark!= null ? remark : '— —'}}</el-button>
                            </span>
                        <span v-else>
                            <el-input v-model="resetRemark" placeholder="请输入设备名" size="mini" style="width: 40%"></el-input> 
                            <el-button type="success" size="mini" @click="handleSaveName()" icon="el-icon-folder-checked">修改</el-button>
                            <el-button type="warning" size="mini" @click="handleCancelDeleteName()"  icon="el-icon-folder-delete">取消</el-button>
                        </span>
                    </div>
                    <div class="colCon">
                        更换模块：
                        <span v-if="!isShowIMEI">
                            <el-button  type="primary" icon="el-icon-edit" size="mini" plain @click="()=>{this.isShowIMEI= !this.isShowIMEI}">输入要更换的设备号</el-button>
                            </span>
                        <span v-else>
                            <el-input v-model="changeIMEI" placeholder="输入要更换的设备号" size="mini" style="width: 40%"></el-input> 
                            <el-button type="success" size="mini" @click="handleChangeIMEI()" icon="el-icon-folder-checked">替换</el-button>
                            <el-button type="warning" size="mini" @click="()=>{ this.isShowIMEI= false; this.changeIMEI= ''; }"  icon="el-icon-folder-delete">取消</el-button>
                        </span>
                    </div>
                    <div class="colCon" v-if="userInfo.classify== 'superAdmin'">
                        定制设备号：
                        <span v-if="!isShowChangeCode">
                            <el-button  type="primary" icon="el-icon-edit" size="mini" plain 
                            @click="()=>{this.isShowChangeCode= !this.isShowChangeCode}"
                            :disabled="!(bindtype == 0 && expirationTime == null && totalOnlineEarn == 0)"
                            >输入新设备号</el-button>
                            </span>
                        <span v-else>
                            <el-input v-model="changeCode" placeholder="输入新设备号" size="mini" style="width: 40%"></el-input> 
                            <el-button type="success" size="mini" @click="handleChangeCode()" icon="el-icon-folder-checked">更换</el-button>
                            <el-button type="warning" size="mini" @click="()=>{ this.isShowChangeCode= false; this.isShowChangeCode= ''; }"  icon="el-icon-folder-delete">取消</el-button>
                        </span>
                    </div>
                     <div class="colCon" v-if="userInfo.classify== 'superAdmin'">
                        下载日志：
                       <el-date-picker
                            v-model="downLoadTime"
                            type="date"
                            size="mini"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                           
                        </el-date-picker>
                        <el-button type="primary" size="mini"  @click="handleDownloadIfram">下载</el-button>
                    </div>
            </el-row>
        </el-card>
        
        <bindMerOrArea :bindInfo="bindInfo" @backFn="backFn"/> 
        <!-- 修改设备到期日期 -->
        <el-dialog
                :show-close="false"
                :visible.sync="expirationVisable"
                width="400px"
                :modal="false"
                title="修改设备到期时间"
            >    
                <el-form label-position="top" :model="expirationForm">
                    <el-form-item label="设备号" class="form_right25">
                        <el-input v-model="expirationForm.code" placeholder="设备号" disabled clearable ></el-input>
                    </el-form-item>
                    <el-form-item label="到期时间" class="form_right25" style="width: 100%;">
                        <el-date-picker
                            style="width: 100%;"
                            v-model="expirationForm.expire"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                        :picker-options="disabledDateFn">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="expirationVisable = false" size="middle">取 消</el-button>
                    <el-button type="primary" @click="setDeviceExpiration" size="middle">确 定</el-button>
                </span>
            </el-dialog>
            <!-- iframe 弹框 -->
            <DialogWrapper 
                title="下载日志"
                :dialogVisible="dialogVisible"
                :handleClose="handleClose"
                :footerHide="true"
            >
                <iframe :src="iframeSrc" frameborder="0" ref='downloadIfram' v-if="dialogVisible"></iframe>
                <div class="button_btn">
                    <el-button type="primary" size="mini" @click="dialogVisible= false">关闭</el-button>
                </div>
            </DialogWrapper>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { updateDeviceExpire,changeDeviceIMEI,changeDeviceCode,updateDeviceName } from '@/require/deviceManage'
import { unbindDevice } from '@/require'
import {alertPassword,messageTip,alertConfim} from '@/utils/ele'
import bindMerOrArea from '@/components/common/bindMerOrArea'
import DialogWrapper from '@/components/DialogWrapper'
export default {
    props: {
        bindtype: Number,
        code: String,
        username: [String,Object], //username有可能为null
        expirationTime: [String,Number],
        remark: [String,Number],
        totalOnlineEarn: Number,
    },
    data(){
        return {
            disabledDateFn: {
                disabledDate(time) {
                    return time.getTime() < Date.now()-8.64e7;
                }
            },
            isShowDeviceName: false, //是否显示设备名称
            isShowIMEI: false, //修改IMEI号是否显示
            isShowChangeCode: false, //修改设备号是否显示
            bindInfo: {show: false},//默认绑定信息 {show: false,from: 1,page: {code: '0'}}
            expirationVisable: false, //设备到期日期
            expirationForm: {},//设备到期日期容器
            resetRemark: '', //修改设备名
            changeIMEI: '', //更换IMEI号
            changeCode: '',//更换code
            downLoadTime: '', //下载日期
            dialogVisible: false, //日志弹框是否显示
            iframeSrc: ''
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        bindMerOrArea,
        DialogWrapper
    },
    methods: {
        handleTaggleBind(type){ //绑定或解绑设备
            alertPassword(()=>{
                // 发送请求，进行绑定或解绑操作，成功了之后修改原本的状态
                if(type== 1){ //绑定设备
                    this.bindInfo= {show: true,from: 1,page: {code: this.code}}
                }else{ //解绑设备
                    unbindDevice({devicenum: this.code}).then(res=>{
                        if(res.code == 200){
                            messageTip('success','解绑成功')
                            this.backFn()
                            // this.asyGetDeviceDetailInfo({code: this.code})       
                        }else{
                            messageTip('error','解绑失败')
                        }
                    }).catch(err=>{})
                }
                
            })
        },
        contrastData(data){ //根据时间返回值
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
        handleShowDeviceName(){ //点击显示修改设备名称框
            this.isShowDeviceName= true
        },
        handleSaveName(){ //点击保存设备名称
            if(this.resetRemark == "" ||  this.resetRemark == null ){
                messageTip('warning','设备名不能为空')
                return
            }
           updateDeviceName({code: this.code,name: this.resetRemark}).then(res=>{
               if(res.code == 200){
                   messageTip('success','设备名设置成功') 
                   this.backFn()
               }else if(res.code == 102){
                   messageTip('warning',res.message) 
               }
           }).catch(err=>{
               messageTip('warning','设置失败') 
           })
            this.isShowDeviceName= false
        },
        handleChangeIMEI(){ //修改IMEI号
            let {code:code1,changeIMEI:code2} = this
           changeDeviceIMEI({code1,code2}).then(res=>{
                if(res.code === 200){
                    messageTip('success',res.msg) 
                    this.backFn()
                }else{
                    messageTip('warning',res.msg) 
                }
           })
           this.isShowIMEI= false
           this.changeIMEI= ''
        },
        handleChangeCode(){ //更换设备号
            let {code:code1,changeCode:code2} = this
            if(!(/^\d{6}$/.test(code2))){
                return messageTip('warning','请输入设备号为6位纯数字')
            }
            changeDeviceCode({code1,code2}).then(res=>{
                if(res.code === 200){
                    messageTip('success',res.msg)
                    this.$router.push({path: '/deviceManage/deviceList/deviceDetail',query: {code: code2}})
                }else{
                    messageTip('warning',res.msg) 
                }
                
           })
           this.isShowChangeCode= false
           this.changeCode= ''
        },
        handleCancelDeleteName(){ //点击取消显示设备名称框
            this.isShowDeviceName= false
        },
        handleExpiration(expirationTime){ //修改设备的到期日期--验证密码
            alertPassword(()=>{
              
               if(expirationTime != null){
                   let expire= moment(expirationTime).format('YYYY-MM-DD')
                    this.expirationForm= {code: this.code,expire}
               }else{
                    this.expirationForm= {code:this.code}
               }
               this.expirationVisable= true
            })
        },
        async setDeviceExpiration(){//修改设备的到期日期
            try{
                let info=  await updateDeviceExpire(this.expirationForm)
                if(info.code == 200){
                    messageTip('success',`修改设备${this.expirationForm.code}成功`)
                   this.backFn()
                }else{
                    messageTip('error',info.message)
                }
                this.expirationVisable= false
            } catch(error){
                messageTip('error','修改失败')
                this.expirationVisable= false
            } 
        },
        handleDownloadIfram(){ //下载日志
            this.iframeSrc= `http://www.he360.com.cn/fileDispose/download?fileFullName=device${this.code}-${this.downLoadTime}.log`
            this.dialogVisible= true
        },
        handleClose(){ //日志弹框
            this.dialogVisible= false
        },
        backFn(){
            this.$emit('backFn') //调用父组件的方法，重新请求
        }
    }
}
</script>

<style lang="less">
.topDetailInfo {
    .el-card__body{
        margin-bottom: -20px;
    }
    .colCon {
        padding: 0 20px;
        float: left;
        margin-bottom: 20px;
    }
    .button_btn {
        overflow: hidden;
        button {
            float: right;
        }
    }
}
    
</style>