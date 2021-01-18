<template>
    <sectionBox>
        <div class="section-title">最近15日平台交易金额</div>
        <div id="evem_rank"></div>
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
        latelyTotalEvenData: {
            type: Object,
            default: ()=> (
                {
                    times: [],
                    values: []
                }
            )
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
    watch: {
        latelyTotalEvenData: {
            handler(){
                if(myChart){
                    myChart.setOption(this.getOptions())
                }else{
                    setTimeout(()=>{
                         myChart && myChart.setOption(this.getOptions())
                    },1000)
                }
            },
            deep: true
        }
    },
    methods: {
        handleInit(){
            myChart= echarts.init(document.getElementById('evem_rank'));
            // myChart.setOption(this.getOptions())
        },
        getOptions(){
            return {
                    // backgroundColor: '#08263a',
                    grid: {
                    top: '20%',
                    left: this.screenWidth < 1400 ?  '15%' : '10%',
                    right: '5%',
                    bottom: '15%',
                    },
                    xAxis: [
                            {
                                show: true,
                                axisLabel: {
                                    textStyle: {
                                        color: '#ffffff'
                                    }
                                },
                                axisLine: {
                                    show: true,
                                },
                                data: this.latelyTotalEvenData.times
                            },
                            {
                                show: false,
                                data: this.latelyTotalEvenData.times
                            }
                        ],
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 15, //50
                        dimension: 0,
                        inRange: {
                            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
                        }
                    },
                    yAxis: {
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#08263f'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: [
                    // {
                    //     name: 'back',
                    //     type: 'bar',
                    //     data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                    //     z: 1,
                    //     itemStyle: {
                    //         normal: {
                    //         opacity: 0.4,
                    //         barBorderRadius: 5,
                    //         shadowBlur: 3,
                    //         shadowColor: '#111'
                    //         }
                    //     }
                    // }, 
                    // {
                    //     name: 'Simulate Shadow',
                    //     type: 'line',
                    //     data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                    //     z: 2,
                    //     showSymbol: false,
                    //     animationDelay: 0,
                    //     animationEasing: 'linear',
                    //     animationDuration: 1200,
                    //     lineStyle: {
                    //         normal: {
                    //         color: 'transparent'
                    //         }
                    //     },
                    //     areaStyle: {
                    //         normal: {
                    //         color: '#08263a',
                    //         shadowBlur: 50,
                    //         shadowColor: '#000'
                    //         }
                    //     }
                    // }, 
                        {
                            name: 'front',
                            type: 'bar',
                           data: this.latelyTotalEvenData.values,
                           xAxisIndex: 1,
                            z: 3,
                            itemStyle: {
                                normal: {
                                barBorderRadius: 5
                                }
                            }
                        }
                    ],
                    animationEasing: 'elasticOut',
                    // animationEasingUpdate: 'elasticOut',
                    animationDelay(idx) {
                    return idx * 20
                    },
                    // animationDelayUpdate(idx) {
                    //     return idx * 20
                    // }
                }

        } /*getOptions  end*/
    }
}
</script>

<style lang="less" scoped>
.section-title {
    color: rgba(255,255,255,.9);
    font-size: 16px;
}
.dayly-even-Rank {
   position: absolute;
   left: 5%;
   right: 5%;
   top: 5%;
   bottom: 7%;
   display: flex;
   flex-direction: column;
   #evem_rank {
       flex: 1;
   }
}
</style>