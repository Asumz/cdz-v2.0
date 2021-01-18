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
                <el-table-column label="页面" min-width="100" v-slot="{ row }">
                    {{ row.page | fmtBlank }}
                </el-table-column>

                <el-table-column label="分类" min-width="350" v-slot="{ row }">
                    <div v-if="row.page == '使用帮助'">
                        <el-select
                            v-if="row.classify"
                            v-model="row.id"
                            filterable
                            size="mini"
                            style="width: 150px;"
                        >
                            <el-option
                                v-for="item in row.classify"
                                :key="item.id"
                                :label="item.problemTitle"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            v-model="row.problemTitle"
                            size="mini"
                            placeholder="新建 / 重命名"
                            style="width: 180px;"
                        ></el-input>
                    </div>
                </el-table-column>

                <!-- <el-table-column label="选项" min-width="120" v-slot="{ row }">
                   
                </el-table-column> -->

                <el-table-column label="操作" width="100" fixed="right" v-slot="{ row }">
                    <el-button
                        size="mini"
                        icon="el-icon-edit"
                        @click="goto(row)"
                        :disabled="editDisabled(row)"
                        >编辑
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" /> -->
    </div>
</template>

<script>
import { selectUseHelp } from "@/require/richTextManage";
export default {
    data() {
        return {
            loading: false,
            tableData: [
                // options 可拓展更多可选项
                { page: "使用帮助", classify: null, options: null },
                { page: "关于我们", classify: null, options: null },
                { page: "用户协议", classify: null, options: null },
            ],
        };
    },
    async created() {
        let promiseArr = [this.asySelectUseHelp()];
        let arr = await Promise.all(promiseArr);

        this.tableData.map(row => {
            arr.map(item => {
                if (row.page == item.page) {
                    for (var key in item) {
                        if (key != "page") {
                            this.$set(row, key, item[key]);
                        }
                    }
                }
            });
        });
    },
    methods: {
        async asySelectUseHelp() {
            try {
                let res = await selectUseHelp();
                if (res.code === 0 && res.data) {
                    return { page: "使用帮助", classify: res.data };
                }
            } catch (error) {
                throw error;
            }
        },
        goto(row) {
            let id = row.id ? `&id=${row.id}` : "";
            let problemTitle = row.problemTitle ? `&problemTitle=${row.problemTitle}` : "";
            let str = "page=" + row.page + id + problemTitle;
            this.$router.push("/richTextManage/pageList/edit?" + str);
        },
        editDisabled(row) {
            let disabled = row.page == "使用帮助" && !row.id && !row.problemTitle ? true : false;
            return disabled;
        },
    },
};
</script>
