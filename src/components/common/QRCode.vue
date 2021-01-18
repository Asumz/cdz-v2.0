<template>
    <div class="qrCode_de">
         <div id="qrcode">
      
         </div>
         <div class="deviceCode">
             设备号：{{alertDeviceCode}}
         </div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
    name : 'QRcode',
    props: ['alertDeviceCode','from'], //from: 2为蓝牙设备
    mounted () {
        this.qrcode();
    },
    methods: {
        qrcode() {
            let origin= window.location.origin || 'http://www.he360.com.cn'
            let text= this.from === 2 ? `https://www.tengfuchong.cn/applet/${this.alertDeviceCode}` : `${origin}/oauth2pay?code=${this.alertDeviceCode}`
            let qrcode = new QRCode('qrcode', {
                width: 260,  
                height: 250,
                text, // 二维码地址
                colorDark : "#000",
                colorLight : "#fff",
            })
        },
    },
}
</script>

<style lang="less">
.qrCode_de {
    .deviceCode {
        font-size: 20px;
        color: #333;
        margin-top: 10px;
        text-align: center;
        font-weight: 700;
    }
}
</style>