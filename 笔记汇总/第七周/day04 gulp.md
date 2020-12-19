# gulp
## 一.gulp 的安装:gun: 

- 自动化打包构建工具 

-   全局工具：是一个工具
-   项目依赖：是一个插件，第三模块，会在项目中使用到
-   gulp模块：在项目的目录中安装

## 二.压缩文件的步骤:gun: 

### 【1】npm init

- 生成项目的配置文件 package.json
  + package.json 中存放依赖包
  + 依赖包分为两种：
    + 开发依赖包，最好切换镜像源下载（显示在"devDependencies"中。）
    + 项目依赖包（显示在"dependencies"中。项目运行时需要的插件 eg: npm install jquery）

### 【2】创建站点

- 创建项目结构（项目中所需要的的文件夹）

#### 01、配置文件package.json

- 安装gulp依赖（开发依赖包），npm install --save-dev gulp + 大点四（第三方模块）

#### 02、开发源码的目录文件 src文件夹

- cmd命令中，在站点文件夹下 md css js html data static sass

- 【1】html
- 【2】css
- 【3】sass
- 【4】js
- 【5】static 静态资源 
- 【6】data 存放数据

#### 03、上线文件 dist文件夹
- 没有的话也会自动创建
#### 04、node_modules
- node_modules（不需要创建，下载依赖时会自动创建） 文件存放开发项目所需要的依赖包，本地开发需要，项目管理是不需要，当你把项目上传到项目管理创库的时候，不需要上传node_modules

#### 05、配置gulpfile文件

-  在项目的根目录中要加一个文件 gulpfile.js ，这个是gulp运行的时候执行的文件。就可以在这个文件中**编写压缩代码的任务**

+ 在gulpfile.js 中导入gulp依赖 `npm install --save-dev gulp` v4版本

```javascript
//在gulpfile.js中导入gulp模块
const gulp = require('gulp')
```

+ 使用gulp创建一个压缩任务（在gulpfile.js写任务 ）

+ 让gulp的命令行中跑起来，帮我们执行压缩css `gulp 任务名称`



## 三.创建压缩任务:gun: 

###   1、把gulp模块引入 gulpfile.js文件中
```javascript
//在gulpfile.js中导入gulp模块
const gulp = require('gulp')
```
### 2、声明一个压缩任务(eg:css)的函数

- **function css(){}，并且这个函数中必须有return**

- 在这个函数中写任务：

```js
	function css(){
        return gulp.src('./src/css/**')
	}
```
####  01、 gulp.src(需要压缩的css文件地址)
- gulp.src('./src/css/index.css') 这样就表示值压缩css下index.css 这个文件，但是我们压缩的是不可能值压缩一个
- gulp.src('./src/css/\**') 找到css这个文件夹中所有的文件进行压缩
#### 02、 找到这些文件之后，就进行压缩
- gulp.pipe() 这个方法就是帮我们做事情的，你可以在中这个括号中写正则把空格去掉，但是这样比较麻烦，已经有别人写好了这个插件（gulp-cssmin），我们直接下载就可以了

- gulp-cssmin这个包的功能就是专门压缩css文件的

- 下载css-min：npm install -D gulp-cssmin

- 导入css-min

```javascript
//导入css依赖包
const cssmin = require('gulp-cssmin')
```

- **pipe(cssmin())** 执行css-min，其实就是在执行压缩css
#### 03、 把压缩的文件放到指定的文件夹中 gulp.dest('你要放到哪里')
- **pipe(gulp.dest('文件路径'))**
- gulp.dest() 是一个方法，需要用pipe() 来执行
    ```js
        function css() {
            return gulp            
                .src('./src/css/**')
                .pipe(cssmin())            
                .pipe(gulp.dest('./dist/css'))
        }
    ```
#### 04、 最后，必须使用exports把这格函数导出，才能使用 
- `exports.css = css;`
#### 05、在命令行输入 `gulp css` 回车就可以看到压缩的结果

### 🍖 整个流程:meat_on_bone: 

```js
//【1】导入gulp模块
const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
//【2】声明压缩任务的函数
function css(){
    return gulp.src('./src/css/**').pipe(cssmin()).pipe(gulp.dest('./dist/css'))
}
//【3】导出
exports.css = css;
//【4】在命令行执行 gulp css
```




## 四.文件所需要的的第三方模块:gun: 

- 压缩css:
  +   npm install -D gulp-cssmin
- 压缩js:
  +   npm install -D gulp-babel@7.0.1 (一定要安装这个指定版本)
  +   npm install -D  babel-core
  +   npm install -D  babel-preset-es2015
  +   npm install -D  gulp-uglify
- 压缩HTML:
  +   npm install -D gulp-htmlmin
- 清除缓存：
  + npm install -D gulp-clean

- webserver
  + npm install -D gulp-webserver	

## 五.创建压缩js代码:gun: 

-   压缩js代码，必须先把ES6的代码转化为es5才能压缩 babel就是转化的
```
     浏览器上其实不识别ES6 语法，gulp也不识别ES6语法
        当你的js文件中有ES6语法，这个压缩的时候，不会把ES6压缩进去
        在压缩js之前，我们应该把ES6转化ES5
        把ES6转化为ES5的插件：
            gulp_bebal
        压缩js的时候，一定要先转化为ES5 然后在进行压缩
        把压缩的代码放在执行的文件
```
```js
    function js() {
        return gulp
            .src('./src/js/**')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(uglify())
            .pipe(gulp.dest('./dist/js'))
    }
```

