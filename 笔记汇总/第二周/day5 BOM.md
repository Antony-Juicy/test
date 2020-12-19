# BOM
-   本文介绍BOM相关的知识点，介绍重点在与BOM核心的window对象的成员细节
-   之前我们已经知道 `JavaScript` 的范围包括：`ECMAScript(h核心语言) + DOM(文本对象模型) + BOM(浏览器对象模型)`
-   `BOM` 是 `Browser Object Model` 的缩写
-   其实就是操作浏览器的一些功能
-   但是，具体我们可以操作哪些内容呢？
    
    -  获取一些浏览器的相关信息（窗口大小）
    -   操作浏览器进行页面跳转
    -   获取当前浏览器地址信息
    -   操作浏览器的滚动条
    -   浏览器的信息（浏览器的版本）
    -   让浏览器出现一些弹窗`(alert/confirm/prompt) `
-   浏览器的核心就是`window`对象
-   `window`的对象是浏览器内置的一个对象，里面包含操作浏览器的方法

## `window `和 全局作用域
-   在浏览器中，`window`对象拥有着双重的角色，它既是通过`JavaScript`访问浏览器窗口的接口，也是`ECMAScript`规定中的`Global`全局对象。因此，所有在全局作用域中的声明变量，函数都会自动成为window对象的属性和方法

### 1、全局作用域
-   定义在全局环境下的变量 和 函数都会成为 `window` 对象的成员（属性和方法）
-   编码的时候应该尽可能少的使用全局变量，以避免污染全局环境
-   没有用`var`声明的变量会成为全局变量，即`window`对象的属性
-   在编码时 `window` 前缀可以被省略，如 `window.console.log()` 通常成 `console.log()`;

### 2、`window` 中的对象

#### （1）`window`获取浏览器地址的`location` 对象
`location` 对象是 `window` 中最有用最重要的对象之一，它提供了与窗口中有关的信息，而且它非常特殊，它既是 `window` 的属性 也是 `document`的属性

-   `location` 对象的主要属性
    用来获取或者设置浏览器地址相关的信息
    **url的组成：** `url:http://wwww.baidu.com:8000/api/reg.php?unsename=jingjing&age=18`
    >协议：`http `  
    域名：`baidu.com   `  
    端口:`8000 `   
    路径：`/api/ `   
    参数：`unsename=jingjing&age=18`
    哈希：`#123`

    -  `hash` 设置/返回从 #号开始的URL（锚点）===》哈希值

    ```javascript
        //url:http://wwww.baidu.com:8000/api/reg.php?unsename=jingjing&age=18#123
        console.log(window.location.hash);
        //得到#123
    ```
    -   `href` 设置/返回完整的 URL。
    ```javascript
        //获取浏览器的地址
        console.log(window.location.href)

        //设置浏览器的地址
        window.location.href = './index.html';
        //这就会跳转页面到后面给的那个地址

    ```

    -   `search` 设置或者返回从问好(?)开始的URL（部分参数）

    -   `host` 服务器的和端口号

    -   `hostname` 服务器的名称

    -   `pathname` URL中的目录 和文件名

    -   `port` 返回指定的端口号，如果没有指定则返回空字符串

    -   `protocol` 返回网络协议

-   `location` 对象的主要方法
    -   `assign()` 加载新的页面

    -   `reload()` 重新加载（刷新）

    -   `replace(newurl)` 使用新的页面来替换当前页面

## 窗口的主要属性和方法
### 1、获取浏览器窗口的尺寸
在这里需要将的一个概念是 **页面视图容器**

**页面视图容器：** 称之为浏览器的视口（viewpoint），相比窗口本身来说，它不包含工具栏和滚动条
-   `innerHeight ` 获取页面视图的高度
-   `innerWidth` 获取页面视图的高度
    ```javascript
        var viewPointHeight = window.innerHeight
        console.log(viewPointHeight)

        var viewPointWidth = window.innerWidth
        console.log(viewPointWidth)
    ```
-   `outerWidth` 获取浏览器的窗口的宽度（包括滚动条）
-   `outerHeight` 获取浏览器窗口的宽度（包括滚动条）
    ```javascript
        var windowHeight = window.outerHeight
        console.log(windowHeight)

        var windowWidth = window.outerWidth
        console.log(windowWidth)
    ```
