<template>
  <div class="verifiCode">
      <canvas id="canvas" ref="canvas" @click="initCode()"></canvas>
  </div>
</template>

<script>
export default {
    data(){
        return {
            canvas: null,
            // securitycode: ''
        }
    },
    mounted(){
       this.initCode()
    },
    methods: {
        initCode(){
             let canvas= this.$refs.canvas
            this.canvas= canvas
            let width= canvas.offsetWidth
            let height= canvas.offsetHeight
            let ctx= canvas.getContext('2d')
            ctx.textBaseline = 'bottom';
            /**绘制背景色**/
            ctx.fillStyle = this.randomColor(180,240); //颜色若太深可能导致看不清
            ctx.fillRect(0,0,width,height);
            /**绘制文字**/
            var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
            var securitycode = "";
            for(var i=0; i<4; i++){
                var txt = str[this.randomNum(0,str.length)];
                securitycode = securitycode + txt;
                ctx.fillStyle = this.randomColor(50,160);  //随机生成字体颜色
                ctx.font = this.randomNum(16,40)+'px SimHei'; //随机生成字体大小
                var x = 10+i*25;
                var y = this.randomNum(25,35);
                var deg = this.randomNum(-45, 45);
                //修改坐标原点和旋转角度
                ctx.translate(x,y);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(txt, 0,0);
                //恢复坐标原点和旋转角度
                ctx.rotate(-deg*Math.PI/180);
                ctx.translate(-x,-y);
            }
            // this.securitycode= securitycode
            this.$emit('backCode',securitycode)
        },
        randomNum(min,max){
            return Math.floor( Math.random()*(max-min)+min);
        },
        randomColor(min,max){
            var r = this.randomNum(min,max);
            var g = this.randomNum(min,max);
            var b = this.randomNum(min,max);
            return "rgb("+r+","+g+","+b+")";
        }     
    }
    
}
</script>

<style lang="less">
.verifiCode{
    width: 100%;
    height: 40px;
    overflow: hidden;
}
</style>