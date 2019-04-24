<template>
  <form ref="formCreatePost">
    <div class="wg-form-registration__card-header">Укажите основные данные</div>
    <div class="wg-form-create-post__card-ef">
      <ui-ef-text name="title" caption="Заголовок *" :help="excTitle"></ui-ef-text>
      <ui-ef-textarea name="description" caption="Описание *" :help="excDescr" :autoresize="200"></ui-ef-textarea>
    </div>
    <div class="wg-form-registration__card-buttons">
      <input
        type="button"
        class="ui-button ui-button_float_black"
        @click="isCreatePost"
        :disabled="dSpinn"
        value="Создать"
      >
      <ui-spinner v-if="dSpinn==true" class="ui-spinner_s1"/>
    </div>
    <ui-snackbar :show="showSnackbar" type="err" :time="5000" @onHide="showSnackbar=false">
      <div>{{masSnackbar}}</div>
      <div class="ui-snackbar__buttons">
        <input
          type="button"
          class="ui-button ui-button_float_black ui-button_s1"
          @click="showSnackbar=false"
          value="Закрыть"
        >
      </div>
    </ui-snackbar>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      excTitle: "",
      excDescr: "",
      showSnackbar: false,
      masSnackbar: "",
      dSpinn: false
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  watch: {
    token(newQ) {
      if (newQ != undefined) {
        this.$emit("onLogin");
      }
    }
  },
  methods: {
    isCreatePost() {
      this.excTitle = "";
      this.excDescr = "";
      let form = this.$refs.formCreatePost;
      let body = new FormData(form);
      body.set("access_token", this.token);
      let title = body.get("title");
      let description = body.get("description");

      let fExc = false;
      if (title == undefined || title == "") {
        this.excTitle = "Заполните заголовок.";
        fExc = true;
      }
      if (description == undefined || description == "") {
        this.excDescr = "Заполните описание.";
        fExc = true;
      }
      console.dir(this.excDescr);
      if (fExc == true) {
        return;
      }
      this.$http.post(this.$hosts.services + "/api/post/create", body).then(
        response => {
          console.dir(response.body.data);
        },
        error => {
          this.showSnackbar = true;
          let exc = error.body.data;
          this.masSnackbar = exc.massege;
          this.excTitle = exc["title"] ? exc["title"] : "";
          this.excDescr = exc["description"] ? exc["description"] : "";
        }
      );
    }
  }
};
</script>

