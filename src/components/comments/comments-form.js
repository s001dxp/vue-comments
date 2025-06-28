import iconFile from "./img/icon-file.svg";

export default {
  name: "CommentsForm",
  inject: [
    "options",
    "preparationRequestData",
    "addCommentToList",
    "editCommentToList",
    "emitMessage",
    "toggleForm",
    "toggleEmojiList",
    "addEmoji",
  ],
  props: {
    comment: {
      type: Object,
      default() {
        return {};
      },
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    userNameAnswer: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      text: "",
      files: [],
      iconFile,
      accept: "",
      error: "",
      // Indicates that the form is currently being submitted
      isFormSending: false,
      // Cursor position
      posCursor: 0,
    };
  },
  watch: {
    isEdited: {
      immediate: true,
      handler() {
        // When editing
        if (this.isEdited) {
          this.files = this.createFileList(this.comment.files);
          this.text = this.comment.text;
        } else {
          // If the cancel button is pressed
          this.clearForm();
        }
        this.error = "";
      },
    },
  },
  methods: {
    // Create file preview
    createFilePreview($event, files) {
      this.checkAuth($event, "form-btn-upload");
      this.error = "";
      let { validExtensions, fileMaxSize, translation } = this.options;
      for (let file of files) {
        let extensionFile = this.getExtension(file.name);
        if (validExtensions.str && !validExtensions.items[extensionFile]) {
          this.error = translation.errorFileExtension;
          continue;
        }
        if (file.size > fileMaxSize) {
          this.error = translation.errorFileSize;
          continue;
        }

        let infoPreview = {
          file,
          src: null,
          extension: extensionFile,
          name: file.name,
          isDelete: false,
        };

        // Images
        if (this.options.imgExtensions[extensionFile]) {
          let reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            infoPreview.src = reader.result;
            this.files.push(infoPreview);
          };

          reader.onerror = () => {
            this.files.push(infoPreview);
          };
        } else {
          // Other files
          this.files.push(infoPreview);
        }
      }
    },
    // File list based on links
    createFileList(dataFiles) {
      let files = [];
      for (let item of dataFiles) {
        files.push({
          src: item.src,
          extension: this.getExtension(item.src),
          name: item.name,
          isDelete: false,
        });
      }
      return files;
    },
    // Get file extension
    getExtension(name) {
      return name.match(/[^.]+$/i)[0];
    },
    // Delete file
    deleteFile(num) {
      this.files[num].isDelete = true;
    },
    // Restore file
    restoreFile(num) {
      this.files[num].isDelete = false;
    },
    // If the user is not authorized, send a message
    checkAuth(event, sourceType) {
      if (!this.options.user.auth) {
        event.preventDefault();
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType,
        });
      }
    },
    // Send message to server
    sendComment(event) {
      this.checkAuth(event, "form-send");
      let { user, filesMaxCount, translation, text } = this.options;
      let textContent = this.text.trim();
      let isFiles = false;
      let coutFiles = 0;
      if (this.files.length) {
        for (let file of this.files) {
          // Check for files
          if (!file.isDelete) {
            coutFiles++;
            isFiles = true;
          }
        }
      }

      // If the number of files exceeds the allowed limit, return an error
      if (coutFiles > filesMaxCount) {
        this.error = translation.errorFileMaxCount;
        return;
      }

      // If the text length does not meet the condition, return an error
      if (textContent.length < text.minLength || textContent.length > text.maxLength) {
        this.error = translation.errorTextLength;
        return;
      }

      if ((!isFiles && !textContent) || !user.auth) return;

      this.isFormSending = true;
      this.error = "";
      if (!this.isEdited) {
        this.addComment(textContent);
      } else {
        this.editComment(textContent);
      }
    },
    // Add comment
    addComment(text) {
      let { url, params, send, typeData } = this.options.dataApi.commentAdd;
      let files = [];

      if (this.files.length) {
        for (let file of this.files) {
          if (!file.isDelete) {
            files.push(file.file);
          }
        }
      }

      let data = this.preparationRequestData({
        data: {
          text,
          parentId: this.comment.id || 0,
          files,
        },
        url,
        params,
        typeData,
      });

      send({ url: data.url, params: data.params })
        .then((comment) => {
          try {
            let insertTo = this.options.parentIdStart == comment.parentId ? "before" : "after";
            comment.userName = comment.userName || this.options.user.name;
            this.clearForm();
            this.addCommentToList(comment, insertTo);
            if (this.toggleForm) {
              this.toggleForm();
            }
          } catch (error) {
            this.error = this.options.translation.errorUnexpected;
            console.error(error);
          }
        })
        .catch((error) => {
          this.error = this.options.translation.errorFormSend || error;
          console.error(error);
        })
        .finally(() => {
          this.emitMessage({
            type: "comment-add",
            component: this,
            sourceType: "form",
            error: this.error,
          });
          this.isFormSending = false;
        });
    },
    // Edit comment
    editComment(text) {
      let { url, params, send, typeData } = this.options.dataApi.commentEdit;
      let files = [];
      let uploadedFiles = [];

      if (this.files.length) {
        for (let file of this.files) {
          // New files
          if (file.file && !file.isDelete) {
            files.push(file.file);
          }
          // Information about already uploaded files
          if (!file.file) {
            uploadedFiles.push(file);
          }
        }
      }

      let data = this.preparationRequestData({
        data: {
          text,
          commentId: this.comment.id,
          uploadedFiles: JSON.stringify(uploadedFiles),
          files,
        },
        url,
        params,
        typeData,
      });

      send({ url: data.url, params: data.params })
        .then((response) => {
          try {
            this.editCommentToList(response);
            this.clearForm();
            if (this.toggleForm) {
              this.toggleForm();
            }
          } catch (error) {
            this.error = this.options.translation.errorUnexpected;
            console.error(error);
          }
        })
        .catch((error) => {
          this.error = this.options.translation.errorFormSend || error;
          console.error(error);
        })
        .finally(() => {
          this.emitMessage({
            type: "comment-edit",
            component: this,
            sourceType: "form",
            error: this.error,
          });
          this.isFormSending = false;
        });
    },
    // Clear form
    clearForm() {
      this.text = "";
      this.files = [];
      if (this.$refs.files) {
        this.$refs.files.value = "";
        this.$refs.text.style.height = "auto";
      }
    },
    // Get cursor position (needed for inserting emoji)
    getPosCursor() {
      this.posCursor = this.$refs.text.selectionEnd;
    },
  },
};
