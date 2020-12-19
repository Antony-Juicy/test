# DOM

-   文本将详细介绍 **DOM** 相关的知识点，包括但不限于 **Document 文本结构、Node节点、Node节点的类型、node节点的关系以及 DOM 的基本操作（节点的获取，节点的创建，节点的插入，节点的克隆 和 节点的删除等）**

-   **DOM** （全称为 Document Object Model） 即文档对象模型，适用于表示和操作 HTML或XHTML文档内容的一套基础API(Appication Programmimg Interface)
-  其实就是操作就是操作html中标签的一些能力
-   **DOM** 的核心对象是 `document` 对象
-   `document`对象是浏览器内置对象的一个对象。里面存储者专门用来操作元素的各种方法
-   页面中的标签，我们通过js获取到以后，我们就把这个叫做 **DOM**对象

## 一、获取元素
-   通过 js 代码来获取页面中的标签
-   获取以后我们就可以操作这些标签了

### 1、`getElementById`
-   `getElementById` 是通过标签的`id`名称来获取标签的
-   因为一个页面中的**id** 是唯一的，所以获取到时一个元素
    ```javascript
        <body>
            <div id="box"></div>
            <script>
                var box = document.getElementById('box');
                console.log(box) 
                // <div></div>
            </script>
        </body>
    ```
    -   获取到的就是页面中的那个id 为 box 的div标签

### 2、`getElementsByClassName`
-   `getElementsByClassName` 是通过标签的class名来获取标签的
-   因为页面中可能有多个元素的 class名称是一样的，所以获取到的事一组元素
-   哪怕你获取的 class只有一个，那么是获取一组元素，只不过这一组只有一个 DOM 元素而已
    ```javascript
        <body>
            <div calss="box"></div>
            <script>
                var box = document.getElementsByClassName('box')
                console.log(box) // [<div></div>]
                console.log(box[0]) // <div></div>
            </script>
        </body>
    ```
    -   获取到的事一组元素，是一个长得和 数组一样的数据结构，但是不是数组，是伪数组
    -   这个一组数据也是按照索引排列的，所以我们想要准确的拿到这个div，需要用索引来获取

### 3、`getElementsByTagName`
-   `getElementsByTagName` 是用标签的名字来获取标签的
-   因为页面中可能有多个元素 的标签名字一样，所以获取到的事一组元素
哪怕真的只有一个标签名，那么也是获取到一个元素，只不过这一组元素只有一个DOM元素而已
    ```javascript
        <body>
            <div></div>
            <script>
                var box = document.getElementsByTagName('div')
                console.log(box) // [<div></div>]
                console.log(box[0]) // <div></div>
            </script>
        </body>

    ```
    - 和 `getElementsByClassName` 一样，获取到的是一个长得很像数组的元素
    - 必须要用索引才能得到准确的 DOM 元素

### 4、`querySelector`
-   `querySelector` 是按照我选择器的方式来获取元素
-   也就是数，按照我们写css的时候的选择器来获取
-   这个方法只能获取到一个元素，并且是页面中的第一个满足条件的元素
    ```javaScript
        console.log(document.querySelector('div')) // 获取页面中的第一个 div 元素 
        console.log(docuemnt.querySelector('.box')) // 获取页面中第一个有 box 类名的元素
        console.log(document.querySelector('#box')) // 获取页面中第一个 id 名为 box 的元素
    ```

### 5、`querySelectorAll`
- `querySelectorAll` 是按照选择器的方式来获取元素
- 这个方法能获取到所有满足条件的元素，以一个伪数组的形式返回
    ```javascript
        console.log(document.querySelectorAll('div')) // 获取页面中的所有的 div 元素 
        console.log(docuemnt.querySelectorAll('.box')) // 获取页面中所有有 box 类名的元素
    ```
    -   获取到的是一组数据，也是需要用索引来获取到准确的每一个 DOM 元素

