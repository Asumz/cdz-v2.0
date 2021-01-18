<template>
  <div class="settlement">
    <el-card style="width: 500px; margin: 0 auto;">
        <div slot="header" class="clearfix"  style="text-align: center;">
            <span>结算收益</span>
        </div>
        <el-tabs type="border-card" >
            <el-tab-pane label="结算个人">
                <el-form  :model="settlementForm1" label-width="120px" ref="personSettlement" :rules="rules">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="settlementForm1.phone"  style="width: 200px;" clearable></el-input>
                    </el-form-item>
                   
                    <el-form-item label="选择日期" prop="time">
                        <el-date-picker
                            style="width: 200px;"
                            v-model="settlementForm1.time"
                            type="date"
                            clearable
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
            
                    <el-form-item label="结算种类">
                        <el-radio-group v-model="settlementForm1.type">
                            <el-radio label="1" >收益</el-radio>
                            <el-radio label="2" >设备</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="resetForm('personSettlement')">重置</el-button> -->
                        <el-button size="small" type="primary" @click="onSubmit('personSettlement')">立即结算</el-button>
                        
                    </el-form-item>
                </el-form>    
            </el-tab-pane>
            <el-tab-pane label="结算全部">
                 <el-form  :model="settlementForm2" label-width="120px" ref="personSettlement2">
                    <el-form-item label="选择日期">
                        <el-date-picker
                            style="width: 200px;"
                            v-model="settlementForm2.time"
                            type="date"
                            clearable
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
            
                    <el-form-item label="结算种类">
                        <el-radio-group v-model="settlementForm2.type">
                            <el-radio label="1" >收益</el-radio>
                            <el-radio label="2" >设备</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="resetForm('personSettlement2')">重置</el-button> -->
                        <el-button size="small" type="primary" @click="onSubmit('personSettlement2')">立即结算</el-button>
                    </el-form-item>
                </el-form>    

            </el-tab-pane>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { settlementTotalEarn,settlementAllEarn } from '@/require/settlement'
import {messageTip} from '@/utils/ele'
/**
 *  总结： 
 *  reactive 一般时创建对象响应式的，对象中每个属性都具有响应式，对象不具有响应式（注意：初始化对象时没有的，后来添加的属性不具有响应式）
 *  eg: let student=  reactive({ name: 'zs' })   student.name= 'ls' 是响应式;  student.age= 18 不是响应式 ; student= { name: 'ww' } 不是响应式的
 * 
 *  ref  一般是监听基本类型的值的，如果传的值为对象，那么将会调用 reactive, 
 *  eg:  let student=  ref({ name: 'zs' })   student.value.name= 'ls' 是响应式，但是   student.value.age= 18 不是响应式 ； student.value.= { name: 'ww' } 是响应式的
 * 
 *  toRef : toRef 可以用来为一个 reactive 对象的属性创建一个 ref。这个 ref 可以被传递并且能够保持响应性,也可以将 props属性转化为ref
 *  eg: let student=  reactive({ name: 'zs' }) ; let refNmae= toRef(student,'name') ; console.log(refNmae.value+='p') //zsp ; console.log(student.name+='p') //zspp
 *      setup(props) {
            useSomeFeature(toRef(props, 'foo'))
        },
    toRefs: 把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。
    eg: let student=  reactive({ name: 'zs' }) ;  let newStudent= toRefs(student)  此时就相当于`普通`对象内部的每个属性都相当于一个ref,所以可以 return { ...newStudent };
        newStudent.name.value= 'ww' 响应式;  newStudent= { name: 'll'  } 不是响应式,因为newStudent就相当于`普通`对象内部的每个属性都相当于一个ref

    unref: 如果参数是一个 ref 则返回它的 value，否则返回参数本身。它是 val = isRef(val) ? val.value : val 的语法糖
    *   
**/
export default {
 
    data(){
        return {
            settlementForm1: {
                type: "1"
            },
            settlementForm2: {
                type: "1"
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
                time: [
                    { required: true, message: '请输入时间', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
         onSubmit(name){
                let data= {}
                let requireFn= null
                if(name == 'personSettlement'){
                    let {phone,time,type}= this.settlementForm1
                    data={phone,time,type}
                    requireFn= settlementAllEarn
                }else{
                     let {time,type}= this.settlementForm2
                     data={time,type}
                     requireFn=  settlementTotalEarn
                }
                this.$refs[name].validate(async(valid) => {
                if (valid) {
                    try{
                        let info= await requireFn(data)
                        if(info.code == 200){
                            messageTip('success','结算成功')
                        }else{
                            messageTip('error','结算失败')
                        }
                    }catch(error){
                        messageTip('warning','请输入表单内容')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        
            
        },
        resetForm(name){
            this.$refs[name].resetFields();
            this.$refs.personSettlement.resetFields()
            console.log(this.$refs.personSettlement.resetFields)
        }
    }
}
</script>

<style>

</style>