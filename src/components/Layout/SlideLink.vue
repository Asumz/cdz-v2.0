<template>
    <div class="slideLink">
        <ul class="fUl" v-for="(item, i) in menuList" :key="i">
            <li
                @click="handlefLi(i)"
                :class="listData.obj['fLink' + i] ? 'select' : ''"
            >
                <i :class="'iconfont ' + item.icon"></i>
                {{ item.title }}
                <span class="el-icon-arrow-right arrowIcon"></span>
            </li>
            <el-collapse-transition
                v-if="item.children && item.children.length > 0"
                :index="i"
            >
                <ul class="sUl" v-show="listData.obj['fLink' + i]">
                    <router-link
                        v-for="(jtem, j) in item.children"
                        :key="j"
                        :to="jtem.link"
                        tag="li"
                        >{{ jtem.title }}</router-link
                    >
                </ul>
            </el-collapse-transition>
        </ul>
    </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
export default {
    name: "SlideLink",
    props: ["menuList"],
    data() {
        let tr = { obj: {} }; //定义个tr对象，里面包含各obj对象
        this.menuList.forEach((item, i) => {
            tr.obj["fLink" + i] = false;
            if (item.children && item.children.length > 0) {
                item.children.forEach((jtem, j) => {
                    tr.obj["sLink" + i + "-" + j] = false;
                });
            }
        });
        //  tr= {"obj":{"fLink0":false,"sLink0-0":false,"sLink0-1":false,"sLink0-2":false,"fLink1":false,"sLink1-0":false,"sLink1-1":false,"sLink1-2":false,"fLink2":false,"sLink2-0":false,"sLink2-1":false,"sLink2-2":false,"sLink2-3":false,"sLink2-4":false,"fLink3":false,"sLink3-0":false,"sLink3-1":false,"sLink3-2":false,"sLink3-3":false,"fLink4":false,"sLink4-0":false,"sLink4-1":false,"sLink4-2":false,"fLink5":false,"sLink5-0":false}}
        return {
            listData: tr,
        };
    },
    mounted() {
        //当刷新，刚进入页面的时候判断当前地址，并控制一级导航菜单是否下拉
        this.handlePathToContalfLiIsShow(this.$route.path);
    },
    watch: {
        //每当地址改变的时候判断当前地址，并控制一级导航菜单是否下拉
        $route(newVal, oldVal) {
            this.handlePathToContalfLiIsShow(newVal.path);
        },
    },
    methods: {
        //点击跳转连接,并传参。获取值的时候，使用this.$route.query来获取
        handleLink(path) {
            console.time("testForEach1");
            //   console.log(path)
            this.$router.push({
                path: path,
                query: {
                    name: "zs",
                    age: 18,
                },
            });
            console.timeEnd("testForEach1");
        },
        handlefLi(index) {
            //点击一级菜单，控制对应的导航时候下拉和隐藏
            let listCopy = this.listData.obj;
            for (let key in listCopy) {
                if (key == "fLink" + index) {
                    listCopy[key] = !listCopy[key];
                } else {
                    listCopy[key] = false;
                }
            }
            this.listData.obj = listCopy;
        },
        handleMenuGetIndex(path) {
            //根据当前地址获取对应菜单的索引
            let index = 100;
            this.menuList.forEach((item, i) => {
                if (path.includes(item.link)) {
                    index = parseInt(item.index);
                }
            });
            return index;
        },
        handlePathToContalfLiIsShow(path) {
            //根据路径判断当前第一导航是否打开
            let listCopy = this.listData.obj;
            for (let key in listCopy) {
                if (key == "fLink" + this.handleMenuGetIndex(path)) {
                    listCopy[key] = true;
                } else {
                    listCopy[key] = false;
                }
            }
            this.listData.obj = listCopy;
        },
    },
};
</script>

<style lang="less" scoped>
.slideLink {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    user-select: none;
    &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
    }

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
    }
    .toggleSlideLink {
        position: absolute;
        bottom: 20px;
        right: 20px;
        font-size: 20px;
        padding: 5px;
        z-index: 99;
    }
    .fUl {
        font-size: 14px;
        & > li {
            line-height: 56px;
            cursor: pointer;
            padding: 0 20px;
            position: relative;
            transition: all 0.5s;
            i {
                margin-right: 10px;
                font-size: 14px;
            }
            &:hover {
                background-color: rgb(40, 51, 70);
            }
            .arrowIcon {
                position: absolute;
                right: 20px;
                top: 50%;
                margin-top: -8px;
                transition: all 0.5s;
            }
            &.select {
                color: #fff;
                .arrowIcon {
                    transform: rotate(90deg);
                }
            }
        }
        .sUl {
            padding: 0;
            background-color: #3d4b63;
            li {
                height: 38px;
                line-height: 38px;
                padding: 0 20px 0 45px;
                margin-bottom: 5px;
                transition: all 0.5s;
                cursor: pointer;
                &:hover {
                    background-color: rgb(40, 51, 70);
                }
            }

            .router-link-active {
                color: #fff;
                background-color: #409eff !important;
            }
        }
    }
}
</style>