## 二、操作元素的属性
-   通过我们各种获取元素的方式获取到页面中的标签以后
-   我们可以直接操作DOM元素 的属性，就能直接把效果展示在页面上

### 1、`innerHTML`
-   获取元素内部的HTML结构
    ```javascript
        <body>
            <div>
                <p>
                <span>hello</span>
                </p>
            </div>

            <script>
                var div = document.querySelector('div')
                console.log(div.innerHTML)
            /*
                        
                <p>
                    <span>hello</span>
                </p>
                    
            */
            </script>
        </body>
    ```
-   设置元素的内容

    ```javascript
        <body>
            <div></div>

            <script>
                var div = document.querySelector('div')
                div.innerHTML = '<p>hello</p>'
            </script>
        </body>
    ```
    -   设置完以后，页面中的 div 元素里面就会嵌套一个 p 元素

### 2、`innerText`
-   获取元素内部的文本（只能获取到文本内容，获取不到 html 标签）
    ```javascript
        <body>
            <div>
                <p>
                <span>hello</span>
                </p>
            </div>

            <script>
                var div = document.querySelector('div')
                console.log(div.innerText) // hello
            </script>
        </body>
    ```
-   可以设置元素内部的文本
    ```javascript
        <body>
            <div></div>

            <script>
                var div = document.querySelector('div')
                div.innerText = '<p>hello</p>'
            </script>
        </body>
    ```
    -   设置完毕以后，会把 `<p>hello</p>` 当作一个文本出现在 div 元素里面，而不会把 p 解析成标签

### 3、`getAttribute`
-   获取元素的=某个属性（包括自定义属性）
    ```javascript
        <body>
            <div a="100" class="box"></div>

            <script>
                var div = document.querySelector('div')
                console.log(div.getAttribute('a')) // 100
                console.log(div.getAttribute('class')) // box
            </script>
        </body>
    ```

### 4、`setAttribute` 
-   给元素设置一个属性（包括自定义属性）
    ```javascript
        <body>
            <div></div>

            <script>
                var div = document.querySelector('div')
                div.setAttribute('a', 100)
                div.setAttribute('class', 'box')
                console.log(div) // <div a="100" class="box"></div>
            </script>
        </body>

    ```

### 5、`removeAttribute`
-   直接移除元素的某个属性
    ```javascript
        <body>
            <div a="100" class="box"></div>

            <script>
                var div = document.querySelector('div')
                div.removeAttribute('class')
                console.log(div) // <div a="100"></div>
            </script>
        </body>
    ```

### 6、`style`
-   专门用来给元素添加css样式
-   添加的都是行内样式
    ```javascript
        <body>
            <div></div>
            <script>
                var div = document.querySelector('div')
                div.style.width = "100px"
                div.style.height = "100px"
                div.style.backgroundColor = "pink"
                console.log(div) 
                // <div style="width: 100px; height: 100px; background-color: pink;"></div>
            </script>
        </body>
    ```
    -  页面中的 div 就会变成一个宽高都是100，背景颜色是粉色 

### 7、`className`
-   专门用来操作元素的类名的
    ```javascript
        <body>
            <div class="box"></div>

            <script>
                var div = document.querySelector('div')
                console.log(div.className) // box
            </script>
        </body>
    ```
-   也可以设置元素的类名，不过是全覆盖式的操作
    ```javascript
        <body>
            <div class="box"></div>

            <script>
                var div = document.querySelector('div')
                div.className = 'test'
                console.log(div) // <div class="test"></div>
            </script>
        </body>
    ```
    -   在设置的时候，不管之前有没有类名，都会全部被设置的值覆盖

## 三、DOM 节点
-   DOM 的节点我们一般分为常用的三大类 **元素节点 / 文本节点 / 属性节点**
-   什么是分类，比如我们在获取元素的时候，通过各种方法获取到叫做元素芥节点（标签节点）
-   比如我们标签里面的文字内容，那么就是文本节点
-   写在每一个标签上的属性，就是属性节点

