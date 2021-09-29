<template lang="pug">
include /src/assets/pug/index.pug
+b.comments-item(
  v-if="mapItems[comment.parentId].show[comment.id]",
  :class="{ 'comments-item--delete': mapItems[comment.id].isDelete }"
)
  +e.row-comment
    +e.col-avatar
      img.comments-item__avatar-img(:src="comment.userImg || options.imgDefaultUser")
    +e.col-content(:class="{ 'comments-item__col-content--form-show': isFormShow }")
      +e.content(v-if="!isEdited")
        +e.panel-top
          // user name
          +e.user-name(data-comments-item-user-name) 
            span {{ comment.userName }}
            +e.SPAN.answer-to(v-if="userNameAnswer") 
              +e.SVG.answer-to-icon
                use(:xlink:href="`#vue-comments-symbol-icon-share`")
              +e.answer-to-user(@click="scrollToComment(comment.parentId)") @{{ userNameAnswer }}

          // settings
          +e.btn-settings(
            v-if="comment.isManageEdit || comment.isManageDelete",
            @click="toggleSettings()"
          )
            +e.SVG.btn-settings-icon
              use(:xlink:href="`#vue-comments-symbol-icon-settings`")
            +e.settings(v-if="isShowSettings", @mouseleave="toggleSettings()")
              +b.comments-spiner(v-if="isDeleteSending")
                +e.element
              +e.settings-closed(@mouseup="toggleSettings()")
                svg
                  use(:xlink:href="`#vue-comments-symbol-icon-closed`")
              +e.settings-item(
                v-if="comment.isManageEdit",
                @click="toggleSettings(), toggleEdited(true), toggleForm(true)"
              )
                +e.SVG.settings-icon
                  use(:xlink:href="`#vue-comments-symbol-icon-edit`")
                span {{ options.translation.settingsEdit }}
              br
              +e.settings-item(
                v-if="comment.isManageDelete",
                @click="deleteMessage(comment)"
              )
                +e.SVG.settings-icon
                  use(:xlink:href="`#vue-comments-symbol-icon-delete`")
                span {{ options.translation.settingsDelete }}

        +e.file-gallery(v-if="files.length", :class="{ active: isOpenGallery }")
          // closed
          +e.SVG.file-gallery-closed(v-if="isOpenGallery", @click="hideGallery()")
            use(:xlink:href="`#vue-comments-symbol-icon-closed`")
          // download
          +e.file-gallery-box-img
            img.comments-item__file-gallery(
              @click="showGallery()",
              :src="files[slideNum].type === 'icon' ? iconFile : files[slideNum].src",
              :alt="files[slideNum].name",
              :class="`comments-item__file-gallery-${files[slideNum].type}`"
            )
            // prev
            +e.file-gallery-arrow--prev(
              v-if="files.length > 1",
              @click="leafSlide(-1)"
            )
              svg
                use(:xlink:href="`#vue-comments-symbol-icon-arrow-left`")
            // next
            +e.file-gallery-arrow--next(v-if="files.length > 1", @click="leafSlide(1)")
              svg
                use(:xlink:href="`#vue-comments-symbol-icon-arrow-right`")
            +e.A.file-gallery-download(
              download,
              v-if="files[slideNum].type === 'icon'",
              :href="files[slideNum].src"
            ) {{ options.translation.btnFileDownload }}<br> {{ files[slideNum].name }}

          +e.file-gallery-count(v-if="files.length > 1") <b>{{ slideNum + 1 }}</b> из <b>{{ files.length }}</b>
        // text
        +e.text-box
          +e.text(
            :style="isTextBriefЕxpand ? { 'line-clamp': options.text.briefMaxLine } : {}",
            v-html="isTextBriefЕxpand ? text.brief : text.all"
          )
          +e.SPAN.text-more(@click="toggleTextBrief(comment.text)", v-if="isTextBrief") {{ isTextBriefЕxpand ? options.translation.btnЕxpand : options.translation.btnCollapse }}
          +e.date-update(v-if="comment.dateUpdate") <b>{{ options.translation.dateEditedText }}</b> {{ formatDate(comment.dateUpdate) }}
      // panel-bottom
      +e.panel-bottom(v-if="!isEdited")
        +e.panel-bottom-col--1
          +e.btn-ansfer(
            @click="toggleForm()",
            v-if="options.btnAnswerShowAlways || options.user.auth"
          ) {{ options.translation.btnAnswer }}
          +e.date-create {{ formatDate(comment.dateCreate) }}
        +e.panel-bottom-col--2
          // btn-more - кнопка показать глубоко вложенные комментарии (для которых нет id) / ответы
          +e.BUTTON.btn-more--answers(
            v-if="mapItems[comment.id].quantity && (mapItems[comment.id].items.length == 0 || (options.list.secondShowStart == 0 && !mapItems[comment.id].qShowNext))",
            @click="showComments({ parentId: comment.id, insertTo: 'after' })"
          ) {{ options.translation.btnMoreAnswers }}
            +b.comments-spiner(v-if="mapItems[comment.id].isProcessing")
              +e.element

          // like | dislike
          +e.vote
            +b.comments-spiner(v-if="isVoteSending")
              +e.element
            +e.vote-item
              +e.SVG.vote-btn(
                @click="sendVote(1, comment)",
                :class="{ active: comment.voteValue == 1 }"
              )
                use(:xlink:href="`#vue-comments-symbol-icon-like`")
              +e.vote-count {{ comment.like }}
            +e.vote-item
              +e.SVG.vote-btn(
                @click="sendVote(-1, comment)",
                :class="{ active: comment.voteValue == -1 }"
              )
                use(:xlink:href="`#vue-comments-symbol-icon-dislike`")
              +e.vote-count {{ comment.dislike }}

      // btn-more - кнопка показать еще
      +e.row-btn-more(
        v-if="mapItems[comment.parentId].btnMoreNext == comment.id && mapItems[comment.parentId].qShowBalance > 0"
      )
        +e.BUTTON.btn-more(
          @click="showComments({ parentId: comment.parentId, insertTo: 'after' })"
        ) {{ options.translation.btnMore }} ({{ mapItems[comment.parentId].qShowBalance }})
          +b.comments-spiner(v-if="mapItems[comment.parentId].isProcessing")
            +e.element

      +e.panel-form-add(v-show="isFormShow")
        comments-form(:comment="comment", :userNameAnswer="comment.userName", :isEdited="isEdited")
      // panel-bottom в режиме редактирования
      +e.panel-bottom--edited(v-if="isEdited")
        +e.panel-bottom-col--1
          +e.date-create {{ formatDate(comment.dateCreate) }}
        +e.panel-bottom-col--2
          +e.btn-cancel-editing(@click="cancelEditing()") {{ options.translation.btnСancelEditing }}

  +e.row-answer(v-if="mapItems[comment.id]")
    comments-item(
      :userNameAnswer="comment.userName",
      :comments="comments",
      :mapItems="mapItems",
      v-for="answerId in mapItems[comment.id].items",
      :comment="comments[answerId]",
      :key="answerId"
    )
