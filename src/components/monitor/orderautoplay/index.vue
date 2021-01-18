<template>
  <div class="orderautoplay">
      <div class="tb-box">
          <div class="section-title">实时订单交易数据</div>
          <div class="tb-header" ref="tbheader">
              <div class="tb-col-first">#</div>
              <div class="tb-col">金额</div>
              <div class="tb-col">支付方式</div>
              <div class="tb-col">订单尾号</div>
              <div class="tb-col">来源</div>
          </div>
          <div class="tb-body">
              <div class="tb-row" v-for="(item,index) in list" 
                :key="index" 
                :class="[item.num == 1 ? 'odd' : 'even',(index === 0 && hasAnimation) ? 'ani' : '']"
              >
                    <div class="tb-col-first"><span>{{item.code}}</span></div>
                    <div class="tb-col">{{item.money}}元</div>
                    <div class="tb-col">{{item.paytype == 1 ? '钱包' : item.paytype == 2 ? '微信' : item.paytype == 3 ? '支付宝' : item.paytype == 4 ? '微信小程序' : item.paytype == 5 ? '支付宝小程序' : item.paytype == 6 ? '虚拟充值' : item.paytype == 12 ? '银联支付' : '— —'}}</div>
                    <div class="tb-col">{{item.order}}</div>
                    <div class="tb-col">{{item.type == 1 ? "充电" : item.type == 2 ? "投币" : item.type == 3 ? "离线充值" : item.type == 4 ? "钱包" : item.type == 5 ? "在线卡" : item.type == 6 ? "包月卡" : "— —"}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
let timer= null
let timeoutEnd= false
const wsBaseUrl= window.location.origin.indexOf('tengfuchong') !== -1 ?  'ws://47.93.203.50:8081' : 'ws://49.233.68.158:8081'
// const ws = new WebSocket("ws://47.93.203.50:8081/wolfwebsocket"); /*测试接口*/
// const ws = new WebSocket("ws://49.233.68.158:8081/wolfwebsocket"); /*正式接口*/
const ws = new WebSocket(`${wsBaseUrl}/wolfwebsocket`); /*动态接口*/
export default {
    props: {
        tradeList: {
            type: Array,
            default(){
                return []
            }
        }
    },
    computed: {
        list(){
            return this.tradeList.map((item,index)=>{
                item.num= index % 2 == 0 ? 2 : 1
                return item
            })
        }
    },
    data(){
        return {
            height: 35, //默认行高
            // dynamicHieght: 35, //动态行高
            rowClass: '',
            hasAnimation: true, //是否有动画
            newOrderDetail: null
        }
    },
    mounted(){
        this.height= this.$refs.tbheader.offsetHeight
        // this.dynamicHieght= this.height
        this.handleSetStyle()  /**设置样式到页面中 */
        this.initWebSoket()  /**初始化WebSoket*/
        this.$once('hook:beforeDestroy',()=> ws.close()) /*页面关闭时，关掉ws连接*/
    },
    watch: {
        newOrderDetail: {
            handler(val){
                this.handleBumd()
            },
            deep: true
        }
    },
    methods: {
        handleBumd(){
            // this.list.unshift(this.newOrderDetail)
            // console.log(JSON.stringify(this.list,null,2))
            // this.hasAnimation= true
            // this.dynamicHieght= 0
            // setTimeout(()=>{
            //     this.$delete(this.list,0)
            //     this.hasAnimation= false
            //     this.dynamicHieght= this.height
            // },250)
            this.list.unshift(this.newOrderDetail)
            this.hasAnimation= true
            this.$emit('monitorOrderList',Number(this.newOrderDetail.money))
            setTimeout(()=>{
                this.$delete(this.list,this.list.length-1)
                this.hasAnimation= false
            },250)
        },
         /**初始化WebSoket*/
        initWebSoket(){
            ws.onopen= (e)=>{ /**连接成功回调*/
                console.log(e)
            }
            ws.onmessage = (e)=>{   /**接收WebSoket发送的信息*/
                  let received_msg = e.data;
                //   console.log("received_msg",JSON.parse(received_msg));
                  if(this.list.length > 0){
                      this.newOrderDetail= {...JSON.parse(received_msg),num: this.list[0].num == 1 ? 2 : 1}
                  }
            };
        },
        /**设置样式到页面中 */
        handleSetStyle(){
            const styleStr=`
                @keyframes scrollKey {
                    0% {
                        height: 0;
                    }
                    100% {
                        height: ${this.height}px;
                    }
                }
            `
            const style= document.createElement('style')
            style.innerHTML= styleStr
            document.head.appendChild(style)
        }
    },
}
</script>

<style lang="less" scoped>
.orderautoplay {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #ffffff;
    position: relative;
    width: 100%;
    height: 100%;
    .section-title {
        color: rgba(255,255,255,.9);
        font-size: 16px;
        margin-bottom: 15px;
    }
    .tb-box {
        position: absolute;
        left: 5%;
        top: 5%;
        right: 5%;
        bottom: 5%;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        .tb-col-first {
            width: 80px;
            text-align: center;
            overflow: hidden;
            // span {
            //     display: inline-block;
            //     background-color: rgb(0, 186, 255);
            //     color: #ffffff;
            //     padding: 2px;
            //     border-radius: 4px;
            // }
        }
        .tb-col {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
        }
        .tb-header {
            height: 35px;
            line-height: 35px;
            background-color: rgb(0, 186, 255);
            color: #ffffff;
            display: flex;
        }
        .tb-body {
            height: 35px;
            line-height: 35px;
            color: #ffffff;
            flex: 1;
            overflow: hidden;
            .tb-row {
                width: 100%;
                display: flex;
                transform-origin: center;
                font-size: 14px;
                &.odd {
                    background-color: rgb(10,39,50);
                }
                &.even {
                    background-color: rgb(0,59,81);
                }
                &.ani {
                    transform-origin: top center;
                    animation: scrollKey .2s linear;
                }
            }
        }
    }
} 
@media screen and (max-width: 1400px){
    .orderautoplay {
        .tb-box {
            font-size: 12px;
            .tb-body {
                .tb-row {
                    font-size: 12px;
                }
            }
        }
    } 
}
// @keyframes scrollKey {
//     0% {
//         height: 0;
//     }
//     100% {
//         height: 36px;
//     }
// }
</style>