### 1、元素节点
-   通过`getElementBy....` 获取的都是元素节点

### 2、属性节点
-   我们通过 `getAttribute` 获取的就是 元素节点

### 3、文本节点
-   我们通过 `innerText` 获取到的就是元素的文本节点

### 4、获取节点
-   `childNodes`：获取某一个节点下 **所有的子一级节点  子节点集合**
    
    ```javascript
        <body>
            <div>
                <p>hello</p>
            </div>
            
            <script>
                // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
                var oDiv = document.querySelector('div')
                
                console.log(oDiv.childNodes) 
                /*
                    NodeList(3) [text, p, text]
                0: text
                1: p
                2: text
                length: 3
                __proto__: NodeList
                */
            </script>
        </body>
    ```
    -   我们发现，拿到以后是一个维数组，里面有三个节点
    - 一个 text：从 <div> 一直到 <p> 中间有一个换行和一堆空格，这个是第一个节点，是一个文本节点
    - 一个 p：这个 p 标签就是第二个节点，这个是一个元素节点
    - 一个 text：从 </p> 一直到 </div> 中间有一个换行和一堆空格，这个是第三个节点，是一个文本节点
- 这个时候就能看到我们有不同的节点类型了
    
-   `children` ：获取某一个一点下面所有的子一级 **元素节点  子元素集合**
    
    ```html
        <body>
            <div>
                <p>hello</p>
            </div>
            
            <script>
                // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
                var oDiv = document.querySelector('div')
                
                console.log(oDiv.children) 
                /*
                    HTMLCollection [p]
                0: p
                length: 1
                __proto__: HTMLCollection
                */
            </script>
        </body>
    ```
    - 我们发现只有一个节点了，因为 `children` 只要元素节点
    - div 下面又只有一个元素节点，就是 p
- 所以就只有一个，虽然只有一个，但是也是一个 **伪数
    
-   `firstChild`：获取某一节点下子一级的 **第一个子节点  **
    
    ```html
        <body>
            <div>
                <p>hello</p>
            </div>
            
            <script>
                // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
                var oDiv = document.querySelector('div')
                
                console.log(oDiv.firstChild) // #text 
            </script>
        </body>
    ```
    - 这个是只获取一个节点，不再是伪数组了
    - 获取的是第一个
- 第一个就是 <div> 一直到 <p> 的那个换行和空格，是个文本节点
    
-   `lastChild`：获取某一节点下子一级的 **最后一个子节点**
    
    ```html
        <body>
            <div>
                <p>hello</p>
            </div>
            
            <script>
                // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
                var oDiv = document.querySelector('div')
                
                console.log(oDiv.lastChild) // #text 
            </script>
        </body>
    ```
    - 只获取一个节点，不再是伪数组
    - 获取的是最后一个
- 最后一个就是 </p> 一直到 </div> 之间的换行和空格，是个文本节点
    
-   `firstElementChild`：获取某一节点下子一级 **第一个元素节点**
    ```html
        <body>
            <div>
                <p>hello</p>
            </div>
            
            <script>
                // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
                var oDiv = document.querySelector('div')
                
                console.log(oDiv.firstElementChild) // <p>hello</p>
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是第一个 **元素节点**
    - 第一个元素节点就是 p 标签，是一个元素节点

-   `lastElementChild`：获取某一节点下子一级 **最后一个元素节点**
    ```html
        <body>
            <div>
                <p>hello</p>
                <p>world</p>
            </div>
            
            <script>
                // 这个 oDiv 获取的是页面中的 div 元素，就是一个元素节点
                var oDiv = document.querySelector('div')
                
                console.log(oDiv.lastElementChild) // <p>world</p>
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是最后一个 **元素节点**
    - 最后一个元素节点是 `<p>world</p>`，是一个元素节点

