<template>
  <ui-window
    class="wg-form-update-catalogs"
    :show="show"
    header="Магазин запчастей"
    @onHide="isHide"
    position="fixed"
    :delayHide="0"
  >
    <ui-window-card animate="opacity" :show="show" :delayShow="0">
      <div class="ui-window-card__header">Каталоги</div>
      <div class="ui-window-card__ef">
        <div class="wg-form-update-catalogs__content">
          <div class="row" v-for="key in 20" :key="key">
            <div class="col_1">
              <div class="wg-form-update-catalogs__coll">25/10/1999 21:15</div>
            </div>
            <div class="col_2">
              <div class="wg-form-update-catalogs__coll">
                <ui-img
                  class="wg-card-post__img"
                  src="http://userphoto.ru:8085//public/photos/12/mini/5d105aca4d50e.jpg"
                  :alt="'/public/img/drovito.png'"
                  :nofon="false"
                />
              </div>
            </div>
            <div class="col_5">
              <div class="wg-form-update-catalogs__coll">
                Mazda Capella Sentafara
                Анжеро-Судженск (Кемеровская область)
              </div>
            </div>
            <div class="col_2">
              <div class="wg-form-update-catalogs__coll">2 222 222 руб.</div>
            </div>
            <div class="col_2">
              <div class="wg-form-update-catalogs__coll">
                <div class="wg-form-update-catalogs__buttons">
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </div>
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
                  >
                    <i class="fas fa-camera"></i>
                  </div>
                  <div
                    class="ui-button ui-button_float_black ui-button_noborder ui-button_right ui-button_circle_s1"
                  >
                    <i class="far fa-trash-alt"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-window-card__buttons">
        <input type="button" class="ui-button ui-button_float_black" value="Создать каталог">
      </div>
    </ui-window-card>
  </ui-window>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    }
  }
};
</script>
