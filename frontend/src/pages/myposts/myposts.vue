<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Мои посты</div>
        <div class="lt-main-menu__buttons">
          <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3">
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
      <wg-table-mypost v-if="showTableMypost"/>
      <!-- </div> -->

      <!-- <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2" @click="isAddPosts">Показать еще ...</div>
      </div>-->
      <wg-form-creat-post
        :key="keyRand()"
        :show="showFormCreatPost"
        @onHide="showFormCreatPost=false"
      />
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
      showFormCreatPost: false,
      showTableMypost: false
    };
  },
  watch: {
    profileID(newQ) {
      if (newQ != undefined) {
        this.showTableMypost = true;
      }
    }
  },
  computed: {
    ...mapGetters({
      profileID: "profile/getID"
    })
  },
  mounted() {
    if (this.profileID != undefined) {
      this.showTableMypost = true;
    }
  },
  methods: {
    keyRand() {
      return Math.floor(Math.random() * (1 - 999999)) + 1;
    },
    isShowFormCreatPost() {
      this.showFormCreatPost = true;
    }
  }
};
</script>