# vue-comments

**<a href="#description">Description</a>** | 
**<a href="#install">Install</a>** | 
**<a href="#usage-example">Usage example</a>** | 
**<a href="#options">Options</a>** | 
**<a href="#events">Events</a>**


**<a href="https://github.com/EvgeniySaschenko/comments-api-server">Example Back-End server</a>**

## Description
<a name="description"></a>
> The tree comment component for **Vue.js 3** **<a href="https://vue-comments.herokuapp.com/" target="_blank">Demo</a>**.<br>
> I draw your attention to the fact that this component is not finished yet, its functionality can be changed, removed and supplemented.<br>
> If you see an error, or you have any suggestions for improving or adding functionality, please create <a href="https://github.com/EvgeniySaschenko/vue-comments/issues">issues</a>

- Add / edit / delete comments.
- Adding files. If there is more than one file - view in the form of a gallery.
- Emoji. **Unicode characters are used as emoji. The representation of the emoji depend of the system. Will be possible that the system don't have all the representations.**
- Convert http / https to hyperlink.
- Loading comments.
- The ability to limit the display of text by the number of lines / characters.
- Likes / Dislikes
- Adaptation for mobile devices.

## Install
<a name="install"></a>

```bash
npm install @saschenko/vue-comments --save
```
or
```bash
yarn add @saschenko/vue-comments
```

```js
import Comments from '@saschenko/vue-comments'
import '@saschenko/vue-comments/dist/vue-comments.css'
```

## Usage example
<a name="usage-example"></a>

`options` -  component settings

`commentsData` - initialization data. The description of the fields can be found at this link: <a target="_blank" href="https://github.com/EvgeniySaschenko/comments-api-server">Back-End</a>

`options.user.auth` - the parameter must be "true" so that the user can leave comments / like.


```js
import Comments from '@saschenko/vue-comments'
import '@saschenko/vue-comments/dist/vue-comments.css'

<Comments :options="options" :commentsData="comments" />

export default {
  components: {
    Comments
  },
  data() {
    return {
      options: {
        dataApi: {
          vote: {
            url: "/api/comments/vote/",
          },
          commentAdd: {
            url: "/api/comments/",
          },
          commentDelete: {
            url: "/api/comments/",
          },
          commentEdit: {
            url: "/api/comments/",
          },
          commentsListGet: {
            url: "/api/comments/",
          },
        },
        user: {
          auth: true,
          name: "Jhon",
          img: "http://vue-comments.herokuapp.com/img/logo.82b9c7a5.png"
        }
      },
      comments: {
        mapItems: {
          0: { items: [1549], quantity: 1 },
          1549: { items: [1550], quantity: 1 },
          1550: { items: [], quantity: 0 },
        },
        items: {
          1549: {
            dateCreate: 1632329876,
            dateUpdate: 1632329889,
            dislike: 0,
            like: 0,
            voteValue: 0,
            files: [],
            id: 1549,
            isManageDelete: false,
            isManageEdit: false,
            parentId: 0,
            text: "text 😇😇😇😇",
            userImg: "http://localhost:8888/images/users/6.jpg",
            userName: "Jhon",
          },
          1550: {
            dateCreate: 1632329876,
            dateUpdate: 1632329889,
            dislike: 2,
            like: 0,
            voteValue: -1,
            files: [
              {
                name: "image 1",
                src: "http://localhost:8888/images/comments/1581_0.jpg",
              },
            ],
            id: 1550,
            isManageDelete: false,
            isManageEdit: false,
            parentId: 1549,
            text: "text text",
            userImg: "",
            userName: "Ivan",
          },
        },
      },
    }
  },
}
```

You can change the `options` after the component has been mounted by using `Object.assign()`:

```js
Object.assign(this.options, { validExtensions: ["jpg"] });
```

If initialization data needs to be received asynchronously, use `v-if` to display the component:

```js
  <Comments v-if="isShow" :commentsData="comments" />

  export default {
    async created() {
      let response = await fetch("/api/comments/?parentId=0", {
        headers: { Cookie: 'user...' },
      });
      let comments = await response.json();
      this.comments = comments;
      this.isShow = true;
    },
    data() {
      return {
        isShow: false,
        comments: {}
      }
    },
  }
```

## Options
<a name="options"></a>

You can change the behavior of the component using the options

