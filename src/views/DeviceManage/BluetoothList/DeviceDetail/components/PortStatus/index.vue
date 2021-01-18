<template>
  <el-card class="box-card" v-if="!['03','04'].includes(hwVerson)" id="port_card">
    <div slot="header" class="clearfix">
      <span>端口状态</span>
    </div>
    <el-table
      :data="portStatusList"
      border
      fit
      style="width: 100%"
      :header-cell-style="{background:'#f5f7fa',color:'#666'}"
    >
      <el-table-column prop="port" label="端口号" width="70"></el-table-column>
      <el-table-column prop="portStatus" label="端口状态" min-width="80">
        <template slot-scope="{row}">
          <el-link
            :type="row.portStatus== 1 ? 'success': row.portStatus== 2 ? 'danger': 'default' "
            size="mini"
            :underline="false"
          >
            {{row.portStatus== 1 ? '空闲': row.portStatus== 2 ? '使用': row.portStatus== 3 ? '锁定' : '故障'}}
            <!-- 自己设置的  portStatus 等于3时为锁定-->
          </el-link>
        </template>
      </el-table-column>

      <el-table-column prop="portV" label="电压 V" min-width="80" v-if="['07'].includes(hwVerson)"></el-table-column>
      <el-table-column prop="portA" label="电流 A" min-width="80" v-if="['07'].includes(hwVerson)"></el-table-column>

      <el-table-column prop="time" label="充电时间（分钟）" min-width="80"></el-table-column>
      <el-table-column prop="power" label="充电功率（W）" min-width="80"></el-table-column>
      <el-table-column prop="elec" label="剩余电量（度）" min-width="80">
        <template slot-scope="{row}">{{ row.elec/100 }}</template>
      </el-table-column>
      <el-table-column prop="surp" label="可回收余额" min-width="80">
        <template slot-scope="{row}">
          {{ (row.surp == null || typeof row.surp == 'undefined') ? 0 : row.surp }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="100">
        <template slot-scope="{row}">{{ row.updateTime | fmtDate }}</template>
      </el-table-column>
    
      <el-table-column prop="update" label="实时更新" min-width="100">
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-refresh-left"
            @click="handleGetPortStatus($index,row)"
          >更新</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="lock" label="锁定" min-width="120">
        <template slot-scope="{$index,row}">
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-lock"
            @click="handleLockPort($index,row)"
          >锁定</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="unLock" label="解锁" min-width="120">
        <template slot-scope="{$index,row}">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-unlock"
            @click="handleDebloack($index,row)"
          >解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getDeviceStatus,lockDevicePort } from '@/require/deviceManage'
import {Loading, Button} from 'element-ui'
export default {
    props: {
        portStatusList: Array,
        hwVerson: String,
        code: String
    },
    data(){
        return {
            loading: null
        }
	},
	beforeDestroy(){
		this.Loading && this.Loading.close()
	},
	deactivated(){
		this.Loading && this.Loading.close()
	},
    methods: {
        handleGetPortStatus(index,row){ //更新端口状态
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            getDeviceStatus({port: row.port,code: this.code}).then(res=>{
                loading.close()
                if (res.wolfcode == "1001") {
                    messageTip('error','获取端口状态失败')
                    return
                }
                let copeRow= { ...row ,portStatus: res.portstatus,elec: res.elec,time:res.time,power:res.power,updateTime: parseInt(res.updatetime)}
                this.$emit('handleGetPortStatusCallback',{index,copeRow})
                // Vue.set(row,'portStatus',res.portstatus)
                // Vue.set(row,'elec',res.elec)
                // Vue.set(row,'time',res.time)
                // Vue.set(row,'power',res.power)
                // Vue.set(row,'updateTime',parseInt(res.updatetime))
            }).catch(err=>{ 
                loading.close()
            })
        },
        handleLockPort(index,row){ //锁定端口
            let loading= Loading.service({
                        lock: true,
                        text: '锁定中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            lockDevicePort({port: row.port,status: 0,code: this.code}).then(res=>{
                loading.close()
                if (res.err == "0") {
                    messageTip('error',res.errinfo)
                    return
                }
                if (res.err == "1") {
                    messageTip('error',res.errinfo)
                    return
                }
                let portStatus
                if(res.status == 0){ //当返回的status为0时，portStatus改为3（锁定）
                    portStatus= 3
                }else if(row.portStatus == 3){ //当portStatus为3（锁定）是，设置portStatus为1，为1是空闲
                    portStatus= 1
                }
                this.$emit('handleLockPortStatusCallback',{index,portStatus})
                // row.portStatus= portStatus
            }).catch(err=>{ 
                loading.close()
            })
        },
        handleDebloack(index,row){ //更新端口
            let loading= Loading.service({
                        lock: true,
                        text: '解锁中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass",
                    });
            this.Loading= loading
            lockDevicePort({port: row.port,status: 1,code: this.code}).then(res=>{
                loading.close()
                if (res.err == "0") {
                    messageTip('error',res.errinfo)
                    return
                }
                if (res.err == "1") {
                    messageTip('error',res.errinfo)
                    return
                }
                let portStatus
                if(res.status == 1){ //当返回的status为0时，portStatus改为3（锁定）
                    portStatus= 1
                }else if(row.portStatus == 3){ //当portStatus为3（锁定）是，设置portStatus为1，为1是空闲
                    portStatus= 1
                }
                this.$emit('handleLockPortStatusCallback',{index,portStatus})
                // row.portStatus= portStatus
            }).catch(err=>{ 
                loading.close()
            })
        },
    }
};
</script>

<style>
</style>