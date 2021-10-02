<template lang="pug">
include /src/assets/pug/index.pug

+b.page
  +e.box
    h1 VUE-COMMENTS
    img(src="@/assets/logo.png")
  form-add-user(@user-auth="userAuth($event)")
  comments(
    v-if="isReady",
    :options="options",
    :commentsData="comments",
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
    };
  },

  async created() {
    let response = await fetch("/api/comments/?parentId=0", {
      headers: { Cookie: $cookies.get("user") },
    });
    let comments = await response.json();
    this.comments = comments;
    this.isReady = true;
  },
  methods: {
    // Авторизация пользователя
    userAuth(data) {
      let { name = "", img = "", auth = false } = data;
      Object.assign(this.options, {
        user: {
          name,
          img,
          auth,
        },
      });
    },
    // Cообщение при действиях в комментариях
    messageComment(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="sass">
.page
  margin: 0 auto
  max-width: 700px
  font-family: Arial, Helvetica, sans-serif
  &__box
    text-align: center
    h1
      font-weight: 700
</style>
