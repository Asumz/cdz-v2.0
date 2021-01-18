<template>
    <div class="template">
        <el-collapse v-model="active">
            <el-collapse-item
                :title="'计费模板' + item.id"
                v-for="(item, i) in arr"
                :key="i"
                :name="i"
            >
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-switch
                            slot="reference"
                            v-model="item.isDefault"
                            :active-value="1"
                            :inactive-value="2"
                            active-text="默认"
                            @change="handleDefaultChange(item.id)"
                            :disabled="item.isDefault == 1"
                        ></el-switch>
                        <div style="float: right">
                            <el-button
                                type="success"
                                size="mini"
                                icon="el-icon-plus"
                                circle
                                @click="handleShowDialog(item.id)"
                                :disabled="item.childTemplate.length >= 12"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                circle
                                @click="handleEditTem(item)"
                                v-if="!item.edit"
                            ></el-button>
                            <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-close"
                                circle
                                v-if="!item.edit"
                                :disabled="item.isDefault == 1"
                                @click="handleDeleteTem(item.id, item.isDefault)"
                            ></el-button>
                            <el-button
                                type="success"
                                size="mini"
                                circle
                                @click="handleSaveEditTem(item, i)"
                                v-if="item.edit"
                                icon="el-icon-folder-checked"
                            ></el-button>
                            <el-button
                                type="warning"
                                size="mini"
                                circle
                                @click="handleCancelDeleteTem(item)"
                                v-if="item.edit"
                                icon="el-icon-folder-delete"
                            ></el-button>
                        </div>
                    </div>
                    <!-- 模板父类 -->
                    <el-table
                        :data="[{}]"
                        border
                        fit
                        style="width: 100%"
                        :show-header="false"
                        :cell-style="{
                            background: 'rgba(0,211,255,0.06)',
                            'font-size': '13px',
                            color: '#666',
                        }"
                    >
                        <el-table-column min-width="850" v-slot="scope">
                            <div class="temContent">
                                <div>
                                    <b>停车费:</b>
                                    <span v-if="!item.edit" class="top_span">
                                        {{ item.parkingfee }}
                                    </span>
                                    <el-input
                                        v-else
                                        size="mini"
                                        v-model="temForm.parkingfee"
                                        style="width: 60%; display: inline-block"
                                    ></el-input>
                                </div>
                            </div>

                            <div class="temContent">
                                <div>
                                    <b>计费版本:</b>
                                    <span v-if="!item.edit" class="top_span">
                                        {{ item.billver != null ? "v" + item.billver : "— —" }}
                                    </span>
                                    <el-input
                                        v-else
                                        size="mini"
                                        v-model="temForm.billver"
                                        style="width: 60%; display: inline-block"
                                    ></el-input>
                                </div>
                            </div>

                            <div class="temContent">
                                <div>
                                    <b>电流类型:</b>
                                    <span v-if="!item.edit" class="top_span">
                                        {{
                                            item.currentType == 1
                                                ? "直流"
                                                : item.currentType == 2
                                                ? "交流"
                                                : "— —"
                                        }}
                                    </span>

                                    <el-select
                                        v-else
                                        v-model="temForm.currentType"
                                        clearable
                                        size="mini"
                                        style="width: 60%; display: inline-block"
                                    >
                                        <el-option label="直流" value="1"></el-option>
                                        <el-option label="交流" value="2"></el-option>
                                    </el-select>
                                </div>
                            </div>

                            <div class="temContent">
                                <div>
                                    <b>计费段总数:</b>
                                    <span class="top_span">
                                        {{ item.childTemplate.length }}
                                    </span>
                                </div>
                            </div>
                        </el-table-column>
                    </el-table>
                    <!-- 子类 -->
                    <el-table
                        :data="item.childTemplate"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{
                            background: '#f5f7fa',
                            color: '#666',
                            'font-size': '13px',
                        }"
                        :cell-style="{ 'font-size': '13px', color: '#666' }"
                    >
                        <el-table-column prop="hour" label="开始时间" min-width="300">
                            <template slot-scope="{ row }">
                                <div v-if="row.edit" style="display: flex">
                                    <p style="white-space: nowrap; width: 50%">
                                        <el-input-number
                                            size="mini"
                                            v-model="childTemForm.hour"
                                            :min="0"
                                            :max="23"
                                            style="width: 100px"
                                        ></el-input-number
                                        >时
                                    </p>
                                    <p style="white-space: nowrap; width: 50%">
                                        <el-input-number
                                            size="mini"
                                            v-model="childTemForm.minute"
                                            :min="0"
                                            :max="59"
                                            :step="5"
                                            style="width: 100px"
                                        >
                                        </el-input-number
                                        >分
                                    </p>
                                </div>
                                <span v-else> {{ row.hour || 0 }}时{{ row.minute || 0 }}分 </span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="chargefee" label="充电费用" min-width="200">
                            <template slot-scope="{ row }">
                                <div v-if="row.edit">
                                    <el-input
                                        type="number"
                                        size="mini"
                                        v-model="childTemForm.chargefee"
                                        style="width: 85%; margin-right: 10px"
                                        placeholder="请输入充电费用"
                                        clearable
                                    ></el-input>
                                </div>
                                <span v-else>{{ row.chargefee }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="serverfee" label="服务费" min-width="200">
                            <template slot-scope="{ row }">
                                <div v-if="row.edit">
                                    <el-input
                                        type="number"
                                        size="mini"
                                        v-model="childTemForm.serverfee"
                                        style="width: 85%; margin-right: 10px"
                                        placeholder="请输入服务费"
                                        clearable
                                    ></el-input>
                                </div>
                                <span v-else>{{ row.serverfee }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="type" label="类型" min-width="150">
                            <template slot-scope="{ row }">
                                <div v-if="row.edit">
                                    <el-select v-model="childTemForm.type" clearable size="mini">
                                        <el-option label="尖" value="1"></el-option>
                                        <el-option label="峰" value="2"></el-option>
                                        <el-option label="平" value="3"></el-option>
                                        <el-option label="谷" value="4"></el-option>
                                    </el-select>
                                </div>
                                <span v-else>
                                    {{
                                        row.type == 1
                                            ? "尖"
                                            : row.type == 2
                                            ? "峰"
                                            : row.type == 3
                                            ? "平"
                                            : row.type == 4
                                            ? "谷"
                                            : "其他"
                                    }}
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="handle" label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                    v-if="!scope.row.edit"
                                    size="mini"
                                    plain
                                    icon="el-icon-edit"
                                    @click="handleEditChildTem(scope.row)"
                                    >编辑
                                </el-button>
                                <el-button
                                    type="danger"
                                    size="mini"
                                    @click="handleDeleteChildTem(scope.$index, item.childTemplate)"
                                    v-if="!scope.row.edit"
                                    :disabled="item.childTemplate.length <= 1"
                                    icon="el-icon-delete"
                                    >删除
                                </el-button>
                                <el-button
                                    type="success"
                                    size="mini"
                                    @click="handleSaveEditChildTem(scope.row)"
                                    v-if="scope.row.edit"
                                    icon="el-icon-folder-checked"
                                    >保存
                                </el-button>
                                <el-button
                                    type="warning"
                                    size="mini"
                                    @click="handleCancelDeleteChildTem(scope.row)"
                                    v-if="scope.row.edit"
                                    icon="el-icon-folder-delete"
                                    >取消
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-collapse-item>
        </el-collapse>
        <!-- 添加父类 -->
        <div style="margin-top: 20px; text-align: center" class="clearfix">
            <el-button type="primary" size="mini" @click="handleShowDialog2" icon="el-icon-plus"
                >添加模板</el-button
            >
        </div>
        <!-- 子类dialog -->
        <DialogWrapper
            title="计费信息"
            width="500px"
            :dialogVisible="dialogVisible"
            :handleClose="handleClose"
            :handleSubmit="handleSubmit"
            :handleCancen="handleClose"
        >
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                size="small"
                label-width="90px"
                label-position="right"
            >
                <el-form-item label="开始时间" required>
                    <el-col :span="8">
                        <el-form-item prop="hour">
                            <el-input-number
                                v-model="form.hour"
                                :min="0"
                                :max="23"
                                size="small"
                                style="width: 90%"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">时</el-col>
                    <el-col :span="8">
                        <el-form-item prop="minute">
                            <el-input-number
                                v-model="form.minute"
                                :min="0"
                                :max="59"
                                :step="5"
                                size="small"
                                style="width: 90%"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">分</el-col>
                </el-form-item>

                <el-form-item label="充电费用" prop="chargefee">
                    <el-input type="number" v-model="form.chargefee" clearable></el-input>
                </el-form-item>

                <el-form-item label="服务费" prop="serverfee">
                    <el-input type="number" v-model="form.serverfee" clearable></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="type">
                    <el-select v-model="form.type" placeholder="请选择类型" clearable>
                        <el-option label="尖" value="1"></el-option>
                        <el-option label="峰" value="2"></el-option>
                        <el-option label="平" value="3"></el-option>
                        <el-option label="谷" value="4"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </DialogWrapper>
        <!-- 父类dialog -->
        <DialogWrapper
            title="计费信息"
            width="500px"
            :dialogVisible="dialogVisible2"
            :handleClose="handleClose2"
            :handleSubmit="handleSubmit2"
            :handleCancen="handleClose2"
        >
            <el-form
                ref="form2"
                :model="form2"
                :rules="rules2"
                size="small"
                label-width="90px"
                label-position="right"
            >
                <el-form-item label="停车费" prop="parkingfee">
                    <el-input type="number" v-model="form2.parkingfee" clearable></el-input>
                </el-form-item>

                <el-form-item label="计费版本" prop="billver">
                    <el-input v-model="form2.billver" clearable></el-input>
                </el-form-item>

                <el-form-item label="电流类型" prop="currentType">
                    <el-select v-model="form2.currentType" placeholder="请选择类型" clearable>
                        <el-option label="直流" value="1"></el-option>
                        <el-option label="交流" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="设为默认">
                    <el-switch
                        v-model="form2.isDefault"
                        :active-value="1"
                        :inactive-value="2"
                        disabled
                    ></el-switch>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import {
    deleteTemplate,
    updateTemplate,
    addTemplate,
    setDefaultTemplate,
} from "@/require/template";
export default {
    props: ["list"],
    data() {
        var checkVer = (rule, value, callback) => {
            this.arr.map(item => {
                if (item.billver == value) {
                    callback(new Error("计费版本重复"));
                }
            });
            callback();
        };
        return {
            isEditingTem: false, //是否已存在正在编辑的主模板
            isEditingChildTem: false, //是否已存在正在编辑的子模板
            temForm: {}, //存放编辑主模板的容器
            childTemForm: {}, //存放编辑子模板的容器
            dialogVisible: false,
            dialogVisible2: false,
            form: {},
            form2: {},
            rules: {
                hour: {
                    required: true,
                    message: "请输入小时",
                    trigger: "blur",
                },
                minute: {
                    required: true,
                    message: "请输入分钟",
                    trigger: "blur",
                },
                chargefee: {
                    required: true,
                    message: "请输入充电费用",
                    trigger: "blur",
                },
                serverfee: {
                    required: true,
                    message: "请输入服务费",
                    trigger: "blur",
                },
                type: {
                    required: true,
                    message: "请选择类型",
                    trigger: "change",
                },
            },
            rules2: {
                billver: [
                    {
                        required: true,
                        message: "请输入计费版本",
                        trigger: "blur",
                    },
                    { validator: checkVer, trigger: "blur" },
                ],
            },
            active: [0, 1, 2],
        };
    },
    computed: {
        arr() {
            return this.list;
        },
    },
    methods: {
        // 删除子模板
        handleDeleteChildTem(index, rows) {
            alertConfim("确认删除子模板吗？", () => {
                let id = rows[index].id;
                deleteTemplate({ id }).then(res => {
                    if (res.code == 0) {
                        rows.splice(index, 1);
                        messageTip("success", res.tip);
                    } else {
                        messageTip("error", res.tip);
                    }
                });
            });
        },
        // 添加模版
        async handleAddTem(data) {
            try {
                let res = await addTemplate(data);
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    this.$emit("reload");
                    this.isEditingTem = false;
                    this.isEditingChildTem = false;
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                console.log(error);
            }
        },
        //编辑子模板
        handleEditChildTem(row) {
            if (this.isEditingChildTem) {
                this.$message.warning("请先保存或取消其他的编辑操作！");
                return;
            }
            let { chargefee, hour, serverfee, type, minute, parentId, id } = row;
            this.childTemForm = {
                chargefee,
                hour,
                serverfee,
                type,
                minute,
                parentId,
                id,
            };
            this.$set(row, "edit", true);
            this.isEditingChildTem = true;
        },
        //提交编辑的子模板
        handleSaveEditChildTem(row) {
            updateTemplate(this.childTemForm).then(res => {
                if (res.code === 0) {
                    row.hour = this.childTemForm.hour;
                    row.minute = this.childTemForm.minute;
                    row.chargefee = this.childTemForm.chargefee;
                    row.serverfee = this.childTemForm.serverfee;
                    row.type = this.childTemForm.type;
                    this.$set(row, "edit", false);
                    this.isEditingChildTem = false;
                    messageTip("success", res.tip);
                } else {
                    messageTip("warning", res.tip);
                }
            });
        },
        //取消编辑的子模板
        handleCancelDeleteChildTem(row) {
            this.childTemForm = {};
            this.$set(row, "edit", false);
            this.isEditingChildTem = false;
        },
        // 添加子类模板弹窗👇
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.handleAddTem(this.form);
                    this.dialogVisible = false;
                } else {
                    return false;
                }
            });
        },
        handleShowDialog(parentId) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            this.form = { parentId };
        },
        //删除主模板
        handleDeleteTem(id, isDefault) {
            alertConfim("确认删除主模板吗？", () => {
                deleteTemplate({ id })
                    .then(res => {
                        if (res.code === 0) {
                            this.arr.map((item, index) => {
                                if (item.id == id) {
                                    this.arr.splice(index, 1);
                                }
                            });
                            // this.arr.splice(index, 1);
                            messageTip("success", res.tip);
                        } else {
                            messageTip("warning", res.tip);
                        }
                    })
                    .catch(error => {});
            });
        },
        //点击编辑主模板
        handleEditTem(item) {
            //主模板对象
            if (this.isEditingTem) {
                this.$message.warning("请先保存或取消其他的编辑操作！");
                return;
            }
            let { billver, parkingfee, currentType, id } = item;
            this.temForm = {
                billver,
                parkingfee,
                currentType,
                id,
                parentId: 0,
            };
            this.$set(item, "edit", true);
            this.isEditingTem = true;
        },
        //保存编辑主模板
        handleSaveEditTem(item, i) {
            let exist = false;
            this.arr.map((card, j) => {
                if (i != j) {
                    if (card.billver == this.temForm.billver) {
                        exist = true;
                    }
                }
            });
            if (exist) {
                messageTip("warning", "计费版本重复");
                return;
            }
            //校验，发送请求
            updateTemplate(this.temForm).then(res => {
                if (res.code === 0) {
                    item.billver = this.temForm.billver;
                    item.parkingfee = this.temForm.parkingfee;
                    item.timenum = this.temForm.timenum;
                    item.currentType = this.temForm.currentType;
                    this.$set(item, "edit", false);
                    this.isEditingTem = false;
                    messageTip("success", res.tip);
                } else {
                    messageTip("warning", res.tip);
                }
            });
        },
        //取消编辑的主模板
        handleCancelDeleteTem(item) {
            this.temForm = {};
            this.$set(item, "edit", false);
            this.isEditingTem = false;
        },
        // 添加父模版弹窗👇
        handleShowDialog2() {
            this.dialogVisible2 = true;
            this.$nextTick(() => {
                this.$refs.form2.clearValidate();
            });
            this.form2 = { parentId: 0 };
            !this.arr.length && (this.form2.isDefault = 1);
        },
        handleClose2() {
            this.dialogVisible2 = false;
        },
        handleSubmit2() {
            this.$refs.form2.validate(valid => {
                if (valid) {
                    this.handleAddTem(this.form2);
                    this.dialogVisible2 = false;
                }
            });
        },
        async handleDefaultChange(id) {
            try {
                let res = await setDefaultTemplate({ id, isDefault: 1 });
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    this.$emit("reload");
                } else {
                    messageTip("error", res.tip);
                }
            } catch (err) {
                throw err;
            }
        },
    },
};
</script>

<style lang="less" scoped>
.template {
    .temContent {
        width: 25%;
        float: left;
    }
}
</style>
