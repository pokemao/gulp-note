const { src, dest } = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");

module.exports.default = () => {
  return (
    src("gulpfile1.js")
      // 使用babel对gulpfile1.js这个文件进行处理
      .pipe(
        babel({
          presets: ["@babel/preser-env"],
        })
      )
      // 使用terser对babel处理过后的gulpfile1.js文件进行处理
      .pipe(
        terser({
          mangle: {
            toplevel: true,
          },
        })
      )
      .pipe(dest("./dist"))
  );
};

// 我们可以从babel和terser的使用中看出，webpack是只要在配置文件webpack.config中配置说要求webpack使用babel和terser处理就行了，不用关心使用的顺序
// 而gulp中要关系使用的顺序，先使用谁后用谁的问题
