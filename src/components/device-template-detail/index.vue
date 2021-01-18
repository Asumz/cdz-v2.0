<template>
    <div class="templateDetail">
        <div class="topContent" ref="topContent">
            <span class="title">{{$route.query.hw == '03' ? '模拟投币模板' : $route.query.hw == '04' ? '离线卡模板': $route.query.hw == '08' ? 'V3充电模板': '充电模板'}}</span>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddTem">添加主模板</el-button>
        </div>
        <TemplateCharge :from="3" :list="temChargeList" v-if="$route.query.hw == '01' " :source="source" :arecode="arecode" /> <!--充电模板-->
        <TemplateCoin :from="3" :list="temCoinList" v-else-if="$route.query.hw == '03' " :source="source" :arecode="arecode" /> <!--脉冲模板-->
        <TemplateOffline :from="3" :list="temOfflineList" v-if="$route.query.hw == '04' "  :source="source" :arecode="arecode" /> <!--离线卡模板-->
        <GradeTemplate :from="3" :list="tempgather" v-if="$route.query.hw == '01' " :source="source" :arecode="arecode" />
        <TemplateV3   :from="3"  :list="temV3List" v-if="$route.query.hw == '08'" @handleReLoad="handleReLoad" :deviceNum="code"  ></TemplateV3>
        <el-dialog 
            :title="$route.query.hw == '03' ? '新增模拟投币模板' : $route.query.hw == '04' ? '新增离线卡模板' : $route.query.hw == '08' ? '新增V3充电模板': '新增充电模板'" 
            :visible.sync="visiblesHw01" 
            :width="$route.query.hw == '08' ? '95vw' : '450px'" 
            custom-class="dialog_form" 
            validate="handleSubmit1">
            <!-- 添加V3模板 -->
            <TemplateV3  v-if="visiblesHw01 && $route.query.hw == '08'"  :from="4"  :list="addV3Tem" :getFrom="getFrom" @getDataFromTem="getDataFromTem"></TemplateV3>
            <!-- 添加V3以外的模板 -->
            <el-form :model="hwForm" label-position="top" :rules="rule1" ref="hwForm1" v-if="visiblesHw01 && $route.query.hw != '08'">
                <el-form-item label="模板名称" label-width="120px" prop="name">
                    <el-input v-model="hwForm.name" autocomplete="off" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌名称" label-width="120px">
                    <el-input v-model="hwForm.remark" autocomplete="off" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="售后电话" label-width="120px">
                    <el-input v-model="hwForm.common1" autocomplete="off" placeholder="请输入售后电话"></el-input>
                </el-form-item>
                <el-form-item label="是否支持退费" label-width="150px" v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-cascader
                        v-model="hwForm.permitObj"
                        :options="[{
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
                        }]"
                        :props="{ expandTrigger: 'hover' }"
                        size="mini">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="是否钱包强制支付" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.walletpay">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否支持支付宝充电" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.ifalipay">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否创建分等级模板" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.grade" :disabled="tempgather.length > 0">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visiblesHw01 = false">取 消</el-button>
                <el-button type="primary" @click="()=>this.$route.query.hw === '08' ? this.handleSubmit08() : this.handleSubmit1() ">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TemplateCharge from '@/components/common/Template'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateCoin from '@/components/common/TemplateCoin'
