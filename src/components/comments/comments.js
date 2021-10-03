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
    // Список комментариев
    commentsData: {
      type: Object,
      default() {
        return {};
      },
    },
    // Индивидуальные настройки
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // Смайлики
      emojiList: {
        isShow: false,
        top: 0,
        left: 0,
      },
      // Указывает на то что изменились размеры документа
      widthResizeWindow: 0,
      // Указывает на то что пользователь ведет пальцем по документу
      isTouchmovieDocument: false,
      // Указывает на то что документ скролится - для блокироки случайных нажатий на мобильном
      isScrollDocument: false,
      // Контекст текущей формы - для того чтобы добавлять смайлы
      contextCommentsForm: null,
      optionsInit: {
        // Кастомный css класс
        yourCssClass: "",
        // Нндификатор первого предка в "mapItems" - с которого начнёт строится список
        parentIdStart: 0,
        // Максимальное количество файлов
        filesMaxCount: Infinity,
        // Максимальный размер файла
        fileMaxSize: 2097152,
        // Допустимые расшырения файлов - передвать как массив
        validExtensions: {
          default: ["jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp"],
          items: {},
          str: "",
        },
        // Расшырения рактинок (нужны для превью чтобы понимать где картинка, а где файл)
        imgExtensions,
        // emoji
        emojiLilst,
        // Проскролить к добавленному комментарию
        isScrollToComment: true,
        // Показывать кнопки для голосования
        isShowVote: true,
        text: {
          // Минимальная длина текста *
          minLength: 0,
          // Максимальная длина текста *
          maxLength: 1000,
          // Длина текста после которой добавляется кнопка "Еще"
          briefMaxLength: 150,
          // Максимальное количество переносов строк которых добавляется кнопка "Еще". Значения "none" и "число больше 0"
          briefMaxLine: 4,
        },
        list: {
          // Кочичество комментриев в главном списка до появления "Показать еще"
          mainShowStart: 5,
          // Кочичество комментриев во вложенном списке до появления "Показать еще"
          secondShowStart: 1,
          // Количество items которые будут показаны после нажатия на "Показать еще", если Infinity то будут отображены все доступные
          mainShow: 5,
          secondShow: 3,
        },
        translation: {
          // Кнопка ответить
          btnAnswer: "Answer",
          // Кнопка развернуть текст
          btnЕxpand: "More",
          // Кнопка свернуть текст
          btnCollapse: "Collapse",
          // Кнопка скачать файл
          btnFileDownload: "Download",
          // Плейсхолдер формы
          formPlaceholder: "Add a comment",
          // Удалить файл
          fileDelete: "Delete",
          // Востановить файл
          fileRestore: "Restore",
          // Текст сегодняшней даты "Сегодня"
          dateToday: "Today",
          // Текст вчерашней даты "Вчера"
          dateYesterday: "Yesterday",
          // Текст настройки удалить
          settingsDelete: "Delete",
          // Текст настройки редактировать
          settingsEdit: "Edit",
          // Текст перед датой редактирования
          dateEditedText: "Edited:",
          // Кнопка отменть редактирование
          btnСancelEditing: "Сancel editing",
          // Кнопка показать больше
          btnMore: "Show more",
          // Кнопка показать ответы
          btnMoreAnswers: "Show answers",
          // Фраза в форме при ответе на комментарий
          formAnswerTo: "Answer to",
          // Сообщение о максимальном размере файлв и поддержываемых расшырениях
          messageFileParams:
            "Maximum file size 2 Mb, supported extentions: jpg, png, jpeg, jpeg, gif, svg, wbpp",
          // Ошибки
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
          // Лайки
          vote: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) throw new Error(response);
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "POST",
            },
            // Тип передаваемых данных по умолчанию "form-data", может быть "json" или параметрами запроса "query"
            typeData: "",
          },
          // Получить комментрарии
          commentsListGet: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) throw new Error(response);
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "GET",
            },
            typeData: "query",
          },
          // Добавить комментрарий
          commentAdd: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) throw new Error(response);
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "POST",
            },
            typeData: "",
          },
          // Редактировать комментрарий
          commentEdit: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) throw new Error(response);
                return response.json();
              });
            },
            url: "/",
            params: {
              method: "PUT",
            },
            typeData: "",
          },
          // Редактировать комментрарий
          commentDelete: {
            send: ({ url, params }) => {
              return fetch(url, params).then((response) => {
                if (!response.ok) throw new Error(response);
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
          // Имя пользователя по умолчанию
          name: "User Name",
          // Аватарка по умолчанию
          img: imgDefaultUser,
          // Позволяет писать комментарии если "true" (указывает на то что пользователь авторизован)
          auth: false,
        },
        // Отображать главную форму добаления комменрарие - если пользователь не авторизован
        formAddShowAlways: true,
        // Отображать кнопку "Ответить" - если пользователь не авторизован
        btnAnswerShowAlways: true,
        // Аватар по умолчанию
        imgDefaultUser,
        // Действие преред удалением комментария - после вызова resolve(), комментарий будет удалён
        deleteCommentBefore: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        // Действие после удаления комментария - после вызова resolve(), будет совершено действие
        deleteCommentAfter: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
      },
      // Список комментариев (чтобы можно было мутировать)
      comments: {},
      // Структура описывающая вложенность и отношение комментариев
      mapItems: {},
      // Слушатели
      listeners: {},
      // Комментарии этого пользователя в данной сессии (может понадобится чтобы их отфильтровал бекенд)
      newCommentsIds: {},
    };
  },
  mounted() {
    // Скрываем смайлы при клике по другому элементу
    this.listeners["touchstart"] = (event) => {
      if (
        !event.target.closest("[data-vue-comments-form-emoji-btn]") &&
        !event.target.closest("[data-vue-comments-emoji-list]")
      ) {
        this.emojiList.isShow = false;
      }
    };

    // Событие указывает на то что пользователь не скролит документ
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

    // Указывает на то что пользователь ведет пальцем по документу (нужно для определения причины скрола)
    this.listeners["touchmove"] = () => {
      this.isTouchmovieDocument = true;
    };

    // Блокируем случайные нажатия при скроле (например чтобы юзер случайно не поставил лайк)
    this.listeners["scroll"] = () => {
      if (isTouchDevice() && this.isTouchmovieDocument) {
        this.isScrollDocument = true;
      }
    };

    // Проверяем документ на изменение размеров
    this.listeners["resize"] = debounce(() => {
      this.widthResizeWindow = window.innerWidth;
    }, 500);

    document.addEventListener("touchstart", this.listeners["touchstart"]);
    document.addEventListener("touchend", this.listeners["touchend"]);
    document.addEventListener("touchcancel", this.listeners["touchcancel"]);
    document.addEventListener("touchmove", this.listeners["touchmove"]);
    document.addEventListener("scroll", this.listeners["scroll"]);
    window.addEventListener("resize", this.listeners["resize"]);
  },
  beforeUnmount() {
    document.removeEventListener("touchstart", this.listeners["touchstart"]);
    document.removeEventListener("touchend", this.listeners["touchcancel"]);
    document.removeEventListener("touchcancel", this.listeners["touchcancel"]);
    document.removeEventListener("touchmove", this.listeners["touchmove"]);
    document.removeEventListener("scroll", this.listeners["scroll"]);
    window.removeEventListener("resize", this.listeners["resize"]);
  },

  watch: {
    options: {
      deep: true,
      immediate: true,
      handler() {
        this.initOptions(this.options);
      },
    },
    // Должен стоять 2-м - чтобы стачала обработались options
    commentsData: {
      immediate: true,
      handler() {
        this.initData(this.commentsData);
      },
    },
  },

  methods: {
    // Инициализация данных
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
    // Инициализация опций
    initOptions(options) {
      // Создать объект с допустимыми расшырениями
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

      // Object.assign - заменяет вложенные объекты
      let deepExtend = (optionsInit, options) => {
        for (let item in options) {
          let cur = options[item];
          if (typeof cur === "object" && cur !== null && cur !== Array.isArray(cur)) {
            deepExtend(optionsInit[item], options[item]);
          } else if (options[item] !== undefined) {
            optionsInit[item] = options[item];
          }
        }
      };

      deepExtend(this.optionsInit, options);

      // Если пользователь разлогинился, или если пользователь авторизован но нет аватара - ставим дефолтный аватар
      if (options.user && (!options.user.auth || (options.user.auth && !options.user.img))) {
        this.optionsInit.user.img = this.optionsInit.imgDefaultUser;
      }
      Object.assign(this.optionsInit.validExtensions, createValidExtensions());
    },
    // Добавить пункты в карту
    setMapItems(mapItems, insertTo, checkUnique = false) {
      let isNewList = false;
      for (let parentId in mapItems) {
        if (!(parentId in this.mapItems)) {
          isNewList = true;
          this.mapItems[parentId] = {
            // Выполняется запрос на сервер
            isProcessing: false,
            // Количество потомков
            quantity: mapItems[parentId].quantity,
            // id потомков
            items: [],
            // id комментария в котором отображается кнопка "Показать больше"
            btnMoreNext: null,
            // Количество отображённых потомков
            qShowBalance: 0,
            qShowNext: 0,
            // id отображённых потомков
            show: {},
            // id удалённых потомков (нужно при нажатии на кнопку показать больше)
            delete: [],
            // Указывает на то что этот комментарий удалён
            isDelete: false,
          };
        }
        // Проверка нужна потому что в списке может присутсвовать комментрарий, который был добавлен пользоветелем только что (связано с особенностью выборки на backend)
        if (checkUnique) {
          let uniqueMap = [];
          for (let item of mapItems[parentId].items) {
            if (!this.mapItems[item]) {
              uniqueMap.push(item);
            }
          }
          mapItems[parentId].items = uniqueMap;
        }

        // Устанавливаем количество
        if (mapItems[parentId].quantity) {
          this.mapItems[parentId].quantity = mapItems[parentId].quantity;
        }

        if (insertTo == "before") {
          this.mapItems[parentId].items = [
            ...mapItems[parentId].items,
            ...this.mapItems[parentId].items,
          ];
          this.setMapItemsBefore({ quantityShow: mapItems[parentId].items.length, parentId });
        } else if (insertTo == "after") {
          this.mapItems[parentId].items = [
            ...this.mapItems[parentId].items,
            ...mapItems[parentId].items,
          ];
          let quantityShow = this.calcItemsShow({ isNewList, parentId });
          this.setMapItemsAfter({ quantityShow, parentId });
        }
      }
    },
    // Показать нижние комментарии
    setMapItemsAfter({ quantityShow, parentId }) {
      let idShow = this.mapItems[parentId].btnMoreNext;
      // Показать конкретный комментарий
      for (let i = quantityShow.current; quantityShow.next > i; i++) {
        let item = this.mapItems[this.mapItems[parentId].items[i]];
        this.mapItems[parentId].show[this.mapItems[parentId].items[i]] = true;
        // Чтобы кнопка не стала после комментария который только что добален
        if (!(item && item.isNew)) {
          idShow = this.mapItems[parentId].items[i];
        }
      }
      // Показать кнопку
      this.mapItems[parentId].btnMoreNext = idShow;
      this.mapItems[parentId].qShowNext = quantityShow.next;
      this.mapItems[parentId].qShowBalance = this.mapItems[parentId].quantity - quantityShow.next;
    },
    // Показать верхние комментарии
    setMapItemsBefore({ quantityShow, parentId }) {
      // Показать конкретный комментарий
      for (let i = 0; quantityShow > i; i++) {
        let idShow = this.mapItems[parentId].items[i];
        this.mapItems[parentId].show[idShow] = true;
      }
      this.mapItems[parentId].qShowNext = this.mapItems[parentId].qShowNext + quantityShow;
      this.mapItems[parentId].qShowBalance =
        this.mapItems[parentId].quantity - this.mapItems[parentId].qShowNext;
    },
    // Добавить ссылку на компонент для MapItem
    setMapItemLinkComponent(commentId, component) {
      this.mapItems[commentId].component = component;
    },
    // Определяем количество элементов которые нужно отобразить
    calcItemsShow({ isNewList = false, parentId }) {
      let shiftQShowNext;
      let { qShowNext } = this.mapItems[parentId];
      let { mainShowStart, secondShowStart, mainShow, secondShow } = this.optionsInit.list;

      if (isNewList) {
        let shift = this.optionsInit.parentIdStart == parentId ? mainShowStart : secondShowStart;
        shiftQShowNext =
          this.mapItems[parentId].quantity >= shift
            ? shift
            : shift - (shift - this.mapItems[parentId].quantity);
      } else {
        let step = this.optionsInit.parentIdStart == parentId ? mainShow : secondShow;
        let stepMax = qShowNext + step;
        shiftQShowNext =
          this.mapItems[parentId].quantity >= stepMax
            ? stepMax
            : stepMax - (stepMax - this.mapItems[parentId].quantity);
      }

      // Для вложенных комментариев id которых еще нет (3-й уровень вложенности в запросе)

      if (!this.mapItems[parentId].items.length) {
        qShowNext = 0;
        shiftQShowNext = 0;
      }

      return {
        current: qShowNext,
        next: shiftQShowNext,
      };
    },
    // Подгрузить комментарии
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

      let response = await send({ url: data.url, params: data.params });

      return response;
    },
    // Показать комментарии
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
      // Если загруженных комментариев недостатчно, делаем запрос на бекенд
      // itemsLength == 0 && currentState.quantity > 0 - это для глубоко вложенных - для которых нет id
      if (quantityShow.next > itemsLength || (itemsLength == 0 && currentState.quantity > 0)) {
        // Последний или первый id
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
          // Учитывает удалённые комментарии
          mapItems[parentId].quantity =
            mapItems[parentId].quantity + this.mapItems[parentId].delete.length;
          // Параметр "true" указывает что нужно будет проверять сущетвует ли уже такой комментрарий
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
        сurentItem: currentState,
        error: this.error,
      });

      currentState.isProcessing = false;
    },
    // Добавить cписок комментариев (которые получены с бекенда) в общий список
    addCommentsListToList(items) {
      Object.assign(this.comments, items);
    },
    // Добавить новый коментарий (который написал этот пользователь) в общий список
    addCommentToList(comment, insertTo) {
      // Создаём для данного комментария mapItems
      this.setMapItems(
        {
          [comment.id]: {
            items: [],
            quantity: 0,
          },
        },
        insertTo
      );
      // isNew не будет использоватся в качестве lastId
      this.mapItems[comment.id].isNew = true;
      // Добавляем его в mapItems предка
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
      // Скролим к добавленному комментарию
      if (insertTo == "after" && this.optionsInit.isScrollToComment) {
        this.$nextTick(() => {
          this.scrollToComment(comment.id);
        });
      }
      // ID комментариев которые добавил этот пользователь
      if (!this.newCommentsIds[comment.parentId]) {
        this.newCommentsIds[comment.parentId] = [];
      }
      this.newCommentsIds[comment.parentId].push(comment.id);

      return comment;
    },
    // Редактировать комментарий
    editCommentToList(response) {
      Object.assign(this.comments[response.id], response);
      return this.comments[response.id];
    },
    // Удалить комментарий
    async deleteCommentToList({ commentId, parentId }) {
      await this.optionsInit.deleteCommentBefore();
      this.mapItems[commentId].isDelete = true;
      this.mapItems[parentId].delete.push(commentId);
      await this.optionsInit.deleteCommentAfter();
    },
    // Скролим к комментарию
    scrollToComment(commentId) {
      let element = this.mapItems[commentId].component.$el;
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    // Добавить / убрать лайк
    addCommentVote(voteData) {
      Object.assign(this.comments[voteData.id], voteData);
      return this.comments[voteData.id];
    },
    // Подготовить данные для отправки
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
    // Создать событие на компоненте
    emitMessage({ type = "", sourceType = "", component = null, сurentItem = null, error = null }) {
      this.$emit("message-comment", {
        сurentItem,
        items: this.comments,
        mapItems: this.mapItems,
        component,
        error,
        type,
        sourceType,
      });
    },
    // Показать / Скрыть список Emoji
    // context - нужен для "addEmoji"
    toggleEmojiList(context, event, isShow = !this.emojiList.isShow) {
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
    // Добаввить Emoji в текстовое поле
    addEmoji(emoji) {
      this.contextCommentsForm.text = this.contextCommentsForm.text + emoji;
    },
  },
};
