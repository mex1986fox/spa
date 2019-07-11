<template>
  <wg-form-list
    :show="dShow"
    @onHide="isHide"
    :header="'Товары и услуги \r\n&quot;'+dShop.title+'&quot;'"
    position="fixed"
    :fon="dShop.main_photo"
  >
    <template slot="form">
      <div class="row">
        <div class="col_7">
          <wg-select-catalog caption="Категории товаров *"/>
        </div>
      </div>
      <div class="row">
        <div class="col_7">
          <wg-select-transport
            class="ui-ef-select_white"
            caption="Модель автомобиля *"
            name="model_id"
          />
        </div>
      </div>
      <div class="row">
        <div class="col_8">
          <ui-ef-text class="ui-ef-text_white" name="title" caption="Название товара *"></ui-ef-text>
        </div>
      </div>
      <div class="row">
        <div class="col_10">
          <ui-ef-textarea
            class="ui-ef-textarea_white"
            name="description"
            caption="Описание товара *"
            :autoresize="200"
          ></ui-ef-textarea>
        </div>
      </div>
    </template>
    <template slot="button">
      <div class="ui-button ui-button_orange ui-button_circle_s2">
        <i class="fas fa-plus"></i>
      </div>
    </template>
    <template slot="content">
      <div v-for="kei in 10" :key="kei" class="row">
        <div class="col_2">21/10/1986 20:47</div>
        <div class="col_4">
          <div class="wg-table-mypost__td_img">
            <ui-img
              class="wg-table-mypost__img"
              src="http://shopsphoto.ru:8092/public/photos/1/40/mini/5d26c4b124b95.jpg"
              alt="/public/img/drovito.png"
            />
          </div>
        </div>
        <div class="col_4">Лада Калина спорт</div>
      </div>
    </template>
  </wg-form-list>
</template>
<script>
export default {
  data() {
    return {
      dShow: this.show,
      dShop: this.shop
    };
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    }
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    shop: {
      default: undefined,
      type: Object
    }
  },
  watch: {
    show(newQ) {
      this.dShow = newQ;
    },
    shop(newQ) {
      this.dShop = newQ;
    }
  }
};
</script>
