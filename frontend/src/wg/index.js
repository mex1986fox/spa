import Vue from "vue/dist/vue.js";

import WgFormRegistration from "./wg-forms/registration/wg-form-registration.vue";
Vue.component("wg-form-registration", WgFormRegistration);


import WgCaptcha from "./wg-captcha/wg-captcha.vue";
Vue.component("wg-captcha", WgCaptcha);
import WgMultipleLocation from "./wg-multiple-location/wg-multiple-location.vue";
Vue.component("wg-multiple-location", WgMultipleLocation);

import WgCardUser from "./wg-cards/wg-card-user.vue";
Vue.component("wg-card-user", WgCardUser);

import WgFilter from "./wg-filters/wg-filter.vue";
Vue.component("wg-filter", WgFilter);
