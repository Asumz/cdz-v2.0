<template>
<sectionBox>
    <div class="section-title">昨日支付占比</div>
    <div id="pay_type"></div>
</sectionBox>

</template>

<script>
import echarts from 'echarts4'
import sectionBox from '../section-box'
let myChart = null
export default {
    props: {
        screenWidth: {
            type: Number,
        },
        yesterDayPayRank: {
            type: Object,
            default: {}
        }
    },
    watch: {
        yesterDayPayRank: {
            handler(data){
                let list= []
                for(let key in data){
                    let obj= {value: data[key]}
                    switch(key){
                        case 'WeChatratio' : list.push({name: '微信',value: data[key]}) ; break;
                        case 'alipayratio' : list.push({name: '支付宝',value: data[key]}) ; break;
                        case 'unionpayratio' : list.push({name: '银联',value: data[key]}) ; break;
                        case 'incoinsratio' :  list.push({name: '投币',value: data[key]}) ; break;
                        case 'cardratio' : list.push({name: '刷卡',value: data[key]}) ; break;
                    }
                }
                if(myChart){
                    myChart.setOption(this.getOptions(list))
                }else{
                    setTimeout(()=>{
                        myChart && myChart.setOption(this.getOptions(list))
                    },1000)
                }
            }
        }
    },
    mounted(){
       setTimeout(()=>{
            this.handleInit()
        })
    },
    components:{
        sectionBox
    },
     methods: {
        handleInit(){
            myChart= echarts.init(document.getElementById('pay_type'));
            // myChart.setOption(this.getOptions())
        },
        getOptions(list){
            return {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    // orient: 'horizontal',
                    // left: 0,
                    // bottom: 0,
                    // right: 0,
                    orient: 'vertical',
                    // top: 0,
                    bottom: 0,
                    left: 0,
                    data: ['微信', '支付宝', '钱包', '银联', '投币','刷卡'],
                    formatter:  (name)=>{
                        // let data=[
                        //     {name: '微信',value:100},
                        //     {name: '支付宝',value:50},
                        //     {name: '钱包',value:150},
                        //     {name: '银联',value:10},
                        //     {name: '投币',value:30},
                        //     {name: '刷卡',value:40}
                        // ];
                        let total = 0;
                        let target;
                        for (let i = 0, l = list.length; i < l; i++) {
                            total += list[i].value;
                            if (list[i].name == name) {
                                target = list[i].value;
                            }
                        }
                        let arr = [
                            '{a|'+name+'}',
                            '{b|'+(isNaN(((target/total)*100)) ? 0 : ((target/total)*100)).toFixed(2)+'%}'
                        ]
                        return arr.join('')
                    },
                    textStyle:{
                        color: 'rgba(255,255,255,.8)',
                        rich:{
                            a:{
                                fontSize:12,
                                verticalAlign:'top',
                                align:'center',
                                padding:[0,5,0,0]
                            },
                            b:{
                                fontSize:12,
                                align:'center',
                                // padding:[0,15,0,0],
                                // lineHeight:25
                            }
                        }
                    }
                    
                },
                series: [
                        {
                            name: '支付占比',
                            type: 'pie',
                            radius: '80%',
                            center: [this.screenWidth  < 1400 ? '64%' : '55%','50%'],
                            avoidLabelOverlap: false,
                            selectedOffset: 50,
                            label: {
                                position: 'inner'
                            },
            
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: list,
                            itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal: {
                                color: function(params) {
                                    const colorlist= {
                                        '微信': ['#4A657A','#39808A'],
                                        '支付宝': ['#308E92','#86B99F'],
                                        '钱包':  ['#B1CFA5','#DED4A1'],
                                        '银联':  ['#F5D69F','#F5A392'],
                                        '投币':  ['#F5898B','#FF6C71'],
                                        '刷卡':  ['#32C5E9','#67E0E3'],
                                    }
                                    // const colorlist= {
                                    //     '微信': ['rgb(55, 162, 218)','rgb(55, 162, 218,.7)'],
                                    //     '支付宝': ['rgb(50, 197, 233)','rgb(50, 197, 233,.7)'],
                                    //     '钱包':  ['rgb(255, 159, 127)','rgb(255, 159, 127,.7)'],
                                    //     '银联':  ['rgb(251, 114, 147)','rgb(251, 114, 147,.7)'],
                                    //     '投币':  ['rgb(222, 212, 161)','rgb(222, 212, 161,.7)'],
                                    //     '刷卡':  ['rgb(159, 230, 184)','rgb(159, 230, 184,.7)'],
                                    // }
                                    // return colorlist[params.data.name]
                                    return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                            offset: 0,
                                            color: colorlist[params.data.name][0]
                                        }, {
                                            offset: 1,
                                            color: colorlist[params.data.name][1]
                                        }])                                    

                                }
                            }
                        }
                    }
                ]
            }
        } /* getOptions  end */
     }
}
</script>

<style lang="less" scoped>
#pay_type {
    flex: 1;
}
</style>