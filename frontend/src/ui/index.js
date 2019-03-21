import Vue from "vue/dist/vue.js";

import UiAnimateDisplay from "./ui-animations/ui-animation-display.vue";
Vue.component("ui-animation-display", UiAnimateDisplay);

import UiButtonFile from "./ui-button/ui-button-file.vue";
Vue.component("ui-button-file", UiButtonFile);

//элементы формы
import UiEfText from "./ui-element-form/ui-ef-text.vue";
Vue.component("ui-ef-text", UiEfText);
import UiEfPhone from "./ui-element-form/ui-ef-phone.vue";
Vue.component("ui-ef-phone", UiEfPhone);
import UiEfPassword from "./ui-element-form/ui-ef-password.vue";
Vue.component("ui-ef-password", UiEfPassword);
