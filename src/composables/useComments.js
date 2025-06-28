import { ref, computed, nextTick } from 'vue'
import { useCommentsStore } from '@/store'

export function useComments() {
  const store = useCommentsStore()

  // Reactive state
  const isLoading = ref(false)
  const error = ref(null)

  // Computed
  const hasComments = computed(() => store.commentsCount > 0)

  // Methods
  const loadComments = async (parentId = 0) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/comments/?parentId=${parentId}`)
      if (!response.ok) throw new Error('Failed to load comments')

      const comments = await response.json()
      store.setComments(comments)
      return comments
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const addComment = async (commentData) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData)
      })

      if (!response.ok) throw new Error('Failed to add comment')

      const newComment = await response.json()
      store.addComment(newComment)
      return newComment
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateComment = async (id, updates) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) throw new Error('Failed to update comment')

      const updatedComment = await response.json()
      store.updateComment(id, updatedComment)
      return updatedComment
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteComment = async (id) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete comment')

      store.deleteComment(id)
      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const scrollToComment = (commentId) => {
    nextTick(() => {
      const element = document.querySelector(`[data-comment-id="${commentId}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }

  return {
    // State
    isLoading,
    error,
    // Computed
    hasComments,
    // Methods
    loadComments,
    addComment,
    updateComment,
    deleteComment,
    scrollToComment
  }
}

export function useEmojiPicker() {
  const emojiList = ref({
    isShow: false,
    top: 0,
    left: 0
  })

  const toggleEmojiList = (element, event, show = null) => {
    if (show === false || (show === null && emojiList.value.isShow)) {
      emojiList.value.isShow = false
      return
    }

    if (element && event) {
      const rect = element.getBoundingClientRect()
      emojiList.value.top = rect.bottom + window.scrollY
      emojiList.value.left = rect.left + window.scrollX
      emojiList.value.isShow = true
    }
  }

  const addEmoji = (emoji, textRef, textValue, emit) => {
    if (textRef.value) {
      const start = textRef.value.selectionStart
      const end = textRef.value.selectionEnd
      const newText = textValue.value.substring(0, start) + emoji + textValue.value.substring(end)

      emit('update:modelValue', newText)

      nextTick(() => {
        const newPosition = start + emoji.length
        textRef.value.setSelectionRange(newPosition, newPosition)
        textRef.value.focus()
      })
    }

    emojiList.value.isShow = false
  }

  return {
    emojiList,
    toggleEmojiList,
    addEmoji
  }
}

export function useFileUpload() {
  const files = ref([])
  const maxFileSize = ref(5 * 1024 * 1024) // 5MB
  const allowedExtensions = ref(['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'])

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase()

    if (!allowedExtensions.value.includes(extension)) {
      throw new Error(`File type .${extension} is not allowed`)
    }

    if (file.size > maxFileSize.value) {
      throw new Error('File size exceeds 5MB limit')
    }

    return true
  }

  const createFilePreview = (fileList) => {
    Array.from(fileList).forEach(file => {
      try {
        validateFile(file)

        const reader = new FileReader()
        reader.onload = (e) => {
          files.value.push({
            id: Date.now() + Math.random(),
            name: file.name,
            src: e.target.result,
            extension: file.name.split('.').pop().toLowerCase(),
            size: file.size,
            isDelete: false
          })
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('File validation error:', error)
      }
    })
  }

  const deleteFile = (index) => {
    if (files.value[index]) {
      files.value[index].isDelete = true
    }
  }

  const restoreFile = (index) => {
    if (files.value[index]) {
      files.value[index].isDelete = false
    }
  }

  const removeFile = (index) => {
    files.value.splice(index, 1)
  }

  const clearFiles = () => {
    files.value = []
  }

  return {
    files,
    maxFileSize,
    allowedExtensions,
    createFilePreview,
    deleteFile,
    restoreFile,
    removeFile,
    clearFiles
  }
}
