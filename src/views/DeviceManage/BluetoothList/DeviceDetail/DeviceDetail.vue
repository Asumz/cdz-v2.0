<template>
<el-row>
    <el-col :md="22" :lg="21" :xl="20">
    <div class="deviceDetail">
         <TopDetailInfo 
            :bindtype="bindtype" 
            :code="code" 
            :username="username"
            :remark="remark"
            :expirationTime="expirationTime"
            :totalOnlineEarn="totalOnlineEarn"
            :fromType="2"
            @backFn="backFn"
             />
        <!-- 模块信息 -->
                <ModuleInfo v-if="userInfo.classify== 'superAdmin'" :moduleInfo="moduleInfo" :code="code" :mapInfo="mapInfo" :fromType="2" />
        <!-- 模板信息 -->
        <el-card class="box-card temCard" id="template_card">
            <div slot="header" class="clearfix">
                <span>{{code}}设备使用的模板（{{hwVerson == '03' ? '脉冲模板': hwVerson== '04' ? '离线模板' : hwVerson== '08' ? 'V3充电模板' :'充电模板'}}）</span>
            </div>
            <!-- 十路智慧款 -->
            <div v-if=" hwVerson != '03' && hwVerson != '04' && hwVerson != '08'" >
                <!-- 正常模板 -->
                 <TemplateCharge :from="2" :list="temChargeList" v-if="!isGrade" :deviceInfo="{code:this.code,merid: this.merid, hwVerson: hwVerson}" /> 
                 <!-- 分等级模板 -->
                 <GradeTemplate :from="2" :list="temChargeList" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" v-else />
            </div>
            <!-- 脉冲模板 -->
            <div v-else-if="hwVerson == '03'">
                <TemplateCoin :from="2" :list="temChargeList" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" :fromType="2" />
            </div>
            <!-- 离线充值机模板 -->
            <div v-else-if="hwVerson == '04'">
                <TemplateOffline :from="2" :list="temChargeList" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" />
            </div>
            <!-- V3充电模板 -->
            <div v-else-if="hwVerson == '08'">
                <TemplateV3 :from="2" :list="temChargeList" @handleReLoad="handleReLoad" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" />
            </div>
           
        </el-card>

         <!-- 报警系统配置 -->
         <!--<AlarmConfig :code="code" /> -->

            <div class="nav_tag">
               <div class="nav_tag_item">
                    <a href="#module_card">
                        <el-tag>模块信息</el-tag>
                    </a>
                    <a href="#position_card">
                        <el-tag>位置信息</el-tag>
                    </a>
                    <a href="#template_card">
                        <el-tag>设备模板</el-tag>
                    </a>
                    <!-- <a href="#port_card" v-if="!['03','04'].includes(hwVerson)">
                        <el-tag>端口状态</el-tag>
                    </a>
                    <a href="#originCharcge_card" v-if="!['03','04'].includes(hwVerson)">
                        <el-tag>远程充电</el-tag>
                    </a>
                    <a href="#sysParmas_card" v-if="!['03','04'].includes(hwVerson)">
                        <el-tag>系统参数</el-tag>
                    </a> -->
               </div>
            </div>
    </div>
    </el-col>
    <el-col :md="3" :lg="3" :xl="3">&nbsp;</el-col>
</el-row>
</template>

<script>
import TemplateCharge from '@/components/common/Template'
import TemplateV3 from '@/components/common/TemplateV3'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateOffline from '@/components/common/TemplateOffline'
import GradeTemplate from '@/components/common/GradeTemplate'

import ModuleInfo from '@/components/device-components/MouleInfo' 
import PortStatus from '@/components/device-components/PortStatus' 
import RemotoCharge from '@/components/device-components/RemoteCharge' 
import SystemParma from '@/components/device-components/SystemParma' 
import TopDetailInfo from '@/components/device-components/TopDetailInfo' 
import AlarmConfig from '@/components/device-components/AlarmConfig' 
import {Loading, Button} from 'element-ui'
import {alertPassword,messageTip,alertConfim} from '@/utils/ele'

