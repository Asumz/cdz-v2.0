<template>
  <div class="partnerAndDevice">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>小区合伙人、设备</span>
            </div>
            <el-row>
                <el-col :xs="24" :sm="12" class="col_right_p_10">
                    <el-table
                        border
                        :data="partnerInfo"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                    >
                        <el-table-column 
                            label="姓名"
                            prop="realname"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <div v-show="!row.edit">{{row.realname == '' || row.realname == null ? '— —' : row.realname}}</div>
                                <el-input v-show="row.edit" v-model="row.realname" size="mini"  disabled/>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="电话"
                            prop="phone"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <div v-show="!row.edit">{{row.phone}}</div>
                                <el-input v-show="row.edit" v-model="row.phone" size="mini" placeholder="请输入合伙人手机号" />
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="分成比"
                            prop="rate"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <div  v-if="row.edit || row.modify">
                                    <el-input-number style="width: 85%; min-width: 90px" size="mini" v-model="row._percent" :precision="0" :step="10" :min="0" :max="100" placeholder="请输入分成比"></el-input-number>
                                    <!-- <el-input v-model="row.percent" size="mini" placeholder="请输入分成比" style="width: 75%" /> -->
                                    %
                                </div>
                                <el-button  v-else type="primary" icon="el-icon-edit" size="mini" plain @click="handleEditRate(row,1)">{{row.percent*100}}%</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="操作"
                            min-width="70"
                        >
                            <template slot-scope="{row}">
                                <el-button v-show="!row.edit && !row.modify" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(row,1)">删除</el-button>
                                <div v-show="row.edit" class="handleBtn">
                                    <el-button type="success" size="mini" @click="handleAddSave(1)">保存</el-button>
                                    <el-button type="warning" size="mini" @click="handleAddCancel(1)">取消</el-button>
                                </div>
                                <div v-show="row.modify" class="handleBtn">
                                    <el-button type="success" size="mini" @click="handleEditSave(row,1)">保存</el-button>
                                    <el-button type="warning" size="mini" @click="handleEditCancel(row,1)">取消</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="add_parAndDevice">
                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addParOrDevice(1)" :disabled="(partnerInfo[partnerInfo.length-1] && partnerInfo[partnerInfo.length-1].edit) || partnerInfo.length >= 4">添加合伙人</el-button>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" class="col_left_p_10">
                    <el-table
                        border
                        :data="devicenumlist"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                        max-height="265"
                        ref="tableList"
                    >
                        <el-table-column 
                            label="设备号"
                            prop="code"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <router-link :to="`/deviceManage/deviceList?devicenum=${row.code}`" v-show="!row.edit">
                                    <el-link :underline="false" type="primary">{{row.code}}</el-link>
                                </router-link>
                                <el-input v-show="row.edit" v-model="row.code" size="mini" placeholder="请输入设备号" />
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="设备名"
                            prop="remark"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                               <el-input v-if="row.modify" v-model="row._remark" size="mini" placeholder="请输入设备名" />
                               <el-button  v-if="!row.modify && !row.edit" type="primary" icon="el-icon-edit" size="mini" plain @click="handleEditRate(row,2)">{{row.remark== null ||row.remark == '' ? '— —' : row.remark}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="状态"
                            prop="state"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                               <span v-if="row.state === 1">在线</span>
                               <el-link v-else type="danger" :underline="false">离线</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="操作"
                            min-width="80"
                        >
                            <template slot-scope="{row}" >
                                <el-button v-show="!row.edit && !row.modify" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(row,2)">删除</el-button>
                                <div v-show="row.edit" class="handleBtn">
                                    <el-button type="success" size="mini" @click="handleAddSave(2)">保存</el-button>
                                    <el-button type="warning" size="mini" @click="handleAddCancel(2)">取消</el-button>
                                </div>
                                <div v-show="row.modify" class="handleBtn">
                                    <el-button type="success" size="mini" @click="handleEditSave(row,2)">保存</el-button>
                                    <el-button type="warning" size="mini" @click="handleEditCancel(row,2)">取消</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="add_parAndDevice">
                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addParOrDevice(2)" :disabled="(devicenumlist[devicenumlist.length-1] && devicenumlist[devicenumlist.length-1].edit)">添加设备</el-button>
                         <div class="item deviceNum">
                            设备数：
                            <router-link :to="`/deviceManage/deviceList?phone=${dealphon}&areaname=${name}`">
                                <el-link type="primary">{{devicenum}}</el-link>
                            </router-link>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-card>
  </div>
</template>

<script>
import { editBindAreaPartner,bindAreaPartner,removeAreaPartner,editDeviceName,delAreaCode,addAreaCode } from '@/require/communManage'
import { messageTip,alertConfim } from '@/utils/ele'

export default {
    props: {
        partnerInfo: {
            type: Array,
            default: []
        },
        devicenumlist: {
            type: Array,
            default: []
        },
        aid: {
            type: [String,Number]
        },
        dealphon: {
            type: String
        },
        name: {
            type: String
        },
        devicenum: {
            type: Number,
            defaulte: 0
        },
    },
    data(){
        return {}
    },
    computed: {
        copyPartList(){
            console.log('com')
            return this.partnerInfo
        }
    },
    methods: {
        addParOrDevice(from){ //点击添加合伙人/设备
            let list= from === 1 ?  this.partnerInfo : this.devicenumlist
            let type= from === 1 ?  'partnerInfo' : 'devicenumlist'
            list.push({edit:true})
            if(from=== 2){ //当添加设备的时候，自动滚动到底部
                this.$nextTick(()=>{
                    const bodyWrapper= this.$refs.tableList.bodyWrapper
                    bodyWrapper.scrollTop =bodyWrapper.scrollHeight
                })
            }
        },
        handleAddSave(from){ //点击保存合伙人/设备
            if(from === 1){
                const lastRow= this.partnerInfo[this.partnerInfo.length-1]
                const { phone,_percent }= lastRow
                const reg= /^1[3456789]\d{9}$/
                if(!reg.test(phone)) return messageTip('warning','输入的手机号不正确')
                let  totalPercent= this.checkPrecent()
                if(totalPercent>=0 && totalPercent <=100){
                    let newPercent= isNaN(parseFloat(_percent)) ? 0 : parseFloat(_percent)/100
                    bindAreaPartner({aid: this.aid,type: 2,phone,percent: newPercent}).then(res=>{
                        if(res.code === 200){
                            messageTip('success','合伙人添加成功')
                            this.$set(this.partnerInfo,this.partnerInfo.length-1,res.partnerInfo[res.partnerInfo.length -1])
                        }else{
                            messageTip('warning',res.message)
                        }
                    }).catch(e=>{

                    })
                }else{
                    messageTip('warning','所有人合伙人的分成比之和应小于100%')
                }
            }else{
                const lastRow= this.devicenumlist[this.devicenumlist.length-1]
                addAreaCode({code: lastRow.code,aid: this.aid}).then(res=>{
                   if(res.code === 200){
                       messageTip('success','设备添加成功！')
                    this.$set(this.devicenumlist,this.devicenumlist.length-1,res.result.deviceinfo)
                    this.$emit('handleResetDeviceNum',this.devicenumlist.length)
                   }else{
                       messageTip('error',res.message)
                   }
                })
            }
        },
        handleAddCancel(from){ //点击取消保存合伙人/设备
            let list= from === 1 ?  this.partnerInfo : this.devicenumlist
            let type= from === 1 ?  'partnerInfo' : 'devicenumlist'
            list.splice(list.length-1,1)
        },
        handleEditRate(row,from){ //点击编辑合伙人分成 / remark
            if(from === 1){
                this.$set(row,'_percent',row.percent*100)
            }else{
                this.$set(row,'_remark',row.remark)
            }
            this.$set(row,'modify',true)
        },
        handleEditSave(row,from){ //保存合伙人分成 / 设备
            if(from === 1){
                let { _percent,id,aid }= row
                let  totalPercent= this.checkPrecent()
                if( totalPercent>=0 && totalPercent <=100){
                    editBindAreaPartner({percent:_percent/100,id,aid}).then(res=>{
                        if(res.code === 200){
                            this.$set(row,'percent',row._percent/100)
                            messageTip('success',res.message)
                        }else{
                            messageTip('error',res.message)
                        }
                    }).catch(e=>{
                    })
                    this.$set(row,'modify',false)
                }else{
                    messageTip('warning','所有人合伙人的分成比之和应小于100%')
                }
            }else{
                let remark= row._remark ? row._remark : ''
                editDeviceName({code: row.code,name: remark}).then(res=>{
                    if(res.code === 200){
                        messageTip('success','设备名修改成功')
                        this.$set(row,'remark',remark)
                    }else{
                        messageTip('error',res.message)
                    }
                })
                this.$set(row,'modify',false)
            }
        },
        handleEditCancel(row,from){ //取消修改合伙人分成
            //重新像后台获取 
            this.$set(row,'modify',false)
        },
        handleDelete(row,from){
            alertConfim(from ===1 ? '确认删除合伙人吗？' : '确认删除设备吗？',()=>{
                if(from === 1){
                    removeAreaPartner({aid: this.aid,id: row.id}).then(res=>{
                        if(res.code === 200){
                            messageTip('success','删除成功')
                            let index= this.partnerInfo.findIndex(item=> item.id=== row.id)
                            this.partnerInfo.splice(index,1)
                        }else{
                            messageTip('error','删除失败')
                        }
                    })
                }else{
                    delAreaCode({ merid: row.uid,aid: this.aid,code: row.code }).then(res=>{
                        if(res.code === 200){
                            messageTip('success','删除成功')
                            let index= this.devicenumlist.findIndex(item=> item.code=== row.code)
                            this.devicenumlist.splice(index,1)
                            this.$emit('handleResetDeviceNum',this.devicenumlist.length)
                        }else{
                            messageTip('error','删除失败')
                        }
                    })
                }
            })
        },
        checkPrecent(){
            return this.partnerInfo.reduce((acc,item,index)=>{
                let percent
                if(item.modify || item.edit){
                    percent= parseFloat(item._percent)
                }else{
                    percent= parseFloat(item.percent)*100
                }
                percent= isNaN(percent) ? 0 : percent
                return acc+percent
            },0)
        },
        
    }
};
</script>

<style lang="less">
.partnerAndDevice {
    .handleBtn {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .el-button{
            margin-left: 0;
        }
    }
    .col_right_p_10 {
        padding-right: 10px;
    }
    .col_left_p_10 {
        padding-left: 10px;
    }
    .add_parAndDevice {
        text-align: center;
        padding-top: 15px;
        button {
            min-width: 120px;
        }
        .deviceNum {
            float: right;
            font-size: 14px;
        }
    }
}

</style>