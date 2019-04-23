<template>
  <div class="wg-card-post">
    <!-- <div class="wg-card-post__button-close">
          <div class="ui-button ui-button_float_white ui-button_circle_s1">
            <i class="fas fa-times"></i>
          </div>
    </div>-->
    <div class="wg-card-post__photo">
      <img
        class="wg-card-post__img"
        src="https://lh3.googleusercontent.com/-ws-0Jr9LVRg/VpL2DTul1aI/AAAAAAAAAVY/cfMovPqQZgc/w1602-h1044/%25D0%25BA.jpg"
      >
    </div>
    <div class="wg-card-post__button-menu">
      <div class="ui-button ui-button_float_black ui-button_noborder ui-button_circle_s1">
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
    <span class="wg-card-post__title">{{post.title!=null?post.title:""}}</span>
    <span class="wg-card-post__description">{{post.description!=null?post.description:''}}</span>
  </div>
</template>
<script>
export default {
  name: "wg-card-post",
  data() {
    return {};
  },
  props: {
    post: {
      type: Object,
      default: {}
    }
  }
};
</script>
