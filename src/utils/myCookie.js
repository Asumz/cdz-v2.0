export default class Cookie {

    setCookie(c_phone, c_pwd, exdays) {
        let exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie =
          "phone" + "=" + c_phone + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie =
          "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    }
    getCookie() {
        let finalObj= {}
        if (document.cookie.length > 0) {
          let arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
          for (let i = 0; i < arr.length; i++) {
            let arr2 = arr[i].split("="); //再次切割
            //判断查找相对应的值
            finalObj[arr2[0]]= arr2[1]
          }
        }
        return finalObj
    }
     //清除cookie
     clearCookie() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
}