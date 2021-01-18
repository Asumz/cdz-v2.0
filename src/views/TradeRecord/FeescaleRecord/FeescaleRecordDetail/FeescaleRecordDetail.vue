<template>
  <div class="feescaleRecordDetail">
      <el-card>
           <el-table
            :data="tableData"
            border
            show-summary
            :summary-method="getSummaries" 
            v-loading="loading"
            style="width: 100%">
            <el-table-column
            prop="code"
            label="设备号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="areaName"
            label="所属小区"
            min-width="100">
            <template slot-scope="{row}" >
                {{ row.areaName == null ? '— —' : row.areaName}}
            </template>
            </el-table-column>

            <el-table-column
            prop="money"
            label="总缴费金额"
            min-width="100"
            >
            <template slot-scope="{row}" >
                <el-link :underline="false" type="success">
                      {{ row.money}}
                </el-link>
            </template>
            </el-table-column>

            <el-table-column
            prop="merMoney"
            label="商户缴费"
            min-width="100"
            >
            <template slot-scope="{row}" >
                <el-link :underline="false" type="success">
                    {{ row.merMoney.toFixed(2) }}
                </el-link>
            </template>
            </el-table-column>

            <el-table-column
            prop="part1Money"
            label="合伙人1（张三）"
            min-width="100"
            v-if="[1,2,3,4].includes(partList.length)"
            >
            <template slot-scope="scope" slot="header">
                合伙人1（{{partList[0].partName}}）
            </template>
            <template slot-scope="{row}" >
                <el-link :underline="false" type="success">
                    {{ row.part1Money }}
                </el-link>
            </template>
            </el-table-column>

            <el-table-column
            prop="part2Money"
            label="合伙人2（李四）"
            min-width="100"
             v-if="[2,3,4].includes(partList.length)"
            >
            <template slot-scope="scope" slot="header">
                合伙人2（{{partList[1].partName}}）
            </template>
            <template slot-scope="{row}" >
                <el-link :underline="false" type="success">
                    {{ row.part2Money }}
                </el-link>
            </template>
            </el-table-column>

            <el-table-column
            prop="part3Money"
            label="合伙人3（王五）"
            min-width="100"
            v-if="[3,4].includes(partList.length)"
            >
            <template slot-scope="scope" slot="header">
                合伙人3（{{partList[2].partName}}）
            </template>
            <template slot-scope="{row}" >
                <el-link :underline="false" type="success">
                    {{ row.part3Money }}
                </el-link>
            </template>
            </el-table-column>
            <el-table-column
            prop="part4Money"
            label="合伙人4（李六）"
            min-width="100"
            v-if="[4].includes(partList.length)"
            >
            <template slot-scope="scope" slot="header">
                合伙人4（{{partList[3].partName}}）
            </template>
            <template slot-scope="{row}" >
                <el-link :underline="false" type="success">
                    {{ row.part4Money }}
                </el-link>
            </template>
            </el-table-column>

            <el-table-column
            prop="renewal"
            label="续费时长 (月)" 
            min-width="100"
            >
            </el-table-column>

            <el-table-column
            prop="expTime"
            label="到期日期"
            min-width="100"
            >
           <template slot-scope="{row}">
               {{ row.expTime | fmtDate('YYYY-MM-DD') }}
           </template>
            </el-table-column>

            <el-table-column
            prop="revicename"
            label="收款账户"
            min-width="100"
            >
           <template slot-scope="{row}">
               <el-button type="primary" size="small" plain @click="getreviceInfoBtn(row.reviceid)"> 
                   {{ row.revicename }}
               </el-button>
               
           </template>
            </el-table-column>
            
        </el-table>
      </el-card>
      <!-- 展示收款账户信息 -->
      <el-dialog
        title="收款账户信息"
        :visible.sync="dialogVisible"
        width="500px"
        custom-class="echart-dialog"
        :before-close="handleClose">
        <div>
            <div style=" margin-bottom: 15px;"><strong>账户名称</strong>： {{reviceInfo.username}}</div>
            <div><strong>手机号</strong>： {{reviceInfo.phoneNum}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small"> 取消</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
        </span>
        </el-dialog>
         <!-- 展示收款账户信息结束 -->
  </div>
</template>

<script>
import { merFeescaleRecodeDetail,getreviceInfo } from '@/require/tradeRecord'
export default {
     data() {
      return {
        ordernum: '',
        partList: [], //合伙人信息
        tableData: [],
        loading: false,
        dialogVisible: false,
        reviceInfo: {}
      };
    },
    created(){
        let { ordernum }= this.$route.query
        this.ordernum= ordernum
        this.asyMerFeescaleRecodeDetail({ordernum: ordernum})
    },
    methods: {
        async asyMerFeescaleRecodeDetail(data){
            let _this= this
            try {  
                _this.loading= true
                let info= await merFeescaleRecodeDetail(data)
                _this.loading= false
                if(info.code == 200){
                    _this.tableData= info.messsdata.map((item,i)=>{
                        let {aname,equipmentnum,createtime,expiration_time,merpaymoney,renewal,price,note,revicename,reviceid}= item
                        let num= 0
                        let obj=  {
                            code: equipmentnum,
                            areaName: aname,
                            money: price.toFixed(2),
                            merMoney: merpaymoney,
                            renewal: renewal,
                            expTime: expiration_time,
                            revicename: revicename,
                            reviceid: reviceid
                        }
                        if(_this.partList.length <= 0){
                            _this.partList= JSON.parse(note.replace(/\\/g,'')) //合伙人list
                        }   
                        let list= JSON.parse(note.replace(/\\/g,'')).forEach((jtem,j)=>{ 
                            num++
                            obj['part'+num+'Money']= parseFloat(jtem.remark).toFixed(2)
                        })
                        console.log(obj)
                        return obj
                    })
                }

            } catch (error) {
                if(error == '拦截请求'){ 
                _this.loading= true
                return 
                }
                _this.loading= false
            }
        },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        let partLength= this.partList.length
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (index >= 2 && index <= partLength+3) {
             let total= values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index]= total.toFixed(2)
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      handleClose(){
          this.dialogVisible= false
      },
      getreviceInfoBtn(reviceid){
          getreviceInfo({reviceid}).then(res=>{
              if(res.code == 200){
                  let {phoneNum,username}= res.result
                this.reviceInfo= {
                    username,
                    phoneNum
                }
                this.dialogVisible= true 
              }else{
                  
              }
          }).catch(err=>{

          })
      }
    }
}
</script>

<style>

</style>