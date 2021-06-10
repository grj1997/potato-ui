const {getComponentEntries, outputDirFn, pages} = require('./build/utils')
module.exports = {
  css: { extract: false }, // 强制内联（引用插件的时候就不用再引用css文件了，去掉可以看看效果）
  pages: pages(),
  publicPath: './',
  outputDir: outputDirFn(),
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.npm_lifecycle_script.indexOf('lib') !== -1) {
      config.entry = {...getComponentEntries('packages')}
      console.log('打包文件', config.entry)
    }
    config.output.filename = '[name]/index.js'
  },
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        wrapper: 'article',
        wrapperName: '123',
        raw: true,
        preventExtract: true,
        use: [
          [require('markdown-it-container'), 'tip'],
          [require('markdown-it-container'), 'warning'],
          [require('markdown-it-container'), 'danger'],
          [require('markdown-it-container'), 'details'],
        ],
      })
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')
  }
}
