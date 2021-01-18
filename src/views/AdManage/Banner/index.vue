<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="标题" class="form_right25">
                    <el-input v-model="queryForm.title" clearable></el-input>
                </el-form-item>

                <el-form-item label="位置" class="form_right25 w220">
                    <el-select v-model="queryForm.position" multiple clearable>
                        <el-option
                            v-for="(item, i) of options"
                            :key="i"
                            :label="item.title"
                            :value="item.key"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <router-link to="/admanage/banner/edit">
                        <el-button type="success" icon="el-icon-plus">新增</el-button>
                    </router-link>
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
                <el-table-column prop="title" label="标题" width="120" #default="{ row }">
                    {{ row.title | fmtBlank }}
                </el-table-column>

                <el-table-column prop="position" label="位置" min-width="120" v-slot="{ row }">
                    {{ mapPositions(row.position) | fmtBlank }}
                </el-table-column>

                <el-table-column prop="imgUrl" label="图片" width="80" v-slot="{ row }">
                    <MyImage v-model="row.imgUrl" />
                </el-table-column>

                <el-table-column label="跳转类型" min-width="80" v-slot="{ row }">
                    <MyPopover v-model="row.linkUrl" v-if="row.linkUrl">
                        <el-tag>url</el-tag>
                    </MyPopover>
                    <MyPopover v-else-if="row.description">
                        <template #content>
                            <i v-html="row.description"></i>
                        </template>
                        <template #default>
                            <el-tag type="warning">富文本</el-tag>
                        </template>
                    </MyPopover>
                    <el-tag type="danger" v-else>无跳转</el-tag>
                </el-table-column>

                <el-table-column prop="sn" label="排序" min-width="80" v-slot="{ row }">
                    {{ row.sn | fmtBlank }}
                </el-table-column>

                <el-table-column prop="startTime" label="开始时间" min-width="170" v-slot="{ row }">
                    {{ row.startTime | fmtBlank }}
                </el-table-column>

                <el-table-column prop="endTime" label="结束时间" min-width="170" v-slot="{ row }">
                    {{ row.endTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作" width="190" fixed="right" v-slot="{ row, $index }">
                    <el-button
                        size="mini"
                        icon="el-icon-edit"
                        @click="$router.push(`/admanage/banner/edit?id=${row.id}`)"
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
import {
    selectBanner as getTable,
    delBanner as deleteRow,
    getPositions,
} from "@/require/adManage";

export default {
    name: "banner",
    mixins: [mixins],
    data() {
        return {
            getTable,
            deleteRow,
            options: [],
        };
    },
    created() {
        this.asyGetPositions();
    },
    methods: {
        async asyGetPositions() {
            let res = await getPositions();
            if (res.code === 0 && res.data) {
                this.options = res.data;
            }
        },
        mapPositions(p) {
            let item = this.options.filter(item => item.key === p)[0];
            return item && item.title;
        },
    },
};
</script>
