# JavaScript中的设计模式

- 设计模式是我们在 **解决问题的时候针对特定问题给出的简洁而优化的处理方案**

- 一般很多人在听到设计模式都会 想到23中设计模式，五大设计原则

  ![设计模式](images\设计模式.PNG)

- 接下来我们详细讲些一些常用的设计模式

  - 工厂模式
  - 单例模式
  - 组合模式
  - 观察者模式

## 1.工程模式:mushroom: 

- 工厂模式 ，根据不同的输入返回不同类的实例
- 一般用来创建同一类对象。
- 工厂方式的主要思想是将对象的创建与对象的实现分离。 
- 并且是通过使用一个共同的接口来指向新创建的对象，用工厂方法代替new操作的一种模式。
- 在类似场景中，这些例子有以下特点：
  1. 访问者只需要知道产品名，就可以从工厂获得对应实例；
  2. 访问者不关心实例创建过程；

```javascript
function YuXiangRouSi() {
    this.type = '鱼香肉丝'
}

function GongBaoJiDing() {
    this.type = '宫保鸡丁'
}

// 工厂：饭店，根据不同类型生产不同菜品实例
function restaurant(type) {
    switch (type) {
        case '鱼香肉丝':
            return new YuXiangRouSi()
        case '宫保鸡丁':
            return new GongBaoJiDing()
        default:
            return new Error("没有这个菜品")
    }
}

const diancan1 = restaurant('鱼香肉丝');
const diancan2 = restaurant('宫保鸡丁');
const diancan3 = restaurant('小炒回锅肉');

```

- **小结:**

  1. 构造函数和创建者分离，对new操作进行封装
  2. 符合开放封闭原则

  

## 2.单例模式:mushroom: 

- 单例模式： 就是使用构造函数实例化的时候，不管实例化多少回，都是同一个对象
  - 也就是一个构造函数一生只能 new 出一个对象
- 简而言之就是，当我们使用构造函数，每一次 new 出来的对象 属性/功能/方法 **完全一样** 的时候，我们把他设计成单例模式

### 【总结：步骤】:cherry_blossom: 

- 1、创造一个构造函数
- 2、创造一个单例(singleton)函数模式（自调用）
  + 本来return的是一个函数，singleton自调用之后return的是instance.
  + 自调用和闭包保证的是调用指向函数，使得instance的值不会销毁，从而保存内部变量，使得单例得以实行。
- 3、对象和属性只会调用一次，所以需要在原型链上添加方法，**改变参数的属性**。
- 4、想要**链式调用**，在方法的最后要return this。this指向这个构造函数的实例化对象。


### 【1】核心代码

- 单例模式的核心代码很简单
- 其实就是判断一下，他曾经有没有 new 出来过对象
- 如果有，就还继续使用之前的那个对象，如果没有，那么就给你 new 一个

```javascript
// 准备一个构造函数
// 将来要 new 的
function Person(name) {
    this.name = name
}

// 准备一个单例模式函数
// 这个单例模式函数要把 Person 做成一个单例模式
// 将来再想要 new Person 的时候只要执行这个 singleton 函数就可以了
 let singleton = (function (name) {
     let instance;
     return function (name) {
      // 判断instance是否存在（Person是否有被实例化）
         if (!instance) {
            // 能执行这里 ，那么说明instance没有值
            // 说明Person没有实例化
            // 那么就进行实例化
             instance = new Person(name)
         }
         return instance
     }

 })()

 const p1 = singleton('aa')
 const p2 = singleton('bb')
 console.log(p1 === p2) // true
```

### 【2】应用

- 我们就用这个核心代码简单书写一个 demo

```javascript
 // 这个构造函数的功能就是创建一个 div，添加到页面中
class CreateDiv {
    constructor() {
        this.div = document.createElement('div');
        document.body.appendChild(this.div);
    }
    init(text) {
        this.div.innerHTML = text;
    }
}
// 准备把这个 CreateDiv 做成单例模式
// 让 singleton 成为一个闭包函数
const singleton = (function () {

    let instance
    return function () {
        // 如果instance存在就直接返回，如果不存在就 new 一个createDiv的实例
        if (!instance) {
            instance = new CreateDiv()
        }
        return instance
    }
})()

singleton().init('hello')
// 第一次的时候，页面中会出现一个新的 div ，内容是 hello
singleton().init('world')
// 第二次的时候，不会出现新的 div，而是原先的 div 内容变成了 world
```
#### ·创建div优化（添加css等方法，arguments ===1时获取样式）

