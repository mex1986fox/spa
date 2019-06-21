<template>
  <div class="wg-card-post">
    <div class="wg-card-post__info">
      <div class="wg-card-post__button-menu">
        <div
          class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s2"
          @click="showMenu=true"
        >
          <i class="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <div class="wg-card-post__info-date">{{dPost.date_create}}</div>
      <div class="wg-card-post__info-text">{{dPost.city +" ("+dPost.subject+")"}}</div>
      <div class="wg-card-post__info-text">{{dPost.brand +" "+dPost.model}}</div>
    </div>
    <div class="wg-card-post__photo" @click="isLoadImgLincks">
      <ui-img
        class="wg-card-post__img"
        :src="dPost.main_photo"
        :alt="'https://humor.fm/uploads/posts/2015-08/15/7_prodolzhenie-vy-najdete-na-nashem-sajte-yaustalcom-42.png'"
      />
    </div>
    <wg-slider-zoom :slides="slides" :show="showSlides" @onHide="showSlides=false"></wg-slider-zoom>
    <span class="wg-card-post__title">{{dPost.title!=null?dPost.title:""}}</span>
    <span
      ref="descr"
      class="wg-card-post__description wg-card-post__description_ellips"
    >{{dPost.description!=null?dPost.description:''}}</span>
    <div class="wg-card-post__button-menu-bot">
      <wg-likes-post
        :likes="dPost.likes"
        :dislikes="dPost.dislikes"
        :userID="dPost.user_id"
        :postID="dPost.post_id"
      />
      <div
        class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s1 wg-card-post__button-showdesc"
        @click="isShowDescription"
      >
        <i v-if="showDescription==false" class="fas fa-angle-down"></i>
        <i v-if="showDescription==true" class="fas fa-angle-up"></i>
      </div>
    </div>
    <wg-form-update-post
      :show="showUpdatePost"
      @onHide="isHideUpdatePost"
      @onUpdatePost="isUpdatePost"
      :post="post"
    />
    <ui-menu :show="showMenu" @onHide="isHideMenu">
      <ul class="ui-menu__ul">
        <li
          class="ui-menu__li"
          v-if="profileUserID==dPost.user_id"
          @click="isShowUpdatePost"
        >Редактировать</li>
        <li
          class="ui-menu__li"
          v-if="profileUserID==dPost.user_id"
          @click="isDeletePostAlbumAndPost"
        >Удалить</li>
        <li class="ui-menu__li">Пожаловаться</li>
      </ul>
    </ui-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "wg-card-post",
  data() {
    return {
      showDescription: false,
      slides: [],
      showSlides: false,
      showMenu: false,
      showUpdatePost: false,
      dPost: this.post
    };
  },
  props: {
    post: {
      type: Object,
      default: {}
    }
  },
  watch: {
    post(newQ) {
      this.dPost = newQ;
    }
  },
  computed: {
    ...mapGetters({
      profileUserID: "profile/getID",
      token: "tokens/getAccessToken"
    })
  },
  methods: {
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
    isShowDescription() {
      let height = this.$refs.descr.style.height;
      if (height == "auto") {
        this.showDescription = false;
        this.$refs.descr.style.height = "58px";
      } else {
        this.showDescription = true;
        this.$refs.descr.style.height = "auto";
      }
    },
    isLoadImgLincks() {
      if (this.slides.length > 0) {
        this.showSlides = true;
      } else {
        let body = new FormData();
        //добавляем фильтр в куки
        body.set("users_id[]", this.dPost.user_id);
        body.set("posts_id[]", this.dPost.post_id);
        //отправляем запрос
        this.$api("postphoto")
          .show(body)
          .then(response => {
            if (response.body.status == "ok") {
              let imgs = response.body.data[0].files.origin;
              for (let key in imgs) {
                this.slides.push({ src: this.$hosts.postPhoto + imgs[key] });
              }
              this.showSlides = true;
            }
          })
          .catch(error => {
            if (error.body.status == "except") {
              console.dir(error);
            }
          });
      }
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
        .cacth(error => {
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
            this.$emit("onDeletePost", this.post);
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
        .cacth(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  }
};
</script>
