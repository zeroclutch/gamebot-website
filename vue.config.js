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
  outputDir: `../${process.env.NODE_ENV}/dist`,
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/buefy.scss';`,
      },
    },
  },
  configureWebpack: {
  }
}