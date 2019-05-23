import Vue from "vue/dist/vue.js";

import WgFormRegistration from "./wg-forms/registration/wg-form-registration.vue";
Vue.component("wg-form-registration", WgFormRegistration);
import WgFormLogin from "./wg-forms/login/wg-form-login.vue";
Vue.component("wg-form-login", WgFormLogin);
import WgFormCreatPost from "./wg-forms/creatPost/wg-form-creat-post.vue";
Vue.component("wg-form-creat-post", WgFormCreatPost);
import WgFormUpdateProfile from "./wg-forms/updateProfile/wg-form-update-profile.vue";
Vue.component("wg-form-update-profile", WgFormUpdateProfile);
import WgFormUpdatePost from "./wg-forms/updatePost/wg-form-update-post.vue";
Vue.component("wg-form-update-post", WgFormUpdatePost);


import WgCaptcha from "./wg-captcha/wg-captcha.vue";
Vue.component("wg-captcha", WgCaptcha);
import WgSelectLocation from "./wg-select-location/wg-select-location.vue";
Vue.component("wg-select-location", WgSelectLocation);
import WgMultiLocation from "./wg-multi-location/wg-multi-location.vue";
Vue.component("wg-multi-location", WgMultiLocation);
import WgSelectTransport from "./wg-select-transport/wg-select-transport.vue";
Vue.component("wg-select-transport", WgSelectTransport);
import WgMultiTransport from "./wg-multi-transport/wg-multi-transport.vue";
Vue.component("wg-multi-transport", WgMultiTransport);

import WgCardUser from "./wg-cards/wg-card-user.vue";
Vue.component("wg-card-user", WgCardUser);
import WgCardPost from "./wg-cards/wg-card-post.vue";
Vue.component("wg-card-post", WgCardPost);

import WgFilter from "./wg-filters/wg-filter.vue";
Vue.component("wg-filter", WgFilter);
import WgFilterUsers from "./wg-filters/wg-filter-users.vue";
Vue.component("wg-filter-users", WgFilterUsers);
import WgFilterPost from "./wg-filters/wg-filter-post.vue";
Vue.component("wg-filter-post", WgFilterPost);

import WgSlider from "./wg-slider/wg-slider.vue";
Vue.component("wg-slider", WgSlider);
import WgSliderNavig from "./wg-slider/wg-slider-navig.vue";
Vue.component("wg-slider-navig", WgSliderNavig);
import WgSliderZoom from "./wg-slider/wg-slider-zoom.vue";
Vue.component("wg-slider-zoom", WgSliderZoom);
import WgLikesPost from "./wg-likes/wg-likes-post.vue";
Vue.component("wg-likes-post", WgLikesPost);