<template>
  <div class="handleLog">
    <el-card class="box-card card_bottom0 cardForm">
      <el-form :inline="true" class="demo-form-inline" :model="handleLogForm" size="mini">
        <el-form-item label="设备号" class="form_right25 w100">
          <el-input v-model="handleLogForm.devicenum" placeholder="设备号" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="商户名" class="form_right25 w120">
          <el-input v-model="handleLogForm.dealernick" placeholder="商户名" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="商户电话" class="form_right25 w120">
          <el-input v-model="handleLogForm.phone" placeholder="商户电话" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作人昵称" class="form_right25 w120">
          <el-input v-model="handleLogForm.nickname" placeholder="操作人昵称" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="操作人名字" class="form_right25 w120">
          <el-input v-model="handleLogForm.username" placeholder="操作人名字" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" class="form_right25 w200">
          <el-date-picker
            v-model="handleLogForm.startTime"
            size="small"
            type="datetime"
            placeholder="选择开始时间"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" class="form_right25 w200">
          <el-date-picker
            v-model="handleLogForm.endTime"
            size="small"
            type="datetime"
            placeholder="选择结束时间"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form_margin0 content_btn">
          <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table
        :data="tableData"
        border
        fit
        v-loading="loading"
        style="width: 100%"
        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
      >
        <el-table-column prop="operate_time" label="记录时间" min-width="140">
          <template slot-scope="{row}">{{row.operate_time | fmtDate }}</template>
        </el-table-column>
        <el-table-column prop="code" label="设备号" min-width="100"></el-table-column>
        <el-table-column prop="dealer" label="归属商户" min-width="140">
          <template slot-scope="{row}">
            <span v-if="row.dealer && row.dealer.length> 0">{{row.dealer}}</span>
            <span v-else>— —</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealerphone" label="商户电话" min-width="120">
          <template slot-scope="{row}">
            <span v-if="row.dealerphone && row.dealerphone.length> 0">{{row.dealerphone}}</span>
            <span v-else>— —</span>
          </template>
        </el-table-column>
        <el-table-column prop="handlePerson" label="操作人" min-width="120">
          <template slot-scope="{row}">
            <span v-if="row.opername && row.opername.length> 0">{{row.opername}}</span>
            <span v-else>{{  row.opernick && row.opernick.length> 0 ? row.opernick : '— —'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="120">
          <template slot-scope="{row}">
            <span v-if="row.sort==1">{{row.type == 1 ? '上线' : row.type == 2 ? '下线' : '— —'}}</span>
            <span v-if="row.sort==2">{{row.type == 1 ? '绑定' : row.type == 2 ? '解绑' : '— —'}}</span>
            <span v-if="row.sort==3">{{row.type == 1 ? '修改版本号' : row.type == 2 ? '修改收费模板' : '— —'}}</span>
            <span v-if="row.sort==4">{{row.type == 1 ? '绑定小区' : row.type == 2 ? '解绑小区' : '— —'}}</span>
            <span v-if="row.sort==5">IMEI号互换</span>
            <span v-if="row.sort==6">批量转移设备</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="160">
          <template slot-scope="{row}">
            <div v-if="row.sort === 5">
              <div>
                <el-link type="success">{{ JSON.parse(row.remark)[0]}}</el-link>&nbsp;&nbsp;({{ JSON.parse(row.remark)[1]}})
              </div>
              <span class="el-icon-sort rotate90"></span>
              <div>
                  <el-link type="success">{{ JSON.parse(row.remark)[2]}}</el-link>&nbsp;&nbsp;({{ JSON.parse(row.remark)[3]}})
              </div>
            </div>
            <div v-if="row.sort === 6">
              {{ row.remark }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
  </div>
</template>

<script>
import MyPagination from "@/components/common/MyPagination";
import dateTimeJS from "@/utils/dateTime";
import { getDeviceHandleLogInfo } from "@/require/deviceManage";
import Util from "@/utils/util";
export default {
  data() {
    return {
      handleLogForm: {},
      pickerOptions: dateTimeJS,
      tableData: [],
      loading: false,
      totalPage: 1,
      nowPage: 1
    };
  },
  components: {
    MyPagination
  },
  created() {
    let { VNK, ...routerKey } = this.$route.query;
    if (JSON.stringify(routerKey) != "{}") {
      if (Util.checkKeyOnlyObj("devicenum", routerKey)) {
        //从设备管理进来的 栏没有参数的时候（第一次进入的时候）
        let [startTime, endTime] = Util.formatTimeArr();
        this.handleLogForm = { startTime, endTime, ...routerKey };
      } else {
        this.handleLogForm = { ...routerKey };
        this.nowPage = parseInt(this.handleLogForm.currentPage) || 1;
      }
    } else {
      //直接点击进来的
      let [startTime, endTime] = Util.formatTimeArr();
      this.handleLogForm = { startTime, endTime };
    }
    this.asyGetDeviceHandleLogInfo(this.handleLogForm);
  },
  methods: {
    getPage(page) {
      this.handleLogForm = { ...this.handleLogForm, currentPage: page };
      this.$router.push({ query: this.handleLogForm });
      this.asyGetDeviceHandleLogInfo(this.handleLogForm);
      this.nowPage = page;
    },
    async asyGetDeviceHandleLogInfo(data) {
      let _this = this;
      try {
        _this.loading = true;
        let handleInfo = await getDeviceHandleLogInfo(data);
        _this.loading = false;
        if (handleInfo.code === 200) {
          _this.tableData = handleInfo.listdata;
          _this.totalPage = handleInfo.totalRows;
        }
      } catch (error) {
        if (error == "拦截请求") {
          _this.loading = true;
          return;
        }
        _this.loading = false;
      }
    },
    handleSearch() {
      this.$router.push({ query: { ...this.handleLogForm, currentPage: 1 } });
      this.asyGetDeviceHandleLogInfo({ ...this.handleLogForm, currentPage: 1 });
      this.nowPage = 1; //搜索完之后将nowPage置为1
    }
  }
};
</script>

<style lang="less">
.handleLog {
  .rotate90 {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }
}
</style>