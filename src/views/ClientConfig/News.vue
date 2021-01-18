<template>
    <div>
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="文章标题" class="form_right25">
                    <el-input v-model="queryForm.articleTitle" clearable></el-input>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button icon="el-icon-search" type="primary" @click="handleSearch"
                        >查询
                    </el-button>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button icon="el-icon-plus" type="success" @click="handleShowDialog()"
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
                fit
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column
                    prop="articleTitle"
                    label="文章标题"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.articleTitle | fmtBlank }}
                </el-table-column>

                <el-table-column prop="articleSource" label="来源" min-width="120" v-slot="{ row }">
                    {{ row.articleSource | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="articleContent"
                    label="内容"
                    min-width="120"
                    v-slot="{ row }"
                >
                    <MyPopover v-model="row.articleContent" />
                </el-table-column>

                <el-table-column prop="articleCover" label="封面" width="80" v-slot="{ row }">
                    <MyImage v-model="row.articleCover" />
                </el-table-column>

                <el-table-column
                    prop="coverStatus"
                    label="图片位置"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.coverStatus == 1 ? "水平铺满" : row.coverStatus == 2 ? "右侧" : "— —" }}
                </el-table-column>

                <el-table-column label="是否上架" min-width="80" v-slot="{ row }">
                    <i :class="{ 'c-success': row.isShelf === 1, 'c-danger': row.isShelf === 0 }">
                        {{ row.isShelf === 1 ? "是" : row.isShelf === 0 ? "否" : "— —" }}
                    </i>
                </el-table-column>

                <el-table-column label="是否推荐" min-width="80" v-slot="{ row }">
                    <i
                        :class="{
                            'c-success': row.recommendState == 1,
                            'c-danger': row.recommendState == 2,
                        }"
                    >
                        {{
                            row.recommendState == 1 ? "是" : row.recommendState == 2 ? "否" : "— —"
                        }}
                    </i>
                </el-table-column>

                <el-table-column prop="likeNum" label="点赞数" min-width="80" v-slot="{ row }">
                    {{ row.likeNum | fmtBlank }}
                </el-table-column>

                <el-table-column prop="browseNum" label="浏览次数" min-width="80" v-slot="{ row }">
                    {{ row.browseNum | fmtBlank }}
                </el-table-column>

                <el-table-column prop="shareNum" label="分享次数" min-width="80" v-slot="{ row }">
                    {{ row.shareNum | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.createTime | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="updateTime"
                    label="更新时间"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.updateTime | fmtBlank }}
                </el-table-column>

                <el-table-column label="操作" width="190" fixed="right" v-slot="scope">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(scope.row)"
                        >编辑
                    </el-button>
                    <el-button
                        @click.native.prevent="
                            asyDeleteRow({ index: scope.$index, id: scope.row.id })
                        "
                        icon="el-icon-delete"
                        type="danger"
                        size="mini"
                        >删除
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="新闻资讯"
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
                <el-form-item label="文章标题" prop="articleTitle">
                    <el-input v-model="form.articleTitle" clearable></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="articleSource">
                    <el-input v-model="form.articleSource" clearable></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="articleContent">
                    <el-input v-model="form.articleContent" clearable></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="articleCover">
                    <Upload v-model="form.articleCover" />
                </el-form-item>

                <el-form-item label="图片位置" prop="coverStatus">
                    <el-radio v-model="form.coverStatus" :label="1">水平铺满</el-radio>
                    <el-radio v-model="form.coverStatus" :label="2">右侧</el-radio>
                </el-form-item>

                <el-form-item label="是否上架" prop="isShelf">
                    <el-radio v-model="form.isShelf" :label="1">是</el-radio>
                    <el-radio v-model="form.isShelf" :label="0">否</el-radio>
                </el-form-item>

                <el-form-item label="是否推荐" prop="recommendState">
                    <el-radio v-model="form.recommendState" label="1">是</el-radio>
                    <el-radio v-model="form.recommendState" label="2">否</el-radio>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkEmpty } from "@/utils/ele";
import {
    selectArticleList as getTable,
    insertArticle as insertRow,
    updateArticle as updateRow,
    delArticle as deleteRow,
} from "@/require/clientConfig";

export default {
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            deleteRow,
            dialogVisible: false,
            form: {},
            rules: {
                articleTitle: { required: true, validator: checkEmpty, trigger: "blur" },
                articleSource: { required: true, validator: checkEmpty, trigger: "blur" },
                articleContent: { required: true, validator: checkEmpty, trigger: "blur" },
                articleCover: { required: true, validator: checkEmpty, trigger: "blur" },
                coverStatus: { required: true, validator: checkEmpty, trigger: "blur" },
                isShelf: { required: true, validator: checkEmpty, trigger: "blur" },
                recommendState: { required: true, validator: checkEmpty, trigger: "blur" },
            },
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            console.log("submit!");
            this.$refs.form.validate(valid => {
                console.log("valid::", valid);
                if (valid) {
                    if (this.form.id) {
                        this.asyUpdateRow({ data: this.form });
                    } else {
                        this.asyInsertRow(this.form);
                    }
                    this.dialogVisible = false;
                }
            });
        },
        handleShowDialog(row = {}) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            this.currentRow = row;
            this.form = { ...row };
        },
    },
};
</script>
