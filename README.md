# vue-comments

> Компонент древовидных комментариев для Vue.js 3  **[Demo](https://vue-comments.herokuapp.com/)** (Alpha)

## Возможности
- Добавление / редактирование / удаление комментариев 
- Добавление файлов, если файлов больше одного - просмотр в виде галлереи
- Смайлики
- Преобразование http / https в гиперссылку
- Подгрузка комментариев
- Возможность ограничить отобржение текста по количеству сторк / символов
- Лайки / дизлайки
- Адаптация под мобильные устройства

## Для просмотра локально надо:

##### 1. Скачать данный репозиторий (Front-End) и выполнить следующие команды:

#### Установка

```
npm install
```

#### Запуск в режиме разработки
```
npm run dev
```

##### 2. Скачать репозиторий [Back-End](https://github.com/EvgeniySaschenko/comments-api-server) и выполнить команды из описания:


## Options

#### Example

```js

```

#### Current user
| Parameter | Type | Default | Description |
| --- | :---: | --- | --- |
| name | `String` | User Name | User name |
| img | `String` | image user | User avatar |
| auth | `Boolean` | false | This parameter allows you to add comments if set to "true" |

#### Files
| Parameter | Type | Default | Description |
| --- | :---: | --- | --- |
| filesMaxCount | `Number` | Infinity | Maximum number of files to upload (нужно реализовать) |
| validExtensions | `Array` | ["jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp"] | Allowed file extensions |

#### Comments
| Parameter | Type | Default | Description |
| --- | :---: | --- | --- |
| isScrollToComment | `Boolean` | true | Scroll to added comment |
| text.minLength | `Number` | 0 | Minimum text length (не реализовано) |
| text.maxLength | `Number` | 0 | Maximum text length (не реализовано) |
| text.briefMaxLength | `Number` | 150 | Maximum length of preview text (after which the "More" button is added) |
| text.briefMaxLine | `Number` / `String` | 4 | Maximum number of lines of preview text (after which the "More" button is added).The values "none" and "number greater than 0" |
| list.mainShowStart | `Number` | 5 | **On first boot** The number of comments in the main list before "Show more" |
| list.secondShowStart | `Number` | 1 | **On first boot** The number of comments in the nested list before "Show more" appears |
| list.mainShow | `Number` | 5 | **Сlick "Show more"** The number of comments that are displayed in the main list when you click on the button "Show more" |
| list.secondShow | `Number` | 3 | **Сlick "Show more"** The number of comments that are displayed in the second list when you click on the button "Show more" |
| deleteCommentBefore | `Function` | ```js () => { return new Promise((resolve, reject) => { resolve }``` | You can describe here the action that must be performed before deleting a comment. If resolve () is called, the comment will be removed, unless reject () the comment is removed. |

#### Translation
| Parameter | Type | Default | Description |
| --- | :---: | --- | --- |
| translation.btnAnswer | `String` | Answer | Answer button |
| translation.btnЕxpand | `String` | More | Expand text button |
| translation.btnCollapse | `String` | Collapse | Collapse button |
| translation.btnFileDownload | `String` | Download | File download button |
| translation.fileDelete | `String` | Delete | File delete button |
| translation.fileRestore | `String` | Restore | File restore button |
| translation.dateToday | `String` | Today | Text of today's date "Today" |
| translation.dateYesterday | `String` | Yesterday | Yesterday's date text "Yesterday" |
| translation.dateEditedText | `String` | Edited | Text before editing date |
| translation.settingsDelete | `String` | Delete | Delete setting text |
| translation.settingsEdit | `String` | Edit | Edit setting text |
| translation.btnMore | `String` | Show more | Button "Show more" comments |
| translation.btnMoreAnswers | `String` | Show answers | Button "Show answers" comments |
| translation.formPlaceholder | `String` | Add a comment | Placeholder form |
| translation.btnСancelEditing | `String` | Сancel editing | Answer button |
| translation.formAnswerTo | `String` | Answer to | Phrase in the form when replying to a comment |
| translation.messageFileParams | `String` | Maximum file size 2 Mb, supported extentions "jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp" | Information about the maximum file size and supported extensions |
| translation.errorFormSend | `String` | Error sending form |  |
| translation.errorVoteSend | `String` | Error sending vote |  |
| translation.errorUnexpected | `String` | Unexpected error |  |
| translation.errorGetComments | `String` | Error get comments |  |
| translation.errorFileExtension | `String` | Error file extension |  |
| translation.errorFileSize | `String` | Error file size |  |

#### Data Api
| Parameter | Type | Default | Description |
| --- | :---: | --- | --- |
| dataApi.vote | `Object` | send: `function` <br> url: `"/"`  <br> params.method: `"POST"` <br> typeData: `"form-data"` | Like / Dislike |
| dataApi.commentsListGet | `Object` | send: `function` <br> url: `"/"` <br> params.method: `"GET"` <br> typeData: `"query"` | Get a list of comments |
| dataApi.commentAdd | `Object` | send: `function` <br> url: `"/"` <br> params.method: `"POST"` <br> typeData: `"form-data"` | Add a comment |
| dataApi.commentEdit | `Object` | send: `function` <br> url: `"/"` <br> params.method: `"PUT"` <br> typeData: `"form-data"` | Edit a comment |
| dataApi.commentDelete | `Object` | send: `function` <br> url: `"/"` <br> params.method: `"DELETE"` <br> typeData: `"form-data"` | Delete a comment |

##### Note


`url` - url of the server that processes the request

`typeData` - Indicates how to prepare data for sending to the server. The options could be like this `json`, `query`, `form-data`

`params` - The method of sending is specified here, you can also add additional headers

`send: function` - this function is used to send data to the server, it uses the "fetch" method, if you need to use another method, the "send" function can be replaced with your own, but it must accept and return data as the code below does: 

```js
send: ({ url, params }) => {
  return fetch(url, params).then((response) => {
    if (!response.ok) throw new Error(response);
    return response.json();
  });
}
```

#### Other
| Parameter | Type | Default | Description |
| --- | :---: | --- | --- |
| parentIdStart | `Number` / `String` | 0 | The identifier of the first ancestor |
| emojiLilst | `Array` | ["😀","😃","😄","😁","😆","😅","😂","🤣","😇","😉","😊","🙂","🙃","😋","😌","😍","🥰","😘","😗","😙","😚","🤪","😜","😝","😛","🤑","😎"] | List emoji |
| formAddShowAlways | `Boolean` | true | Using this parameter, you can show or hide the form for adding a comment. This may be needed if you do not want to show the form when the user is not logged in. |
| btnAnswerShowAlways | `Boolean` | true | Use this option to show or hide the Reply to Comment button. This may be needed if you do not want to show the button when the user is not logged in. |
| imgDefaultUser | `String` | image user | Default user avatar. |
