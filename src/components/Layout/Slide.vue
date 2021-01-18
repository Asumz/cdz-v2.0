<template>
    <div class="slide">
        <SlideLink :menuList="$store.state.menuList" />
    </div>
</template>

<script>
import SlideLink from "./SlideLink";
export default {
    components: {
        SlideLink,
    },
};
</script>

<style lang="less" scoped>
.slide {
    background-color: #324057;
    // background-color: #001529;
    //background-color: #f5f7fa;
    height: inherit;
    color: rgba(255, 255, 255, 0.65);
    overflow-x: hidden;
    width: 180px; // +
}
</style>