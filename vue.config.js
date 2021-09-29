let path = require("path");
let config = require("./env.config.js")[process.env.NODE_ENV];
let SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
  devServer: {
    proxy: {
      "^/api/": { target: config.serverApi },
    },
    disableHostCheck: true,
  },

  configureWebpack: {
    plugins: [new SpriteLoaderPlugin()],
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
