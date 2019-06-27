<template>
  <div class="wg-table-mypost">
    <ui-table v-if="posts!=undefined">
      <ui-table-header>
        <ui-table-tr>
          <ui-table-th>Дата</ui-table-th>
          <ui-table-th class="col-phone_clean">Марка, модель</ui-table-th>
          <ui-table-th class="col-phone_clean">Город</ui-table-th>
          <ui-table-th>Заголовок</ui-table-th>
          <ui-table-th></ui-table-th>
        </ui-table-tr>
      </ui-table-header>
      <ui-table-body>
        <template v-for="(post, key) in posts">
          <ui-table-span :height="15" v-if="key>0" :key="'span'+key"/>
          <wg-table-mypost-body :post="post" :key="key"/>
        </template>
      </ui-table-body>
    </ui-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import WgTableMypostBody from "./wg-table-mypost-body.vue";
export default {
  name: "wg-table-myposts",
  components: { WgTableMypostBody },
  data() {
    return {
      showExcess: false
    };
  },
  computed: {
    ...mapGetters({
      posts: "myposts/getPosts",
      userID: "profile/getID"
    })
  },
  methods: {
    isShowExcess() {
      this.showExcess = this.showExcess == true ? false : true;
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
