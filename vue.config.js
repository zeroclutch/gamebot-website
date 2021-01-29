export default
{
  devServer: {
    proxy: {
        '^/api': {
            target: 'http://localhost:8080',
            pathRewrite: {'^/api' : ''},
            ws: true,
        },
    }
  }
}