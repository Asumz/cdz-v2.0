<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" v-model="queryForm" size="small">
                <el-form-item label="审批人" class="form_right25">
                    <el-input v-model="queryForm.opename" placeholder="审批人" clearable></el-input>
                </el-form-item>

                <el-form-item label="申请人" class="form_right25">
                    <el-input v-model="queryForm.objname" placeholder="申请人" clearable></el-input>
                </el-form-item>

                <el-form-item label="类型" class="form_right25">
                    <el-select v-model="queryForm.type" clearable>
                        <el-option label="申请中" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                        <el-option label="拒绝" value="2"></el-option>
                    </el-select>
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

                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
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
                <el-table-column prop="opeid" label="审批人ID" min-width="80" v-slot="{ row }">
                    {{ row.opeid | fmtBlank }}
                </el-table-column>

                <el-table-column prop="opename" label="审批人" min-width="130" v-slot="{ row }">
                    {{ row.opename | fmtBlank }}
                </el-table-column>

                <el-table-column prop="objid" label="申请人ID" min-width="80" v-slot="{ row }">
                    {{ row.objid | fmtBlank }}
                </el-table-column>

                <el-table-column prop="objname" label="申请人" min-width="130" v-slot="{ row }">
                    {{ row.objname | fmtBlank }}
                </el-table-column>

                <!-- <el-table-column prop="source" label="操作来源" min-width="120">
                </el-table-column> -->

                <el-table-column prop="type" label="操作类型" min-width="120" v-slot="{ row }">
                    <span
                        :class="{
                            'c-warning': row.type === 0,
                            'c-success': row.type === 1,
                            'c-danger': row.type === 2,
                        }"
                    >
                        {{
                            row.type === 0
                                ? "申请中"
                                : row.type === 1
                                ? "通过"
                                : row.type === 2
                                ? "拒绝"
                                : "— —"
                        }}
                    </span>
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.createTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作" width="190" v-slot="{ row }">
                    <el-button size="mini" icon="el-icon-chat-dot-round" class="mr-10" disabled>备注</el-button>
                    <el-popover placement="bottom" width="160" v-model="row.visible">
                        <p>允许通过该条申请记录吗？</p>
                        <div style="text-align: right; margin: 5px">
                            <el-button size="mini" type="danger" @click="asyEditUserOper(row, 2)"
                                >拒绝
                            </el-button>
                            <el-button type="success" size="mini" @click="asyEditUserOper(row, 1)"
                                >通过
                            </el-button>
                        </div>
                        <el-button
                            slot="reference"
                            type="warning"
                            size="mini"
                            icon="el-icon-user"
                            plain
                            :disabled="row.type !== 0"
                            >审批
                        </el-button>
                    </el-popover>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
import mixins from "@/mixins";
import dateTimeJS from "@/utils/dateTime";
import { queryUserOperlist as getTable, editUserOper } from "@/require/userManage";

export default {
    mixins: [mixins],   
        data() {
        return {
            getTable,
            pickerOptions: dateTimeJS,
        };
    },
    methods: {
        async asyGetTableInner(data) {
            this.tableData = data.recordlist;
            this.totalPage = data.totalnum;
        },
        // 审批操作
        async asyEditUserOper(row, type) {
            try {
                let res = await editUserOper({ id: row.id, type });
                row.visible = false;
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    row.type = type === 1 ? 1 : 2;
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                row.visible = false;
                throw error;
            }
        },
    },
};
</script>
