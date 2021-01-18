// import moment from 'moment'
/**
 * 全局时间过滤器
 */
export function fmtDate(date, type = "YYYY-MM-DD HH:mm:ss") {
    if (!date) {
        return "— —";
    }
    return moment(date).format(type);
}

Vue.prototype.$fmtDate = function(date, type = "YYYY-MM-DD HH:mm:ss") {
    //将日期格式化，并进行换行
    if (!date) {
        return "";
    }
    return moment(date)
        .format(type)
        .replace(/\s+/, "</br>");
};

// 内容为空转换
export function fmtBlank(val) {
    const reg = /^(\s+)?$/;
    return val == null || reg.test(val) ? "— —" : val;
}

// 金额格式转换(两位小数点)
export function fmtMoney(val) {
    const reg = /^(-?\d+)(\.\d+)?$/;
    return reg.test(val) ? (+val).toFixed(2) : "— —";
}

const filters = {
    fmtDate,
    fmtBlank,
    fmtMoney,
};

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
