<template>
    <div class="container">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true" class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="queryForm.name" clearable placeholder="用户昵称"></el-input>
                </el-form-item>

                <el-form-item label="姓名" class="form_right25">
                    <el-input
                        v-model="queryForm.userName"
                        clearable
                        placeholder="用户姓名"
                    ></el-input>
                </el-form-item>

                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>

                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="success" @click="handleShowDialog()" icon="el-icon-plus"
                        >添加管理员
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
                <el-table-column prop="id" label="ID" min-width="100" v-slot="{ row }">
                    {{ row.id | fmtBlank }}
                </el-table-column>

                <el-table-column prop="name" label="昵称" min-width="120" v-slot="{ row }">
                    {{ row.name | fmtBlank }}
                </el-table-column>

                <el-table-column prop="username" label="姓名" min-width="120" v-slot="{ row }">
                    {{ row.username | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作" width="220" v-slot="{ row }">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(row)"
                        >编辑
                    </el-button>
                    <el-button
                        disabled
                        type="warning"
                        size="mini"
                        icon="el-icon-user"
                        @click="handleShowDialog2(row)"
                        >权限配置
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
        <!-- 编辑窗口 -->
        <DialogWrapper
            title="管理员信息"
            width="500px"
            :dialogVisible="infoVisible"
            :handleClose="handleClose"
            :handleSubmit="handleSubmit"
            :handleCancen="handleClose"
        >
            <el-form
                :model="infoForm"
                label-position="right"
                label-width="50px"
                ref="infoForm"
                size="small"
            >
                <el-form-item label="昵称" prop="name">
                    <el-input v-model="infoForm.name" clearable></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="username">
                    <el-input v-model="infoForm.username" clearable></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="infoForm.password" clearable></el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>
        <!-- 权限窗口 -->
        <DialogWrapper
            title="权限配置"
            width="500px"
            :dialogVisible="authorityVisible"
            :handleClose="handleTreeClose"
            :handleSubmit="handleTreeSubmit"
            :handleCancen="handleTreeClose"
        >
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-tree
                :data="treeData"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                :default-checked-keys="checkedKeys"
                :props="defaultProps"
            >
            </el-tree>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import {
    selectAdminList as getTable,
    // selectAdmin, // 废弃接口
    editAdmin as updateRow,
    addAdmin as insertRow,
    selectAdminMenu,
    updateAdminMenu,
} from "@/require/systemSet";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            updateRow,
            insertRow,
            infoVisible: false,
            authorityVisible: false,
            infoForm: {}, // 管理员信息表单
            treeData: [
                // {
                //     id: 1,
                //     label: "一级 1",
                //     children: [
                //         {
                //             id: 4,
                //             label: "二级 1-1",
                //             children: [
                //                 {
                //                     id: 9,
                //                     label: "三级 1-1-1",
                //                 },
                //                 {
                //                     id: 10,
                //                     label: "三级 1-1-2",
                //                 },
                //             ],
                //         },
                //     ],
                // },
            ],
            defaultProps: {
                children: "subMenulist",
                label: "name",
            },
            checkedKeys: [], // 默认勾选项
            checkAll: false,
        };
    },
    methods: {
        // 管理员窗口
        handleShowDialog(row = {}) {
            this.infoVisible = true;
            this.currentRow = row;
            this.infoForm = { ...row };
        },
        handleClose() {
            this.infoVisible = false;
        },
        handleSubmit() {
            this.$refs.infoForm.validate(valid => {
                if (valid) {
                    if (this.infoForm.id) {
                        this.asyUpdateRow({ data: this.infoForm });
                    } else {
                        this.asyInsertRow(this.infoForm);
                    }
                    this.infoVisible = false;
                }
            });
        },
        // 👇权限配置窗口
        handleTreeClose() {
            this.authorityVisible = false;
        },
        async handleShowDialog2(row) {
            this.authorityVisible = true;
            this.currentRow = row;
            try {
                let res = await selectAdminMenu({ adminid: row.id });
                if (res.code === 0 && res.data) {
                    // 获取树状结构
                    this.treeData = res.data;
                    // 获取已选项
                    let arr = [];
                    let checkAll = true;
                    res.data.map(i => {
                        i.subMenulist.map(j => {
                            if (j.ischeck) {
                                arr.push(j.id);
                            } else {
                                checkAll = false;
                            }
                        });
                    });
                    this.checkAll = checkAll ? true : false;
                    this.checkedKeys = arr;
                }
            } catch (error) {
                throw error;
            }
        },
        async handleTreeSubmit() {
            try {
                let tree = this.$refs.tree;
                let menulist = tree.getCheckedKeys().concat(tree.getHalfCheckedKeys());
                let res = await updateAdminMenu({
                    adminid: this.currentRow.id,
                    menulist: JSON.stringify(menulist),
                });
                if (res.code === 0) {
                    messageTip("success", res.tip);
                } else {
                    messageTip("error", res.tip);
                }
                this.authorityVisible = false;
            } catch (error) {
                throw error;
            }
        },
        handleCheckAllChange(val) {
            if (this.checkAll) {
                this.$refs.tree.setCheckedNodes(this.treeData);
            } else {
                this.$refs.tree.setCheckedKeys([]);
            }
        },
    },
};
</script>
