<template>
    <div class="cashManage">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="提现单号" class="form_right25 w220">
                    <el-input
                        v-model="queryForm.withdrawnum"
                        placeholder="请输入提现单号"
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
                <el-form-item label="银行卡号 " class="form_right25 w220">
                    <el-input
                        v-model="queryForm.bankcardnum"
                        placeholder="请输入银行卡号"
                        clearable
                    ></el-input>
                </el-form-item>

                <el-form-item label="提现状态" class="form_right25">
                    <el-select v-model="queryForm.status" placeholder="提现状态" clearable>
                        <el-option label="待处理" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="被拒绝" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                        v-model="queryForm.begintime"
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
                        v-model="queryForm.endtime"
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
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column prop="withdrawnum" label="提现单号" width="200" v-slot="{ row }">
                    {{ row.withdrawnum | fmtBlank }}
                </el-table-column>
                <el-table-column prop="realname" label="申请人" min-width="100" v-slot="{ row }">
                    {{ row.realname | fmtBlank }}
                </el-table-column>
                <el-table-column prop="phoneNum" label="手机号" min-width="120" v-slot="{ row }">
                    <router-link :to="`/usermanage/merInfo?phonenum=${row.phoneNum}`">
                        <el-link type="primary">{{ row.phoneNum | fmtBlank }}</el-link>
                    </router-link>
                </el-table-column>
                <el-table-column
                    prop="bankname"
                    label="账户与开户行"
                    min-width="180"
                    v-slot="{ row }"
                >
                    <!-- <div v-if="row.company != null">
                            公司名称：{{ `  ${row.company}` }}
                        </div> -->
                    <div v-if="row.bankcardnum != 0">
                        银行名称:{{
                            row.bankname && row.bankname.length > 0 ? row.bankname : `  — —`
                        }}
                    </div>
                    <div v-else>微信零钱</div>
                    <!-- <div v-if="row.bankcardnum != 0">银行账号:{{row.bankcardnum && row.bankcardnum.length > 0 ? `  ${row.bankcardnum}` : `  — —`}}</div> -->
                    <div v-if="row.bankcardnum != 0">
                        银行账号:{{ row.bankcardnum | parseBank }}
                    </div>
                </el-table-column>

                <!-- <el-table-column prop="type" label="类型" width="70">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 2">对公</span>
                        <span v-else>个人</span>
                    </template>
                </el-table-column> -->

                <el-table-column prop="userMoney" label="现有金额" min-width="80" v-slot="{ row }">
                    {{ row.userMoney | fmtMoney }}
                </el-table-column>

                <el-table-column prop="money" label="提现金额" min-width="80" v-slot="{ row }">
                    {{ row.money | fmtMoney }}
                </el-table-column>

                <el-table-column label="到账金额" min-width="80" v-slot="{ row }">
                    <el-link
                        type="danger"
                        :underline="false"
                        style="font-weight: 600; font-size: 16px;"
                    >
                        {{ (row.money - row.servicecharge) | fmtMoney }}
                    </el-link>
                </el-table-column>

                <el-table-column
                    prop="servicecharge"
                    label="手续费"
                    min-width="80"
                    v-slot="{ row }"
                >
                    {{ row.servicecharge | fmtMoney }}
                </el-table-column>

                <el-table-column prop="createTime" label="申请时间" width="170" v-slot="{ row }">
                    {{ row.createTime | fmtBlank }}
                </el-table-column>

                <el-table-column prop="status" label="提现状态" min-width="100" v-slot="{ row }">
                    <el-link type="info" :underline="false" v-if="row.status === 0"
                        >待处理
                    </el-link>
                    <el-link type="success" :underline="false" v-if="row.status === 1"
                        >已通过
                    </el-link>
                    <el-link type="danger" :underline="false" v-if="row.status === 2"
                        >被拒绝
                    </el-link>
                </el-table-column>

                <el-table-column
                    prop="handle"
                    label="操作"
                    width="160"
                    fixed="right"
                    v-slot="{ row }"
                >
                    <div v-if="row.status != 0 && row.status != 4">
                        <el-button type="success" size="mini" plain disabled>通过</el-button>
                        <el-button type="danger" size="mini" plain disabled>拒绝</el-button>
                    </div>
                    <div v-else>
                        <el-button type="success" size="mini" @click="handleRefBtn(row, 1)"
                            >通过
                        </el-button>
                        <el-button type="danger" size="mini" @click="handleRefBtn(row, 2)"
                            >拒绝
                        </el-button>
                    </div>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
import mixins from "@/mixins";
import dateTimeJS from "@/utils/dateTime";
import { orderWithdrawRecordData as getTable, withdrawResolve } from "@/require/tradeRecord";
export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            pickerOptions: dateTimeJS,
        };
    },
    methods: {
        asyGetTableInner(data) {
            this.tableData = data.withdrawList;
            this.totalPage = data.total;
        },
        handleRefBtn(row, status) {
            let title = status == 1 ? "确认通过提现吗？" : "确认拒绝提现吗？";
            alertConfim(title, async () => {
                try {
                    let res = await withdrawResolve({ id: row.id, status });
                    if (res.code === 0) {
                        messageTip("success", res.tip);
                        this.asyGetTable(this.queryForm);
                    } else {
                        messageTip("error", res.tip);
                    }
                } catch (error) {
                    throw error;
                }
            });
        },
    },
    filters: {
        parseBank(num) {
            if (typeof num == "string" && num.length > 0) {
                return `  ` + num.replace(/(\d{4})(?=\d)/g, "$1 ");
            }
            return "— —";
        },
    },
};
</script>
