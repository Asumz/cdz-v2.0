<template>
    <div class="login">
        <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="grid-content bg-purple">
                    <div class="title">
                        <img src="../../assets/images/logo.png" alt="中源乐充" />
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row class="form_row">
            <el-col :xs="0" :sm="12" :md="12" :lg="12" :xl="14"> </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="10">
                <div class="grid-content bg-purple">
                    <div class="login_form">
                        <h1>登录后台管理系统</h1>
                        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
                            <!-- <el-tab-pane label="扫码登录" name="first">
                                        <div class="login_item">
                                            <div class="qrCodeCon" id="login_ewm"></div>
                                            <router-view></router-view>
                                        </div>
                                    </el-tab-pane> -->
                            <el-tab-pane label="账号登录" name="second">
                                <div class="login_item">
                                    <AccLogin />
                                </div>
                            </el-tab-pane>
                            <!-- <el-tab-pane label="短信登录" name="third">
                                        <div class="login_item">
                                            <MessLogin /> 
                                        </div>
                                    </el-tab-pane> -->
                        </el-tabs>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- <div class="copyright_info ">
               <a href="http://www.beian.miit.gov.cn/" style="text-decoration: none;" target="_blank">豫ICP备18017276号</a>
           </div> -->
    </div>
</template>

<script>
import AccLogin from "./AccLogin"; //账号登录
import MessLogin from "./MessLogin"; //短信登录
export default {
    data() {
        return {
            activeName: "second",
            wxLogin: null,
        };
    },
    mounted() {
        // 调用微信接口二维码
        // if(WxLogin){
        //     this.handleWxLogin()
        // }
    },
    components: {
        MessLogin,
        AccLogin,
    },
    // created(){
    //     if(this.$route.path== '/login/qrCodeRedict'){
    //         this.activeName= 'first'
    //     }else{
    //         this.activeName= 'second'
    //     }
    // },
    methods: {
        handleClick(tab, event) {
            const ele = event.target || event.srcElement;
            if (ele.id == "tab-first") {
                if (!this.wxLogin) {
                    this.handleWxLogin();
                }
            }
        },
        handleWxLogin() {
            let origin = window.location.origin;
            let originList = origin.split(/:\/\//g);
            originList[1] = originList[1].includes("localhost")
                ? "www.tengfuchong.com.cn"
                : originList[1];
            let appid = originList[1].includes("tengfuchong")
                ? "wx695275de73b7dad4"
                : "wx003f63d4791f497d";
            let wxLogin = new WxLogin({
                id: "login_ewm",
                appid: appid,
                scope: "snsapi_login",
                redirect_uri: `${originList[0]}%3A%2F%2F${originList[1]}%2Flogin%2FqrCodeRedict`,
                state: "2",
                style: "black",
                href:
                    "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDI0MHB4OyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAwIGF1dG87fQ0KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5pbmZvIHt3aWR0aDogMjAwcHg7fQ0KLnN0YXR1c19pY29uIHtkaXNwbGF5OiBub25lfQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30g",
            });
            const iframe = document.getElementsByTagName("iframe")[0];
            iframe.width = "280px;";
            iframe.height = "300px;";
            this.wxLogin = wxLogin;
        },
    },
};
</script>

<style lang="less" scoped>
@import "../../../static/style/var.less";
.login {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/login.png");
    background-size: 100% 100%;
    overflow: hidden;
    position: relative;
    .title {
        margin: 4% 0 0 4%;
    }
    .login_form {
        background-color: #fff;
        border: 1px solid @colorD;
        border-radius: 8px;
        padding: 30px 70px 30px;
        width: 422px;
        margin: 0 auto;
        box-sizing: border-box;
        // position: absolute;
        // top: 260px;
        // right: 200px;
        .login_item {
            width: 280px;
        }
        h1 {
            font-size: 18px;
            color: #409eff;
            text-align: center;
            padding-bottom: 20px;
        }
        h4 {
            margin-bottom: 15px;
            text-align: center;
            color: @colorF;
            font-weight: 400;
        }
        .qrCodeCon {
            margin: 0 auto;
        }
    }
    .copyright_info {
        font-size: 14px;
        text-align: center;
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100%;
        color: #777;
        a {
            color: #336eab;
        }
    }
}
.form_row {
    margin-top: 6%;
    .el-col {
        min-height: 10px;
    }
}
</style>
