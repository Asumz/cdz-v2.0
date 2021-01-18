<template>
  <sectionBox>
      <div class="section-title">昨日设备收入排行榜</div>
      <dv-capsule-chart :config="deviceEvenRankDataConfig" style="width:100%;height:100%" />
  </sectionBox>
</template>

<script>
import sectionBox from '../section-box'
export default {
    props: {
        deviceEvenRankData: {
            type: Array,
            default: []
        }
    },
    computed: {
        deviceEvenRankDataConfig(){
            return {
                data: this.deviceEvenRankData,
                colors: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
                unit: '元',
                showValue: true
            }
        }
    },
    // data(){
    //     return {
    //         config: {
    //             data: [
    //                 { name: '000001', value: 156.36 },
    //                 { name: '000002', value: 153.16 },
    //                 { name: '000003', value: 149.02 },
    //                 { name: '000004', value: 143.95 },
    //                 { name: '000005', value: 142.00 },
    //                 { name: '000006', value: 115.76 },
    //                 { name: '000007', value: 105.43 },
    //                 { name: '000008', value: 104.71 }
    //             ],
    //             data: [],
    //             colors: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
    //             unit: '元',
    //             showValue: true
    //         } 
    //     }
    // },
    components:{
        sectionBox
    },
}
</script>

<style lang="less">
@media screen and (min-width: 1400px) {
   .dv-capsule-chart .capsule-item .capsule-item-column {
        height: 13px;
    }
    .dv-capsule-chart .capsule-item {
        height: 15px;
    } 
}

</style>