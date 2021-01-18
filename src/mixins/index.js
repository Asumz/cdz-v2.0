// mixins 中的方法和属性会合并到.vue中，mixins中的created会优先执行，后执行.vue中的created
export default {
    data() {
        return {
            queryForm: {}, // 查询表单
            totalPage: 0, // 共0条数据 ( total )
            nowPage: 1, // 当前页码( pageNum )
            pageSize: 10, // 页码大小( pageSize )
            loading: false, // 表格加载动画
            tableData: [], // 表格数据
            currentRow: {}, // 当前编辑行
        };
    },
    computed: {
        queryConditions() {
            let p = this.conditions || this.queryForm;
            let page = { pageNum: this.nowPage, pageSize: this.pageSize };
            return { ...p, ...page };
        },
    },
    created() {
        if (typeof this.getTable === "function") this.asyGetTable(this.queryConditions);
    },
    methods: {
        //分页发改变时，触发回调
        getPage(page) {
            this.nowPage = page;
            this.asyGetTable(this.queryConditions);
        },
        //点击搜索查询
        handleSearch() {
            this.nowPage = 1;
            this.asyGetTable(this.queryConditions);
        },
        // query
        async asyGetTable(data) {
            try {
                this.loading = true;
                let res = await this.getTable(data);
                this.loading = false;
                if (res.code === 0) {
                    // 某些data为bool值
                    if (res.data != null) this.asyGetTableInner(res.data);
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                if (error == "拦截请求") {
                    this.loading = true;
                } else {
                    this.loading = false;
                }
                throw error;
            }
        },
        // 查询成功默认操作
        asyGetTableInner(data) {
            this.tableData = data.records;
            this.totalPage = data.total;
        },
        // delete
        async asyDeleteRow({ index, id, by = "id", list = this.tableData } = {}) {
            try {
                alertConfim("确认删除吗?", () => {
                    this.deleteRow({ [by]: id }).then(res => {
                        if (res.code === 0) {
                            list.splice(index, 1);
                            this.totalPage--;
                            // 补行
                            // this.asyGetTable(this.queryConditions);
                            messageTip("success", res.tip);
                        } else {
                            messageTip("error", res.tip);
                        }
                    });
                });
            } catch (error) {
                throw error;
            }
        },
        // create
        async asyInsertRow(data) {
            try {
                let res = await this.insertRow(data);
                if (res.code === 0) {
                    this.asyGetTable(this.queryConditions);
                    messageTip("success", res.tip);
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
        // update
        async asyUpdateRow({ data, row = this.currentRow, reload = false } = {}) {
            try {
                let res = await this.updateRow(data);
                if (res.code === 0) {
                    if (reload) {
                        this.asyGetTable(this.queryConditions);
                    } else {
                        // 此处可拓展 select 单行查询语句条件分支
                        Object.keys(data).map(key => {
                            this.$set(row, key, data[key]);
                        });
                    }
                    messageTip("success", res.tip);
                } else {
                    messageTip("error", res.tip);
                }
            } catch (error) {
                throw error;
            }
        },
    },
};
