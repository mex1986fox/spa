import Vue from "vue/dist/vue.js";

import WgFormRegistration from "./wg-forms/registration/wg-form-registration.vue";
Vue.component("wg-form-registration", WgFormRegistration);


import WgCaptcha from "./wg-captcha/wg-captcha.vue";
Vue.component("wg-captcha", WgCaptcha);
import WgSelectLocation from "./wg-select-location/wg-select-location.vue";
Vue.component("wg-select-location", WgSelectLocation);
import WgMultiLocation from "./wg-multi-location/wg-multi-location.vue";
Vue.component("wg-multi-location", WgMultiLocation);

import WgCardUser from "./wg-cards/wg-card-user.vue";
Vue.component("wg-card-user", WgCardUser);

import WgFilter from "./wg-filters/wg-filter.vue";
Vue.component("wg-filter", WgFilter);
import WgFilterUsers from "./wg-filters/wg-filter-users.vue";
Vue.component("wg-filter-users", WgFilterUsers);

