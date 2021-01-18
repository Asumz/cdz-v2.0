<template>
    <div class="site-map">
        <el-row :gutter="10" type="flex" justify="space-between">
            <el-col v-for="(item, i) in mockData" :key="i">
                <el-card class="box-card color-card" :style="{ 'border-left-color': color[i] }">
                    <p class="number" :style="{ color: color[i] }">
                        {{ item.num }}
                    </p>
                    <p class="item">{{ item.name }}</p>
                </el-card>
            </el-col>
        </el-row>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>站点分布</span>
            </div>
            <div id="map">
                <baidu-map
                    class="map"
                    ak="这里填你的百度秘钥"
                    :zoom="zoom"
                    :center="center"
                    @ready="mapInit"
                    :map-click="false"
                    :scroll-wheel-zoom="true"
                >
                    <!-- 渲染视图容器: 若没有则默认为baidu-map -->
                    <bm-view class="map"></bm-view>
                    <!-- 城市选择控件 -->
                    <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
                    <!--比例尺控件-->
                    <bm-scale
                        anchor="BMAP_ANCHOR_BOTTOM_LEFT"
                        :offset="{ width: 100, height: 25 }"
                    ></bm-scale>
                    <!--缩放控件-->
                    <bm-navigation
                        anchor="BMAP_ANCHOR_TOP_RIGHT"
                        :enableGeolocation="true"
                    ></bm-navigation>
                    <!-- 缩略图控件 -->
                    <bm-overview-map
                        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                        :isOpen="true"
                    ></bm-overview-map>
                    <bm-marker-clusterer :averageCenter="true">
                        <bm-marker
                            v-for="(marker, i) of markers"
                            :key="i"
                            :position="marker"
                            @click="infoWindowOpen(marker)"
                        >
                            <!-- 信息窗体 -->
                            <bm-info-window
                                :show="marker.show"
                                @close="infoWindowClose(marker)"
                                @open="infoWindowOpen(marker)"
                            >
                                <p>名称: {{ marker.name }}</p>
                                <p>地址: {{ marker.address }}</p>
                                <p :style="{ color: mapColor(marker.build_status) }">
                                    状态:
                                    {{
                                        marker.build_status == 1
                                            ? "待建设"
                                            : marker.build_status == 2
                                            ? "建设中"
                                            : marker.build_status == 3
                                            ? "待验收"
                                            : marker.build_status == 4
                                            ? "已运营"
                                            : "异常"
                                    }}
                                </p>
                            </bm-info-window>
                        </bm-marker>
                    </bm-marker-clusterer>
                </baidu-map>
            </div>
        </el-card>
    </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmOverviewMap from "vue-baidu-map/components/controls/OverviewMap";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMarkerClusterer from "vue-baidu-map/components/extra/MarkerClusterer";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import BmCityList from "vue-baidu-map/components/controls/CityList";
import { getMapAreaTotal } from "@/require/datastatis";

export default {
    name: "SiteMap",
    components: {
        BaiduMap,
        BmView,
        BmScale,
        BmOverviewMap,
        BmNavigation,
        BmMarkerClusterer,
        BmMarker,
        BmInfoWindow,
        BmCityList,
    },
    data() {
        return {
            center: { lng: 121.482537, lat: 31.236552 }, // 上海市
            zoom: 10,
            markers: [],
            map: null, // 地图实例抛出
            mockData: [
                { name: "累计站点数", num: 0, class: "" },
                { name: "运营中站点数", num: 0, class: "c-success" },
                { name: "待验收站点数", num: 0, class: "c-warning" },
                { name: "建设中站点数", num: 0, class: "c-primary" },
                { name: "待建设站点数", num: 0, class: "c-danger" },
            ],
            color: ["#909399", "#67C23A", "#E6A23C", "#409EFF", "#F56C6C"],
        };
    },
    mounted() {
        this.asyGetData();
    },
    methods: {
        mapColor(status) {
            let color;
            switch (status) {
                case 4:
                    color = "#67C23A";
                    break;
                case 3:
                    color = "#E6A23C";
                    break;
                case 2:
                    color = "#409EFF";
                    break;
                case 1:
                    color = "#F56C6C";
                    break;
                default:
                    color = "#909399";
                    break;
            }
            return color;
        },
        infoWindowClose(marker) {
            this.$set(marker, "show", false);
        },
        infoWindowOpen(marker) {
            this.$set(marker, "show", true);
        },
        //地图初始化
        mapInit({ BMap, map }) {
            // 地图组件渲染完毕时触发，返回一个百度地图的核心类和地图实例。百度地图组件是异步加载，请不要尝试在组件的生命周期中访问 BMap 核心类和 map 实例
            // console.log('Bmap::', BMap, 'map::', map)
            // this.map = map;
            // var points = []; // 转换格式后的坐标
            // var newPoints = []; // 用于传入回调的坐标组
            // this.markers.map(item => {
            //     points.push(new BMap.Point(item.lng, item.lat));
            // });
            // // console.log('ponits::', points)
            // // points 最大受限传入长度为10, 这很离谱😒, 因此把它截取长度为10的数组依次传入回调
            // for (var i = 0; i < points.length; i++) {
            //     if (!(i % 10)) {
            //         // 0,10,20...
            //         newPoints[i / 10] = points.slice(i, i + 10); // 创建二维数组
            //     }
            // }
            // // console.log('newPo::',newPoints)
            // newPoints.map((item, i) => {
            //     new BMap.Convertor().translate(
            //         item,
            //         1,
            //         5,
            //         // 坐标转换
            //         data => {
            //             // console.log("data::", data);
            //             if (data.status === 0) {
            //                 for (var j = 0; j < data.points.length; j++) {
            //                     this.markers[i * 10 + j].lng = data.points[j].lng;
            //                     this.markers[i * 10 + j].lat = data.points[j].lat;
            //                 }
            //             }
            //         }
            //     );
            // });
        },
        // 获取数据
        async asyGetData() {
            try {
                let res = await getMapAreaTotal();
                if ( res.code === 0 && res.data ) {
                    this.mockData[0].num = res.data.total;
                    this.mockData[1].num = res.data.runingCount;
                    this.mockData[2].num = res.data.waitRunCount;
                    this.mockData[3].num = res.data.buildingCount;
                    this.mockData[4].num = res.data.waitBuildCount;
                    this.markers = res.data.areaList;
                    this.markers.map(item => {
                        this.$set(item, "lng", item.lon);
                    });
                }
            } catch (error) {
                throw error;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.site-map {
    padding: 20px;
    // background: #edeff1;
}
#map {
    width: 100%;
    height: 600px;
}
.map {
    width: 100%;
    height: 100%;
}
.item {
    color: #666;
    font-size: 14px;
}
.number {
    color: #0b1d2c;
    font-size: 26px;
    line-height: 37px;
    font-family: Helvetica Neue;
    font-weight: 700;
}
.color-card {
    border-left-width: 5px;
    border-left-style: solid;
}
</style>
