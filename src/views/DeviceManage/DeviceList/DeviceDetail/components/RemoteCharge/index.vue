<template>
    <div>
        <el-card class="box-card" v-if="!['03','04','07'].includes(hwVerson)" id="originCharcge_card">
            <div slot="header" class="clearfix">
                <span>远程充电</span>
            </div>
            <div class="remoteChargeTit" style="margin-bottom: 15px;">
                <el-button type="primary" size="mini" disabled >查询空闲端口</el-button>
                <el-button type="primary" size="mini" disabled >查询端口状态</el-button>
            </div>
            <el-table
                :data="remoteCharge"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="port"
                label="端口号"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="端口状态"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <el-link :type="row.portStatus== 1 ? 'success': row.portStatus== 2 ? 'danger': 'default' " size="mini" :underline="false" >
                        {{row.portStatus== 1 ? '空闲': row.portStatus== 2 ? '使用':  row.portStatus== 3 ? '锁定' : '故障'}}
                        <!-- 自己设置的  portStatus 等于3时为锁定-->
                    </el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="free"
                label="是否空闲"
                min-width="100"
                >
               <template slot-scope="{row}">
                    <el-link :type="row.portStatus== 1 ? 'success': 'danger' " size="mini" :underline="false" >
                        {{row.portStatus== 1 ? '是': '否'}}
                    </el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="chargeTime"
                label="充电时间（分钟）"
               min-width="100"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="1500" :min="0" v-model="scope.row.chargeTime" :step="20"></el-input-number>
                </template>
                </el-table-column>
                <el-table-column
                prop="elePower"
                label="充电电量（度）" 
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="20" :min="0" :precision="2" v-model="scope.row.elePower" :step="1"></el-input-number>
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="开始充电"
               min-width="100"
                >
                    <template slot-scope="{$index,row}">
                        <el-button type="primary" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-open'" @click="handleRemoteCharge($index,row)">充电</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="远程断电"
                min-width="100"
                >
                    <template slot-scope="{row}">
                        <el-button type="danger" size="mini" :icon="row.loading1 ? 'el-icon-loading' : 'el-icon-turn-off'"  @click="handleRemoteBreakOff(row)">断电</el-button>
                    </template>
                </el-table-column>
            </el-table>
         </el-card>

        <!-- 07 远程充电 -->
        <el-card class="box-card" id="originCharcge_card"  v-if="['07'].includes(hwVerson)">
            <div slot="header" class="clearfix">
                <span>远程充电</span>
            </div>
            <el-table
                :data="chargeSendList"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="port"
                label="端口号"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="端口状态"
                min-width="80"
                >
                <template slot-scope="{row}">
                    <el-link :type="row.portStatus== 1 ? 'success': row.portStatus== 2 ? 'danger': 'default' " size="mini" :underline="false" >
                        {{row.portStatus== 1 ? '空闲': row.portStatus== 2 ? '使用':  row.portStatus== 3 ? '锁定' : '故障'}}
                        <!-- 自己设置的  portStatus 等于3时为锁定-->
                    </el-link>
                </template>
                </el-table-column>
               
                <el-table-column
                prop="money"
                label="金额"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="100" :min="0" v-model="scope.row.money" :step="1"></el-input-number>
                </template>
                </el-table-column>
                <el-table-column
                prop="chargeTime"
                label="充电时间（分钟）"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="2000" :min="0" v-model="scope.row.chargeTime" :step="20"></el-input-number>
                </template>
                </el-table-column>
                <el-table-column
                prop="elePower"
                label="充电电量（度）"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="100" :min="0" :precision="1" v-model="scope.row.elePower" :step="1"></el-input-number>
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="开始充电"
                width="150"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-open'" @click="getBoardStart(row)">充电</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="远程断电"
                width="150"
                >
                    <template slot-scope="{row}">
                        <el-button type="danger" size="mini" :icon="row.loading1 ? 'el-icon-loading' : 'el-icon-turn-off'" @click="handleRemoteBreakOff(row)" >断电</el-button>
                    </template>
                </el-table-column>
            </el-table>
         </el-card>
    </div>
</template>

<script>
import { remoteChargeByPort,remoteChargeBreakOff,getWolftestpay  } from '@/require/deviceManage'
import {messageTip} from '@/utils/ele'
export default {
    props: {
        remoteCharge: Array,
        hwVerson: String,
        code: String,
        chargeSendList: Array
    },
    methods: {
        handleRemoteCharge(index,row){ //远程充电
            let {port:payport,chargeTime:time,elePower:elec }= row
            Vue.set(row,'loading',true)
            remoteChargeByPort({payport,time,elec,code: this.code}).then(res=>{
                Vue.set(row,'loading',false)
                if(res.wolfcode == '1000'){
                    messageTip('success',`远程充电设置成功`)
                }else{
                    messageTip('error',`远程充电设置失败`)
                }
            }).catch(err=>{
                Vue.set(row,'loading',false)
            })
        },
        handleRemoteBreakOff(row){ //远程断电
            let {port}= row
             Vue.set(row,'loading1',true)
            remoteChargeBreakOff({port,code: this.code}).then(res=>{
                 Vue.set(row,'loading1',false)
                if(res.wolfcode == '1000'){
                    messageTip('success',`远程断电设置成功`)
                }else{
                     messageTip('error',`远程断电设置失败`)
                }
            }).catch(err=>{
                 Vue.set(row,'loading1',false)
            })  
        },
        getBoardStart(row){ //07 开始充电
            let {port,money,chargeTime:time,elePower:elec}= row
            getWolftestpay({code:this.code,port,money,time,elec,chargeType:1}).then(res=>{
            //   messageTip('success',res)
            }).catch(err=>{

            })
        },
    }
}
</script>

<style>

</style>