-  .css() 传进字符串时获取样式，传进对象时添加样式

```javascript
 <script>
        // 编写一个单例模式函数 ，在页面中创建一个div，无论调用多少次这个函数，在页面中都只会存在一个div
        // [1]创建构造函数
        function CreateDiv(html) {
            // 创建div
            this.div = document.createElement('div');
            // 把这个div添加到页面中
            document.body.appendChild(this.div);
        }
        // 【注意点1】写在构造函数中的对象和属性只会调用一次，当需要改变属性的参数的时候，那么就在这个构造函数的原型上添加方法
        CreateDiv.prototype.html = function (html) {
            this.div.innerHTML = html;
            // this指向的是实例对象 （instance）
            //【注意点2】(链式调用) 把这个实例对象返回，就可以继续调用这个实例对象的方法
            return this;
        }

        CreateDiv.prototype.css = function (attr, value) {
            // 判arguments 所有实参的集合【补充】必须判断是字符串才是获取
            if (arguments.length === 1 && Object.prototype.toString.call(attr) === '[object String]') {
                //【注意点3】表示获取样式
                let style = window.getComputedStyle ? window.getComputedStyle(this.div)[attr] : this.div.currentStyle[attr];
                return parseInt(style)
            }
			//【注意点4】判断传进来的是否是一个对象
            if (Object.prototype.toString.call(attr) === '[object Object]') {
                for (let key in attr) {
                    this.div.style[key] = attr[key];
                }
                return this;
            }
            // 如果不是一个对象就可以直接添加属性属性值
            this.div.style[attr] = value;
            return this;
        }

        // [2]创建一个单例模式函数
        let singLeton = (function () {
            let instance;
            return function (html) {
                if (!instance) {
                    instance = new CreateDiv();
                }
                return instance
            }
        })()

        // singLeton().html('hello');
        // singLeton().css('width', '200px');
        // singLeton().css('height', '200px');
        // singLeton().css('background', 'red');
        // singLeton().html('aaaaaa');


        // singLeton().html('我是HTML的内容').css('width', '200px').css('height', '200px');
        // singLeton().css({ width: '200px', height: '200px', background: 'red' })
        let res = singLeton().css('width');
        console.log(res);

    </script>
```

#### ·自己的思考
```javascript
	//老师是一个一个方法创建，如果重置原型对象可以一次性给原型对象添加多个方法，但切断了与原来原型对象的联系。这时改变构造器指向。（如果用class写又是怎么写？但是可能不兼容）
	//重置CreateDiv构造函数
    CreateDiv.prototype = {
        css(){},
        html(){}
    }
    //添加constructor构造器，使其指向CreateDiv，如果改变构造器指向，它会指向window
     Object.defineProperty(CreateDiv.prototype, 'constructor', {
                value: CreateDiv
     })
```

## 3.组合模式:mushroom: 

- 组合模式，就是把几个构造函数的启动方式组合再一起
- 然后用一个 ”遥控器“ 进行统一调用
- 准备一个 **组合模式** 的构造函数
### 智能家居为例:cherry_blossom: :cherry_blossom: 

- 1、定义一些智能家居构造函数
- 2、定义一个遥控器构造函数
  + 遥控器中定义一个**数组**存放需要启动的家居的启动函数
- 3、遥控器中的添加(add)方法传参要传两个(实例化对象ele，启动方法init)
- 4、**重要**：当需要用到家居构造函数中的静态属性时，this指向要强制指向实例化对象
  + item.init.call(item.ele)
  + 问题：为什么不直接调用传过来的实例化对象的原型对象方法（item.ele.init()）
  + 解答：因为启动函数名会变化，所以在启动时需要传递启动函数名
