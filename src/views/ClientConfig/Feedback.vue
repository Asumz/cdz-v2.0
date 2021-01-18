<template>
    <div class="feedback">
        <el-card class="box-card">
            <el-table
                :data="tableData"
                v-loading="loading"
                border
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column prop="userName" label="用户名" min-width="170" v-slot="{ row }">
                    {{ row.userName | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="feedbackType"
                    label="反馈类型"
                    min-width="80"
                    v-slot="{ row }"
                >
                    <i
                        :class="{
                            'c-danger': row.feedbackType == 1,
                            'c-warning': row.feedbackType == 2,
                        }"
                        >{{
                            row.feedbackType == 1 ? "投诉" : row.feedbackType == 2 ? "建议" : "— —"
                        }}
                    </i>
                </el-table-column>

                <el-table-column prop="content" label="反馈内容" min-width="180" v-slot="{ row }">
                    <MyPopover v-model="row.content" />
                </el-table-column>

                <el-table-column prop="starRating" label="评级" min-width="180" v-slot="{ row }">
                    <el-rate
                        v-model="row.starRating"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                    >
                    </el-rate>
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="160"
                    v-slot="{ row }"
                >
                    {{ row.createTime | fmtBlank }}
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
    </div>
</template>

<script>
import mixins from "@/mixins";
import { selectFeedback as getTable } from "@/require/clientConfig";
export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
        };
    },
};
</script>
