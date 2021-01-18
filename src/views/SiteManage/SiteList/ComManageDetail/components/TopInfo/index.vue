<template>
    <div class="topInfo">
        <el-card>
            <div class="clearfix item_c">
                <div class="item">
                    小区名称：
                    <el-button v-show="!editAreaName" type="primary" size="mini" icon="el-icon-edit" @click="handleEditName(1)">{{name ? name : '— —'}}</el-button>
                    <div v-show="editAreaName" class="editCon">
                        <el-input placeholder="请输入小区名称" size="mini" v-model="topInfoForm.name" style="width: 50%;" ></el-input>
                        <el-button type="success" size="mini" @click="handleSave(1)">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCloseEditName(1)">取消</el-button>
                    </div>
                </div>
                <div class="item">
                    所属商户：
                    <router-link :to="`/usermanage/merInfo?phone=${dealphon}`">
                        <el-link type="primary">{{dealnick}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    商户电话：
                    <router-link :to="`/usermanage/merInfo?phone=${dealphon}`">
                        <el-link type="primary">{{dealphon}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    设备数：
                    <router-link :to="`/deviceManage/deviceList?phone=${dealphon}&areaname=${name}`">
                        <el-link type="primary">{{devicenum}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    会员数：
                    <router-link :to="`/usermanage/userInfo?mobile=${dealphon}&areaname=${name}&condition=2`">
                        <el-link type="primary">{{areausernum}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    在线卡数：
                    <router-link :to="`/iccardManage/onlineCardQuery?areaname=${name}&phone=${dealphon}`">
                        <el-link type="primary">{{onlinenum}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    钱包¥（充/赠）：
                    <el-link type="success" :underline="false" >{{utopupbalance.toFixed(2)}}</el-link> / <el-link type="success" :underline="false" >{{usendmoney.toFixed(2)}}</el-link>
                </div>
                <div class="item">
                    在线卡¥（充/赠）：
                    <el-link type="success" :underline="false" >{{ctopupbalance.toFixed(2)}}</el-link> / <el-link type="success" :underline="false" >{{csendmoney.toFixed(2)}}</el-link>
                </div>
                <div class="item">
                    小区地址:
                    <div class="editCon" v-show="!editAreaAddr">
                        <div class="testAddress">
                            <span>{{address}}</span>
                        </div>
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEditName(2)"></el-button>
                    </div>
                    <div class="editCon" v-show="editAreaAddr">
                        <el-input placeholder="请输入小区地址" size="mini" v-model="topInfoForm.address" style="width: 50%;" ></el-input>
                        <el-button type="success" size="mini" @click="handleSave(2)">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCloseEditName(2)">取消</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { editAreaInfo } from '@/require/communManage'
import { messageTip } from '@/utils/ele'
export default {
    props: {
        aid: {
            type: [String,Number]
        },
        name:{
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: '— —'
        },
        dealnick: {
            type: String,
            default: '— —'
        },
        dealphon:{
            type: String,
            default: '— —'
        },
        areausernum: {
            type: Number,
            default: 0
        },
        onlinenum: {
            type: Number,
            default: 0
        },
        devicenum: {
            type: Number,
            default: 0
        },
        csendmoney: {
            type: Number,
            default: 0
        },
         ctopupbalance: {
            type: Number,
            default: 0
        },
         usendmoney: {
            type: Number,
            default: 0
        },
         utopupbalance: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            editAreaName: false, //编辑小区名称
            editAreaAddr: false, //编辑小区名称
            topInfoForm: {}
        }
    },
    methods: {
        handleEditName(from){ //from 1名称 2地址 编辑名称
            this.topInfoForm= {
                name: this.name,
                address: this.address
            }
            switch(from){
                case 1 : 
                    this.editAreaName= true 
                break
                case 2 :
                    this.editAreaAddr= true 
                break
            }
            
        },
        handleCloseEditName(from){ //关闭修改
            switch(from){
                case 1 : 
                    this.editAreaName= false 
                break
                case 2 : 
                    this.editAreaAddr= false 
                break
            }
        },
        handleSave(from){
            editAreaInfo({aid: this.aid,...this.topInfoForm}).then(res=>{
                if(res.code === 200){
                    messageTip('success',from == 1 ? '小区名修改成功' : '小区地址修改成功')
                    this.$emit('handleEditAreaInfo',this.topInfoForm)
                }else{
                    messageTip('error',from == 1 ? '小区名修改成功' : '小区地址修改成功')
                }
            }).catch(e=>{

            })
            this.editAreaName= false
            this.editAreaAddr= false
        }
    }
}
</script>

<style lang="less">
.topInfo {
    .editCon {
        display: inline-block;
    }
    .item_c {
        display: flex;
        align-items: center;
        margin-right: -30px;
        flex-wrap: wrap;
        margin-bottom: -10px;
        .item {
            font-size: 14px !important;
            margin-right: 30px;
            height: 100%;
            margin-bottom: 10px;
        }
    }
   .testAddress {
       display: inline-block;
       max-width: 300px;
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
       vertical-align: text-bottom;
       span {
           font-size: 14px;
       }
   }
}
</style>