import GradeTemplate from '@/components/common/GradeTemplate'
import TemplateV3 from '@/components/common/TemplateV3'
import Util from '@/utils/util'
import { getDeviceDetailTemInfo,addTemplate,changeV3ChargeTem } from '@/require/template'
import {messageTip} from '@/utils/ele'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            code: '',
            merid: '',
            hw: '01',
            source: 1,
            arecode:'',
            temChargeList: [], 
            tempgather: [], //分等级模板
            temCoinList: [ //模拟投币数据
            ],
            temV3List:[],
             temOfflineList: [ //离线卡数据
            ],
            topHeight: 0,//顶部框到顶部固定定位据顶部的距离
            visiblesHw01: false, //版本号为01的模板是否显示
            hwForm: {
                name: '',
                remark: '',
                common1: '',
                permitObj: ["1","1"],
                walletpay: 2,
                grade: 2,
                ifalipay: 1
            },//版本号为01的模板form表单容器
            rule1:{
                name: [{required: true,message: '模板名称不能为空', trigger: 'change'}]
            }, // 表单1的校验
            addV3Tem: [ //添加v3模板占位符
                {
                    id: -1,
                    name: '',
                    remark: '',
                    common1: '',
                    walletpay: 1,  //是否支持退费 1为支持，否则不支持
                    permit: 1, //是否临时充电开启 1为开启，否则不开启
                    ifalipay: 1,
                    rank: 720,
                    gather1: [
                        { id: -1, money: 1, common1: 0,common2: 200 }
                    ],
                    gather2: [
                        { id: -1, name: '1小时', chargeTime: 60 }
                    ],
                    gather3: [
                        { id: -1, name: '1元',money: 1 }
                    ],
                    chargeInfo: '每小时收费：1元， 功率区间：0-200瓦'
                }
            ],
            getFrom: false //父组件时候向子组件获取值
        }
    },
    components: {
        TemplateCharge,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate,
        TemplateV3
    },
    created(){
        let {code,merid,hw}= this.$route.query
        this.code= code
        this.merid= merid
        this.hw= hw
        // this.asyGetDeviceDetailTemInfo({devicenum: this.code,merid})
        this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid})
    },
    mounted(){
        // 获取topContent距顶部的距离，滚动让其定位，离开组件时销毁
        const mainElement= document.getElementsByClassName('main')[0]
        if(mainElement){
            this.topHeight= parseFloat(Util.getAttr(this.$refs.topContent,'top'))
            mainElement.addEventListener('scroll',this.handleTopTitle)
            // 组件销毁时移除滚动
            this.$once('hook:beforeDestroy',()=>{
                mainElement.removeEventListener('scroll',this.handleTopTitle)
            })
        }
    },
    computed: {
        ...mapState(['temDetail'])
    },
    watch: {
        temDetail(temListInfo,oldVal){
            if(temListInfo.code == 200){
                    this.source= temListInfo.source
                    this.arecode= temListInfo.arecode
                    if(this.hw == '03'){
                        // this.temChargeList= temListInfo.templatelist
                        this.temCoinList= temListInfo.templatelist
                    }else if(this.hw == '04'){
                        this.temOfflineList= temListInfo.templatelist
                    }else if(this.hw == '08'){
                       let newTemList= temListInfo.templatelist.map(val=>{
                            return {...val.gather, ...val }
                        })
                        this.temV3List = newTemList
                    }else{
                        this.temChargeList= temListInfo.templatelist
                        this.tempgather= temListInfo.tempgather || []
                    }
                }else{
                    messageTip('error','获取主模板失败')
            }
        }
    },
    methods: {
        handleTopTitle(e){
            e= e || window.event
            let target= e.target || e.srcElement
            let scrollTop= target.scrollTop
            let topContent= this.$refs.topContent
            if(this.topHeight-scrollTop > 80){
                topContent.style.top= (this.topHeight-scrollTop)+'px'
            }else{
                topContent.style.top= '80px'
            }
        },
        // 添加主模板
        handleAddTem(){
            if(this.$route.query.hw === '08'){
                this.addV3Tem=[ //添加v3模板占位符
                                    {
                                        id: -1,
                                        name: '',
                                        remark: '',
                                        common1: '',
                                        walletpay: 1,  //是否支持退费 1为支持，否则不支持
                                        permit: 1, //是否临时充电开启 1为开启，否则不开启,
                                        ifalipay: 1,//是否支持支付宝充电
                                        rank: 720,
                                        gather1: [
                                            { id: -1, money: 1, common1: 0,common2: 200 }
                                        ],
                                        gather2: [
                                            { id: -1, name: '1小时', chargeTime: 60 }
                                        ],
                                        gather3: [
                                            { id: -1, name: '1元',money: 1 }
                                        ],
                                        chargeInfo: '每小时收费：1元， 功率区间：0-200瓦'
                                    }
                                ]
                this.getFrom= false
            }
            this.visiblesHw01= true
        },
        // 提交添主模板hw01
        handleSubmit1(){
            this.$refs['hwForm1'].validate((valid)=>{
                let status= 0
                if(valid){
                    if(this.$route.query.hw === '03' || this.$route.query.hw === '04'){
                        const {name,remark,common1,walletpay}= this.hwForm
                        status= this.$route.query.hw === '03' ? 2 : 1
                         const data= {
                            name,
                            remark,
                            common1,
                            status,
                            walletpay,
                            merid: this.merid
                        }
                        addTemplate(data).then(res=>{
                                if(res.code === 200){
                                    if(this.$route.query.hw === '03'){ //脉冲模板
                                        this.temCoinList.push(res.data[0])
                                    }else{ //离线充值机模板
                                        this.temOfflineList.push(res.data[0])
                                    }   
                                }
                            }).catch(error=>{})

                    }else{
                        status= 0
                         const {name,remark,common1,walletpay,grade,permit: permitObj,ifalipay}= this.hwForm
                        let permit= this.hwForm.permitObj[0]
                        let common2= ''
                        if(this.hwForm.permitObj.length == 2){
                            common2= this.hwForm.permitObj[1]
                        }
                        const data= {
                                name,
                                remark,
                                common1,
                                permit,
                                common2,
                                walletpay,
                                grade,
                                status, //0充电模板
                                merid: this.merid,
                                ifalipay
                            }
                            addTemplate(data).then(res=>{
                                if(res.code === 200){
                                    if(grade == 2){ //添加的普通模板
                                        this.temChargeList.push(res.data[0])
                                    }else if(grade == 1){ //添加分等级模板
                                        // this.tempgather.push(res.data[0])
                                        this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid})
                                    }   
                                }
                            }).catch(error=>{})
                    }
                }
                this.visiblesHw01= false
            })
        },
        // 添加v3充电新模板
        handleSubmit08(){
            this.getFrom= true
        },
        async getDataFromTem(v3Data){ //接收添加v3模板传过来的值
            try {
                if(v3Data.name.length > 0 ){
                    v3Data.merid= this.merid
                    let info= await changeV3ChargeTem({ paratem: JSON.stringify(v3Data) })
                    if(info.code === 200){
                        this.handleReLoad(()=>{})
                        messageTip('success','添加成功')  
                    }else{
                        messageTip('error','添加失败')
                    }
                    this.addV3Tem=[ //添加v3模板占位符
                                    {
                                        id: -1,
                                        name: '',
                                        remark: '',
                                        common1: '',
                                        walletpay: 1,  //是否支持退费 1为支持，否则不支持
                                        permit: 1, //是否临时充电开启 1为开启，否则不开启
                                        gather1: [
                                            { id: -1, money: 1, common1: 0,common2: 200 }
                                        ],
                                        gather2: [
                                            { id: -1, name: '1小时', chargeTime: 60 }
                                        ],
                                        gather3: [
                                            { id: -1, name: '1元',money: 1 }
                                        ],
                                        chargeInfo: '每小时收费：1元， 功率区间：0-200瓦'
                                    }
                                ]
                    this.getFrom= false
                    this.visiblesHw01= false
                }else{
                    messageTip('warning','模板名称不能为空！')
                }
            }catch(e){
                this.visiblesHw01= false
            }     
            this.getFrom= false
        },
        handleReLoad(callback){ //v3模板修改成功之后的回调
            this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid: this.merid,callback})
        }
    }
}
</script>

<style lang="less">
.templateDetail {
    position: relative;
    padding: 69px 20px 0 20px;
    .topContent {
        position: fixed;
        left: 180px;
        top: 125px;
        width: calc(100% - 196px);
        height: 50px;
        background-color: #f5f7fa;
        z-index: 99;
        line-height: 50px;
        text-align: center;
        padding-right: 5%;
        box-sizing: border-box;
        border: 1px solid #EBEEF5;
        color: #666;
        button {
            float: right;
            margin-top: 10px;
        }
    }
    .dialog_form {
        .el-dialog__body {
            padding: 15px 30px;
             form {
                    .el-form-item {
                        margin-bottom:20px;
                    }
                    .el-form-item__label {
                        padding: 0;
                        line-height: 26px;
                    }
                    
                }
        }
       
    }
}
</style>