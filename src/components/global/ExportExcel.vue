<template>
    <div class="exportExcel">
        <div
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
        >
            <el-button @click="exportExcel" type="primary" icon="el-icon-download">
                导出
            </el-button>
        </div>
    </div>
</template>

<script>
import Excel from "@/utils/excel";
export default {
    name: "ExportExcel",
    props: {
        fmtExcel: {
            requied: true,
            type: Object,
        },
        conditions: {
            requied: true,
            type: Object,
        },
        totalPage: {
            requied: true,
            type: Number,
        },
        getTable: {
            requied: true,
            type: Function,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        exportExcel() {
            // 当导出条数大于10000之后就不请求
            if (this.totalPage > 10000)
                return messageTip(
                    "warning",
                    `当前条数为 ${this.totalPage}条，超过最大导出条数（10000条），请缩短查询时间`
                );

            this.loading = true;

            this.getTable({ ...this.conditions, pageNum: 1, pageSize: 10000 })
                .then(res => {
                    // startTime = startTime
                    //     ? moment(startTime).format("YYYYMMDDHHmmss")
                    //     : moment(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).format(
                    //           "YYYYMMDDHHmmss"
                    //       );
                    // endTime = endTime
                    //     ? moment(endTime).format("YYYYMMDDHHmmss")
                    //     : moment(new Date()).format("YYYYMMDDHHmmss");
                    if (res.code === 0 && res.data) {
                        const list = res.data.records;
                        Excel({
                            list,
                            ...this.fmtExcel,
                            // filename: `充电记录${startTime}-${endTime}`,
                        });
                    }
                    // else if (res.code == 201) {
                    //     messageTip("warning", res.tip || "导出数量超过最大限制");
                    // }
                    else {
                        messageTip("error", res.tip);
                    }
                })
                .catch(err => {
                    messageTip("error", "导出失败，请稍后重试");
                    throw err;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="less" scoped></style>
