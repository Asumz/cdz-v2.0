<template>
    <div class="deviceList">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form inline class="demo-form-inline" :model="queryForm" size="small">
                <el-form-item label="设备号" class="form_right25 w220">
                    <el-input v-model="queryForm.code" placeholder="设备号" clearable></el-input>
                </el-form-item>

                <el-form-item label="站点编号" class="form_right25">
                    <el-input
                        v-model="queryForm.areaCode"
                        placeholder="站点编号"
                        clearable
                    ></el-input>
                </el-form-item>
                
                <el-form-item label="站点名称" class="form_right25">
                    <el-input
                        v-model="queryForm.areaName"
                        placeholder="站点名称"
                        clearable
                    ></el-input>
                </el-form-item>

                <el-form-item class="content_btn w80">
                    <el-button type="primary" @click="handleSearch" icon="el-icon-search"
                        >查询
                    </el-button>
                </el-form-item>

                <el-form-item class="content_btn w80">
                    <el-button disabled type="primary" icon="el-icon-download">导出</el-button>
                </el-form-item>

                <el-form-item class="content_btn w100">
                    <el-button type="success" @click="handleShowDialog()" icon="el-icon-plus"
                        >添加设备
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableData"
                v-loading="loading"
                border
                style="width: 100%"
                :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            >
                <el-table-column prop="code" label="设备号" min-width="170" v-slot="{ row }">
                    {{ row.code | fmtBlank }}
                </el-table-column>

                <el-table-column prop="remark" label="设备名" min-width="170" v-slot="{ row }">
                    {{ row.remark | fmtBlank }}
                </el-table-column>

                <el-table-column prop="address" label="设备地址" min-width="170" v-slot="{ row }">
                    {{ row.address | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="location"
                    label="地理位置详情"
                    min-width="170"
                    v-slot="{ row }"
                >
                    {{ row.location | fmtBlank }}
                </el-table-column>

                <el-table-column prop="state" label="设备状态" width="80" v-slot="{ row }">
                    <i :class="{ 'c-success': row.state === 1, 'c-danger': row.state === 0 }">
                        {{ row.state === 0 ? "离线" : row.state === 1 ? "在线" : "— —" }}
                    </i>
                </el-table-column>

                <el-table-column
                    prop="hardversion"
                    label="设备硬件版本"
                    min-width="110"
                    v-slot="{ row }"
                >
                    {{ row.hardversion | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="softversion"
                    label="设备软件版本"
                    min-width="110"
                    v-slot="{ row }"
                >
                    {{ row.softversion | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="subHardversion"
                    label="次单元硬件版本"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.subHardversion | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="subSoftversion"
                    label="次单元软件版本"
                    min-width="120"
                    v-slot="{ row }"
                >
                    {{ row.subSoftversion | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="dcModeltype"
                    label="直流模块类型"
                    min-width="110"
                    v-slot="{ row }"
                >
                    {{ row.dcModeltype | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="dcModelnum"
                    label="直流模块总数"
                    min-width="110"
                    v-slot="{ row }"
                >
                    {{ row.dcModelnum | fmtBlank }}
                </el-table-column>

                <el-table-column
                    prop="dcModelpower"
                    label="直流模块单模块功率(kw)"
                    min-width="180"
                    v-slot="{ row }"
                >
                    {{ row.dcModelpower | fmtBlank }}
                </el-table-column>

                <el-table-column prop="areaCode" label="所属站点" min-width="150" v-slot="{ row }">
                    <p>编号: {{ row.areaCode | fmtBlank }}</p>
                    <p>名称: {{ row.areaName | fmtBlank }}</p>
                </el-table-column>

                <el-table-column label="项目站点" min-width="120" v-slot="{ row }">
                    <!-- {{ row.address | fmtBlank }} -->
                </el-table-column>

                <el-table-column prop="lon" label="经度" min-width="90" v-slot="{ row }">
                    {{ row.lon | fmtBlank }}
                </el-table-column>

                <el-table-column prop="lat" label="纬度" min-width="90" v-slot="{ row }">
                    {{ row.lat | fmtBlank }}
                </el-table-column>

                <el-table-column label="计费模板" min-width="170" v-slot="{ row }">
                    <p>ID: {{ row.tempid | fmtBlank }}</p>
                    <p>名称: {{ row.tempName | fmtBlank }}</p>
                </el-table-column>

                <el-table-column
                    prop="clientDevicenum"
                    label="客户设备编码"
                    min-width="130"
                    v-slot="{ row }"
                >
                    {{ row.clientDevicenum | fmtBlank }}
                </el-table-column>

                <el-table-column label="查看更多" min-width="120" fixed="right" v-slot="{ row }">
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-connection"
                        plain
                        @click="
                            $router.push({
                                path: '/deviceManage/deviceList/merDetail',
                                query: { equipmentCode: row.code },
                            })
                        "
                        >绑定桩主
                    </el-button>
                </el-table-column>

                <el-table-column label="操作" width="190" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            icon="el-icon-edit"
                            @click="handleShowDialog(scope.row)"
                            >编辑
                        </el-button>
                        <el-button
                            @click.native.prevent="
                                asyDeleteRow({
                                    index: scope.$index,
                                    id: scope.row.code,
                                    by: 'code',
                                })
                            "
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <DialogWrapper
            title="设备信息"
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
                label-width="150px"
                label-position="right"
            >
                <el-form-item label="设备号" prop="code" v-if="!currentRow.code">
                    <el-input v-model="form.code" clearable></el-input>
                </el-form-item>

                <el-form-item label="设备名称" prop="remark">
                    <el-input v-model="form.remark" clearable></el-input>
                </el-form-item>

                <el-form-item label="项目站点" prop="project">
                    <el-select v-model="form.project" filterable disabled></el-select>
                </el-form-item>

                <el-form-item label="设备硬件版本" prop="hardversion">
                    <el-input v-model="form.hardversion" clearable></el-input>
                </el-form-item>

                <el-form-item label="设备软件版本" prop="softversion">
                    <el-input v-model="form.softversion" clearable></el-input>
                </el-form-item>

                <el-form-item label="次单元硬件版本" prop="subHardversion">
                    <el-input v-model="form.subHardversion" clearable></el-input>
                </el-form-item>

                <el-form-item label="次单元软件版本" prop="subSoftversion">
                    <el-input v-model="form.subSoftversion" clearable></el-input>
                </el-form-item>

                <el-form-item label="直流模块类型" prop="dcModeltype">
                    <el-input v-model="form.dcModeltype" clearable></el-input>
                </el-form-item>

                <el-form-item label="直流模块总数" prop="dcModelnum">
                    <el-input v-model="form.dcModelnum" clearable></el-input>
                </el-form-item>

                <el-form-item label="直流模块单模块功率" prop="dcModelpower">
                    <el-input v-model="form.dcModelpower" clearable></el-input>
                </el-form-item>

                <el-form-item label="地理位置详情" prop="location">
                    <el-input v-model="form.location" clearable></el-input>
                </el-form-item>

                <el-form-item label="站点名称" prop="areaName">
                    <el-select v-model="form.areaName" filterable>
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="经度" prop="lon" v-if="currentRow.code">
                    <el-input v-model="form.lon" clearable></el-input>
                </el-form-item>

                <el-form-item label="纬度" prop="lat" v-if="currentRow.code">
                    <el-input v-model="form.lat" clearable></el-input>
                </el-form-item>

                <el-form-item label="客户设备编码" prop="clientDevicenum">
                    <el-input v-model="form.clientDevicenum" clearable></el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>

        <!-- 显示二维码 -->
        <!-- <el-dialog
            :show-close="false"
            :visible.sync="dialogVisible"
            width="300px"
            :modal="false"
            custom-class="dialog"
            :destroy-on-close="true"
        >
            <div class="qeCodeContent">
                <QRCode
                    :alertDeviceCode="alertDeviceCode"
                    v-if="dialogVisible"
                />
            </div>
        </el-dialog> -->

        <!-- 端口二维码 -->
        <!-- <el-dialog
            :show-close="false"
            :visible.sync="dialogQRCodePortVisible"
            width="1260px"
            :modal="false"
            custom-class="dialog_port"
            :destroy-on-close="true"
        >
            <div class="qeCodeContent">
                <QRCodeForPort
                    :selectPortCode="selectPortCodeObj.code"
                    :portNum="selectPortCodeObj.portNum"
                    v-if="dialogQRCodePortVisible"
                />
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
// import dateTimeJS from "@/utils/dateTime";
// import QRCode from "@/components/common/QRCode";
// import QRCodeForPort from "@/components/common/QRCodeForPort";
// import exportExcel from "@/utils/excel";
import {
    getDeviceList as getTable,
    addDeviceList as insertRow,
    updateDeviceList as updateRow,
    delDeviceList as deleteRow,
    selectAllArea,
    selectDeviceExist,
} from "@/require/deviceManage";
import mixins from "@/mixins";
import { checkNumber, checkEmpty } from "@/utils/ele";
// const MAX_EXPORT_COUNT = 2000;
// const tableTitle = {
//     //导出配置
//     code: "设备号",
//     remark: "设备名",
//     name: "归属小区",
//     username: "所属人",
//     expiration_time: "到期日期",
//     createTime: "创建时间",
//     phone_num: "电话",
//     imei: "IMEI",
//     ccid: "CCID",
//     hardversion: "硬件版本号",
//     softversionnum: "软件版本号",
//     hardversionnum: "模块版本",
// };
export default {
    mixins: [mixins],
    // components: {
    //     QRCode,
    //     QRCodeForPort
    // },
    data() {
        var checkCode = (rule, value, callback) => {
            selectDeviceExist({ code: value }).then(res => {
                if (res.code === 0) {
                    if (res.data) {
                        callback(new Error("设备号重复"));
                    } else {
                        callback();
                    }
                }
            });
        };
        return {
            getTable,
            insertRow,
            updateRow,
            deleteRow,
            // modifyHversonForm: {}, //修改硬件版本号的容器
            // pickerOptions: dateTimeJS,
            // alertDeviceCode: 0, //设备二维码的设备号
            // dialogQRCodePortVisible: false, //端口号二维码是否显示
            // selectPortCodeObj: {
            //     code: 0,
            //     portNum: 10,
            // }, //选择查看设备端口二维码的设备号
            // modifyHversonVisable: false,
            dialogVisible: false,
            form: {},
            rules: {
                code: [
                    { required: true, validator: checkNumber, trigger: "blur" },
                    { validator: checkCode, trigger: "blur" },
                ],
                dcModeltype: { required: true, validator: checkNumber, trigger: "blur" },
                dcModelnum: { required: true, validator: checkNumber, trigger: "blur" },
                dcModelpower: { required: true, validator: checkNumber, trigger: "blur" },
                lon: { required: true, validator: checkNumber, trigger: "blur" },
                lat: { required: true, validator: checkNumber, trigger: "blur" },
                areaName: { required: true, validator: checkEmpty, trigger: "blur" },
            },
            options: [],
        };
    },
    methods: {
        handleShowDialog(row = {}) {
            this.dialogVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
            this.form = { ...row };
            this.currentRow = row;
            // 为下拉框添加选项
            if (!this.options.length) {
                selectAllArea().then(res => {
                    if (res.code === 0) {
                        this.options = res.data;
                    }
                });
            }
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleSubmit() {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    let lon, lat;
                    // 服务器仅支持通过aid修改站点😶
                    this.options.map(item => {
                        if (item.name == this.form.areaName) {
                            this.form.aid = item.id;
                            lon = item.lon;
                            lat = item.lat;
                        }
                    });
                    if (this.currentRow.code) {
                        // if (this.form.aid != this.currentRow.aid) {
                        //     // 选择站点发生改变,重新自动关联经纬度
                        //     this.form.lon = lon;
                        //     this.form.lat = lat;
                        // }
                        this.asyUpdateRow({ data: this.form, reload: true });
                    } else {
                        this.form.lon = lon;
                        this.form.lat = lat;
                        this.asyInsertRow(this.form);
                    }
                    this.dialogVisible = false;
                }
            });
        },
        // handleCreateQrCode(code) {
        //     //生成二维码
        //     this.alertDeviceCode = code;
        //     this.dialogVisible = true;
        // },
        // handleScanPortQrcode({ code, hardversion }) {
        //     //查看端口二维码
        //     const hvToRort = {
        //         /* key:对应端口数量，val[]:对应硬件版本号 */ 1: ["07"],
        //         2: ["02", "09"],
        //         10: ["00", "01", "08"],
        //         16: ["05"],
        //         20: ["06", "10"],
        //     };
        //     const keyArr = Object.keys(hvToRort);
        //     const valArr = Object.values(hvToRort);
        //     let portNum = 10;
        //     valArr.forEach((item, i) => {
        //         if (item.includes(hardversion)) {
        //             portNum = parseInt(keyArr[i]);
        //         }
        //     });
        //     this.selectPortCodeObj = { code, portNum };
        //     this.dialogQRCodePortVisible = true;
        // },
    },
};
</script>
