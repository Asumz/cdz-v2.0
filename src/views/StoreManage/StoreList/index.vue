<template>
    <div class="cashManage">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="提现单号" class="form_right25 w220">
                    <el-input
                        v-model="queryForm.withdrawnum"
                        placeholder="请输入编号"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                        v-model="queryForm.startTime"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" class="form_right25 w200">
                    <el-date-picker
                        v-model="queryForm.endTime"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search" disabled
                        >查询
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column label="编号" min-width="170" v-slot="{ row }">
                    <!-- {{ row.withdrawnum | fmtBlank }} -->
                </el-table-column>

                <el-table-column label="所属区域" min-width="170" v-slot="{ row }">
                    <!-- {{ row.realname | fmtBlank }} -->
                </el-table-column>

                <el-table-column label="详细地址" min-width="170" v-slot="{ row }">
                    
                </el-table-column>

                <el-table-column
                    label="公司名称"
                    min-width="170"
                    v-slot="{ row }"
                >
                </el-table-column>

                <el-table-column label="负责人姓名" min-width="120" v-slot="{ row }">
                    <!-- {{ row.userMoney | fmtMoney }} -->
                </el-table-column>

                <el-table-column label="负责人联系电话" min-width="120" v-slot="{ row }">
                    <!-- {{ row.money | fmtMoney }} -->
                </el-table-column>

                <el-table-column prop="createTime" label="创建时间" width="170" v-slot="{ row }">
                    {{ row.createTime | fmtBlank }}
                </el-table-column>

                <el-table-column
                    label="操作"
                    width="100"
                    fixed="right"
                    v-slot="{ row }"
                >
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(row)"
                        >编辑
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
import mixins from "@/mixins";
import pickerOptions from "@/utils/dateTime";
export default {
    mixins: [mixins],
    data() {
        return {
            // getTable,
            pickerOptions,
        };
    },
    methods: {
        asyGetTableInner(data) {
        },
    },
};
</script>
