let path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "^/api/": { target: "http://localhost:4444/" },
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
