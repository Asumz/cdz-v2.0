import Vue from "vue";
import { checkPassword } from "@/require";

const that = Vue.prototype;
export const alertPassword = (scope, callBack) => {
    //弹出密码框，并输入密码，进行校验 ,参数1是传过来的参数，参数2是回调函数
    if (typeof scope == "function") {
        callBack = scope;
        scope = undefined;
    }
    that.$prompt("请输入密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入密码",
        lockScroll: true,
        customClass: "passTipClass",
        inputType: "password",
    })
        .then(({ value }) => {
            value = value === null ? "" : value;
            checkPassword({ password: value }).then(res => {
                if (res === 0) {
                    callBack && callBack(scope); //进行回调
                } else {
                    messageTip("warning", "密码不正确");
                }
            });
        })
        .catch(() => {});
};

export const alertConfim = (title, callBack) => {
    //确认提示框
    that.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            callBack && callBack(); //进行回调
        })
        .catch(() => {});
};

export const confirVNdom = (title, message, callBack) => {
    that.$msgbox({
        title,
        message,
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
    })
        .then(() => {
            callBack && callBack();
        })
        .catch(() => {});
};

export const messageTip = (type = "success", message = "删除成功") => {
    that.$message({
        type,
        message,
    });
};

// element表单校验手机号码
export const checkPhone = (rule, value, callback) => {
    const phoneReg = /^1[3-9]\d{9}$/;
    if (/^\s*$/.test(value) || value == undefined) return callback(new Error("必填项"));
    setTimeout(() => {
        if (phoneReg.test(value)) {
            callback();
        } else {
            callback(new Error("手机号码格式不正确"));
        }
    }, 300);
};

// element表单校验数字(包含负数,小数)
export const checkNumber = (rule, value, callback) => {
    const numberReg = /^(-?\d+)(\.\d+)?$/;
    if (/^\s*$/.test(value) || value == undefined) return callback(new Error("必填项"));
    setTimeout(() => {
        if (numberReg.test(value)) {
            callback();
        } else {
            callback(new Error("请输入数字值"));
        }
    }, 300);
};

export const checkID = (rule, value, callback) => {
    const idReg = /^\d{15}(\d\d[0-9xX])?$/;
    if (/^\s*$/.test(value) || value == undefined) return callback(new Error("必填项"));
    setTimeout(() => {
        if (idReg.test(value)) {
            callback();
        } else {
            callback(new Error("身份证号格式不正确"));
        }
    }, 300);
};

export const checkEmpty = (rule, value, callback) => {
    // 同时处理数组 和 字符串 为空
    const isEmpty = value == undefined || /^\s*$/.test(value) || value.length === 0;
    // console.log('value::', value, 'isEmpty::', isEmpty)
    if (isEmpty) return callback(new Error("必填项"));
    callback();
};

const obj = {
    alertPassword,
    messageTip,
    alertConfim,
    confirVNdom,
};

Object.keys(obj).map(key => {
    window[key] = obj[key];
});
