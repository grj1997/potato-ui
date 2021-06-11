const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = (dir) => path.join(__dirname, '../', dir)

module.exports = {
  resolve,
  getComponentEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const componentEntries = files.reduce((ret, item) => {
      const itemPath = join(path, item)
      const isDir = fs.statSync(itemPath).isDirectory();
      if (isDir) {
        ret[item] = resolve(join(itemPath, 'index.js'))
      } else {
        const [name] = item.split('.')
        ret[name] = resolve(`${itemPath}`)
      }
      return ret
    }, {})
    return componentEntries
  },
  outputDirFn() {
    if (process.env.npm_lifecycle_script.indexOf('lib') !== -1) {
      return resolve('lib')
    } else {
      return resolve('dist')
    }
  },
  pages () {
    if (process.env.npm_lifecycle_script.indexOf('lib') !== -1) {
      console.log('lib打包')
      return {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/home.html',
          // 输出文件名
          filename: 'index.html'
        },
      }
    } else {
      return {
        home: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/home.html',
          // 输出文件名
          filename: 'home.html'
        },
        mobile: {
          // page 的入口
          entry: 'src/views/mobile/main.js',
          // 模板来源
          template: 'public/mobile.html',
          // 输出文件名
          filename: 'mobile.html'
        }
      }
    }
  }
}
