<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true" class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="优惠券名称" class="form_right25">
                    <el-input v-model="queryForm.couponName" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button icon="el-icon-search" type="primary" @click="handleSearch"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button icon="el-icon-plus" type="success" @click="handleShowDialog()"
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
                fit
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column
                    prop="couponName"
                    label="优惠券名称"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.couponName | fmtBlank }}
                </el-table-column>

                <el-table-column prop="couponType" label="类型" min-width="120" v-slot="{ row }">
                    <i class="c-info"
                        >{{
                            row.couponType == 1
                                ? "通用型"
                                : row.couponType == 2
                                ? "邀请新用户"
                                : "— —"
                        }}
                    </i>
                </el-table-column>

                <el-table-column prop="couponMoney" label="金额" min-width="120" v-slot="{ row }">
                    {{ row.couponMoney | fmtMoney }}
                </el-table-column>

                <el-table-column prop="status" label="状态" min-width="120" v-slot="{ row }">
                    <i
                        :class="{
                            'c-success': row.status == 1,
                            'c-danger': row.status == 2,
                        }"
                        >{{ row.status == 1 ? "进行中" : row.status == 2 ? "已失效" : "— —" }}</i
                    >
                </el-table-column>

                <el-table-column
                    prop="endTime"
                    label="有效期截止时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.endTime | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.createTime | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.updateTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作" width="190" fixed="right" v-slot="{ row, $index }">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(row)"
                        >编辑
                    </el-button>
                    <el-button
                        @click.native.prevent="asyDeleteRow({ index: $index, id: row.id })"
                        icon="el-icon-delete"
                        type="danger"
                        size="mini"
                        >删除
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="优惠券信息"
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
                label-width="100px"
                label-position="right"
            >
                <el-form-item label="优惠券名称" prop="couponName">
                    <el-input v-model="form.couponName" clearable></el-input>
                </el-form-item>
                <el-form-item label="金额" prop="couponMoney">
                    <el-input v-model="form.couponMoney" clearable></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="couponType">
                    <el-select v-model="form.couponType" filterable>
                        <el-option label="通用型" value="1"></el-option>
                        <el-option label="邀请新用户" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="截止时间" prop="endTime">
                    <el-date-picker
                        style="width: 70%;"
                        v-model="form.endTime"
                        type="datetime"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import pickerOptions from "@/utils/dateTime";
import {
    selectPageActive as getTable,
    insertCoupon as insertRow,
    updateCoupon as updateRow,
    deleteCouponById as deleteRow,
} from "@/require/activityManage";
import { checkNumber, checkEmpty } from "@/utils/ele";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            deleteRow,
            pickerOptions,
            dialogVisible: false,
            form: {},
            rules: {
                couponName: { required: true, validator: checkEmpty, trigger: "blur" },
                couponType: { required: true, validator: checkEmpty, trigger: "blur" },
                couponMoney: { required: true, validator: checkNumber, trigger: "blur" },
                endTime: { required: true, validator: checkEmpty, trigger: "blur" },
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
            this.form = { ...row };
        },
    },
};
</script>
