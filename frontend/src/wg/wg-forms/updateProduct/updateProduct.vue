<template>
          <wg-form-list
        :show="showFormList"
        @onHide="isHideFormList"
        header="Список товаров"
        fon="http://itd0.mycdn.me/image?id=860385467706&t=20&plc=WEB&tkn=*dVZIal-hv0E6FNnVyeX7Qyk1pH0"
      >
        <template slot="form">
          <div class="row">
            <div class="col_7">
              <wg-select-catalog caption="Категория *"/>
            </div>
          </div>
          <div class="row">
            <div class="col_7">
              <wg-select-location
                class="ui-ef-select_white"
                caption="Город размещения *"
                name="city_id"
              />
              <wg-select-transport
                class="ui-ef-select_white"
                caption="Модель автомобиля *"
                name="model_id"
              />
            </div>
          </div>
          <div class="row">
            <div class="col_8">
              <ui-ef-text class="ui-ef-text_white" name="title" caption="Заголовок *"></ui-ef-text>
            </div>
          </div>
          <div class="row">
            <div class="col_10">
              <ui-ef-textarea
                class="ui-ef-textarea_white"
                name="description"
                caption="Описание *"
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
</template>
<script>
export default {
    
}
</script>
