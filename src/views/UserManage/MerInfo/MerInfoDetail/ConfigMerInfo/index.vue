<template>
  <div class="configMerInfo">
    <el-row>
        <el-col :md="{span: 11}" :lg="{span: 9, offset: 2}">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>配置微信特约商户信息</span>
                    
                    <el-button style="float: right; padding: 3px 0" type="text" @click="()=>{ this.isEdit1= true }" v-if="configList.length > 0">编辑配置</el-button>
                    <el-button style="float: right; padding: 3px 25px; color: #F56C6C;" type="text" v-if="configList.length > 0" @click="deleteTeyueInfo">删除配置</el-button>
                </div>
                <el-form ref="form" :model="configMerInfoForm1" :rules="rules" label-width="135px" v-if="configList.length > 0 || isEdit1">
                    <el-form-item label="特约商户号" prop="submchid">
                        <el-input v-model="configMerInfoForm1.submchid" v-if="isEdit1" :disabled="configList.length > 0 && isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.submchid}}</div>
                    </el-form-item>
                    <el-form-item label="特约商户平台号" prop="subappid">
                        <el-input v-model="configMerInfoForm1.subappid" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.subappid}}</div>
                    </el-form-item>
                    <el-form-item label="秘钥" prop="keyword">
                        <el-input v-model="configMerInfoForm1.keyword" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.keyword}}</div>
                    </el-form-item>
                    <el-form-item label="APP秘钥" prop="appsecret">
                        <el-input v-model="configMerInfoForm1.appsecret" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.appsecret}}</div>
                    </el-form-item>
                     <el-form-item label="特约" prop="teyue">
                        <el-input v-model="configMerInfoForm1.teyue" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.teyue}}</div>
                    </el-form-item>
                    <div>
                        <!-- 修改按钮 -->
                        <transition name="el-zoom-in-top">
                            <div class="submitBtn transition-box" v-show="configList.length > 0 && this.isEdit1">
                                <el-button type="primary" @click="handleChangeVal" size="small">确认修改</el-button>
                                <el-button size="small" @click="cancelChange">取消修改</el-button>
                            </div>
                        </transition>
                        <!-- 新增按钮 -->
                        <transition name="el-zoom-in-top">
                            <div class="submitBtn transition-box" v-show="configList.length <= 0">
                                <el-button type="primary" size="small" @click="handleAddTeYue">确认新增</el-button>
                                <el-button size="small" @click="cancelAdd">取消新增</el-button>
                            </div>
                        </transition>
                    </div>
                </el-form>
                <div v-else style="text-align: center;" >
                    <div style="margin-bottom: 15px;">没有特约商户配置，请先添加配置！</div>
                    <el-button type="primary" size="small" @click="()=>{  this.isEdit1= true;}">添加配置</el-button>
                </div>
            </el-card>
        </el-col>
        <el-col :md="{span: 11,offset: 2}" :lg="{span: 9, offset: 2}">
            <!-- <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>配置信息</span>
                    
                    <el-button style="float: right; padding: 3px 0" type="text" @click="()=>{ this.isEdit2= true }">编辑配置</el-button>
                    <el-button style="float: right; padding: 3px 25px; color: #F56C6C;" type="text" >移除商户</el-button>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="特约商户号">
                        <el-input v-model="configMerInfoForm.submchid" v-if="isEdit2"></el-input>
                        <div v-else>哒哒哒哒哒哒所多</div>
                    </el-form-item>
                    <el-form-item label="特约商户平台号">
                        <el-input v-model="configMerInfoForm.smallappid" v-if="isEdit2"></el-input>
                        <div v-else>哒哒哒哒哒哒所多</div>
                    </el-form-item>
                    <el-form-item label="秘钥">
                        <el-input v-model="configMerInfoForm.keyword" v-if="isEdit2"></el-input>
                        <div v-else>哒哒哒哒哒哒所多</div>
                    </el-form-item>
                    <el-form-item label="APP秘钥">
                        <el-input v-model="configMerInfoForm.smallappsecret" v-if="isEdit2"></el-input>
                        <div v-else>哒哒哒哒哒哒所多</div>
                    </el-form-item>
                     <el-form-item label="特约">
                        <el-input v-model="configMerInfoForm.teyue" v-if="isEdit2"></el-input>
                        <div v-else>哒哒哒哒哒哒所多</div>
                    </el-form-item>
                    <el-form-item>
                        <transition name="el-zoom-in-top">
                            <div class="submitBtn transition-box" v-show="isEdit2">
                                <el-button type="primary" @click="onSubmit" size="small">确认修改</el-button>
                                <el-button size="small">取消修改</el-button>
                            </div>
                        </transition>
                    </el-form-item>
                </el-form>
            </el-card> -->
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { messageTip,alertConfim} from "@/utils/ele";
import { configMchidapi } from "@/require/userManage";
export default {
  data() {
    return {
      configMerInfoForm1: {},
      isEdit1: false, //是否编辑
      isEdit2: false, //是否编辑
      dataType1: {}, //公众号
      dataType2: {}, //小程序数据
      rules: {
          submchid: [{ required: true, message: '特约商户号为必填内容！', trigger: 'blur' }],
          subappid: [{ required: true, message: '特约商户平台号为必填内容！', trigger: 'blur' }]
      }
    };
  },
  props: ['subMerData','merid'],
  computed:{
      configList(){  //长度大于2的数组，取数组前两项
          if(this.subMerData.length > 2){
              let [a,b,,]= this.subMerData
              return [a,b]
          }
          return this.subMerData
      }
  },
  watch: {
      configList(val){
            for(let item of val){
                if(item.type === 1){
                    let { appsecret,keyword,subappid,submchid,teyue }= item
                    this.dataType1= { appsecret,keyword,subappid,submchid,teyue }
                    this.configMerInfoForm1= { appsecret,keyword,subappid,submchid,teyue }
                }else if(item.type === 2){
                    let { appsecret,keyword,smallappid,smallappsecret,teyue }= item
                    this.dataType2= { appsecret,keyword,smallappid,smallappsecret,teyue }
                    this.configMerInfoForm2= { appsecret,keyword,subappid,submchid,teyue }
                }
            }
      }
  },
  methods: {
    handleAddTeYue(){ //新增特约商户
        if(this.regExpMessage(this.configMerInfoForm1)){ //交验成功之后发送请求
            this.asyConfigMchidapi({type:1,merid: this.merid, ...this.configMerInfoForm1})
        }
    },
    async asyConfigMchidapi(data){
        let info= await configMchidapi(data)
        if(info.code === 200){
            messageTip('success',info.message)
            this.$emit('handleReReq')
            this.isEdit1= false
            if(data.type === 2){
                this.configMerInfoForm1= {}
            } 
        }else{
            messageTip('error',info.message)
        }
    },
    handleChangeVal(){ //修改特约商户
        if(this.regExpMessage(this.configMerInfoForm1)){ //交验成功之后发送请求
            this.asyConfigMchidapi({type:3,merid: this.merid, ...this.configMerInfoForm1})
        }
    },
    cancelChange(){ //取消修改
        this.configMerInfoForm1= {...this.dataType1}
        this.isEdit1= false
    },
    deleteTeyueInfo(){ //删除特约商户信息
        alertConfim('确认删除特约商户配置吗？',()=>{
            let { submchid,subappid }= this.configMerInfoForm1
            this.asyConfigMchidapi({type:2,merid: this.merid,submchid,subappid})
        })
    },
    cancelAdd(){ //取消新增
        this.configMerInfoForm1= {}
        this.isEdit1= false
    },
    regExpMessage(obj){ //校验特约商户号和特约商户平台号
        if(!obj.submchid){
            messageTip('warning','特约商户号不能为空！')
            return false
        }
        if(!obj.subappid){
            messageTip('warning','特约商户平台号不能为空！')
            return false
        }
        return true
    }
  }
};
</script>

<style lang="less">
.configMerInfo {
  .submitBtn {
    text-align: center;
  }
}
</style>