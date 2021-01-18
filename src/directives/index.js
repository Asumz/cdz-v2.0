export const fmtText = {
    bind(el, binding) {
        let content = el.innerHTML;
        (content == null || content == "") && (el.innerHTML = "— —");
    },
};

const directives = {
    fmtText,
};

Object.keys(directives).map(key => {
    Vue.directive(key, directives[key]);
});
