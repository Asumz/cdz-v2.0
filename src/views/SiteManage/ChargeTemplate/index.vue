<template>
    <div class="chargeTemplate">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-button
                    class="float-r"
                    type="success"
                    size="mini"
                    @click="handleShowDialog()"
                    icon="el-icon-plus"
                    >添加模板
                </el-button>
            </div>
            <!-- 父模板 -->
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <!-- 子模版 -->
                <el-table-column type="expand" v-slot="{ row: list }">
                    <el-table
                        :data="list.childTemplate"
                        border
                        style="width: 70%;"
                        :header-cell-style="{
                            background: 'rgba(103, 194, 58, 0.06)',
                            color: '#666',
                        }"
                    >
                        <el-table-column label="开始时间" min-width="100" v-slot="{ row }">
                            {{ (row.hour || 0) + "时" + (row.minute || 0) + "分" }}
                        </el-table-column>
                        <el-table-column label="充电费" min-width="80" v-slot="{ row }">
                            {{ row.chargefee | fmtMoney }}
                        </el-table-column>
                        <el-table-column label="服务费" min-width="80" v-slot="{ row }">
                            {{ row.serverfee | fmtMoney }}
                        </el-table-column>
                        <el-table-column label="类型" min-width="80" v-slot="{ row }">
                            {{
                                row.type == 1
                                    ? "尖"
                                    : row.type == 2
                                    ? "峰"
                                    : row.type == 3
                                    ? "平"
                                    : row.type == 4
                                    ? "谷"
                                    : "— —"
                            }}
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            fixed="right"
                            width="100"
                            v-slot="{ row, $index }"
                        >
                            <el-button
                                circle
                                size="mini"
                                icon="el-icon-edit"
                                @click="handleShowDialog2({ row, parentId: list.id })"
                            ></el-button>
                            <el-button
                                circle
                                @click="
                                    asyDeleteRow({
                                        list: list.childTemplate,
                                        id: row.id,
                                        index: $index,
                                    })
                                "
                                :disabled="list.childTemplate.length == 1"
                                icon="el-icon-delete"
                                type="danger"
                                size="mini"
                            >
                            </el-button>
                        </el-table-column>
                    </el-table>
                </el-table-column>

                <el-table-column label="ID" min-width="80" v-slot="{ row }">
                    {{ row.id | fmtBlank }}
                </el-table-column>

                <el-table-column label="名称" min-width="120" v-slot="{ row }">
                    {{ row.name | fmtBlank }}
                </el-table-column>

                <el-table-column label="计费版本" min-width="80" v-slot="{ row }">
                    {{ row.billver | fmtBlank }}
                </el-table-column>

                <el-table-column label="停车费" min-width="80" v-slot="{ row }">
                    {{ row.parkingfee | fmtMoney }}
                </el-table-column>

                <el-table-column label="充电费减免" min-width="100" v-slot="{ row }">
                    {{ row.discountChargefee | fmtMoney }}
                </el-table-column>

                <el-table-column label="服务费减免" min-width="100" v-slot="{ row }">
                    {{ row.discountServerfee | fmtMoney }}
                </el-table-column>

                <el-table-column label="电流类型" min-width="80" v-slot="{ row }">
                    {{ row.currentType == 1 ? "直流" : row.currentType == 2 ? "交流" : "— —" }}
                </el-table-column>

                <el-table-column label="默认模板" min-width="80" v-slot="{ row }">
                    <el-switch
                        v-model="row.isDefault"
                        :active-value="1"
                        :inactive-value="2"
                        @change="handleDefaultChange(row.id)"
                        :disabled="row.isDefault == 1"
                    ></el-switch>
                </el-table-column>

                <el-table-column label="计费段总数" width="100" v-slot="{ row }">
                    {{ row.childTemplate && row.childTemplate.length | fmtBlank }}
                </el-table-column>

                <el-table-column label="子模版操作" width="100" v-slot="{ row }">
                    <el-button
                        type="success"
                        size="mini"
                        icon="el-icon-plus"
                        plain
                        @click="handleShowDialog2({ parentId: row.id })"
                        :disabled="row.childTemplate.length >= 12"
                        >新增
                    </el-button>
                </el-table-column>

                <el-table-column label="操作" fixed="right" width="190" v-slot="{ row, $index }">
                    <el-button size="mini" icon="el-icon-edit" @click="handleShowDialog(row)"
                        >编辑
                    </el-button>
                    <el-button
                        @click.native.prevent="asyDeleteRow({ index: $index, id: row.id })"
                        :disabled="row.isDefault == 1"
                        icon="el-icon-delete"
                        type="danger"
                        size="mini"
                        >删除
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 分页待做 -->
        <!-- <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" /> -->

        <!-- 子类dialog -->
        <DialogWrapper
            title="子模板信息"
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
                label-width="100px"
                label-position="right"
            >
                <el-form-item label="开始时间">
                    <el-col :span="8">
                        <el-form-item prop="hour">
                            <el-input-number
                                v-model="form2.hour"
                                :min="0"
                                :max="23"
                                style="width: 90%"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">时</el-col>
                    <el-col :span="8">
                        <el-form-item prop="minute">
                            <el-input-number
                                v-model="form2.minute"
                                :min="0"
                                :max="59"
                                :step="5"
                                style="width: 90%"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="4">分</el-col>
                </el-form-item>

                <el-form-item label="充电费" prop="chargefee">
                    <el-input v-model="form2.chargefee" clearable></el-input>
                </el-form-item>

                <el-form-item label="服务费" prop="serverfee">
                    <el-input v-model="form2.serverfee" clearable></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="type">
                    <el-select v-model="form2.type" clearable>
                        <el-option label="尖" :value="1"></el-option>
                        <el-option label="峰" :value="2"></el-option>
                        <el-option label="平" :value="3"></el-option>
                        <el-option label="谷" :value="4"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </DialogWrapper>
        <!-- 父类dialog -->
        <DialogWrapper
            title="父模板信息"
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
                label-width="100px"
                label-position="right"
            >
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>

                <el-form-item label="计费版本" prop="billver">
                    <el-input v-model="form.billver" clearable></el-input>
                </el-form-item>

                <el-form-item label="停车费" prop="parkingfee">
                    <el-input v-model="form.parkingfee" clearable></el-input>
                </el-form-item>

                <el-form-item label="充电费减免" prop="discountChargefee">
                    <el-input v-model="form.discountChargefee" clearable></el-input>
                </el-form-item>

                <el-form-item label="服务费减免" prop="discountServerfee">
                    <el-input v-model="form.discountServerfee" clearable></el-input>
                </el-form-item>

                <el-form-item label="电流类型" prop="currentType">
                    <el-select v-model="form.currentType" clearable>
                        <el-option label="直流" value="1"></el-option>
                        <el-option label="交流" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import mixins from "@/mixins";