```javascript
//原型对象中的方法其实就两个，add添加要执行的家居，startUp启动家居
<script>
        // [1]定义一些智能家居构造函数 
        class Computer {
            constructor() {
                this.name = '我是电脑';
            }
            init() {
                // 【注意点1：this指向】函数直接调用的时候，那么这个的this指向 window
                console.log(this.name);
            }
        }
        class AirConditioner {
            constructor() {
                this.name = '我是空调';
                this.deg = 26;
            }
            init() {
                console.log(this.name);
            }
        }
        class Heater {
            constructor() {
                this.name = "我是热水器";
            }
            init() {
                console.log(this.name);
            }
        }

        //[2] 定义一个遥控器统一启动 智能家具
        class compose {
            constructor() {
                // 用来存放你需要启动的智能家居的启动函数
                this.arr = [];
            }
            //[3]把需要启动的智能家具启动函数添加到数组
            add(obj, init) {
                // 把obj这个实例的init方法添加到数组中
                // 【注意点2】如果init启动的时候需要 使用实例中的属性
                // 需要对应的实例也存入数组中
                let o = {
                    ele: obj,
                    init: obj[init]
                }
                this.arr.push(o);
            }
            //[4]当调用这个函数的时候，那么就把选择的智能家居启动函数给执行
            //用户只要执行这一个，相当于执行三个启动函数
            startUp() {
                // 把数组中的函数遍历出来执行
                this.arr.forEach(item => {
                    // item.init() 直接调用的时候init中的this指向不为实例，不能使用实例的属性
                    // 【注意点3】强行的改变init函数中的this指向
                    item.init.call(item.ele)
                    // item.ele.startUp()因为启动函数名会变化，所以不这样使用
                })
            }
        }
        let c = new compose();
        c.add(new Computer(), 'init');
        c.add(new Heater(), 'init');
        c.add(new AirConditioner(), 'init');
        c.startUp();
    </script>
```




## 4.观察者模式:mushroom: 

- 观察者模式，通常也被叫做 **发布-订阅模式**  或者 **消息模式**
- 英文名称叫做 **`Observer`**
- 官方解释： 当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新，解决了主体对象与观察者之间功能的耦合，即一个对象状态改变给其他对象通知的问题

### （1）一个例子

- 当你想去书店买书，但是恰巧今天你要买的书没有了
- 我们又不能总在书店等着，就把我们的手机留给店员
- 当你需要的书到了的时候，他会打电话通知你，你去买了就好了
- 你买到书了以后，就告诉他，我买到了，那么以后再来了书就不会通知你了

### （2）addEventListener

- 但是 `addEventListener` 是一个我们都用过的东西

- 这个东西其实就是一个标准的 **观察者模式**

  ```javascript
  btn.addEventListener('click', function () {
      console.log('btn 被点击了')
  })
  ```

  - 上面这个就是有一个 **无形的观察者** 再观察着 `btn` 的一举一动
  - 当这个 `btn` 被点击的时候，就会执行 对应的函数

- 说白了： 观察者模式就是我们自己实现一个 `addEventListener` 的功能

  - 只不过 `addEventListaner` 只有固定的一些事件，而且只能给 dom 元素绑定
  - 而我们自己写的可以随便绑定一个事件名称，自己选择触发时机而已

### （3）书写代码（message只有一个事件）

- 首先我们分析功能

  - 我们要有一个观察者（这里抽象为一个对象 `{}`）
  - 需要有一个属性，存放消息的盒子（把你绑定的所有事件放在里面）
  - 需要一个 on 方法，用于添加事件
  - 需要一个 emit 方法，用于发布事件（触发）
  - 需要一个 off 方法，把已经添加的方法取消

#### Observer（观察者）
  ```javascript
  const observer = {
      message: {},
      on: function () {},
      emit: function () {},
      off: function () {}
  }
  ```

  - ES6 的写法

  ```javascript
  class Observer {
      constructor () {
          this.message = {}
      }
      
      on () {}
      
      emit () {}
      
      off () {}
  }
  ```

#### ON方法（添加事件）

  - 我们的 on 方法需要接受 两个参数

    - 事件类型
    - 事件处理函数

    ```javascript
    class Observer {
        constructor () {
            this.message = {}
        }
        
        on (type, fn) {
            // 判断消息盒子里面有没有设置事件类型
            if (!this.message[type]) {
                // 证明消息盒子里面没有这个事件类型
                // 那么我们直接添加进去
                // 并且让他的值是一个数组，再数组里面放上事件处理函数
                this.message[type] = [fn]
            } else {
                // 证明消息盒子里面有这个事件类型
                // 那么我们直接向数组里面追加事件处理函数就行了
                this.message[type].push(fn)
            }
        }
        
        emit () {}
        
        off () {}
    }
    ```

  