### 2、窗口的打开和关闭
-   window.open(url,name,features,replace)
    >-  url：打开指定页面的URL   
    >-   name：指定的target属性或者窗口的名称    
    >       -   _blank：在新的窗口加载页面（默认值）
    >       -   _parent：在窗口中加载页面
    >       -   _self：在当前窗口加载页面（替换）
    >       -   _top：URL替换任何可加载的框架集
    >       -   name：窗口名称
    >-  features：可选的字符创，声明新窗口要显示的浏览器的特征
    >-  replace：可选的布尔值，设置浏览器历史的处理（true表示替换当前条目，false表示新建条目）

### 3、`window.close();` 关闭当前窗口

### 4、系统弹窗
-   `alert()` 弹出对话框（确定）
-   `confirm()` 弹出警告框，返回布尔值（确定  & 取消）
-   `prompt()` 弹出输入框，返回消息 或者 null

 ### 5、`window`的`history`对象   
 -  `window`对象中有一个 `history` 属性，它本身也是一个对象保存着网页的历史记录（从窗口打开时计算）。

 -  `history` 对象通过内部的`lenght`属性来记录浏览器的数量，该数据局包含了向前和向后的所有记录，默认加载到窗口的第一个页面 其 `history.lenght` 的值为 0

 -  接下来介绍几个`history`的方法
    -   `go()` 跳转到任意的浏览器历史记录，负数表示后退

    -  ` back()` 后退一页

    -   `forward()` 前进一页
    ```javascript
        //获取历史记录的藏毒
        console.log(window.history.lenght);
        
        //前进1页
        window.history.go(1);
        
        //后退一页
        window.history.go(-1);

        //回退
        window.history.back();

        //前进
        window.history.forward();
    ```

###  5、浏览器的`onload`事件
-   `onload` 这个步子啊是一个事件了，而是一个方法
-   是在页面所有资源加载完毕后去执行的一个方法
    ```javascript
        window.onload = function(){
            cosnole.log('页面所有内容已经加载完毕')
        }
    ```

### 6、浏览器的`onscroll`事件
-   这个`onscroll`事件是当浏览器的滚动条滚动触发的时候
-   或者鼠标滚轮滚动的时候触发
    ```javascript
        window.onscroll = function () {
            console.log('浏览器滚动了')
        }
    ```
    -   注意：前提是页面的高度要超过浏览器的可是窗口才可以
-   浏览器滚动的距离
    -   浏览器内的内容既然可以滚动，那么我们就可以获取到浏览器的滚动距离
    -   所谓浏览器滚动，其实不是说真的是浏览器滚动，而是通过浏览器的移动改变页面的位置（也就是页面往上移动或者往下移动）
    -   所以浏览器滚动的距离就是 页面的移动距离
    -   所以这个距离的获取步子啊使用`window`而是 使用`document`
    -   `scrollTop`获取页面向上滚动的距离
        >共有两种获取的方法    
        >1、`document.body.scrollTop`   
        >2、`document.documentElement.scrollTop`

        -   两个都是获取页面向上滚动的距离
        -   区别：
            -   IE浏览器
                -   没有`doctype`声明的时候,用这两个都行
                -   有`doctype`声明的时候，只能使用`ocument.documentElement.scrollTop`
            -   `Chrome` 和 `FireFox `   
                -   没有 `DOCTYPE` 声明的时候，用 `document.body.scrollTop`
                -   有 `DOCTYPE` 声明的时候，用 `document.documentElement.scrollTop`
            -   `Safari`
                -   两个都不用，使用一个单独的方法 `window.pageYOffset `
    -   `scrollLeft` 获取页面想做滚动的距离
         >共有两种获取的方法    
        >1、`document.body.scrollLeft`   
        >2、`document.documentElement.scrollLeft`

        -   两个之间的区别和之前的 `scrollTop` 一样

## 浏览器的版本信息（了解）
-   `window` 中有一个对象 叫做 `navigator`
-   是专门用来虎丘浏览器信息的

-   1、`navigator.userAgent` 获取浏览器的整-   
-   2、`navigator.appName` 获取浏览-   
-   3、`navigator.appVersion` 获取浏览器-  
-   4、`navigator.platform` 获取到的事当前计算机的操作系统