### Options description

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
| text.minLength | `Number` | 0 | Minimum text length |
| text.maxLength | `Number` | 1000 | Maximum text length |
| text.briefMaxLength | `Number` | 150 | Maximum length of preview text (after which the "More" button is added) |
| text.briefMaxLine | `Number` / `String` | 4 | Maximum number of lines of preview text (after which the "More" button is added).The values "none" and "number greater than 0" |
| list.mainShowStart | `Number` | 5 | **On first boot** The number of comments in the main list before "Show more" |
| list.secondShowStart | `Number` | 1 | **On first boot** The number of comments in the nested list before "Show more" appears |
| list.mainShow | `Number` | 5 | **Сlick "Show more"** The number of comments that are displayed in the main list when you click on the button "Show more" |
| list.secondShow | `Number` | 3 | **Сlick "Show more"** The number of comments that are displayed in the second list when you click on the button "Show more" |
| deleteCommentBefore | `Function` | `() => <br>{ return new Promise((resolve, reject) => { resolve }` | You can describe here the action that must be performed before deleting a comment. If `resolve()` is called, the comment will be removed, unless `reject()` the comment is removed. |
| deleteCommentAfter | `Function` | `() => <br>{ return new Promise((resolve, reject) => { resolve }` | You can describe here the action that must be performed after deleting a comment. If resolve() is called, the action will be committed, If reject() is called, the action will not be performed. |

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
| translation.messageFileParams | `String` | Maximum file size 2 Mb, supported extentions: jpg, png, jpeg, jpeg, gif, svg, wbpp | Information about the maximum file size and supported extensions |
| translation.errorFormSend | `String` | Error sending form | If this field is replaced with an empty string, the response from the server can be used as an error message (the response must be a string) |
| translation.errorVoteSend | `String` | Error sending vote |  |
| translation.errorUnexpected | `String` | Unexpected error |  |
| translation.errorGetComments | `String` | Error get comments |  |
| translation.errorFileExtension | `String` | Error file extension |  |
| translation.errorFileSize | `String` | Error file size |  |
| translation.errorFileMaxCount | `String` | Error file limit exceeded |  |
| translation.errorTextLength | `String` | The length of the text must be between 0 and 1000 characters |  |


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

`params` - the method of sending is specified here, you can also add additional headers

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
| parentIdStart | `Number` / `String` | 0 | This id is for `mapItems`, it describes the first level of comments. |
| emojiLilst | `Array` | ["😀","😃","😄","😁","😆","😅","😂","🤣","😇","😉","😊","🙂","🙃","😋","😌","😍","🥰","😘","😗","😙","😚","🤪","😜","😝","😛","🤑","😎"] | List emoji |
| formAddShowAlways | `Boolean` | true | Using this parameter, you can show or hide the form for adding a comment. This may be needed if you do not want to show the form when the user is not logged in. |
| btnAnswerShowAlways | `Boolean` | true | Use this option to show or hide the Reply to Comment button. This may be needed if you do not want to show the button when the user is not logged in. |
| imgDefaultUser | `String` | image user | Default user avatar. |
| isShowVote | `Boolean` | true | If true, like / dislike buttons are displayed |
| yourCssClass | `String` |  | You can add your css class to the parent tag |


### Options example

```js
      {
        parentIdStart: 0,
        isShowVote: true,
        yourCssClass: "",
        filesMaxCount: Infinity,
        fileMaxSize: 2097152,
        validExtensions: ["jpg", "png", "jpeg", "jpeg", "gif", "svg", "wbpp"],
        emojiLilst: ["😀","😃","😄","😁","😆","😅","😂","🤣","😇","😉","😊","🙂","🙃","😋","😌","😍","🥰","😘","😗","😙","😚","🤪","😜","😝","😛","🤑","😎"],
        isScrollToComment: true,
        text: {
          minLength: 0,
          maxLength: 1000,
          briefMaxLength: 150,
          briefMaxLine: 4,
        },
        list: {
          mainShowStart: 5,
          secondShowStart: 1,
          mainShow: 5,
          secondShow: 3,
        },
        translation: {
          btnAnswer: "Answer",
          btnЕxpand: "More",
          btnCollapse: "Collapse",
          btnFileDownload: "Download",
          formPlaceholder: "Add a comment",
          fileDelete: "Delete",
          fileRestore: "Restore",
          dateToday: "Today",
          dateYesterday: "Yesterday",
          settingsDelete: "Delete",
          settingsEdit: "Edit",
          dateEditedText: "Edited:",
          btnСancelEditing: "Сancel editing",
          btnMore: "Show more",
          btnMoreAnswers: "Show answers",
          formAnswerTo: "Answer to",
          messageFileParams:
            "Maximum file size 2 Mb, supported extentions: jpg, png, jpeg, jpeg, gif, svg, wbpp",
          errorFormSend: "Error sending form",
          errorVoteSend: "Error sending vote",
          errorUnexpected: "Unexpected error",
          errorGetComments: "Error get comments",
          errorFileExtension: "Error file extension",
          errorFileSize: "Error file size",
          errorFileMaxCount: "Error file limit exceeded",
          errorTextLength: "The length of the text must be between 0 and 1000 characters",
        },

        dataApi: {
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
            typeData: "",
          },
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
          name: "User Name",
          img: "/img/default-user.png",
          auth: false,
        },
        formAddShowAlways: true,
        btnAnswerShowAlways: true,
        imgDefaultUser: "/img/default-user.png",
        deleteCommentBefore: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
        deleteCommentAfter: () => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        },
      }
```

## Events
<a name="events"></a>
You can get information about what action the user has taken (for example, the user has put a like), for this you need to add a <b>message-comment</b> listener to the component

#### Events example

```js
<Comments @message-comment="messageComment($event)" />

export default {
  methods: {
    messageComment(data) {
      console.log(data);
    }
  }
}
```

#### Events description

| Type  | Description |
| --- | --- |
| `comment-add` | Adding a comment|
| `comment-edit` | Editing a comment |
| `comment-delete` | Deleting a comment |
| `comments-show` | By pressing the button "Show more comments" |
| `vote` | Like / Dislike |
| `user-no-auth` | If the user is not logged in |
