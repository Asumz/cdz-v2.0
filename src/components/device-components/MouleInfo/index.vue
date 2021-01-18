<template>
  <div>
    <el-card class="box-card" id="module_card">
      <div slot="header" class="clearfix">
        <span v-if="fromType !== 2">模块信息（硬件，软件，IMEI, +CCID）</span>
        <span v-else>模块信息（硬件，软件）</span>
      </div>
      <el-table
        :data="moduleInfo"
        border
        fit
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
      >
        <el-table-column prop="title1" label="设备信息" min-width="80">
          <template slot-scope="{row}">
            <span style="font-weight:600;">{{row.title1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content1" label="信息" min-width="140">
          <template slot-scope="{row}">
            <span v-if="row.title1 == '硬件版本'">
              {{row.content1}}
              <span>&nbsp;&nbsp;{{ row.content1 == '00' ? '出厂默认设置' : row.content1 == '01' ? '十路智慧款': row.content1 == '02' ? '电轿款' : row.content1 == '03' ? '脉冲板子' : row.content1 == '04' ? '离线充值机' : row.content1 == '05' ? '十六路智慧款' : row.content1 == '06' ? '二十路智慧款' : row.content1 == '07' ? '单路交流桩' : '' }}</span>
            </span>
            <span v-else-if="row.title1 == '硬件版本号'">
              {{row.content1}}
              <span>&nbsp;&nbsp;{{ row.content1 == '00' ? '2G模块' : row.content1 == '01' ? '4G模块': row.content1 == '02' ? '蓝牙模块' : row.content1 == '03' ? '合宙2G模块' : '' }}</span>
            </span>
            <span v-else>{{row.content1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title2" label="主板信息" min-width="80">
          <template slot-scope="{row}">
            <div>
              <span style="font-weight:600;">{{row.title2}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content2" label="信息" min-width="140">
          <template slot="header" slot-scope="scope">
            信息 &nbsp;&nbsp;&nbsp;&nbsp;
            <el-button
              :icon="scope.column.get ? 'el-icon-loading' : 'el-icon-refresh-right'"
              type="primary"
              size="mini"
              plain
              @click="getBoardInfo(scope.column)"
              v-if="fromType !== 2"
            >更新</el-button>
          </template>
          <template slot-scope="{row}">
            <el-button
              type="primary"
              size="mini"
              v-if="row.title2 === '升级通知'"
              icon="el-icon-bell"
              @click="handleUpdateTip"
            >升级通知</el-button>
            <el-button
              type="primary"
              size="mini"
              v-if="row.title2 === '发送升级程序'"
              icon="el-icon-message"
              @click="handleSendUpdateInfo"
            >发送升级程序</el-button>
            <span v-else>{{row.content2}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title3" label="位置信息" min-width="80">
          <template slot-scope="{row}">
            <span style="font-weight:600;">{{row.title3}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content3" label="信息" min-width="140">
          <template slot-scope="{row}">
            <el-button
              v-if="row.title3 == '查看地图'"
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="handleScanMap"
            >查看地图</el-button>
            <el-button
              v-else-if="row.title3 == '更新经纬度'"
              type="primary"
              size="mini"
              icon="el-icon-position"
              @click="upDatePosition"
            >更新经纬度</el-button>
            <span v-else>{{row.content3}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 地图弹框 -->
    <el-dialog :title="`${code}设备位置信息`" :visible.sync="dialogVisible" custom-class="mapDialog">
      <!-- [{position: [112.421181,35.989792]},{position: [116.481181,35.989792]}] -->
      <!-- <el-amap :vid="'amap-vue'" ref="tt"></el-amap> -->
      <el-amap vid="amapDemo" :plugin="mapPlugin">
        <el-amap-marker
          v-for="(marker) in mapList"
          :position="marker.position"
          :key="marker.position[0]"
          v-if="marker.position[0] != null"
        ></el-amap-marker>
        <el-amap-info-window
          v-for="(marker) in mapList"
          :position="marker.position"
          :key="marker.position[1]"
          :content="marker.content"
          :visible="true"
          :offset="[0,-28]"
          v-if="marker.position[0] != null"
        ></el-amap-info-window>
      </el-amap>
    </el-dialog>
  </div>
</template>

<script>
let loading= null
import {
  getBoardInfoRotate,
  updateMapPosition,
  sendUpdataTip,
  sendUpdataInfo
} from "@/require/deviceManage";
import { alertPassword, messageTip, alertConfim } from "@/utils/ele";
import VueAMap from "vue-amap";
import { lazyAMapApiLoaderInstance } from 'vue-amap';
import Utils from '@/utils/util'
export default {
  data() {
    return {
	  dialogVisible: false, //地图默认隐藏
      mapPlugin: [
        //地图插件配置
        {
          pName: "OverView",
          events: {}
        },
        {
          pName: "Scale",
          events: {}
        },
        {
          pName: "ToolBar",
          events: {}
        }
      ],
      mapList: [],
    };
  },
  props: {
      moduleInfo: Array,
      code: String,
      mapInfo: Array,
      fromType: Number //2是蓝牙设备，其他是非蓝牙设备
  },
  created() {
    Vue.use(VueAMap);
    VueAMap.initAMapApiLoader({
      key: "2c85f8508cc8c9c37829d4609cd8cad1",
      plugin: [
        "AMap.Autocomplete",
        "AMap.PlaceSearch",
        "AMap.Scale",
        "AMap.OverView",
        "AMap.ToolBar",
        "AMap.MapType",
        "AMap.PolyEditor",
        "AMap.CircleEditor"
      ],
      v: "1.4.4"
    });
    lazyAMapApiLoaderInstance.load().then(() => {
      // your code ...
      // this.map = new AMap.Map('tt', {
      //     center: new AMap.LngLat(121.59996, 31.197646)
      // });
    });
  },
  mounted(){
    loading= new Utils.Hd_Loading({
      text: '发送中'
    })
  },
	methods: {
		getBoardInfo(row) {
		//获取主板信息
			Vue.set(row, "get", true);
			getBoardInfoRotate({
			code: this.code
			})
			.then(res => {
				if (res.wolfcode == 1001) {
					messageTip("error", res.wolfmsg || "请求超时，请稍后重试");
				} else {
					messageTip("success", "获取成功");
					this.moduleInfo[0].content2 = res.mainType; //主板版本
					this.moduleInfo[1].content2 = res.mainHardver; //主板硬件版本
					this.moduleInfo[2].content2 = res.mainSoftver; //主板软件版本
					this.moduleInfo[3].content2 = res.mainid;
				}
				Vue.set(row, "get", false);
			})
			.catch(err => {
				Vue.set(row, "get", false);
			});
		},
		handleScanMap() {
		//点击查看地图
			let longitude = this.mapInfo[0].content;
			let latitude = this.mapInfo[1].content;
			this.mapList = [
				{
					position: [longitude, latitude],
					content: `<div>设备: ${this.code}<div><p>地址： <p>`
				}
			];
			this.dialogVisible = true;
		},
		upDatePosition() {
		//更新地图信息
			updateMapPosition({ code: this.code })
				.then(res => {
					if (res == 1) {
						messageTip("success", "更新位置成功");
					} else {
						messageTip("error", "更新位置失败");
					}
				})
				.catch(err => {});
		},
		handleUpdateTip() {
      //设备升级通知
      loading.show()
      sendUpdataTip({ code: this.code })
      .then(res => {
				if (res.wolfcode == 1000) {
					messageTip("success", "通知成功");
				} else {
					messageTip("error", "通知失败");
        }
          loading.hide()
      }).catch(e=>{
          loading.hide()
      })  
		},
		handleSendUpdateInfo() {
      //发送升级程序
      loading.show()
      sendUpdataInfo()
      .then(res => {
				if (res.wolfcode == 1000) {
					messageTip("success", "发送升级程序成功");
				} else {
					messageTip("error", "发送升级程序失败");
        }
        loading.hide()
			}).catch(e=>{
        loading.hide()
      })
		}
	}
};
</script>

<style>
</style>