import { getDeviceDetailInfo,getsystemParma,savesystemParma,getDeviceStatus,lockDevicePort,remoteChargeByPort,
remoteChargeBreakOff,updateMapPosition,updateDeviceName,updateDeviceExpire,getWolfsetsys,
getWolfreadsys,getWolftestpay ,sendUpdataTip,changeDeviceIMEI,sendUpdataInfo,changeDeviceCode} from '@/require/deviceManage'
import Vue from 'vue'
// import VueAMap from 'vue-amap';
// import { lazyAMapApiLoaderInstance } from 'vue-amap';
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            Loading: null ,//Loading加载实例
            code: '', //设备号
            merid: 0, //默认是 0 绑定了就有值
            username: '0' , //username默认是0，0代表设备未绑定，非0代表设备已绑定
            bindtype: 0, //0为未绑定， 1为绑定
            hwVerson:'01',//硬件版本
            remark: '' , //设备名
            expirationTime: null,//设备到期时间
            totalOnlineEarn: 0, //总在线收益
            dialogVisible: false, //地图默认隐藏
            moduleInfo: [ 
                {title1: '硬件版本',content1: '', title2: '硬件版本号',content2: '',title3: '软件版本号',content3: ''},
                {title1: '安卓设备ID',content1: '', title2: 'IOS设备Id',content2: '',title3: '',content3: ''},
            ],
            mapInfo: [
                {title: '经度', content: ''},
                {title: '维度', content: ''},
                {title: '查看', content: 'scanMap'},
                {title: '更新经纬度', content: 'updateData'}
            ],
            isGrade: false, //默认分等级模板为false,当为分等级模板的时候 isGrade= true
            temChargeList: [], 
            temCoinList: [], //模拟投币数据
            temOfflineList: [], //离线卡数据
            deviceInfo: {},//模板复用的信息
        }
    },
    components: {
        TemplateCharge,
        TemplateV3,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate,
        // bindMerOrArea,
        // TemMulDevice2,
        ModuleInfo,
        TopDetailInfo,
        AlarmConfig
    },
    created(){
        this.code= this.$route.query.code
        this.asyGetDeviceDetailInfo({code: this.code})
        const warpHeight= (document.documentElement.clientHeight - 80)*0.75
        this.warpHeight= warpHeight
    },
    mounted(){
        document.getElementsByClassName('main')[0].scrollTop= '0px'
       
    },
    beforeDestroy(){
        this.Loading && this.Loading.close()
    },
    deactivated(){
       this.Loading && this.Loading.close()
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['clearToken']),
        backFn(){ //绑定成功之后的回调
           this.asyGetDeviceDetailInfo({code: this.code}) 
        },
        async asyGetDeviceDetailInfo(data,callback){
            let _this= this
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            try{
                let deviceInfo= await getDeviceDetailInfo(data)
                callback && callback() //执行v3模板回调
                _this.username= deviceInfo.username
                _this.merid= deviceInfo.merid
                let  {code,ccid:CCID,imei:IMEI,hardversion:hwVerson,hardversionnum:hwVersonNum,softversionnum:sfVerson,
                csq:single,lat:latitude,lon:longitude,remark,expirationTime,mainid,mainType,mainHardver,mainSoftver,totalOnlineEarn,deviceIdAndroid,deviceIdIos }= deviceInfo.equipment
                this.deviceInfo= {merid: deviceInfo.merid,hwVerson,code}
               _this.remark= remark 
                _this.moduleInfo=[ //设备信息  
                    {title1: '硬件版本',content1: hwVerson, title2: '硬件版本号',content2: hwVersonNum,title3: '软件版本号',content3: sfVerson},
                    {title1: '安卓设备ID',content1: deviceIdAndroid, title2: 'IOS设备Id',content2: deviceIdIos,title3: '',content3: ''},
                ],
                _this.mapInfo= [ //经纬度信息
                    {title: '经度', content: longitude},
                    {title: '维度', content: latitude},
                    {title: '查看', content: 'scanMap'},
                    {title: '更新经纬度', content: 'updateData'}
                ],
                _this.hwVerson= hwVerson
                _this.expirationTime= expirationTime
                _this.totalOnlineEarn= totalOnlineEarn
                _this.bindtype= deviceInfo.bindtype
                if(hwVerson != '03' && hwVerson != '04' && hwVerson != '08'){
                    if(deviceInfo.temp != null){ //temp存在，说明此模板不是分等级模板
                        //十路智慧款
                        let {id,name,remark,common1,permit,walletpay,common2,gather,merchantid,chargeInfo,ifalipay}= deviceInfo.temp //merchantid是模板所属商户的id，可以通过它来判断是否是系统模板
                            common2= common2 == null ? 1 : common2
                            // console.log(id,name,remark,common1,permit,walletpay,common2,gather)
                        _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,merchantid,chargeInfo,ifalipay}]
                
                    }else{ //分等级模板
                        _this.isGrade= true  //将分等级设为true
                         _this.temChargeList= deviceInfo.templist || []
                    }
                }else if(hwVerson == '08'){
                    _this.temChargeList= [ deviceInfo.templatev3 ]
                }else{ //其他模板
                     let {id,name,remark,common1,permit,walletpay,common2,gather,merchantid}= deviceInfo.temp
                     _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,merchantid}]
                }
                loading.close()
            }
            catch(error){
                 loading.close()
            }
        },
        handleReLoad(callback){ //v3模板的回调函数
            this.asyGetDeviceDetailInfo({code: this.code},callback)
        }
    }
}
</script>

<style lang="less">

.deviceDetail {
    background-color: #F8F8F9;
    .code_handle {
        float: left;
        margin-right: 40px;
        &:last-of-type {
            margin-right: 0;
        }
    }
    .el-card.is-always-shadow {
        box-shadow: none;
        margin-bottom: 0px;
        margin-bottom: 40px;
        &:hover {
            -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
        &.temCard {
            .el-card.is-always-shadow {
                margin-bottom: 0;
                padding: 20px;
                 &:hover {
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
            }
            .el-card__body {
                padding: 0;
            }   
        }
    }
   
    .el-card {
        .colCon {
            font-size: 14px !important;
        }
    }
    .mapDialog {
        width: 80vw;
        height: 85vh;
        margin-top: 9vh !important;
        .el-dialog__body{
            height: calc(100% - 120px);
        }
    }
    .amap-wrapper {
        width: 500px;
        height: 500px;
    }
    .nav_tag {
        position: fixed;
        z-index: 3;
        top: 100px;
        right: 20px;
        .nav_tag_item {
            // opacity: 0;
            // transition: opacity .3s;  
            a {
                display: block;
                margin-bottom: 15px;
            }
        }
        // &:hover {
        //     .nav_tag_item {
        //         opacity: 1;
        //         transform: translateY(0);
        //     }
        // }
    }
    .lastInput {
        .el-input__inner {
            text-align: center;
        }
    }
    .sysAlert {
        position: fixed;
        left: 180px;
        top: 80px;
        bottom: 0;
        right: 0;
        background-color: rgba(255,255,255,.8 );
        z-index: 999;
        .box-card {
            margin-top: 5%;
        }
        
    }
    .oveflow_ecllipsis{
        &.active {
            color: #409EFF;
        }
    }
}
</style>