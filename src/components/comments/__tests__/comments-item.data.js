let preparationText = [
  // Без текста
  {
    name: "Пустая строка",
    items: [
      {
        text: "",
        maxLength: "none",
        maxLine: "none",
        result: {
          text: {
            all: "",
            brief: "",
          },
          isTextBrief: false,
        },
      },
      {
        text: "",
        maxLength: 0,
        maxLine: 0,
        result: {
          text: {
            all: "",
            brief: "",
          },
          isTextBrief: false,
        },
      },
      {
        text: "",
        maxLength: 0,
        maxLine: "none",
        result: {
          text: {
            all: "",
            brief: "",
          },
          isTextBrief: false,
        },
      },
      {
        text: "",
        maxLength: "none",
        maxLine: 0,
        result: {
          text: {
            all: "",
            brief: "",
          },
          isTextBrief: false,
        },
      },
      {
        text: "",
        maxLength: 1,
        maxLine: 1,
        result: {
          text: {
            all: "",
            brief: "",
          },
          isTextBrief: false,
        },
      },
    ],
  },
  // Текст без пеносов: параметры "none" / минимальные
  {
    name: 'Текст без пеносов: параметры "none" / минимальные',
    items: [
      {
        text: "t",
        maxLength: "none",
        maxLine: "none",
        result: {
          text: {
            all: "t",
            brief: "t",
          },
          isTextBrief: false,
        },
      },
      {
        text: "t",
        maxLength: 0,
        maxLine: 1,
        result: {
          text: {
            all: "t",
            brief: "...",
          },
          isTextBrief: true,
        },
      },
      {
        text: "t",
        maxLength: 0,
        maxLine: "none",
        result: {
          text: {
            all: "t",
            brief: "...",
          },
          isTextBrief: true,
        },
      },
      {
        text: "t",
        maxLength: "none",
        maxLine: 1,
        result: {
          text: {
            all: "t",
            brief: "t",
          },
          isTextBrief: false,
        },
      },
    ],
  },
  // Текст с пеносами: параметры "none" / минимальные
  {
    name: 'Текст с пеносами: параметры "none" / минимальные',
    items: [
      {
        text: "t\nt",
        maxLength: "none",
        maxLine: "none",
        result: {
          text: {
            all: "t<br/>t",
            brief: "t<br/>t",
          },
          isTextBrief: false,
        },
      },
      {
        text: "t\nt",
        maxLength: 0,
        maxLine: 1,
        result: {
          text: {
            all: "t<br/>t",
            brief: "...",
          },
          isTextBrief: true,
        },
      },
      {
        text: "t\nt",
        maxLength: 1,
        maxLine: 1,
        result: {
          text: {
            all: "t<br/>t",
            brief: "t...",
          },
          isTextBrief: true,
        },
      },
      {
        text: "t\nt",
        maxLength: "none",
        maxLine: 1,
        result: {
          text: {
            all: "t<br/>t",
            brief: "t<br/>t",
          },
          isTextBrief: true,
        },
      },
      {
        text: "t\nt",
        maxLength: 0,
        maxLine: "none",
        result: {
          text: {
            all: "t<br/>t",
            brief: "...",
          },
          isTextBrief: true,
        },
      },
    ],
  },
  // Текст без пеносов: параметры "none" / максимальные
  {
    name: 'Текст без пеносов: параметры "none" / максимальные',
    items: [
      {
        text: "text123",
        maxLength: 7,
        maxLine: "none",
        result: {
          text: {
            all: "text123",
            brief: "text123",
          },
          isTextBrief: false,
        },
      },
      {
        text: "text123",
        maxLength: "none",
        maxLine: 1,
        result: {
          text: {
            all: "text123",
            brief: "text123",
          },
          isTextBrief: false,
        },
      },
      {
        text: "text123",
        maxLength: 7,
        maxLine: 1,
        result: {
          text: {
            all: "text123",
            brief: "text123",
          },
          isTextBrief: false,
        },
      },
    ],
  },
  // Текст с переносами: параметры "none" / максимальные
  {
    name: 'Текст без пеносов: параметры "none" / максимальные',
    items: [
      {
        text: "text123\ntext123",
        maxLength: 15,
        maxLine: "none",
        result: {
          text: {
            all: "text123<br/>text123",
            brief: "text123<br/>text123",
          },
          isTextBrief: false,
        },
      },
      {
        text: "text123\ntext123",
        maxLength: "none",
        maxLine: 2,
        result: {
          text: {
            all: "text123<br/>text123",
            brief: "text123<br/>text123",
          },
          isTextBrief: false,
        },
      },
      {
        text: "text123\ntext123",
        maxLength: 15,
        maxLine: 2,
        result: {
          text: {
            all: "text123<br/>text123",
            brief: "text123<br/>text123",
          },
          isTextBrief: false,
        },
      },
    ],
  },
  // Средние занчания
  {
    name: "Текс без переноса строк и с переносом: средние значения",
    items: [
      {
        text: "text123",
        maxLength: 4,
        maxLine: "none",
        result: {
          text: {
            all: "text123",
            brief: "text...",
          },
          isTextBrief: true,
        },
      },
      {
        text: "text\ntext\ntext\ntext\ntext\ntext",
        maxLength: "none",
        maxLine: 3,
        result: {
          text: {
            all: "text<br/>text<br/>text<br/>text<br/>text<br/>text",
            brief: "text<br/>text<br/>text<br/>text<br/>text<br/>text",
          },
          isTextBrief: true,
        },
      },
      {
        text: "text\ntext\ntext\ntext\ntext\ntext",
        maxLength: 5,
        maxLine: 3,
        result: {
          text: {
            all: "text<br/>text<br/>text<br/>text<br/>text<br/>text",
            brief: "text<br/>...",
          },
          isTextBrief: true,
        },
      },
      {
        text: "text\ntext\ntext\ntext\ntext\ntext",
        maxLength: 6,
        maxLine: 3,
        result: {
          text: {
            all: "text<br/>text<br/>text<br/>text<br/>text<br/>text",
            brief: "text<br/>t...",
          },
          isTextBrief: true,
        },
      },
    ],
  },
  // Текст с ссылками
  {
    name: "Текст с ссылками",
    items: [
      {
        text: "https://www.youtube.com/ text123",
        maxLength: "none",
        maxLine: "none",
        result: {
          text: {
            all:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a> text123',
            brief:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a> text123',
          },
          isTextBrief: false,
        },
      },
      {
        text: "text123 http://www.youtube.com/",
        maxLength: "none",
        maxLine: "none",
        result: {
          text: {
            all:
              'text123 <a href="http://www.youtube.com/" target="_blank">http://www.youtube.com/</a>',
            brief:
              'text123 <a href="http://www.youtube.com/" target="_blank">http://www.youtube.com/</a>',
          },
          isTextBrief: false,
        },
      },
      {
        text: "https://www.youtube.com/\nhttps://www.youtube.com/\nhttps://www.youtube.com/",
        maxLength: 15,
        maxLine: "none",
        result: {
          text: {
            all:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a>',
            brief: '<a href="https://www.youtube.com/" target="_blank">https://www.you...</a>',
          },
          isTextBrief: true,
        },
      },
      {
        text: "https://www.youtube.com/\nhttps://www.youtube.com/\nhttps://www.youtube.com/",
        maxLength: "none",
        maxLine: 2,
        result: {
          text: {
            all:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a>',
            brief:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a>',
          },
          isTextBrief: true,
        },
      },
      {
        text: "https://www.youtube.com/\nhttps://www.youtube.com/\nhttps://www.youtube.com/",
        maxLength: "none",
        maxLine: 3,
        result: {
          text: {
            all:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a>',
            brief:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a>',
          },
          isTextBrief: false,
        },
      },
      {
        text: "https://www.youtube.com/\nhttps://www.youtube.com/\nhttps://www.youtube.com/",
        maxLength: 0,
        maxLine: 2,
        result: {
          text: {
            all:
              '<a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a><br/><a href="https://www.youtube.com/" target="_blank">https://www.youtube.com/</a>',
            brief: "...",
          },
          isTextBrief: true,
        },
      },
    ],
  },
];

module.exports = { preparationText };
