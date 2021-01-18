import Vue from "vue";
import {
    Button,
    Checkbox,
    Col,
    Row,
    Progress,
    MessageBox,
    Message,
    Notification,
    Card,
    Table,
    Input,
    InputNumber,
    TableColumn,
    Form,
    FormItem,
    Select,
    Option,
    OptionGroup,
    DatePicker,
    TimeSelect,
    TimePicker,
    Link,
    Dialog,
    Tag,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    TabPane,
    Tabs,
    Pagination,
    Radio,
    RadioGroup,
    RadioButton,
    Cascader,
    Switch,
    Loading,
    Breadcrumb,
    BreadcrumbItem,
    Popover,
    Steps,
    Step,
    Upload,
    Divider,
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'; // +
import "element-ui/lib/theme-chalk/display.css";

// fade/zoom 等
// import "element-ui/lib/theme-chalk/base.css"; // +
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(Button)
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Col);
Vue.use(Row);
Vue.use(Progress);
Vue.use(Tag);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Link);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Cascader);
Vue.use(Switch);
Vue.use(Loading);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Popover);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Upload);
Vue.use(Divider);

// Vue.prototype.$loading = Loading.service; // +
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
