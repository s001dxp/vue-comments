<template>
  <div
    class="comments"
    data-vue-comments
    :class="{ 'comments--lock': isScrollDocument, [optionsInit.yourCssClass]: optionsInit.yourCssClass }"
  >
    <comments-svg-icons />
    <!-- Emoji -->
    <transition name="fade">
      <div
        class="comments__emoji"
        @mouseleave="toggleEmojiList(null, $event, false)"
        data-vue-comments-emoji-list
        v-if="emojiList.isShow"
        :style="{ top: `${emojiList.top}px`, left: `${emojiList.left}px` }"
      >
        <div class="comments__emoji-list">
          <span
            class="comments__emoji-list-item"
            v-for="(item, index) in optionsInit.emojiLilst"
            @click="addEmoji(item)"
            :key="index"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </transition>
    <div class="comments__panel-form-add">
      <comments-form
        v-if="optionsInit.formAddShowAlways || optionsInit.user.auth"
      />
    </div>
    <div
      class="comments__list"
      v-if="mapItems[optionsInit.parentIdStart]"
      ref="listRef"
      @mousedown="setMousedownCord($event)"
      @mousemove="setHorizontalScroll($event)"
      @mouseleave="setMousedownCord($event)"
      :class="{ 'comments__list--scroll': isHorizontalScroll }"
    >
      <div
        class="comments__item"
        v-for="(commentId, i) in mapItems[optionsInit.parentIdStart].items"
        :key="commentId"
      >
        <comments-item
          :comment="comments[commentId]"
          :comments="comments"
          :mapItems="mapItems"
          :widthResizeWindow="widthResizeWindow"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { debounce } from 'lodash-es'
import isTouchDevice from 'is-touch-device'
import CommentsItem from './comments-item.vue'
import CommentsForm from './comments-form.vue'
import CommentsSvgIcons from './comments-svg-icons.vue'
import imgDefaultUser from './img/default-user.png'
import imgExtensions from './data/img-extensions.json'
import emojiLilst from './data/emoji.json'
import { useCommentsStore } from '@/store'

// Props
const props = defineProps({
  commentsData: {
    type: Object,
    default: () => ({})
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

// Emits
const emit = defineEmits(['message-comment'])

// Store
const store = useCommentsStore()

// Template refs
const listRef = ref(null)

// Reactive state
const emojiList = reactive({
  isShow: false,
  top: 0,
  left: 0
})

const widthResizeWindow = ref(0)
const isTouchmovieDocument = ref(false)
const isScrollDocument = ref(false)
const contextCommentsForm = ref(null)
const mousedownCord = reactive({
  pageX: 0,
  pageY: 0
})
const isHorizontalScroll = ref(false)

const comments = ref({})
const mapItems = ref({})
const newCommentsIds = ref({})
const listeners = ref({})

// Default options
const optionsInit = reactive({
  yourCssClass: '',
  parentIdStart: 0,
  filesMaxCount: Infinity,
  fileMaxSize: 2097152,
  validExtensions: {
    default: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
    items: {},
    str: ''
  },
  imgExtensions,
  emojiLilst,
  isScrollToComment: true,
  isShowVote: true,
  isShowBtnUpload: true,
  isShowBtnEmoji: true,
  text: {
    minLength: 0,
    maxLength: 1000,
    briefMaxLength: 150,
    briefMaxLine: 4
  },
  list: {
    mainShowStart: 5,
    secondShowStart: 1,
    mainShow: 5,
    secondShow: 3
  },
  translation: {
    btnAnswer: 'Answer',
    btnExpand: 'More',
    btnCollapse: 'Collapse',
    btnFileDownload: 'Download',
    formPlaceholder: 'Add a comment',
    fileDelete: 'Delete',
    fileRestore: 'Restore',
    dateToday: 'Today',
    dateYesterday: 'Yesterday',
    settingsDelete: 'Delete',
    settingsEdit: 'Edit',
    dateEditedText: 'Edited:',
    btnCancelEditing: 'Cancel editing',
    btnMore: 'Show more',
    btnMoreAnswers: 'Show answers',
    formAnswerTo: 'Answer to',
    messageFileParams: 'Maximum file size 2 Mb, supported extensions: jpg, png, jpeg, gif, svg, webp',
    errorVoteSend: 'Error sending vote',
    errorFormSend: 'Error form send',
    errorUnexpected: 'Unexpected error',
    errorGetComments: 'Error get comments',
    errorFileExtension: 'Error file extension',
    errorFileSize: 'Error file size',
    errorFileMaxCount: 'Error file limit exceeded',
    errorTextLength: 'The length of the text must be between 0 and 1000 characters'
  },
  dataApi: {
    vote: {
      send: ({ url, params }) => {
        return fetch(url, params).then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw error?.error
            })
          }
          return response.json()
        })
      },
      url: '/',
      params: { method: 'POST' },
      typeData: ''
    },
    commentsListGet: {
      send: ({ url, params }) => {
        return fetch(url, params).then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw error?.error
            })
          }
          return response.json()
        })
      },
      url: '/',
      params: { method: 'GET' },
      typeData: 'query'
    },
    commentAdd: {
      send: ({ url, params }) => {
        return fetch(url, params).then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw error?.error
            })
          }
          return response.json()
        })
      },
      url: '/',
      params: { method: 'POST' },
      typeData: ''
    },
    commentEdit: {
      send: ({ url, params }) => {
        return fetch(url, params).then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw error?.error
            })
          }
          return response.json()
        })
      },
      url: '/',
      params: { method: 'PUT' },
      typeData: ''
    },
    commentDelete: {
      send: ({ url, params }) => {
        return fetch(url, params).then(response => {
          if (!response.ok) {
            return response.json().then(error => {
              throw error?.error
            })
          }
          return response.json()
        })
      },
      url: '/',
      params: { method: 'DELETE' },
      typeData: ''
    }
  },
  user: {
    name: 'User Name',
    img: imgDefaultUser,
    auth: false
  },
  formAddShowAlways: true,
  btnAnswerShowAlways: true,
  imgDefaultUser,
  deleteCommentBefore: () => Promise.resolve(),
  deleteCommentAfter: () => Promise.resolve()
})

