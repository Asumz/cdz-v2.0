<template>
    <!-- 拓展意义不大, 主要为了使用v-model的固定操作 -->
    <div class="myPopover">
        <el-popover
            v-model="myVisible"
            width="200"
            :placement="placement"
            :content="value"
            :trigger="trigger"
        >
            <!-- <template v-slot:content></template> -->
            <!-- 缩写 <template #content></template> -->
            <slot name="content"></slot>
            <template slot="reference">
                <!-- 注意: 两个插槽同时使用 必须 <template #default></template> -->
                <slot>
                    <i class="oveflow_ecllipsis">
                        {{ value | fmtBlank }}
                    </i>
                </slot>
            </template>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "MyPopover",
    props: {
        value: {
            type: String,
            default: "",
        },
        placement: {
            type: String,
            default: "right",
        },
        // :visible.sync = "any"
        // 该属性在hover下无效
        visible: {
            type: Boolean,
            default: false,
        },
        trigger: {
            type: String,
            default: "hover",
        },
    },
    data() {
        return {
            myVisible: this.visible,
        };
    },
    watch: {
        visible(val) {
            this.$emit("update:visible", val);
        },
    },
};
</script>

<style lang="less" scoped></style>