-   `nextSibling`：获取某一个节点的 **下一个兄弟节点**
    ```html
        <body>
            <ul>
                <li id="a">hello</li>
                <li id="b">world</li>
                <li id="c">!!!</li>
            </ul>
            
            <script>
                // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
                var oLi = document.querySelector('#b')
                
                console.log(oLi.nextSibling) // #text
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是 `id="b"` 这个 li 的下一个兄弟节点
    - 因为 `id="b"` 的下一个节点，是两个 li 标签之间的换行和空格，所以是一个文本节点

-   `previousSibling`：获取某一个节点的 **上一个兄弟节点**
    ```html
        <body>
            <ul>
                <li id="a">hello</li>
                <li id="b">world</li>
                <li id="c">!!!</li>
            </ul>
            
            <script>
                // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
                var oLi = document.querySelector('#b')
                
                console.log(oLi.previousSibling) // #text
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是 `id="b"` 这个 li 的上一个兄弟节点
    - 因为 `id="b"` 的上一个节点，是两个 li 标签之间的换行和空格，所以是一个文本节点

-   `nextElementSibling`：获取某一个节点的 **下一个元素节点**
    ```html
        <body>
            <ul>
                <li id="a">hello</li>
                <li id="b">world</li>
                <li id="c">!!!</li>
            </ul>
            
            <script>
                // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
                var oLi = document.querySelector('#b')
                
                console.log(oLi.nextElementSibling) // <li id="c">!!!</li>
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是 `id="b"` 这个 li 的下一个兄弟元素节点
    - 因为 `id="b"` 的下一个兄弟元素节点就是 `id="c"` 的 li，是一个元素节点

-   `previousElementSibling`：获取某一个节点的 **上一个元素节点**
    ```html
        <body>
            <ul>
                <li id="a">hello</li>
                <li id="b">world</li>
                <li id="c">!!!</li>
            </ul>
            
            <script>
                // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
                var oLi = document.querySelector('#b')
                
                console.log(oLi.previousElementSibling) // <li id="a">hello</li>
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是 `id="b"` 这个 li 的上一个兄弟元素节点
    - 因为 `id="b"` 的上一个兄弟元素节点就是 `id="a"` 的 li，是一个元素节点

-   `parentNode`：获取某一个节点的 **父节点**
    ```html
        <body>
            <ul>
                <li id="a">hello</li>
                <li id="b">world</li>
                <li id="c">!!!</li>
            </ul>
            
            <script>
                // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
                var oLi = document.querySelector('#b')
                
                console.log(oLi.parentNode) // <ul>...</ul>
            </script>
        </body>
    ```
    - 只获取一个节点，不在是伪数组
    - 获取的是当前这个 li 的父元素节点
    - 因为这个 li 的父亲就是 ul，所以获取到的就是 ul，是一个元素节点

-   `attributes`：获取某一个 **元素节点** 的所有 **属性节点**
    ```html
        <body>
            <ul>
                <li id="a" a="100" test="test">hello</li>
            </ul>
            
            <script>
                // 这个 oLi 获取的是页面中的 li 元素，就是一个元素节点
                var oLi = document.querySelector('#a')
                
                console.log(oLi.attributes) 
                /*
                    NamedNodeMap {0: id, 1: a, 2: test, id: id, a: a, test: test, length: 3}
                0: id
                1: a
                2: test
                length: 3
                a: a
                id: id
                test: test
                __proto__: NamedNodeMap
                
                */
            </script>
        </body>
    ```
    - 获取的是一组数据，是该元素的所有属性，也是一个伪数组
    - 这个 li 有三个属性，id / a / test 三个，所以就获取到了这三个