// Methods
const initData = (commentsData) => {
  const { items = {}, mapItems: newMapItems = {} } = commentsData
  comments.value = { ...items }

  if (!newMapItems[optionsInit.parentIdStart]) {
    newMapItems[optionsInit.parentIdStart] = {
      quantity: 0,
      items: []
    }
  }
  setMapItems(newMapItems, 'after')
}

const initOptions = (options) => {
  // Merge options with defaults
  Object.keys(options).forEach(key => {
    if (typeof options[key] === 'object' && !Array.isArray(options[key])) {
      Object.assign(optionsInit[key], options[key])
    } else {
      optionsInit[key] = options[key]
    }
  })

  // Create valid extensions
  const validExtensions = options.validExtensions || optionsInit.validExtensions.default
  const itemsValidExtensions = {}

  for (const item of validExtensions) {
    itemsValidExtensions[item] = item
  }

  optionsInit.validExtensions.items = itemsValidExtensions
  optionsInit.validExtensions.str = validExtensions.join(', ')
}

const setMapItems = (newMapItems, type = 'before') => {
  mapItems.value = { ...newMapItems }
}

const toggleEmojiList = (element, event, show = null) => {
  if (show === false || (show === null && emojiList.isShow)) {
    emojiList.isShow = false
    return
  }

  if (element && event) {
    // Ensure we have a valid DOM element
    const domElement = element.value || element
    if (domElement && typeof domElement.getBoundingClientRect === 'function') {
      const rect = domElement.getBoundingClientRect()
      emojiList.top = rect.bottom + window.scrollY
      emojiList.left = rect.left + window.scrollX
      emojiList.isShow = true
    }
  }
}

const addEmoji = (emoji) => {
  if (contextCommentsForm.value) {
    contextCommentsForm.value.addEmojiToText(emoji)
  }
  emojiList.isShow = false
}

const setMousedownCord = (event) => {
  if (event.type === 'mousedown') {
    mousedownCord.pageX = event.pageX
    mousedownCord.pageY = event.pageY
  } else {
    mousedownCord.pageX = 0
    mousedownCord.pageY = 0
  }
}

const setHorizontalScroll = (event) => {
  if (mousedownCord.pageX && Math.abs(event.pageX - mousedownCord.pageX) > 10) {
    isHorizontalScroll.value = true
  } else {
    isHorizontalScroll.value = false
  }
}

const addCommentToList = (comment) => {
  comments.value[comment.id] = comment
  store.addComment(comment)
}

const editCommentToList = (id, updates) => {
  if (comments.value[id]) {
    Object.assign(comments.value[id], updates)
    store.updateComment(id, updates)
  }
}

const deleteCommentToList = (id) => {
  delete comments.value[id]
  store.deleteComment(id)
}

const preparationRequestData = (data) => {
  // Implementation for preparing request data
  return data
}

const emitMessage = (data) => {
  emit('message-comment', data)
}

const addCommentVote = (commentId, vote) => {
  if (comments.value[commentId]) {
    comments.value[commentId].vote = vote
  }
}

const createListCommentsShow = () => {
  // Implementation for creating comments list show
}

const showComments = () => {
  // Implementation for showing comments
}

const setMapItemLinkComponent = () => {
  // Implementation for setting map item link component
}

