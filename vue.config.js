module.exports = 
{
  // devServer: {
  //   proxy: {
  //     '^/api': {
  //         target: 'http://[::1]:8080/api',
  //         secure: false,
  //         changeOrigin: true,
  //         // pathRewrite: {"^/api/": "/api/"},
  //         logLevel: 'debug' 
  //     },
  //   }
  // },
  // devServer: {
  //   host: 'localhost:8080'
  // }, 
  outputDir: `../${process.env.NODE_ENV}/dist`,
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/variables.scss';`,
      },
    },
  },
  // loaders: [
  //   { test: /\.css$/, loader: "css-loader" }
  // ],
  configureWebpack: {
  }
}