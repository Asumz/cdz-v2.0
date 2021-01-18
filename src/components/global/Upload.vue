<template>
    <div class="upload">
        <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-upload="beforeAvatarUpload"
        >
            <div v-if="myValue" v-loading="loading">
                <img
                    :src="myValue"
                    class="avatar-loaded"
                    :style="{ width, height, lineHeight: height }"
                />
            </div>
            <div v-else v-loading="loading">
                <i
                    class="el-icon-plus avatar-uploader-icon"
                    :style="{ width, height, 'line-height': height }"
                ></i>
            </div>
            <div slot="tip" class="el-upload__tip" v-if="!hideTip">
                <i class="c-info">{{ tip }}</i>
            </div>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: "Upload",
    props: {
        value: {
            requied: true,
            type: String,
            default: "",
        },
        hideTip: {
            type: Boolean,
            default: false,
        },
        bannerSize: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "178px",
        },
        height: {
            type: String,
            default: "178px",
        },
        tip: {
            type: String,
            default: "*只能上传jpg/png文件，且不超过2MB",
        },
    },
    data() {
        return {
            myValue: this.value,
            loading: false,
        };
    },
    watch: {
        value(val) {
            this.myValue = this.value;
        },
    },
    computed: {
        action() {
            if (process.env.NODE_ENV === "development") {
                //开发环境
                return "/api/upload/uploadFile";
            }
            return window.location.origin + "/web/upload/uploadFile";
        },
    },
    methods: {
        beforeAvatarUpload(file) {
            this.loading = true;
            const isJPG = file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        uploadSuccess(response, file, fileList) {
            this.loading = false;
            this.$emit("input", (this.myValue = response.uploadFilePath));
        },
        uploadError(err, file, fileList) {
            this.loading = false;
            messageTip("error", "上传失败!");
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    // width: 178px;
    // height: 178px;
    // line-height: 178px;
    text-align: center;
}
.avatar-loaded {
    // width: 178px;
    // height: 178px;
    display: block;
}
</style>
