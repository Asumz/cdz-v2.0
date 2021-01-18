<template>
  <div class="dialogWrapper">
    <el-dialog
        :title="title"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        :width="width"
        :before-close="handleClose">
         <slot></slot>
        <span slot="footer" class="dialog-footer" v-if="!footerHide">
            <el-button @click="handleCancen">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '提示'
        },
        width: {
            type: [String , Number],
            default: '30%'
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },
        handleClose: {
            type: Function,
            default: ()=>{}
        },
        handleCancen: {
            type: Function,
            default: ()=>{}
        },
        handleSubmit: {
            type: Function,
            default: ()=>{}
        },
        footerHide: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>