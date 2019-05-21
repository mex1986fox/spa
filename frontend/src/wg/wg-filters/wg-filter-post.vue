<template>
  <wg-filter :show="show" @onHide="isHide">
    <template slot="header">Фильтр постов</template>
    <template slot="content">
      <form ref="formFilterPosts">
        <ui-ef-select
          class="ui-ef-select_white"
          name="sort_id"
          caption="Сортировать по"
          cleaner
          :menu="sortMenu"
        />
        <ui-ef-text
          :value="filterPosts.title"
          name="title"
          caption="Заголовок"
          class="ui-ef-text_white"
        ></ui-ef-text>
        <wg-multi-location
          :countries_id="countries_id"
          :subjects_id="subjects_id"
          :cities_id="cities_id"
          caption="Места проживания"
          class="wg-multi-location_white"
        />
        <wg-multi-transport
          :types_id="types_id"
          :brands_id="brands_id"
          :models_id="models_id"
          caption="Марки, модели"
          class="wg-multi-location_white"
        />
      </form>
    </template>
    <template slot="buttons">
      <input
        class="ui-button ui-button_float_white"
        type="button"
        value="Применить"
        @click="isShowPosts"
      >
      <!-- <input class="ui-button ui-button_float_white" type="button" value="Отмена" @click="isHide"> -->
    </template>
  </wg-filter>
</template>
<script>
export default {
  data() {
    return {
      filterPosts: {},
      countries_id: [],
      subjects_id: [],
      cities_id: [],
      types_id: [],
      brands_id: [],
      models_id: [],
      sortMenu: [
        { value: 1, option: "дате (новые)", selected: false },
        { value: 2, option: "дате (старые)", selected: false },
        { value: 3, option: "городам (а-я)", selected: false },
        { value: 4, option: "городам (я-а)", selected: false },
        { value: 5, option: "моделям (а-я)", selected: false },
        { value: 6, option: "моделям (я-а)", selected: false }
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
        let fUsers = JSON.parse(this.$cookie.get("filter_posts"));
        if (fUsers != null) {
          this.filterPosts = fUsers;
          this.countries_id = this.filterPosts["countries_id[]"]
            ? this.filterPosts["countries_id[]"].split(",")
            : [];
          this.subjects_id = this.filterPosts["subjects_id[]"]
            ? this.filterPosts["subjects_id[]"].split(",")
            : [];
          this.cities_id = this.filterPosts["cities_id[]"]
            ? this.filterPosts["cities_id[]"].split(",")
            : [];
          this.types_id = this.filterPosts["types_id[]"]
            ? this.filterPosts["types_id[]"].split(",")
            : [];
          this.brands_id = this.filterPosts["brands_id[]"]
            ? this.filterPosts["brands_id[]"].split(",")
            : [];
          this.models_id = this.filterPosts["models_id[]"]
            ? this.filterPosts["models_id[]"].split(",")
            : [];
          if (this.filterPosts["sort_id"] != undefined) {
            this.sortMenu = this.sortMenu.map(val => {
              val.selected = false;
              if (val.value == this.filterPosts["sort_id"]) {
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
    isShowPosts() {
      let form = this.$refs.formFilterPosts;
      let body = new FormData(form);
      //добавляем фильтр в куки
      let cookieFilterPosts = {};
      for (var key of body.keys()) {
        cookieFilterPosts[key] = body.get(key);
      }
      // console.dir(cookieFilterPosts);
      this.$cookie.set("filter_posts", JSON.stringify(cookieFilterPosts));
      // console.dir(this.$cookie.get("filter_posts"));
      //отправляем запрос
      this.$http.post(this.$hosts.services + "/api/post/show", body).then(
        response => {
          if (response.body.status == "ok") {
            this.$store.commit("posts/updatePosts", response.body.data.posts);
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