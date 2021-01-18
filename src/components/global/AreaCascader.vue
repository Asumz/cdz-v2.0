<template>
    <div class="area-cascader">
        <el-cascader v-model="newValue" :options="options" :props="props" filterable clearable>
        </el-cascader>
    </div>
</template>

<script>
import options from "@/utils/area";

export default {
    name: "AreaCascader",
    props: {
        value: {
            requied: true,
            type: Array,
        },
        areaname: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            options,
            props: {
                value: "id",
                label: "name",
                children: "childList",
                expandTrigger: "hover",
            },
            newValue: this.value,
        };
    },
    watch: {
        newValue(val) {
            this.$emit("input", val);
            this.$emit("update:areaname", this.getAreaName());
        },
    },
    methods: {
        getAreaName() {
            let [province, city, country] = this.newValue;
            let str = "";
            options.map(item => {
                if (item.id == province) {
                    str += item.name;
                    item.childList.map(jtem => {
                        if (jtem.id == city) {
                            str = str + "," + jtem.name;
                            jtem.childList.map(ktem => {
                                if (ktem.id == country) {
                                    str = str + "," + ktem.name;
                                }
                            });
                        }
                    });
                }
            });
            return str;
        },
    },
};
</script>

<style lang="less" scoped></style>
