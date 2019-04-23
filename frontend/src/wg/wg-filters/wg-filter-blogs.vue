<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр пользователей</template>
    <template slot="content">
      <form ref="formFilterUsers">
        <ui-ef-select
          class="ui-ef-select_white"
          name="sort_id"
          caption="Сортировать по"
          cleaner
          :menu="sortMenu"
        />
        <ui-ef-text
          :value="filterUsers.login"
          name="login"
          caption="Логин"
          class="ui-ef-text_white"
        ></ui-ef-text>
        <ui-ef-text :value="filterUsers.name" name="name" caption="Имя" class="ui-ef-text_white"></ui-ef-text>
        <ui-ef-text
          :value="filterUsers.surname"
          name="surname"
          caption="Фамилия"
          class="ui-ef-text_white"
        ></ui-ef-text>
        <wg-multi-location
          :countries_id="countries_id"
          :subjects_id="subjects_id"
          :cities_id="cities_id"
          caption="Места проживания"
          class="wg-multi-location_white"
        />
      </form>
    </template>
    <template slot="buttons">
      <input
        class="ui-button ui-button_float_white"
        type="button"
        value="Применить"
        @click="isShowUsers"
      >
      <!-- <input class="ui-button ui-button_float_white" type="button" value="Отмена" @click="isHide"> -->
    </template>
  </wg-filter>
</template>
<script>
export default {
  data() {
    return {
      filterUsers: {},
      countries_id: [],
      subjects_id: [],
      cities_id: [],
      sortMenu: [
        { value: 8, option: "по логину", selected: false },
        { value: 4, option: "по имени", selected: false },
        { value: 6, option: "по фамилии", selected: false }
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
      if (newQ == true) {
        let fUsers = JSON.parse(this.$cookie.get("filter_users"));
        if (fUsers != null) {
          this.filterUsers = fUsers;
          this.countries_id = this.filterUsers["countries_id[]"]
            ? this.filterUsers["countries_id[]"].split(",")
            : [];
          this.subjects_id = this.filterUsers["subjects_id[]"]
            ? this.filterUsers["subjects_id[]"].split(",")
            : [];
          this.cities_id = this.filterUsers["cities_id[]"]
            ? this.filterUsers["cities_id[]"].split(",")
            : [];
          if (this.filterUsers["sort_id"] != undefined) {
            this.sortMenu = this.sortMenu.map(val => {
              val.selected = false;
              if (val.value == this.filterUsers["sort_id"]) {
                val.selected = true;
              }
              return val;
            });
          }
        }
      }
    }
  },
  methods: {
    isHide() {
      this.$emit("onHide");
    },
    isShowUsers() {
      let form = this.$refs.formFilterUsers;
      let body = new FormData(form);
      //добавляем фильтр в куки
      let cookieFilterUsers = {};
      for (var key of body.keys()) {
        cookieFilterUsers[key] = body.get(key);
      }
      // console.dir(cookieFilterUsers);
      this.$cookie.set("filter_users", JSON.stringify(cookieFilterUsers));
      // console.dir(this.$cookie.get("filter_users"));
      //отправляем запрос
      this.$http.post(this.$hosts.services + "/api/user/show", body).then(
        response => {
          if (response.body.status == "ok") {
            this.$store.commit("users/updateUsers", response.body.data);
          }
        },
        error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        }
      );
    }
  }
};
</script>