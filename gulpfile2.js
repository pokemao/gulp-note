const task2 = (callback) => {
    console.log("任务2执行了");
    // 表示这个任务执行完毕了
    callback();
}

module.exports = {
    task2
}

// 通过在命令行使用 npx gulp task2 执行函数task2
// 这个task2任务执行完毕之后会正常终止，因为调用了callback函数
