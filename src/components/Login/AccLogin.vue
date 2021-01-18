<template>
    <div class="accLogin">
        <el-form
            status-icon
            ref="ruleForm"
            :model="accLoginForm"
            class="demo-ruleForm"
            :rules="rules"
        >
            <el-form-item prop="phone">
                <el-input
                    v-model="accLoginForm.phone"
                    placeholder="请输入用户名"
                    clearable
                >
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    show-password
                    v-model="accLoginForm.password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    clearable
                >
                    <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                </el-input>
            </el-form-item>
            <el-form-item style="margin-top: -18px; margin-bottom: 0px">
                <el-checkbox
                    v-model="checked"
                    style="color: #a0a0a0; margin-top: -10px"
                    >记住密码</el-checkbox
                >
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.prevent="submitForm"
                    >登录</el-button
                >
            </el-form-item>
            <div
                :class="[
                    'loginInfo',
                    loginInfo.status === 0 ? 'success' : 'error',
                ]"
            >
                {{ loginInfo.message }}
            </div>
        </el-form>
    </div>
</template>

<script>
import { getSlide } from "@/require/systemSet";
import { messageTip } from "@/utils/ele";
import { mapActions, mapMutations } from "vuex";
import myCookie from "@/utils/myCookie";
import { superAdminMenuList } from "@/menuConfig";
const coo = new myCookie();
export default {
    data() {
        return {
            checked: true,
            accLoginForm: {
                phone: "",
                password: "",
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                ],
            },
            loginInfo: {
                //登录信息
                status: 0, //登录状态 200 201 202 ...
                message: "",
            },
        };
    },
    created() {
        //创建的时候获取存储的账号密码
        const cookieObj = coo.getCookie();
        let { phone = "", password = "" } = cookieObj;
        this.accLoginForm = { phone, password };
    },
    methods: {
        ...mapActions(["asyHandleLoginAct"]),
        ...mapMutations(["handleMenuList"]),
        submitForm() {
            this.$refs["ruleForm"].validate(async (valid) => {
                if (valid) {
                    if (this.checked) {
                        coo.setCookie(
                            this.accLoginForm.phone,
                            this.accLoginForm.password,
                            7
                        );
                    } else {
                        coo.clearCookie();
                    }
                    const res = await this.asyHandleLoginAct(
                        this.accLoginForm
                    );
                    this.loginInfo = {
                        status: res.code,
                        message: res.tip,
                    };
                    // todo
                    // if(res.code === 0 && res.data){
                    //     res.data.admin &&
                    //     this.asyGetSlide({adminid: res.data.admin.id})
                    // }
                    if(res.code === 0){
                        this.handleMenuList(superAdminMenuList);
                        this.$router.push({ path: "/empty" });
                    }
                }
            });
        },
        // todo 获取侧边栏菜单
        async asyGetSlide(data){
                    let res = await getSlide(data);
                    if (res.code === 0) {
                        let arr = [];
                        res.admin.menulist && res.admin.menulist.map((item) => {
                            arr.push(item.name);
                        });
                        let menu = JSON.parse(
                            JSON.stringify(superAdminMenuList)
                        ); // 主菜单
                        if (!arr.includes("所有")) {
                            menu = menu.filter((item) => {
                                item.children = item.children.filter(
                                    (child) => arr.includes(child.title)
                                );
                                return arr.includes(item.title);
                            });
                            menu.map((item, i) => {
                                item.index = i;
                                item.children.map((child, j) => {
                                    child.index = i + "-" + j;
                                });
                            });
                        }
                        // console.log("arr::", arr);
                        // console.log("menu::", menu);
                        this.handleMenuList(superAdminMenuList);
                        // this.handleMenuList(menu);
                        this.$router.push({ path: "/empty" });
                    }
        }       
    },
};
</script>

<style lang="less" scoped>
.accLogin {
    .el-form {
        margin-top: 5px;
        .el-form-item__content {
            .el-button {
                width: 100%;
                border-radius: 40px;
            }
        }
    }
    .loginInfo {
        font-size: 14px;
        text-align: center;
        &.error {
            color: #f56c6c;
        }
        &.success {
            color: #67c23a;
        }
    }
}
</style>