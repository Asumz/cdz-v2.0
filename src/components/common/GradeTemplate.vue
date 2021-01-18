<template>
    <div class="gradeTemplate">
        <el-card :class="['box-card','temTableTitle', (from==3 && pitchon==1) ? 'selectedTem' : '']">
             <div v-for="(item,i) in list" :key="i">
                <TemplateCharge :from="from" :list="[item]" :deviceInfo="deviceInfo" :grade="item.rank" :gradeId="list[0].id" :gradePitchon="pitchon" :source="source" :arecode="arecode" />
            </div>
        </el-card>
    </div>
</template>

<script>
import TemplateCharge from './Template'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            pitchon: null, //pitchon为1的时候，分等级模板默认被选中
            gradeList: [
                {
                    id: 1,
                    name: '充电系统默认模板',
                    remark: '和动充电站',
                    common1: '1569365326',
                    permit: 1, //是否支持退费 1是 2否
                    walletpay: 2, //是否钱包支付 1是 2否
                    common2: 1, //退费标准  1时间电量， 2时间，3电量
                    rank: 1,
                    gather: [
                            {
                                name: '1元 4小时',
                                money:1.0,
                                chargeTime: 240,
                                chargeQuantity: 1,
                                temChildId: 11,
                            },
                            {
                                name: '8元 8小时',
                                money:2.0,
                                chargeTime: 480,
                                chargeQuantity: 2,
                                temChildId: 12,
                            }
                        ]
                },
                {
                    id: 1,
                    name: '充电系统默认模板',
                    remark: '和动充电站',
                    common1: '1569365326',
                    permit: 1, //是否支持退费 1是 2否
                    walletpay: 2, //是否钱包支付 1是 2否
                    common2: 1, //退费标准  1时间电量， 2时间，3电量
                    rank: 2,
                    gather: [
                            {
                                name: '1元 4小时',
                                money:1.0,
                                chargeTime: 240,
                                chargeQuantity: 1,
                                temChildId: 11,
                            },
                            {
                                name: '8元 8小时',
                                money:2.0,
                                chargeTime: 480,
                                chargeQuantity: 2,
                                temChildId: 12,
                            }
                        ]
                },
                {
                    id: 1,
                    name: '充电系统默认模板',
                    remark: '和动充电站',
                    common1: '1569365326',
                    permit: 1, //是否支持退费 1是 2否
                    walletpay: 2, //是否钱包支付 1是 2否
                    common2: 1, //退费标准  1时间电量， 2时间，3电量
                    rank: 3,
                    gather: [
                            {
                                name: '1元 4小时',
                                money:1.0,
                                chargeTime: 240,
                                chargeQuantity: 1,
                                temChildId: 11,
                            },
                            {
                                name: '8元 8小时',
                                money:2.0,
                                chargeTime: 480,
                                chargeQuantity: 2,
                                temChildId: 12,
                            }
                        ]
                }
            ]
        }
    },
    components: {
        TemplateCharge
    },
    computed:{
       ...mapState(['gradePitchon'])
    },
    props: ['list','from','deviceInfo','source','arecode'],
    watch: {
       'list':{
            handler: function(newValue,oldValue){
               if(newValue.length > 0){
                   this.pitchon= newValue[0].pitchon
               }
                
            },
             immediate: true, 
        },
        'gradePitchon': {
            handler: function(newValue,oldValue){
                console.log('newValue',newValue)
                this.pitchon= newValue
            },

        }
    }
}
</script>

<style>

</style>