let path = require("path");
let config = require("./env.config.js")[process.env.NODE_ENV];

module.exports = {
  devServer: {
    proxy: {
      "^/api/": { target: config.serverApi },
    },
    port: config.port,
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