</template>

<script>
import CommentsItem from "./comments-item";
export default CommentsItem;
</script>

<style lang="sass">
@import "./variables.sass"
.comments-item
  &--delete
    // Скрываем частями чтобы оставалась кнопка "Show more"
    .comments-item
      &__col-avatar,
      &__panel-bottom,
      &__content,
      &__col-avatar,
      &__content,
      &__text-box,
      &__panel-bottom
        display: none
    // Скрываем вложенный item чтобы не отображалась вложенная кнопка "Show more"
    .comments-item
      display: none
  &__answer-to
    font-size: 12px
    color: $blue
    font-weight: 700
    cursor: pointer
    margin-left: 5px
    &-icon
      height: 11px !important
      width: 11px !important
      fill: $blue !important
      margin: 0 2px 0 5px
    &-user
      position: relative
      top: -1px
  &__row
    &-comment
      display: flex
      margin-bottom: 5px
      overflow: auto hidden
    &-answer
      margin-left: 42px
    &-btn-more
      margin: 5px 0
      text-align: center
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
    &-content
      @media (max-width: $point-sm)
        width: 100%
      &--form-show
        width: 100%
  &__avatar-img
    max-height: 100%
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  &__content
    border-radius: 20px
    background-color: #f0f2f5
    padding: 10px
    min-width: 400px
    @media (max-width: $point-sm)
      min-width: 100%
  &__btn-more
    position: relative
    color: $blue
    text-decoration: underline
    &--answers
      margin: -2px 5px 0
      white-space: nowrap
  &__text
    word-break: break-all
    overflow: hidden
    text-overflow: ellipsis
    display: -moz-box
    -moz-box-orient: vertical
    display: -webkit-box
    -webkit-box-orient: vertical
    box-orient: vertical
    &-more
      display: inline-block
      margin-left: 2px
      cursor: pointer
      font-weight: 700
  &__user-name
    font-weight: 700
    margin-bottom: 5px
  &__file
    &-gallery
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      text-align: center
      margin-bottom: 5px
      position: relative
      &.active
        position: fixed
        top: 0
        left: 0
        z-index: 1000
        height: 100%
        width: 100%
        background-color: rgba(47, 79, 79, .8)
        border-radius: 0
        .comments-item
          &__file-gallery
            &-arrow
              &--prev
                left: 10px
              &--next
                right: 10px
            &-box-img
              margin-top: 40px
              height: calc(100% - 80px)
            &-count
              position: absolute
              top: 40px
              color: #fff
            &-download
              color: #fff
            &-closed
              position: absolute
              top: 5px
              right: 5px
              height: 30px
              width: 30px
              fill: #fff
              cursor: pointer
      &-download
        color: $blue
        display: inline-block
        z-index: 1
        &::before
          position: absolute
          content: ""
          height: 100%
          width: 100%
        svg
          fill: #fff
      &-count
        text-align: center
        color: $gray
        margin-bottom: 5px
      &-arrow
        position: absolute
        top: 50%
        transform: translateY(-50%)
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center
        z-index: 1
        height: 30px
        width: 30px
        border-radius: 50%
        background-color: rgba(255, 255, 255, .5)
        svg
          height: 25px
          width: 25px
          fill: rgba(0, 0, 0, .7)
        &--prev
          left: 0
        &--next
          right: 0
      &-box-img
        width: 100%
        display: flex
        align-items: center
        justify-content: center
        flex-direction: column
        border-radius: 10px
        overflow: hidden
        height: 200px
        max-width: 100%
        cursor: pointer
        position: relative
      &-img
        max-width: 100%
        max-height: 100%
      &-icon
        width: 60px
        height: 60px
      &-text
        font-size: 12px
  &__panel-top
    display: flex
    justify-content: space-between
    position: relative
  &__panel-bottom
    margin: 5px 0
    padding-left: 10px
    display: flex
    justify-content: space-between
    color: $gray
    font-size: 12px
    &-col
      display: flex
      &--1
        @media (max-width: $point-sm)
          flex-direction: column-reverse
      &--2
        align-items: flex-start
  &__btn-cancel-editing
    margin-right: 40px
    padding: 2px 10px
    background-color: $blue
    color: #fff
    cursor: pointer
    border-radius: 3px
  &__date-update
    text-align: right
    font-size: 10px
    color: $gray
    margin-top: 3px
  &__date-create
    white-space: nowrap
  &__btn-settings
    cursor: pointer
  &__settings
    background: #fff
    width: 140px
    padding: 5px
    border-radius: 5px
    position: absolute
    right: -10px
    top: -5px
    z-index: 1
    box-shadow: 0 0 5px rgb(0 0 0 / 50%)
    &-item
      margin: 10px 0
      cursor: pointer
      display: inline-flex
    &-icon
      height: 12px !important
      margin-right: 10px
    &-closed
      position: absolute
      right: 3px
      top: 3px
      cursor: pointer
  &__btn-ansfer
    cursor: pointer
    margin-right: 10px
    font-weight: 700
  &__vote
    display: flex
    position: relative
    .comments-spiner
      background: transparent !important
    &-item
      display: flex
      align-items: center
      margin-right: 15px
      &:last-child
        margin-right: 0
    &-btn
      margin-right: 5px
      cursor: pointer
      height: 15px !important
      width: 15px !important
      &.active
        fill: $blue
</style>
