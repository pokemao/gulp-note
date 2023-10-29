const { src, dest } = require("gulp");

module.exports.default = () => {
  // {base: 'src'} 把匹配到的内容输出到dist文件时，保留在src文件夹下的目录组织形式
  /**
   * 匹配
   * src
   *   js1
   *    main1.js
   *   js2
   *    main2.js
   * 输出
   * dist
   *   js1
   *    main1.js
   *   js2
   *    main2.js
   */
  return src("src/**/*.js", {base: 'src'}).pipe(dest("./dist"));
};
