<template>
  <div class="wg-table-mypost">
    <ui-table v-if="posts!=undefined">
      <ui-table-header>
        <ui-table-tr>
          <ui-table-th class="wg-table__td_left col-phone_clean">Дата</ui-table-th>
          <ui-table-th class="col-phone_clean"></ui-table-th>
          <ui-table-th class="col-phone_clean">Марка, модель</ui-table-th>
          <ui-table-th class="col-phone_clean">Город</ui-table-th>
          <ui-table-th class="col-phone_clean">Заголовок</ui-table-th>
          <ui-table-th></ui-table-th>
        </ui-table-tr>
      </ui-table-header>
      <ui-table-body>
        <template v-for="(post, key) in posts">
          <ui-table-span :height="15" v-if="key>0" :key="'span'+post.post_id"/>
          <wg-table-mypost-body
            :post="post"
            :key="'body'+post.post_id"
            @onClickExcess="isShowExcess(post.post_id)"
          />
          <wg-table-mypost-desc
            v-if="showExcess[post.post_id]!=undefined && showExcess[post.post_id]==true"
            :post="post"
            :key="'desc'+post.post_id"
          />
        </template>
      </ui-table-body>
    </ui-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableMypostBody from "./wg-table-mypost-body.vue";
import WgTableMypostDesc from "./wg-table-mypost-desc.vue";
export default {
  name: "wg-table-myposts",
  components: { WgTableMypostBody, WgTableMypostDesc },
  data() {
    return {
      showExcess: []
    };
  },
  computed: {
    ...mapGetters({
      posts: "myposts/getPosts",
      userID: "profile/getID"
    })
  },
  watch: {
    userID(newQ) {
      if (newQ == undefined) {
        this.$store.commit("myposts/updatePosts", undefined);
      } else {
        this.isShowPosts();
      }
    }
  },
  methods: {
    isShowExcess(key) {
      let sExc = this.showExcess;
      this.showExcess = undefined;
      sExc[key] = sExc[key] != undefined ? !sExc[key] : true;
      this.showExcess = sExc;
    },
    isShowPosts() {
      let body = new FormData();
      body.set("user_id", this.userID);
      body.set("page", 1);
      this.$api("post")
        .show(body)
        .then(response => {
          if (response.body.status == "ok") {
            this.$store.commit("myposts/updatePosts", response.body.data.posts);
          }
        })
        .catch(error => {
          if (error.body.status == "except") {
            console.dir(error);
          }
        });
    }
  },
  mounted() {
    this.isShowPosts();
  }
};
</script>
