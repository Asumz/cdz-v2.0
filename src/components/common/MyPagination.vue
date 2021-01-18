<template>
    <div class="pagination_con">
         <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="nowPage1"  
            layout="total, prev, pager, next, jumper"
            :pager-count= "5"
            :total="totalPage"
            prev-text="上一页"
            next-text="下一页"
            >
        </el-pagination>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    data(){
       return {
            nowPage1: 0, //当前页数
       }
    },
    props:["totalPage","nowPage"],
    computed: {
      
    },
    watch:{
        'nowPage':{
            handler: function(newValue,oldValue){
                this.nowPage1= newValue
            },
             immediate: true, //watch创建完成就执行，而不是创建完成不执行，等到数据变化时再执行
        }
    },
    methods: {
        handleCurrentChange(page){
           this.$emit('getPage',page)
        }
    }
}
</script>

<style lang="less" scoped>
    .pagination_con {
        text-align: right;
        padding-right: 10%;
        margin-top: 20px;
        .el-pagination {
            display: inline-block;
        }
    }
</style>