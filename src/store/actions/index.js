import { handleLogin, handleCaptcha, handleWXQRcode } from "@/require";
import { getDeviceDetailTemInfo } from "@/require/template";
import { UPDATEUSERINFO } from "../mutation-types";
import router from "@/router";
export default {
    // 登录校验
    async asyHandleLoginAct({ commit, state }, data) {
        let res = await handleLogin(data);
        if (res.code === 0) {
            commit(UPDATEUSERINFO, res.data.admin); //存储的时候讲主store中的路由列表存下来了asyRouterMap,副路由moduleA也存下来了，
            commit('updateToken', res.data.token);
        }
        return res;
    },
    // 短信登录
    async asyHandleCaptcha({ commit, state }, data) {
        let loginInfo = await handleCaptcha(data);
        if (loginInfo.code === 200) {
            commit(UPDATEUSERINFO, loginInfo); //存储的时候讲主store中的路由列表存下来了asyRouterMap,副路由moduleA也存下来了，
            router.push({ path: "/deviceManage/deviceList" });
        }
        return loginInfo;
    },
    // 扫码登录
    async asyHandleWXQRcode({ commit, state }, data) {
        let loginInfo = await handleWXQRcode(data);
        if (loginInfo.code === 200) {
            commit(UPDATEUSERINFO, loginInfo); //存储的时候讲主store中的路由列表存下来了asyRouterMap,副路由moduleA也存下来了，
            router.push({ path: "/deviceManage/deviceList" });
        }
        return loginInfo;
    },

    async asyGetDeviceDetailTemInfo({ commit, state }, data) {
        let temListInfo = await getDeviceDetailTemInfo(data);
        data.callback && data.callback();
        if (temListInfo.code == 200) {
            commit("updateTemDetail", temListInfo);
        }
        return temListInfo;
    },
};
