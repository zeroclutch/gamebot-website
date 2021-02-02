module.exports = 
{
  devServer: {
    proxy: {
      '^/api': {
          target: 'https://gamebot.rocks',
          pathRewrite: {'^/api' : ''},
          changeOrigin: true
      },
    }
  },
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/buefy.scss';`,
      },
    },
  },
}