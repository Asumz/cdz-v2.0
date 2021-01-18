<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i>{{ this.id ? "修改站点" : "新增站点" }}</i>
            </div>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                size="small"
                label-width="100px"
                label-position="right"
                style="width: 90%;"
            >
                <el-form-item label="站点名称" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" clearable></el-input>
                </el-form-item>
                <!-- <el-form-item label="经度" prop="lon">
                    <el-input v-model="form.lon" clearable></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="lat">
                    <el-input v-model="form.lat" clearable></el-input>
                </el-form-item> -->
                <el-form-item label="计费模板" prop="tempid">
                    <el-select v-model="form.tempid" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        >
                            <i style="float: left">{{ item.name }}</i>
                            <i style="float: right; color: #8492a6;">{{ item.billver }}</i>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="建设状态" prop="buildStatus">
                    <el-select v-model="form.buildStatus" filterable placeholder="请选择">
                        <el-option label="待建设" :value="1"></el-option>
                        <el-option label="建设中" :value="2"></el-option>
                        <el-option label="待验收" :value="3"></el-option>
                        <el-option label="已运营" :value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="设备位置" prop="areaPlace">
                    <el-select v-model="form.areaPlace" filterable placeholder="请选择">
                        <el-option label="地面" :value="1"></el-option>
                        <el-option label="地下" :value="2"></el-option>
                        <el-option label="地面、地下" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="站点图片" prop="areaImg">
                    <Upload v-model="form.areaImg" />
                </el-form-item>

                <el-form-item label="站点坐标">
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
                        <bm-marker
                            :position="marker"
                            dragging
                            @click="infoWindowOpen"
                            @dragend="dragend"
                        >
                            <!-- 信息窗体 -->
                            <bm-info-window
                                :show="show"
                                @close="infoWindowClose"
                                @open="infoWindowOpen"
                            >
                                <p>经度: {{ form.lon }}</p>
                                <p>纬度: {{ form.lat }}</p>
                            </bm-info-window>
                        </bm-marker>
                    </baidu-map>
                    <i class="c-info font-12">*拖拽选取站点具体位置</i>
                </el-form-item>

                <el-form-item>
                    <el-button icon="el-icon-finished" type="primary" @click="submitForm('form')"
                        >提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import BmView from "vue-baidu-map/components/map/MapView";
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmOverviewMap from "vue-baidu-map/components/controls/OverviewMap";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import BmMarker from "vue-baidu-map/components/overlays/Marker";
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow";
import BmCityList from "vue-baidu-map/components/controls/CityList";
import { checkNumber, checkEmpty } from "@/utils/ele";
import {
    selectAreaById,
    addCommunInfo,
    updateCommunInfo,
    selectBillver,
} from "@/require/siteManage";

export default {
    name: "siteList-edit",
    components: {
        BaiduMap,
        BmView,
        BmScale,
        BmOverviewMap,
        BmNavigation,
        BmMarker,
        BmInfoWindow,
        BmCityList,
    },
    data() {
        return {
            options: [],
            zoom: 10,
            show: false,
            center: { lng: 121.482537, lat: 31.236552 }, // 上海市
            marker: { lng: 121.482537, lat: 31.236552 }, // 上海市
            form: {},
            rules: {
                name: [{ required: true, validator: checkEmpty, trigger: "blur" }],
                // lon: [{ required: true, validator: checkNumber, trigger: "blur" }],
                // lat: [{ required: true, validator: checkNumber, trigger: "blur" }],
            },
        };
    },
    computed: {
        id() {
            return this.$route.query.id;
        },
    },
    async created() {
        this.asySelectBillver();
        this.id && (await this.query({ id: this.id }));
        let { lon, lat } = this.form;
        if (lon && lat) {
            this.marker = this.center = { lng: lon, lat };
        } else {
            this.form.lon = this.marker.lng;
            this.form.lat = this.marker.lat;
        }
    },
    methods: {
        //地图初始化
        mapInit({ BMap, map }) {},
        async query(data) {
            try {
                let res = await selectAreaById(data);
                if (res.code === 0) {
                    this.form = res.data;
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        infoWindowClose() {
            this.show = false;
        },
        infoWindowOpen(marker) {
            this.show = true;
        },
        dragend(type, target, pixel, point) {
            // console.log({type, target, pixel, point})
            let { lng, lat } = type.point;
            this.form.lon = lng;
            this.form.lat = lat;
        },
        async manipulation(cb) {
            try {
                let res = await cb(this.form);
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    this.$router.replace("/siteManage/siteList");
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        // 为下拉框添加选项
        async asySelectBillver() {
            let res = await selectBillver();
            if (res.code === 0) {
                this.options = res.data;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.id) {
                        this.manipulation(updateCommunInfo);
                    } else {
                        this.manipulation(addCommunInfo);
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.map {
    width: 100%;
    height: 600px;
}
</style>
