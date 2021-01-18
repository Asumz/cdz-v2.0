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
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
                </el-form-item>
                <el-form-item class="content_btn w100">
                    <el-button
                        type="success"
                        icon="el-icon-plus"
                        @click="$router.push('/siteManage/siteList/edit')"
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
                <el-table-column label="站点编号" min-width="80" v-slot="{ row }">
                    {{ row.areaOnlyCode ? row.areaOnlyCode.padStart(6, "0") : "— —" }}
                </el-table-column>

                <el-table-column label="站点名称" min-width="180" v-slot="{ row }">
                    {{ row.name | fmtBlank }}
                </el-table-column>

                <el-table-column label="建设状态" min-width="120" v-slot="{ row }">
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
                </el-table-column>

                <el-table-column label="设备位置" min-width="120" v-slot="{ row }">
                    {{
                        row.areaPlace == 1
                            ? "地面"
                            : row.areaPlace == 2
                            ? "地下"
                            : row.areaPlace == 3
                            ? "地面、地下"
                            : "— —"
                    }}
                </el-table-column>

                <el-table-column label="地址" min-width="220" v-slot="{ row }">
                    {{ row.address | fmtBlank }}
                </el-table-column>

                <!-- <el-table-column label="经度" min-width="120" v-slot="{ row }">
                    {{ row.lon | fmtBlank }}
                </el-table-column>

                <el-table-column label="纬度" min-width="120" v-slot="{ row }">
                    {{ row.lat | fmtBlank }}
                </el-table-column> -->

                <el-table-column label="计费模板" min-width="170" v-slot="{ row }">
                    <p>ID: {{ row.tempid | fmtBlank }}</p>
                    <p>名称: {{ row.tempName | fmtBlank }}</p>
                </el-table-column>

                <el-table-column label="站点图片" v-slot="{ row }">
                    <MyImage v-model="row.areaImg" />
                </el-table-column>

                <el-table-column label="操作" width="190" fixed="right" v-slot="{ row, $index }">
                    <el-button
                        size="mini"
                        icon="el-icon-edit"
                        @click="$router.push('/siteManage/siteList/edit?id=' + row.id)"
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
    </div>
</template>

<script>
import mixins from "@/mixins";
import { getCommunInfo as getTable, delCommunInfo as deleteRow } from "@/require/siteManage";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            deleteRow,
        };
    },
};
</script>
