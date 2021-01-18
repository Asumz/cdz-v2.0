<template>
    <div class="chargeRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="设备号" class="form_right25 w220">
                    <el-input
                        v-model="queryForm.equipmentnum"
                        placeholder="设备号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户名" class="form_right25">
                    <el-input
                        v-model="queryForm.username"
                        placeholder="用户名"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25">
                    <el-input
                        v-model="queryForm.phoneNum"
                        placeholder="手机号"
                        clearable
                    ></el-input>
                </el-form-item>

                <el-form-item label="开始时间" class="form_right25 w400">
                    <el-date-picker
                        v-model="queryForm.time"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        align="right"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <ExportExcel
                        :totalPage="totalPage"
                        :getTable="getTable"
                        :conditions="conditions"
                        :fmtExcel="fmtExcel"
                    />
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
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column prop="ordernum" label="订单号" min-width="220" v-slot="{ row }">
                    {{ row.ordernum | fmtBlank }}
                </el-table-column>

                <el-table-column prop="username" label="用户名" min-width="150" v-slot="{ row }">
                    {{ row.username | fmtBlank }}
                </el-table-column>

                <el-table-column prop="phoneNum" label="手机号" min-width="150" v-slot="{ row }">
                    {{ row.phoneNum | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="equipmentnum"
                    label="设备号"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.equipmentnum | fmtBlank }}
                </el-table-column>

                <el-table-column prop="port" label="端口号" min-width="70" v-slot="{ row }">
                    {{ row.port | fmtBlank }}
                </el-table-column>

                <el-table-column label="单价" min-width="70" v-slot="{ row }">
                    <!-- {{ row.port | fmtMoney }} -->
                </el-table-column>

                <el-table-column prop="useelec" label="用电度数" min-width="80" v-slot="{ row }">
                    {{ row.useelec != null ? row.useelec / 100 : "— —" }}
                </el-table-column>

                <el-table-column prop="paymoney" label="预付金额" min-width="100" v-slot="{ row }">
                    {{ row.paymoney | fmtMoney }}
                </el-table-column>

                <el-table-column prop="chargeMoney" label="实付金额" min-width="100" v-slot="{ row }">
                    {{ row.chargeMoney | fmtMoney }}
                </el-table-column>

                <el-table-column prop="serverMoney" label="服务费" min-width="100" v-slot="{ row }">
                    {{ row.serverMoney | fmtMoney }}
                </el-table-column>

                <el-table-column label="减免金额" min-width="100" v-slot="{ row }">
                    <!-- {{ row.serverMoney | fmtMoney }} -->
                </el-table-column>

                <el-table-column prop="status" label="充电状态" width="100" v-slot="{ row }">
                    {{ row.status === 0 ? "进行中" : "已结束" }}
                </el-table-column>

                <el-table-column prop="number" label="订单状态" width="100" v-slot="{ row }">
                    <el-link
                        :type="
                            row.number === 0
                                ? 'success'
                                : row.number === 1
                                ? 'danger'
                                : row.number === 2
                                ? 'warning'
                                : 'info'
                        "
                        :underline="false"
                        >{{
                            row.number === 0
                                ? "正常"
                                : row.number === 1
                                ? "全额退款"
                                : row.number === 2
                                ? "部分退款"
                                : "订单异常"
                        }}
                    </el-link>
                </el-table-column>

                <el-table-column prop="paytype" label="支付方式" min-width="85" v-slot="{ row }">
                    {{
                        row.paytype == 1
                            ? "钱包"
                            : row.paytype == 2
                            ? "微信"
                            : row.paytype == 3
                            ? "支付宝"
                            : row.paytype == 4
                            ? "包月下发数据"
                            : row.paytype == 5
                            ? "投币"
                            : row.paytype == 6
                            ? "离线卡"
                            : row.paytype == 7
                            ? "在线卡"
                            : row.paytype == 8
                            ? "支付宝小程序"
                            : "— —"
                    }}
                </el-table-column>

                <el-table-column label="微信流水号" min-width="170" v-slot="{ row }">
                    <!-- {{ row.beginTime | fmtBlank }} -->
                </el-table-column>

                <el-table-column prop="beginTime" label="开始时间" min-width="170" v-slot="{ row }">
                    {{ row.beginTime | fmtBlank }}
                </el-table-column>

                <el-table-column prop="endTime" label="结束时间" min-width="170" v-slot="{ row }">
                    {{ row.endTime | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="refundTime"
                    label="退款时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.refundTime | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="handle"
                    label="操作"
                    min-width="130"
                    fixed="right"
                    v-slot="{ row }"
                >
                    <el-button
                        type="danger"
                        size="mini"
                        :disabled="!!row.status"
                        @click="handleRef(row.ordernum)"
                        >手动结束订单
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <!-- <el-dialog
            title="请输入右边的验证码"
            :visible.sync="dialogVisible"
            width="400px"
            :before-close="handleClose"
        >
            <el-row>
                <el-col :span="16">
                    <el-input
                        placeholder="请输入验证码"
                        v-model="userVerifiCode"
                    ></el-input>
                </el-col>
                <el-col :span="7" :offset="1">
                    <VerifiCode @backCode="backCode" ref="verifi" />
                </el-col>
            </el-row>
            <p style="color: red; margin-top: 5px" v-show="tipText">
                验证码不正确
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button
                    @click="
                        dialogVisible = false;
                        userVerifiCode = '';
                        tipText = false;
                        $refs.verifi.initCode();
                    "
                    size="small"
                    >取 消</el-button
                >
                <el-button
                    type="primary"
                    @click="confirmVerifiCode"
                    size="small"
                    >确 定</el-button
                >
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import mixins from "@/mixins";
import { pickerOptions } from "@/utils/dateTime";
import { getChargeRecord as getTable, stopCharging } from "@/require/tradeRecord";
// import Util from "@/utils/util";
// import VerifiCode from "@/components/common/VerifiCode";
export default {
    // components: {
    //     VerifiCode,
    // },
    mixins: [mixins],
    data() {
        return {
            getTable,
            pickerOptions,
            fmtExcel: {
                tHeader: [
                    "序号",
                    "订单号",
                    "用户名",
                    "手机号",
                    "设备号",
                    "端口号",
                    "用电度数",
                    "消费额",
                    "服务费",
                    "充电状态",
                    "订单状态",
                    "支付方式",
                    "开始时间",
                    "结束时间",
                    "退款时间",
                ],
                filterVal: [
                    "index",
                    "ordernum",
                    "username",
                    "phoneNum",
                    "equipmentnum",
                    "port",
                    "useelec",
                    "paymoney",
                    "serverMoney",
                    "status",
                    "number",
                    "paytype",
                    "beginTime",
                    "endTime",
                    "refundTime",
                ],
                filename: "充电记录",
                formatJson: this.formatJson,
            },
            // dialogVisible: false,
            // verifiCode: "", //验证码
            // userVerifiCode: "", //用户输入的验证码
            // tipText: false,
            // row: {}, //这里是点击退费/撤回所存的订单一列信息，为了退费的时候使用他
            // loading_obj: null, //全局loading实例
            // cardShowInfo: null, //刷卡提示信息
        };
    },
    computed: {
        conditions() {
            let { time, ...obj } = this.queryForm;
            let startTime = time && time[0];
            let endTime = time && time[1];
            return { ...obj, startTime, endTime };
        },
    },
    methods: {
        // 处理退款
        handleRef(ordernum) {
            alertConfim("确认退款吗?", async () => {
                let res = await stopCharging({ ordernum });
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    this.asyGetTable(this.queryForm);
                } else {
                    messageTip("error", res.tip);
                }
            });
        },
        // handleClose() {
        //     //点击管理验证码框
        //     this.userVerifiCode = "";
        //     this.dialogVisible = false;
        //     this.$refs.verifi.initCode();
        // },
        // backCode(verifiCode) {
        //     //普通管理员验证码回调
        //     this.verifiCode = verifiCode;
        // },
        // confirmVerifiCode() {
        //     //点击提交，验证验证码
        //     let userVerifiCode = this.userVerifiCode.toLowerCase();
        //     let verifiCode = this.verifiCode.toLowerCase();
        //     if (userVerifiCode != verifiCode) {
        //         this.tipText = true;
        //     } else {
        //         this.tipText = false;
        //         this.dialogVisible = false;
        //         // 发送请求请求
        //         this.handleRefAndWidth(2);
        //         this.userVerifiCode = "";
        //     }
        //     this.$refs.verifi.initCode();
        // },
        // handleRefAndWidth(utype) {
        //     //处理退费或 撤回 逻辑
        //     //utype= 3超级管理员  2普通管理员
        //     if (this.row.number == 0) {
        //         //全额退款
        //         let url =
        //             this.row.paytype == 1
        //                 ? "/wxpay/doWalletReturn"
        //                 : this.row.paytype == 2
        //                 ? "/wxpay/doRefund"
        //                 : [3, 8].includes(this.row.paytype)
        //                 ? "/alipay/aliDoRefund"
        //                 : [12].includes(this.row.paytype)
        //                 ? "/unionpay/doRefund"
        //                 : "";
        //         let data = {
        //             id: this.row.id,
        //             refundState: 1,
        //             pwd: "",
        //             utype: utype,
        //         };
        //         tradeRefEntrance({ url, data })
        //             .then((res) => {
        //                 if (res.ok == "ok") {
        //                     messageTip("success", "退款成功");
        //                     this.asyGetChargeRecord(this.queryForm);
        //                 } else {
        //                     res.message = res.message || "退款失败";
        //                     messageTip("error", res.message);
        //                 }
        //             })
        //             .catch((error) => {});
        //     } else if (this.row.number == 2) {
        //         //撤回退款
        //         withdrawEntrance({ id: this.row.id })
        //             .then((res) => {
        //                 if (res.ok === "ok") {
        //                     messageTip("success", "撤回成功");
        //                     this.asyGetChargeRecord(this.queryForm);
        //                 } else {
        //                     res.message = res.message || "撤回失败";
        //                     messageTip("error", res.message);
        //                 }
        //             })
        //             .catch((error) => {});
        //     }
        // },
        // async handleGetInfo(row) {
        //     //鼠标移动到刷卡上面时显示刷卡数据
        //     console.log(row);
        //     try {
        //         let info = await getWolfchargeInfo({ ordernum: row.ordernum });
        //         if (info.wolfcode == 1000) {
        //             let { cardid, type } = info;
        //             let typeStr = type == 1 ? "充满自停" : "正常";
        //             this.cardShowInfo = {
        //                 cardid,
        //                 typeStr,
        //             };
        //         } else {
        //         }
        //     } catch (e) {}
        // },
        // handleHide() {
        //     //隐藏刷卡提示
        //     this.cardShowInfo = null;
        // },
        formatJson(filterVal, list) {
            return list.map((item, i) =>
                filterVal.map(jtem => {
                    let val;
                    switch (jtem) {
                        case "index":
                            val = i + 1;
                            break;
                        case "useelec":
                            val = item[jtem] != null ? item[jtem] / 100 : "— —";
                            break;
                        case "paymoney":
                            val = item[jtem] != null ? item[jtem].toFixed(2) : "— —";
                            break;
                        case "serverMoney":
                            val = item[jtem] != null ? item[jtem].toFixed(2) : "— —";
                            break;
                        case "status":
                            val = item[jtem] === 0 ? "进行中" : "已结束";
                            break;
                        case "number":
                            val =
                                item[jtem] === 0
                                    ? "正常"
                                    : item[jtem] === 1
                                    ? "全额退款"
                                    : item[jtem] === 2
                                    ? "部分退款"
                                    : "订单异常";
                            break;
                        case "paytype":
                            val =
                                item[jtem] == 1
                                    ? "钱包"
                                    : item[jtem] == 2
                                    ? "微信"
                                    : item[jtem] == 3
                                    ? "支付宝"
                                    : item[jtem] == 4
                                    ? "包月下发数据"
                                    : item[jtem] == 5
                                    ? "投币"
                                    : item[jtem] == 6
                                    ? "离线卡"
                                    : item[jtem] == 7
                                    ? "在线卡"
                                    : item[jtem] == 8
                                    ? "支付宝小程序"
                                    : "— —";
                            break;
                        default:
                            val = item[jtem] != null && item[jtem] !== "" ? item[jtem] : "— —";
                    }
                    return val;
                })
            );
        },
    },
};
</script>
