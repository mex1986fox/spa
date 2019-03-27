<template>
  <ui-blind :show="dShow">
    <div class="wg-form-registration">
      <ui-animation-display v-if="dShowAnimation==true" :animate="'margin-right'">
        <div class="wg-form-registration__container">
          <div class="wg-form-registration__menu">
            <div class="wg-form-registration__menu-header">{{dHeader}}</div>
            <div class="wg-form-registration__menu-buttons">
              <div @click="isHide()" class="ui-button ui-button_float_white ui-button_circle_s2">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>

          <ui-animation-display v-if="show2==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <div class="wg-form-registration__card-header">Загрузите фотографии</div>
              <div class="wg-form-registration__card-files">
                <div
                  class="wg-form-registration__card-file"
                  v-for="(file, key) in changeFiles"
                  :key="key"
                >
                  <i class="far fa-file-image wg-form-registration__card-file-icon"></i>
                  {{file.option}}
                </div>
              </div>

              <div class="wg-form-registration__card-buttons">
                <div
                  v-if="changeFiles.length!=0"
                  class="ui-button ui-button_float_black"
                  @click="show2=true"
                >Отправить</div>
                <div
                  v-if="changeFiles.length!=0"
                  @click="clearFiles=true"
                  class="ui-button ui-button_float_black"
                >Отменить</div>
                <ui-button-file
                  v-show="changeFiles.length==0"
                  class="ui-button_circle_s3 ui-button_float_black"
                  @onChange="isChangeFiles"
                  :clear="clearFiles"
                  @onClear="clearFiles=false"
                ></ui-button-file>
              </div>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardNotMain==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-registration-card-notmain></wg-form-registration-card-notmain>
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardMain==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-registration-card-main @onUserCreated="isShowCardNotMain"></wg-form-registration-card-main>
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
  </ui-blind>
</template>

<script>
import WgFormRegistrationCardMain from "./card-main.vue";
import WgFormRegistrationCardNotmain from "./card-notmain.vue";
export default {
  option: "wg-form-registration",
  components: { WgFormRegistrationCardMain, WgFormRegistrationCardNotmain },
  data() {
    return {
      dHeader: "Пройдите регистрацию заполняя формы",
      dShow: this.show,
      dShowAnimation: false,
      showCardMain: true,
      showCardNotMain: true,
      show2: false,
      clientHeigthContainer: undefined,
      changeFiles: [],
      clearFiles: false,
      menuYear: [
        {
          group: "группа",
          value: 1,
          option: "дате (новые)",
          disabled: true,
          selected: true
        },
        { group: "группа", value: 2, option: "дате (старые)", selected: true },
        { group: "группа", value: 3, option: "цене (дорогие)" },
        { group: "группа", value: 4, option: "цене (дешевые)" },
        { group: "группа", value: 5, option: "году (новые)" },
        { group: "группа", value: 6, option: "году (старые)" },
        { group: "группа", value: 7, option: "пробегу (маленький)" },
        { group: "группа", value: 8, option: "пробегу (большой)" },
        { group: "группа", value: 9, option: "объему (маленький)" },
        { group: "группа", value: 10, option: "объему (большой)" }
      ]
    };
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
      if (newQ == true) {
        setTimeout(() => {
          let scrollTop = this.$el.parentNode.scrollTop;
          this.$el.style.marginTop = scrollTop + "px";
          this.dShowAnimation = true;
        }, 4);
      }
    }
  },
  methods: {
    isHide() {
      this.dShowAnimation = false;
      setTimeout(() => {
        this.$emit("onHide");
      }, 300);
    },
    isChangeFiles(files) {
      this.changeFiles = files;
    },
    isShowCardNotMain() {
      this.showCardMain = false;
      setTimeout(() => {
        this.showCardNotMain = true;
      }, 600);
    }
  },
  mounted() {
    if (this.dShow == true) {
      setTimeout(() => {
        let scrollTop = this.$el.parentNode.scrollTop;
        this.$el.style.marginTop = scrollTop + "px";
        this.dShowAnimation = true;
      }, 4);
    }
  }
};
</script>