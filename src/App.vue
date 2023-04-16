<template lang="pug">
include /src/assets/pug/index.pug

+b.page
  +e.box
    h1 VUE-COMMENTS
    img(src="@/assets/logo.png")
    br
    a(href="https://github.com/EvgeniySaschenko/vue-comments", target="_blank") https://github.com/EvgeniySaschenko/vue-comments

  br
  br
  form-add-user(@user-auth="userAuth($event)")

  br
  +e.box-spiner(v-if="!isReady")
    +b.spiner
      +e.element
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
      console.log("Demo events:", data);
    },
  },
};
</script>

<style lang="sass">
.page
  margin: 0 auto 100px
  max-width: 700px
  font-family: Arial, Helvetica, sans-serif
  &__alert
    text-align: center
    color: orange
  &__box
    text-align: center
    h1
      font-weight: 700
  &__box-spiner
    position: relative
  .spiner
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: rgba(65, 105, 225, .3)
    z-index: 2
    &__element
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      z-index: 2
      display: inline-block
      width: 40px
      height: 40px
      &:after
        content: " "
        display: block
        width: 24px
        height: 24px
        margin: 3px
        border-radius: 50%
        border: 6px solid #fff
        border-color: transparent rgba(0, 0, 255, .3) transparent rgba(0, 0, 255, .3)
        animation: lds-dual-ring 1.2s linear infinite

  @keyframes lds-dual-ring
    0%
      transform: rotate(0deg)

    100%
      transform: rotate(360deg)
</style>
