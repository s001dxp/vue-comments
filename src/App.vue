<template>
  <div class="page">
    <div class="page__box">
      <h1>VUE-COMMENTS</h1>
      <img src="@/assets/logo.png" alt="Vue Comments Logo">
      <br>
      <a href="https://github.com/EvgeniySaschenko/vue-comments" target="_blank">https://github.com/EvgeniySaschenko/vue-comments</a>
    </div>
    <br>
    <br>
    <!-- form-add-user(@user-auth="userAuth($event)") -->
    <div class="page__alert">This demo only works in view mode, you cannot comment/like</div>
    <br>
    <div class="page__box-spiner" v-if="!isReady">
      <div class="spiner">
        <div class="spiner__element"></div>
      </div>
    </div>
    <comments
      v-if="isReady"
      :options="options"
      :commentsData="comments"
      @message-comment="messageComment"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Comments from "@/components/comments/comments.vue"
import FormAddUser from "@/components/form-add-user/form-add-user.vue"
import { useCommentsStore } from "@/store"

// Store
const store = useCommentsStore()

// Reactive state
const isReady = ref(false)
const comments = ref({})
const isShowPopupNotAuthorized = ref(false)

const options = ref({
  // Enable voting functionality
  isShowVote: true,
  user: {
    name: 'Demo User',
    img: 'https://via.placeholder.com/32x32',
    auth: true // Enable user authentication for demo
  },
  dataApi: {
    vote: {
      url: "/api/comments/vote/",
      send: (requestData) => {
        // Mock vote API call for demo
        console.log('Demo vote:', requestData)
        // Extract vote type from the request data
        const voteType = requestData.data?.vote || requestData.vote || 'like'
        const commentId = requestData.data?.commentId || requestData.commentId
        console.log(`Processing vote: ${voteType} for comment ${commentId}`)
        return Promise.resolve({ success: true, vote: voteType, commentId })
      },
      params: { method: 'POST' },
      typeData: ''
    },
    commentAdd: {
      url: "/api/comments/",
      send: (requestData) => {
        console.log('Demo add comment:', requestData)
        return Promise.resolve({ id: Date.now(), ...requestData.data })
      },
      params: { method: 'POST' },
      typeData: ''
    },
    commentDelete: {
      url: "/api/comments/",
      send: (requestData) => {
        console.log('Demo delete comment:', requestData)
        return Promise.resolve({ success: true })
      },
      params: { method: 'DELETE' },
      typeData: ''
    },
    commentEdit: {
      url: "/api/comments/",
      send: (requestData) => {
        console.log('Demo edit comment:', requestData)
        return Promise.resolve({ success: true, ...requestData.data })
      },
      params: { method: 'PUT' },
      typeData: ''
    },
    commentsListGet: {
      url: "/api/comments/",
      send: (requestData) => {
        console.log('Demo get comments:', requestData)
        return Promise.resolve({ items: {}, mapItems: {} })
      },
      params: { method: 'GET' },
      typeData: 'query'
    },
  },
})

// Methods
const userAuth = (data) => {
  const { name = "", img = "", auth = false } = data
  Object.assign(options.value, {
    user: {
      name,
      img,
      auth,
    },
  })
  store.setUser({ name, img, auth })
}

const messageComment = (data) => {
  console.log("Demo events:", data)
  if (data.sourceType === "form") return
  if (data.type === "user-no-auth") {
    isShowPopupNotAuthorized.value = true
  }
}

// Lifecycle - Load demo data or set ready state
onMounted(async () => {
  try {
    // For demo purposes, we'll create some mock data
    // In a real app, you'd fetch from your API
    const mockComments = {
      items: {
        1: {
          id: 1,
          parentId: 0,
          text: "This is a demo comment! The Vue Comments component has been successfully modernized to Vue 3 with Composition API.",
          userName: "Demo User",
          userImg: "https://via.placeholder.com/32x32",
          date: new Date().toISOString(),
          vote: null,
          countLike: 3,
          countDislike: 0,
          isManageEdit: false,
          isManageDelete: false,
          files: []
        },
        2: {
          id: 2,
          parentId: 1,
          text: "Great work on the modernization! 🎉",
          userName: "Another User",
          userImg: "https://via.placeholder.com/32x32",
          date: new Date().toISOString(),
          vote: null,
          countLike: 1,
          countDislike: 0,
          isManageEdit: false,
          isManageDelete: false,
          files: []
        }
      },
      mapItems: {
        0: {
          quantity: 1,
          items: [1],
          show: { 1: true }
        },
        1: {
          quantity: 1,
          items: [2],
          show: { 2: true },
          isDelete: false
        },
        // Add missing mapItems entries for each comment
        2: {
          quantity: 0,
          items: [],
          show: {},
          isDelete: false
        }
      }
    }

    comments.value = mockComments
    store.setComments(mockComments)
  } catch (error) {
    console.error("Failed to load comments:", error)
    // Even if there's an error, show the component
    comments.value = { items: {}, mapItems: { 0: { quantity: 0, items: [], show: {} } } }
  } finally {
    isReady.value = true
  }
})
</script>

<style lang="scss" scoped>
.page {
  margin: 0 auto 100px;
  max-width: 700px;
  font-family: Arial, Helvetica, sans-serif;
  &__alert {
    text-align: center;
    color: orange;
  }
  &__box {
    text-align: center;
    h1 {
      font-weight: 700;
    }
  }
  &__box-spiner {
    position: relative;
  }
  .spiner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(65, 105, 225, .3);
    z-index: 2;
    &__element {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      display: inline-block;
      width: 40px;
      height: 40px;
      &:after {
        content: " ";
        display: block;
        width: 24px;
        height: 24px;
        margin: 3px;
        border-radius: 50%;
        border: 6px solid #fff;
        border-color: transparent rgba(0, 0, 255, .3) transparent rgba(0, 0, 255, .3);
        animation: lds-dual-ring 1.2s linear infinite;
      }
    }
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.popup-not-authorized {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,.5);
  &__box {
    background: #fff;
    width: 100%;
    max-width: 300px;
    border: 2px solid gray;
    margin: 10px;
    padding: 15px;
    text-align: center;
  }
  &__content {
    font-size: 22px;
    margin-bottom: 20px;
  }
}
</style>
