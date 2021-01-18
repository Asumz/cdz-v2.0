<template>
    <div class="templateV3">
         <el-card :class="['box-card','temTableTitle', (from==3 && item.pitchon==1) ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="item.id">
            <el-table
                :data="[{}]"
                border
                fit
                style="width: 100%"
                :show-header="false"
                :cell-style="{'background-color': 'rgba(0,211,255,0.06)', 'font-size': '13px',color: '#666'}"
            >
            <el-table-column>
                <template slot-scope="scope">
                    <div class="tem_p">
                        <div class="tem_parent clearfix" style="width: calc(100% - 200px); min-width: 590px;float: left;">
                            <div class="clearfix">
                                <div class="temContent" style="width: 49%; float: left; min-width: 295px;">
                                    <div>
                                        <strong>模板名称: </strong>
                                        <el-input v-if="editId === item.id" size="mini" v-model="temForm.name" style="width: 70%; display: inline-block" placeholder="请输入模板名称"></el-input>
                                        <span v-else class="top_span">{{item.name}}</span>
                                    </div>
                                    <div style="margin-top: 15px">
                                        <strong>是否支持支付宝充电:  </strong>
                                        <span v-if="editId !== item.id" :class="['top_span', item.ifalipay ==1 ? 'green' : 'red']">{{item.ifalipay ==1 ? '是' : '否'}}</span>
                                        <el-radio-group v-model="temForm.ifalipay"  v-else >
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="2">否</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="temContent" style="width: 49%; float: left; min-width: 295px;">
                                    <div>
                                        <strong>售后电话:</strong>
                                        <el-input v-if="editId === item.id" size="mini" v-model="temForm.common1" style="width: 60%; display: inline-block" placeholder="请输入售后电话"></el-input>
                                        <span v-else class="top_span">{{item.common1}}</span>
                                    </div>
                                    <div style="margin-top: 15px">
                                        <strong>刷卡最大充电时间:</strong>
                                        <el-input-number 
                                            v-if="editId === item.id"
                                            size="mini" v-model="temForm.rank" 
                                            style="width: 50%; display: inline-block" 
                                            :step="10"
                                            :min="0"
                                            :precision="0"
                                            placeholder="请输入最大充电时间"
                                        ></el-input-number>
                                        <span v-else class="top_span">{{item.rank}}</span>
                                        分钟
                                    </div> 
                                </div>
                            </div>
                           <div class="tem_text" style="margin-top: 15px">
                                <strong>收费说明:</strong>
                                <div v-if="editId === item.id">
                                    <div style="width: calc(100% - 200px); float: left;" >
                                        <el-input
                                            type="textarea"
                                            :rows="4"
                                            placeholder="请输入收费说明"
                                            v-model="temForm.chargeInfo">
                                        </el-input>
                                    </div>
                                </div>
                                <span v-else>{{item.chargeInfo}}</span>
                           </div>
                        </div>
                        <div style="width: 180px; float: right; min-width: 180px;" v-if="from !== 4">
                            <div>
                                <strong>操作</strong>
                            </div>
                            <div style="margin-top: 15px" v-if="editId !== item.id">
                                <el-button 
                                    type="primary" 
                                    size="mini" 
                                    icon="el-icon-edit" 
                                    @click="handleEdit(item)"
                                    :disabled="(from ==2 && item.merchantid == 0) || (from != 1  && item.merchantid == 0)"
                                >编辑</el-button>
                                <el-button 
                                    type="danger" 
                                    size="mini" 
                                    icon="el-icon-delete"
                                    :plain="from === 1"
                                    :disabled="from === 1 || from === 2 || item.pitchon === 1 || (from != 1  && item.merchantid == 0)"
                                    @click="handleDeleteTem(item,i)"
                                >删除</el-button>
                            </div>
                            <div style="margin-top: 15px" v-else>
                                <el-button type="success" size="mini" icon="el-icon-folder-checked" @click="handleSave(i)" >保存</el-button>
                                <el-button type="warning" size="mini" icon="el-icon-folder-delete" @click="handleCancel(item)" >取消</el-button>
                            </div> 
                        </div>
                    </div>
                </template>
            </el-table-column>
                <!-- <el-table-column
                    min-width="260"
                >
                    <template slot-scope="scope">
                       
                    </template>
                </el-table-column>
                 <el-table-column
                    min-width="260"
                >
                     <template slot-scope="scope">
                        <div>
                            <strong>品牌名称:  </strong>
                            <el-input v-if="editId === item.id" size="mini" v-model="temForm.remark" style="width: 70%; display: inline-block" placeholder="请输入品牌名称"></el-input>
                            <span v-else class="top_span">{{item.remark}}</span>
                        </div>
                        <div style="margin-top: 15px">&nbsp;</div> 
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="200"
                >
                    <template slot-scope="scope">
                        <div>
                            <strong>售后电话:</strong>
                            <el-input v-if="editId === item.id" size="mini" v-model="temForm.common1" style="width: 60%; display: inline-block" placeholder="请输入售后电话"></el-input>
                            <span v-else class="top_span">{{item.common1}}</span>
                        </div>
                        <div style="margin-top: 15px">&nbsp;
                        </div> 
                    </template>
                </el-table-column>
                <el-table-column
                    prop="communName"
                    label="小区名称"
                    width="200"
                    v-if="from !== 4"
                >
                    <template slot-scope="scope">
                        <div>
                            <strong>操作</strong>
                        </div>
                        <div style="margin-top: 15px" v-if="editId !== item.id">
                            <el-button 
                                type="primary" 
                                size="mini" 
                                icon="el-icon-edit" 
                                @click="handleEdit(item)"
                                :disabled="from ==2 && item.merchantid == 0 "
                            >编辑</el-button>
                            <el-button 
                                type="danger" 
                                size="mini" 
                                icon="el-icon-delete"
                                :plain="from === 1"
                                :disabled="from === 1 || from === 2 || item.pitchon === 1"
                                 @click="handleDeleteTem(item,i)"
                            >删除</el-button>
                        </div>
                        <div style="margin-top: 15px" v-else>
                            <el-button type="success" size="mini" icon="el-icon-folder-checked" @click="handleSave(i)" >保存</el-button>
                            <el-button type="warning" size="mini" icon="el-icon-folder-delete" @click="handleCancel(item)" >取消</el-button>
                        </div> 
                    </template>
                </el-table-column> -->
            </el-table>
            <el-row>
                <el-col :span="8">
                    <el-table
                        :data="item.gather1"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'rgba(245, 247, 250, 0.49)',color:'#666','font-size': '13px'}"
                        :cell-style="{'font-size': '13px',color: '#666'}"
                    >
                        <el-table-column
                            prop="province"
                            label="收费标准"
                            width="120"
                            label-class-name="chargeType"
                        >
                            <el-table-column
                                prop="money"
                                label="每小时收费"
                                :min-width="screenWidth <= 1400 ? 90 : 150"
                            >
                                <template slot-scope="scope">
                                    <div v-if="editId === item.id"> 
                                        <el-input-number 
                                            size="mini" 
                                            v-model="temForm.gather1[scope.$index].money" 
                                            style="width: 80%;margin-right: 10px;" 
                                            placeholder="请输入每小时收费金额"
                                            :step="1"
                                            :precision="2"
                                            :min="0"
                                        ></el-input-number>元</div>
                                    <span v-else> {{scope.row.money}}元</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="power"
                                label="功率区间"
                                :min-width="screenWidth <= 1400 ? (editId !== item.id ? 140 : 110) : (editId !== item.id ? 190 : 150)"
                            >
                                <template slot-scope="scope">
                                    <div v-if="editId === item.id"> 
                                        <el-input
                                            size="mini" 
                                            v-model="temForm.gather1[scope.$index].common1" 
                                            style="min-width: 58px; width: 30%;" 
                                            placeholder="请输入起始功率"
                                        ></el-input>
                                        ~
                                        <el-input
                                            size="mini" 
                                            v-model="temForm.gather1[scope.$index].common2" 
                                            style="min-width: 58px; width: 30%;margin-right: 10px;" 
                                            placeholder="请输入结束功率"
                                        ></el-input>W
                                    </div>
                                    <span v-else> {{scope.row.common1}}W ~ {{scope.row.common2}}W</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handle"
                                label="操作"
                                :min-width="from === 4 ? ((screenWidth < 1400) ? 35: 90) : 90"
                                v-if="from === 4 || (from !==4 && editId !== item.id)"
                            >
                                <template slot-scope="scope">
                                    <el-button 
                                        type="danger" 
                                        size="mini" 
                                        @click="handleDeleteItem(item,i,'gather1',scope.row.id)" 
                                        :disabled="(from ==2 && item.merchantid == 0) || (from != 1  && item.merchantid == 0)"
                                    > <i class="el-icon-delete"></i> {{ (from === 4 && (screenWidth < 1400)) ?  '' : '删除'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table-column>    
                    </el-table>
                    <div class="addItem">
                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddItem(item,'gather1')" :disabled="(from != 1  && item.merchantid == 0)" >添加</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-table
                        :data="item.gather2"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'rgba(245, 247, 250, 0.49)',color:'#666','font-size': '13px'}"
                        :cell-style="{'font-size': '13px',color: '#666'}"
                    >
                        <el-table-column
                            prop="province"
                            label="按照时间充电"
                            width="120"
                            label-class-name="chargeType"
                        >
                            <el-table-column
                                prop="name"
                                label="显示名称"
                                :min-width="screenWidth <= 1400 ? 100 : 120"
                            >
                                <template slot-scope="scope">
                                    <div v-if="editId === item.id"> 
                                        <el-input 
                                            size="mini" 
                                            v-model="temForm.gather2[scope.$index].name" 
                                            style="width: 85%;margin-right: 10px;" 
                                            placeholder="请输入显示名称"
                                        ></el-input></div>
                                    <span v-else> {{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="chargeTime"
                                label="充电时间"
                                :min-width="screenWidth <= 1400 ? 120 : 170"
                            >
                                <template slot-scope="scope">
                                    <div v-if="editId === item.id"> 
                                        <el-input-number 
                                            size="mini"
                                            :step="10"
                                            :min="0"
                                            :precision="0"
                                            v-model="temForm.gather2[scope.$index].chargeTime" 
                                            style="width: 75%;margin-right: 10px;" 
                                            placeholder="请输入充电时间"
                                        ></el-input-number>分钟
                                    </div>
                                    <span v-else> {{scope.row.chargeTime}}分钟</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handle"
                                label="操作"
                                :min-width="from === 4 ? ((screenWidth < 1400) ? 40: 90) : 90"
                                v-if="from === 4 || (from !==4 && editId !== item.id)"
                            >
                                <template slot-scope="scope">
                                    <el-button 
                                        type="danger" 
                                        size="mini"
                                        @click="handleDeleteItem(item,i,'gather2',scope.row.id)" 
                                        :disabled="(from ==2 && item.merchantid == 0) || (from != 1  && item.merchantid == 0)"
                                    ><i class="el-icon-delete"></i> {{ (from === 4 && (screenWidth < 1400)) ?  '' : '删除'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table-column>    
                    </el-table>
                    <div class="addItem">
                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddItem(item,'gather2')" :disabled="(from != 1  && item.merchantid == 0)">添加</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="v3MaskWrapper">
                        <div class="v3Mask" v-show="editId === item.id ? (temForm.walletpay === 1 ? false : true) : (item.walletpay === 1 ? false : true)">
                            暂未开启临时充电
                        </div>
                        <div class="v3Child3header">
                        <el-row>
                            <el-col :span="8">
                                    <strong>是否支持临时充电:  </strong>
                                    <div>
                                        <el-radio-group v-model="temForm.walletpay" v-if="editId === item.id">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="2">否</el-radio>
                                        </el-radio-group>
                                        <span v-else :class="[item.walletpay === 1  ? 'green': 'red']">{{item.walletpay === 1 ? '是': '否'}}</span>
                                    </div>
                            </el-col>
                            <el-col :span="8">按照金额充电 <br/>（临时充电）</el-col>
                            <el-col :span="8">
                                    <strong>是否支持退费:  </strong>
                                    <div>
                                        <el-radio-group v-model="temForm.permit" v-if="editId === item.id">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="2">否</el-radio>
                                        </el-radio-group>
                                        <span v-else :class="[item.permit === 1  ? 'green': 'red']">{{item.permit === 1 ? '是': '否'}}</span>
                                    </div>
                            </el-col>
                        </el-row>
                        </div>
                        <el-table
                            :data="item.gather3"
                            border
                            fit
                            style="width: 100%"
                            :header-cell-style="{background:'rgba(245, 247, 250, 0.49)',color:'#666','font-size': '13px'}"
                            :cell-style="{'font-size': '13px',color: '#666'}"
                        >
                            <el-table-column
                                prop="name"
                                label="显示名称"
                                :min-width="screenWidth <= 1400 ? 100 : 120"
                            >
                                <template slot-scope="scope">
                                    <div v-if="editId === item.id"> 
                                        <el-input 
                                            size="mini" 
                                            v-model="temForm.gather3[scope.$index].name" 
                                            style="width: 85%;margin-right: 10px;" 
                                            placeholder="请输入显示名称"
                                        ></el-input></div>
                                    <span v-else> {{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="money"
                                label="付款金额"
                                :min-width="screenWidth <= 1400 ? 120 : 170"
                            >
                                <template slot-scope="scope">
                                    <div v-if="editId === item.id"> 
                                        <el-input-number 
                                            size="mini"
                                            :step="1"
                                            :min="0"
                                            :precision="1" 
                                            v-model="temForm.gather3[scope.$index].money" 
                                            style="width: 75%;margin-right: 10px;" 
                                            placeholder="请输入付款金额"
                                        ></el-input-number>元
                                    </div>
                                    <span v-else> {{scope.row.money}}元</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handle"
                                label="操作"
                                :min-width="from === 4 ? ((screenWidth < 1400) ? 40: 90) : 90"
                                v-if="from === 4 || (from !==4 && editId !== item.id)"
                            >
                                <template slot-scope="scope">
                                    <el-button 
                                        type="danger" 
                                        size="mini" 
                                        @click="handleDeleteItem(item,i,'gather3',scope.row.id)"  
                                        v-if="!scope.row.edit"
                                        :disabled="(from ==2 && item.merchantid == 0) || (from != 1  && item.merchantid == 0)"
                                    ><i class="el-icon-delete"></i> {{(from === 4 && (screenWidth < 1400)) ?  '' : '删除'}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="addItem">
                            <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddItem(item,'gather3')" :disabled="(from != 1  && item.merchantid == 0)">添加</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="bottomMenu" v-if="from === 2">
                <router-link :to="`/deviceManage/deviceList/templateDetail?hw=08&code=${deviceInfo.code}&merid=${deviceInfo.merid}`">
                    <el-button type="primary" style="width: 160px;" icon="el-icon-view" size="mini">查看更多</el-button>
                </router-link>
               <!-- <el-button type="primary" style="width: 160px;" size="mini">此模板复用更多设备</el-button> -->
               <TemMulDevice :deviceInfo="deviceInfo" :tempid="item.id" />
            </div>
            <div class="bottomMenu" v-if="from === 3">
                <el-button type="success" style="width: 200px;" icon="el-icon-check" size="mini" :plain="item.pitchon !== 1" @click="handleSelectTem(item)">{{item.pitchon === 1 ? '已选中此模板' : '选中此模板'}}</el-button>
            </div>
         </el-card>
    </div>
</template>

<script>
import { alertConfim,messageTip } from '@/utils/ele'
import { deleteTemplateChild,addTemplateChild,changeV3ChargeTem,setSelectTem,handleDeleteTem,deleteTem,selectV3ChargeTem } from '@/require/template'
import TemMulDevice from '@/components/common/TemMulDevice'
export default {
    data(){
        return{
            temForm: {},//存放编辑主模板的容器
            isEditingTem: false, //是都正在编辑
            editId: 0, //正在编辑
            screenWidth: 0
        }
    },
    props: ['from','list','deviceInfo','getFrom','deviceNum'],
    computed: {
        arr(){
            if(this.from === 4){
                return [this.temForm]
            }else{
                 return this.list
            } 
        }
    },
    components:{
        TemMulDevice
    },
    created(){
        this.editId= this.from === 4 ? -1 : 0 //当添加模板时，editId设置为-1，否则默认为0
        this.temForm= this.from === 4 ? JSON.parse(JSON.stringify(this.list[0])) : {}
        this.screenWidth= document.documentElement.offsetWidth || document.body.offsetWidth
    },
    watch: {
        getFrom(newVal){
            if(newVal){
                this.$emit('getDataFromTem',this.temForm)
            }
        }
    },
    methods: {
        handleEdit(item){ //点击编辑模板
            this.temForm = JSON.parse(JSON.stringify(item))
            this.editId= item.id
        },
        handleSave(index){ //点击保存按钮
            changeV3ChargeTem({paratem: JSON.stringify(this.temForm)}).then(res=>{
                if(res.code === 200){
                    this.$emit('handleReLoad',()=>{
                        messageTip('success','模板编辑成功！')
                        this.editId= 0
                    }) 
                }else{
                    messageTip('error','模板编辑失败！')
                    this.editId= 0
                }
            })
        },
        handleCancel(item){ //点击取消保存
            this.temForm = JSON.parse(JSON.stringify(item))
            this.editId= 0
        }, 
        handleAddItem(item,from){
            let newItem
            let isUpdateChargeInfo //是都更新充电信息，1 更新， 否则不更新
            let chargeInfo= ''
            if(from === 'gather1'){
                if(item['gather1'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather1'][item['gather1'].length-1]
                    let rate1= parseFloat(lastItem.common2)-parseFloat(lastItem.common1) //这个是获取功率间隔
                    let newPowerEnd= parseFloat(lastItem.common2)+rate1
                    let rate2= lastItem.money/parseFloat(lastItem.common2) //这个是1W多少钱
                    let newMoney= rate1*rate2+lastItem.money//这个新收费钱数
                    newItem= { name: new Date().getTime(), money:newMoney,common1: lastItem.common2,common2: newPowerEnd ,type: 1 }
                }else{ //使用默默人的
                    newItem= {  name: new Date().getTime(), money:1,common1: 0,common2: 200 ,type: 1}
                }
                let newGather1= JSON.parse(JSON.stringify(item.gather1))
                newGather1.push(newItem)
                chargeInfo= newGather1.reduce((acc,item,index)=>{
                   return acc+= `${item.money}元/小时，功率区间：${item.common1}-${item.common2}瓦\n`
                },'').trim()
                isUpdateChargeInfo= 1
                
            }else if(from === 'gather2'){
                if(item['gather2'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather2'][item['gather2'].length-1]
                    let newChargeTime= lastItem.chargeTime+60
                    let newName= `${newChargeTime/60}小时`
                    newItem= { name: newName, chargeTime: newChargeTime,type: 2 }
                    console.log(newItem)
                }else{ //使用默默人的
                    newItem= newItem= { name: '1小时', chargeTime: 60,type: 2 }
                }  
            }else if(from === 'gather3'){
                if(item['gather3'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather3'][item['gather3'].length-1]
                    let newMoney= lastItem.money+1
                    let newName= newMoney+'元'
                    newItem= { name: newName, money: newMoney,type: 3 }
                    console.log(newItem)
                }else{ //使用默默人的
                    newItem= newItem= { name: '1元', money: 1,type: 3 }
                }  
            }
            if(this.from === 4){
                let gatherCopy= JSON.parse(JSON.stringify(this.temForm[from]))
                gatherCopy.push({id: new Date().getTime(),...newItem,chargeInfo})
                this.$set(this.temForm,from,gatherCopy)
                 if(from === 'gather1'){
                     this.$set(this.temForm,'chargeInfo',chargeInfo)
                 }
            }else{
                addTemplateChild({...newItem,tempid: item.id,isUpdateChargeInfo,chargeInfo}).then(res=>{
                    if(res.code === 200){
                        let itemCopy= JSON.parse(JSON.stringify(item))
                        itemCopy[from].push(res.tempson)
                        this.temForm= itemCopy
                        this.$set(item,from,itemCopy[from])
                        if(from === 'gather1'){
                             this.$set(item,'chargeInfo',chargeInfo)
                             this.$set(this.temForm,'chargeInfo',chargeInfo)

                        }
                        messageTip('success','子模板添加成功！')
                    }else{
                        messageTip('error','子模板添加失败！')
                    }
                })
            }
        },
        /**
         * @param item 父元素对象
         * @param index 父元素索引
         * @param from 是哪个子元素gather1，gather2，gather3
         * @param cid 子元素id
         */
        handleDeleteItem(item,index,from,cid){
            let chargeInfo= ''
            let isUpdateChargeInfo
             if(from === 'gather1'){
                chargeInfo= item[from].reduce((acc,item,i)=>{
                    if(item.id === cid){
                        return acc
                    }else{
                        return acc+= `${item.money}元/小时，功率区间：${item.common1}-${item.common2}瓦\n`
                    }
                },'')
                isUpdateChargeInfo= 1
            }
            alertConfim('确认删除子模板吗？',()=>{
                if(this.from === 4){
                    let itemCopy= JSON.parse(JSON.stringify(item))
                    let newGather= itemCopy[from].filter((val)=> val.id !== cid )
                    // 深度设置值的，需要使用vue实例提供的方法来修改 this.$set || Vue.set
                    this.$set(this.arr[index],from,newGather)
                    if(from === 'gather1'){
                        this.$set(this.arr[index],'chargeInfo',chargeInfo)
                    }
                    return
                }
                
                deleteTemplateChild({id:cid,chargeInfo,isUpdateChargeInfo,tempid: item.id}).then(res=>{
                    if(res.code === 200){
                        let itemCopy= JSON.parse(JSON.stringify(item))
                        let newGather= itemCopy[from].filter((val)=> val.id !== cid )
                        // 深度设置值的，需要使用vue实例提供的方法来修改 this.$set || Vue.set
                        this.$set(this.arr[index],from,newGather)
                        if(from === 'gather1'){
                            this.$set(this.arr[index],'chargeInfo',chargeInfo)
                        }
                        messageTip('success','子模板删除成功！')
                    }else{
                        messageTip('error','子模板删除失败！')
                    }
                })
                
            })
        },
        handleSelectTem(item){ //选中模板
            let temid= item.id
            selectV3ChargeTem({temid: temid,source: 1,devicenum: this.deviceNum}).then(res=>{
                if(res.code == 200){
                    for (const iterator of this.arr) {
                        if(iterator.id == item.id){
                            iterator.pitchon= 1
                        }else{
                            iterator.pitchon= undefined
                        }
                    }
                    messageTip('success','选中成功（注： 选中成功会自动至于第一位）')
                }else{
                    messageTip('warning','选中失败')
                }
           }).catch(err=>{})
        },
        handleDeleteTem(item,i){
             alertConfim('确认删除主模板吗？',()=>{
                deleteTem({id:item.id}).then(res=>{
                    if(res.code == 200){
                        this.arr.splice(i,1)
                        messageTip('success','删除成功')
                    }else{
                        messageTip('warning',res.message)
                    }
                }).catch(error=>{})
            }) 
        }
    }
}
</script>

<style lang="less">
.templateV3{
    .chargeType {
        text-align: center;
    }
    .addItem {
        text-align: center;
        border-left: 1px solid #EBEEF5;
        border-right: 1px solid #EBEEF5;
        border-bottom: 1px solid #EBEEF5;
        padding: 8px 0;
        button {
            width: 200px;
        }
    }
    .v3MaskWrapper {
        position: relative;
        .v3Mask {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 50px;
            bottom: 1px;
            background: rgba(255,255,255,.8);
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #409eff;
            font-weight: bold;
        }
        .v3Child3header {
            height: 48px;
            padding: 12px 0;
            box-sizing: border-box;
            background: rgba(245, 247, 250, 0.49);
            color: rgb(102, 102, 102);
            font-size: 13px;
            border: 1px solid #EBEEF5;
            border-bottom: none;
            .el-col {
                text-align: center;
                &:nth-child(2){
                    font-weight: bold;
                }
                strong {
                    display: inline-block;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: -3px;
                }
            }
        }
    }
    .green {
        color: #6BD089;
    }
    .red {
        color: #F47378;
    }
    .bottomMenu {
        display: flex; 
        justify-content: space-around; 
        padding-top: 20px; 
        border-top: 1px solid #EBEEF5;
    }
    .tem_text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>