#### EMIT方法（触发事件）

  - 接下来就是发布事件

  - 也就是让我们已经订阅好的事件执行一下

  - 同样需要接受两个参数

    - 要触发的事件类型
    - 给事件处理函数传递的参数

    ```javascript
    class Observer {
        constructor () {
            this.message = {}
        }
        
        on (type, fn) {
            // 判断消息盒子里面有没有设置事件类型
            if (!this.message[type]) {
                // 证明消息盒子里面没有这个事件类型
                // 那么我们直接添加进去
                // 并且让他的值是一个数组，再数组里面放上事件处理函数
                this.message[type] = [fn]
            } else {
                // 证明消息盒子里面有这个事件类型
                // 那么我们直接向数组里面追加事件处理函数就行了
                this.message[type].push(fn)
            }
        }
        
        emit (type, ...arg) {
            // 判断你之前有没有订阅过这个事件
            if (!this.message[type]) return
    
            // 如果有，那么我们就处理一下参数
            const event = {
                type: type,
                arg: arg || {}
            }
    
            // 循环执行为当前事件类型订阅的所有事件处理函数
            this.message[type].forEach(item => {
                //把i事件处理函数中的this指向 这个构造函数的实例
                //event就是 这个实例对象中创建的一些属性
                item.call(this, event)
            })
        }
        
        off () {}
    }
    ```

    

#### OFF方法（移除事件）

  - 最后就是移除事件

  - 就是把已经订阅的事件处理函数移除掉

  - 同样需要接受两个参数

    - 要移除的事件类型
    - 要移除的事件处理函数

    ```javascript
    class Observer {
        constructor () {
            this.message = {}
        }
        
        on (type, fn) {
            // 判断消息盒子里面有没有设置事件类型
            if (!this.message[type]) {
                // 证明消息盒子里面没有这个事件类型
                // 那么我们直接添加进去
                // 并且让他的值是一个数组，再数组里面放上事件处理函数
                this.message[type] = [fn]
            } else {
                // 证明消息盒子里面有这个事件类型
                // 那么我们直接向数组里面追加事件处理函数就行了
                this.message[type].push(fn)
            }
        }
        
        emit (type, ...arg) {
            // 判断你之前有没有订阅过这个事件
            if (!this.message[type]) return
    
            // 如果有，那么我们就处理一下参数
            const event = {
                type: type,
                arg: arg || {}
            }
    
            // 循环执行为当前事件类型订阅的所有事件处理函数
            this.message[type].forEach(item => {
                item.call(this, event)
            })
        }
        
        off (type, fn) {
            // 判断你之前有没有订阅过这个事件
            if (!this.message[type]) return
    
            // 如果有我们再进行移除
            for (let i = 0; i < this.message[type].length; i++) {
                const item =  this.message[type][i]
                if (item === fn) {
                    this.message[type].splice(i, 1)
                    i--
                }
            }
        }
    }
    ```

    

  - 以上就是最基本的 **观察者模式**

  - 接下来我们就使用一下试试看

  

  #### 使用一下

  ```javascript
  const o = new Observer()
  
  // 准备两个事件处理函数
  function a(e) {
      console.log('hello')
  }
  
  function b(e) {
      console.log('world')
  }
  
  // 订阅事件
  o.on('abc', a)
  o.on('abc', b)
  
  // 发布事件（触发）
  o.emit('abc', '100', '200', '300') // 两个函数都回执行
  
  // 移除事件
  o.off('abc', b)
  
  // 再次发布事件（触发）
  o.emit('abc', '100', '200', '300') // 只执行一个 a 函数了
  ```

### (4) 书写代码（婧婧上课教学：多事件）

- 原本方法使用的是对象，message只有一个事件。婧婧使用数组对象，功能更完善
- 1、当同一个事件有多个事件处理函数时，不能是匿名函数，函数单独写。
- 2、判断数组是否为空，如果为空直接添加，这个只会执行一次（多了这一步是因为空数组不能去判断值）
- 3、判断this.message中有没有所传的事件类型，有就往fn函数中添加处理函数，不存在就往this.message中添加对象

