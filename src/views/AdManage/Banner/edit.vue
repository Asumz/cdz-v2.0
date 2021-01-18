<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i>{{ id ? "修改广告" : "新增广告" }}</i>
            </div>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                size="small"
                label-width="100px"
                label-position="right"
                style="width: 90%;"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" clearable></el-input>
                </el-form-item>

                <el-form-item label="位置" prop="position">
                    <el-select v-model="form.position" filterable>
                        <el-option
                            v-for="(item, i) of options"
                            :key="i"
                            :label="item.title"
                            :value="item.key"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="图片" prop="imgUrl">
                    <Upload v-model="form.imgUrl" width="345px" heigth="130px" />
                </el-form-item>

                <el-form-item label="url" prop="linkUrl">
                    <el-input v-model="form.linkUrl"></el-input>
                    <p class="font-12 c-info">*url跳转优先级高于富文本</p>
                </el-form-item>

                <el-form-item label="富文本" prop="description">
                    <tinymce ref="tinymce" v-model="form.description" :height="300" />
                </el-form-item>

                <el-form-item label="排序" prop="sn">
                    <el-input-number v-model="form.sn" :min="0" :max="10"></el-input-number>
                    <i class="c-info font-12 ml-5"
                        >*默认为0，同等级按结束时间倒序，排序值越小越靠前
                    </i>
                </el-form-item>

                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        style="width: 200px;"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        style="width: 200px;"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-finished" type="primary" @click="submitForm('form')"
                        >提交
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import pickerOptions from "@/utils/dateTime";
import { checkEmpty } from "@/utils/ele";
import { selectBanner, insertBanner, updateBanner, getPositions } from "@/require/adManage";

export default {
    name: "banner-edit",
    components: { Tinymce },
    data() {
        return {
            pickerOptions,
            options: [],
            form: {},
            rules: {
                position: { required: true, validator: checkEmpty, trigger: "change" },
                imgUrl: { required: true, validator: checkEmpty },
            },
        };
    },
    computed: {
        id() {
            return this.$route.query.id;
        },
    },
    created() {
        this.id && this.query({ id: this.id });
        this.asyGetPositions();
    },
    methods: {
        async query(data) {
            try {
                let res = await selectBanner(data);
                if (res.code === 0) {
                    let form = res.data && res.data.records && res.data.records[0];
                    this.form = form;
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        async manipulation(cb) {
            try {
                let res = await cb(this.form);
                if (res.code === 0 && res.data) {
                    messageTip("success", res.tip);
                    this.$router.replace("/adManage/banner");
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        async asyGetPositions() {
            let res = await getPositions();
            if (res.code === 0 && res.data) {
                this.options = res.data;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.id) {
                        this.manipulation(updateBanner);
                    } else {
                        this.manipulation(insertBanner);
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>
