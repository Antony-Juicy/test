# sass:ice_cream: 

## 01.sass简单介绍
 -  Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 ，嵌套，函数等多种高级功能
 -  sass让css变得更加 高级和优雅
 -  sass是css的一种预编译语言


## 02.sass的格式
-   `.scss`:经常使用的
-   `.sass`:被称为缩进格式,用缩进代理了花括号（不推荐）

## 03.使用sass
-   浏览器是不识别sass的，如果想要我们编写的sass文件能够被浏览识别
    +   以前：使用ruby 把sass编译为css
    +   后来：使用Python 把sass编译为css
    +   现在：使用node 就可以把sass编译为css
-   sass编译方式：
    +   直接在vscode中安装hero插件
    +   利用node安装 sass 编译工具:`npm i -g sass`
        +   【1】来到你要编译的哪个文件夹
        +   【2】 执行编译操作：`sass index.scss index.css`,这种方式就是每更改一次 scss文件都需要执行一次 ，太麻烦了
        +   【3】实时编译：`sass --watch index.scss:index.css`，当监听到 index.scss文件发生改变的时候就会自动编译
        +   【4】实时监控文件夹编译：`sass --watch sass:css`,实时监控 sass 文件夹，只要发生变化，从新编译放在 css 文件夹里面
            +   终断的窗口必须回到sass所处文件中（code）

## 04.sass 中的注释
-   sass中的注释 跟css中有一些区别，在sass中可以使用以下三种来写注释
    +   `// 我是一个sass中的注释`：//注释，只会保留在scss文件中，编译之后不会在css文件中保留
    +   `/*我是一个sass中的注释*/`:这个注释会在编译的是把注释保留在css文件，但是不会保留在压缩的文件中
    +   `/*! 我是一个sass中的注释*/`:既会保留在css文件中也会压缩的文件中

## 05.sass中的变量
-   在sass中定义变量使用 `$` 符号来定义

## 06.sass中的嵌套
-   基本嵌套，根据HTML嵌套结构来写css
    ```css
        div{
            p{
                width:100px
            }
        }
    ```
-   `&连接符`，& 表示的是当前选择器
    ```css
        div{
            /*& 表示 div*/
            &:hover {
                height: 200px;
            }
        }
    ```
-   嵌套属性
    +   属性后面写一个 {} 
    ```css
        border: {
            style: solid;
            width: 2px;
            color: red;
        }
    ```

## 07.sass中mixin的混入
-   其实就是定义sass的函数
-   使用@mixin 定义混合器
-   使用@include 使用混合器

-   定义一个没有参数的混合器
    ```css
        /*定义*/
        @mixin tra {
            -webkit-transition: all 1s 0s linear;
            -moz-transition: all 1s 0s linear;
            -ms-transition: all 1s 0s linear;
            -o-transition: all 1s 0s linear;
            transition: all 1s 0s linear;
        }
        /*调用混合器*/
        .box {
            @include tra;
        }
    ```
-   定义一个带有参数的混合器
     ```css
        /*定义*/
        @mixin tra2($pro, $dur, $del, $tim) {
            -webkit-transition: $pro $dur $del $tim;
            -moz-transition: $pro $dur $del $tim;
            -ms-transition: $pro $dur $del $tim;
            -o-transition: $pro $dur $del $tim;
            transition: $pro $dur $del $tim;
        }

        /*调用混合器*/
        .box1 {
            @include tra2(all, 1s, 0s, linear);
        }
     ```
-   在sass中定义函数的时候，函数的形参也可以写默认值
    `tra3($pro: all, $dur: 1s, $del: 0s, $tim: linear)`

## 08.sass中的继承
-   当某个选择器中想要跟别的选择器拥有同样的样式的时候
-   可以使用一个关键 @extend 把样式继承过来
```css
    .box1 {
        width: 100px;
        height: 100px;
        border: 1px solid #333;
    }
    .box2 {
        /* 表示box1拥有box1的样式 */
        @extend .box1;
        margin: 10px;
    }
```

## 09.导入文件我们使用: @import '路径'

## 10.使用sass和vw来写移动端页面

## 11.gulp
-   自动化打包构建工具
-   写一段程序，让他帮我把所有文件压缩好，压缩完后放在一个我指定的文件夹里面
-   gulp 的使用：
    +   需要依赖一个 node 环境
    +   `npm i -g gulp@3.9.1`
    +   gulp -v 检测版本
-   如果npm 下载太慢了，下载cnpm：`npm install -g cnpm --registry=https://registry.npm.taobao.org`

# 移动端布局方法:ice_cream: 

## 1、使用 媒体查询+rem单位

（1）使用媒体查询更改HTML的font-size值

（2）页面中所有布局使用rem单位布局

缺点：不能精细的适配到每一个设备，代码量较大

原理：媒体查询获取不同的设备，在不同的设备当中更改根节点的字体大小



## 2、使用vw单位 + rem单位布局

（1）使用vw单位作为 HTML font-size的单位（计算）

（2）页面所有布局使用rem单位

原理：屏幕大小变化的时候，用vw作为单位的值也会跟着改变，用vw作为根节点的字体大小的单位，所以在不同的屏幕大小或者设备中，根节点的字体大小的值就不一样，rem单位得到的值就不一样

## 3、使用rem.js + rem单位布局

（1）在vscode中的扩展安装cssrem插件，文件—》首选项—》设置—》（搜索cssrem，改变rootfontsize为设计图 / 10的数字）

（2）在页面中使用script标签引入rem.js文件（在js文件的18行把数字改为设计图的大小）

（3）在页面中的布局，量出多少值就写多少，然后使用它转换的rem的值

原理：通过js获取设备的宽度，来计算根节点的字体大小，rem得出来的值就不一样，就到达不同页面能适配

## 4、使用sass + vw单位布局:icecream:

（1）使用sass的函数：

@function vw($px) {

​    @return ($px / 设计图的宽度) * 100vw;

}

（2）页面中布局

header {

​        height: vw(量出来的值);

​        background: green;

​        font-size: vw(48);

​    }

