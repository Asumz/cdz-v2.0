<template>
    <div class="main">
        <BreadCrumbNav />
        <!-- <keep-alive>
        <router-view></router-view>
        </keep-alive> -->
            <transition 
                 :enter-active-class="enterTransition"
                 :leave-active-class="leaveTransition"
                >
                <navigation>
                    <router-view></router-view>
                </navigation>
            </transition>
        <div class="bottomBar">
            中源乐充
        </div>
    </div>
</template>

<script>
import BreadCrumbNav from './BreadCrumbNav'
    export default {
        data(){
            return {
                enterTransition: 'animated fadeInUp',
                leaveTransition: 'animated fadeOutDown',
            }
        },
        components:{
            BreadCrumbNav
        },

    }
</script>

<style lang="less" scoped>
@import '../../../static/style/var.less';
.main {
    background-color: @colorB;
    height: calc(100%);
    overflow: auto;
    // scroll-behavior: smooth;
    // padding: 0 20px 20px 20px;
    // &::-webkit-scrollbar-track-piece {
    //     // background: #d3dce6;
    //     background: #d3dce6;
    // }

    // &::-webkit-scrollbar {
    // width: 12px;
    // }

    // &::-webkit-scrollbar-thumb {
    // // background: #99a9bf;
    // background: #409eff;
    // border-radius: 20px;
    // }
    .bottomBar {
        color: #d7d7d7;
        text-align: center;
        padding: 40px 0;
        line-height: 1.3;
    }
    .list-item {
    display: inline-block;
    margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
    transition: all .4s;
    }
    .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(20px);
    }

 @-webkit-keyframes fadeOutDown {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, 40px, 0);
        transform: translate3d(0, 40px, 0);
    }
    }

 @keyframes fadeOutDown {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        -webkit-transform: translate3d(0, 40px, 0);
        transform: translate3d(0, 40px, 0);
    }
    }

.fadeOutDown {
     -webkit-animation-name: fadeOutDown;
     animation-name: fadeOutDown;
    }

    @-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 40px, 0);
    transform: translate3d(0, 40px, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 40px, 0);
    transform: translate3d(0, 40px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 40px, 0);
    transform: translate3d(0, 40px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
  animation-delay: .4s;
}
.animated {
  -webkit-animation-duration: .4s;
  animation-duration: .4s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
}
</style>