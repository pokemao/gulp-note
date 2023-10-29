const { series } = require("gulp");

const task1 = (callback) => {
  setTimeout(() => {
    console.log("任务1执行了");
    callback();
  }, 2000);
};
const task2 = (callback) => {
  setTimeout(() => {
    console.log("任务2执行了");
    callback();
  }, 2000);
};

// 串行组合task1和task2
const taskdefault = series(task1, task2);

module.exports.default = taskdefault;

// 串行执行task1然后执行task2
// 首先task1执行等到2s后task1执行到callback()之后，task2才开始执行
