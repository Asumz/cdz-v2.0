<template>
    <div class="container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i>{{ page }}</i>
                <el-button
                    icon="el-icon-folder-checked"
                    type="success"
                    size="small"
                    class="float-r"
                    @click="asySaveEdit"
                    >保存
                </el-button>
            </div>
            <tinymce ref="tinymce" v-model="content" :height="400" />
        </el-card>
    </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import {
    selectUseHelpById, // 使用帮助
    insertOrupdateHelp,
    selectAbout, // 关于我们
    inOrUpAboutInfo,
    selectAgreeement, // 用户协议
    updateOrInsertAgreement,
} from "@/require/richTextManage";

export default {
    name: "EditRichText",
    components: { Tinymce },
    data() {
        return {
            content: "",
            id: null,
        };
    },
    computed: {
        page() {
            return this.$route.query.page;
        },
        userHelpId() {
            return this.$route.query.id;
        },
        problemTitle() {
            return this.$route.query.problemTitle;
        },
        queryParams() {
            if (this.page == "使用帮助") {
                return {
                    id: this.userHelpId,
                };
            }
            return;
        },
        editParams() {
            let { content } = this.mapPage;

            if (this.page == "使用帮助") {
                return {
                    id: this.userHelpId,
                    problemTitle: this.problemTitle,
                    [content]: this.content,
                };
            }
            return {
                id: this.id,
                [content]: this.content,
            };
        },
        mapPage() {
            let handleQuery, handleSave, content;
            switch (this.page) {
                case "使用帮助":
                    [handleQuery, handleSave, content] = [
                        selectUseHelpById,
                        insertOrupdateHelp,
                        "problemContent",
                    ];
                    break;
                case "关于我们":
                    [handleQuery, handleSave, content] = [
                        selectAbout,
                        inOrUpAboutInfo,
                        "aboutContent",
                    ];
                    break;
                case "用户协议":
                    [handleQuery, handleSave, content] = [
                        selectAgreeement,
                        updateOrInsertAgreement,
                        "agreementContent",
                    ];
                    break;
                default:
                    break;
            }
            return { handleQuery, handleSave, content };
        },
    },
    created() {
        this.asyGetData();
    },
    methods: {
        async asyGetData() {
            try {
                let { handleQuery, content } = this.mapPage;
                let res = await handleQuery(this.queryParams);
                if (res.code === 0 && res.data) {
                    this.content = res.data[content];
                    this.id = res.data.id;
                }
            } catch (error) {
                throw error;
            }
        },
        async asySaveEdit() {
            try {
                let { handleSave } = this.mapPage;
                let res = await handleSave(this.editParams);
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    this.$router.replace("/richTextManage/pageList");
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.container {
    padding: 20px;
}
</style>
