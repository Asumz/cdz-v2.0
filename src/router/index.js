// import Vue from "vue"; // cdn模式
//import VueRouter from 'vue-router' // cdn模式
import store from "../store";
import Util from "@/utils/util";
import mapRoutes from "./router";

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//     // return originalPush.call(this, location).catch(err => err)
//     return originalPush.call(this, location);
// };
Vue.use(VueRouter);

const router = new VueRouter({
    // mode: "history",
    base: "/dist",
    routes: [
        {
            path: "/login",
            component: () => import("@/components/Login/Login"),
            children: [
                {
                    path: "/login/qrCodeRedict",
                    component: () => import("@/components/Login/QRCodeRedict"), //微信重定向页面
                },
            ],
        },
        //上面这两个是基础的配置，后面的是请求过来的
    ],
});

router.beforeEach((to, from, next) => {
    //  console.log('打印两次...')
    let routes = store.state.moduleA.asyRouterMap; //获取vuex中的moduleA中存储的路由，moduleA没进行缓存，所以刷新之后会消失
    const userInfo = store.state.userInfo;
    
    if (to.path == "/login/qrCodeRedict" || to.path == "/login") {
        next();
    } else if (userInfo) {
        if (routes.length === 0) {
            // todo 路由权限全部开放, 后面应该需要做限制
            router.addRoutes(mapRoutes);
            store.commit("storeAsyRouterMap", mapRoutes);
            next({ ...to });
        } else {
            next();
        }
    } else {
        next("/login");
    }
    // 每次路由跳转的时候，都去取消上一个路由存储的cancelToken,并清空数组
    store.commit("clearToken"); // 取消请求
});

router.afterEach((to, from, next) => {
    let asyRouterMapList = store.getters.transformAsyRouterMap; //路由降维数组 （异步路由）
    let menuList = store.state.menuList; //导航菜单 （菜单）
    // 这个是获取面包屑导航list
    let navList = Util.slicePath(to.path).map((ktem, k) => {
        asyRouterMapList.forEach((item, i) => {
            if (ktem === item.path) {
                ktem = {
                    name: item.name,
                    path: item.path,
                };
            } else {
                menuList.forEach((ntem, n) => {
                    if (ktem == ntem.link) {
                        ktem = {
                            name: ntem.title,
                            // path: ntem.link
                        };
                    }
                });
            }
        });
        return ktem;
    });
    store.commit("updataBreadcrumbList", navList);

    if (to.path != from.path) {
        let main = document.getElementsByClassName("main")[0];
        if (main) {
            main.scrollTop = "0px";
        }
    }
});

// next() 表示路由成功，直接进入to路由，不会再次调用router.beforeEach()
// next('login') 表示路由拦截成功，重定向至login，会再次调用router.beforeEach()

export default router;
