<template>
  <ui-blind :show="dShow">
    <div class="wg-form-registration" v-if="dShow && token!=undefined">
      <ui-animation-display v-if="dShowAnimation==true" :animate="'margin-right'">
        <div class="wg-form-registration__container">
          <div class="wg-form-registration__menu">
            <div class="wg-form-registration__menu-header">{{dHeshoper}}</div>
            <div class="wg-form-registration__menu-buttons">
              <div
                @click="isHide"
                class="ui-button ui-button_float_white ui-button_circle_s2"
              >
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
          <ui-animation-display v-if="showCardPhoto==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-update-photos-entity
                apiPhotoServer="shopsphoto"
                apiEntityServer="shops"
                entityID="shop_id"
                :entity="dShop"
                @onHide="isHide"
                @onUpdateEntity="isUpdateShop"
              />
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCard==true" :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-shop-card-main @onCreatedShop="isShowCardPhoto"/>
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
    <ui-snackbar :show="dShow && token==undefined" type="err" :time="5000" @onHide="isHideSnackbar">
      <b>Добавить магазин могут только авторизованные пользователи.</b>
      <p>Авторизуйтесь или зарегистрируйтесь.</p>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="isHideSnackbar"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
  </ui-blind>
</template>

<script src="./wg-form-create-shop.js"></script>
