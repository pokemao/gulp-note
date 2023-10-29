const { watch, src, dest } = require("gulp");

const defaultTask = () => {
  // "gulpfile*.js"这个globs表示匹配所有的"gulpfile1.js"，"gulpfile2.js"，"gulpfile3.js"，...
  return src("gulpfile*.js").pipe(dest("./dist"));
};

// 监听"gulpfile1.js"，"gulpfile2.js"，"gulpfile3.js"，...这些文件里面只要有文件发生变化，包括新增或者删除文件就会重新执行defaultTask这个任务
watch("gulpfile*.js", defaultTask);

module.exports.default = defaultTask;
