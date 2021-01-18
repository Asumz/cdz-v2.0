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
                <el-table-column prop="carType" label="车辆类型" min-width="120" v-slot="{ row }">
                    {{ row.carType | fmtBlank }}
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

                <el-table-column label="操作" width="190" fixed="right" v-slot="{ row }">
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
                <el-form-item label="车辆类型" prop="carType">
                    <el-input v-model="form.carType" clearable></el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkEmpty } from "@/utils/ele";
import {
    selectCarType as getTable,
    insertCarType as insertRow,
    updateCarType as updateRow,
    delCarType as deleteRow,
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
                carType: { required: true, validator: checkEmpty, trigger: "blur" },
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