### 5、节点属性
-   我们已经知道节点会分成很多种，而且我们也能获取到各种不同的节点
-   接下来我们就学习下 一些各种节点之间属性的区别
```html
    <body>
        <ul test="我是 ul 的一个属性">
            <li>hello</li>
        </ul>

        <script>
            // 先获取 ul
            var oUl = document.querySelector('ul')
            
            // 获取到 ul 下的第一个子元素节点，是一个元素节点
            var eleNode = oUl.firstElementChild
            
            // 获取到 ul 的属性节点组合，因为是个组合，我们要拿到节点的话要用索引
            var attrNode = oUl.attributes[0]

            // 获取到 ul 下的第一个子节点，是一个文本节点
            var textNode = oUl.firstChild
        </script>
    </body>
```
#### (1)nodeType
-   `nodeType`：获取节点的节点类型，用数字表示
    ```javascript
        console.log(eleNode.nodeType) // 1
        console.log(attrNode.nodeType) // 2
        console.log(textNode.nodeType) // 3
    ```
    - `nodeType === 1` 就表示该节点是一个 **元素节点**
    - `nodeType === 2` 就表示该节点是一个 **属性节点**
    - `nodeType === 3` 就表示该节点是一个 **注释节点**

#### (2)nodeName
-   `nodeName`：获取节点的节点名称
    ```javascript
        console.log(eleNode.nodeName) // LI
        console.log(attrNode.nodeName) // test
        console.log(textNode.nodeName) // #text
    ```
    - 元素节点的 `nodeName` 就是 **大写标签名**
    - 属性节点的 `nodeName` 就是 **属性名**
    - 文本节点的 `nodeName` 都是 **#text**

#### (3)nodeValue
-   `nodeValue`： 获取节点的值
    ```javascript
        console.log(eleNode.nodeValue) // null
        console.log(attrNode.nodeValue) // 我是 ul 的一个属性
        console.log(textNode.nodeValue) // 换行 + 空格
    ```
    - 元素节点没有 `nodeValue`
    - 属性节点的 `nodeValue` 就是 **属性值**
    - 文本节点的 `nodeValue` 就是 **文本内容**

-   汇总

## 四、操作DOM节点
-   我们所说的操作无非就是 **增删查改**
-   创建一个节点（因为向页面中增加之前，我们需要先创建一个节点出来）
-   向页面中增加一个节点
-   删除页面中的某一个节点
-   修改页面中的某一个节点
-   获取页面中的某一个节点

### 1、创建一个节点
-   `createElement`：用于创建一个元素节点
    
    ```javascript
        // 创建一个 div 元素节点
    var oDiv = document.createElement('div')
    
        console.log(oDiv) // <div></div>
    ```
-   创建出来的就是一个可以使用的 div 元素
    
-   `createTextNode`：用于创建一个文本节点
    
    ```javascript
        // 创建一个文本节点
    var oText = document.createTextNode('我是一个文本')
    
        console.log(oText) // "我是一个文本"
    ```

### 2、向页面中加入一个节点
-   `appendChild`：是向一个元素节点的末尾追加一个节点
    
    -   语法： `父节点.appendChild(要插入的子节点)`
    
    ```javascript
         // 创建一个 div 元素节点
        var oDiv = document.createElement('div')
    var oText = document.createTextNode('我是一个文本')
    
        // 向 div 中追加一个文本节点
    oDiv.appendChild(oText)
    
        console.log(oDiv) // <div>我是一个文本</div>
    ```
-   `insertBefore`：向某一个节点前插入一个节点
    
    -   法： `父节点.insertBefore(要插入的节点，插入在哪一个节点的前面)`
    ```html
        <body>
            <div>
                <p>我是一个 p 标签</p>
            </div>
            
            <script>
                var oDiv = document.querySelector('div')
                var oP = oDiv.querySelector('p')
                
                // 创建一个元素节点
                var oSpan = document.createElement('span')
                
                // 将这个元素节点添加到 div 下的 p 的前面
                oDiv.insertBefore(oSpan, oP)
                
                console.log(oDiv)
                /*
                    <div>
                        <span></span>
                        <p>我是一个 p 标签</p>
                    </div>
                */
            </script>
        </body>
    ```
