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
          <!-- text -->
          <div class="comments-item__text-box">
            <div class="comments-item__text" :style="isTextBriefЕxpand ? { 'line-clamp': options.text.briefMaxLine } : {}" v-html="isTextBriefЕxpand ? text.brief : text.all" ref="text"></div>
            <span class="comments-item__text-more" @click="toggleTextBrief(comment.text)" v-if="isTextBrief">{{ isTextBriefЕxpand ? options.translation.btnExpand : options.translation.btnCollapse }}</span>
            <div class="comments-item__date-update" v-if="comment.dateUpdate">
              <b>{{ options.translation.dateEditedText }}</b> {{ formatDate(comment.dateUpdate) }}
            </div>
          </div>
        </div>
        <!-- panel-bottom -->
        <div class="comments-item__panel-bottom" v-if="!isEdited">
          <div class="comments-item__panel-bottom-col--1">
            <div class="comments-item__btn-ansfer" @click="toggleForm()" v-if="options.btnAnswerShowAlways || options.user.auth">{{ options.translation.btnAnswer }}</div>
            <div class="comments-item__date-create">{{ formatDate(comment.dateCreate) }}</div>
          </div>
          <div class="comments-item__panel-bottom-col--2">
            <!-- btn-more - button to show deeply nested comments (for which there is no id) / replies -->
            <button class="comments-item__btn-more--answers" v-if="mapItems[comment.id].quantity && (mapItems[comment.id].items.length == 0 || (options.list.secondShowStart == 0 && !mapItems[comment.id].qShowNext))" @click="showComments({ parentId: comment.id, insertTo: 'after' })">
              {{ options.translation.btnMoreAnswers }}
              <div class="comments-spiner" v-if="mapItems[comment.id].isProcessing">
                <div class="comments-spiner__element"></div>
              </div>
            </button>
            <!-- like | dislike -->
            <div class="comments-item__vote" v-if="options.isShowVote">
              <div class="comments-spiner" v-if="isVoteSending">
                <div class="comments-spiner__element"></div>
              </div>
              <div class="comments-item__vote-item">
                <svg class="comments-item__vote-btn" @click="sendVote(1, comment)" :class="{ active: comment.voteValue == 1 }">
                  <use :xlink:href="`#vue-comments-symbol-icon-like`"></use>
                </svg>
                <div class="comments-item__vote-count">{{ comment.like || "" }}</div>
              </div>
              <div class="comments-item__vote-item">
                <svg class="comments-item__vote-btn" @click="sendVote(-1, comment)" :class="{ active: comment.voteValue == -1 }">
                  <use :xlink:href="`#vue-comments-symbol-icon-dislike`"></use>
                </svg>
                <div class="comments-item__vote-count">{{ comment.dislike || "" }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- btn-more - show more button -->
        <div class="comments-item__row-btn-more" v-if="mapItems[comment.parentId].btnMoreNext == comment.id && mapItems[comment.parentId].qShowBalance > 0">
          <button class="comments-item__btn-more" @click="showComments({ parentId: comment.parentId, insertTo: 'after' })">
            {{ options.translation.btnMore }} ({{ mapItems[comment.parentId].qShowBalance }})
            <div class="comments-spiner" v-if="mapItems[comment.parentId].isProcessing">
              <div class="comments-spiner__element"></div>
            </div>
          </button>
        </div>
        <div class="comments-item__panel-form-add" v-show="isFormShow">
          <comments-form :comment="comment" :userNameAnswer="comment.userName" :isEdited="isEdited"></comments-form>
        </div>
        <!-- panel-bottom in edit mode -->
        <div class="comments-item__panel-bottom--edited" v-if="isEdited">
          <div class="comments-item__panel-bottom-col--1">
            <div class="comments-item__date-create">{{ formatDate(comment.dateCreate) }}</div>
          </div>
          <div class="comments-item__panel-bottom-col--2">
            <div class="comments-item__btn-cancel-editing" @click="cancelEditing()">{{ options.translation.btnCancelEditing }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="comments-item__row-answer" v-if="mapItems[comment.id]">
      <comments-item :userNameAnswer="comment.userName" :comments="comments" :mapItems="mapItems" :widthResizeWindow="widthResizeWindow" v-for="answerId in mapItems[comment.id].items" :comment="comments[answerId]" :key="answerId"></comments-item>
    </div>
  </div>
</template>

<script>
import CommentsItem from "./comments-item";
export default CommentsItem;
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
