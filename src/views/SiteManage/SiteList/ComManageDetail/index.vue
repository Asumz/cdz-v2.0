<template>
  <div class="comManageDetail">
        <!-- 顶部详情 -->
        <TopInfo
            :aid="aid"
            :name="name"
            :address="address"
            :dealnick="dealnick"
            :dealphon="dealphon"
            :areausernum="areausernum"
            :onlinenum="onlinenum"
            :devicenum="devicenum"
            :csendmoney="csendmoney"
            :ctopupbalance="ctopupbalance"
            :usendmoney="usendmoney"
            :utopupbalance="utopupbalance"
            @handleEditAreaInfo="handleEditAreaInfo"
        />
        <!-- 合伙人和商户 -->
        <PartnerAndDevice 
            :partnerInfo="partnerInfo" 
            :devicenumlist="devicenumlist" 
            :aid="aid"
            :dealphon="dealphon" 
            :name="name" 
            :devicenum="devicenum"
            @handleResetDeviceNum="handleResetDeviceNum" 
        />
        <!-- 钱包模板 -->
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>钱包系统模板</span>
            </div>
            <TemplateWallet 
                :from="2" 
                :list="tempWallet" 
                :aid="aid"
                :merid="merid"
            />
        </el-card>
        <!-- 在线卡模板 -->
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>在线卡系统模板</span>
            </div>
            <TemplateOffline 
                :from="2" 
                :list="tempOnCard" 
                :aid="aid"
                :merid="merid"
            />
        </el-card>
  </div>
</template>

<script>
import TopInfo from './components/TopInfo'
import TemplateWallet from '@/components/common/TemplateWallet'
import TemplateOffline from '@/components/common/TemplateOffline'
import PartnerAndDevice from './components/PartnerAndDevice'
import { getAreaDetails } from '@/require/communManage'
import { messageTip } from '@/utils/ele'
import Util from '@/utils/util'
export default {
    data(){
        return {
            aid: -1, //小区id
            merid: -1, //商户id
            loading: null, //加载图标实例对象
            name: '', //小区名称
            address: '', //小区地址
            dealnick: '', // 商户名称
            dealphon: '', //商户电话
            areausernum: 0, //小区用户数量
            onlinenum: 0, //小区在线卡数量
            devicenum: 0, //小区设备数量
            csendmoney: 0, //在线卡赠送金额
            ctopupbalance: 0, //在线卡赠送金额
            usendmoney: 0, //在线卡赠送金额
            utopupbalance: 0, //在线卡赠送金额
            tempWallet: [], //钱包数据
            tempOnCard: [], //在线卡数据
            partnerInfo: [], //合伙人list
            devicenumlist: [] //设备list
        }
    },
    components:{
        TopInfo,
        PartnerAndDevice,
        TemplateWallet,
        TemplateOffline
    },
    created(){
        this.loading= new Util.Hd_Loading()
        let { aid }= this.$route.query
        this.aid= aid
        this.AsyGetAreaDetails({aid})
    },
    beforeDestroy(){
        this.loading && this.loading.hide()
    },
    deactivated(){
        this.loading && this.loading.hide()
    },
    methods: {
        async AsyGetAreaDetails(data){
            let _this= this
            try{
                _this.loading.show()
                let info= await getAreaDetails(data)
                if(info.code === 200){
                    let { csendmoney,ctopupbalance,usendmoney,utopupbalance }= info
                    let { resultarea,tempWallet,tempOnCard,devicenumlist,partnerInfo }= info
                    let { address,name,dealnick,dealphon,areausernum,onlinenum,devicenum,merid}= resultarea
                    {
                        _this.name= name
                        _this.address= address
                        _this.dealnick= dealnick
                        _this.dealphon= dealphon
                        _this.areausernum= areausernum
                        _this.onlinenum= onlinenum
                        _this.devicenum= devicenum
                        _this.devicenumlist= devicenumlist
                        _this.partnerInfo= partnerInfo
                        _this.merid= merid
                    }
                    {
                        _this.tempWallet= tempWallet ? [tempWallet] : []
                        _this.tempOnCard= tempOnCard ? [tempOnCard] : []
                    }
                    {
                        _this.csendmoney= csendmoney
                        _this.ctopupbalance= ctopupbalance
                        _this.usendmoney= usendmoney
                        _this.utopupbalance= utopupbalance
                    }
                }else{
                    messageTip('error','获取失败')
                } 
                _this.loading.hide()
            }catch(e){
                _this.loading.hide()
            }
        },
        handleResetDeviceNum(devicenum){ //设备新增，删除之后修改设备数量
            this.devicenum= devicenum
        },
        handleEditAreaInfo(data){
            let { name,address }= data
            this.name= name
            this.address= address
        }
    }
}
</script>

<style lang="less">
.comManageDetail {
    background-color: #F8F8F9;
    .el-card.is-always-shadow {
        box-shadow: none;
        margin-bottom: 0px;
        margin-bottom: 40px;
        &:hover {
            -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            .el-card__body {
                .el-card.is-always-shadow {
                    &:hover {
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
                }
            }
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
}   
</style>