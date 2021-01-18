<template>
  <div class="qrCodeRedict">
     <div class="logining">
       正在登录
       <i class="el-icon-loading"></i>
     </div>
  </div>
</template>

<script>
import { messageTip } from '@/utils/ele'
import { mapActions } from 'vuex'
export default {
    data(){
      return {
        
      }
    },
    created(){
      let {code,state}= this.$route.query
      this.asyHandleWXQRcode({code,state}).then(res=>{
        if(res.code !== 200){
          messageTip('error',res.message)
          this.$router.push({path: '/login'})
        }
      }).catch(err=>{
         this.$router.push({path: '/login'})
      })
     
    },
    methods:{
      ...mapActions(['asyHandleWXQRcode'])
    }
}
</script>

<style lang="less">
.qrCodeRedict {
  overflow: hidden;
   position: absolute;
    left:0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(255,255,255,.95);
    z-index: 99;
  .logining {
    z-index: 99;
    color: #1989fa;
    text-align: center;
    margin-top: 40%;
  }
}

</style>