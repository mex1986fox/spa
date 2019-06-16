<template>
  <lt-main>
    <div class="lt-main__content">
      <div class="lt-main-menu__margin"></div>
      <lt-main-menu>
        <div class="lt-main-menu__header">Посты</div>
        <div class="lt-main-menu__buttons">
          <ui-badge>
            <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
                 @click="isShowFormCreatPost">
              <i class="fas fa-plus"></i>
            </div>
          </ui-badge>
          <ui-badge>
            <div v-if="countFilterPosts>0"
                 class="ui-badge__icon">{{countFilterPosts}}</div>
            <div class="ui-button ui-button_float_white ui-button_noborder ui-button_circle_s3"
                 @click="isShowFilter">
              <i class="fas fa-sliders-h"></i>
            </div>
          </ui-badge>
        </div>
      </lt-main-menu>
      <!-- <div class="lt-main__cards"> -->
      <wg-card-post v-for="(post, key) in posts"
                    :key="key"
                    :post="post"
                    @onUpdatePost="isShowPosts" />
      <!-- </div> -->

      <div style="width: 100%; display: flex; justify-content: center;">
        <div class="ui-button ui-button_white ui-button_s2"
             @click="isAddPosts">Показать еще ...</div>
      </div>
      <wg-form-creat-post :show="showFormCreatPost"
                          @onHide="showFormCreatPost=false" />
      <wg-filter-post :show="showFilter"
                      @onHide="showFilter=false" />
    </div>
  </lt-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "pg-posts",
  data() {
    return {
      showFilter: false,
      showFormCreatPost: false,
      countFilterPosts: 0
    };
  },
  computed: {
    ...mapGetters({
      posts: "posts/getPosts"
    })
  },
  watch: {
    showFilter(newQ) {
      if (newQ == false) {
        this.checkFilterPosts();
      }
    }
  },
  methods: {
    isShowFilter() {
      this.showFilter = true;
    },
    isShowFormCreatPost() {
      this.showFormCreatPost = true;
    },
    isShowPosts() {
      let filterPosts = JSON.parse(this.$cookie.get("filter_posts"));
      let body = new FormData();
      for (const key in filterPosts) {
        body.set(key, filterPosts[key]);
      }
      body.set("page", 1);
      this.$api("post")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("posts/updatePosts", response.body.data.posts);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    isAddPosts() {
      let filterPosts = JSON.parse(this.$cookie.get("filter_posts"));
      let body = new FormData();
      for (const key in filterPosts) {
        body.set(key, filterPosts[key]);
      }
      this.$api("post")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("posts/updatePosts", [
              ...this.posts,
              ...response.body.data.posts
            ]);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    },
    checkFilterPosts() {
      this.countFilterPosts = 0;

      if (this.$cookie.get("filter_posts")) {
        let filterPosts = JSON.parse(this.$cookie.get("filter_posts"));
        for (const key in filterPosts) {
          if (filterPosts[key] != undefined && filterPosts[key] != "") {
            this.countFilterPosts++;
          }
        }
      }
    }
  },
  mounted() {
    this.isShowPosts();
    this.checkFilterPosts();
  }
};
</script>