const scrollToComment = (commentId) => {
  nextTick(() => {
    const element = document.querySelector(`[data-comment-id="${commentId}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  })
}

// Provide methods to child components
provide('addCommentToList', addCommentToList)
provide('editCommentToList', editCommentToList)
provide('deleteCommentToList', deleteCommentToList)
provide('preparationRequestData', preparationRequestData)
provide('emitMessage', emitMessage)
provide('addCommentVote', addCommentVote)
provide('options', optionsInit)
provide('createListCommentsShow', createListCommentsShow)
provide('showComments', showComments)
provide('setMapItemLinkComponent', setMapItemLinkComponent)
provide('scrollToComment', scrollToComment)
provide('toggleEmojiList', toggleEmojiList)
provide('addEmoji', addEmoji)

// Lifecycle hooks
onMounted(() => {
  // Hide emojis when clicking on another element
  listeners.value.touchstart = (event) => {
    if (
      !event.target.closest('[data-vue-comments-form-emoji-btn]') &&
      !event.target.closest('[data-vue-comments-emoji-list]')
    ) {
      emojiList.isShow = false
    }
  }

  listeners.value.touchend = () => {
    if (isTouchDevice()) {
      isScrollDocument.value = false
      isTouchmovieDocument.value = false
    }
  }

  listeners.value.touchcancel = () => {
    if (isTouchDevice()) {
      isScrollDocument.value = false
      isTouchmovieDocument.value = false
    }
  }

  listeners.value.touchmove = () => {
    isTouchmovieDocument.value = true
  }

  listeners.value.scroll = () => {
    if (isTouchDevice() && isTouchmovieDocument.value) {
      isScrollDocument.value = true
    }
    toggleEmojiList(null, event, false)
  }

  listeners.value.resize = debounce(() => {
    widthResizeWindow.value = window.innerWidth
  }, 500)

  // Add event listeners
  document.addEventListener('touchstart', listeners.value.touchstart)
  document.addEventListener('touchend', listeners.value.touchend)
  document.addEventListener('touchcancel', listeners.value.touchcancel)
  document.addEventListener('touchmove', listeners.value.touchmove)
  document.addEventListener('scroll', listeners.value.scroll)
  window.addEventListener('resize', listeners.value.resize)
  document.addEventListener('mouseup', setMousedownCord)
})

onBeforeUnmount(() => {
  // Remove event listeners
  document.removeEventListener('touchstart', listeners.value.touchstart)
  document.removeEventListener('touchend', listeners.value.touchend)
  document.removeEventListener('touchcancel', listeners.value.touchcancel)
  document.removeEventListener('touchmove', listeners.value.touchmove)
  document.removeEventListener('scroll', listeners.value.scroll)
  window.removeEventListener('resize', listeners.value.resize)
  document.removeEventListener('mouseup', setMousedownCord)
})

// Watchers
watch(() => props.options, (newOptions) => {
  initOptions(newOptions)
}, { deep: true, immediate: true })

watch(() => props.commentsData, (newData) => {
  initData(newData)
}, { immediate: true })
</script>

<style lang="scss">
@use "./variables.scss" as *;
.comments {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid $gray-border;
  font-size: 14px;
  position: relative;
  text-align: left;
  &--lock {
    &::before {
      content: "";
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  &__panel-form-add {
    margin-bottom: 5px;
  }
  &__list {
    overflow-x: auto;
    &--scroll {
      position: relative;
      &::before {
        cursor: pointer;
        content: "";
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
  &__emoji {
    width: 200px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    border-radius: 5px;
    position: fixed;
    background-color: #fff;
    padding: 5px;
    z-index: 1;
    font-size: 18px;
    &-list {
      line-height: 1.5;
      overflow-y: auto;
      height: 110px;
      &-item {
        margin: 0 2px;
        display: inline-flex;
        cursor: pointer;
      }
    }
    &::before {
      content: "";
      width: 0;
      height: 0;
      border-left: 16px solid transparent;
      border-right: 16px solid transparent;
      border-bottom: 16px solid #fff;
      position: absolute;
      top: -16px;
      right: 29px;
      z-index: 1;
    }
    &::after {
      content: "";
      width: 0;
      height: 0;
      border-left: 17px solid transparent;
      border-right: 17px solid transparent;
      border-bottom: 16px solid rgba(0,0,0,0.5);
      position: absolute;
      top: -17px;
      right: 28px;
    }
  }
  * {
    box-sizing: border-box;
  }

  b {
    font-weight: bold;
  }

  svg {
    height: 19px;
    width: 19px;
    fill: $gray;
  }

  a {
    color: $blue;
  }

  button,
  button:active,
  button:focus {
    outline: none;
    background: transparent;
    border: 0;
    cursor: pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .comments-spiner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(65, 105, 225, .3);
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
</style>
