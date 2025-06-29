<template>
  <div class="comments-form">
    <div class="comments-form__col-avatar" v-if="!isEdited">
      <img class="comments-form__avatar-img" :src="options.user.img" alt="user avatar image" />
    </div>
    <div class="comments-form__col-textarea" @click="checkAuth($event, 'form')">
      <div class="comments-form__textarea" :class="[{ 'comments-form__textarea-error': error }]">
        <div class="comments-spiner" v-if="isFormSending">
          <div class="comments-spiner__element"></div>
        </div>
        <div class="comments-form__textarea-content">
          <div class="comments-form__answer-to" v-if="!isEdited && userNameAnswer">
            <span class="comments-form__answer-to-text">{{ options.translation.formAnswerTo }}</span>
            <span class="comments-form__answer-to-user-name">@{{ userNameAnswer }}</span>
          </div>
          <div class="comments-form__textarea-error-text" v-if="error">{{ error }}</div>
          <!-- Files -->
          <div class="comments-form__file-list" v-if="files.length">
            <div
              class="comments-form__file-item"
              v-for="(file, index) in files"
              :key="index"
              :class="file.isDelete ? 'comments-form__file-item--delete' : ''"
            >
              <span
                class="comments-form__file-btn-delete"
                @click="deleteFile(index)"
                :title="options.translation.fileDelete"
              />
              <span
                class="comments-form__file-btn-restore"
                @click="restoreFile(index)"
                v-if="file.isDelete"
              >
                {{ options.translation.fileRestore }}
              </span>
              <div class="comments-form__file-preview">
                <img
                  class="comments-form__file-preview"
                  :src="options.imgExtensions[file.extension] ? file.src : iconFile"
                  :alt="file.name"
                  :class="`comments-form__file-preview${options.imgExtensions[file.extension] ? '-img' : '-icon'}`"
                >
                <div
                  class="comments-form__file-preview-text"
                  v-if="!options.imgExtensions[file.extension]"
                >
                  {{ file.name }}
                </div>
              </div>
            </div>
          </div>
          <!-- Text field -->
          <textarea
            class="comments-form__message"
            @input="getPosCursor()"
            @click="getPosCursor()"
            :placeholder="options.translation.formPlaceholder"
            ref="textRef"
            v-model="text"
          />
        </div>
        <!-- Panel with buttons -->
        <div class="comments-form__textarea-panel">
          <label
            class="comments-form__textarea-panel-upload-file"
            @click="createFilePreview($event, filesRef?.files)"
            @change="createFilePreview($event, filesRef?.files)"
            v-if="options.isShowBtnUpload"
          >
            <svg class="comments-form__textarea-panel-icon">
              <use :xlink:href="`#vue-comments-symbol-icon-image`"></use>
            </svg>
            <input
              class="comments-form__textarea-panel-upload-file-input"
              type="file"
              ref="filesRef"
              :accept="options.validExtensions.str"
              multiple
            >
          </label>
          <div
            class="comments-form__textarea-panel-emoji-box"
            v-if="options.isShowBtnEmoji"
            data-vue-comments-form-emoji-btn
            ref="emojiButtonRef"
            @touchend="toggleEmojiList(emojiButtonRef, $event)"
            @mouseenter="toggleEmojiList(emojiButtonRef, $event, true)"
            @mouseleave="toggleEmojiList(null, $event, false)"
          >
            <svg class="comments-form__textarea-panel-icon">
              <use :xlink:href="`#vue-comments-symbol-icon-smile`"></use>
            </svg>
          </div>
        </div>
      </div>
      <div
        class="comments-form__message-file-params"
        v-if="options.translation.messageFileParams"
      >
        {{ options.translation.messageFileParams }}
      </div>
    </div>
    <div class="comments-form__col-btn-send">
      <svg class="comments-form__btn-send" @click="sendComment($event)">
        <use :xlink:href="`#vue-comments-symbol-icon-send`"></use>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {inject, nextTick, ref, watch} from 'vue'
