<template>
  <fragment>
    <ui-table-tr>
      <ui-table-td
        class="wg-table__td_left col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"
        colspan="2"
      >
        <div class="wg-table__td_dete">{{dPost.date_create|filter_date}}</div>
        <div>{{dPost.title}}</div>
      </ui-table-td>
      <ui-table-td class="wg-table__td_dete wg-table__td_left col-phone_clean">{{dPost.date_create|filter_date}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dPost.brand+" "+dPost.model}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dPost.subject+" "+dPost.city}}</ui-table-td>
      <ui-table-td class="col-phone_clean">{{dPost.title}}</ui-table-td>
      <ui-table-td>
        <div class="wg-table__buttons">
          <div
            @click="isShowExcess"
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
          >
            <i v-if="showExcess==false" class="fas fa-angle-down"></i>
            <i v-if="showExcess==true" class="fas fa-angle-up"></i>
          </div>
          <div
            @click="showMenu=true"
            class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1"
          >
            <i class="fas fa-ellipsis-v"></i>
          </div>
        </div>
        <wg-form-update-post
          :show="showUpdatePost"
          @onHide="isHideUpdatePost"
          @onUpdatePost="isUpdatePost"
          :post="dPost"
        />
        <ui-menu :show="showMenu" @onHide="isHideMenu">
          <ul class="ui-menu__ul">
            <li class="ui-menu__li" @click="isShowUpdatePost">Редактировать</li>
            <li class="ui-menu__li" @click="isDeletePostAlbumAndPost">Удалить</li>
          </ul>
        </ui-menu>
      </ui-table-td>
    </ui-table-tr>
    <template v-if="showExcess">
      <ui-table-span class="col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"/>
      <ui-table-tr class="col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean">
        <ui-table-td class="wg-table__td_name wg-table__td_left">Марка, модель</ui-table-td>
        <ui-table-td class="wg-table__td_desc" colspan="100%">{{dPost.brand+" "+dPost.model}}</ui-table-td>
      </ui-table-tr>

      <ui-table-span class="col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean"/>
      <ui-table-tr class="col-tablet_clean col-nbook_clean col-nbook_clean col-desktop_clean">
        <ui-table-td class="wg-table__td_name wg-table__td_left">Город</ui-table-td>
        <ui-table-td class="wg-table__td_desc" colspan="100%">{{dPost.subject+" "+dPost.city}}</ui-table-td>
      </ui-table-tr>

      <ui-table-span/>
      <ui-table-tr>
        <ui-table-td class="wg-table__td_name wg-table__td_left">Описание</ui-table-td>
        <ui-table-td class="wg-table__td_desc" colspan="100%">{{dPost.description}}</ui-table-td>
      </ui-table-tr>
    </template>
  </fragment>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-table-myposts",
  data() {
    return {
      showExcess: false,
      showMenu: false,
      showUpdatePost: false,
      dPost: this.post
    };
  },
  computed: {
    ...mapGetters({
      token: "tokens/getAccessToken"
    })
  },
  props: {
    post: {
      default: undefined
    }
  },
  watch: {
    post(newQ) {
      this.dPost = newQ;
    }
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
    },
    isHideMenu() {
      this.showMenu = false;
    },
    isShowUpdatePost() {
      this.showMenu = false;
      this.showUpdatePost = true;
    },
    isHideUpdatePost() {
      this.showUpdatePost = false;
    },
    isUpdatePost(post) {
      this.dPost = post;
      this.$emit("onUpdatePost", post);
    },
    isDeletePostAlbumAndPost() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("post_id", this.dPost.post_id);
      //отправляем запрос
      this.$api("postphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.isDeletePost();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePost() {
      this.showMenu = false;
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("post_id", this.dPost.post_id);
      //отправляем запрос
      this.$api("post")
        .delete(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.$emit("onDeletePost", this.post);
            this.$store.commit("myposts/deletePost", this.dPost);
            this.$store.commit("posts/deletePost", this.dPost);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isDeletePostAlbum() {
      let body = new FormData();
      //добавляем фильтр в куки
      body.set("access_token", this.token);
      body.set("post_id", this.dPost.post_id);
      //отправляем запрос
      this.$api("postphoto")
        .deleteAlbum(body)
        .then(response => {
          if (response.body.status == "ok") {
            // this.isDeletePost();
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  }
};
</script>
