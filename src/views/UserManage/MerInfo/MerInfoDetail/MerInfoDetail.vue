<template>
  <div class="merInfoDetail">
    <el-card class="box-card" style="margin-bottom: 40px;">
      <el-divider content-position="center">
        转移
        <span class="merName">{{ name }}</span>下的用户和设备
      </el-divider>
      <el-row ref="row">
        <el-col :span="8">
          <div class="left_title">{{ name }}商户下的用户和设备</div>
          <div class="grid-content bg-purple">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="areaname" label="小区名称" min-width="100" show-overflow-tooltip>
                、
                <template
                  slot-scope="{row}"
                >{{row.areaname && row.areaname.length > 0 ? row.areaname : '— —'}}</template>
              </el-table-column>
              <el-table-column prop="userNum" label="用户数量" min-width="100">
                <template slot-scope="{row}">
                  <el-link type="primary">{{row.clientsnum}}</el-link>
                </template>
              </el-table-column>
              <el-table-column prop="deviceNum" label="设备数量" min-width="100">
                <template slot-scope="{row}">
                  <el-link type="primary">{{row.quantity}}</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple-light centerWarpper" ref="centerWarpper">
            <el-button type="primary" size="middle" @click="handleTransfer">
              批量转移到右边商户
              <i class="el-icon-d-arrow-right el-icon--right"></i>
            </el-button>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="search">
              <el-select v-model="merInfoDetailForm.type" size="small" placeholder="请选择">
                <el-option label="商户电话" value="1"></el-option>
                <el-option label="商户昵称" value="2"></el-option>
                <el-option label="商户姓名" value="3"></el-option>
              </el-select>
              <el-input v-model="merInfoDetailForm.search" size="small" placeholder="请搜索商户" />
              <el-button type="primary" size="small" @click="this.handleSearchMer">搜索</el-button>
            </div>
            <el-table :data="merInfo" style="width: 100%" border :show-header="false">
              <el-table-column prop="title" label="日期" min-width="180"></el-table-column>
              <el-table-column prop="content" label="姓名" min-width="180" show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="deleteBtn">
              <el-button type="danger" size="small" @click="handleRemoveMer">清除当前商户</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-divider content-position="center">
        配置
        <span class="merName">{{ name }}</span>特约商户信息
      </el-divider>
      <ConfigMerInfo :subMerData="subMerData" :merid="dealer" @handleReReq="handleReReq" />
    </el-card>
  </div>
</template>

<script>
import {
  selectMerinfoByid,
  selectMerDetailByMerid,
  transformMerToMer
} from "@/require/userManage";
import { messageTip, confirVNdom,alertConfim } from "@/utils/ele";
import ConfigMerInfo from './ConfigMerInfo'
export default {
  data() {
    return {
      dealer: 0,
      name: "",
      tableData: [],
      ToId: 0,
      merInfo: [
        {
          title: "商户姓名",
          content: ""
        },
        {
          title: "商户昵称",
          content: ""
        },
        {
          title: "电话",
          content: ""
        }
      ],
      merInfoDetailForm: {
        type: "1"
      },
      multipleSelection: [],
      subMerData: [] //特约商户配置
    };
  },
  components:{
    ConfigMerInfo
  },
  created() {
    const { dealer = 0, name = "" } = this.$route.query;
    this.dealer = dealer;
    this.name = name == "" ? dealer : name;
    this.asySelectAgentUnderMer({ merid: dealer });
  },
  mounted() {
    setTimeout(() => {
      this.$refs.centerWarpper.style.height =
        this.$refs.row.$el.offsetHeight + "px";
    });
  },
  methods: {
    async asySelectAgentUnderMer(data) {
      try {
        let areaInfo = await selectMerinfoByid(data);
        if (areaInfo.code === 200) {
          this.tableData = areaInfo.listdata;
          this.subMerData= areaInfo.subMerData
        } else {
          messageTip("error", "请求出错！");
        }
      } catch (err) {}
    },
    async asySelectMerDetailByMerid(data) {
      try {
        let userInfo = await selectMerDetailByMerid(data);
        if (userInfo.code === 200) {
          let { dealdata } = userInfo;
          if (Object.keys(dealdata).length > 0) {
            this.merInfo = [
              {
                title: "商户姓名",
                content: dealdata.realname
              },
              {
                title: "商户昵称",
                content: dealdata.username
              },
              {
                title: "电话",
                content: dealdata.phone_num
              }
            ];
            this.ToId = dealdata.id;
          } else {
            messageTip("warning", "未搜索到商户！");
          }
        } else {
          messageTip("error", userInfo.message);
        }
      } catch (err) {}
    },
    handleSearchMer() {
      this.asySelectMerDetailByMerid(this.merInfoDetailForm);
    },
    handleRemoveMer() {
      this.merInfoDetailForm = {
        type: "1"
      };
      this.merInfo = [
        {
          title: "商户姓名",
          content: ""
        },
        {
          title: "商户昵称",
          content: ""
        },
        {
          title: "电话",
          content: ""
        }
      ];
      this.ToId= 0
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleTransfer() {
      const areaList= this.multipleSelection.map(item=>item.areaid)
      if(this.ToId === 0){
         return messageTip('warning','请先选择接收人，再进行批量转移！')
      }
      const data = {
        param: JSON.stringify({
          fromId: this.dealer,
          ToId: this.ToId,
          areaList
        })
      };
      const h = this.$createElement;
      const VNdom = [
        "p",
        null,
        [h("span", null, "确认转移选中小区下的用户和设备？")]
      ];
      const message = h(...VNdom);
      confirVNdom("提示", message, () => {
        this.asyTransformMerToMer(data);
      });
    },
    async asyTransformMerToMer(data) {
      let info = await transformMerToMer(data);
      if(info.code === 200){
        messageTip('success','批量转移成功！')
      }else{
        messageTip('success','批量转移失败！')
      }
    },
    handleReReq(){
      this.asySelectAgentUnderMer({ merid:this.dealer });
    }
  }
};
</script>

<style lang="less">
.merInfoDetail {
  .left_title {
    text-align: center;
    margin-bottom: 15px;
  }
  .merName {
    font-weight: bold;
    color: #409eff;
  }
  .el-col {
    .centerWarpper {
      position: relative;
      button {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
      }
    }
  }
  .search {
    height: 60px;
    padding: 12px 12px 18px 12px;
    box-sizing: border-box;
    .el-select {
      width: 30%;
      .el-input {
        margin-right: 0;
        width: 100%;
      }
    }
    .el-input {
      width: 50%;
    }
  }
  .deleteBtn {
    padding: 18px 12px 12px 12px;
    text-align: center;
    .el-button {
      width: 50%;
    }
  }
}
</style>