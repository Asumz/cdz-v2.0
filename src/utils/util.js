import moment from "moment";
import { Loading } from "element-ui";
export default {
    handleListToItemInfoFormUrl(list, url) {
        //name是點擊的名字 '歷史收益'
        let title;
        list.forEach((item, i) => {
            if (item.children && item.children.length > 0) {
                item.children.forEach((jtem, j) => {
                    if (url.includes(jtem.link)) {
                        title = jtem.title;
                    }
                });
            }
        });
        return title;
    },

    getAttr(obj, attr) {
        //获取元素的css内部的属性值
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    },

    slicePath(path) {
        // 分割路径
        //如：/deviceManage/deviceList/deviceDetail =》 ['/deviceManage','/deviceManage/deviceList','/deviceManage/deviceList/deviceDetail']
        let pathArr = [];
        if (typeof path != "string" || path == "") {
            return pathArr;
        }
        let pathList = path.slice(1).split("/");
        pathList.forEach((item, i) => {
            let arr = [];
            for (let j = 0; j <= i; j++) {
                arr.push(pathList[j]);
            }
            pathArr.push(arr);
        });
        let retPathList = [];
        pathArr.forEach((ktem, k) => {
            retPathList.push("/" + ktem.join("/"));
        });
        return retPathList;
    },

    formatTime(date, type = "YYYY-MM-DD HH:mm:ss") {
        //格式化时间字符串
        return moment(date).format(type);
    },

    formatTimeArr(type = "YYYY-MM-DD HH:mm:ss", day = 7) {
        //格式化时间字符串,转化为最近7天的数组 type输出的的格式 ，day往前推移的天数
        return [
            moment(new Date() - day * 24 * 60 * 60 * 1000).format(type),
            moment(new Date()).format(type),
        ]; //[ "2019-11-05 11:30:15","2019-11-12 11:30:15"]
    },

    checkKeyOnlyObj(attr, obj) {
        //检查某个键是属性的唯一值
        let flag;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (key == attr) {
                    flag = true;
                } else {
                    flag = false;
                    return flag;
                }
            }
        }
        return flag;
    },

    /**
     *
     * @param {String} text 加载文字
     * @param {String} spinner 加载图标
     * @param {String} customClass 加载class名
     */
    Hd_Loading(argu = {}) {
        //loading加载遮罩层
        let {
            text = "加载中",
            spinner = "el-icon-loading",
            customClass = "loadClass",
        } = argu;
        this.loading = null;
        this.show = () => {
            this.loading = Loading.service({
                lock: true,
                text,
                spinner,
                customClass,
            });
        };
        this.hide = () => {
            this.loading && this.loading.close();
        };
    },
};

//加法函数，用来得到精确的加法结果
export function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e;
}
//乘法函数，用来得到精确的乘法结果
export function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return (
        (Number(d.replace(".", "")) * Number(e.replace(".", ""))) /
        Math.pow(10, c)
    );
}
//减法函数，用来得到精确的减法结果
export function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e;
}
//除法函数，用来得到精确的除法结果
export function div(a, b) {
    var c,
        d,
        e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return (
        (c = Number(a.toString().replace(".", ""))),
        (d = Number(b.toString().replace(".", ""))),
        mul(c / d, Math.pow(10, f - e))
    );
}