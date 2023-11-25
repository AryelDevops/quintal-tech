module.exports = {
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: ["babel-loader", "vue-svg-loader"],
        },
      ],
    },
  },
};
