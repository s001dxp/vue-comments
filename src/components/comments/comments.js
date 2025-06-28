import CommentsItem from "./comments-item.vue";
import CommentsForm from "./comments-form.vue";
import CommentsSvgIcons from "./comments-svg-icons.vue";
import imgDefaultUser from "./img/default-user.png";
import imgExtensions from "./data/img-extensions.json";
import emojiLilst from "./data/emoji.json";
import isTouchDevice from "is-touch-device";
import debounce from "lodash.debounce";

export default {
  name: "Comments",
  components: {
    CommentsItem,
    CommentsForm,
    CommentsSvgIcons,
  },
  provide() {
    return {
      addCommentToList: this.addCommentToList,
      editCommentToList: this.editCommentToList,
      deleteCommentToList: this.deleteCommentToList,
      preparationRequestData: this.preparationRequestData,
      emitMessage: this.emitMessage,
      addCommentVote: this.addCommentVote,
      options: this.optionsInit,
      createListCommentsShow: this.createListCommentsShow,
      showComments: this.showComments,
      setMapItemLinkComponent: this.setMapItemLinkComponent,
      scrollToComment: this.scrollToComment,
      toggleEmojiList: this.toggleEmojiList,
      addEmoji: this.addEmoji,
    };
  },
  props: {
    // Comments list
    commentsData: {
      type: Object,
      default() {
        return {};
      },
    },
    // Individual settings
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // Emojis
      emojiList: {
        isShow: false,
        top: 0,
        left: 0,
      },
      // Indicates that the document dimensions have changed
      widthResizeWindow: 0,
      // Indicates that the user is dragging their finger across the document
      isTouchmovieDocument: false,
      // Indicates that the document is scrolling - to block accidental clicks on mobile
      isScrollDocument: false,
      // Context of the current form - for adding emojis
      contextCommentsForm: null,
      // Coordinates of the right mouse button click in the component
      mousedownCord: {
        pageX: 0,
        pageY: 0,
      },
      // Indicates the presence of a horizontal scroll
      isHorizontalScroll: false,
      optionsInit: {
        // Custom css class
        yourCssClass: "",
        // Identifier of the first ancestor in "mapItems" - from which the list will start building
        parentIdStart: 0,
        // Maximum number of files
        filesMaxCount: Infinity,
        // Maximum file size
        fileMaxSize: 2097152,
        // Allowed file extensions - pass as an array
        validExtensions: {
          default: ["jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp"],
          items: {},
          str: "",
        },
        // Image extensions (needed for preview to understand where the image is and where the file is)
        imgExtensions,
        // emoji
        emojiLilst,
        // Scroll to the added comment
        isScrollToComment: true,
        // Show voting buttons
        isShowVote: true,
        // Show file upload button
        isShowBtnUpload: true,
        // Show emoji list button
        isShowBtnEmoji: true,
        text: {
          // Minimum text length *
          minLength: 0,
          // Maximum text length *
          maxLength: 1000,
          // Text length after which the "More" button is added
          briefMaxLength: 150,
          // Maximum number of line breaks after which the "More" button is added. Values "none" and "number greater than 0"
          briefMaxLine: 4,
        },
        list: {
          // Number of comments in the main list before "Show more" appears
          mainShowStart: 5,
          // Number of comments in the nested list before "Show more" appears
          secondShowStart: 1,
          // Number of items that will be shown after clicking "Show more", if Infinity then all available will be displayed
          mainShow: 5,
          secondShow: 3,
        },
        translation: {
          // Reply button
          btnAnswer: "Answer",
          // Expand text button
          btnExpand: "More",
          // Collapse text button
          btnCollapse: "Collapse",
          // Download file button
          btnFileDownload: "Download",
          // Form placeholder
          formPlaceholder: "Add a comment",
          // Delete file
          fileDelete: "Delete",
          // Restore file
          fileRestore: "Restore",
          // Text for today's date "Today"
          dateToday: "Today",
          // Text for yesterday's date "Yesterday"
          dateYesterday: "Yesterday",
          // Settings text delete
          settingsDelete: "Delete",
          // Settings text edit
          settingsEdit: "Edit",
          // Text before the edit date
          dateEditedText: "Edited:",
          // Cancel editing button
          btnCancelEditing: "Cancel editing",
          // Show more button
          btnMore: "Show more",
          // Show replies button
          btnMoreAnswers: "Show answers",
          // Phrase in the form when replying to a comment
          formAnswerTo: "Answer to",
          // Message about maximum file size and supported extensions
          messageFileParams:
            "Maximum file size 2 Mb, supported extentions: jpg, png, jpeg, jpeg, gif, svg, wbpp",
          // Errors
          errorVoteSend: "Error sending vote",
          errorFormSend: "Error form send",
          errorUnexpected: "Unexpected error",
          errorGetComments: "Error get comments",
          errorFileExtension: "Error file extension",
          errorFileSize: "Error file size",
          errorFileMaxCount: "Error file limit exceeded",
          errorTextLength: "The length of the text must be between 0 and 1000 characters",
        },

        dataApi: {
          // Likes
          vote: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) {
                  return response.json().then((error)=> {
                    throw error?.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "POST",
            },
            // Default data type is "form-data", can be "json" or request parameters "query"
            typeData: "",
          },
          // Get comments
          commentsListGet: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) {
                  return response.json().then((error)=> {
                    throw error?.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "GET",
            },
            typeData: "query",
          },
          // Add comment
          commentAdd: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) {
                  return response.json().then((error)=> {
                    throw error?.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "POST",
            },
            typeData: "",
          },
          // Edit comment
          commentEdit: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) {
                  return response.json().then((error)=> {
                    throw error?.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "PUT",
            },
            typeData: "",
          },
          // Edit comment
          commentDelete: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) {
                  return response.json().then((error)=> {
                    throw error?.error;
                  });
                }
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "DELETE",
            },
            typeData: "",
          },
        },
        user: {
          // Default username
          name: "User Name",
          // Default avatar
          img: imgDefaultUser,
          // Allows writing comments if "true" (indicates that the user is authorized)
          auth: false,
        },
        // Display the main comment adding form - if the user is not authorized
        formAddShowAlways: true,
        // Display the "Reply" button - if the user is not authorized
        btnAnswerShowAlways: true,
        // Default avatar
        imgDefaultUser,
        // Action before deleting a comment - after calling resolve(), the comment will be deleted
        deleteCommentBefore: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        // Action after deleting a comment - after calling resolve(), the action will be performed
        deleteCommentAfter: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
      },
      // List of comments (so they can be mutated)
      comments: {},
      // Structure describing the nesting and relationship of comments
      mapItems: {},
      // Listeners
      listeners: {},
      // Comments from this user in the current session (may be needed for backend filtering)
      newCommentsIds: {},
    };
  },
  mounted() {
    // Hide emojis when clicking on another element
    this.listeners["touchstart"] = (event) => {
      if (
        !event.target.closest("[data-vue-comments-form-emoji-btn]") &&
        !event.target.closest("[data-vue-comments-emoji-list]")
      ) {
        this.emojiList.isShow = false;
      }
    };

    // Event indicates that the user is not scrolling the document
    this.listeners["touchend"] = () => {
      if (isTouchDevice()) {
        this.isScrollDocument = false;
        this.isTouchmovieDocument = false;
      }
    };

    this.listeners["touchcancel"] = () => {
      if (isTouchDevice()) {
        this.isScrollDocument = false;
        this.isTouchmovieDocument = false;
      }
    };

    // Indicates that the user is dragging their finger across the document (needed to determine the cause of scrolling)
    this.listeners["touchmove"] = (_event) => {
      this.isTouchmovieDocument = true;
    };

    // Block accidental clicks during scrolling (e.g., so the user doesn't accidentally like something)
    this.listeners["scroll"] = (_event) => {
      if (isTouchDevice() && this.isTouchmovieDocument) {
        this.isScrollDocument = true;
      }
      this.toggleEmojiList(null, _event, false);
    };

    // Check document for size changes
    this.listeners["resize"] = debounce(() => {
      this.widthResizeWindow = window.innerWidth;
    }, 500);

    document.addEventListener("touchstart", this.listeners["touchstart"]);
    document.addEventListener("touchend", this.listeners["touchend"]);
    document.addEventListener("touchcancel", this.listeners["touchcancel"]);
    document.addEventListener("touchmove", this.listeners["touchmove"]);
    document.addEventListener("scroll", this.listeners["scroll"]);
    window.addEventListener("resize", this.listeners["resize"]);
    document.addEventListener("mouseup", this.setMousedownCord);
  },
  beforeUnmount() {
    document.removeEventListener("touchstart", this.listeners["touchstart"]);
    document.removeEventListener("touchend", this.listeners["touchcancel"]);
    document.removeEventListener("touchcancel", this.listeners["touchcancel"]);
    document.removeEventListener("touchmove", this.listeners["touchmove"]);
    document.removeEventListener("scroll", this.listeners["scroll"]);
    window.removeEventListener("resize", this.listeners["resize"]);
    document.removeEventListener("mouseup", this.setMousedownCord);
  },

  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.initOptions(this.options);
      },
    },
    // Should be second - so that options are processed first
    commentsData: {
      immediate: true,
      handler() {
        this.initData(this.commentsData);
      },
    },
  },

  methods: {
    // Data initialization
    initData(commentsData) {
      let { items = {}, mapItems = {} } = commentsData;
      this.comments = { ...items };

      if (!mapItems[this.optionsInit.parentIdStart]) {
        mapItems[this.optionsInit.parentIdStart] = {
          quantity: 0,
          items: [],
        };
      }
      this.setMapItems(mapItems, "after");
    },
    // Options initialization
    initOptions(options) {
      // Create an object with allowed extensions
      let createValidExtensions = () => {
        let { validExtensions } = options;

        let itemsValidExtensions = {};
        validExtensions = validExtensions || this.optionsInit.validExtensions.default;

        for (let item of validExtensions) {
          itemsValidExtensions[item] = item;
        }

        return {
          items: itemsValidExtensions,
          str: validExtensions.length ? "." + validExtensions.join(",.") : "",
        };
      };

      // Object.assign - replaces nested objects
      let deepExtend = (optionsInit, currentOptions) => {
        for (let item in currentOptions) {
          let cur = currentOptions[item];
          if (typeof cur === "object" && cur !== null && !Array.isArray(cur)) {
            deepExtend(optionsInit[item], cur);
          } else if (currentOptions[item] !== undefined) {
            optionsInit[item] = currentOptions[item];
          }
        }
      };

      deepExtend(this.optionsInit, options);

      // If the user logged out, or if the user is authorized but has no avatar - set the default avatar
      if (options.user && (!options.user.auth || (options.user.auth && !options.user.img))) {
        this.optionsInit.user.img = this.optionsInit.imgDefaultUser;
      }
      Object.assign(this.optionsInit.validExtensions, createValidExtensions());
    },
    // Add items to the map
    setMapItems(mapItems, insertTo, checkUnique = false) {
      let isNewList = false;
      for (let parentId in mapItems) {
        if (!(parentId in this.mapItems)) {
          isNewList = true;
          this.mapItems[parentId] = {
            // Request is being made to the server
            isProcessing: false,
            // Number of descendants
            quantity: mapItems[parentId].quantity,
            // IDs of descendants
            items: [],
            // ID of the comment where the "Show more" button is displayed
            btnMoreNext: null,
            // Number of displayed descendants
            qShowBalance: 0,
            qShowNext: 0,
            // IDs of displayed descendants
            show: {},
            // IDs of deleted descendants (needed when clicking the "Show more" button)
            delete: [],
            // Indicates that this comment is deleted
            isDelete: false,
          };
        }
        // This check is needed because the list may contain a comment that was just added by the user (due to backend selection specifics)
        if (checkUnique) {
          let uniqueMap = [];
          for (let item of mapItems[parentId].items) {
            if (!this.mapItems[item]) {
              uniqueMap.push(item);
            }
          }
          mapItems[parentId].items = uniqueMap;
        }

        // Set the quantity
        if (mapItems[parentId].quantity) {
          this.mapItems[parentId].quantity = mapItems[parentId].quantity;
        }

        if (insertTo === "before") {
          this.mapItems[parentId].items = [
            ...mapItems[parentId].items,
            ...this.mapItems[parentId].items,
          ];
          this.setMapItemsBefore({ quantityShow: mapItems[parentId].items.length, parentId });
        } else if (insertTo === "after") {
          this.mapItems[parentId].items = [
            ...this.mapItems[parentId].items,
            ...mapItems[parentId].items,
          ];
          let quantityShow = this.calcItemsShow({ isNewList, parentId });
          this.setMapItemsAfter({ quantityShow, parentId });
        }
      }
    },
    // Show bottom comments
    setMapItemsAfter({ quantityShow, parentId }) {
      let idShow = this.mapItems[parentId].btnMoreNext;
      // Show a specific comment
      for (let i = quantityShow.current; quantityShow.next > i; i++) {
        let item = this.mapItems[this.mapItems[parentId].items[i]];
        this.mapItems[parentId].show[this.mapItems[parentId].items[i]] = true;
        // So that the button does not appear after a comment that has just been added
        if (!(item && item.isNew)) {
          idShow = this.mapItems[parentId].items[i];
        }
      }
      // Show the button
      this.mapItems[parentId].btnMoreNext = idShow;
      this.mapItems[parentId].qShowNext = quantityShow.next;
      this.mapItems[parentId].qShowBalance = this.mapItems[parentId].quantity - quantityShow.next;
    },
    // Show top comments
    setMapItemsBefore({ quantityShow, parentId }) {
      // Show a specific comment
      for (let i = 0; quantityShow > i; i++) {
        let idShow = this.mapItems[parentId].items[i];
        this.mapItems[parentId].show[idShow] = true;
      }
      this.mapItems[parentId].qShowNext = this.mapItems[parentId].qShowNext + quantityShow;
      this.mapItems[parentId].qShowBalance =
        this.mapItems[parentId].quantity - this.mapItems[parentId].qShowNext;
    },
    // Add a link to the component for MapItem
    setMapItemLinkComponent(commentId, component) {
      this.mapItems[commentId].component = component;
    },
    // Determine the number of elements to display
    calcItemsShow({ isNewList = false, parentId }) {
      let shiftQShowNext;
      let { qShowNext } = this.mapItems[parentId];
      let { mainShowStart, secondShowStart, mainShow, secondShow } = this.optionsInit.list;

      if (isNewList) {
        let shift = this.optionsInit.parentIdStart === parentId ? mainShowStart : secondShowStart;
        shiftQShowNext =
          this.mapItems[parentId].quantity >= shift
            ? shift
            : shift - (shift - this.mapItems[parentId].quantity);
      } else {
        let step = this.optionsInit.parentIdStart === parentId ? mainShow : secondShow;
        let stepMax = qShowNext + step;
        shiftQShowNext =
          this.mapItems[parentId].quantity >= stepMax
            ? stepMax
            : stepMax - (stepMax - this.mapItems[parentId].quantity);
      }

      // For nested comments whose IDs are not yet available (3rd level of nesting in the request)

      if (!this.mapItems[parentId].items.length) {
        qShowNext = 0;
        shiftQShowNext = 0;
      }

      return {
        current: qShowNext,
        next: shiftQShowNext,
      };
    },
    // Load comments
    async getComments({ parentId, firstId, lastId, insertTo }) {
      let { url, params, send, typeData } = this.optionsInit.dataApi.commentsListGet;

      let data = this.preparationRequestData({
        data: {
          parentId,
          firstId,
          lastId,
          insertTo,
          newCommentsIds: this.newCommentsIds[parentId]
            ? this.newCommentsIds[parentId].join(",")
            : "",
        },
        url,
        params,
        typeData,
      });

      return send({ url: data.url, params: data.params });
    },
    // Show comments
    async showComments({ parentId, insertTo }) {
      let currentState = this.mapItems[parentId];
      let itemsLength = currentState.items.length;
      let firstId = 0;
      let lastId = 0;
      let newIds = [];

      if (currentState.isProcessing) return;

      currentState.isProcessing = true;

      let quantityShow = this.calcItemsShow({
        isNewList: !currentState,
        parentId,
        mapItems: this.mapItems,
      });
      // If there are not enough loaded comments, make a request to the backend
      // itemsLength == 0 && currentState.quantity > 0 - this is for deeply nested comments - for which there is no id
      if (quantityShow.next > itemsLength || (itemsLength === 0 && currentState.quantity > 0)) {
        // Last or first id
        if (itemsLength > 0) {
          firstId = currentState.items[0];
          for (let i = itemsLength - 1; i > 0; i--) {
            let id = currentState.items[i];
            if (!this.mapItems[id].isNew && !lastId) {
              lastId = id;
              break;
            } else {
              newIds.push(id);
            }
          }
        }

        let { mapItems, items } = await this.getComments({ firstId, lastId, parentId, insertTo });
        try {
          // Takes into account deleted comments
          mapItems[parentId].quantity =
            mapItems[parentId].quantity + this.mapItems[parentId].delete.length;
          // The "true" parameter indicates that it will be necessary to check if such a comment already exists
          this.setMapItems(mapItems, insertTo, true);
          this.addCommentsListToList(items);
        } catch (error) {
          this.error = this.optionsInit.translation.errorGetComments;
          console.error(error);
        }
      } else {
        this.setMapItemsAfter({ quantityShow, parentId });
      }

      this.emitMessage({
        type: "comments-show",
        component: this,
        sourceType: "btn-more",
        currentItem: currentState,
        error: this.error,
      });

      currentState.isProcessing = false;
    },
    // Add a list of comments (received from the backend) to the general list
    addCommentsListToList(items) {
      Object.assign(this.comments, items);
    },
    // Add a new comment (written by this user) to the general list
    addCommentToList(comment, insertTo) {
      // Create mapItems for this comment
      this.setMapItems(
        {
          [comment.id]: {
            items: [],
            quantity: 0,
          },
        },
        insertTo
      );
      // isNew will not be used as lastId
      this.mapItems[comment.id].isNew = true;
      // Add it to the parent's mapItems
      let mapItems = {
        [comment.parentId]: {
          items: [comment.id],
          quantity: this.mapItems[comment.parentId].quantity + 1,
        },
      };
      this.setMapItems(mapItems, insertTo);

      Object.assign(this.comments, {
        [comment.id]: comment,
      });

      this.mapItems[comment.parentId].show[comment.id] = true;
      // Scroll to the added comment
      if (insertTo === "after" && this.optionsInit.isScrollToComment) {
        this.$nextTick(() => {
          this.scrollToComment(comment.id);
        });
      }
      // IDs of comments added by this user
      if (!this.newCommentsIds[comment.parentId]) {
        this.newCommentsIds[comment.parentId] = [];
      }
      this.newCommentsIds[comment.parentId].push(comment.id);

      return comment;
    },
    // Edit comment
    editCommentToList(response) {
      Object.assign(this.comments[response.id], response);
      return this.comments[response.id];
    },
    // Delete comment
    async deleteCommentToList({ commentId, parentId }) {
      await this.optionsInit.deleteCommentBefore();
      this.mapItems[commentId].isDelete = true;
      this.mapItems[parentId].delete.push(commentId);
      await this.optionsInit.deleteCommentAfter();
    },
    // Scroll to comment
    scrollToComment(commentId) {
      let element = this.mapItems[commentId].component.$el;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    // Add / remove like
    addCommentVote(voteData) {
      Object.assign(this.comments[voteData.id], voteData);
      return this.comments[voteData.id];
    },
    // Prepare data for sending
    preparationRequestData({ data = {}, url, params = {}, typeData }) {
      switch (typeData) {
        case "json": {
          params.body = JSON.stringify(data);
          break;
        }
        case "query":
          {
            let queryParams = Object.keys(data)
              .map((key) => key + "=" + data[key])
              .join("&");
            url = `${url}${url.indexOf("?") + 1 ? "&" : "?"}${queryParams}`;
          }
          break;
        default: {
          let formData = new FormData();
          for (let item in data) {
            if (item === "files") {
              for (let itemAttach of data[item]) {
                formData.append("file", itemAttach);
              }
            } else {
              formData.append(item, data[item]);
            }
          }
          params.body = formData;
          break;
        }
      }
      return {
        params,
        url,
      };
    },
    // Create an event on the component
    emitMessage({ type = "", sourceType = "", component = null, currentItem = null, error = null }) {
      this.$emit("message-comment", {
        currentItem,
        items: this.comments,
        mapItems: this.mapItems,
        component,
        error,
        type,
        sourceType,
      });
    },
    // Show / Hide Emoji list
    // context - needed for \"addEmoji\"
    toggleEmojiList(context, event, isShow = !this.emojiList.isShow) {
      // When scrolling
      if (event.target === document) {
        this.contextCommentsForm = null;
        this.emojiList.isShow = false;
        return;
      }

      let { top, left } = event.target.getBoundingClientRect();
      if (!isTouchDevice()) {
        switch (event.type) {
          case "mouseleave":
            if (
              !event.toElement.closest("[data-vue-comments-form-emoji-btn]") &&
              !event.toElement.closest("[data-vue-comments-emoji-list]")
            ) {
              this.contextCommentsForm = context;
              this.emojiList.isShow = isShow;
            }
            break;
          case "mouseenter":
            this.contextCommentsForm = context;
            this.emojiList.isShow = isShow;
            break;
        }
      } else {
        switch (event.type) {
          case "touchend":
            this.contextCommentsForm = context;
            this.emojiList.isShow = isShow;
            break;
        }
      }

      this.emojiList.top = top + 34;
      this.emojiList.left = left - 146;
    },
    // Add Emoji to the text field
    addEmoji(emoji) {
      let { text, posCursor } = this.contextCommentsForm;
      this.contextCommentsForm.text =
        text.slice(0, posCursor) + emoji + text.slice(posCursor, text.length);
      this.contextCommentsForm.posCursor = posCursor + emoji.length;
    },
    // Set initial click coordinates
    setMousedownCord(event) {
      if (!isTouchDevice()) {
        this.isHorizontalScroll = false;
        switch (event.type) {
          case "mousedown":
            this.mousedownCord = {
              pageX: event.pageX,
              pageY: event.pageY,
            };
            break;
          default:
            this.mousedownCord = {
              pageX: 0,
              pageY: 0,
            };
            break;
        }
      }
    },
    // Horizontal scroll
    setHorizontalScroll(event) {
      let { pageX } = this.mousedownCord;
      let { scrollWidth, clientWidth, scrollLeft } = this.$refs.list;
      let offsetX = event.pageX - pageX;
      let maxOffsetX = scrollWidth - clientWidth;
      if (scrollWidth > clientWidth && pageX && !isTouchDevice()) {
        this.isHorizontalScroll = true;
        if (offsetX < 0) {
          // Scroll right
          offsetX = event.pageX - pageX < maxOffsetX ? event.pageX - pageX : maxOffsetX;
        } else if (offsetX > 0) {
          // Scroll left
          offsetX = Math.abs(event.pageX - pageX) < scrollLeft ? event.pageX - pageX : 0;
        }

        this.$refs.list.scrollTo({
          left: Math.abs(offsetX),
        });
      }
    },
  },
};
