let target = 'https://gamebot.rocks' 

if(process.env.NODE_ENV === 'development') {
  target = 'http://localhost:5000'
}

module.exports = 
{
  devServer: {
    proxy: {
      '^/api': {
          target,
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