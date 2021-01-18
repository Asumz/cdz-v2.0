<template>
  <div>
    <el-card class="box-card" v-if="!['03','04','07'].includes(hwVerson)" id="sysParmas_card">
      <div slot="header" class="clearfix">
        <span>系统参数表</span>
      </div>
      <el-table
        :data="systemParamer"
        :span-method="arraySpanMethod"
        border
        fit
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
      >
        <el-table-column prop="type" label="类型" min-width="300"></el-table-column>
        <el-table-column prop="val" label="数值" min-width="120">
          <template slot-scope="{row}">
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :step="20"
              v-if="['coinMin','cardMin'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :precision="1"
              :step="1"
              v-if="['coinElec','cardElec'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :precision="1"
              :step="1"
              v-if="['cst'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :step="50"
              v-if="['powerMax1','powerMax2','powerMax3','powerMax4'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :step="5"
              v-if="['powerTim2','powerTim3','powerTim4'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :step="1"
              :step-strictly="true"
              v-if="['spRecMon','spFullEmpty'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :step="10"
              v-if="['fullPowerMin'].includes(row.type_key)"
            ></el-input-number>
            <el-input-number
              size="small"
              :max="row.maxVal"
              :min="row.minVal"
              v-model="row.val"
              :step="10"
              v-if="['fullChargeTime'].includes(row.type_key)"
            ></el-input-number>
            <!-- <el-input-number @change="handleChange"  class="lastInput" style="width: 130px; text-align: center;" size="small"  v-model="row.val"   v-if="['elecTimeFirst1'].includes(row.type_key)"></el-input-number> -->
            <el-input
              size="small"
              @change="handleChange"
              class="lastInput"
              style="width: 130px; text-align: center;"
              v-model="row.val"
              v-if="['elecTimeFirst1'].includes(row.type_key)"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="unit" label="单位" min-width="100"></el-table-column>
        <el-table-column prop="maxVal" label="最大值" min-width="120"></el-table-column>
        <el-table-column prop="minVal" label="最小值" min-width="120"></el-table-column>
      </el-table>
      <div class="remoteChargeTit" style="margin-top: 15px ; overflow: hidden; text-align: center;">
        <el-button
          type="primary"
          size="mini"
          style="float: left; margin-left: 30%;"
          @click="getDeviceSysParam"
        >读取系统参数</el-button>
        <TemMulDevice2 :deviceInfo="deviceInfo" @getDeviceList="getDeviceList" />
        <el-button
          type="success"
          size="mini"
          style="float: right; margin-right: 30%;"
          @click="saveDeviceSysParam"
        >保存系统参数</el-button>
      </div>
    </el-card>

    <!-- 复用系统参数弹框 -->

    <transition name="el-fade-in-linear">
      <div v-show="alserShow" class="sysAlert transition-box">
        <el-row>
          <el-col :xs="6" :sm="6" :md="8" :lg="8">&nbsp;</el-col>
          <el-col :xs="12" :sm="12" :md="8" :lg="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>正在依次设置设备的系统参数</span>
                <el-button
                  type="danger"
                  plain
                  style="float:right;"
                  size="mini"
                  @click="removeSysMui"
                >取消设置</el-button>
              </div>

              <div>
                <el-table
                  :data="list"
                  border
                  fit
                  style="width: 100%"
                  :max-height="warpHeight"
                  :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                  ref="tabSetSys"
                >
                  <el-table-column prop="code" label="设备号" width="100">
                    <template slot-scope="scope">
                      <el-link
                        :underline="false"
                        :type="index== scope.$index ? 'primary' : '' "
                      >{{scope.row.code}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="remark" label="设备名" min-width="80">
                    <template slot-scope="scope">
                      <div
                        class="oveflow_ecllipsis"
                        :class="{active : index== scope.$index}"
                      >{{ scope.row.remark == null ? '— —' : scope.row.remark }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="areaname" label="所属小区" min-width="80">
                    <template slot-scope="scope">
                      <div
                        class="oveflow_ecllipsis"
                        :class="{active : index== scope.$index}"
                      >{{ scope.row.areaname == null ? '— —' : scope.row.areaname }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="操作状态" min-width="80">
                    <template slot-scope="scope">
                      <el-link
                        :underline="false"
                        :type="index== scope.$index ? 'primary' : scope.row.status == 0 ? 'info' : scope.row.status == 1 ? 'success' : 'danger' "
                      >
                        <div v-if="index== scope.$index">
                          <span class="el-icon-loading" style="font-size: 16px; margin-right: 5px;"></span>设置中
                        </div>
                        <span
                          v-else
                        >{{scope.row.status == 0 ? '' : scope.row.status == 1 ? '设置成功' : '设置失败' }}</span>
                      </el-link>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="6" :sm="6" :md="8" :lg="8">&nbsp;</el-col>
        </el-row>
      </div>
    </transition>
    <!-- 复用系统模板结束时显示 -->

    <el-dialog title="批量设置系统参数完成" :visible.sync="msgboxVis" :before-close="handleClose" width="30%">
      <div v-if="handleClose">
        <div style="font-weight: 700;">设置成功：</div>
        <div style="margin-top: 5px;">
          <span v-for="(item,i) in list" :key="i">
            <span v-if="item.status== 1" style="margin-left: 6px; color: #67c23a;">{{item.code}}</span>
          </span>
        </div>
        <div style="margin-top: 20px;font-weight: 700;">设置失败：</div>
        <div style="margin-top: 5px;">
          <span type="danger" v-for="(jtem,j) in list" :key="j">
            <span v-if="jtem.status != 1" style="margin-left: 6px; color: #f56c6c;">{{jtem.code}}</span>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="msgboxVis = false;alserShow=false" size="small">取 消</el-button>
        <el-button type="primary" @click="msgboxVis = false;alserShow=false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 复用系统模板结束时显示 -->
  </div>
</template>

<script>
import { Loading, Button } from "element-ui";
import TemMulDevice2 from "@/components/common/TemMulDevice2";
import { getsystemParma, savesystemParma } from "@/require/deviceManage";
import { alertPassword, messageTip, alertConfim } from "@/utils/ele";
export default {
  props: {
    systemParamer: Array,
    deviceInfo: Object,
    hwVerson: String,
    code: String,
    elecTimeFirst:Number
  },
  data() {
    return {
		loading: null,
		list: [], //默认选中的设备，进行复用系统参数 0,默认 1，成功 2，失败  {code:'000001',status: 0 }
		index: 0, //当前循环的索引
		topIndex: 0, //默认向上滚动的数量
		alserShow: false,
		warpHeight: 500, //复用系统参数的表格高度
		msgboxVis: false
    };
  },
	components: {
		TemMulDevice2
	},
  	beforeDestroy(){
		this.Loading && this.Loading.close()
	},
	deactivated(){
		this.Loading && this.Loading.close()
	},
	methods: {
		arraySpanMethod({ row, column, rowIndex, columnIndex }) {
		if (rowIndex == 16) {
			if (columnIndex === 3) {
			return [3, 2];
			}
		}
		},
		getDeviceSysParam() {
			//获取设备的系统参数信息
			let loading = Loading.service({
				lock: true,
				text: "加载中",
				spinner: "el-icon-loading",
				customClass: "loadClass"
			});
			this.Loading = loading;
			getsystemParma({ code: this.code })
				.then(res => {
					loading.close();
					if (res.wolfcode == "1001") {
						messageTip("error", "系统参数获取失败");
						return;
					} else {
						messageTip("success", "参数获取获取成功");
						let systemParamer = JSON.parse(JSON.stringify(this.systemParamer));
						let newSystemParmamer = systemParamer.map((item, i) => {
						console.log(res["param" + (i + 1)] / 10);
						if (i == 2 || i == 3 || i == 4) {
							item.val = isNaN(res["param" + (i + 1)] / 10)
							? undefined
							: res["param" + (i + 1)] / 10;
						} else {
							item.val = res["param" + (i + 1)];
						}
						  return item;
						});
						this.$emit("changeSystemParamerCallBack", newSystemParmamer);
					}
				})
				.catch(err => {
					loading.close();
				});
		},
		saveDeviceSysParam() {
			//保存系统参数
			let loading = Loading.service({
				lock: true,
				text: "设置中",
				spinner: "el-icon-loading",
				customClass: "loadClass"
			});
			this.Loading = loading;
			let systemParamer = JSON.parse(JSON.stringify(this.systemParamer));
			let parmas = {};
			for (const iterator of systemParamer) {
				if (["coinElec", "cardElec", "cst"].includes(iterator.type_key)) {
				parmas[iterator.type_key] = iterator.val.toFixed(1);
				} else {
				parmas[iterator.type_key] = iterator.val;
				}
			}
			savesystemParma({
				code: this.code,
				elecTimeFirst: this.elecTimeFirst,
				...parmas
			})
			.then(res => {
				loading.close();
				if (res.wolfcode == "1001") {
				messageTip("error", "系统参数设置失败");
				return;
				}
				messageTip("success", "系统参数设置成功");
				})
			.catch(err => {
				loading.close();
				});
		},
		getDeviceList(list) {
			//接收系统参数复用子组件穿的值
			// 初始化值
			this.list = list;
			this.index = 0;
			this.topIndex = 0;
			this.alserShow = true;
			this.requireSystemByCode(this.index);
		},
		handleChange() {
			this.systemParamer.filter((item, i) => {
				if (item.type_key == "elecTimeFirst1") {
					if (parseInt(item.val) <= 0) {
						item.val = 0;
					} else if (parseInt(item.val) >= 255) {
						item.val = 255;
					} else {
						item.val = 1;
					}
				}
				return item;
			});
		},
		removeSysMui(){ //点击取消系统参数复用
			alertConfim('确认取消设置系统参数复用吗？',()=>{
				this.index= this.list.length
				this.clearToken()
			})          
		},
		handleClose(){
			this.msgboxVis= false
			this.alserShow= false
		},
		requireSystemByCode(){ //发送请求，依次修改系统参数
				if(this.index < 0) return
				let wrapEle= this.$refs.tabSetSys.bodyWrapper
				let wrapHeight= wrapEle.offsetHeight > 100 ?  wrapEle.offsetHeight : 100  //滚动高度,第一次还没渲染好，第一次高度为0，为0时，高度设置100，为了下面对比做准备
				let trHeight= 50
				try {
					trHeight= wrapEle.getElementsByClassName('el-table__row')[0].offsetHeight //有就用tr的高度，否则就trHeight为50
				}catch(e){
					trHeight= 50
				}

				let systemParamer=  this.systemParamer
				let parmas= {}
				for (const iterator of systemParamer) {
					if(['coinElec','cardElec','cst'].includes(iterator.type_key)){
						parmas[iterator.type_key]= iterator.val.toFixed(1)
					}else{
						parmas[iterator.type_key]= iterator.val
					}
				
				}
				savesystemParma({code: this.list[this.index].code ,elecTimeFirst: this.elecTimeFirst,...parmas}).then(res=>{
					if (res.wolfcode == "1001") {
						messageTip('error',`${this.list[this.index].code}设备 系统参数设置失败`)
						this.list[this.index].status= 2
					}else{
						messageTip('success',`${this.list[this.index].code}设备 系统参数设置成功`)
						this.list[this.index].status= 1
					}
					if(this.index*trHeight >= wrapHeight/2){
						this.topIndex++
						console.log(this.topIndex,this.topIndex*trHeight)
						wrapEle.scrollTop= this.topIndex*trHeight
					}
					this.index++
					if(this.index <= this.list.length-1){
						this.requireSystemByCode()
					}else{ //结束请求
						this.msgboxVis= true
					} 

				}).catch(err=>{
					if(this.index*trHeight >= wrapHeight/2){
						this.topIndex++
						wrapEle.scrollTop= this.topIndex*trHeight
					}
					let _this= this
					try {
					_this.list[_this.index].status= 2  
					} catch (error) {
						
					}
					//  this.list[this.index].status= 2
					this.index++
					if(this.index <= this.list.length-1){
						this.requireSystemByCode()
					}else{ //结束请求
					this.msgboxVis= true
					}
				})
			},
	}
};
</script>

<style>
</style>