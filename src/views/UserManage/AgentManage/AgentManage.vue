<template>
  <div class="agentManage">
      <el-card class="box-card card_bottom0 cardForm">
          <el-form :inline="true"  class="demo-form-inline" :model="agentManageInfo"  size="mini">
              <el-form-item label="昵称" class="form_right25">
                  <el-input v-model="agentManageInfo.nick" placeholder="代理商昵称" clearable  size="small"></el-input>
              </el-form-item>
              <el-form-item label="姓名" class="form_right25">
                  <el-input v-model="agentManageInfo.name" placeholder="代理商姓名" clearable size="small"></el-input>
              </el-form-item>
              <el-form-item label="电话" class="form_right25">
                  <el-input v-model="agentManageInfo.phone" placeholder="代理商电话" clearable size="small"></el-input>
              </el-form-item>
          
              <el-form-item class="form_margin0 content_btn">
                  <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
              </el-form-item>
          </el-form>
        </el-card>
         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                width="80"
                >
                <template slot-scope="scope">
                    {{(nowPage-1)*10+scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="140"
                >
                <template slot-scope="{row}">
                    {{ row.username == null ? '— —' : row.username }}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="真实姓名"
                min-width="140"
                >
                <template slot-scope="{row}">
                    {{ row.realname == null ? '— —' : row.realname }}
                </template>
                </el-table-column>
                <el-table-column
                prop="phone_num"
                label="电话"
                min-width="140"
                >
               <template slot-scope="{row}">
                    {{ row.phone_num == null ? '— —' : row.phone_num }}
                </template>
                </el-table-column>
                <el-table-column
                prop="objnick"
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                    <router-link :to="`/usermanage/agentManage/agentManageDetail?id=${scope.row.id}&username=${scope.row.username}`">
                        <el-link type="primary">商户详情</el-link>
                    </router-link>
                </template>
                </el-table-column>
            </el-table>
         </el-card>
         <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import { selectAgent } from '@/require/userManage'
export default {
    data(){
        return {
            agentManageInfo: {},
            loading: false,
            tableData: [], //每条数据
            totalPage: 1, //共1条数据
            nowPage: 1, //当前页数   
            dialogSetVisible: false, //set模态框显示隐藏
        }
    },
    components:{MyPagination},
    created(){
       if(JSON.stringify(this.$route.query) != "{}"){
            this.agentManageInfo= {...this.$route.query}
            this.nowPage= parseInt(this.agentManageInfo.currentPage) || 1
        }
       this.asyGetSelectAgent(this.agentManageInfo)
    },
     methods: {
        getPage(page){
            this.agentManageInfo= {...this.agentManageInfo,currentPage:page}
            this.$router.push({query: this.agentManageInfo})
            this.asyGetSelectAgent(this.agentManageInfo)
            this.nowPage = page
        },
        async asyGetSelectAgent(data){
            let _this= this
            try{
                _this.loading= true
                let handleInfo=  await selectAgent(data)
                _this.loading= false
                if(handleInfo.code === 200){
                   _this.tableData= handleInfo.result.agentData
                   _this.totalPage= handleInfo.result.totalRows
                }
                
            }catch(error){
                 if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                     _this.loading= false
            }
        },
        handleSearch(){
            this.$router.push({query:{... this.agentManageInfo,currentPage: 1}})
            this.asyGetSelectAgent({... this.agentManageInfo,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>