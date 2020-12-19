
## 01.node.js的介绍
-   不是一门后端语言，只是一个后端开发的平台（JavaScript语言去编写）
-   思考：为什么js代码能够在浏览器中执行？
    +   因为浏览器中有一个东西叫做js **解析引擎**
    +   这个引擎是专门用来解析 js 的代码的
-   把 浏览器的 **解析引擎** 单独的拿出来
    +   当做一个软件安装在电脑中（安装在命令行中）
    +   那么我们就不需要去浏览器中执行js代码，直接在这个命令行中就可以运行js代码了
-   这个运行在命令行的 js解析引擎，就称之为 node.js

-   javascript 实现前端由：ECMAScript +DOM + BOM组成
-   JavaScript 实现后端由：ECMAScript实现

## 02.用nodejs的形式来运行js代码
-   直接在命令行中写 js代码
    +   现在命令行中 写 node==》回车
    +   编写js代码==》回车
-   创建一个js文件，把js代码写在js文件中，用node运行js文件
    +   创建js文件
    +   在命令行中 把目录切换到你要执行的 js文件的目录下
    +   node 文件名 ===》回车


## 03.常见的Linux命令行
-   `dir`:查看当前目录下的所有文件
-   `tree`:以树状的结构展示当前目录下的所有文件及没目录下的子文件
-   `cd 文件夹名称` 进入当前目录下的一个子目录
-   `cd ..` 返回上一层目录
-   `d:`:切换盘符
-   `md 文件夹名字`：在当前目录下创建一个文件夹
-   `rd 文件夹名字`：删除当前目录下的一个文件夹
-   `xcopy a b`：复制一份a文件夹 起名为 b
-   `type nul>index.js`：在当前目录下创建一个叫index.js的文件
-   `copy index.js test.js` 复制一份index.js文件，起名为test.js
-   `echo console.log("hello world") > index.js`：往index.js中写入内容
-   `type index.js`：查看index.js中的内容
-   `ren index.js abc.js`：给index.js重命名为abc.js
-   `del index.js`：删除index.js文件
-   `move index.js a`：把index.js移动到a这个目录下
-   `cls`：清空当前命令行的中的代码
-   `ipconfig`：查看电脑的IP信息
-   `ping www.baidu.com`：表示查看访问 百度 网站的速度
-   `systeminfo`：表示查看当前电脑的信息
-   `ctrl + c` 停止命令执行

## 04.node的导入导出
-   当js文件在node中运行的时候
-   每一个js文件都是一个独立的文件作用域（模块）
-   每一个js文件完成一个功能
-   最后需要一个总的文件把这些模块组合起来
-   那么这个总的文件怎么组合呢？这就需要用到一个模块的导入语导出
-   **导出模块**：需要用到两个关键字
    +   module：每一个js文件都有这个对象（模块）
    +   exports：每一个module中都有的一个对象，叫输出，导出，也是一个对象
```javascript
    // 这是导出的js文件 a.js
    // 也可以直接这样写
    let num = 10;
    module.exports.num = num;

    // 或者直接写一个构造函数，直接把这个构造函数导出去
    function Your() {
        var name;
        this.setName = function (thyName) {
            name = thyName;
        };
        this.sayHello = function () {
            console.log('Hello ' + name);
        };
    };
    module.exports = Your;
```

-  **导入模块**：也需要用到一个关键
    +   require：依赖，需要
    +   语法：`let a = require('你指定的文件')`
    +   a变量就是用来接收导入这个文件中导出来的内容
    +   只有js文件有导出才能使用require导入
```javascript
    // 这是导入的js文件 b.js
    var Your = require('./a.js');

    let yours = new Your();
    yours.setName("婧婧");
    yours.sayHello();
```

## 05.node 的内置模块
-   node里面常见的模块分为三类
    +   内置模块（安装node的时候自带的一些模块）
    +   自定义模块（我们自己写的js文件模块）
    +   第三方模块（需要下载使用别人的模块）

-   `fs`内置模块
    +   `fs`是一个内置模块，直接导入就可以使用
    +   主要用来操作文件（读取 和写入）
-   `fs`的功能
    +   `writeFile(参数1，参数2，参数3)`写入一个文件（异步）
        +   参数1：写入到哪个文件，如果这个文件存在直接写入，如果文件不存在就创建这个文件
        +   参数2：写入的内容，覆盖式的写入
        +   参数3：回调函数，因为这个写入是一个异步的，所以这个回调函数就是写入完毕之后执行
    +   `writeFileSync('参数1', '参数2')`写入一个文件（同步）
        +   参数1：写入到哪个文件，如果这个文件存在直接写入，如果文件不存在就创建这个文件
        +   参数2：写入的内容，覆盖式的写入   
    +   `fs.readFile(参数1，参数2，参数3)` 读取一个文件（异步）
        +   参数1：读取哪个文件
        +   参数2：读取文件的内容的格式
        +   参数3：回调函数，读取文件完毕执行的代码
    +   `readFileSync(参数1，参数2)`读取一个文件（同步） 
        +   参数1：读取哪个文件
        +   参数2：读取文件的内容的格式

-   `http` 内置模块
    +   node 自己就可以当做=一个服务器来运行
    +   当node想要作为服务器的是就需要引入 http这个模块
-   `http`模块的使用
    +   导入模块
    +   使用这个模块的功能来创建一个服务
        +   ` http.createServer(callback)`
        +   callback 每一个请求进来的时候都会执行一下 callback
        +   callback有两个参数 request 和response
            +   request：每一个请求进来的时候，request 表示着当前这一次请求的请求信息
            +   response：每一个请求需要的响应在 response 里面`response.end('内容')`
    +   使用这个服务去监听哪一个端口
        +   `server.listen(8080)`

## 06.npm的使用
-   npm 是世界级大型的 包管理器
-   电脑中是没有自带的 npm这个东西
-   npm是一个基于 node的环境的一个工具
-   当你在安装node时候 会自动帮你安装
    +   在命令行检查：npm -v
-   我们可以利用npm 帮我们下载我们需要的插件
-   npm相关的几个命令行：
    +   `npm install 包名` ||`npm i 包名` 一般下载最新版本的包
    +   `npm install 包名@版本号` ||`npm i 包名@版本号` 下载执行版本的包
    +   `npm uninstall 包名` 删除一个包
    +   `npm init` 生成一个初始化文件来记录项目
    +   `npm init -y`全部以默认的形式生成（目录不能是中文）
    +   会生成一个 package.json文件来记录
    +   当你去查看别人的项目的时候 下载别人的代码只有package.json 就可以直接 npm i，就能按照别人写好的package.json 里面记录的内容帮你全部下载


## 使用node搭建一个服务器
-   使用npm下载 express
-   引入 express
-   let app = express();
-   `app.use(express.static('./'));` 添加静态文件的访问路径（根目录）
-   `app.listen(9000);`监听端口