<template>
    <span class="temMulDevice">
        <el-button type="primary" size="mini" @click="handleMulMoreDevice">此模板复用更多设备</el-button>
        <el-dialog title="选中设备使用此模板" :visible.sync="dialogTableVisible" width="40%" center custom-class="temMulDialog">
            <div class="tableContent">
                <el-table :data="gridData" :v-loading="loading" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"  width="55"> </el-table-column>
                    <el-table-column property="code" label="设备号" min-width="130"></el-table-column>
                    <el-table-column property="devicename" label="设备名称" min-width="150">
                        <template slot-scope="{row}">
                            <span v-if="row.devicename && row.devicename.length > 0">{{row.devicename}}</span>
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
import { getSimilarDevice,setDeviceMulDevice } from '@/require/deviceManage'
import {messageTip} from '@/utils/ele'
export default {
    data(){
        return {
            dialogTableVisible: false,
            selectList: [], //选中的数组
            loading: false,
            gridData: [],
        }
    },
    props: ['deviceInfo','tempid'],
    methods: {
        async asyGetSimilarDevice(data){
            let _this= this
            try {
                _this.loading= true
                let deviceListInfo= await getSimilarDevice(data)
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
            let { merid, hwVerson} = this.deviceInfo
            this.asyGetSimilarDevice({ merid, hwVerson}) 
            this.dialogTableVisible= true
        },
        handleSelectionChange(val){
            let arr=[]
            val.forEach((item,i)=>{
                arr.push(item.code)
            })
             this.selectList = arr;
            
        },
        handleCommitdevice(){
            // 发送ajax
            let {merid}= this.deviceInfo
            this.asySetDeviceMulDevice({tempid: this.tempid,deviceList: JSON.stringify(this.selectList)})
            this.dialogTableVisible= false
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