<template>
  <div class="temperHistory">
      <div class="echartCon_c">
          <div id="echartCon"></div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            myChart: null, // myChart实例
            dataAxis: ['2020-05-07','2020-05-08','2020-05-09','2020-05-10','2020-05-11','2020-05-12','2020-05-13'],
            data: [50,52,32,49,62,73,35],
            dataShadow: [100,100,100,100,100,100,100]
        }
    },
    mounted(){
         const myChart = echarts.init(document.getElementById('echartCon'));
         myChart.setOption({
                            xAxis: {
                                type: 'category',
                                name: '日期',
                                nameGap: 5,
                                axisLabel:{
                                    color:'#666',
                                    fontSize : 15
                                },   // x轴字体颜色 
                                axisLine:{
                                        lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    // x轴刻度的颜色
                                        },
                                data:this.dataAxis
                            },
                            yAxis: {
                                name: '温度（℃）',
                                type: 'value',
                                axisLabel:{
                                    color:'#666',
                                    fontSize : 15
                                },   
                                axisLine:{
                                        lineStyle:{color:'#666'}    
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    
                                        },
                            },
                            title: {
                                text: '000001设备近7天温度',
                                textStyle : {
                                fontSize: 18,
                                color: '#333',
                                fontWeight: 'bold',
                                fontFamily: 'monospace'
                                },
                                left: '3%'
                            },
                            grid: {
                                left: '7%',
                                bottom: 30,
                                right: '5%'
                            },
                            series: [
                                {
                                name: '功率',
                                type: 'line',
                                smooth: true, //曲线平滑
                                itemStyle: {
                                    color:  "#22B14C",
                                    // normal: {label : {show: true}}
                                },
                                lineStyle: {
                                    normal: {
                                        color: "#22B14C",
                                        lineStyle: {
                                            color: "#22B14C",
                                            width:1
                                        }
                                    },
                                },
                                markLine: { //基准线
                                    silent: true,
                                    lineStyle: {
                                    normal: {
                                        color: '#D43C33'                   // 这儿设置安全基线颜色
                                    }
                                    },
                                    data: [{
                                        yAxis: 62
                                    }],
                                    label: {
                                    normal: {
                                        formatter: '报警温度'           // 这儿设置安全基线
                                    }
                                    },
                                },
                                data: this.data
                            }]
                        })
        this.myChart= myChart
    }
}
</script>

<style lang="less">
    .temperHistory {
        .echartCon_c {
            width: 100%;
            display: flex;
            justify-content: center;
            padding-top: 20px;
            #echartCon {
                width: 80%;
                height: 70vh;
            }
        }
        
    }
</style>