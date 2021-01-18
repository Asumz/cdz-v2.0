<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button
                    icon="el-icon-plus"
                    type="success"
                    size="small"
                    class="float-r"
                    @click="handleShowDialog()"
                    >新增
                </el-button>
            </div>
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                fit
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column
                    prop="versionCode"
                    label="app版本编号"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.versionCode | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="versionName"
                    label="app版本名字"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.versionName | fmtBlank }}
                </el-table-column>

                <el-table-column prop="apkType" label="平台类型" min-width="120" v-slot="{ row }">
                    {{ row.apkType == 1 ? "安卓" : row.apkType == 2 ? "ios" : "— —" }}
                </el-table-column>

                <el-table-column
                    prop="updateContent"
                    label="更新内容"
                    min-width="170"
                    v-slot="{ row }"
                >
                    <MyPopover v-model="row.updateContent" />
                </el-table-column>

                <el-table-column prop="updateUrl" label="超链接" min-width="120" v-slot="{ row }">
                    {{ row.updateUrl | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="isForceUpdate"
                    label="是否强制更新"
                    min-width="120"
                    v-slot="{ row }"
                >
                    <i
                        :class="{
                            'c-success': row.isForceUpdate == 1,
                            'c-danger': row.isForceUpdate == 2,
                        }"
                    >
                        {{ row.isForceUpdate == 1 ? "是" : row.isForceUpdate == 2 ? "否" : "— —" }}
                    </i>
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

                <el-table-column label="操作" width="100" fixed="right" v-slot="scope">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(scope.row)"
                        >编辑
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="版本信息"
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
                <el-form-item label="app版本编号" prop="versionCode">
                    <el-input v-model="form.versionCode" clearable></el-input>
                </el-form-item>
                <el-form-item label="app版本名字" prop="versionName">
                    <el-input v-model="form.versionName" clearable></el-input>
                </el-form-item>
                <el-form-item label="更新内容" prop="updateContent">
                    <el-input v-model="form.updateContent" clearable></el-input>
                </el-form-item>
                <el-form-item label="超链接" prop="updateUrl">
                    <el-input v-model="form.updateUrl" clearable></el-input>
                </el-form-item>
                <el-form-item label="平台类型" prop="apkType">
                    <el-radio v-model="form.apkType" :label="1">安卓</el-radio>
                    <el-radio v-model="form.apkType" :label="2">ios</el-radio>
                </el-form-item>
                <el-form-item label="是否强制更新" prop="isForceUpdate">
                    <el-radio v-model="form.isForceUpdate" :label="1">是</el-radio>
                    <el-radio v-model="form.isForceUpdate" :label="2">否</el-radio>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import {
    getApkVersionList as getTable,
    addApk as insertRow,
    updateApk as updateRow,
} from "@/require/clientConfig";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            dialogVisible: false,
            form: {},
            rules: {},
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
                        this.asyInsertRow(this.form); // 实际为添加接口
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
