<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Мои посты</div>
        <div class="lt-main-menu__buttons">
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isShowFormExcel"
          >
            <i class="far fa-file-excel"></i>
          </div>
          <div
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
            @click="isShowFormCreatPost"
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </lt-main-menu>
      <!-- <div class="lt-main__cards"> -->
      <wg-card-mypost/>
      <!-- </div> -->

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddPosts">Показать еще ...</div>
      </div>-->
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-myposts",
  data() {
    return {
      showFormExcel: false,
      showNewPost: false
    };
  },
  computed: {
    // ...mapGetters({
    //   myposts: "myposts/getPosts"
    // })
  }
};
</script>