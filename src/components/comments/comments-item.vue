<template>
  <div class="comments-item" v-if="isShow" :class="{ 'comments-item--delete': mapItems[comment.id].isDelete }">
    <div class="comments-item__row-comment">
      <div class="comments-item__col-avatar">
        <img class="comments-item__avatar-img" :src="comment.userImg || options.imgDefaultUser" loading="lazy">
      </div>
      <div class="comments-item__col-content" :class="{ 'comments-item__col-content--form-show': isFormShow }">
        <div class="comments-item__content" v-if="!isEdited">
          <div class="comments-item__error-text" v-if="error">{{ error }}</div>
          <div class="comments-item__panel-top">
            <!-- user name -->
            <div class="comments-item__user-name" data-comments-item-user-name>
              <span>{{ comment.userName }}</span>
              <span class="comments-item__answer-to" v-if="userNameAnswer">
                <svg class="comments-item__answer-to-icon">
                  <use :xlink:href="`#vue-comments-symbol-icon-share`"></use>
                </svg>
                <span class="comments-item__answer-to-user" @click="scrollToComment(comment.parentId)">@{{ userNameAnswer }}</span>
              </span>
            </div>
            <!-- settings -->
            <div class="comments-item__btn-settings" v-if="comment.isManageEdit || comment.isManageDelete" @click="toggleSettings()">
              <svg class="comments-item__btn-settings-icon">
                <use :xlink:href="`#vue-comments-symbol-icon-settings`"></use>
              </svg>
              <div class="comments-item__settings" v-if="isShowSettings" @mouseleave="toggleSettings()">
                <div class="comments-spiner" v-if="isDeleteSending">
                  <div class="comments-spiner__element"></div>
                </div>
                <div class="comments-item__settings-closed" @mouseup="toggleSettings()">
                  <svg>
                    <use :xlink:href="`#vue-comments-symbol-icon-closed`"></use>
                  </svg>
                </div>
                <div class="comments-item__settings-item" v-if="comment.isManageEdit" @click="toggleSettings(), toggleEdited(true), toggleForm(true)">
                  <svg class="comments-item__settings-icon">
                    <use :xlink:href="`#vue-comments-symbol-icon-edit`"></use>
                  </svg>
                  <span>{{ options.translation.settingsEdit }}</span>
                </div>
                <br>
                <div class="comments-item__settings-item" v-if="comment.isManageDelete" @click="deleteMessage(comment)">
                  <svg class="comments-item__settings-icon">
                    <use :xlink:href="`#vue-comments-symbol-icon-delete`"></use>
                  </svg>
                  <span>{{ options.translation.settingsDelete }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- File gallery and text content -->
          <div class="comments-item__file-gallery" v-if="files.length" :class="{ active: isOpenGallery }">
            <!-- closed -->
            <svg class="comments-item__file-gallery-closed" v-if="isOpenGallery" @click="toggleGallery(false)">
              <use :xlink:href="`#vue-comments-symbol-icon-closed`"></use>
            </svg>
            <!-- download -->
            <div class="comments-item__file-gallery-box-img">
              <!-- icon -->
              <a download :href="files[slideNum].src" v-if="files[slideNum].type === 'icon'" class="comments-item__file-gallery-icon">
                <svg>
                  <use :xlink:href="`#vue-comments-symbol-icon-download`"></use>
                </svg>
              </a>
              <!-- img -->
              <img class="comments-item__file-gallery" v-else loading="lazy" @click="toggleGallery(true)" :src="!isOpenGallery ? files[slideNum].preview : files[slideNum].src" :alt="files[slideNum].name" :class="`comments-item__file-gallery-img`">
              <!-- prev -->
              <div class="comments-item__file-gallery-arrow--prev" v-if="files.length > 1" @click="leafSlide(-1)">
                <svg>
                  <use :xlink:href="`#vue-comments-symbol-icon-arrow-left`"></use>
                </svg>
              </div>
              <!-- next -->
              <div class="comments-item__file-gallery-arrow--next" v-if="files.length > 1" @click="leafSlide(1)">
                <svg>
                  <use :xlink:href="`#vue-comments-symbol-icon-arrow-right`"></use>
                </svg>
              </div>
              <a class="comments-item__file-gallery-download" download v-if="files[slideNum].type === 'icon'" :href="files[slideNum].src">{{ options.translation.btnFileDownload }}<br>{{ files[slideNum].name }}</a>
            </div>
            <div class="comments-item__file-gallery-count" v-if="files.length > 1">
              <b>{{ slideNum + 1 }}</b> из <b>{{ files.length }}</b>
            </div>
          </div>
          <!-- Comment text -->
          <div class="comments-item__text" ref="textRef">
            <span v-html="isTextBriefExpand ? text.brief : text.all"></span>
            <button
              class="comments-item__btn-text-more"
              v-if="isTextBrief"
              @click="toggleTextBrief()"
            >
              {{ isTextBriefExpand ? options.translation.btnExpand : options.translation.btnCollapse }}
            </button>
          </div>
          <!-- Date and actions -->
          <div class="comments-item__panel-bottom">
            <div class="comments-item__date">{{ formatDate(comment.date) }}</div>
            <div class="comments-item__date-edit" v-if="comment.dateEdit">
              {{ options.translation.dateEditedText }} {{ formatDate(comment.dateEdit) }}
            </div>
            <!-- Vote buttons -->
            <div class="comments-item__vote" v-if="options.isShowVote">
              <div class="comments-spiner" v-if="isVoteSending">
                <div class="comments-spiner__element"></div>
              </div>
              <button class="comments-item__vote-btn" @click="vote('like')" :class="{ active: comment.vote === 'like' }">
                <svg><use :xlink:href="`#vue-comments-symbol-icon-like`"></use></svg>
                <span v-if="comment.countLike">{{ comment.countLike }}</span>
              </button>
              <button class="comments-item__vote-btn" @click="vote('dislike')" :class="{ active: comment.vote === 'dislike' }">
                <svg><use :xlink:href="`#vue-comments-symbol-icon-dislike`"></use></svg>
                <span v-if="comment.countDislike">{{ comment.countDislike }}</span>
              </button>
            </div>
            <!-- Answer button -->
            <button
              class="comments-item__btn-answer"
              v-if="options.btnAnswerShowAlways || options.user.auth"
              @click="toggleForm()"
            >
              {{ options.translation.btnAnswer }}
            </button>
          </div>
        </div>
        <!-- Edit form -->
        <comments-form
          v-if="isEdited"
          :comment="comment"
          :isEdited="true"
        />
      </div>
    </div>
    <!-- Reply form -->
    <div class="comments-item__form" v-if="isFormShow && !isEdited">
      <comments-form
        :comment="comment"
        :userNameAnswer="comment.userName"
      />
    </div>
    <!-- Nested comments -->
    <div class="comments-item__nested" v-if="mapItems[comment.id] && mapItems[comment.id].items.length">
      <comments-item
        v-for="nestedCommentId in mapItems[comment.id].items"
        :key="nestedCommentId"
        :comment="comments[nestedCommentId]"
        :comments="comments"
        :mapItems="mapItems"
        :widthResizeWindow="widthResizeWindow"
        :userNameAnswer="getUserNameAnswer(nestedCommentId)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, inject, provide, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import CommentsForm from './comments-form.vue'
import CommentsItem from './comments-item.vue'
import iconFile from './img/icon-file.svg'
import regExp from './reg-exp.js'

// Props
const props = defineProps({
  comments: {
    type: Object,
    default: () => ({})
  },
  comment: {
    type: Object,
    default: () => ({})
  },
  mapItems: {
    type: Object,
    default: () => ({})
  },
  userNameAnswer: {
    type: String,
    default: ''
  },
  widthResizeWindow: {
    type: Number,
    default: 0
  }
})

// Injected dependencies
const options = inject('options')
const emitMessage = inject('emitMessage')
const addCommentVote = inject('addCommentVote')
const preparationRequestData = inject('preparationRequestData')
const deleteCommentToList = inject('deleteCommentToList')
const showComments = inject('showComments')
const setMapItemLinkComponent = inject('setMapItemLinkComponent')
const scrollToComment = inject('scrollToComment')

// Template refs
const textRef = ref(null)

// Reactive state
const text = reactive({
  brief: '',
  all: ''
})
const isTextBrief = ref(false)
const isTextBriefExpand = ref(true)
const isFormShow = ref(false)
const isEdited = ref(false)
const files = ref([])
const slideNum = ref(0)
const isOpenGallery = ref(false)
const listLinks = ref({})
const listeners = ref({})
const isVoteSending = ref(false)
const isDeleteSending = ref(false)
const isShowSettings = ref(false)
const error = ref('')

// Computed
const isShow = computed(() => {
  return props.mapItems[props.comment.parentId]?.show?.[props.comment.id] ?? true
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) {
    return options.translation.dateToday
  } else if (diffDays === 2) {
    return options.translation.dateYesterday
  } else {
    return date.toLocaleDateString()
  }
}

const getUserNameAnswer = (commentId) => {
  const comment = props.comments[commentId]
  if (comment?.parentId && props.comments[comment.parentId]) {
    return props.comments[comment.parentId].userName
  }
  return ''
}

const toggleForm = (show = null) => {
  if (show !== null) {
    isFormShow.value = show
  } else {
    isFormShow.value = !isFormShow.value
  }

  if (isFormShow.value) {
    isEdited.value = false
  }
}

const toggleEdited = (show = null) => {
  if (show !== null) {
    isEdited.value = show
  } else {
    isEdited.value = !isEdited.value
  }

  if (isEdited.value) {
    isFormShow.value = false
  }
}

const toggleSettings = () => {
  isShowSettings.value = !isShowSettings.value
}

const toggleTextBrief = () => {
  isTextBriefExpand.value = !isTextBriefExpand.value
}

const checkIsShowBtnTextMore = () => {
  if (!textRef.value) return

  nextTick(() => {
    const element = textRef.value
    const lineHeight = parseInt(getComputedStyle(element).lineHeight)
    const maxLines = options.text.briefMaxLine
    const maxHeight = lineHeight * maxLines

    if (element.scrollHeight > maxHeight || props.comment.text.length > options.text.briefMaxLength) {
      isTextBrief.value = true
      if (props.comment.text.length > options.text.briefMaxLength) {
        text.brief = props.comment.text.substring(0, options.text.briefMaxLength) + '...'
      } else {
        text.brief = props.comment.text
      }
      text.all = props.comment.text
    } else {
      isTextBrief.value = false
      text.all = props.comment.text
      text.brief = props.comment.text
    }
  })
}

const vote = async (type) => {
  if (!options.user.auth || isVoteSending.value) return

  isVoteSending.value = true
  error.value = ''

  try {
    const { url, params, send, typeData } = options.dataApi.vote
    const data = preparationRequestData({
      data: {
        commentId: props.comment.id,
        vote: type
      },
      url,
      params,
      typeData
    })

    const response = await send(data)
    addCommentVote(props.comment.id, response)

    emitMessage({
      type: 'vote',
      data: response,
      sourceType: 'vote-btn'
    })
  } catch (err) {
    error.value = options.translation.errorVoteSend
    emitMessage({
      type: 'vote-error',
      error: err,
      sourceType: 'vote-btn'
    })
  } finally {
    isVoteSending.value = false
  }
}

const deleteMessage = async (comment) => {
  if (!comment.isManageDelete || isDeleteSending.value) return

  isDeleteSending.value = true
  error.value = ''

  try {
    await options.deleteCommentBefore()

    const { url, params, send, typeData } = options.dataApi.commentDelete
    const data = preparationRequestData({
      data: { id: comment.id },
      url,
      params,
      typeData
    })

    await send(data)
    deleteCommentToList(comment.id)

    await options.deleteCommentAfter()

    emitMessage({
      type: 'comment-delete',
      data: { id: comment.id },
      sourceType: 'settings'
    })
  } catch (err) {
    error.value = options.translation.errorUnexpected
    emitMessage({
      type: 'comment-delete-error',
      error: err,
      sourceType: 'settings'
    })
  } finally {
    isDeleteSending.value = false
    isShowSettings.value = false
  }
}

const initFiles = () => {
  if (props.comment.files && props.comment.files.length) {
    files.value = [...props.comment.files]
  } else {
    files.value = []
  }
}

// Provide methods for child components
provide('toggleForm', toggleForm)

// Lifecycle
onMounted(() => {
  checkIsShowBtnTextMore()
  initFiles()

  // Set initial text
  text.all = props.comment.text || ''
  text.brief = props.comment.text || ''
})

onBeforeUnmount(() => {
  // Clean up any listeners if needed
})

// Watchers
watch(() => props.widthResizeWindow, () => {
  checkIsShowBtnTextMore()
})

watch(isShow, () => {
  nextTick(() => {
    checkIsShowBtnTextMore()
  })
})

watch(() => props.comment.text, (newText) => {
  text.all = newText || ''
  text.brief = newText || ''
  checkIsShowBtnTextMore()
}, { immediate: true })
</script>

<style lang="scss">
@import "./variables.scss";
.comments-item {
  min-width: 280px;
  &__error-text {
    color: $red;
    margin-bottom: 5px;
  }
  &--delete {
    // Hide parts to keep the "Show more" button
    .comments-item {
      &__col-avatar,
      &__panel-bottom,
      &__content,
      &__col-avatar,
      &__content,
      &__text-box,
      &__panel-bottom {
        display: none;
      }
    }
    // Hide nested item to prevent displaying nested "Show more" button
    .comments-item {
      display: none;
    }
  }
  &__answer-to {
    font-size: 12px;
    color: $blue;
    font-weight: 700;
    cursor: pointer;
    margin-left: 5px;
    &-icon {
      height: 11px !important;
      width: 11px !important;
      fill: $blue !important;
      margin: 0 2px 0 5px;
    }
    &-user {
      position: relative;
      top: -1px;
    }
  }
  &__row {
    &-comment {
      display: flex;
      margin-bottom: 5px;
    }
    &-answer {
      margin-left: 42px;
    }
    &-btn-more {
      margin: 5px 0;
      text-align: center;
    }
  }
  &__col {
    &-avatar {
      border-radius: 50%;
      overflow: hidden;
      height: 32px;
      width: 32px;
      margin-right: 5px;
      margin-top: 8px;
      flex-shrink: 0;
      position: relative;
    }
    &-content {
      @media (max-width: $point-sm) {
        width: 100%;
      }
      &--form-show {
        width: 100%;
      }
    }
  }
  &__avatar-img {
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__content {
    border-radius: 20px;
    background-color: #f0f2f5;
    padding: 10px;
    min-width: 400px;
    @media (max-width: $point-sm) {
      min-width: 100%;
    }
  }
  &__btn-more {
    position: relative;
    color: $blue;
    text-decoration: underline;
    &--answers {
      margin: -2px 5px 0;
      white-space: nowrap;
      @media (max-width: $point-sm-x) {
        font-size: 12px;
      }
    }
  }
  &__text {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    box-orient: vertical;
    &-more {
      margin-top: 5px;
      display: inline-block;
      margin-left: 2px;
      cursor: pointer;
      font-weight: 700;
    }
  }
  &__user-name {
    font-weight: 700;
    margin-bottom: 5px;
    max-width: 195px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__file {
    &-gallery {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      margin-bottom: 5px;
      position: relative;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &.active {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        height: 100%;
        width: 100%;
        background-color: rgba(47, 79, 79, .8);
        border-radius: 0;
        .comments-item {
          &__file-gallery {
            &-arrow {
              &--prev {
                left: 10px;
              }
              &--next {
                right: 10px;
              }
            }
            &-box-img {
              margin-top: 40px;
              height: calc(100% - 80px);
            }
            &-count {
              position: absolute;
              top: 40px;
              color: #fff;
            }
            &-download {
              color: #fff;
            }
            &-closed {
              position: absolute;
              top: 5px;
              right: 5px;
              height: 30px;
              width: 30px;
              fill: #fff;
              cursor: pointer;
            }
          }
        }
      }
      &-download {
        color: $blue;
        display: inline-block;
        z-index: 1;
        &::before {
          position: absolute;
          content: "";
          height: 100%;
          width: 100%;
        }
        svg {
          fill: #fff;
        }
      }
      &-count {
        text-align: center;
        color: $gray;
        margin-bottom: 5px;
      }
      &-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, .5);
        svg {
          height: 25px;
          width: 25px;
          fill: rgba(0, 0, 0, .7);
        }
        &--prev {
          left: 0;
        }
        &--next {
          right: 0;
        }
      }
      &-box-img {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 10px;
        overflow: hidden;
        height: 200px;
        max-width: 100%;
        cursor: pointer;
        position: relative;
      }
      &-img {
        max-width: 100%;
        max-height: 100%;
      }
      &-icon {
        svg {
          width: 40px !important;
          height: 40px !important;
          margin-bottom: 5px;
        }
      }
      &-text {
        font-size: 12px;
      }
    }
  }
  &__panel-top {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  &__panel-bottom {
    margin: 5px 0;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    color: $gray;
    font-size: 12px;
    &-col {
      display: flex;
      &--1 {
        @media (max-width: $point-sm) {
          flex-direction: column-reverse;
        }
      }
      &--2 {
        align-items: flex-start;
      }
    }
  }
  &__btn-cancel-editing {
    margin-right: 40px;
    padding: 2px 10px;
    background-color: $blue;
    color: #fff;
    cursor: pointer;
    border-radius: 3px;
  }
  &__date-update {
    text-align: right;
    font-size: 10px;
    color: $gray;
    margin-top: 3px;
  }
  &__date-create {
    white-space: nowrap;
  }
  &__btn-settings {
    cursor: pointer;
  }
  &__settings {
    background: #fff;
    width: 140px;
    padding: 5px;
    border-radius: 5px;
    position: absolute;
    right: -10px;
    top: -5px;
    z-index: 1;
    box-shadow: 0 0 5px rgb(0 0 0 / 50%);
    &-item {
      margin: 10px 0;
      cursor: pointer;
      display: inline-flex;
    }
    &-icon {
      height: 12px !important;
      margin-right: 10px;
    }
    &-closed {
      position: absolute;
      right: 3px;
      top: 3px;
      cursor: pointer;
    }
  }
  &__btn-ansfer {
    cursor: pointer;
    margin-right: 10px;
    font-weight: 700;
  }
  &__vote {
    display: flex;
    position: relative;
    .comments-spiner {
      background: transparent !important;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
    &-btn {
      margin-right: 5px;
      cursor: pointer;
      height: 15px !important;
      width: 15px !important;
      &.active {
        fill: $blue;
      }
    }
  }
}
</style>
