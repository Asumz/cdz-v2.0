<template>
  <div class="alarmConfig">
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>报警系统</span>
            </div>
            <div>
                <el-row>
                    <el-col :xs="24" :sm="12">
                        <el-table 
                            :data="alarmData"
                            border
                        >
                            <el-table-column 
                                label="类型"
                                prop="name"
                                min-width="100"
                            ></el-table-column>
                            <el-table-column 
                                label="数值"
                                prop="value"
                                min-width="220"
                            >
                                <template slot-scope="{row}">
                                    <div v-if="row.name==='报警温度'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}℃</span>
                                            <div>
                                                <el-button type="primary" size="mini" @click="handleSet(row)">设置</el-button>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : ''" @click="getDeviceAlarmCallBack(row)" >获取</el-button>
                                            </div>
                                        </div>
                                        <div v-show="row.edit"  class="edit_item">
                                            <el-input size="mini" class="edit_input" v-model="alarmConfigFrom[row.type]"></el-input>℃
                                            <div>
                                                <el-button type="success" size="mini" @click="handleSave(row)">保存</el-button>
                                                <el-button type="warning" size="mini" @click="handleClose(row)">取消</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='烟感阈值'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}</span>
                                            <div>
                                                <el-button type="primary" size="mini" @click="handleSet(row)">设置</el-button>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : '' " @click="getDeviceAlarmCallBack(row)" >获取</el-button>
                                            </div>
                                        </div>
                                        <div v-show="row.edit"  class="edit_item">
                                            <el-input size="mini" class="edit_input" v-model="alarmConfigFrom[row.type]"></el-input>℃
                                            <div>
                                                <el-button type="success" size="mini" @click="handleSave(row)">保存</el-button>
                                                <el-button type="warning" size="mini" @click="handleClose(row)">取消</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='设备总功率'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}W</span>
                                            <div>
                                                <el-button type="primary" size="mini" @click="handleSet(row)">设置</el-button>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : ''" @click="getDeviceAlarmCallBack(row)" >获取</el-button>
                                            </div>
                                        </div>
                                        <div v-show="row.edit"  class="edit_item">
                                            <el-input size="mini" class="edit_input" v-model="alarmConfigFrom[row.type]"></el-input>W
                                            <div>
                                                <el-button type="success" size="mini" @click="handleSave(row)">保存</el-button>
                                                <el-button type="warning" size="mini" @click="handleClose(row)">取消</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='远程抄表'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}度</span>
                                            <div>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : ''"  @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :xs="24" :sm="12">
                        <el-table 
                            :data="alarmData1"
                            border
                        >
                            <el-table-column 
                                label="类型"
                                prop="name"
                                min-width="100"
                            ></el-table-column>
                            <el-table-column 
                                label="数值"
                                prop="value"
                                min-width="220"
                            >
                                <template slot-scope="{row}">
                                    <div v-if="row.name==='当前温度'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <el-link :underline="false" :type="warnGrad(row)">{{row.value}}℃</el-link>
                                            <div>
                                            <router-link :to="`/deviceManage/deviceList/temperhistory`">
                                                    <el-link type="primary" size="mini" style="margin-right: 10px;">历史温度</el-link>
                                                </router-link>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : ''" @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='当前烟感'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <el-link :underline="false" :type="warnGrad(row)">{{row.value}}</el-link>
                                            <div>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : ''"  @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='当前总功率'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <el-link :underline="false" :type="warnGrad(row)">{{row.value}}W</el-link>
                                            <div>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : ''"  @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </el-card>
  </div>
</template>

