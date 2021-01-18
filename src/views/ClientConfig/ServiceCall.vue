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
                <el-table-column prop="serveName" label="服务名称" min-width="120" v-slot="{ row }">
                    {{ row.serveName | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="servePhone"
                    label="服务电话"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.servePhone | fmtBlank }}
                </el-table-column>

                <el-table-column prop="showType" label="服务类型" min-width="120" v-slot="{ row }">
                    {{
                        row.showType == 1
                            ? "服务电话"
                            : row.showType == 2
                            ? "故障报修"
                            : row.showType == 3
                            ? "联系平台"
                            : "— —"
                    }}
                </el-table-column>

                <el-table-column prop="serveImg" label="图片" width="80" v-slot="{ row }">
                    <MyImage v-model="row.serveImg" />
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

                <el-table-column label="操作" width="190" fixed="right" v-slot="scope">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(scope.row)"
                        >编辑
                    </el-button>
                    <el-button
                        @click.native.prevent="
                            asyDeleteRow({ index: scope.$index, id: scope.row.id })
                        "
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
            title="服务电话信息"
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
                <el-form-item label="服务名称" prop="serveName">
                    <el-input v-model="form.serveName" clearable></el-input>
                </el-form-item>
                <el-form-item label="服务电话" prop="servePhone">
                    <el-input v-model="form.servePhone" clearable></el-input>
                </el-form-item>
                <el-form-item label="服务类型" prop="showType">
                    <el-select v-model="form.showType" filterable>
                        <el-option label="服务电话" value="1"></el-option>
                        <el-option label="故障报修" value="2"></el-option>
                        <el-option label="联系平台" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="图片" prop="serveImg">
                    <Upload v-model="form.serveImg" />
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkEmpty } from "@/utils/ele";
import {
    phoneManageData as getTable,
    insertByParame as insertRow,
    updateByParame as updateRow,
    deleteById as deleteRow,
} from "@/require/clientConfig";
export default {
    name: "ServiceCall",
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            deleteRow,
            dialogVisible: false,
            form: {},
            currentRow: null,
            rules: {
                serveName: { required: true, validator: checkEmpty, trigger: "blur" },
                servePhone: { required: true, validator: checkEmpty, trigger: "blur" },
                showType: { required: true, validator: checkEmpty, trigger: "blur" },
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
