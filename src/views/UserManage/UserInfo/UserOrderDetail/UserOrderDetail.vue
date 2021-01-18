<template>
    <div class="userOrderDetail">
        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="orderNum"
                label="订单号"
                min-width="230"
                >
                </el-table-column>
                <el-table-column
                prop="payMoney"
                label="付款金额（元）"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="balance"
                label="余额（分钟）"
                min-width="120"
                >
                </el-table-column>
               
                <el-table-column
                prop="quantity"
                label="支付方式"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="patType"
                label="操作类型"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="创建时间"
                min-width="120"
                >
                <template slot-scope="scope">
                    
                </template>
                </el-table-column>
            </el-table>
         </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [
                {
                 orderNum: '201910231129409050000018',
                 payMoney: -1.00,
                 chargeTime: '480',
                 quantity:  1.56,
                 patType: 1,
                 date: '2019-10-23 11:29:47',
                 status: 1
                }
            ]
        }
    }
}
</script>

<style>

</style>