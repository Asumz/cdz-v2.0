<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="状态" class="form_right25">
                    <el-select v-model="queryForm.status" clearable>
                        <el-option label="未开始" value="notStarted"> </el-option>
                        <el-option label="进行中" value="active"> </el-option>
                        <el-option label="已结束" value="over"> </el-option>
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
                <el-table-column label="标题" min-width="120" v-slot="{ row }">
                    {{ row.title | fmtBlank }}
                </el-table-column>

                <el-table-column label="状态" min-width="100" v-slot="{ row }">
                    <el-tag :type="mapStatus(row.status).color">
                        {{ mapStatus(row.status).status }}
                    </el-tag>
                </el-table-column>

                <el-table-column label="减免电费" min-width="100" v-slot="{ row }">
                    <i :class="mapCost(row.orderFreeCost).color">{{
                        mapCost(row.orderFreeCost).text
                    }}</i>
                </el-table-column>

                <el-table-column label="减免服务费" min-width="100" v-slot="{ row }">
                    <i :class="mapCost(row.serviceFreeCost).color">{{
                        mapCost(row.serviceFreeCost).text
                    }}</i>
                </el-table-column>

                <el-table-column label="开始时间" min-width="170" v-slot="{ row }">
                    {{ row.startTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="结束时间" min-width="170" v-slot="{ row }">
                    {{ row.endTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="终止操作" width="110" v-slot="{ row }">
                    <el-button
                        @click.native.prevent="asyStopActivity(row)"
                        type="warning"
                        size="mini"
                        plain
                        :disabled="row.status != 'active'"
                        >立即终止
                    </el-button>
                </el-table-column>

                <el-table-column label="操作" width="100" fixed="right" v-slot="{ row, $index }">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(row)"
                        >编辑
                    </el-button>
                    <!-- <el-button
                        @click.native.prevent="asyDeleteRow({ index: $index, id: row.id })"
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
                label-width="90px"
                label-position="right"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" clearable :disabled="!!form.id"></el-input>
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

                <el-form-item label="减免电费" prop="orderFreeCost">
                    <el-switch
                        v-model="form.orderFreeCost"
                        :active-value="true"
                        :inactive-value="false"
                        active-color="#13ce66"
                        :disabled="!!form.id"
                    ></el-switch>
                </el-form-item>

                <el-form-item label="减免服务费" prop="serviceFreeCost">
                    <el-switch
                        v-model="form.serviceFreeCost"
                        :active-value="true"
                        :inactive-value="false"
                        :disabled="!!form.id"
                    ></el-switch>
                </el-form-item>

                <el-form-item label="备注" prop="memo">
                    <el-input
                        v-model="form.memo"
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
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkNumber, checkEmpty } from "@/utils/ele";
import pickerOptions from "@/utils/dateTime";
import {
    queryFristOrderFree as getTable,
    createFristOrderFree as insertRow,
    updateFristOrderFree as updateRow,
    // deleteFristOrderFree as deleteRow,
    stopFristOrderFree, // 立即终止
    selectFristOrderFree, // 单行查询
    indexPageUpdateFristOrderFree, // switch操作
} from "@/require/activityManage";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            // deleteRow,
            pickerOptions,
            dialogVisible: false,
            form: {},
            rules: {
                title: { required: true, validator: checkEmpty, trigger: "blur" },
                startTime: { required: true, validator: checkEmpty, trigger: "blur" },
                endTime: { required: true, validator: checkEmpty, trigger: "blur" },
            },
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    if (this.form.id) {
                        await this.asyUpdateRow({ data: this.form });
                        this.asySelectFristOrderFree(this.currentRow);
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
            this.form = { ...row };
        },
        mapStatus(p) {
            let status, color;
            switch (p) {
                case "notStarted":
                    [color, status] = ["info", "未开始"];
                    break;
                case "active":
                    [color, status] = ["success", "进行中"];
                    break;
                case "over":
                    [color, status] = ["danger", "已结束"];
                    break;
                default:
                    [color, status] = ["info", "— —"];
            }
            return { status, color };
        },
        mapCost(p) {
            let text, color;
            [text, color] = p === true ? ["是", "c-success"] : ["否", "c-danger"];
            return { text, color };
        },
        // stop now
        async asyStopActivity(row) {
            try {
                alertConfim("确认终止活动吗?", async () => {
                    let res = await stopFristOrderFree({ id: row.id });
                    if (res.code === 0) {
                        await this.asySelectFristOrderFree(row);
                        messageTip("success", res.tip);
                    } else {
                        messageTip("error", res.tip);
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        // query single row
        async asySelectFristOrderFree(row) {
            try {
                let res = await selectFristOrderFree({ id: row.id });
                if (res.code === 0) {
                    let data = res.data;
                    Object.keys(data).map(key => {
                        this.$set(row, key, data[key]);
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
