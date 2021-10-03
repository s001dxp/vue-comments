<template lang="pug">
include /src/assets/pug/index.pug
+b.comments(
  data-vue-comments,
  :class="{ 'comments--lock': isScrollDocument, [optionsInit.yourCssClass]: optionsInit.yourCssClass }"
)
  comments-svg-icons
  // Emoji
  transition(name="fade")
    +e.emoji(
      @mouseleave="toggleEmojiList(null, $event, false)",
      data-vue-comments-emoji-list,
      v-if="emojiList.isShow",
      :style="{ top: `${emojiList.top}px`, left: `${emojiList.left}px` }"
    )
      +e.emoji-list
        +e.SPAN.emoji-list-item(
          v-for="(item, index) in optionsInit.emojiLilst",
          @click="addEmoji(item)",
          :key="index"
        ) {{ item }}
  +e.panel-form-add
    comments-form(v-if="optionsInit.formAddShowAlways || optionsInit.user.auth")
  +e.list(v-if="mapItems[optionsInit.parentIdStart]")
    +e.item(
      v-for="(commentId, i) in mapItems[optionsInit.parentIdStart].items",
      :key="commentId"
    )
      comments-item(:comment="comments[commentId]", :comments="comments", :mapItems="mapItems")
</template>

<script>
import Comments from "./comments";
export default Comments;
</script>

<style lang="sass">
@import "./variables.sass"
.comments
  font-family: Arial, Helvetica, sans-serif
  background-color: #fff
  padding: 10px
  border-radius: 10px
  border: 1px solid $gray-border
  font-size: 14px
  position: relative
  text-align: left
  &--lock
    &::before
      content: ""
      position: absolute
      z-index: 2
      top: 0
      left: 0
      bottom: 0
      right: 0
  &__panel-form-add
    margin-bottom: 5px
  &__list
    overflow-x: auto
  &__emoji
    width: 200px
    box-shadow: 0 0 5px rgba(0,0,0,0.5)
    border-radius: 5px
    position: fixed
    background-color: #fff
    padding: 5px
    z-index: 1
    font-size: 18px
    &-list
      line-height: 1.5
      overflow-y: auto
      height: 110px
      &-item
        margin: 0 2px
        display: inline-flex
        cursor: pointer
    &::before
      content: ""
      width: 0
      height: 0
      border-left: 16px solid transparent
      border-right: 16px solid transparent
      border-bottom: 16px solid #fff
      position: absolute
      top: -16px
      right: 29px
      z-index: 1
    &::after
      content: ""
      width: 0
      height: 0
      border-left: 17px solid transparent
      border-right: 17px solid transparent
      border-bottom: 16px solid rgba(0,0,0,0.5)
      position: absolute
      top: -17px
      right: 28px
  *
    box-sizing: border-box

  b
    font-weight: bold

  svg
    height: 19px
    width: 19px
    fill: $gray

  a
    color: $blue

  button,
  button:active,
  button:focus
    outline: none
    background: transparent
    border: 0
    cursor: pointer

  .fade-enter-active, .fade-leave-active
    transition: opacity .2s
  .fade-enter, .fade-leave-to
    opacity: 0

  .comments-spiner
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: rgba(65, 105, 225, .3)
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
