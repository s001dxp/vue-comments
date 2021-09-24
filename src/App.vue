<template lang="pug">
include /src/assets/pug/index.pug

+b.page_index
  form-add-user
  comments(
    v-if="isReady",
    :options="options",
    ref="comments",
    :commentsData="comments",
    @message-user-no-auth="messageUserNoAuth($event)",
    @message-add-comment-to-list="messageAddCommentToList($event)",
    @message-comment-vote="messageCommentVote($event)",
    @message-comment="messageComment($event)"
  )
</template>

<script>
import Comments from "@/components/comments/comments.vue";
import FormAddUser from "@/components/form-add-user/form-add-user.vue";
import $cookies from "vue-cookies";

export default {
  name: "Page",
  components: {
    Comments,
    FormAddUser,
  },
  data() {
    return {
      isReady: false,
      comments: {},
      options: {
        text: {
          briefMaxLine: 2,
        },
        user: {
          auth: true,
        },
        dataApi: {
          vote: {
            url: "/api/comments/vote/",
          },
          commentAdd: {
            url: "/api/comments/",
          },
          commentDelete: {
            url: "/api/comments/",
          },
          commentEdit: {
            url: "/api/comments/",
          },
          commentsListGet: {
            url: "/api/comments/",
          },
        },
        validExtensions: ["jpg", "png", "jpeg", "jpeg", "vue"],
      },
      listeners: {},
    };
  },
  async created() {
    let response = await fetch("http://localhost:8080/api/comments/?parentId=0&quantityCurrent=0", {
      headers: { Cookie: $cookies.get("user") },
    });
    let comments = await response.json();
    this.comments = comments;
    this.isReady = true;
    this.init();
  },
  methods: {
    init() {
      // Устанавливаем пользователя
      this.listeners["set-curent-user"] = ({ name, img }) => {
        Object.assign(this.options.user, {
          name,
          img,
        });
        this.$refs.comments.$emit("run-init-options", this.options);
      };
      // this.$root.$on("set-curent-user", this.listeners["set-curent-user"]);
    },
    // Cообщение о том что юзер не авторизован
    messageUserNoAuth(data) {
      console.log(data);
    },
    // Cообщение о добавлении нового комментария
    messageAddCommentToList(data) {
      console.log(data);
    },

    messageComment(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="sass">
.page_index
  margin: 0 auto
  max-width: 700px
</style>
