<template>
    <div class="templateWallet">
        <el-card :class="['box-card','temTableTitle', (from==3 && item.pitchon==1) ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="i">
           <el-table
                :data="[{}]"
                border
                fit
                style="width: 100%"
                :show-header="false"
                :cell-style="{'background-color': 'rgba(0,211,255,0.06)', 'font-size': '13px',color: '#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="300"
                >
                <template slot-scope="scope">
                    <div>
                        <strong>模板名称: </strong>
                        <span v-if="!item.edit" class="top_span">{{item.name}}</span>
                        <el-input v-else size="mini" v-model="temForm.name" style="width: 70%; display: inline-block" placeholder="请输入模板名称"></el-input>
                    </div>
                    <div style="margin-top: 15px">&nbsp;</div> 
                </template>
                </el-table-column>

                <el-table-column
                prop="communName"
                label="小区名称"
                min-width="300"
                >   
                 <template slot-scope="scope">
                    <div>
                        <strong>品牌名称:  </strong>
                        <span v-if="!item.edit" class="top_span">{{item.remark}}</span>
                        <el-input v-else size="mini" v-model="temForm.remark" style="width: 70%; display: inline-block" placeholder="请输入品牌名称"></el-input>
                    </div>
                    <div style="margin-top: 15px">&nbsp;</div> 
                </template>
                </el-table-column>
                <el-table-column
                prop="communName"
                label="小区名称"
                min-width="300"
                >
                  <template slot-scope="scope">
                    <div>
                        <strong>售后电话:</strong>
                        <span v-if="!item.edit" class="top_span">{{item.common1}}</span>
                        <el-input v-else size="mini" v-model="temForm.common1" style="width: 70%; display: inline-block" placeholder="请输入售后电话"></el-input>
                    </div>
                    <div style="margin-top: 15px">&nbsp;
                    </div> 
                </template>
                </el-table-column>
                <el-table-column
                prop="communName"
                label="小区名称"
                width="200"
                >
                  <template slot-scope="scope">
                    <div>
                        <strong>操作</strong>
                    </div>
                    <div style="margin-top: 15px">
                        <el-button type="primary" size="mini" @click="handleEditTem(item)" v-if="!item.edit"  icon="el-icon-edit">编辑</el-button>
                        <el-button type="danger" size="mini"  @click="handleDeleteTem(item,i)" v-if="!item.edit" 
                        :disabled="from == 1 || from == 2 || (from==3 && item.pitchon ==1) " 
                        :plain="from == 1 || from == 2 || (from==3 && item.pitchon ==1)"
                        icon="el-icon-delete"
                        >删除</el-button>
                        <el-button type="success" size="mini" @click="handleSaveEditTem(item)" v-if="item.edit" icon="el-icon-folder-checked">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCancelDeleteTem(item)"  v-if="item.edit" icon="el-icon-folder-delete">取消</el-button>
                    </div> 
                </template>
                </el-table-column>
           </el-table>
            <el-table
            :data="item.gather"
            border
            fit
            style="width: 100%"
            :header-cell-style="{background:'#f5f7fa',color:'#666','font-size': '13px'}"
            :cell-style="{'font-size': '13px',color: '#666'}"
            >
            <el-table-column
            prop="name"
            label="显示名称"
            min-width="150"
            >
             <template slot-scope="scope">
               <div v-if="scope.row.edit"> <el-input size="mini" v-model="childTemForm.name" style="width: 85%;margin-right: 10px;" placeholder="请输入显示名称"></el-input></div>
                <span v-else> {{scope.row.name}}</span>
            </template>
            </el-table-column>
             <el-table-column
            prop="money"
            label="付款金额"
            min-width="200"
            >
            <template slot-scope="scope">
                <div v-if="scope.row.edit"> <el-input-number size="mini" :precision="1" v-model="childTemForm.money" style="width: 85%;margin-right: 10px;" placeholder="请输入付款金额"></el-input-number>元</div>
                <span v-else> {{scope.row.money}}元</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="remark"
            label="到账金额"
            min-width="200"
            >
            <template slot-scope="scope">
               <div v-if="scope.row.edit"> <el-input-number size="mini" :precision="1" v-model="childTemForm.remark" style="width: 85%;margin-right: 10px;" placeholder="请输入到账金额"></el-input-number>元</div>
                <span v-else> {{scope.row.remark}}元</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="handle"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditChildTem(item.id,scope.row.id,scope.row)" v-if="!scope.row.edit"  icon="el-icon-edit">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDeleteChildTem(item.id,scope.row.id)"  v-if="!scope.row.edit" :disabled="item.pitchon ==1 || from== 2" :plain="item.pitchon ==1 || from== 2" icon="el-icon-delete">删除</el-button>
                <el-button type="success" size="mini" @click="handleSaveEditChildTem(scope.row.id,scope.row)" v-if="scope.row.edit" icon="el-icon-folder-checked">保存</el-button>
                <el-button type="warning" size="mini" @click="handleCancelDeleteChildTem(item.id,scope.row.id,scope.row)"  v-if="scope.row.edit" icon="el-icon-folder-delete">取消</el-button>
            </template>
            </el-table-column>
            </el-table>
            <div style="margin-top: 20px; text-align: center" class="clearfix"  v-if="from==1">
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.id)" icon="el-icon-plus">添加模板</el-button>
            </div>
            <div style="margin-top: 20px; text-align: center;display:flex; justify-content: space-around;" class="clearfix"  v-else-if="from==2">
                <el-button type="primary" size="mini" @click="$router.push({path: '/communManage/communManageCon/tempdetail',query: {aid,merid,type:1,tempid: item.id}})" icon="el-icon-view">查看更多</el-button>
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.id)" icon="el-icon-plus">添加模板</el-button>
            </div>
            <div style="margin-top: 20px;" class="clearfix bottomContral" v-else>
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.id)" icon="el-icon-plus">添加模板</el-button>
                <el-link type="success" :underline="false" v-if="item.pitchon ==1"> 默认模板</el-link>
                <el-link type="success" :underline="false" v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
                <el-button type="primary" size="mini" v-if="item.pitchon !=1" @click="handleSetDefault(item)" icon="el-icon-check">设为默认</el-button>
                <el-button type="primary" size="mini" icon="el-icon-check" v-if="item.pitchon ==1"  disabled plain >设为默认</el-button>
            </div>
             
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import {alertConfim,messageTip} from '@/utils/ele'
import TemMulDevice from '@/components/common/TemMulDevice'
import { addTemplateChild,deleteTemplateChild,editTemplateChild,updateTemplate,deletestairwallet,areaTempChoose} from '@/require/template'
export default {
    data(){
        return {
            //from: 2, //1是系统模板，2设备详情的模板，3模板详情里
            isEditingTem: false,//是否已存在正在编辑的主模板
            isEditingChildTem: false, //是否已存在正在编辑的子模板
            temForm: {},//存放编辑主模板的容器
            childTemForm: {}, //存放编辑子模板的容器
            options: [{
                            value: '1',
                            label: '是',
                            children: [{
                                    value: '1',
                                    label: '时间和电量最小',
                                },
                                {
                                    value: '2',
                                    label: '时间最小',
                                },
                                {
                                    value: '3',
                                    label: '电量最小',
                                }]
                        },
                        {
                            value: '2',
                            label: '否'
                        }],
                        // arr: this.list
            
        }
    },
    components:{
        TemMulDevice
    },
    props: ['from','list','aid','merid'],
    computed: {
        arr(){
            return this.list
        }
    },
    methods: {
        // 删除子模板
       handleDeleteChildTem(id,temChildId){  //主模板id,子模板id
        //发送请求，成功之后删除子模板
        alertConfim('确认删除子模板吗？',()=>{
             deleteTemplateChild({id: temChildId}).then(res=>{
                 if(res.code== 200){
                      this.arr.filter((item,i)=>{
                        let newgather
                        if(item.id == id){
                            newgather= item.gather.filter((jtem,j)=>{
                                return jtem.id != temChildId
                            })
                        item.gather= newgather
                        }
                        return item
                    })
                    messageTip('success','删除成功') //删除成功提示信息
                 }else{
                     messageTip('warning',res.message)
                 }
             })
        })
       },
        // 添加子模板
       handleAddChildTem(id){ //主模板id
        //发送请求，成功之后添加子模板
        this.arr.filter((item,i)=>{
            let childTemData= {   
                                name: '30元送1元',
                                money:30,
                                remark: 31,
                                }
            if(item.gather.length > 0){
                let childTemLastData= item.gather[item.gather.length-1] //点击的最后一个子元素
                let rate= childTemLastData.money / childTemLastData.remark //利率是1元几个币
                let nextMoney= childTemLastData.money*2 
                let nextRemark= childTemLastData.remark*2
                let sendParse= nextRemark- nextMoney
                let nextName
                if(sendParse == 0){
                    nextName= nextMoney+'元'
                }else{
                    nextName= nextMoney+'元送'+sendParse+'元'
                }
                
                childTemData= {
                    name: nextName,
                    money: nextMoney,
                    remark: nextRemark
                }
            }
              // 发送请求，添加子模板
            addTemplateChild({tempid: id,...childTemData}).then(res=>{
                console.log(res)
                if(res.code == 200){
                    if(item.id == id){ //找到对应的主模板
                        let {id,money,remark,name} = res.tempson
                        item.gather.push({id,money,remark,name})
                    }
                    messageTip('success','添加成功')
                }else{
                    messageTip('warning',res.message)
                }
            }).catch(error=>{})
        })
       },
       //编辑子模板
       handleEditChildTem(id,temChildId,row){
           if(this.isEditingChildTem){
               this.$message.warning('请先保存或取消其他的编辑操作！')
               return 
           }
            let {name,money,remark}= row
            this.childTemForm= {name,money,remark}
            Vue.set(row,'edit',true)
            this.isEditingChildTem= true
       },
       //提交编辑的子模板
       handleSaveEditChildTem(temChildId,row){
           //校验，发送请求
           let {name,money,remark}= this.childTemForm
            editTemplateChild({id: temChildId,name,money,remark}).then(res=>{
                if(res.code == 200){
                    row.name= name
                    row.money= money
                    row.remark= remark
                    Vue.set(row,'edit',false)
                    this.isEditingChildTem= false
                    messageTip('success','子模板修改成功')
                }else{
                    messageTip('warning',res.message)
                }
            })
       },
       //取消编辑的子模板
       handleCancelDeleteChildTem(id,temChildId,row){
           this.childTemForm= {}
           Vue.set(row,'edit',false)
           this.isEditingChildTem= false
       },
     //删除主模板   
      handleDeleteTem(item,i){
        //   发送请求，成功之后删除模板
        alertConfim('确认删除主模板吗？',function(){
            deletestairwallet({id: item.id}).then(res=>{
                if(res.code === 200){
                    this.arr.splice(i,1)
                    messageTip('success','主模板删除成功') //删除成功提示信息
                }else{
                    messageTip('error',res.message) //删除成功提示信息
                }
            })
            
        }.bind(this))
        
      },
       //点击编辑主模板
       handleEditTem(item){ //主模板对象
        if(this.isEditingTem){
            this.$message.warning('请先保存或取消其他的编辑操作！')
            return 
        }
        let {name,remark,common1,permit,walletpay,common2} = item
        if(common2== '' || typeof common2 == 'undefined'){
            permit=[permit.toString()]
        }else{
            permit=[permit.toString(),common2.toString()]
        }
        this.temForm= {name,remark,common1,walletpay,permit}
         Vue.set(item,'edit',true)
         this.isEditingTem= true
       },
       //保存编辑主模板
       handleSaveEditTem(item){
           //校验，发送请求
           let{name,remark,common1}= this.temForm
            updateTemplate({id: item.id,status: 3, name,remark,common1}).then(res=>{  //投币 status为3
               if(res.code === 200){
                     item.name=  this.temForm.name
                    item.remark=  this.temForm.remark
                    item.common1=  this.temForm.common1
                    Vue.set(item,'edit',false)
                    this.isEditingTem= false
                    messageTip('success','主模板修改成功')
               }else{
                   messageTip('warning',res.message)
               }
           }).catch(error=>{})
       },
        //取消编辑的主模板
       handleCancelDeleteTem(item){
           this.temForm= {}
           Vue.set(item,'edit',false)
           this.isEditingTem= false
       },
        // type=3的时候的设为默认
       handleSetDefault(item){
        //  发送请求，成功了执行下面的
        areaTempChoose({aid: this.aid,tempid: item.id,type: 1}).then(res=>{
            if(res.code === 200){
                this.arr.forEach((jtem,j)=>{
                    if(jtem.id == item.id){
                        // jtem.pitchon= 1
                        this.$set(jtem,'pitchon',1)
                    }else{
                        this.$set(jtem,'pitchon',undefined)
                    }
                })
                messageTip('success','选中成功')
            }else{
                messageTip('error','设置失败') 
            }
        })
       }   
    }
}
</script>

<style lang="less" scope>
    .bottomContral {
        display: flex;
        justify-content: space-around;
    }
</style>