<template>
    <div class="layout">
         <TopBar /> <!-- 头部组件 -->
         <el-row class="layout_row">
            <!-- <el-col :span="2"  class="layout_col_slide" :style="isShowSlide ? 'display: block' : 'display:none'" >
                <Slide />
            </el-col> -->
            <el-col :span="2"  class="layout_col_slide" :class="{show: isShowSlide, hide: !isShowSlide}">
                <Slide />
            </el-col>
            <el-col :span="22" class="layout_col_main">
              <MainCom></MainCom><!-- 内容区域组件 -->
            </el-col>
         </el-row>     
    </div>
</template>

<script>
import Slide from './Slide'
import TopBar from './TopBar'
import MainCom from './Main'
import { mapMutations,mapState} from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed: mapState(['isShowSlide']),
    components: {
        Slide,
        TopBar,
        MainCom
    }
}
</script>

<style lang="less" scoped>
    .layout{
        height: inherit;
       .layout_row {
            display: flex;
            height: calc(100% - 80px);
            width: 100%;
            overflow: hidden;
            .layout_col_slide {
                // min-width: 180px;
                overflow: hidden;
                height: 100%;
                transition: 0.3s;
                display: block;
            }
            .show{
                width: 180px;
                // opacity: 1;
            }
            .hide{
                width: 0;
                // opacity: 0;
            }
            .layout_col_main {
                flex: 1;
                height: 100%;
                max-width: calc(100% - 180px);
            }
        }
    }
    @media screen and (max-width: 768px) {
        .layout{
            height: inherit;
        .layout_row {
                display: flex;
                height: calc(100% - 55px);
                width: 100%;
                overflow: hidden;
                .layout_col_slide {
                    // min-width: 180px;
                    height: 100%;
                    transition: 0.3s;
                    position: absolute;
                    top: 0;
                    z-index: 99;
                    // display: none;
                }
                .layout_col_main {
                    flex: 1;
                    height: 100%;
                    max-width: 100%;
                    width: 100%;
                    .main {
                        padding: 5px;
                    }
                }
            }
        }
    }
</style>