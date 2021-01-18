<template>
    <div class="walletRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input
                        v-model="queryForm.ordernum"
                        placeholder="请输入订单号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="用户名" class="form_right25">
                    <el-input
                        v-model="queryForm.username"
                        placeholder="请输入用户名"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25">
                    <el-input
                        v-model="queryForm.phoneNum"
                        placeholder="请输入手机号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                        v-model="queryForm.startTime"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" class="form_right25 w200">
                    <el-date-picker
                        v-model="queryForm.endTime"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
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
                <el-table-column label="订单号" min-width="200" v-slot="{ row }">
                    {{ row.ordernum | fmtBlank }}
                </el-table-column>

                <el-table-column label="用户名" min-width="100" v-slot="{ row }">
                    {{ row.username | fmtBlank }}
                </el-table-column>

                <el-table-column label="手机号" min-width="120" v-slot="{ row }">
                    {{ row.uphonenum | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作金额" min-width="180" v-slot="scope">
                    <div>
                        充值金额：
                        <el-link
                            :type="scope.row.money >= 0 ? 'success' : 'danger'"
                            :underline="false"
                            >{{ (scope.row.money >= 0 ? "+" : "") + scope.row.money.toFixed(2) }}
                        </el-link>
                    </div>
                    <div>
                        赠送金额：
                        <el-link
                            :type="scope.row.sendmoney >= 0 ? 'success' : 'danger'"
                            :underline="false"
                            >{{
                                (scope.row.sendmoney >= 0 ? "+" : "") +
                                    scope.row.sendmoney.toFixed(2)
                            }}
                        </el-link>
                    </div>
                </el-table-column>

                <el-table-column label="到账金额" min-width="140" v-slot="scope">
                    <el-link
                        :type="scope.row.tomoney >= 0 ? 'success' : 'danger'"
                        :underline="false"
                        >{{ (scope.row.tomoney >= 0 ? "+" : "") + scope.row.tomoney.toFixed(2) }}
                    </el-link>
                </el-table-column>

                <el-table-column label="余额" min-width="180" v-slot="scope">
                    <!-- {{ scope.row.balance != null ? scope.row.balance.toFixed(2) : '— —' }} -->
                    <div>
                        充值余额：
                        <el-link type="primary" :underline="false">
                            <!-- <router-link
                                    :to="`/usermanage/userInfo/userWalletDetail?uid=${scope.row.uid}`"
                                    tag="span"
                                > -->
                            {{ scope.row.topupbalance | fmtMoney }}
                            <!-- </router-link> -->
                        </el-link>
                    </div>
                    <div>
                        赠送余额：
                        <el-link type="primary" :underline="false">
                            <!-- <router-link
                                    :to="`/usermanage/userInfo/userWalletDetail?uid=${scope.row.uid}`"
                                    tag="span"
                                > -->
                            {{ scope.row.givebalance | fmtMoney }}
                            <!-- </router-link> -->
                        </el-link>
                    </div>
                </el-table-column>
                <el-table-column label="类型" min-width="150" v-slot="{ row }">
                    <el-link type="info" :underline="false">
                        {{
                            [0].includes(row.paytype)
                                ? "充值钱包"
                                : [1].includes(row.paytype)
                                ? "虚拟充值钱包"
                                : [2].includes(row.paytype)
                                ? "钱包退费"
                                : [3].includes(row.paytype)
                                ? "充电记录退费"
                                : [4].includes(row.paytype)
                                ? "离线卡充值退费"
                                : [5].includes(row.paytype)
                                ? "模拟投币退费"
                                : [6].includes(row.paytype)
                                ? "虚拟钱包退费"
                                : [7].includes(row.paytype)
                                ? "支付宝"
                                : [8].includes(row.paytype)
                                ? "支付宝退款"
                                : [9].includes(row.paytype)
                                ? "支付宝小程序"
                                : "— —"
                        }}
                    </el-link>
                </el-table-column>

                <el-table-column label="卡包" min-width="120" v-slot="{ row }">
                    {{ row.remark | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作时间" min-width="170" v-slot="{ row }">
                    {{ row.paytime | fmtBlank }}
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
import pickerOptions from "@/utils/dateTime";
import { getWalletRecord as getTable } from "@/require/tradeRecord";
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
            // dialogVisible: false,
            // verifiCode: "", //验证码
            // userVerifiCode: "", //用户输入的验证码
            // tipText: false,
            // row: {}, //这里是点击退费/撤回所存的订单一列信息，为了退费的时候使用他
        };
    },
    methods: {
        // handleClose() {
        //     //点击管理验证码框
        //     this.userVerifiCode = "";
        //     this.dialogVisible = false;
        //     this.$refs.verifi.initCode();
        // },
        // handleRefBtn(row) {
        //     this.row = row;
        //     if (this.userInfo.classify === "superAdmin") {
        //         //超级管理员
        //         alertPassword(() => {
        //             this.handleRef(3);
        //         });
        //     } else {
        //         //普通管理员
        //         let utype = 2; //普通管理员
        //         this.dialogVisible = true;
        //     }
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
        //         this.handleRef(2);
        //         this.userVerifiCode = "";
        //     }
        //     this.$refs.verifi.initCode();
        // },
    },
};
</script>
