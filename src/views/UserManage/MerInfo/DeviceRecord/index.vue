<template>
    <div>
        <!-- <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
                </el-form-item>
            </el-form>
        </el-card> -->

        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column label="设备编号" min-width="170" v-slot="{ row }">
                    <!-- {{ row.ordernum | fmtBlank }} -->
                </el-table-column>

                <el-table-column label="产权比例" min-width="170" v-slot="{ row }">
                    <!-- {{ row.ordernum | fmtBlank }} -->
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
import mixins from "@/mixins";
import {} from "@/require/userManage";
export default {
    mixins: [mixins],
    data() {
        return {
            // getTable
        };
    },
    computed: {
        userId() {
            return this.$route.query.id;
        },
        conditions() {
            return { ...this.queryForm, userId: this.userId };
        },
    },
    methods: {},
};
</script>
