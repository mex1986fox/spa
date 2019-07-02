<template>
  <div class="wg-select-catalog">
    <ui-ef-select class="ui-ef-select_white" :caption="dCaption" name="catalog_id"/>
    <div
      class="ui-button ui-button_float_white ui-button_circle_s1 ui-button_noborder wg-select-catalog__button"
      @click="showFormList=true"
    >
      <i class="fas fa-list"></i>
      <ui-helper message="Создайте каталог товаров и услуг" :show="this.catalog==undefined"></ui-helper>
    </div>

    <!-- форма редактирования каталога -->
    <wg-form-list
      :show="showFormList"
      @onHide="isHideFormList"
      header="Каталог товаров и услуг"
      fon="http://userphoto.ru:8085//public/photos/12/mini/5d105aca4d50e.jpg"
      position="fixed"
    >
      <template slot="form">
        <div class="row">
          <div class="col_8">
            <ui-ef-text
              class="ui-ef-text_white"
              name="title"
              caption="Категория (название товара или услуги) *"
            ></ui-ef-text>
          </div>
        </div>
        <div class="row">
          <div class="col_10">
            <ui-ef-textarea
              class="ui-ef-textarea_white"
              name="description"
              caption="Описание категории *"
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
                src="http://adsphoto.ru:8090//public/photos/12/42/mini/5cf8e0a161f84.jpg"
                alt="/public/img/drovito.png"
              />
            </div>
          </div>
          <div class="col_4">Лада Калина спорт</div>
        </div>
      </template>
    </wg-form-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dCaption: this.caption,
      dCatalog: this.catalog,
      showFormList: false
    };
  },
  props: {
    caption: {
      default: "Категория *",
      type: String
    },
    catalog: {
      type: Array,
      default: undefined
    }
  },
  watch: {
    catalog(newQ) {
      this.dCatalog = newQ;
    },
    caption(newQ) {
      this.dCaption = newQ;
    }
  },
  methods: {
    isHideFormList() {
      this.showFormList = false;
    }
  }
};
</script>
