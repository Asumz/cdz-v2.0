<template>
  <!-- 四个展示模块的包裹盒子 -->
  <div class="section-content" >
     <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.section-title {
    color: rgba(255,255,255,.9);
    font-size: 16px;
}
.section-content {
   position: absolute;
   left: 5%;
   right: 5%;
   top: 5%;
   bottom: 7%;
   display: flex;
   flex-direction: column;
   #evem_rank {
       flex: 1;
   }
}
@media screen and (max-width: 1400px){
    .section-title {
        font-size: 15px;
    }
    .section-content {
        position: absolute;
        left: 8%;
        right: 5%;
        top: 5%;
        bottom: 7%;
    }
}
</style>