module.exports = 
{
  devServer: {
    proxy: {
        '^/api': {
            target: 'http://localhost:8080',
            pathRewrite: {'^/api' : ''},
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