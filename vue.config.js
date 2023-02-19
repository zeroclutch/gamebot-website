module.exports = 
{
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        pathRewrite: {'^/api': '/api'},
        logLevel: 'debug'
      }
    }
  },
  outputDir: `../${process.env.NODE_ENV}/dist`,
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/variables.scss';`,
      },
    },
  },
  configureWebpack: {
  }
}