import { checkNumber, checkEmpty } from "@/utils/ele";
import {
    getChargeInfo as getTable,
    deleteTemplate as deleteRow,
    updateTemplate as updateRow,
    addTemplate as insertRow,
    setDefaultTemplate,
} from "@/require/template";

export default {
    name: "ChargeTemplate",
    mixins: [mixins],
    data() {
        return {
            getTable,
            insertRow,
            updateRow,
            deleteRow,
            dialogVisible: false,
            dialogVisible2: false,
            form: {},
            form2: {},
            currentRow2: null,
            rules2: {
                hour: { required: true, validator: checkEmpty, trigger: "blur" },
                minute: { required: true, validator: checkEmpty, trigger: "blur" },
                chargefee: { required: true, validator: checkNumber, trigger: "blur" },
                serverfee: { required: true, validator: checkNumber, trigger: "blur" },
                type: { required: true, validator: checkEmpty, trigger: "blur" },
            },
            rules: {
                name: { required: true, validator: checkEmpty, trigger: "blur" },
                parkingfee: { required: true, validator: checkNumber, trigger: "blur" },
                discountChargefee: { required: true, validator: checkNumber, trigger: "blur" },
                discountServerfee: { required: true, validator: checkNumber, trigger: "blur" },
                billver: { required: true, validator: checkNumber, trigger: "blur" },
            },
        };
    },
    methods: {
        asyGetTableInner(data) {
            this.tableData = data;
        },
        async handleDefaultChange(id) {
            try {
                let res = await setDefaultTemplate({ id, isDefault: 1 });
                if (res.code === 0) {
                    messageTip("success", res.tip);
                    this.tableData.map(item => {
                        if (item.id != id) {
                            item.isDefault = 2;
                        }
                    });
                } else {
                    messageTip("error", res.tip);
                }
            } catch (err) {
                throw err;
            }
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleClose2() {
            this.dialogVisible2 = false;
        },
        // 子模板弹窗👇
        handleShowDialog2({ row = {}, parentId } = {}) {
            this.dialogVisible2 = true;
            this.$nextTick(() => {
                this.$refs.form2.clearValidate();
            });
            let { hour, minute, chargefee, serverfee, type, id } = row;
            this.currentRow2 = row;
            this.form2 = {
                hour,
                minute,
                chargefee,
                serverfee,
                type,
                id,
                parentId,
            };
        },
        handleSubmit2() {
            this.$refs.form2.validate(valid => {
                if (valid) {
                    if (this.form2.id) {
                        this.asyUpdateRow({ data: this.form2, row: this.currentRow2 });
                    } else {
                        this.asyInsertRow(this.form2);
                    }
                    this.dialogVisible2 = false;
                }
            });
        },
        // 父模版弹窗👇
        handleShowDialog(row = {}) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            let {
                billver,
                parkingfee,
                discountChargefee,
                discountServerfee,
                currentType,
                name,
                id,
            } = row;
            this.currentRow = row;
            this.form = {
                billver,
                parkingfee,
                discountChargefee,
                discountServerfee,
                currentType,
                name,
                id,
                parentId: 0,
            };
        },
        handleSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 计费版本去重改由后端做加分页
                    let repeat = false;
                    this.tableData.map(item => {
                        if (item != this.currentRow && item.billver == this.form.billver) {
                            repeat = true;
                        }
                    });
                    if (repeat) return messageTip("warning", "计费版本重复");

                    if (this.form.id) {
                        this.asyUpdateRow({ data: this.form });
                    } else {
                        this.asyInsertRow(this.form);
                    }
                    this.dialogVisible = false;
                }
            });
        },
    },
};
</script>
