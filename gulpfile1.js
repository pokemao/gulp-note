const task1 = () => {
    console.log("任务1执行了");
}

module.exports = {
    task1
}

// 通过在命令行使用 npx gulp task1 执行函数task1
// gulp会默认以命令行地址作为相对路径的基路径，寻找 ./gulpfile.js文件，然后gulp会对文件导出的函数进行包装，包装后执行里面导出的task1函数
// 这个task1任务执行完毕之后不会终止，因为gulp规定任务终止有两种条件：1. 调用callback函数；2. 返回特定类型的值
