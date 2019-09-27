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
  productionSourceMap: false
}
