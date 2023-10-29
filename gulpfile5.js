const { parallel } = require("gulp");

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

// 并行组合task1和task2
const taskdefault = parallel(task1, task2);

module.exports.default = taskdefault;

// 并行执行task1然后执行task2
// task1和task2同时执行等到2s一起打印"任务1执行了"和"任务2执行了"