### 3、删除页面中的某一个节点
-   `removeChild`：移除某一节点下的某一个节点
    -   语法：`父节点.removeChild(要移除的字节点)`
    ```html
        <body>
            <div>
                <p>我是一个 p 标签</p>
            </div>
            
            <script>
                var oDiv = document.querySelector('div')
                var oP = oDiv.querySelector('p')
                
                // 移除 div 下面的 p 标签
                oDiv.removeChild(oP)
                
                console.log(oDiv) // <div></div>
            </script>
        </body>
    ```
### 4、修改页面中的某一个节点
-   `replaceChild`：将页面中的某一个节点替换掉
    -   语法： `父节点.replaceChild(新节点，旧节点)`
    ```html
        <body>
            <div>
                <p>我是一个 p 标签</p>
            </div>
            
            <script>
                var oDiv = document.querySelector('div')
                var oP = oDiv.querySelector('p')
                
                // 创建一个 span 节点
                var oSpan = document.createElement('span')
                // 向 span 元素中加点文字
                oSpan.innerHTML = '我是新创建的 span 标签'
                
                // 用创建的 span 标签替换原先 div 下的 p 标签
                oDiv.replaceChild(oSpan, oP)
                
                console.log(oDiv)
                /*
                    <div>
                        <span>我是新创建的 span 标签</span>
                    </div>
                */
            </script>
        </body>
    ```

## 五、获取元素非行内样式

```javascript
//封装获取样式的函数
function getStyle(ele, attr) {
          return style = window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr]
        }
//参数1：元素 参数2：CSS属性
```



-   我们在操作DOM的时候，很重要的一点就是要操作元素的CSS样式
-   那么在操作CSS样式的时候，我们避免不了就是要获取亚US怒的样式
-   之前我们有接触过 获取样式 用 `元素.style.xxx`来获取
-   但是这个方法只能获取到元素的 **行内样式**，也就是写在元素身上的样式
    ```html
        <style>
            div {
                width: 100px;
            }
        </style>
        <body>
            <div style="height: 100px;">
                <p>我是一个 p 标签</p>
            </div>

            <script>
                var oDiv = document.querySelector('div')
                    console.log(oDiv.style.height) // 100px
                console.log(oDIv.style.width) // ''
            </script>
        </body>
    ```
    - 不管是外链式还是内部式，我们都获取不到该元素的样式
    - 这里我们就要使用方法来获取了 **getComputedStyle** 和 **currentStyle**
    - 这两个方法的作用是一样的，只不过一个在 **非 IE** 浏览器，一个在 **IE** 浏览器

### （1）getComputedStyle(非IE使用)
-   语法：`window.getComputedStyle(元素, null).要获取的属性` 
    ```html
        <style>
            div {
                width: 100px;
            }
        </style>
        <body>
            <div style="height: 100px;">
                <p>我是一个 p 标签</p>
            </div>

            <script>
                var oDiv = document.querySelector('div')
                    console.log(window.getComputedStyle(oDiv).width) // 100px
                console.log(window.getComputedStyle(oDiv).height) // 100px
            </script>
        </body>
    ```
    -   这个方法获取行间样式和非行间样式都可以

### (2)currentStyle(IE使用)
-   语法： `元素.currentStyle.要获取的属性`
    ```html
        <style>
            div {
                width: 100px;
            }
            </style>
            <body>
            <div style="height: 100px;">
                <p>我是一个 p 标签</p>
            </div>

            <script>
                var oDiv = document.querySelector('div')
                  console.log(oDiv.currentStyle.width) // 100px 高版本没有这个属性    
                console.log(oDiv.currentStyle.height) // 100px
            </script>
        </body>
    ```
##获取元素的尺寸
- 【1】clientHeight  获取元素的高度 和 上下padding
- 【2】clientwidth   获取元素的宽度 和 左右的padding
- 【3】clientLeft   只能获取左边框（不能获取右边框）
- 【4】clientTop    只能获取上边框（不能获取下边框）
## 六、获取元素的宽高、偏移量
-   就是元素在页面上的什么位置
-   我们有几个属性来获取，**offsetLeft** 和 **offsetTop** 和 **offsetWidth** 和 **offsetHeight**

