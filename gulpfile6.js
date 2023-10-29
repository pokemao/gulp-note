const { series, parallel } = require("gulp");

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
const taskSerier = series(task1, task2);
// 并行组合task1和task2
const taskParallel = parallel(task1, task2);
// 再次串行组合两个组合后的任务
const taskdefault = series(taskParallel, taskSerier)

module.exports.default = taskdefault;

// 先执行taskParallel然后执行taskSerier
// 执行taskParallel: task1和task2同时执行等到2s一起打印"任务1执行了"和"任务2执行了", 然后两个任务都调用的callback表示taskParallel这个并行任务执行完毕，然后开始执行串行任务taskSerier
// 执行taskSerier: 首先task1执行等到2s后task1执行到callback()之后，task2才开始执行

[17:26:14] Starting 'default'...
[17:26:14] Starting 'task1'...
[17:26:14] Starting 'task2'...
任务1执行了
[17:26:16] Finished 'task1' after 2.01 s
任务2执行了
[17:26:17] Finished 'task2' after 2.01 s
[17:26:17] Starting 'task1'...
任务1执行了
[17:26:19] Finished 'task1' after 2.01 s
[17:26:19] Starting 'task2'...
任务2执行了
[17:26:21] Finished 'task2' after 2.01 s
[17:26:21] Finished 'default' after 6.05 s  === 2.01 + 2.01 + 2.01