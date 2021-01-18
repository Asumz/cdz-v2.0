import store from "@/store";
// 加载进度条插件及样式
import NProgress from "nprogress";
import { messageTip } from "@/utils/ele";
import "nprogress/nprogress.css";
import urlConfig from "./whiteUrlList"; //配置文件

// let baseURL = window.location.origin || "https://zylc-ev.com:8080";
// let baseURL = "http://ck.taifengkeji.com:8082/web"
let baseURL = "http://121.196.187.251:8082/web";
// 121.4.45.249 公测ip

if (process.env.NODE_ENV === "development") {
    //开发环境
    baseURL = "/api";
}

const whiteUrlList = urlConfig.whiteUrlList; //不进行拦截的url
// const filterUrlList = urlConfig.filterUrlList //代理商需要加上商户id的url

const service = axios.create({
    // 创建axios实例
    timeout: 120000, // 请求超时时间
    // headers: {
    //     // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     //'Access-Control-Allow-Origin': 'localhost:8072',
    // },
    baseURL,
    crossDomain: true,
    xhrFields: {
        withCredentials: true, //允许带上凭据
    },
});

service.interceptors.request.use(
    config => {
        //请求拦截器
        NProgress.start();
        if (!whiteUrlList.includes(config.url)) {
            /*当请求的地址在配置文件中配置，则多次请求也不会被拦截*/
            let cancelTokenArr = store.state.cancelTokenArr;
            for (let i = 0; i < cancelTokenArr.length; i++) {
                //在请求之前，拦截、判断前面有没有相同路径正在发送请求，如果有，进行拦截，取消发送
                if (cancelTokenArr[i].url === config.url) {
                    cancelTokenArr[i].cancelToken("多次请求取消");
                }
            }
        }
        // 这里是筛选地址 代理商需要
        // let agentSelectmerid = store.state.agentSelectMerInfo.id
        // if (agentSelectmerid !== '') { //说明代理商选择查看的商户了
        //     if (filterUrlList.includes(config.url)) {
        //         config.params.agentSelectmerid = agentSelectmerid
        //     }
        // }
        config.headers["token"] = store.state.token;

        config.cancelToken = new axios.CancelToken(function(cancel) {
            //将请求的cancelToken存到 vuex中的pushToken中
            store.commit("pushToken", { cancelToken: cancel, url: config.url });
        });

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    //响应拦截器
    response => {
        if (response.data.code === 1 && response.data.tip == "session缓存失效") {
            //登录已过期
            store.commit("handleLayoutStore");
            store.commit("handleLayoutRemoveAsyRouterMap");
            window.location.reload(); //让页面重新加载，这个是移除router中动态添加的路由，避免再次添加新的路由
        }
        NProgress.done();
        return response;
    },
    error => {
        NProgress.done();
        if (error.message != "路由跳转取消请求" && error.message != "多次请求取消") {
            //拦截错误信息，判断是不是
            messageTip("error", "获取数据失败,请稍后重试！"); //正常错误抛出异常
            return Promise.reject(error.response);
        }
        return Promise.reject("拦截请求"); //抛出拦截响应错误
    }
);

export default function({
    url,
    method = "get",
    data = {},
    params = data,
    headers = {},
    // responseType = 'json'
}) {
    headers = Object.assign(
        {
            "Content-Type": "application/json; charset=UTF-8",
        },
        headers
    );

    if (method == "get") {
        return new Promise((resolve, reject) => {
            service.get(url, { params }).then(
                res => {
                    if (res.status == 200) {
                        resolve(res.data);
                    } else {
                        //提示信息
                    }
                },
                err => {
                    reject(err);
                }
            );
        });
    } else {
        const contentType = headers["Content-Type"];

        if (~contentType.indexOf("multipart")) {
            // 类型 `multipart/form-data;`
            data = data;
        } else if (~contentType.indexOf("json")) {
            // 类型 `application/json`
            // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
            data = JSON.stringify(data);
        } else {
            // 类型 `application/x-www-form-urlencoded`
            // 服务器收到的raw body(原始数据) name=homeway&key=nokey
            data = Qs.stringify(data);
        }
        return new Promise((resolve, reject) => {
            service.post(url, data, { headers }).then(
                res => {
                    if (res.status == 200) {
                        resolve(res.data);
                    } else {
                        //提示信息
                    }
                },
                err => {
                    reject(err);
                }
            );
        });
    }
}
