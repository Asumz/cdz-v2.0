<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="活动状态" class="form_right25">
                    <el-select v-model="queryForm.status" clearable>
                        <el-option label="未开始" value="1"> </el-option>
                        <el-option label="进行中" value="2"> </el-option>
                        <el-option label="已结束" value="3"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="success" @click="handleShowDialog()" icon="el-icon-plus"
                        >新增
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <!-- 子模版 -->
                <el-table-column type="expand" v-slot="{ row: list }">
                    <el-table
                        :data="list.giveList"
                        border
                        style="width: 70%;"
                        :header-cell-style="{
                            background: 'rgba(103, 194, 58, 0.06)',
                            color: '#666',
                        }"
                    >
                        <el-table-column label="充值金额" min-width="100" v-slot="{ row }">
                            {{ row.rechargeMoney | fmtMoney }}
                        </el-table-column>

                        <el-table-column label="赠送金额" min-width="100" v-slot="{ row }">
                            {{ row.giveMoney | fmtMoney }}
                        </el-table-column>

                        <el-table-column label="充值推荐" min-width="100" v-slot="{ row }">
                            <i
                                :class="{
                                    'c-success': row.recommendState == 1,
                                    'c-danger': row.recommendState == 2,
                                }"
                            >
                                {{
                                    row.recommendState == 1
                                        ? "是"
                                        : row.recommendState == 2
                                        ? "否"
                                        : "— —"
                                }}
                            </i>
                        </el-table-column>

                        <el-table-column label="操作" fixed="right" width="100" v-slot="{ row }">
                            <el-button
                                circle
                                size="mini"
                                icon="el-icon-edit"
                                @click="handleShowDialog2(list.id, row)"
                            ></el-button>
                        </el-table-column>
                    </el-table>
                </el-table-column>

                <el-table-column
                    prop="activeName"
                    label="活动名称"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.activeName | fmtBlank }}
                </el-table-column>

                <el-table-column prop="status" label="状态" min-width="80" v-slot="{ row }">
                    <el-tag :type="mapStatus(row.status).color">
                        {{ mapStatus(row.status).status }}
                    </el-tag>
                </el-table-column>

                <el-table-column prop="startTime" label="开始时间" min-width="170" v-slot="{ row }">
                    {{ row.startTime | fmtBlank }}
                </el-table-column>

                <el-table-column prop="endTime" label="结束时间" min-width="170" v-slot="{ row }">
                    {{ row.endTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="终止操作" width="110" v-slot="{ row }">
                    <el-button
                        @click="asyStopActivity(row.id)"
                        type="warning"
                        size="mini"
                        plain
                        :disabled="row.status != 2"
                        >立即终止
                    </el-button>
                </el-table-column>

                <el-table-column label="操作" width="100" fixed="right" v-slot="scope">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(scope.row)"
                        >编辑
                    </el-button>
                    <!-- <el-button
                        @click.native.prevent="
                            asyDeleteRow({ index: scope.$index, id: scope.row.id })
                        "
                        icon="el-icon-delete"
                        type="danger"
                        size="mini"
                        >删除
                    </el-button> -->
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="活动信息"
            width="500px"
            :dialogVisible="dialogVisible"
            :handleClose="handleClose"
            :handleSubmit="handleSubmit"
            :handleCancen="handleClose"
        >
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                size="small"
                label-width="80px"
                label-position="right"
            >
                <el-form-item label="活动名称" prop="activeName">
                    <el-input v-model="form.activeName" clearable :disabled="!!form.id"></el-input>
                </el-form-item>

                <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker
                        v-model="form.startTime"
                        style="width: 70%;"
                        type="datetime"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        :disabled="!!form.id"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker
                        v-model="form.endTime"
                        style="width: 70%;"
                        type="datetime"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        :disabled="!!form.id"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="备注" prop="remarks">
                    <el-input
                        v-model="form.remarks"
                        type="textarea"
                        :maxlength="100"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        placeholder="最大长度100字"
                        show-word-limit
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>

        <DialogWrapper
            title="充值信息"
            width="500px"
            :dialogVisible="dialogVisible2"
            :handleClose="handleClose2"
            :handleSubmit="handleSubmit2"
            :handleCancen="handleClose2"
        >
            <el-form
                ref="form2"
                :model="form2"
                :rules="rules2"
                size="small"
                label-width="80px"
                label-position="right"
            >
                <el-form-item label="充值金额" prop="rechargeMoney">
                    <el-input v-model="form2.rechargeMoney" clearable disabled></el-input>
                </el-form-item>

                <el-form-item label="赠送金额" prop="giveMoney">
                    <el-input v-model="form2.giveMoney" clearable></el-input>
                </el-form-item>

                <el-form-item label="是否推荐" prop="recommendState">
                    <el-switch
                        v-model="form2.recommendState"
                        active-value="1"
                        inactive-value="2"
                    ></el-switch>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkNumber, checkEmpty } from "@/utils/ele";
import pickerOptions from "@/utils/dateTime";
import {
    selPageActive as getTable,
    insertRechargeActive as insertRow,
    updateRechargeActiveById as updateRow,
    // delRechargeActiveById as deleteRow,
    terminationRechargeActiveById, // 立即终止
    updateRechargeActiveGive,
} from "@/require/activityManage";

export default {
    mixins: [mixins],
    data() {
        const checkMoney = (rule, value, callback) => {
            const isFloat = !Number.isInteger(+value);
            const isBig = value > this.form2.rechargeMoney;
            if (/^\s*$/.test(value) || value == undefined) return callback(new Error("必填项"));
            setTimeout(() => {
                if (isFloat || value < 0) return callback(new Error("只能为正整数"));
                if (isBig) return callback(new Error("赠送金额不能大于充值金额"));
                callback();
            }, 300);
        };
        return {
            getTable,
            insertRow,
            updateRow,
            // deleteRow,
            pickerOptions,
            dialogVisible: false,
            dialogVisible2: false,
            form: {},
            form2: {},
            currentRow2: null,
            rules: {
                activeName: { required: true, validator: checkEmpty, trigger: "blur" },
                startTime: { required: true, validator: checkEmpty, trigger: "blur" },
                endTime: { required: true, validator: checkEmpty, trigger: "blur" },
            },
            rules2: {
                giveMoney: { required: true, validator: checkMoney, trigger: "blur" },
            },
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.form.id) {
                        this.asyUpdateRow({ data: this.form, reload: true });
                    } else {
                        this.asyInsertRow(this.form);
                    }
                    this.dialogVisible = false;
                }
            });
        },
        handleShowDialog(row = {}) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            this.currentRow = row;
            let { activeName, startTime, endTime, remarks, id } = row;
            this.form = { activeName, startTime, endTime, remarks, id };
        },
        // 金额表单
        handleShowDialog2(activeId, row) {
            this.dialogVisible2 = true;
            this.$nextTick(() => {
                this.$refs.form2.clearValidate();
            });
            this.currentRow2 = row;
            this.form2 = { activeId, ...row };
        },
        handleClose2() {
            this.dialogVisible2 = false;
        },
        handleSubmit2() {
            this.$refs.form2.validate(valid => {
                if (valid) {
                    this.asyUpdateRechargeActiveGive(this.form2);
                    this.dialogVisible2 = false;
                }
            });
        },
        mapStatus(p) {
            let status, color;
            switch (p) {
                case "1":
                    [color, status] = ["info", "未开始"];
                    break;
                case "2":
                    [color, status] = ["success", "进行中"];
                    break;
                case "3":
                    [color, status] = ["danger", "已结束"];
                    break;
                default:
                    [color, status] = ["info", "— —"];
            }
            return { status, color };
        },
        // stop now
        asyStopActivity(id) {
            try {
                alertConfim("确认终止活动吗?", async () => {
                    let res = await terminationRechargeActiveById({ id });
                    if (res.code === 0) {
                        messageTip("success", res.tip);
                        this.asyGetTable(this.queryConditions);
                    } else {
                        messageTip("error", res.tip);
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        // 修改金额
        async asyUpdateRechargeActiveGive(data) {
            try {
                let res = await updateRechargeActiveGive(data);
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    Object.keys(this.form2).map(key => {
                        this.$set(this.currentRow2, key, data[key]);
                    });
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
    },
};
</script>