import {useFileUpload} from '@/composables/useComments'
import iconFile from './img/icon-file.svg'

// Props
const props = defineProps({
  comment: {
    type: Object,
    default: () => ({})
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  userNameAnswer: {
    type: String,
    default: ''
  }
})

// Injected dependencies
const options = inject('options')
const preparationRequestData = inject('preparationRequestData')
const addCommentToList = inject('addCommentToList')
const editCommentToList = inject('editCommentToList')
const emitMessage = inject('emitMessage')
const toggleForm = inject('toggleForm', null) // Make optional with default null
const toggleEmojiList = inject('toggleEmojiList')
const addEmoji = inject('addEmoji')

// Template refs
const textRef = ref(null)
const filesRef = ref(null)
const emojiButtonRef = ref(null)

// Reactive state
const text = ref('')
const error = ref('')
const isFormSending = ref(false)
const posCursor = ref(0)

// Use composables
const { files, createFilePreview, deleteFile, restoreFile, clearFiles } = useFileUpload()

// Methods
const getExtension = (name) => {
  const match = name.match(/[^.]+$/i)
  return match ? match[0] : ''
}

const createFileList = (dataFiles) => {
  const fileList = []
  for (const item of dataFiles) {
    fileList.push({
      src: item.src,
      extension: getExtension(item.src),
      name: item.name,
      isDelete: false
    })
  }
  return fileList
}

const getPosCursor = () => {
  if (textRef.value) {
    posCursor.value = textRef.value.selectionStart
  }
}

const checkAuth = (event, sourceType) => {
  if (!options.user.auth) {
    event.preventDefault()
    emitMessage({
      type: 'user-no-auth',
      component: 'comments-form',
      sourceType
    })
  }
}

const clearForm = () => {
  text.value = ''
  clearFiles()
  error.value = ''
}

const addEmojiToText = (emoji) => {
  if (textRef.value) {
    const start = textRef.value.selectionStart
    const end = textRef.value.selectionEnd
	text.value = text.value.substring(0, start) + emoji + text.value.substring(end)

    nextTick(() => {
      const newPosition = start + emoji.length
      textRef.value.setSelectionRange(newPosition, newPosition)
      textRef.value.focus()
    })
  }
}

const sendComment = async (event) => {
  checkAuth(event, 'form-send')

  const { user, filesMaxCount, translation, text: textOptions } = options
  const textContent = text.value.trim()
  let isFiles = false
  let countFiles = 0

  if (files.value.length) {
    for (const file of files.value) {
      if (!file.isDelete) {
        countFiles++
        isFiles = true
      }
    }
  }

  // Validation
  if (countFiles > filesMaxCount) {
    error.value = translation.errorFileMaxCount
    return
  }

  if (textContent.length < textOptions.minLength || textContent.length > textOptions.maxLength) {
    error.value = translation.errorTextLength
    return
  }

  if ((!isFiles && !textContent) || !user.auth) return

  isFormSending.value = true
  error.value = ''

  try {
    if (!props.isEdited) {
      await addComment(textContent)
    } else {
      await editComment(textContent)
    }
  } catch (err) {
    error.value = err.message || options.translation.errorFormSend
  } finally {
    isFormSending.value = false
  }
}

const addComment = async (textContent) => {
  const { url, params, send, typeData } = options.dataApi.commentAdd
  const fileList = []

  if (files.value.length) {
    for (const file of files.value) {
      if (!file.isDelete && file.file) {
        fileList.push(file.file)
      }
    }
  }

  const data = preparationRequestData({
    data: {
      text: textContent,
      parentId: props.comment.id || 0,
      files: fileList
    },
    url,
    params,
    typeData
  })

  try {
    const response = await send(data)
    addCommentToList(response)
    clearForm()
    emitMessage({
      type: 'comment-add',
      data: response,
      sourceType: 'form'
    })
  } catch (error) {
    throw new Error(error || options.translation.errorFormSend)
  }
}

const editComment = async (textContent) => {
  const { url, params, send, typeData } = options.dataApi.commentEdit
  const fileList = []

  if (files.value.length) {
    for (const file of files.value) {
      if (!file.isDelete) {
        if (file.file) {
          fileList.push(file.file)
        } else {
          fileList.push({
            src: file.src,
            name: file.name
          })
        }
      }
    }
  }

  const data = preparationRequestData({
    data: {
      id: props.comment.id,
      text: textContent,
      files: fileList
    },
    url,
    params,
    typeData
  })

  try {
    const response = await send(data)
    editCommentToList(props.comment.id, response)
    if (toggleForm) toggleForm(false)
    emitMessage({
      type: 'comment-edit',
      data: response,
      sourceType: 'form'
    })
  } catch (error) {
    throw new Error(error || options.translation.errorFormSend)
  }
}

// Watchers
watch(() => props.isEdited, (newValue) => {
  if (newValue) {
    files.value = createFileList(props.comment.files || [])
    text.value = props.comment.text || ''
  } else {
    clearForm()
  }
  error.value = ''
}, { immediate: true })

// Expose methods for parent components
defineExpose({
  addEmojiToText,
  clearForm
})
</script>

<style lang="scss">
@use "sass:color";
@use "./variables.scss" as *;
.comments-form {
  $height-textarea: 50px;

  display: flex;
  position: relative;
  min-width: 400px;
  @media (max-width: $point-sm) {
    min-width: 280px;
  }
  &__answer-to {
    font-size: 12px;
    color: rgba($blue, .9);
    &-text {
      margin-right: 5px;
    }
    &-user-name {
      font-weight: 700;
      margin-bottom: 2px;
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
    &-textarea {
      width: 100%;
      position: relative;
    }
    &-btn-send {
      display: flex;
      align-items: center;
    }
  }
  &__avatar-img {
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__textarea {
    border: 1px solid $light-gray;
    border-radius: 20px;
    position: relative;
    &-error {
      border-color: $red;
    }
    &-content {
      padding: 10px 15px;
    }
    &-error-text {
      color: $red;
      font-size: 12px;
      margin-bottom: 5px;
    }
    &-panel {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 15px;
      border-top: 1px solid $light-gray;
      &-upload-file {
        cursor: pointer;
        display: flex;
        align-items: center;
        &-input {
          display: none;
        }
      }
      &-emoji-box {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      &-icon {
        height: 16px;
        width: 16px;
        fill: $gray;
        &:hover {
          fill: $blue;
        }
      }
    }
  }
  &__message {
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    min-height: $height-textarea;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.4;
    &::placeholder {
      color: $gray;
    }
  }
  &__message-file-params {
    font-size: 12px;
    color: $gray;
    margin-top: 5px;
  }
  &__btn-send {
    cursor: pointer;
    margin-left: 10px;
    fill: $blue;
    height: 24px;
    width: 24px;
    &:hover {
      fill: color.adjust($blue, $lightness: -10%);
    }
  }
  &__file {
    &-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 10px;
    }
    &-item {
      position: relative;
      border: 1px solid $light-gray;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 80px;
      &--delete {
        opacity: 0.5;
        .comments-form__file-btn-delete {
          display: none;
        }
      }
    }
    &-btn-delete {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: $red;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 10px;
        height: 2px;
        background: white;
        border-radius: 1px;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
    &-btn-restore {
      color: $blue;
      cursor: pointer;
      font-size: 12px;
      text-decoration: underline;
      margin-top: 5px;
    }
    &-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      &-img {
        max-width: 60px;
        max-height: 60px;
        border-radius: 4px;
      }
      &-icon {
        width: 40px;
        height: 40px;
      }
      &-text {
        font-size: 10px;
        text-align: center;
        margin-top: 5px;
        word-break: break-all;
        max-width: 80px;
      }
    }
  }
}
</style>
