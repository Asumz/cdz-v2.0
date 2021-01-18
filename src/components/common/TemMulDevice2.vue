<template>
    <span class="temMulDevice">
        <el-button type="primary" size="mini" @click="handleMulMoreDevice">复用到其他设备</el-button>
        <el-dialog title="选中设备使用此系统参数" :visible.sync="dialogTableVisible" width="40%" center custom-class="temMulDialog">
            <div class="tableContent">
                <el-table :data="gridData" :v-loading="loading" @selection-change="handleSelectionChange" >
                    <el-table-column type="selection"  width="55"> </el-table-column>
                    <el-table-column property="code" label="设备号" min-width="130"></el-table-column>
                    <el-table-column property="devicename" label="设备名称" min-width="150" >
                        <template slot-scope="{row}">
                            <span v-if="row.devicename && row.devicename.length > 0">{{row.devicename}}</span>
                            <span v-else>— —</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="areaname" label="所属小区" min-width="150" sortable  :sort-method="sortFn" >
                        <template slot-scope="{row}">
                            <span v-if="row.areaname && row.areaname.length > 0">{{row.areaname}}</span>
                            <span v-else>— —</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleCommitdevice" size="small">确 定</el-button>
            </div>
         </el-dialog>
    </span>
</template>

<script>
import { getSimilarDeviceByaid,setDeviceMulDevice } from '@/require/deviceManage'
import {messageTip,alertConfim} from '@/utils/ele'
export default {
    data(){
        return {
            dialogTableVisible: false,
            selectList: [], //选中的数组
            loading: false,
            gridData: [],
        }
    },
    props: ['deviceInfo'],
    methods: {
        async asyGetSimilarDevice(data){
            let _this= this
            try {
                _this.loading= true
                let deviceListInfo= await getSimilarDeviceByaid(data)
                 _this.loading= false
                if(deviceListInfo.code == 200){
                   _this.gridData= deviceListInfo.devicelist
                }else{
                    messageTip('error','设备获取失败')
                }
            }catch(error){
                 _this.loading= false
            }
        },
        async asySetDeviceMulDevice(data){
            let _this= this
            try {
                _this.loading= true
                let deviceListInfo= await setDeviceMulDevice(data)
                 _this.loading= false
                if(deviceListInfo.code == 200){
                    messageTip('success','复用模板成功')
                }else{
                    messageTip('error','复用模板失败')
                }
            }catch(error){
                 _this.loading= false
            }
        },
        handleMulMoreDevice(){
            let { merid, hwVerson,code} = this.deviceInfo
            this.asyGetSimilarDevice({ merid,hwVerson,code}) 
            this.dialogTableVisible= true
        },
        handleSelectionChange(val){
            let arr=[]
            val.forEach((item,i)=>{
                arr.push({code: item.code,remark:item.devicename,areaname: item.areaname,status: 0})
            })
             this.selectList = arr;
            
        },
        handleCommitdevice(){ //点击确定的时候，将选择的值传给父组件
            if(this.selectList.length > 0){
                this.$emit('getDeviceList',this.selectList)
                this.dialogTableVisible= false
            }else{
                alertConfim('请先选择设备',()=>{})
            }
            
        },
        sortFn(a,b){
           return a.aid- b.aid
        }
    }
}
</script>

<style lang="less">
.temMulDevice {
    .temMulDialog {
         min-width: 400px;
        .tableContent {
            max-height: 60vh;
            overflow: auto;
            &::-webkit-scrollbar-track-piece {
            background: #f7f7f7;
            }

            &::-webkit-scrollbar {
            width: 6px;
            }

            &::-webkit-scrollbar-thumb {
            background: #D9DCE1;
            border-radius: 20px;
            }
        }
    }
}
    
</style>