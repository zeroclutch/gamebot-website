const HtmlWebpackPlugin = require('html-webpack-plugin')
// let target = process.env.BASE_URL

module.exports = 
{
  /* devServer: {
    proxy: {
      '^/api': {
          target,
          changeOrigin: true
      },
    }
  }, */
  outputDir: '../gamebot/dist',
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/buefy.scss';`,
      },
    },
  },
  configureWebpack: {
    // plugins: [
    //   new HtmlWebpackPlugin()
    // ]
  }
}