```javascript
 class Observer {
            constructor() {
                this.message = [];
            }
            on(type, fn) {
                /* 
                    [
                        {type:'abc',fn:'a函数'},
                        {type:'abc',fn:'b函数'}
                    ]
                    ====>
                    {
                        {type:'abc',fn:[a,b]}
                    }
                */
                // 判断 this.message 中是否存在这个事件类型
                // 如果存在 那么在fn函数中添加事件处理函数
                // 如果不存在就往this.message中添加这个对象
               //【注意点1】空的时候，直接添加对象，fn要以数组的形式添加
                if (!this.message[0]) {
                    this.message.push({
                        type,
                        fn: [fn]
                    })
                    return
                }

                //【注意点2】key就相当于item，是一个对象，如{type:'abc',fn:'a函数'}
                //【注意点3-1】当事件已经存在的时候，就把事件处理函数fn放入fn[]中
                for (let key of this.message) {
                    if (key.type === type) {
                        key.fn.push(fn);
                        return
                    }
                }
                //【注意点3-2】当事件不存在的时候，直接添加此对象
                this.message.push({
                    type,
                    fn: [fn]
                })
            }
            emit(type, fn) {
                this.message.forEach(item => {
                    // 当这个事件在message中存在的时候，那么就去匹配事件处理函数
                    if (item.type === type) {
                        item.fn.forEach(items => {
                            if (items === fn) {
                                // 构造函数中所有的方法中的this都指向 这个构造函数的的实例
                                //【注意点4】把items中的this强行改变为 observer 的实例
                                items.call(this)
                            }
                        })
                    }
                })
            }
            off(type, fn) {
                this.message.forEach((item, index) => {
                    if (item.type === type) {
                        //作业： 取消事件的时候，应该去fn数组中删除对应的事件后处理函数
                        item.fn.forEach((items, index) => {
                            if (items === fn) {
                                item.fn.splice(index, 1);
                            }
                        })
                    }
                })
            }
        }

        function a() {
            console.log('aaa');
        }

        function b() {
            console.log('bbbb');
            console.log(this);
        }

        let o1 = new Observer();
        // 当同一个事件对应多个事件处理函数的是，这些事件出来函数 最好要给一个名字
        o1.on('abc', a); //[{type:'abc',fn:[a]}]
        o1.on('abc', b); //[{type:'abc',fn:[a,b]}]
        o1.on('qwe', b); //[{type:'abc',fn:[a,b]},{type:'qwe',fn:[b]}]
        o1.on('qwe', a); //[{type:'bac',fn:[a,b]},{type:'qwe',fn:[b]}]
        o1.on('aaa', a);

        // 根据 传递的事件类型 和 事件处理函数触发事件
        o1.emit('abc', b);

 //关闭这个事件处理函数
        o1.off('abc', b);
        o1.off('qwe', a);
```

```javascript
            //使用forEach方法出现问题    
			   //  forEach 数组有多少个数据 会执行多少次
                // 不可以终断 
                // this.message.forEach(item => {
                //     console.log(item.type === type);
                //     // if(){}else{}
                //     if (item.type === type) {
                //         item.fn.push(fn);
                //     } else {
                //         this.message.push({ type, fn: [fn] })
                //     }
                // })
```

## 5.数据劫持:mushroom: 

- **观察者模式**和**数据劫持**是vue实现的双向数据绑定的核心 

### (1) 重置原型对象回顾
```javascript
        // 给Person.prototy 这个对象添加 construtor属性，并且属性值 Person构造函数
        // enumerable:false 让这个属性为不可遍历属性
        // configurable: false 设置该属性的配置属性不可以更改
        Object.defineProperty(Person.prototype, 'construtor', {
            value: Person,
            enumerable: false,
            configurable: true
        })

        Object.defineProperty(Person.prototype, 'construtor', {
            enumerable: true,
        })
```
### (2) 数据劫持

#### [1] 概念

