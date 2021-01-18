<template>
    <div>
        <!-- <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card> -->

        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column label="微信流水号" min-width="200" v-slot="{ row }">
                    <!-- {{ row.withdrawnum | fmtBlank }} -->
                </el-table-column>

                <el-table-column label="退款金额" min-width="80" v-slot="{ row }">
                    <!-- {{ row.createTime | fmtMoney }} -->
                </el-table-column>

                <el-table-column label="退款时间" min-width="170" v-slot="{ row }">
                    <!-- {{ row.createTime | fmtBlank }} -->
                </el-table-column>

                <el-table-column label="备注" width="80" v-slot="{ row }">
                    <el-button size="mini" @click="handleShowDialog(row)"></el-button>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="备注信息"
            width="500px"
            :dialogVisible="dialogVisible"
            :handleClose="handleClose"
            :handleSubmit="handleSubmit"
            :handleCancen="handleClose"
        >
            <el-form
                ref="form"
                :model="form"
                size="small"
                label-width="80px"
                label-position="right"
            >
                <el-form-item label="备注" prop="memo">
                    <el-input
                        type="textarea"
                        :maxlength="100"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        placeholder="最大长度100字"
                        v-model="form.memo"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
// import {  } from "@/require/tradeRecord";
export default {
    mixins: [mixins],
    data() {
        return {
            // getTable,
            dialogVisible: false,
            form: {}
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    // this.asyUpdateRow({ data: this.form });
                    this.dialogVisible = false;
                }
            });
        },
        handleShowDialog(row = {}) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            this.form = { ...row };
        },
    },
};
</script>
