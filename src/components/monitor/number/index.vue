<template>
  <dv-decoration-7 style="width:150px;height:50px;">
      <div class="number-box">
          <div class="title">{{title}}</div>
          <div :class="[isNum2 ? 'num2' : 'num']">
              {{fmtCount}}
          </div>
      </div>
  </dv-decoration-7>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        count: {
            type: [Number, String],
            default: 0
        },
    },
    data(){
        return {
            isNum2:false //解决数据更新后，页面数据更新，但是显示没变的bug,更新成功之后重新设置样式
        }
    },
    computed: {
        fmtCount(cont){ /*最多保留2位小数 */
            return Math.round(this.count*100)/100 
        }
    },
    mounted(){
        setInterval(()=>{
            this.isNum2= !this.isNum2
        },300)
    },
    watch: {
       count: {
           handler(val){
               this.isNum2 = !this.isNum2
           }
       } 
    }
}
</script>

<style lang="less" scoped>
    @font-face {
        font-family: MyFontName;
        src: url(../../../../static/fonts/DS-DIGI.TTF);
    }
    .number-box {
        padding: 0 10px;
        color: rgba(255,255,255,.86);
        text-align: center;
        .num {
            font-size: 30px;
            font-weight: 600;
            font-family: MyFontName;
            background-image: -webkit-gradient(linear, left center, right center, from(rgb(190, 222, 231)), to(rgb(0, 180, 255)));
            -webkit-background-clip: text; /*蹇呴渶鍔犲墠缂� -webkit- 鎵嶆敮鎸佽繖涓猼ext鍊� */
            -webkit-text-fill-color: transparent; /*text-fill-color浼氳鐩朿olor鎵�瀹氫箟鐨勫瓧浣撻鑹诧細 */
            text-align: center;
            margin-bottom: 5px;
       }
       .num2 {
            font-size: 30px;
            font-weight: 600;
            font-family: MyFontName;
            background-image: -webkit-gradient(linear, left center, right center, from(rgb(190, 222, 231)), to(rgb(12, 182, 253)));
            -webkit-background-clip: text; /*蹇呴渶鍔犲墠缂� -webkit- 鎵嶆敮鎸佽繖涓猼ext鍊� */
            -webkit-text-fill-color: transparent; /*text-fill-color浼氳鐩朿olor鎵�瀹氫箟鐨勫瓧浣撻鑹诧細 */
            text-align: center;
            margin-bottom: 5px;
       }
    }
    
</style>