<script>
import { setDeviceAlarm,getNowDeviceAlarm,getDeviceSetAlarm } from '@/require/deviceManage'
import Utils from '@/utils/util'
let loading //loading实例
export default {
    props: {
        code: String
    },
    mounted(){
        console.log(Utils.Hd_Loading)
        loading= new Utils.Hd_Loading()
    },
    beforeDestroy(){ //关闭前销毁
        loading && loading.hide()
    },
    deactivated(){ //关闭前销毁 （keep-alive销毁回调）
        loading && loading.hide()
    },
    data(){
        return {
            warnGrad(row){
                let type= row.type
                let newType= type.split(/now/g)[1].toLowerCase()
                let index= this.alarmData.findIndex((item)=>item.type === newType)
                let setVal= this.alarmData[index].value
                let a= row.value - setVal
                if(setVal != '' && setVal != 0 && setVal != null){
                    let threshold= 0
                    switch(type){
                        case 'nowTemperature' :
                            threshold= 10
                            break
                        case  'nowSmoke' :
                            threshold= 20
                            break
                        case  'nowPower' :
                            threshold= 1000
                            break
                    }

                    if(a >= (0-threshold) && a < 0){
                        return 'warning'
                    }else if(a >= 0){
                        return 'danger'
                    }else{
                        return 'default' 
                    }
                }else{
                    return 'default'
                } 
            },
            alarmData: [
                {type: 'temperature', name:'报警温度', value: 62},
                {type: 'smoke', name:'烟感阈值', value: 56},
                {type: 'power', name:'设备总功率', value: '8000'},
                {type: 'read', name:'远程抄表', value: '123'},
            ],
            alarmData1: [
                {type: 'nowTemperature', name:'当前温度', value: 61},
                {type: 'nowSmoke', name:'当前烟感', value: 90},
                {type: 'nowPower', name:'当前总功率', value: 2},
            ],
            alarmConfigFrom: {temperature: 7899}
        }
    },
    methods:{
        handleSet(row){  //设置
           let newRow= {...row}
           this.alarmConfigFrom= {...this.alarmConfigFrom,[row.type]: row.value}
           this.$set(row,'edit',true) 
        },
        handleClose(row){ //取消
            this.$set(row,'edit',false) 
        },
        handleSave(row){ //保存
            loading.show()
            row.edit= false
            let newRow= JSON.parse(JSON.stringify(row))
            let value= this.alarmConfigFrom[newRow.type]
            const keyCode= {
                temperature: 1,
                smoke: 2,
                power: 3
            }
            let newtype= keyCode[newRow.type]
            setDeviceAlarm({
                type: newtype,
                value,
                code: this.code
            }).then(res=>{
                loading.hide()
                console.log(res)
            }).catch(e=>{
                loading.hide()
               console.log(e)
            })
        },
        getDeviceAlarmCallBack(row){ //获取设置的参数
            this.$set(row,'loading',true)
            loading.show()
            let newRow= JSON.parse(JSON.stringify(row))
            let value= this.alarmConfigFrom[newRow.type]
            const keyCode= {
                temperature: 1,
                smoke: 2,
                power: 3
            }
            let newtype= keyCode[newRow.type]
           
            getDeviceSetAlarm({
                type: newtype,
                code: this.code
            })
            .then(res=>{
                console.log(res)
                this.$set(row,'loading',false)
                loading.hide()
            })
            .catch(e=>{
                this.$set(row,'loading',false)
                loading.hide()
            })
        },
        getNowDeviceAlarmFn(row){
            this.$set(row,'loading',true)
            loading.show()
            let newRow= JSON.parse(JSON.stringify(row))
            let value= this.alarmConfigFrom[newRow.type]
            const keyCode= {
                nowTemperature: 1,
                nowSmoke: 2,
                nowPower: 3,
                read: 4
            }
            let newtype= keyCode[newRow.type]
            getNowDeviceAlarm({
                type: newtype,
                code: this.code
            })
            .then(res=>{
                console.log(res)
                this.$set(row,'loading',false)
                loading.hide()
            })
            .catch(e=>{
                this.$set(row,'loading',false)
                loading.hide()
            })
        }
    }
}
</script>

<style lang="less">
    .alarmConfig {
        .edit_item {
            display: flex;
            justify-content: space-between;
            .edit_input {
                width: 35%;
                min-width: 65px;
            }
        }
    } 
</style>