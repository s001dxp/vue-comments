import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCommentsStore = defineStore('comments', () => {
  // State
  const comments = ref({})
  const user = ref({
    name: '',
    img: '',
    auth: false
  })
  const loading = ref(false)

  // Getters
  const isUserAuthenticated = computed(() => user.value.auth)
  const commentsCount = computed(() => Object.keys(comments.value).length)

  // Actions
  function setComments(newComments) {
    comments.value = newComments
  }

  function addComment(comment) {
    comments.value[comment.id] = comment
  }

  function updateComment(id, updates) {
    if (comments.value[id]) {
      Object.assign(comments.value[id], updates)
    }
  }

  function deleteComment(id) {
    delete comments.value[id]
  }

  function setUser(userData) {
    user.value = { ...userData }
  }

  function setLoading(isLoading) {
    loading.value = isLoading
  }

  return {
    // State
    comments,
    user,
    loading,
    // Getters
    isUserAuthenticated,
    commentsCount,
    // Actions
    setComments,
    addComment,
    updateComment,
    deleteComment,
    setUser,
    setLoading
  }
})
