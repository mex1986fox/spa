<template>
  <ui-blind :show="dShow">
    <div class="wg-form-registration"
         v-if="dShow && token!=undefined">
      <ui-animation-display v-if="dShowAnimation==true"
                            :animate="'margin-right'">
        <div class="wg-form-registration__container">
          <div class="wg-form-registration__menu">
            <div class="wg-form-registration__menu-header">{{dHeader}}</div>
            <div class="wg-form-registration__menu-buttons">
              <div @click="isHide()"
                   class="ui-button ui-button_float_white ui-button_circle_s2">
                <i class="fas fa-times"></i>
              </div>
            </div>
          </div>
          <ui-animation-display v-if="showCardPhoto==true"
                                :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-ad-card-photo :ad="dAd"
                                           @onHide="isHide" />
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCardNotMain==true"
                                :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-ad-card-notmain :ad="dAd"
                                             @onAdUpdated="isShowCardPhoto" />
            </div>
          </ui-animation-display>
          <ui-animation-display v-if="showCard==true"
                                :animate="'right'">
            <div class="wg-form-registration__card">
              <wg-form-creat-ad-card-main @onCreatedAd="isShowCardNotMain" />
            </div>
          </ui-animation-display>
        </div>
      </ui-animation-display>
    </div>
    <ui-snackbar :show="dShow && token==undefined"
                 type="err"
                 :time="5000"
                 @onHide="isHide">
      <b>Добавить объявление могут только авторизованные пользователи.</b>
      <p>Авторизуйтесь или зарегистрируйтесь.</p>
      <div class="ui-snackbar__buttons">
        <input type="button"
               class="ui-button ui-button_float_black ui-button_s1"
               @click="isHide"
               value="Закрыть">
      </div>
    </ui-snackbar>
  </ui-blind>
</template>

<script src="./wg-form-create-ad.js"></script>
