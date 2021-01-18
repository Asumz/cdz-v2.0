<template>
  <dv-flyline-chart-enhanced :config="config2" :dev="true" style="width: 100%; height: 100%;" />
</template>

<script>
export default {
    data(){
        return {
            config2: {
                points: [
                    {
                    name: '郑州',
                    coordinate: [0.64, 0.53],
                    halo: {
                        show: true,
                    },
                    icon: {
                        src: '/img/flylineChart/mapCenterPoint.png',
                        width: 30,
                        height: 30
                    },
                    text: {
                        show: false
                    }
                    },
                    {
                    name: '成都',
                    coordinate: [0.51,0.61]
                    },
                    {
                    name: '云南',
                    coordinate: [0.47, 0.73]
                    },
                    {
                    name: '广西',
                    coordinate: [0.58, 0.73]
                    },
                    {
                    name: '广东',
                    coordinate: [0.64, 0.76]
                    },
                    {
                    name: '福建',
                    coordinate: [0.72, 0.71]
                    },
                    {
                    name: '浙江',
                    coordinate: [0.74, 0.63]
                    },
                    {
                    name: '江西',
                    coordinate: [0.68, 0.66],
                    halo: {
                        show: true,
                        color: '#8378ea'
                    }
                    },
                    {
                    name: '湖南',
                    coordinate: [0.62, 0.65]
                    },
                    {
                    name: '江苏',
                    coordinate: [0.71, 0.61],
                    halo: {
                        show: true,
                        color: '#37a2da'
                    }
                    },
                    {
                    name: '北京',
                    coordinate: [0.69, 0.42]
                    },
                    {
                    name: '黑龙江',
                    coordinate: [0.82, 0.26]
                    },
                    {
                    name: '新疆',
                    coordinate: [0.26, 0.36]
                    },
                    {
                    name: '陕西',
                    coordinate: [0.57, 0.52]
                    },
                    {
                    name: '内蒙古',
                    coordinate: [0.62, 0.38]
                    },
                    {
                    name: '贵州',
                    coordinate: [0.54, 0.69]
                    },
                    {
                    name: '吉林',
                    coordinate: [0.84, 0.34]
                    },
                    {
                    name: '辽宁',
                    coordinate: [0.79, 0.38]
                    },
                    {
                    name: '西藏',
                    coordinate: [0.30, 0.62],
                    halo: {
                        show: true,
                        color: '#37a2da'
                    }
                    },
                    {
                    name: '海南',
                    coordinate: [0.58, 0.83]
                    },
                ],
                lines: [
                    {
                    source: '成都',
                    target: '郑州'
                    },
                    {
                    source: '云南',
                    target: '郑州'
                    },
                    {
                    source: '广西',
                    target: '郑州'
                    },
                    {
                    source: '广东',
                    target: '郑州',
                    color: '#fb7293',
                    width: 2
                    },
                    {
                    source: '福建',
                    target: '郑州',
                    color: '#fb7293',
                    width: 2
                    },
                    {
                    source: '浙江',
                    target: '郑州'
                    },
                    {
                    source: '江西',
                    target: '郑州'
                    },
                    {
                    source: '湖南',
                    target: '郑州'
                    },
                    {
                    source: '江苏',
                    target: '郑州'
                    },
                    {
                    source: '北京',
                    target: '郑州'
                    },
                    {
                    source: '黑龙江',
                    target: '郑州'
                    },
                    {
                    source: '新疆',
                    target: '郑州',
                    color: '#37a2da'
                    },
                    {
                    source: '陕西',
                    target: '郑州',
                    color: '#37a2da'
                    },
                    {
                    source: '内蒙古',
                    target: '郑州',
                    color: '#37a2da',
                    width: 2
                    },
                    {
                    source: '吉林',
                    target: '郑州',
                    color: '#8378ea'
                    },
                    {
                    source: '辽宁',
                    target: '郑州',
                    color: '#8378ea'
                    },
                    {
                    source: '西藏',
                    target: '郑州',
                    color: '#8378ea',
                    width: 2
                    },
                    {
                    source: '海南',
                    target: '郑州',
                    color: '#37a2da',
                    width: 2
                    },
                ],
            },
        }
    }
}
</script>

<style>

</style>