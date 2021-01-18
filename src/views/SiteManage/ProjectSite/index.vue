<template>
    <div class="communManageCon">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="站点名称" class="form_right25">
                    <el-input v-model="queryForm.name" placeholder="站点名称" clearable></el-input>
                </el-form-item>

                <el-form-item label="地址" class="form_right25 w220">
                    <el-input v-model="queryForm.address" placeholder="地址" clearable></el-input>
                </el-form-item>

                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search" disabled
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
                </el-form-item>
                <el-form-item class="content_btn w100">
                    <el-button type="success" @click="handleShowDialog()" icon="el-icon-plus" disabled
                        >添加站点
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
                    prop="areaOnlyCode"
                    label="站点编号"
                    min-width="80"
                    v-slot="{ row }"
                >
                    {{ row.areaOnlyCode | fmtBlank }}
                </el-table-column>

                <el-table-column prop="name" label="站点名称" min-width="180" v-slot="{ row }">
                    {{ row.name | fmtBlank }}
                </el-table-column>

                <el-table-column prop="buildStatus" label="建设状态" min-width="120">
                    <template slot-scope="{ row }">
                        {{
                            row.buildStatus == 1
                                ? "待建设"
                                : row.buildStatus == 2
                                ? "建设中"
                                : row.buildStatus == 3
                                ? "待验收"
                                : row.buildStatus == 4
                                ? "已运营"
                                : "— —"
                        }}
                    </template>
                </el-table-column>

                <el-table-column prop="areaPlace" label="设备位置" min-width="120">
                    <template slot-scope="{ row }">
                        {{
                            row.areaPlace == 1
                                ? "地面"
                                : row.areaPlace == 2
                                ? "地下"
                                : row.areaPlace == 3
                                ? "地面、地下"
                                : "— —"
                        }}
                    </template>
                </el-table-column>

                <el-table-column prop="address" label="地址" min-width="220" v-slot="{ row }">
                    {{ row.address | fmtBlank }}
                </el-table-column>

                <el-table-column prop="lon" label="经度" min-width="120" v-slot="{ row }">
                    {{ row.lon | fmtBlank }}
                </el-table-column>

                <el-table-column prop="lat" label="纬度" min-width="120" v-slot="{ row }">
                    {{ row.lat | fmtBlank }}
                </el-table-column>

                <el-table-column label="计费模板" min-width="170" v-slot="{ row }">
                    <p>ID: {{ row.tempid | fmtBlank }}</p>
                    <p>名称: {{ row.tempName | fmtBlank }}</p>
                </el-table-column>

                <el-table-column prop="areaImg" label="站点图片" v-slot="{ row }">
                    <MyImage v-model="row.areaImg" />
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
            title="站点信息"
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
                <el-form-item label="站点名称" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" clearable></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="lon">
                    <el-input v-model="form.lon" clearable></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="lat">
                    <el-input v-model="form.lat" clearable></el-input>
                </el-form-item>
                <el-form-item label="计费版本" prop="tempid">
                    <el-select v-model="form.tempid" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.billver"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="建设状态" prop="buildStatus">
                    <el-select v-model="form.buildStatus" filterable placeholder="请选择">
                        <el-option label="待建设" :value="1"></el-option>
                        <el-option label="建设中" :value="2"></el-option>
                        <el-option label="待验收" :value="3"></el-option>
                        <el-option label="已运营" :value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="设备位置" prop="areaPlace">
                    <el-select v-model="form.areaPlace" filterable placeholder="请选择">
                        <el-option label="地面" :value="1"></el-option>
                        <el-option label="地下" :value="2"></el-option>
                        <el-option label="地面、地下" :value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="站点图片" prop="areaImg">
                    <Upload v-model="form.areaImg" />
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkNumber, checkEmpty } from "@/utils/ele";
import {
    getCommunInfo as getTable,
    delCommunInfo as deleteRow,
    addCommunInfo as insertRow,
    updateCommunInfo as updateRow,
    selectBillver,
} from "@/require/siteManage";

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
                name: [{ required: true, validator: checkEmpty, trigger: "blur" }],
                lon: [{ required: true, validator: checkNumber, trigger: "blur" }],
                lat: [{ required: true, validator: checkNumber, trigger: "blur" }],
            },
            options: [],
        };
    },
    methods: {
        asyGetTableInner(){

        },
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
            // 为下拉框添加选项
            if (!this.options.length) {
                this.asySelectBillver();
            }
        },
        // 为下拉框添加选项
        async asySelectBillver() {
            let res = await selectBillver();
            if (res.code === 0) {
                this.options = res.data;
            }
        },
    },
};
</script>
