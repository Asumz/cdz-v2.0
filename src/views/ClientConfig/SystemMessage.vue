<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="消息标题" class="form_right25">
                    <el-input v-model="queryForm.messageTitle" clearable></el-input>
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
                    prop="messageTitle"
                    label="消息标题"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.messageTitle | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="messageContent"
                    label="内容"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.messageContent | fmtBlank }}
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
            title="系统消息"
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
                <el-form-item label="标题" prop="messageTitle">
                    <el-input v-model="form.messageTitle" clearable></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="messageContent">
                    <el-input v-model="form.messageContent" clearable></el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkEmpty } from "@/utils/ele";
import {
    selectSysMessage as getTable,
    insertSysMessage as insertRow,
    updateSysMessage as updateRow,
    delSysMessage as deleteRow,
} from "@/require/clientConfig";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            deleteRow,
            dialogVisible: false,
            form: {},
            rules: {
                messageTitle: { required: true, validator: checkEmpty, trigger: "blur" },
                messageContent: { required: true, validator: checkEmpty, trigger: "blur" },
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
                        this.asyUpdateRow({ data: this.form });
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
