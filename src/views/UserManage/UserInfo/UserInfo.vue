<template>
    <div class="userInfo">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="昵称" class="form_right25">
                    <el-input
                        v-model="queryForm.username"
                        clearable
                        placeholder="用户昵称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="form_right25">
                    <el-input
                        v-model="queryForm.realname"
                        clearable
                        placeholder="用户姓名"
                    ></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25">
                    <el-input
                        v-model="queryForm.phoneNum"
                        clearable
                        placeholder="手机号"
                    ></el-input>
                </el-form-item>

                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button type="success" icon="el-icon-plus" @click="handleShowDialog"
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
                <el-table-column prop="username" label="昵称" min-width="120" v-slot="{ row }">
                    {{ row.username | fmtBlank }}
                </el-table-column>

                <el-table-column prop="realname" label="姓名" min-width="120" v-slot="{ row }">
                    {{ row.realname | fmtBlank }}
                </el-table-column>

                <el-table-column prop="phoneNum" label="手机号" min-width="120" v-slot="{ row }">
                    {{ row.phoneNum | fmtBlank }}
                </el-table-column>

                <el-table-column prop="balance" label="钱包余额" min-width="150" v-slot="{ row }">
                    <div>
                        充值余额：
                        <el-link type="primary" :underline="false">
                            {{ row.balance != null ? row.balance.toFixed(2) : "— —" }}
                        </el-link>
                    </div>
                    <div>
                        赠送金额：
                        <el-link type="primary" :underline="false">
                            {{ row.sendmoney != null ? row.sendmoney.toFixed(2) : "— —" }}
                        </el-link>
                    </div>
                </el-table-column>

                <el-table-column prop="" label="用户状态" min-width="80" v-slot="{ row }">
                    <el-tag :type="row.password ? '' : 'danger'">
                        {{ row.password ? "已注册" : "未注册" }}
                    </el-tag>
                </el-table-column>

                <el-table-column label="详情" width="120" v-slot="{ row }">
                    <router-link
                        :to="`/usermanage/userInfo/userWalletRecord?userId=${row.id}`"
                        tag="p"
                    >
                        <el-button size="mini" icon="el-icon-info">余额明细</el-button>
                    </router-link>
                    <router-link :to="`/usermanage/userInfo/userChargeRecord?userId=${row.id}`">
                        <el-button size="mini" icon="el-icon-info" class="mt-5">充电明细</el-button>
                    </router-link>
                </el-table-column>

                <el-table-column label="操作" width="120" v-slot="{ row }">
                    <el-button
                        :disabled="!!row.merid"
                        size="mini"
                        icon="el-icon-user"
                        type="warning"
                        plain
                        @click="
                            $router.push('/usermanage/merInfo/edit?edit=create&id=' + row.id)
                        "
                        >设为桩主
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
        <!-- 用户信息 -->
        <DialogWrapper
            title="用户信息"
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
                <el-form-item label="手机号" prop="phoneNum">
                    <el-input v-model="form.phoneNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="form.realname" clearable></el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import { getUserInfo as getTable, createUser as insertRow } from "@/require/userManage";
import mixins from "@/mixins";
import { checkPhone, checkEmpty } from "@/utils/ele";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            dialogVisible: false,
            form: {},
            rules: {
                phoneNum: { required: true, validator: checkPhone, trigger: "blur" },
                realname: { required: true, validator: checkEmpty, trigger: "blur" },
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
                    this.asyInsertRow(this.form);
                    this.dialogVisible = false;
                }
            });
        },
        handleShowDialog() {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
        },
    },
};
</script>
