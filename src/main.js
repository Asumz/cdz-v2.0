import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import Navigation from "vue-navigation";
import VueCompositionApi from "@vue/composition-api";
import "@/components/global";
// import "@/directives";
import "@/filters";
import "./vendor/element";
import "@/utils/ele";
// import "./vendor/dataView";
import "../static/style/app.less";
// 该项引入会造成 百度地图 事件大量报错
// import "default-passive-events";

Vue.use(VueCompositionApi);
Vue.use(Navigation, { router });

// 移除加载动画
const index_loading = document.getElementsByClassName("index_loading")[0];
document.body.removeChild(index_loading);

handleSlide();
window.onresize = function() {
    handleSlide();
};

function handleSlide() {
    const isShowSlide = store.state.isShowSlide;
    const width =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 768 && isShowSlide == false) {
        store.commit("updateSlideStatus", true);
    }
    if (width <= 768 && isShowSlide == true) {
        store.commit("updateSlideStatus", false);
    }
}

// Vue.prototype.$bus = new Vue(); /*创建一个新的事件总线*/

Vue.config.productionTip = false; // 关闭生产模式警告提示

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
});
