import iconFile from "./img/icon-file.svg";

export default {
  name: "CommentsForm",
  inject: [
    "options",
    "preparationRequestData",
    "addCommentToList",
    "editCommentToList",
    "emitMessage",
    "hideForm",
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
      // Указывает на то что в данный момент выполняется отправка формы
      isFormSending: false,
    };
  },
  watch: {
    isEdited: {
      immediate: true,
      handler() {
        // При редактировании
        if (this.isEdited) {
          this.files = this.createFileList(this.comment.files);
          this.text = this.comment.text;
        } else {
          // Если нажать кнопку отмена
          this.files = [];
          this.text = "";
        }
      },
    },
  },
  methods: {
    // Создание превью файла
    createFilePreview(files) {
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

        // Изображения
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
          // Остальные файлы
          this.files.push(infoPreview);
        }
      }
    },
    // Список файлов на основе ссылок
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
    // Получить расшырение файла
    getExtension(name) {
      return name.match(/[^.]+$/i)[0];
    },
    // Удалить файл
    deleteFile(num) {
      this.files[num].isDelete = true;
    },
    // Востановить файл
    restoreFile(num) {
      this.files[num].isDelete = false;
    },
    // Если пользователь не автроизован, посылаем сообщение
    checkAuth(event) {
      if (!this.options.user.auth) {
        event.preventDefault();
        this.emitMessage({
          type: "user-no-auth",
          component: this,
          sourceType: "form",
        });
      }
    },
    // Отправить сообщение на сервер
    sendComment() {
      let { user, filesMaxCount, translation, text } = this.options;
      let textContent = this.text.trim();
      let isFiles = false;
      let coutFiles = 0;
      if (this.files.length) {
        for (let file of this.files) {
          // Проверяем наличие файлов
          if (!file.isDelete) {
            coutFiles++;
            isFiles = true;
          }
        }
      }

      // Если количество файлов превышает допустимое, возвращаем ошибку
      if (coutFiles > filesMaxCount) {
        this.error = translation.errorFileMaxCount;
        return;
      }

      // Если длина текста не соответсвует условию, возвращаем ошибку
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
    // Добавить комментарий
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
            comment.userName = this.options.user.name;
            this.clearForm();
            this.addCommentToList(comment, insertTo);
            if (this.hideForm) {
              this.hideForm();
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
    // Редактировать комментарий
    editComment(text) {
      let { url, params, send, typeData } = this.options.dataApi.commentEdit;
      let files = [];
      let uploadedFiles = [];

      if (this.files.length) {
        for (let file of this.files) {
          // Новые файлы
          if (file.file && !file.isDelete) {
            files.push(file.file);
          }
          // Информация об уже загруженных файлах
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
            if (this.hideForm) {
              this.hideForm();
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
    // Очистить форму
    clearForm() {
      this.text = "";
      this.files = [];
    },
  },
};
