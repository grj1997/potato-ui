const {resolve, getComponentEntries} = require('./build/utils')
module.exports = {
  css: { extract: false }, // 强制内联（引用插件的时候就不用再引用css文件了，去掉可以看看效果）
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  outputDir: 'lib',
  productionSourceMap: false,
  configureWebpack:{
    entry: {
      ...getComponentEntries('packages'),
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'commonjs2',
      libraryExport: 'default'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')
  }
}
