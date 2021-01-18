<template>
    <div>
        <!-- <el-card class="box-card card_bottom0 cardForm">
            <el-form
                :inline="true"
                class="demo-form-inline"
                :model="queryForm"
                size="mini"
            >
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button
                        type="primary"
                        size="small"
                        @click="handleSearch"
                        icon="el-icon-search"
                        >查询</el-button
                    >
                </el-form-item>

                <el-form-item class="form_margin0 content_btn w80">
                    <el-button
                        type="primary"
                        size="small"
                        @click="handleShowDialog()"
                        icon="el-icon-plus"
                        >新增关联</el-button
                    >
                </el-form-item>
            </el-form>
        </el-card> -->

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                设备编号: <b>{{ equipmentCode }}</b>
                <el-button
                    icon="el-icon-plus"
                    class="float-r"
                    type="success"
                    size="mini"
                    @click="handleShowDialog()"
                    >新增关联
                </el-button>
            </div>
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column prop="username" label="用户昵称" min-width="130" v-slot="{ row }">
                    {{ row.username | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="advertDivide"
                    label="广告费分润"
                    min-width="100"
                    v-slot="{ row }"
                >
                    {{ row.advertDivide | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="chargeDivide"
                    label="充电费分润"
                    min-width="100"
                    v-slot="{ row }"
                >
                    {{ row.chargeDivide | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="serverDivide"
                    label="服务费分润"
                    min-width="100"
                    v-slot="{ row }"
                >
                    {{ row.serverDivide | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作" width="200" v-slot="scope">
                    <el-button icon="el-icon-edit" size="mini" @click="handleShowDialog(scope.row)">
                        编辑
                    </el-button>
                    <el-button
                        type="danger"
                        size="mini"
                        @click="asyDelete(scope.$index, tableData, scope.row)"
                        >解除关联
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="分润信息"
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
                <el-form-item label="手机号" prop="phonenum" v-if="!currentRow.userId">
                    <el-input v-model="form.phonenum" clearable></el-input>
                </el-form-item>

                <el-form-item label="广告费分润" prop="advertDivide">
                    <el-input-number
                        v-model="form.advertDivide"
                        :min="0"
                        :max="myAdd(surpAdvert, currentRow.advertDivide || 0)"
                        :step="0.1"
                    ></el-input-number>
                    <i class="c-danger font-12 ml-5"
                        >*可分配比： {{ myAdd(surpAdvert, currentRow.advertDivide || 0) }}
                    </i>
                </el-form-item>

                <el-form-item label="充电费分润" prop="chargeDivide">
                    <el-input-number
                        v-model="form.chargeDivide"
                        :min="0"
                        :max="myAdd(surpCharge, currentRow.chargeDivide || 0)"
                        :step="0.1"
                    ></el-input-number>
                    <i class="c-danger font-12 ml-5"
                        >*可分配比： {{ myAdd(surpCharge, currentRow.chargeDivide || 0) }}
                    </i>
                </el-form-item>

                <el-form-item label="服务费分润" prop="serverDivide">
                    <el-input-number
                        v-model="form.serverDivide"
                        :min="0"
                        :max="myAdd(surpServer, currentRow.serverDivide || 0)"
                        :step="0.1"
                    ></el-input-number>
                    <i class="c-danger font-12 ml-5"
                        >*可分配比： {{ myAdd(surpServer, currentRow.serverDivide || 0) }}
                    </i>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import {
    queryMeruserDevice,
    editMeruserDevice,
    removeMeruserDevice,
    addMeruserDevice,
} from "@/require/deviceManage";
import { queryUserByPhonenum } from "@/require/userManage";
import { checkPhone, checkEmpty } from "@/utils/ele";
import { add } from "@/utils/util";

export default {
    mixins: [mixins],
    data() {
        return {
            form: {},
            rules: {
                phonenum: { required: true, validator: checkPhone, trigger: "blur" },
                advertDivide: { required: true, validator: checkEmpty, trigger: "blur" },
                chargeDivide: { required: true, validator: checkEmpty, trigger: "blur" },
                serverDivide: { required: true, validator: checkEmpty, trigger: "blur" },
            },
            currentRow: {},
            dialogVisible: false,
            surpAdvert: 0, // 广告费可分配分润比
            surpCharge: 0, // 充电费可分配分润比
            surpServer: 0, // 服务费可分配分润比
        };
    },
    computed: {
        equipmentCode() {
            return this.$route.query.equipmentCode;
        },
    },
    methods: {
        myAdd(a, b) {
            return add(a, b);
        },
        async asyGetTable(data) {
            try {
                this.loading = true;
                let params = { ...data, equipmentCode: this.equipmentCode };
                let res = await queryMeruserDevice(params);
                this.loading = false;
                if (res.code === 0 && res.data) {
                    this.tableData = res.data.meruserlist;
                    this.surpAdvert = res.data.surpAdvert;
                    this.surpCharge = res.data.surpCharge;
                    this.surpServer = res.data.surpServer;
                    this.totalPage = res.data.total;
                }
            } catch (error) {
                if (error == "拦截请求") {
                    this.loading = true;
                    return;
                }
                this.loading = false;
            }
        },
        // 添加关联
        async asyInsert(data) {
            try {
                let res = await addMeruserDevice({ ...data, equipmentCode: this.equipmentCode });
                if (res.code === 0) {
                    this.asyGetTable(this.queryForm);
                    messageTip("success", res.tip);
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        async asyUpdate(data) {
            try {
                let res = await editMeruserDevice(data);
                if (res.code === 0) {
                    for (let key in data) {
                        this.currentRow[key] = data[key];
                    }
                    messageTip("success", res.tip);
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        // 解除关联
        asyDelete(index, rows, row) {
            try {
                alertConfim("确认解除关联吗?", async () => {
                    let res = await removeMeruserDevice(row);
                    if (res.code === 0) {
                        rows.splice(index, 1);
                        messageTip("success", res.tip);
                    } else {
                        messageTip("error", res.tip);
                    }
                });
            } catch (error) {
                throw error;
            }
        },
        // dialog
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    if (this.form.userId) {
                        this.asyUpdate(this.form);
                    } else {
                        // 根据手机号获取uid
                        let res = await queryUserByPhonenum({
                            phonenum: this.form.phonenum,
                        });
                        if (res.code === 0) {
                            this.form.userId = res.data && res.data.id;
                        }
                        this.asyInsert(this.form);
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
