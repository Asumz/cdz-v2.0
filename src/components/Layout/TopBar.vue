<template>
    <div class="topBar">
        <el-row class="row_con">
            <el-col :span="12" class="col_con" >
                <div class="grid-content bg-purple title_logo hidden-xs-only">
                   <!-- <img src="../../assets/images/logo.png" alt="中源乐充">-->
                    <span class="title">中源乐充</span>
                </div>
                <div class="grid-content bg-purple menuIcon hidden-sm-and-up">
                    <div class="menuIconCon" @click="hideOrShowSlide">
                        <i class="iconfont icon-ego-menu"></i>
                    </div>
                </div>
            </el-col>
            <el-col :span="12" class="col_con">
                <div class="grid-content bg-purple-light">
                    <el-link type="danger" :underline="false" @click="handleLayout">退出登录</el-link>
                    <i :class="['iconfont' , isBig ? 'icon-quxiaoquanping_o' : 'icon-quanping']" @click="handleFullScreen(isBig)" ></i>
                    <span  class="selectMerIcon"  v-popover:popover>
                        <div v-if="agentSelectMerInfo.id != '' ">
                            <div>正在查看</div>
                            <div class="span_content">{{agentSelectMerInfo.name}}</div>
                        </div>
                        <!-- <span v-if="agentSelectMerInfo.id != '' " class="el-icon-chat-dot-square"></span> -->
                    </span>
                    <span class="top_name">{{ userInfo && userInfo.username}}</span>
               
                <!-- <span>556</span> -->
                </div>
            </el-col>
        </el-row>

         <el-popover
            ref="popover"
            placement="right"
            width="180"
            trigger="hover"
            v-model="visible"
         >
            <p>当前代理商已选定查看商户   商户名: {{agentSelectMerInfo.name}}</p>
            <div style="text-align: right; margin: 10px 0 0 0;">
                <!-- <el-button size="mini" type="text" @click="visible = false">取消</el-button> -->
                <el-button type="default" size="mini" @click="handleCancleMerInfo">退出选择</el-button>
                <el-button size="mini" type="primary" @click="$router.push({path: '/usermanage/merInfo'})">切換商戶</el-button>
            </div>
        </el-popover>
    </div>
</template>

<script>
    import { mapMutations,mapState} from 'vuex'

    export default {
        data(){
            return {
               isBig: false ,
               visible: false, //弹出框，默认关闭
            }
        },
        computed: {
            ...mapState(['isShowSlide','userInfo','agentSelectMerInfo'])
        },
        methods: {
            ...mapMutations(['handleLayoutStore','handleLayoutRemoveAsyRouterMap','updateSlideStatus','setAgentSelectMerInfo']),
            handleLayout(){
                this.handleLayoutStore()
                this.handleLayoutRemoveAsyRouterMap()
                window.location.reload() //让页面重新加载，这个是移除router中动态添加的路由，避免再次添加新的路由
            },
            hideOrShowSlide(){
                this.updateSlideStatus(!this.isShowSlide)
            },
            handleFullScreen(isBig){ //全屏
                if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
                    messageTip("warning","您的浏览器暂时不支持全屏模式"); 
                    return 
                }else{
                    screenfull.toggle();
                    this.isBig= !this.isBig
                }
                
            },
            handleCancleMerInfo(){ //退出代理商选择的商户信息
                this.setAgentSelectMerInfo({
                    id:'',
                    name:''
                })
                this.visible= false
            } 
        }
    }
</script>

<style lang="less" scoped>
@import '../../../static/style/var.less';
    .topBar {
        background-image: url(../../assets/images/topbg.png);
        width: 100%;
        height: 80px;
        font-size: @fontB;
        color: @colorG;
       .row_con {
           height: inherit;
           .col_con {
               height: inherit;
               padding: 0 40px;
               .grid-content {
                    height: inherit;
                    line-height: 80px;
                    .span_content {
                       color: #fff;
                       font-size: 14px;
                       font-weight: bold;
                    }
                    .menuIconCon {
                        i {
                            color: #555;
                            font-size: 22px;
                        }
                    }
                    &.title_logo {
                        display: flex;
                        align-items: center;
                        img {
                           width: 60px;
                        }
                        .title {
                            font-size: 30px;
                            margin-left: 10px;
                            // font-family: cursive;
                            font-family: 'Open Sans',sans-serif;
                            font-weight: 700;
                            color: #fff;
                        }
                    }
                    &.bg-purple-light {
                        .el-link{
                            float: right;
                            margin-left: 10px;
                            font-size: @fontB; 
                        }
                        i {
                            float: right;
                            font-size: 20px;
                            margin-right: 15px;
                            font-weight: bold;
                            color: #aacff4;
                            vertical-align: middle;
                            &:hover {
                                color: #fff;
                                transition: all .3s;
                            }
                        }
                        .top_name {
                            font-size: 16px;
                            color: #aacff4;
                            float: right;
                            margin-right: 25px;
                            width: 200px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            text-align: right;
                        }
                        .selectMerIcon {
                            float: right;
                            &>div {
                                padding: 15px 15px;
                                font-size: 15px;
                                color: #aacff4;
                                margin-right: 25px;
                                max-width: 260px;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                text-align: right;
                                height: 80px;
                                line-height: 25px;
                                text-align: center;
                                box-sizing: border-box;
                            }
                        }
                    }
               }
           }
       }
    }

     @media screen and (max-width: 768px) {
        .topBar {
        height: 55px;
       .row_con {
           height: inherit;
           .col_con {
               height: inherit;
               padding: 0 40px;
               .grid-content {
                    height: inherit;
                    line-height: 55px;
               }
           }
       }
    }
    }
</style>