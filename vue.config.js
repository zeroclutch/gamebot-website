const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const outputEnv = () => {
  switch(process.env.NODE_ENV) {
    case 'production':
      return 'production'
    case 'staging':
    case 'development':
    default:
      return 'staging'
  }
}

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
  outputDir: `../${outputEnv()}/dist`,
  // Make variables available in SASS for every components
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/assets/styles/variables.scss';`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new ImageminWebpWebpackPlugin({
        overrideExtension: false,
      }),
    ]
  }
}