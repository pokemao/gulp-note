const task3 = (callback) => {
    console.log("任务3执行了");
    // 表示这个任务执行完毕了
    callback();
}

// 相当于
/**
 * module.exports = {
 *   default: task3
 * }
 */
module.exports.default = task3

// 通过指定module.exports.default，我们就可以通过在命令行使用 npx gulp 直接执行函数task3