### （1）offsetLeft 和 offsetTop
- 获取的是元素左边的偏移量和上边的偏移量

- 分成两种情况来看

- **没有定位**的情况下
  -   获取元素边框外侧到页面内侧的距离
  -   没有定位的情况，offsetLeft 得到的是 元素到浏览器可视窗口最左边的距离
  -   没有定位的情况，offsetTop 得到的是 元素到浏览器可视窗口最上边的距离

- **有定位**的情况下

  + 获取元素边框外侧到定位父级边框内侧的距离（其实就是我们写的 left 和top 值）

  + offsetLeft 为定位元素的left值 (元素到参考物左边的距离)
  + offsetTop 为定位元素的top值（元素当参考物上边的距离）

  

### （2）offsetWidth 和 offsetHeight
- 获取元素 `内容宽高 + padding宽高 + border宽高` 的和

  ```javascript
  <style>
      .box{
          width:200px;
          height:210px;
          border:10px solid red;
          padding:20px;
      }
  </style>
  <div class="box"></div>
  <script>
      var box = document.querySelector('.box');
      console.log(box.offsetWidth);   //200
          console.log(box.offsetHeight); //210
  </script>
  ```

  

## 七、获取元素的尺寸（较为少用）

  1、**clientHeight**，获取元素的高度和上下padding。

  2、**clientWidth**，获取元素的宽度和左右的padding。

  3、**clientLeft**，只能获取左边框（不能获取右边框）。

  4、**clientTop**，只能获取上边框（不能获取下边框）。

  ```javascript
  style>
      .box{
          width:200px;
          height:210px;
          border:10px solid red;
          padding:20px;
      }
  </style>
  <div class="box"></div>
  <script>
      var box = document.querySelector('.box');
      console.log(box.clientWidth);
  //此值可改为clientHeight、clientLeft、clientTop
  </script>
  ```

   

## 八、使用JS实现元素上下左右居中的功能

```javascript
//css
<style>
        .box {
            width: 400px;
            height: 200px;
            border: 1px solid red;
            position: absolute;
        }
</style>
//html
		<div class="box"></div>
//js	
    <script>
        // 用js实现box元素在浏览器中居中显示的效果
        // 把(浏览器的宽度 -  盒子的宽度 ) / 2  赋值给 盒子的left
        var box = document.querySelector('.box');
        box.style.left = (innerWidth - box.offsetWidth) / 2 + 'px';
        box.style.top = (innerHeight - box.offsetHeight) / 2 + 'px';

        // onresize 窗口大小改变事件
        window.onresize = function () {
            box.style.left = (innerWidth - box.offsetWidth) / 2 + 'px';
            box.style.top = (innerHeight - box.offsetHeight) / 2 + 'px';
        }
    </script>
```

## 九、获取浏览器窗口宽高的补充

- 【1】document.documentElement.clientWidth  获取浏览器的可视区域的宽度  不包含滚动

- 【2】document.documentElement.clientHeight  获取浏览器的可视区域的高度  不包含滚动条

- 【3】document.body.clientWidth  获取body的宽度

- 【4】document.body.clientHeight  获取body的高度

  

## 十、`classList`对象

 classList 包含所有的class属性 和 提供一些方法

### 1、`add(class名)` 添加

### 2、`remove(class名)` 移出

### 3、 `replace(a,b) `用b 替换a

### 4、 `toggle(class名)` 转换

- 如果元素有，那么就移出，如果没有就添加

  ```javascript
  var btn = document.querySelector('#btn');
          btn.onclick = function () {
              //button按钮用toggle方法十分简易，就不需要使用flag判断
              box.classList.toggle('active')
              //之前使用排他思想做tab切换
              // if (box.classList.contains('active')) {
              //     box.className = '';
              // } else {
              //     box.className = 'active'
              // }
          }
  ```

  

### 5、`contains(class名)` 

- 判断一个元素中是否存在class

- 如果存在 返回 true ，不存在就返回false