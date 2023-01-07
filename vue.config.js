let path = require("path");
let config = require("./env.config.js")[process.env.NODE_ENV];

const IS_DEV = process.env.NODE_ENV === "development";

// Запуск API сервера
if (IS_DEV) {
  let { fork } = require("child_process");
  let cd = fork("comments-api-server/bin/www");
  cd.on("error", (error) => console.log("Run comments-api-server: port 8888", error));
}

module.exports = {
  devServer: {
    proxy: {
      "^/api/": { target: config.serverApi },
    },
    disableHostCheck: true,
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: "pug-plain-loader",
          options: {
            basedir: path.resolve(__dirname, ""),
          },
        },
      ],
    },
  },
};
