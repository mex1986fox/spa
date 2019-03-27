<template>
  <form ref="formUpdateUser">

      <div class="wg-form-registration__card-header">Укажите дополнительную информацию о себе</div>
      <div class="wg-form-registration__card-ef">
        <ui-ef-text caption="Имя"></ui-ef-text>
        <ui-ef-text caption="Фамилия"></ui-ef-text>
        <ui-ef-datepicker name="neweare" caption="День рождения" value></ui-ef-datepicker>
        <ui-ef-phone caption="Номер телефона"></ui-ef-phone>
        <wg-multiple-location/>
      </div>
      <div class="wg-form-registration__card-buttons">
        <div class="ui-button ui-button_float_black">Отправить</div>
        <div class="ui-button ui-button_float_black">Отменить</div>
      </div>

  </form>
</template>
