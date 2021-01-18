<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                        v-model="queryForm.startDate"
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
                        v-model="queryForm.endDate"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-row type="flex" justify="space-between" align="middle" class="c-info font-14">
                    <el-col>昵称: {{ headerData.nickname }}</el-col>
                    <el-col>姓名: {{ headerData.realname }}</el-col>
                    <el-col>手机号: {{ headerData.phoneNum }}</el-col>
                    <el-col>钱包余额: {{ headerData.balance }}</el-col>
                    <el-col>
                        <router-link :to="`/usermanage/userInfo/userChargeRecord?userId=${userId}`">
                            <el-button size="small" icon="el-icon-info">查询充电明细</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column label="订单编号" min-width="170" v-slot="{ row }">
                    {{ row.ordernum | fmtBlank }}
                </el-table-column>

                <el-table-column label="类型" min-width="80" v-slot="{ row }">
                    <el-tag :type="mapPaySource(row.paysource).color">
                        {{ mapPaySource(row.paysource).source }}
                    </el-tag>
                </el-table-column>

                <el-table-column label="充值金额" min-width="80" v-slot="{ row }">
                    <i class="c-success">{{ row.money | fmtMoney }}</i>
                </el-table-column>

                <el-table-column label="赠送金额" min-width="80" v-slot="{ row }">
                    <i class="c-success">{{ row.sendmoney | fmtMoney }}</i>
                </el-table-column>

                <el-table-column label="到账金额" min-width="80" v-slot="{ row }">
                    <i class="c-warning">{{ row.tomoney | fmtMoney }}</i>
                </el-table-column>

                <el-table-column label="充值余额" min-width="80" v-slot="{ row }">
                    <i class="c-primary">{{ row.topupbalance | fmtMoney }}</i>
                </el-table-column>

                <el-table-column label="赠送余额" min-width="80" v-slot="{ row }">
                    <i class="c-primary">{{ row.givebalance | fmtMoney }}</i>
                </el-table-column>

                <el-table-column prop="createDate" label="创建时间" min-width="170" v-slot="{ row }">
                    {{ row.createDate | fmtBlank }}
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
import mixins from "@/mixins";
import pickerOptions from "@/utils/dateTime";
import { getUserBalance, getUserBalanceChangeRecord as getTable } from "@/require/userManage";
export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            pickerOptions,
            headerData: {},
        };
    },
    created() {
        this.asyGetUserBalance({ userId: this.userId });
    },
    computed: {
        userId() {
            return this.$route.query.userId;
        },
        conditions() {
            return { ...this.queryForm, userId: this.userId };
        },
    },
    methods: {
        async asyGetUserBalance(data) {
            try {
                let res = await getUserBalance(data);
                if (res.code === 0 && res.data) {
                    this.headerData = res.data;
                }
            } catch (error) {
                throw error;
            }
        },
        mapPaySource(p) {
            let color, source;
            switch (p) {
                case 1:
                    color = "success";
                    source = "充值";
                    break;
                case 2:
                    color = "danger";
                    source = "充电";
                    break;
                case 3:
                    color = "primary";
                    source = "投币";
                    break;
                case 4:
                    color = "success";
                    source = "离线卡充值";
                    break;
                case 5:
                    color = "danger";
                    source = "退款";
                    break;
                default:
                    color = "info";
                    source = "— —";
            }
            return { color, source };
        },
    },
};
</script>