## 六.创建一个压缩HTML的代码:gun: 

-   压缩HTML的时候必须传递一个参数，为对象
```javascript
    function html() {
        return gulp
            .src('./src/html/**')
            .pipe(htmlmin({
                collapseWhitespace: true, // 表示去除空格
                removeEmptyAttributes: true, // 移出空的属性
                minifyCSS: true, // 压缩 style 标签
                minifyJS: true, // 压缩 script 标签
            }))
            .pipe(gulp.dest('./dist/html'))
    }
```
## 七、创建任务把静态资源放到dist,静态不需要压缩，直接复制放到dist:gun: 

```javascript
    function data() {
        return gulp
            .src('./src/data/**')
            .pipe(gulp.dest('./dist/data'))
    }

    function static() {
        return gulp
            .src('./src/static/**')
            .pipe(gulp.dest('./dist/static'))
    }
```

## 八.清除缓存，也就是在压缩之前可以把缓存清除:gun: 

```js
    function clean() {
        return gulp
            .src(['./dist/**'])
            .pipe(gulpclean())
    }
```

## 九.创建一个多任务执行的任务:gun: 

-   series()按顺序依次执行
-   parallel()中的任务同时执行
```js
    let all = gulp.series(clean, gulp.parallel(css, js, html, data, lib, static));
```
-   在命令行 `gulp all` 就相当于执行这个两个方法中的所有任务

##   十、创建一个webserver的任务 （当压缩完成自动打开我们执行一个页面）:gun:  

```js
function server() {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: "localhost",
            port: 3000, //一般gulp的端口都是3000
            open: './html/index.html',
            livereload: true, // 浏览器自动刷新
        }))
}
```

##  十一、创建一个 实时监听文件变化的任务:gun:  

```js
function watch() {
    // 监听src文件夹下面的文件如果变化的时候，那么就重新压缩
    // gulp.watch('你要监听的文件',你要执行的任务)
    gulp.watch('./src/html/**', html);
    gulp.watch('./src/css/**', css);
    gulp.watch('./src/js/**', js);
    gulp.watch('./src/data/**', data);
    gulp.watch('./src/static/**', static)
}
```

## 十二、总任务:rice: 

```js
    // 把任务导出，只有导出了才能利用这个任务名称来执行这个任务
    exports.css = css;
    exports.js = js;
    exports.html = html;
    exports.data = data;
    exports.static = static;
    exports.clean = clean;
    exports.server = server;
    exports.watch = watch;
    // 总任务。当执行build的时候，就会执行所有的任务
    exports.build = gulp.series(clean, gulp.parallel(css, js, html, data, static), server, watch);
```

```js
//所有代码

//导入gulp模块
const gulp = require('gulp')
//css依赖
const cssmin = require('gulp-cssmin')
//js依赖
const babel = require('gulp-babel')
const gulpuglify = require('gulp-uglify')
//html依赖
const htmlmin = require('gulp-htmlmin')
//清除缓存依赖
const gulpclean = require('gulp-clean')
//webserver
const webserver = require('gulp-webserver')

//css压缩函数
function css() {
    return gulp.src('./src/css/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}
//js压缩函数
/* 
    浏览器上其实不识别ES6 语法，gulp也不识别ES6语法
    当你的js文件中有ES6语法，这个压缩的时候，不会把ES6压缩进去
    在压缩js之前，我们应该把ES6转化ES5
    把ES6转化为ES5的插件：
        gulp_bebal
    压缩js的时候，一定要先转化为ES5 然后在进行压缩
    把压缩的代码放在执行的文件
*/
function js() {
    return gulp
    .src('./src/js/**')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulpuglify())
    .pipe(gulp.dest('./dist/js'))
}

function html(){
    return gulp
    .src('./src/html/**')
    .pipe(htmlmin({
        collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
    })).pipe(gulp.dest('./dist/html'))
}

// 创建任务把静态资源放到dist,静态不需要压缩，直接复制放到dist
function data() {
    return gulp
        .src('./src/data/**')
        .pipe(gulp.dest('./dist/data'))
}

function static() {
    return gulp
        .src('./src/static/**')
        .pipe(gulp.dest('./dist/static'))
}

//清除缓存。当要更新压缩包时，可能因为缓存问题而未压缩完全，所以需要清除缓存
function clean(){
    return gulp.src(['./dist/**']).pipe(gulpclean())
}

// 创建一个webserver的任务（当压缩完成自动打开我们执行一个页面）
function server() {
    return gulp
        .src('./dist')
        .pipe(webserver({
            host: "localhost",
            port: 3000, //一般gulp的端口都是3000
            open: './html/index.html',
            livereload: true, // 浏览器自动刷新
        }))
}


// 创建一个 实时监听文件变化的任务
function watch() {
    // 监听src文件夹下面的文件如果变化的时候，那么就重新压缩
    // gulp.watch('你要监听的文件',你要执行的任务)
    gulp.watch('./src/html/**', html);
    gulp.watch('./src/css/**', css);
    gulp.watch('./src/js/**', js);
    gulp.watch('./src/data/**', data);
    gulp.watch('./src/static/**', static)
}

//导出函数
exports.css = css;
exports.js = js;
exports.html = html;
exports.static = static;
exports.data = data;
exports.watch = watch;
exports.server = server;
exports.clean = clean;
// 总任务。当执行build的时候，就会执行所有的任务
exports.build = gulp.series(clean, gulp.parallel(css, js, html, data, static), server, watch);
```





