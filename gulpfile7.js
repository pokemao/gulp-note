const {src, dest} = require('gulp')

module.exports.default = () => {
    // readableStream.pipe(WritableStream)
    // src接收一个globs字符串
    // dest接受一个文件夹的相对路径
    return src("gulpfile1.js").pipe(dest('./dist'))
}

// 在执行npx gulp的目录下匹配"gulpfile1.js"这个globs
// 输出到相对于npx gulp的目录下的哪个文件夹下
// 这里指的是读取gulpfile1.js，输出到相对于npx gulp的目录下的dist文件夹下
