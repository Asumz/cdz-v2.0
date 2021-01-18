<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <i>{{ edit == "create" ? "新增桩主" : "修改桩主" }}</i>
            </div>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                size="small"
                label-width="80px"
                label-position="right"
                style="width: 60%;"
            >
                <el-form-item label="手机号" prop="phoneNum">
                    <el-input v-model="form.phoneNum" clearable :disabled="hasPhone"></el-input>
                </el-form-item>
                <el-form-item label="地区" prop="areaValue">
                    <AreaCascader v-model="form.areaValue" :areaname.sync="form.areaname" />
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="form.address" clearable></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="cardNum">
                    <el-input v-model="form.cardNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="开户行" prop="bankName">
                    <el-input v-model="form.bankName" clearable></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" prop="bankCardNum">
                    <el-input v-model="form.bankCardNum" clearable></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="form.realname" clearable></el-input>
                </el-form-item>

                <el-form-item label="身份证" required>
                    <div style="display:flex;">
                        <el-form-item prop="cardFrontImgUrl" class="mr-20">
                            <Upload
                                v-model="form.cardFrontImgUrl"
                                width="171px"
                                height="108px"
                                tip="*左边为正面, 右边为反面"
                            />
                        </el-form-item>
                        <el-form-item prop="cardBackImg">
                            <Upload
                                v-model="form.cardBackImg"
                                width="171px"
                                height="108px"
                                hideTip
                            />
                        </el-form-item>
                    </div>
                </el-form-item>

                <el-form-item label="是否禁用" prop="enabled">
                    <el-radio-group v-model="form.enabled">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="选择门店" prop="">
                    <el-select v-model="form.mendian" disabled></el-select>
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
import { checkPhone, checkID, checkEmpty } from "@/utils/ele";
import { queryMeruserlist, insertMeruser, updateMeruser } from "@/require/userManage";

export default {
    name: "merinfo-edit",
    data() {
        return {
            form: {},
            rules: {
                phoneNum: { required: true, validator: checkPhone, trigger: "blur" },
                areaValue: { required: true, validator: checkEmpty, trigger: "blur" },
                address: { required: true, validator: checkEmpty, trigger: "blur" },
                cardNum: { required: true, validator: checkID, trigger: "blur" },
                bankName: { required: true, validator: checkEmpty, trigger: "blur" },
                bankCardNum: { required: true, validator: checkEmpty, trigger: "blur" },
                realname: { required: true, validator: checkEmpty, trigger: "blur" },
                cardFrontImgUrl: { required: true, validator: checkEmpty, trigger: "blur" },
                cardBackImg: { required: true, validator: checkEmpty, trigger: "blur" },
            },
            hasPhone: false,
        };
    },
    computed: {
        id() {
            return this.$route.query.id;
        },
        edit() {
            return this.$route.query.edit;
        },
    },
    created() {
        this.query({ id: this.id });
    },
    methods: {
        async query(data) {
            try {
                let res = await queryMeruserlist(data);
                if (res.code === 0) {
                    let form = (res.data && res.data.records && res.data.records[0]) || {};
                    this.form = form;
                    this.form.uid = this.id;
                    this.hasPhone = !!this.form.phoneNum;
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        async manipulation(cb, p) {
            try {
                let res = await cb(p);
                if (res.code === 0 && res.data) {
                    messageTip("success", res.tip);
                    this.$router.replace("/usermanage/merInfo");
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    const { areaValue, ...obj } = this.form;
                    const [province, city, country] = areaValue;
                    const params = { ...obj, province, city, country };
                    if (this.edit == "update") {
                        this.manipulation(updateMeruser, params);
                    } else {
                        this.manipulation(insertMeruser, params);
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
