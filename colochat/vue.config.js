var StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',

    plugins: [
      new StylelintPlugin({
        files: ['**/*.vue']
      })
    ]
  }
};
