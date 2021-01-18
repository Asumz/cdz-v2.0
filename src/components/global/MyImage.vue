<template>
    <div class="myImage">
        <div class="demo-image__preview">
            <el-image :style="{ width, height }" :src="value" :preview-src-list="[value]">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </div>
    </div>
</template>

<script>
export default {
    name: "MyImage",
    props: {
        value: {
            requied: true,
            type: String,
            default: "",
        },
        width: {
            type: [Number, String],
            default: "100%",
        },
        height: {
            type: [Number, String],
            default: "100%",
        },
    },
};
</script>

<style lang="less" scoped></style>
