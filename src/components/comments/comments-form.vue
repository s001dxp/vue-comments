<template lang="pug">
include /src/assets/pug/index.pug
+b.comments-form(@click="checkAuth($event)")
  +e.col-avatar(v-if="!isEdited")
    img.comments-form__avatar-img(:src="options.user.img")
  +e.col-textarea
    +e.textarea(:class="[{ 'comments-form__textarea-error': error }]")
      +b.comments-spiner(v-if="isFormSending")
        +e.element
      +e.textarea-content
        +e.answer-to(v-if="!isEdited && userNameAnswer")
          +e.SPAN.answer-to-text {{ options.translation.formAnswerTo }}
          +e.SPAN.answer-to-user-name @{{ userNameAnswer }}
        +e.textarea-error-text(v-if="error") {{ error }}
        // Файлы
        +e.file-list(v-if="files.length")
          +e.file-item(
            v-for="(file, index) in files",
            :key="index",
            :class="file.isDelete ? 'comments-form__file-item--delete' : ''"
          )
            +e.SPAN.file-btn-delete(
              @click="deleteFile(index)",
              :title="options.translation.fileDelete"
            )
            +e.SPAN.file-btn-restore(@click="restoreFile(index)", v-if="file.isDelete") {{ options.translation.fileRestore }}
            +e.file-preview
              img.comments-form__file-preview(
                :src="options.imgExtensions[file.extension] ? file.src : iconFile",
                :alt="file.name",
                :class="`comments-form__file-preview${options.imgExtensions[file.extension] ? '-img' : '-icon'}`"
              )
              +e.file-preview-text(v-if="!options.imgExtensions[file.extension]") {{ file.name }}
        // Поле для текста
        +e.TEXTAREA.message(
          @input="getPosCursor()",
          @click="getPosCursor()",
          :placeholder="options.translation.formPlaceholder",
          ref="text",
          v-model="text"
        )
      // Панель с кнопками 
      +e.textarea-panel
        +e.LABEL.textarea-panel-upload-file(@change="createFilePreview($refs.files.files)")
          +e.SVG.textarea-panel-icon
            use(:xlink:href="`#vue-comments-symbol-icon-image`")
          +e.INPUT.textarea-panel-upload-file-input(
            type="file",
            ref="files",
            :accept="options.validExtensions.str",
            multiple
          )
        +e.textarea-panel-emoji-box(
          data-vue-comments-form-emoji-btn,
          @touchend="toggleEmojiList(this, $event)",
          @mouseenter="toggleEmojiList(this, $event, true)",
          @mouseleave="toggleEmojiList(null, $event, false)"
        )
          +e.SVG.textarea-panel-icon
            use(:xlink:href="`#vue-comments-symbol-icon-smile`")
    +e.message-file-params(v-if="options.translation.messageFileParams") {{ options.translation.messageFileParams }}
  +e.col-btn-send
    +e.SVG.btn-send(@click="sendComment()")
      use(:xlink:href="`#vue-comments-symbol-icon-send`")
</template>

<script>
import CommentsForm from "./comments-form";
export default CommentsForm;
</script>

<style lang="sass">
@import "./variables.sass"
.comments-form
  $height-textarea: 50px

  display: flex
  position: relative
  min-width: 400px
  @media (max-width: $point-sm)
    min-width: 280px
  &__answer-to
    font-size: 12px
    color: rgba($blue, .9)
    &-text
      margin-right: 5px
    &-user-name
      font-weight: 700
      margin-bottom: 2px
  &__col
    &-avatar
      border-radius: 50%
      overflow: hidden
      height: 32px
      width: 32px
      margin-right: 5px
      margin-top: 8px
      flex-shrink: 0
      position: relative
    &-textarea
      width: 100%
      position: relative
    &-btn-send
      display: flex
      align-items: center
  &__avatar-img
    max-height: 100%
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  &__textarea
    display: flex
    min-height: $height-textarea
    border-radius: 30px
    border: 1px solid $gray-border
    padding: 5px
    // overflow: hidden
    position: relative
    &-content
      width: 100%
      max-height: 200px
      overflow: hidden auto
      margin: 0 8px
    &-panel
      display: flex
      align-items: flex-end
      margin-bottom: 10px
      margin-left: 5px
      @media (max-width: $point-sm)
        flex-direction: column
        justify-content: flex-end
        margin: 5px
      &-emoji-box
        position: relative
        margin-right: 5px
        @media (max-width: $point-sm)
          margin-top: 10px
      &-upload-file
        display: flex
        margin-right: 5px
        &-input
          display: none
      &-icon
        cursor: pointer
        display: flex
    &-error
      &-text
        color: $red
  &__message
    width: 100%
    resize: vertical
    border: 0
    padding: 5px
    min-height: $height-textarea - 10px
    outline: 0
    outline-offset: 0
    font-family: inherit
    overflow: visible
    @media (max-width: $point-sm)
      min-height: 70px
    &::placeholder
      color: rgba(0,0,0,0.5)
      position: relative
      top: 5px
      font-family: inherit
      top: -1px
  &__file
    &-list
      display: flex
      flex-wrap: wrap
    &-item
      display: flex
      align-items: center
      justify-content: center
      width: 140px
      max-height: 140px
      overflow: hidden
      position: relative
      border-radius: 10px
      margin: 3px
      &--delete
        &::before
          position: absolute
          z-index: 1
          height: 100%
          width: 100%
          content: ""
          background-color: rgba($red, .7)
    &-preview
      text-align: center
      padding: 10px
      &-img
        width: 100%
      &-icon
        width: 60px
        height: 60px
      &-name
        font-size: 12px
    &-btn-restore
      position: absolute
      display: inline-block
      padding: 10px
      border: 1px solid #fff
      color: #fff
      text-transform: uppercase
      z-index: 2
      cursor: pointer
    &-btn-delete
      position: absolute
      right: 3px
      top: 3px
      display: flex
      height: 17px
      width: 17px
      background-color: #fff
      border-radius: 50%
      overflow: hidden
      cursor: pointer
      &::before, &::after
        position: absolute
        left: 7px
        top: 2px
        content: ' '
        height: 13px
        width: 3px
        background-color: #000
      &::before
        transform: rotate(45deg)
      &::after
        transform: rotate(-45deg)
  &__btn-send
    height: 22px !important
    width: 22px !important
    margin-bottom: 15px
    margin-left: 5px
    cursor: pointer
  &__message-file-params
    text-align: center
    font-size: 10px
    color: $gray
    padding: 5px
@keyframes animateEmojiList
  from
    opacity: 0
  to
    opacity: 1
</style>
