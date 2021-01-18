<template>
    <div class="messLogin">
         <el-form  status-icon ref="ruleForm"  :rules="rules" :model="ruleForm"  class="demo-ruleForm">
            <el-form-item prop="phone" >
                <el-input 
                v-model="ruleForm.phone"
                placeholder="请输入手机号"
                clearable
               >
                <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
               </el-input>
            </el-form-item>
            <el-form-item prop="message">
                <el-input 
                placeholder="请输入验证码" 
                v-model="ruleForm.message"
                clearable
                >
                    <i slot="prefix" class="el-input__icon el-icon-message"></i>
                    <template slot="append">
                        <div v-show="showVerifiBtn"  @click="getVerifiCode">获取验证码</div>
                        <div v-show="!showVerifiBtn">倒计时：{{time}}</div>
                    </template>
                </el-input>
            </el-form-item>
           
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {handleMessageLogin} from '../../require'
import { messageTip } from '@/utils/ele'
import Vue from 'vue'
import { mapActions } from 'vuex'
export default {
     data() {
         var checkPhoneBlur = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                    } else {
                    const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            }
            var checkPhoneChange= (rule, value, callback)=>{
               callback()
            }
            var checkMessageBlur = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                    } else {
                    const reg = /^\d{6}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的短信'));
                    }
                }
            }
             var checkMessageChange= (rule, value, callback)=>{
               
            }
        return {
            showVerifiBtn: true, //显示获取验证码按钮
            time: 120,
            timer: null,
            verifiInfo: {},
            ruleForm: {
                 phone: '',
                 message: '',
            },
            rules: {
                phone: [
                    { validator: checkPhoneBlur, trigger: 'blur,charge'}
                ],
                message: [
                    { validator: checkMessageBlur, trigger: 'blur'}
                    
               ]
            }
        }
    },
    methods: {
        ...mapActions(['asyHandleCaptcha']),
        getVerifiCode(){
            let flag= false //没错
            this.$refs['ruleForm'].validateField('phone',phoneError=>{ //对phone进行校验
                if(phoneError){
                    flag= true
                }
            })
            if(!flag){
                this.showVerifiBtn= false
                this.handleSetInterVal()
                this.handleGetMessage()
            }

      
        },
        handleSetInterVal(){
            let time= this.time
            let timer= setInterval(()=>{
                time--
                this.time= time
                if(time <= 0){
                    clearInterval(timer)
                    this.showVerifiBtn= true
                    this.time= 120
                }
            },1000)
            this.timer= timer
        },
        async handleGetMessage(){
            let _this= this
            try{
               let info= await handleMessageLogin({phone: _this.ruleForm.phone,source:1})
               if(info.code === 200){
                   let {captcha,sendtime}= info
                   this.verifiInfo= {captcha,sendtime}
               }else{
                   messageTip('error',info.message)
                   clearInterval(_this.timer)
                    _this.showVerifiBtn= true
                    _this.time= 120
               }
            }catch(error){
                clearInterval(_this.timer)
                _this.showVerifiBtn= true
                _this.time= 120
            }
            
        },
        handleLogin(){
            this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.asyHandleCaptcha({phone: this.ruleForm.phone, captcha: this.verifiInfo.captcha,authcode: this.ruleForm.message,sendtime:this.verifiInfo.sendtime,type:1})
            } else {
                return false;
            }
            });
        }
    },
   
}
</script>

<style lang="less" >
    .messLogin{
        .el-form{
            margin-top: 5px;
            .el-form-item__content {
                .el-button {
                    width: 100%;
                    border-radius: 40px;
                }
                .el-input-group__append {
                    padding: 0;
                    cursor: pointer;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -o-user-select: none;
                    &:active {
                        background-color: #fefefe;
                    }
                    div {
                        padding: 8px 20px;
                    }
                }
            }
        }  
    }
</style>