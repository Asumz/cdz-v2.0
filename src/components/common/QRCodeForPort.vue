<template>
  <div class="qrcodefroport">
    <div class="title">{{selectPortCode}}号设备的端口二维码</div>
    <div class="qr_content">
      <div id="qe_bg" ref="qe_bg">
          <div class="qr_c">
              <qrcode
                :value="qr_c_url"
                background="#FFFFFF"
                :size="450"
              />
          </div>
          <h3>编号 {{selectPortCode}}-{{ k+1 }}</h3>
      </div>
      <div class="demo-image clearfix">
        <div class="block" v-for="fit in portNum" :key="fit">
          <qrcode
            :value="`${baseUrl}/oauth2Portpay?codeAndPort=${selectPortCode}${fit}`"
            background="#FFFFFF"
            :size="200"
          />
          <span class="demonstration">{{selectPortCode}}-{{ fit }}</span>
        </div>
      </div>
    </div>
    <div class="port_code">
      <el-button type="primary" size="mini" @click="this.handleDown">批量导出端口二维码</el-button>
    </div>
  </div>
</template>

<script>
import qrcode from "vue-qrcode2";
export default {
  data() {
    return {
      baseUrl: 'http://www.he360.cn',
      qr_c_url: '',
      k: 0, //判断异步转化到哪一个了
    };
  },
  created() {
    const origin = window.location.origin;
    if(origin.includes('www.tengfuchong')){
        this.baseUrl= 'http://www.tengfuchong.com.cn'
    }
  },
  props: ["selectPortCode","portNum"],
  methods: {
    async handleDown() {
      let JSZip = await import("@/vendor/jszip.min");
      let FileSaver = await import("@/vendor/FileSaver.min");
      let html2Canvas = await import("@/vendor/html2Canvas");
      this.downloadPicture(JSZip, FileSaver,html2Canvas);
    },
    downloadPicture(JSZip, FileSaver,html2canvas) {
      const zip = new JSZip();
      // const cache = {};
      // let block = document.querySelectorAll(".block");
      // let k= 0
      this.handleDownFn(zip, FileSaver,html2canvas)
      // for (let index = 0; index < block.length; index++) {
      //   // var myCanvas = block[index].getElementsByTagName("canvas")[0];
      //   html2canvas(block[index]).then(canvas => {
      //       let data = canvas.toDataURL("image/png");
      //       let fileName = `${this.selectPortCode}-${index + 1}`;
      //       zip.file(fileName + ".png", data.substring(22), { base64: true });
      //       cache[fileName] = data;
      //       this.k= this.k+1
      //       if(this.k >= this.portNum){
      //         this.k= 0
      //         zip.generateAsync({ type: "blob" }).then(content => {
      //           // 生成二进制流
      //           FileSaver.saveAs(content, `${this.selectPortCode}端口二维码.zip`); // 利用file-saver保存文件
      //         });
      //       }
      //   })

    },
    handleDownFn(zip, FileSaver,html2canvas){
        this.qr_c_url= `${this.baseUrl}/oauth2Portpay?codeAndPort=${this.selectPortCode}${this.k+1}`
        this.$nextTick(()=>{
            const qe_bg= this.$refs.qe_bg 
            html2canvas(qe_bg).then(canvas => {
                let data = canvas.toDataURL("image/png");
                let fileName = `${this.selectPortCode}-${this.k + 1}`;
                zip.file(fileName + ".png", data.substring(22), { base64: true });
                // cache[fileName] = data;
                this.k= this.k+1
                if(this.k >= this.portNum){
                  this.k= 0
                  zip.generateAsync({ type: "blob" }).then(content => {
                    // 生成二进制流
                    FileSaver.saveAs(content, `${this.selectPortCode}端口二维码.zip`); // 利用file-saver保存文件
                  });
                }else(
                  this.handleDownFn(zip, FileSaver,html2canvas)
                )
            })
        })
    }
  }
};
</script>

<style lang="less">
.qrcodefroport {
  width: 100%;
  .title {
    padding: 20px;
    text-align: center;
    font-size: 18px;
  }
  .qr_content {
    overflow: auto;
    max-height: 70vh;
    min-height: 500px;
    position: relative;
    .block {
      float: left;
      width: 200px;
      padding: 0 20px 20px 20px;
      background: #FFFFFF;
      .demonstration {
        width: 100%;
        display: inline-block;
        text-align: center;
        color: #000;
        font-size: 16px;
      }
    }
  }
  .port_code {
    padding-top: 15px;
    text-align: center;
  }
   #qe_bg {
    position: absolute;
    z-index: -999;
    background-color: #fff;
    .qr_c {
      width: 450px;
      height: 450px;
      background-color: #fff;
    }
    h3 {
      text-align: center;
      color: #000;
      font-size: 25px;
    }
  }
}
</style>