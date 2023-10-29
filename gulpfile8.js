const { src, dest } = require("gulp");
const babel = require("gulp-babel");

module.exports.default = () => {
  return src("gulpfile1.js")
    // 使用babel对gulpfile1.js这个文件进行处理
    .pipe(
      babel({
        presets: ["@babel/preser-env"],
      })
    )
    .pipe(dest("./dist"));
};
