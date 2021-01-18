/**
 * 这个是配置时间选项卡的时间
 * */
export default {
    shortcuts: [
        {
            text: "今天",
            onClick(picker) {
                picker.$emit("pick", new Date());
            },
        },
        {
            text: "昨天",
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
            },
        },
        {
            text: "一周前",
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
            },
        },
        {
            text: "一月前",
            onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", date);
            },
        },
    ],
};

export const pickerOptions = {
    shortcuts: [
        {
            text: "最近一天",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "最近三天",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "最近一周",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
            },
        },
        {
            text: "最近一个月",
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
            },
        },
    ],
};