- 在访问或者修改对象的某个属性时，通过一段代码拦截这个行为，拿到这结果进行一些额外的操作
- 使用的方法:`Object.defineProperty() `   和 ` Proxy`
  - Vue 2.x 利用` Object.defineProperty()`实现数据双向绑定
  - Vue 在 3.x 版本之后改用 Proxy 进行实现 实现数据双向绑定
- `Object.defineProperty(obj,prop,descriptor) ` 语法：
  - obj:所需要定义属性的对那个象
  - prop:要定义或修改的属性的名称
  - descriptor:是一个对象，被定义的属性或者修改的属性和描述符

```javascript
    let obj = {
        name:''
    }
   Object.defineProperty(obj,'name',{
        //get 方法是 当获取对象的这个name属性的时候执行的函数，但是默认会把这个返回值给到 name属性    
       get(){
            // 这里需要一个返回值 ，这个返回值就是给name属性赋值的
       }
       set(){
            // 当obj这个对象的name属性的值修改的时候，就会触发这个函数   
       }
   }) 

```

- `Object.keys(obj)`以数组的形式返回 `obj`这个对象的所有属性
- `Object.values(obj)` 以数组的形式返回 `obj`这个对象的属性属性值
- `Object.defineProperty()`三个缺点：
  - 不能监听数组的变化
  - 必须遍历对象的每个属性
  - 必须深层遍历嵌套的对象

#### [2] 上课内容

- 使用get(),writable:true 不可用。会报错
- 当obj中去使用name属性(prop)的时候就会执行**get方法**
- **set**中就是数据劫持，拿到想要更改的数据
  + 只要value更改了，就会触发set方法，value的值就是更改的值
  + 劫持了更改的值，但是不会改变属性的值
  + 需要将值在get方法中return
```javascript
 // 使用到Object.defineProperty() 方法中的两个方法 get() set()
        let obj = {};
        // 在 Object.defineProperty 中中需要给属性设置属性值的两种方式
        // 【1】value:'属性值' 这个属性就是  name属性的属性值
        // 【2】get(){ return '内容'} return 后面的内容也是name属性的属性值
        let val;
        Object.defineProperty(obj, 'name', {
            // value: 'aaa'
            configurable: true,
            get() {
                //【注意点1】当obj中取使用name属性的时候就会执行get方法
                return val;
            },
            set(value) {
                // set 中就是数据劫持，拿到你想要更改的数据
                val = value;
                // 【注意点2】只要更改了 obj这个对象的name属性的时候，都会触发一次set函数
                console.log(value);
                console.log(obj.name);
            }
        });
        obj.name = '1233';
        obj.name = "pppopi";
```

#### [3] 案例（简单）

- 当input输入的时候，那么div的内容也跟着变化（值input的内容）
- 把input的内容给到obj.txt，再把obj.txt内容给到div
  + obj.txt = text.value;            div.innerHTML = obj.txt;
- 使用数据劫持，一直获得input中的值，并一直给到div

```javascript
    <input type="text" id="text">
    <div id="div"></div>

    <script>
        let text = document.querySelector('#text');
        let div = document.querySelector('#div');

        let obj = {
            txt: ''
        }
        // 给input框添加输入事件
        let val;
        Object.defineProperty(obj, 'txt', {
                //【注意点1】这里最好可配置一下
            configurable: true,
            get() {
                //【注意点2】当使用obj.txt 的时候会触发 get()方法
                // 相当于把 val赋值obj.txt
                return val;
            },
            set(value) {
               //value就是你更改的那个数据
                val = value;
               // 【注意点3】这个位置在使用 obj.txt ，就会触发get方法，否则光凭set这个值是不会该改变的
                div.innerHTML = obj.txt;
            }
        });
        text.oninput = function () {
        // 输入事件中 把当前的value值赋值 obj.txt
        // 当我们需要更改 obj.txt这对象属性的属性值的时候，会触发 Object.defineProperty 中的set()
            obj.txt = text.value;
        };
    </script>
```

## 6、扩展obj的两个方法:mushroom: 

### (1) Object.keys 

- Object.keys(你要获取的那个对象) 

- 返回值：以数组的形式返回对象中所有的属性 

### (2) Object.values
- Object.values(你要获取的那个对象)
- 返回值：以数组的形式返回对象中的所有的属性值