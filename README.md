# gulp-note
this is a repository about what is gulp and how to use it.

# gulp
1. 一个流程化处理文件工具
2. gulp中的任务值得就是一个个的函数
3. 在gulpfile.js文件中用module.export导出的任务就是公共任务，没有导出的任务就是私有任务
4. gulp中的任务可以是async的，也可以返回promise
5. gulp中的任务(函数)可以通过返回一个stream，promise，event emitter，child process，observable类型来表示任务结束

# gulp和webpack的区别
webpack更像是面向对象编程，他有一套自己的处理流程，并且能过自动理清一个项目的各个文件(各个模块)之间的依赖关系，然后通过配置文件webpack.config来使用webpack的各种能力，就像是C++在代码中直接使用类的能力一样
gulp更像是面向过程编程，通过自己编写处理的过程，他并不知道整个项目的依赖关系是什么样子的，我们要自己决定，从哪个文件开始处理，并行处理还是串行处理，怎么处理这个文件，就像在使用C写过程化代码一样

# gulp1 基本启动方式
```js
const task1 = () => {
    console.log("任务1执行了");
}

module.exports = {
    task1
}

// 通过在命令行使用 npx gulp task1 执行函数task1
// gulp会默认以命令行地址作为相对路径的基路径，寻找 ./gulpfile.js文件，然后gulp会对文件导出的函数进行包装，包装后执行里面导出的task1函数
// 这个task1任务执行完毕之后不会终止，因为gulp规定任务终止有两种条件：1. 调用callback函数；2. 返回特定类型的值
```

# gulp2 任务完成的回调
```js
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
```

# gulp3 默认任务
```js
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
```

# gulp4 串行组合
```js
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
```

# gulp5 并行组合
```js
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
```

# gulp6 串行或者并行组合之后还可以再次组合
```js
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
```

# gulp7 使用gulp内部封装的输入输出流
```js
const {src, dest} = require('gulp')

module.exports.default = () => {
    // readableStream.pipe(WritableStream)
    // src接收一个globs字符串
    // dest接受一个文件夹的相对路径
    return src("gulpfile1.js").pipe(dest('./dist'))
}

// 在执行npx gulp的目录下匹配"gulpfile1.js"这个globs
// 输出到相对于npx gulp的目录下的哪个文件夹下
// 这里指的是读取gulpfile1.js，输出到相对于npx gulp的目录下的dist文件夹下
```

# gulp8 babel处理
```js
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
```

# gulp9 terser处理
```js
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
```

# gulp10 热更新
```js
const { watch, src, dest } = require("gulp");

const defaultTask = () => {
  // "gulpfile*.js"这个globs表示匹配所有的"gulpfile1.js"，"gulpfile2.js"，"gulpfile3.js"，...
  return src("gulpfile*.js").pipe(dest("./dist"));
};

// 监听"gulpfile1.js"，"gulpfile2.js"，"gulpfile3.js"，...这些文件里面只要有文件发生变化，包括新增或者删除文件就会重新执行defaultTask这个任务
watch("gulpfile*.js", defaultTask);

module.exports.default = defaultTask;
```

# gulp11
```js
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
```

# gulp
```js
```

# gulp
```js
```

# gulp
```js
```

# gulp一些插件
1. gulp-htmlmin：对html模板进行压缩
2. gulp-terser
3. gulp-babel
4. gulp-less
5. gulp-postcss
6. gulp-inject
    ```js
    const inject = require('gulp-inject')
    // 前几个任务先把html文件打包到dist下，再把js文件打包到dist下的js文件夹中，把css文件打包到dist下的css文件夹中，
    // 再执行这个任务向dist下的html文件中注入link和script标签，然后把注入好的html文件重新输出到dist文件夹下
    // relative: true表示link和script标签中使用相对路径
    // 要想让inject实现功能还要在被注入的html文件中加上两种注释，表示link和script标签被插入的位置
    /**
     * <!-- inject:css -->
     * <!-- endinject -->
     */
    /**
     * <!-- inject:js -->
     * <!-- endinject -->
     */
    src('./dist/*.html').pipe(inject(src(["./dist/js/*js", "./dist/css/*.css"]), {relative: true}))
    .pipe(dest("./dist"))
    ```
7. browser-sync
    开启本地服务器的一个库
    ```js
        const browserSync = require('browser-sync')
        const { watch } = require('gulp')
        // 搭建本地服务
        const bs = browserSync.create()
        const serve = () => {
            // 监听源文件变化，如果变化了就重新打包到dist文件夹下，然后bs就能监听到dist文件夹下的变化，之后就能重启服务器了
            watch("js文件", 对js文件处理之后注入到html中的任务)
            watch("css文件", 对css文件处理之后注入到html中的任务)
            watch("html文件", 对html文件处理的任务以及对js+css文件处理之后注入到html中的任务)

            bs.init({
                port: 8888,
                // 本地服务器创建完毕之后自动打开
                open: true,
                // 那些文件发生变化的时候进行刷新服务器，让本地服务器重启
                file: "./dist/*",
                server: {
                    // 对那个路径开启本地服务，就像是nginx中配置的静态服务器的路径一样
                    baseDir: "./dist"
                }
            })    
        }
    ```
8. del
    用来删除之前打包生成的文件
    ```js
        const del = require('del')
        // 删除dist文件夹
        // 这里感觉是一个正则❓❓❓❓❓
        del(["dist"])
    ```
9.  
