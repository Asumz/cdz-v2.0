<template>
  <div id="map"></div>
</template>

<script>
import echarts2 from 'echarts2'
import map from 'echarts2/chart/map'
import { getDevicesPosition } from '@/require/datastatis'

export default {
    mounted(){
        getDevicesPosition().then(res=>{
             this.handleLoadData(res)
        })
       
    },
    methods: {
        async handleLoadData(placeList){
            const {default:BMapLib}= await import(/* webpackPrefetch: true */'@/vendor/map/BMapLib.js')
            const {default:CreateChinaMapLine}= await import(/* webpackPrefetch: true */'@/vendor/map/chinaMap.js')
            // let {default:placeList}= await import('@/vendor/map/data.js')
            // const {default:hdData}= await import('@/vendor/map/hd.js')
            this.$nextTick(()=>{
                this.init(echarts2,placeList,CreateChinaMapLine)
            })
        },
        // 初始化地图
        init(ec,placeList,CreateChinaMapLine ){
            let that= this 
                    var myChart2 = ec.init(document.querySelector('#map'));
                    let option2 = {
                        geo: {
                            roam: false
                        },
                        color: [
                            'rgba(255, 255, 255, 0.5)',
                            'rgba(14, 241, 242, 0.5)',
                            'rgba(37, 140, 249, 0.5)'
                        ],
                        title: {
                            text: '设备站点分布',
                            x: 'center',
                            textStyle: {
                                color: 'rgba(255,255,255,.7)',
                                fontSize: 16
                            }
                        },
                        legend: {
                            show: false,
                            orient: 'vertical',
                            x: 'left',
                            data: ['强', '中', '弱'],
                            textStyle: {
                                color: '#f8f8f8'
                            }
                        },
                        toolbox: {
                            show: false
                        },
                        series: [
                            // {
                            //     name: '弱',
                            //     type: 'map',
                            //     mapType: 'china',
                            //     itemStyle: {
                            //         normal: {
                            //             borderColor: 'rgba(100,149,237,1)',
                            //             borderWidth: 1.5,
                            //             areaStyle: {
                            //                 color:'rgba(0,0,0,.1)'
                            //             }
                            //         }
                            //     },
                            //     data: [],
                            //     markPoint: {
                            //         symbolSize: 2,
                            //         large: true,
                            //         effect: {
                            //             show: true
                            //         },
                            //         data: (function () {
                            //             var data = [];
                            //             var len = 3000;
                            //             var geoCoord
                            //             while (len--) {
                            //                 geoCoord = placeList[len % placeList.length].geoCoord;
                            //                 // var x = geoCoord[0]-0 + Math.random() * 1 - 0.5;
                            //                 // var y = geoCoord[1]-0 + Math.random() * 2 - 0;
                            //                 var x = geoCoord[0]-0 + Math.random() * 0.5 - 0.25;
                            //                 var y = geoCoord[1]-0 + Math.random() * 2 - 0;
                            //                 if (that.ptInPolygon(x, y)) {
                            //                     data.push({
                            //                         name: placeList[len % placeList.length].name + len,
                            //                         value: 50,
                            //                         geoCoord: [
                            //                             x,
                            //                             y
                            //                         ]
                            //                     })
                            //                 }
                            //             }
                            //             // console.log('若',data)
                            //             return data;
                            //         })()
                            //     }
                            // },
                            // {
                            //     name: '中',
                            //     type: 'map',
                            //     mapType: 'china',
                            //     data: [],
                            //     markPoint: {
                            //         // symbolSize: 3,
                            //         symbolSize: 2,
                            //         large: true,
                            //         effect: {
                            //             show: true
                            //         },
                            //         data: (function () {
                            //             var data = [];
                            //             var len = 1000;
                            //             var geoCoord
                            //             while (len--) {
                            //                 geoCoord = placeList[len % placeList.length].geoCoord;
                            //                 // var x = geoCoord[0]-0 + Math.random() * 5 - 2.5;
                            //                 // var y = geoCoord[1]-0 + Math.random() * 3 - 1.5;
                            //                 var x = geoCoord[0]-0 + Math.random() * 1 - 0.5;
                            //                 var y = geoCoord[1]-0 + Math.random() * 1 - 0.5;
                            //                 if (that.ptInPolygon(x, y)) {
                            //                     data.push({
                            //                         name: placeList[len % placeList.length].name + len,
                            //                         // value: 50,
                            //                         value: 20,
                            //                         geoCoord: [
                            //                             x,
                            //                             y
                            //                         ]
                            //                     })
                            //                 }
                            //             }
                            //             // console.log('中',data)
                            //             return data;
                            //         })()
                            //     }
                            // },
                            {
                                name: '强',
                                type: 'map',
                                mapType: 'china',
                                hoverable: false,
                                roam: true,
                                    itemStyle: {
                                        normal: {
                                            borderColor: 'rgba(100,149,237,1)',
                                            borderWidth: 1.5,
                                            areaStyle: {
                                                color:'rgba(0,0,0,.1)'
                                            }
                                        }
                                    },
                                data: [],
                                markPoint: {
                                    symbol: 'diamond',
                                    // symbolSize: 6,
                                    symbolSize: 5,
                                    large: true,
                                    effect: {
                                        show: true
                                    },
                                    data: (function () {
                                        var data = [];
                                        var len = placeList.length;
                                        while (len--) {
                                            data.push({
                                                name: placeList[len].name,
                                                value: 90,
                                                geoCoord: placeList[len].geoCoord
                                            })
                                        }
                                        // console.log('强',data)
                                        return data;
                                    })()
                                }
                            }
                        ]
                    };
            myChart2.setOption(option2);
        },
        ptInPolygon(lng, lat) {
            var pts = CreateChinaMapLine();

            var ply = new BMap.Polygon(pts);

            var pt = new BMap.Point(lng, lat);

            var result = BMapLib.GeoUtils.isPointInPolygon(pt, ply);

            if (result == true) {
            return true;
            } else {
            return false;
            }
        }
    }
}
</script>

<style lang="less" scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>