<template>
    <div class="chargeRecordDetail">
        <el-row>
            <el-col :xs="24" :sm="14" :md="15" :lg="17" :xl="18" style="
            
            height: 0;
            padding-top: 40%;
            position: relative;
            float: left">
            <div id="echartCon" style="position: absolute; left: 0;top:20px;right:0;bottom: 0;">
                
            </div>
            </el-col>
            <el-col :xs="24" :sm="10" :md="9" :lg="7" :xl="6">
                 <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>已使用信息</span>
                    </div>
                    <el-table
                        :data="chargeInfo"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                        >
                        <el-table-column
                        prop="type"
                        label="类型"
                        min-width="120"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="content"
                        label="类型"
                        min-width="220"
                        >
                         <template slot-scope="{row}">
                                <span v-if="row.type === '付款金额' && include === 1">
                                    {{row.content}} 
                                    <el-popover
                                        placement="right"
                                        width="521"
                                        trigger="click">
                                        <h3 class="money_h3">消费信息</h3>
                                        <el-table :data="listcharge" border>
                                            <el-table-column width="240" property="ordernum" label="订单号"></el-table-column>
                                            <el-table-column width="100" property="moany" label="支付金额">
                                                <template slot-scope="cScope">{{ cScope.row.moany.toFixed(2) }}元</template>
                                            </el-table-column>
                                            <el-table-column width="180" property="begintime" label="支付时间" >
                                                <template slot-scope="cScope">{{ cScope.row.begintime | fmtDate('YYYY-MM-DD hh:mm:ss') }}</template>
                                            </el-table-column>
                                        </el-table>
                                        <i class="money_icon el-icon-warning-outline" slot="reference"></i>
                                    </el-popover>
                                    
                                </span>
                                <span v-else>{{row.content}}</span>
                        </template>
                        </el-table-column>
                    </el-table>
                    <div style="text-align: center; padding-top: 15px">
                        <el-button type="primary" size="small" v-if="portAVShow" @click="handleSCanAVBtn">查看电流/电压</el-button>
                    </div>
                 </el-card>
            </el-col>
        </el-row>
        <el-card>
             <div slot="header" class="clearfix" style="text-align: center;">
                <span>充电日志</span>
             </div>
             <el-table
                :data="tableData"
                :max-height="clientHeight"
                border
                style="width: 100%">
                <el-table-column
                prop="index"
                label="序号"
                min-width="60">
                <template slot-scope="scope">
                   {{ scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="code"
                label="设备号"
                min-width="100">
                <template slot-scope="{row}">
                    <router-link :to="`/deviceManage/deviceList?devicenum=${row.code}`">
                        <el-link  type="primary">{{row.code}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="port"
                label="端口号"
                 min-width="100"
                >
                </el-table-column>

                 <el-table-column
                prop="chargetime"
                label="剩余时间(min)"
                 min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="surpluselec"
                label="剩余电量(kW·h)"
                 min-width="120"
                >
                <template slot-scope="{row}">
                    {{ (row.surpluselec/100).toFixed(2)}}
                </template>
                </el-table-column>

                <el-table-column
                prop="power"
                label="实时功率(W)"
                 min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="portV"
                label="实时电压(V)"
                 min-width="120"
                v-if="portAVShow"
                >
                <template slot-scope="{row}">
                    {{ row.portV == -1 ? '— —' : row.portV }}
                </template>
                </el-table-column>

                <el-table-column
                prop="portA"
                label="实时电流(A)"
                min-width="120"
                v-if="portAVShow"
                >
                <template slot-scope="{row}">
                    {{ row.portA == -1 ? '— —' : row.portA }}
                </template>
                </el-table-column>

                <el-table-column
                prop="money"
                label="扣费金额(元)"
                min-width="120"
                v-if="moneyShow"
                >
                <template slot-scope="{row}">
                    {{ row.money == -1 ? '— —' : row.money.toFixed(2) }}
                </template>
                </el-table-column>


                 <el-table-column
                prop="createtime"
                label="记录时间"
                min-width="150"
               
                >
                <template slot-scope="{row}">
                   <div v-html="row.createtime && row.createtime.length > 0 ? ($fmtDate(row.createtime).replace('</br>',' ')) : '— —'"></div>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- 弹框，电压、电流表 -->
        <el-dialog
        title="电压/电流表"
        :visible.sync="dialogVisible"
        width="80%"
        custom-class="echart-dialog"
        :before-close="handleClose">
        <el-row>
            <el-col :lg="12" :xl="12" :md="12" :sm="12">
                <div class="echart_V">
                    <div id="echart_V" ref="echart_V"></div>
                </div>
            </el-col>
            <el-col :lg="12" :xl="12" :md="12" :sm="12">
                <div class="echart_A">
                    <div id="echart_A" ref="echart_A"></div>
                </div>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small"> 取消</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 弹框，电压、电流表结束 -->
    </div>
</template>

<script>
// const echarts= require('echarts/lib/echarts')
// require("echarts/lib/chart/line");
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
import { getpowerLineInfo } from '@/require/tradeRecord'
export default {
    data(){
        return {
            clientHeight: 700,//屏幕高度
            chargeInfo: [
                {type: '订单号',content:'' },
                {type: '付款金额',content: ''},
                {type: '支付方式',content: ''},
                {type: '使用时间',content: ''},
                {type: '使用电量',content: ''},
                {type: '最大功率',content: ''},
                {type: '设备号',content: ''},
                {type: '端口号',content: ''},
                {type: '开始时间',content: ''},
                {type: '结束时间',content: ''},
            ],
             tableData: [],
             orderid: 0, //请求的订单id
             myChart: null,
             dialogVisible: false,
             myChartA: null,
             myChartV: null,
             listA: [], //电流数组
             listV: [], //电压数组
             portAVShow: true, //电压电流按钮，默认显示
             moneyShow: true, //实时扣费金额是否显示
             include: 0, //0 没有续充，1有续充
             listcharge: [] ,//订单列表，有续充的话包含续充
        }
    },
    created(){
        this.orderid= this.$route.query.orderid || 0
        this.asyGetpowerLineInfo({orderid: this.orderid})
    },
    beforeMount(){
        // 获取屏幕高度
        let h= document.documentElement.clientHeight || document.body.clientHeight
        this.clientHeight= (h-180)*0.85

    },
    mounted(){
        var myChart = echarts.init(document.getElementById('echartCon'));
        myChart.setOption({
                         xAxis: {
                                type: 'category',
                                name: '分钟',
                                nameGap: 5,
                                axisLabel:{color:'#666'},   // x轴字体颜色 
                                axisLine:{
                                        lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    // x轴刻度的颜色
                                        },
                                //  data:_this.timeList
                            },
                            yAxis: {
                                name: '功率（W）',
                                type: 'value',
                                axisLabel:{color:'#666'},   
                                axisLine:{
                                        lineStyle:{color:'#666'}    
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    
                                        },
                            },
                            title: {
                                text: '充电功率曲线',
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
                        series: [{
                            name: '功率',
                            type: 'line',
                            smooth: true, //曲线平滑
                            itemStyle: {
                                color:  "#22B14C"
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
                                    color: '#01fef9'                   // 这儿设置安全基线颜色
                                }
                                },
                                data: [{
                                    yAxis: 30
                                }],
                                label: {
                                normal: {
                                    formatter: '最大浮\n充功率'           // 这儿设置安全基线
                                }
                                },
                            },
                            // data: _this.powerList
                        }]
            });
        this.myChart= myChart
    },
    methods: {
        async asyGetpowerLineInfo(data){
            let _this=  this
            try{
                let powerInfo= await getpowerLineInfo(data)
                if(powerInfo.code === 200){
                    let timeList= []
                    let powerList= []
                    let listA= []
                    let listV= []
                    for (const iterator of powerInfo.listpower) {
                        timeList.push(iterator.minuteTime)
                        powerList.push(iterator.power)
                    }
                    let length= powerInfo.listdata.length
                    if(length >= 2){
                        if(powerInfo.listdata[1].portA == -1 || powerInfo.listdata[1].portV == -1){
                            this.portAVShow= false  //判断当portA或者portV 为-1时，不显示电压电流
                        }
                        if(powerInfo.listdata[1].money == null || powerInfo.listdata[1].money == -1){
                            this.moneyShow= false 
                        }
                    }else if(length === 1){
                        if(powerInfo.listdata[0].portA == -1 || powerInfo.listdata[0].portV == -1){
                            this.portAVShow= false  //判断当portA或者portV 为-1时，不显示电压电流
                        }
                        if(powerInfo.listdata[0].money == null || powerInfo.listdata[0].money == -1){
                            this.moneyShow= false 
                        }
                    }
                    this.timeList= timeList
                    this.listA= listA
                    this.listV= listV
                    this.powerList= powerList
                    this.include= powerInfo.include
                    this.listcharge= powerInfo.listcharge
                    this.myChart.setOption({
                            xAxis: {
                                type: 'category',
                                name: '分钟',
                                nameGap: 5,
                                axisLabel:{color:'#666'},   // x轴字体颜色 
                                axisLine:{
                                        lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    // x轴刻度的颜色
                                        },
                                 data:timeList
                            },
                            series: [{
                            name: '功率',
                            type: 'line',
                            smooth: true, //曲线平滑
                            itemStyle: {
                                color:  "#22B14C"
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
                                    color: '#409eff'
                                }
                                },
                                data: [{
                                    yAxis: 30
                                }],
                                label: {
                                normal: {
                                    formatter: '最大浮\n充功率'    
                                }
                                },
                            },
                            data: powerList
                            }]
                        });
                    let paytypeStr= powerInfo.paytype == 1 ? "钱包" : powerInfo.paytype == 2 ? "微信" : powerInfo.paytype == 3 ? "支付宝": powerInfo.paytype == 4 ? "包月下发数据" : powerInfo.paytype == 5 ? "投币" : powerInfo.paytype == 6 ? "刷卡" : powerInfo.paytype == 7 ? "刷卡" : powerInfo.paytype == 12 ? "银联" :"— —"
                    this.chargeInfo= [
                        {type: '订单号',content: powerInfo.ordernum},
                        {type: '付款金额',content: `${powerInfo.paymoney}元`},
                        {type: '支付方式',content: paytypeStr},
                        {type: '使用时间',content: `${powerInfo.usetime}分钟`},
                        {type: '使用电量',content: `${powerInfo.useelec/100}度`},
                        {type: '最大功率',content: `${powerInfo.mapdata.maxpower}瓦`},
                        {type: '设备号',content:  powerInfo.devicenum},
                        {type: '端口号',content: powerInfo.port},
                        {type: '开始时间',content: this.$fmtDate(powerInfo.begintime).replace('</br>',' ')},
                        {type: '结束时间',content: this.$fmtDate(powerInfo.endtime).replace('</br>',' ')},
                    ]
                    this.tableData= powerInfo.listdata
                    
                }
            }catch(error){
                
            }
        },
        handleClose(){ //关闭电压电流表
            this.dialogVisible= false
        },
        handleSCanAVBtn(){
            // 点击，初始化echart_A,echart_V
          this.dialogVisible= true
          this.$nextTick(()=>{ //更新之后的回调
                this.myChartA= echarts.init(this.$refs.echart_A)
                this.myChartV= echarts.init(this.$refs.echart_V)
                let _this= this
                this.myChartV.setOption({
                        xAxis: {
                            type: 'category',
                            name: '分钟',
                            nameGap: 5,
                            axisLabel:{color:'#666'},   // x轴字体颜色 
                            axisLine:{
                                    lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                    },
                            axisTick:{
                                    lineStyle:{color:'#666'}    // x轴刻度的颜色
                                    },
                                data:_this.timeList
                        },
                        yAxis: {
                                name: '电压（V）',
                                type: 'value',
                                axisLabel:{color:'#666'},   
                                axisLine:{
                                        lineStyle:{color:'#666'}    
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    
                                        },
                        },
                        title: {
                                text: '充电电压曲线',
                                textStyle : {
                                fontSize: 18,
                                color: '#333',
                                fontWeight: 'bold',
                                fontFamily: 'monospace'
                                },
                                left: '3%'
                            },
                        series: [{
                            name: '功率',
                            type: 'line',
                            smooth: true, //曲线平滑
                            itemStyle: {
                                color:  "#22B14C"
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
                            data: _this.listV
                            }]
                    })
                this.myChartA.setOption({
                        xAxis: {
                            type: 'category',
                            name: '分钟',
                            nameGap: 5,
                            axisLabel:{color:'#666'},   // x轴字体颜色 
                            axisLine:{
                                    lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                    },
                            axisTick:{
                                    lineStyle:{color:'#666'}    // x轴刻度的颜色
                                    },
                                data:_this.timeList
                        },
                        yAxis: {
                                name: '电流（A）',
                                type: 'value',
                                axisLabel:{color:'#666'},   
                                axisLine:{
                                        lineStyle:{color:'#666'}    
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    
                                        },
                        },
                        title: {
                                text: '充电电流曲线',
                                textStyle : {
                                fontSize: 18,
                                color: '#333',
                                fontWeight: 'bold',
                                fontFamily: 'monospace'
                                },
                                left: '3%'
                            },
                        series: [{
                            name: '功率',
                            type: 'line',
                            smooth: true, //曲线平滑
                            itemStyle: {
                                color:  "#22B14C"
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
                            data: _this.listA
                            }]
                    })  

         })   
        }
    }
}
</script>

<style lang="less">
.echart-dialog {
    margin-top: 10vh !important;
    .echart_V {
        padding-right: 15px;
        #echart_V {
            width: 38vw;
            height: 60vh; 
        }
    }
    .echart_A {
        height: 60vh;
        padding-left: 15px;
        #echart_A {
           width: 38vw;
           height: 60vh; 
        }
    }
}
.money_icon {
    padding: 0 8px;
    font-size: 16px;
    color: #409EFF;
}
.money_h3 {
    text-align: center;
    font-size: 16px;
    margin-bottom:  15px;
    color: #666;
    font-weight: normal;
    
}

</style>