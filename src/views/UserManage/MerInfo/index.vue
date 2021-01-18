<template>
    <div class="merInfo">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" v-model="queryForm" size="small">
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="queryForm.username" placeholder="昵称" clearable></el-input>
                </el-form-item>

                <el-form-item label="姓名" class="form_right25">
                    <el-input v-model="queryForm.realname" placeholder="姓名" clearable></el-input>
                </el-form-item>

                <el-form-item label="手机号" class="form_right25">
                    <el-input
                        v-model="queryForm.phonenum"
                        placeholder="手机号"
                        clearable
                    ></el-input>
                </el-form-item>

                <el-form-item label="地区" class="form_right25 w200">
                    <AreaCascader v-model="queryForm.areaValue" />
                </el-form-item>

                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
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
                <el-table-column prop="username" label="昵称" min-width="130" v-slot="{ row }">
                    {{ row.username | fmtBlank }}
                </el-table-column>

                <el-table-column prop="realname" label="姓名" min-width="100" v-slot="{ row }">
                    {{ row.realname | fmtBlank }}
                </el-table-column>

                <el-table-column prop="phonenum" label="手机号" min-width="120" v-slot="{ row }">
                    {{ row.phonenum | fmtBlank }}
                </el-table-column>

                <el-table-column prop="areaname" label="地区" min-width="220" v-slot="{ row }">
                    {{ row.areaname | fmtBlank }}
                </el-table-column>

                <el-table-column prop="totalEarn" label="总收益" min-width="100" v-slot="{ row }">
                    {{ row.totalEarn | fmtMoney }}
                </el-table-column>

                <el-table-column prop="nowEarn" label="收益余额" min-width="100" v-slot="{ row }">
                    {{ row.nowEarn | fmtMoney }}
                </el-table-column>

                <el-table-column prop="enabled" label="是否禁用" min-width="100" v-slot="{ row }">
                    <el-tag :type="mapEnabled(row.enabled).color">
                        {{ mapEnabled(row.enabled).text }}
                    </el-tag>
                </el-table-column>

                <el-table-column label="详情" width="110" fixed="right" v-slot="{ row }">
                    <el-button
                        size="mini"
                        icon="el-icon-info"
                        @click="$router.push('/usermanage/merInfo/deviceRecord?id=' + row.id)"
                        >充电桩
                    </el-button>
                </el-table-column>

                <el-table-column label="操作" width="100" fixed="right" v-slot="{ row }">
                    <el-button
                        size="mini"
                        icon="el-icon-edit"
                        @click="
                            $router.push('/usermanage/merInfo/edit?edit=update&id=' + row.id)
                        "
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
import { queryMeruserlist as getTable } from "@/require/userManage";
import { checkPhone, checkEmpty } from "@/utils/ele";
export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
        };
    },
    computed: {
        conditions() {
            const { areaValue, VNK, ...obj } = this.queryForm;
            if (areaValue) {
                var [province, city, country] = areaValue;
            }
            return { ...obj, province, city, country };
        },
    },
    methods: {
        mapEnabled(p) {
            let color, text;
            switch (p) {
                case 0:
                    [color, text] = ["primary", "申请中"];
                    break;
                case 1:
                    [color, text] = ["success", "正常"];
                    break;
                case 2:
                    [color, text] = ["warning", "禁用"];
                    break;
                case 3:
                    [color, text] = ["danger", "申请被拒绝"];
                    break;
                default:
                    [color, text] = ["info", "— —"];
                    break;
            }
            return { color, text };
        },
        asyGetTableInner(data) {
            this.tableData = data.meruserlist;
            this.totalPage = data.total;
        },
    },
};
</script>
