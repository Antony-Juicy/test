# promise

## 1.ajax的封装

- ajax 使用起来太麻烦，因为每次都要写很多的代码
- 那么我们就封装一个 ajax 方法来让我们使用起来简单一些

### 【1】确定ajax请求的一些信息

```javascript
// 使用的时候直接调用，传递一个对象就可以
ajax({
  url: '', // 请求的地址
  type: '', // 请求方式
  async: '', // 是否异步
  data: '', // 携带的参数
  dataType: '', // 要不要执行 json.parse
  success: function () {} // 成功以后执行的函数
})
```

### 【2】封装

```javascript
function ajax(options) {
  // 先准备一个默认值
  var defInfo = {
    url: '', // 地址不需要默认值
    type: 'GET', // 请求方式的默认值是 GET
    async: true, // 默认值是异步
    data: '', // 参数没有默认值
    dataType: 'string', // 默认不需要执行 json.parse
    success (){}, // 默认是一个函数
  }

  // 先来判断一下有没有传递 url，如果没有，直接抛出异常
  if (!options.url) {
    throw new Error('url 必须传递')
  }

  // 有了 url 以后就，我们就把用户传递的参数和我们的默认数据合并
  for (let key in options) {
    defInfo[key] = options[key]
  }

  // 接下来的一切我们都是使用我们的 defInfo 就可以了
  // 第一步就是判断参数 data
  // data 可以不传递，可以为空
  // data 也可以是一个 key=value&key=value 格式的字符串
  // data 也可以是一个对象
  // 否则就抛出异常
  if (!(typeof defInfo.data === 'string' && /^(\w+=\w+&?)*$/.test(defInfo.data) || Object.prototype.toString.call(defInfo.data) === '[object Object]')) {
    throw new Error('请按照要求传递参数')
  }

  // 参数处理完毕以后，再判断 async 的数据类型
  // 只能传递 布尔数据类型
  if (typeof defInfo.async !== 'boolean') {
    throw new Error('async 参数只接受布尔数据类型')
  }

  // 在接下来就判断 type
  // 请求方式我们只接受 GET 或着 POST
    if (!/^(get|post)$/i.test(defInfo.type)) {
        throw new Error('暂时只支持get和post请求');
    }

  // 接下来就是判断 success 的判断，必须是一个函数
  if (Object.prototype.toString.call(defInfo.success) !== '[object Function]') {
    throw new Error('success 只接受函数数据类型')
  }

  // 参数都没有问题了
  // 我们就要把 data 处理一下了
  // 因为 data 有可能是对象，当 data 是一个对象的时候，我们要把它转换成一个字符串
  var str = ''
  if (Object.prototype.toString.call(defInfo.data) === '[object Object]') {
    for (let attr in defInfo.data) {
      str += `${attr}=${defInfo.data[attr]}&`
    }
    str = str.slice(0, -1)
    defInfo.data = str
  }

  // 参数全部验证过了以后，我们就可以开始进行正常的 ajax 请求了
  // 1. 准备一个 ajax 对象
  //    因为要处理兼容问题，所以我们准备一个函数
  function createXHR() {
    if (XMLHttpRequest) {
      return new XMLHttpRequest()
    } else {
      return new ActiveXObject('Microsoft.XMLHTTP')
    }
  }

  // 2. 创建一个 ajax 对象
  var xhr = createXHR()

  // 3. 进行 open
  xhr.open(defInfo.type, defInfo.url + (defInfo.type.toUpperCase() === 'GET' ? `?${defInfo.data}&_=${new Date().getTime()}` : ''), defInfo.async)

  if (defInfo.type.toUpperCase() === 'POST') {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
  }

  // 4. 进行 send
  xhr.send((defInfo.type.toUpperCase() === 'POST' ? `${defInfo.data}` : ''))

  // 5. 接受响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
      // 表示成功，我们就要执行 success
      // 但是要进行 dataType 的判断
      if (defInfo.dataType === 'json') {
        defInfo.success(JSON.parse(xhr.responseText))
      } else {
        defInfo.success()
      }
    }
  }
}
```

```javascript
//婧姐课上封装
/**
 * @param {object} option I am argument option. 
 */
function ajax(option) {
    // 在发送请求之前先判断参数是否正确
    // 1.必须有的参数：url
    if (!option.url) {
        // 当没有url地址的时候 应该手动抛出一个错误，告诉调用者，url是必填参数
        // throw 抛出错误
        throw new Error('url是必填参数')
    }

    // 2.设置默认的参数
    let defInfo = {
        type: 'get',
        data: '',
        async: true,
        success() { }
    }

    // 3.循环把传递进来的参数 取出来拿给默认参数对象
    for (let attr in option) {
        defInfo[attr] = option[attr];
    }

    // 4.判断请求方式type 是否是get 或者 post
    if (!/^(get|post)$/i.test(defInfo.type)) {
        throw new Error('暂时只支持get 和post请求');
    }

    // 5.ajax请求携带的参数只支持 "key=value&age=18"
    if (!(typeof defInfo.data === 'string' && /^(\w+=\w+&?)*$/.test(defInfo.data) || Object.prototype.toString.call(defInfo.data) == '[object Object]')) {
        throw new Error('data参数只支持key=vlue 或者对象')
    }

    // {name:aa,age:18}===> name=aa&age=18
    // 6.如果参数时对象的时候，那么久把这个对象处理 key=value&age=18
    let str = '';
    if (Object.prototype.toString.call(defInfo.data) == '[object Object]') {
        for (let key in defInfo.data) {
            // console.log(key);
            str += `${key}=${defInfo.data[key]}&`
        }
    }
    // 把处理好的结果赋值给data
    defInfo.data = str.slice(0, -1);

    // 7.判断传进来的success是否是函数
    if (!(Object.prototype.toString.call(defInfo.success) === "[object Function]")) {
        throw new Error('success 必须是一个函数')
    }

    // 8.判断async的值是否是布尔值
    if (!(Object.prototype.toString.call(defInfo.async) === "[object Boolean]")) {
        throw new Error('async 只能是布尔值')
    }

    // 8.发送ajax请求
    // let xhr = new XMLHttpRequest();
    // let xhr = new ActiveXObject("Microsoft.XMLHTTP");

    /* 
        try{
            尝试执行这里的代码，如果这里的代码能执行就会把这个代码执行
            如果这里代码有错误，那么久执行 catch
        }catch(error){
            当try中代码有问题，执行这里代码
            如果try中代码没有问题，不会执行这里
        }
    */
    // let xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // 设置请求的方式 和url地址
    // 进行判断，如果过get请求，需要把参数拼接在url地址后面
    if (/^(get)$/i.test(defInfo.type)) {
        xhr.open(defInfo.type, defInfo.url + '?' + defInfo.data, defInfo.async);
        xhr.send();
    } else {
        xhr.open(defInfo.type, defInfo.url, defInfo.async);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(defInfo.data)
    }

    // 接收响应体
    xhr.onreadystatechange = function () {
        if (/^2\d{2}$/.test(xhr.status) && xhr.readyState === 4) {
            defInfo.success(xhr.responseText);
        }
    }
}
```



## 2.Promise

- Promise是一个构造函数，ES6中的一个知识点
- 所谓的Promise对象，就是通过new Promise()实例化得到的对象，用来传递异步操作的消息。
- 它代表了某个未来才会知道结果的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。 

### 【1】回调函数

- 什么是回调函数？

  - 回调函数就是 把函数当成另一个函数的参数

  - 函数b为函数 a的参数

    ```javascript
    function a(cb) {
      cb()
    }
    
    function b() {
      console.log('我是函数 b')
    }
    
    a(b)
    ```

- 为什么需要回调函数？

  - 当我们执行一个异步的行为的时候，我们需要在一个异步行为执行完毕之后做一些事情
  - 那么，我们是没有办法提前预知这个异步行为是什么时候完成的
  - 我们就只能以回调函数的形式来进行
  - 就比如我们刚刚封装过的那个 `ajax` 函数里面的 `success` 
  - 我们并不知道 ajax 请求什么时候完成，所以就要以回调函数的形式来进行



### 【2】回调地狱

- 当一个回调函数嵌套一个回调函数的时候
- 就会出现一个嵌套结构
- 当嵌套的多了就会出现回调地狱的情况
- 比如我们发送三个 ajax 请求
  - 第一个正常发送
  - 第二个请求需要第一个请求的结果中的某一个值作为参数
  - 第三个请求需要第二个请求的结果中的某一个值作为参数

```javascript
ajax({
  url: '我是第一个请求',
  success (res) {
    // 现在发送第二个请求
    ajax({
      url: '我是第二个请求'，
      data: { a: res.a, b: res.b },
      success (res2) {
        // 进行第三个请求
        ajax({
          url: '我是第三个请求',
          data: { a: res2.a, b: res2.b },
  				success (res3) { 
            console.log(res3) 
          }
        })
      }
    })
  }
})
```

- **总结：回调地狱，其实就是回调函数嵌套过多导致的**

### 【3】Promise的应用

- 为了解决回调地狱

- 作用：当需要执行一个异步程序的时候，就可以把这个程序交给promise，让他去执行，并且返回结果。

- 是ES6提供的一个新的语法（对象）。

### 【4】封装一个`promise`的`ajax`**

```javascript
	function pAjax(option) {
        return new Promise(function (resvole, reject) {
            ajax({
                url: option.url,
                data: option.data || '',
                type: option.type || 'get',
                async: option.async || true,
                success(res3) {
                    console.log(res3);
                    resvole(JSON.parse(res3));
                }
            })
        })
    }
```

```javascript
//`promise`的`ajax`调用
<body>
    <script src="../js/ajax.js"></script>
    <script>
        let p = pAjax({
            url: '../api/data1.php'
        })
        p.then(function (data1) {
            // pajax() 返回值是一个promise对象
            // then中返回promise才可以继续then
            return pAjax({
                url: '../api/data2.php',
                data: data1
            })
        }).then(function (data2) {
            return pAjax({
                url: '../api/data3.php',
                data: data2
            })
        }).then(function (data3) {
            console.log(data3);
        })
    </script>
</body>
```

#### （1）`Promise`的状态

- `Pending（未完成）`可以理解为Promise对象实例创建时候的初始状态
- `Resolved（成功）` 可以理解为成功的状态
- `Rejected（失败）` 可以理解为失败的状态

#### （2）`Promise`的基本语法

- `Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject` 方法
- `Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。 

```javascript
new Promise(function (resolve, reject) {
  // resolve 表示成功的回调
  // reject 表示失败的回调
}).then(function (res) {
  // 成功的函数
}，function(err){
    // 失败的函数
})
```

#### （2）`resolve() `方法

- `resolve`作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending` 变为` resolved`）
- 在异步操作成功时调用
- 并将异步操作的结果，作为参数传递出去； 

#### （3）`reject() `方法

- reject作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected）
- 在异步操作失败时调
- 并将异步操作报出的错误，作为参数传递出去。 

#### （4）`then()` 方法

- `then`方法可以接受两个回调函数作为参数。
  - 第一个回调函数是`Promise`对象的状态变为`resolved`时调用
  - 第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受`Promise`对象传出的值作为参数。 

- 其中，第二个函数是可选的，不一定要提供。
- 这两个函数都接受`Promise`对象传出的值作为参数。

```javascript
 function getData(url) {
     // 创建一个 promise对象，并且当做 getDate函数的返回值
     return new Promise((resolve, reject) => {
         let xhr = new XMLHttpRequest();
         xhr.open('get', url);
         xhr.send();
         xhr.onreadystatechange = function () {
             if (xhr.readyState !== 4) {
                 return
             }
             if (xhr.status === 200) {
                 resolve(xhr.responseText);
             } else {
                 reject(xhr.responseText);
             }
         }
     })
 }

getData('./test.php').then(function (res) {
    console.log(res);
}, function (err) {
    console.log(err);
})
```

- `then`方法是定义在原型对象`Promise.prototype`上的。 
- 它的作用是为 Promise 实例添加状态改变时的回调函数。 
- `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。
- 因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。 

```javascript
 getData('./test.php').then(function (res) {
     return getData('./list.php')
 }).then(function (res) {
     console.log("resolved: ", res);
 }, function (error) {
     console.log("rejected: ", err);
 })
```

上面代码中，

- 第一个`then`方法指定的回调函数，返回的是另一个`Promise`对象。
- 这时，第二个`then`方法指定的回调函数，就会等待这个新的`Promise`对象状态发生变化。
  - 如果变为`resolved`，就调用第一个回调函数
  - 如果状态变为`rejected`，就调用第二个回调函数。 

#### （5）`catch() `方法

- `catch()` 可以说是then方法 中的第二个回调函数
- 主要用于指定发生错误时的回调函数。 

```javascript
getData('./test.php').then(function(res){
    console.log('成功的状态执行的')
},function(error){
    consloe.log('失败的状态执行的')
})
//在then方法中写两个 回调函数比较麻烦，所以可以写成一下
getData('./test.php').then(function(res){
    console.log('成功的状态执行的')
}).catch(function(res){
    consloe.log('失败的状态执行的')
})
```

- 上面代码中，`getData()`方法返回一个 Promise 对象
  - 如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；
  - 如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。
  - 另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。 

#### （6）`finally()`

- `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。
- 该方法是 ES2018 引入标准的。(ES9) ,了解一下



#### （7）`Promise.all() `

- `Promise.all() `方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。 
- `Promise.all()`方法接受一个数组作为参数 

```javascript
let p = Promise.all([p1, p2, p3]);
```

- `p1`、`p2`、`p3`都是 Promise 实例，如果不是，就会先调用上面讲到的`Promise.resolve`方法，将参数转为 Promise 实例，再进一步处理。 

- `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。 

  -  只有`p1`、`p2`、`p3`的状态都变成`resolved`，`p`的状态才会变成`resolved`， `p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数
  - 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。 

  ```javascript
  //创建3个promise对象
  let p1 = getData('./list.php');
  let p2 = getData('./list1.php');
  let p3 = getData('./list2.php');
  
  let p = Promise.all([p1, p2, p3]);
  p.then(res => {
      console.log(res);
  }).catch(error => {
      console.log(error);
  })
  ```

  

#### （8）`Promise.race()`

- `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。 

```javascript
let p = Promise.race([p1, p2, p3]);
```

- 只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。
- 那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数 

**总结：**

- 静态方法
  - Promise.resolve()
  - Promise.reject()
  - Promise.all()
  - Promise.race()
- 原型属性方法
  - Promise.prototype.then()
  - Promise.prototype.catch()



## 3.async  和 await

### 【1】`async`关键字：

- 它作为一个关键字放到函数前面
- 用于表示函数是一个异步函数因为async就是异步的意思
-  异步函数也就意味着该函数的执行不会阻塞后面代码的执行。

```javascript
//这就是一个异步的函数
async function timeout() {
　　return 'hello world';
}
```

- 调用异步函数

  - 异步函数也是函数，所以按照正常的函数调用即可
  - 为了表示它没有阻塞它后面代码的执行 ，我们在`async` 函数调用之后加一句`console.log(); `

  ````javascript
  async function timeout() {
      return 'hello world'
  }
  timeout();
  console.log('虽然在后面，但是我先执行');
  ````

  - 在异步的函数㕜 如果我想要拿到函数的返回值，怎么拿到呢
  - 我们打印`console.log(timeout())` 这个函数得到并不是 return后面的值 ，而是一个`promise`对象
  - 如果要获取到`promise` 返回值，我们应该用`then `方法

  ```javascript
  async function timeout() {
      return 'hello world'
  }
  timeout().then(result => {
      console.log(result);
  })
  console.log('虽然在后面，但是我先执行');
  
  //打印结果
  虽然在后面，但是我先执行
   hello world
  ```



- 接下来看一个案例

  ```javascript
  //创建一个函数，这个函数是一个promise对象
  //主要实现的功能是 每一个一段时间 去打印我想要的值
  function getNum(num, seconds) {
       return new Promise(function (resolve, reject) {
           setTimeout(() => {
               console.log(num)
           }, seconds);
       })
   }
  //一次调用该函数，并且设置打印的值 和 时间
  getNum(1, 3000);
  getNum(2, 1000);
  getNum(3, 2000);
  
  //打印的结果  2 3 1 
  //因为定时器是一个异步的程序，谁执行的少一点就会先打印谁的的num
   
  ```

  - 根据以上代码，想要得到结果 为 1 2 3,应该怎么实现呢？
  - 其实就是想要把异步变成同步的执行
  - 那么就会涉及一个关键字 `await`

### 【2】`await `关键字

- `await`是等待的意思,它后面跟着什么呢，那么它等待什么呢 ？ 
- 其实它后面放的就是一个promise对象。
- 等待的就是promise 成功回调的数据，也就是 resolve()方法的数据
- **注意await 关键字只能放到`async` 函数里面 **

```javascript
 function fun() {
     setTimeout(() => {
         console.log(1);
     }, 500);
     console.log('aaaa');
 }
fun();
//打印的结果 aaaa  到500毫秒之后在打印1
```

- 我们看到以上的代码执行结果 ` aaaa  到500毫秒之后在打印1`
- 那么如果我想要 先 执行 延时器里面的值 ，在执行 aaaa，怎么

````javascript
async function fun() {
    // 在一个promise对象中写 延时器（异步程序）
    // 当async函数中遇到 await 就会暂停往下执行，而是等待await后面的promise执行完成之后再继续往下执行
    // 怎么才能知道 promise对象之后完成了？
    // 当await接收到promise对象中的resolve方法返回来的值，就表示promise执行完成了
    await new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log(1);
            resolve();
        }, 500);
    })
    console.log('aaaa');
}
fun();
````

- 执行打印结果：`到500毫秒在印1 再打印aaaa`
- 接下来我们把刚刚的根据定时器大是数字顺序的案例实现一下（巩固async/await 的知识点）

```javascript
 function getNum(num, seconds) {
     return new Promise(function (resolve, reject) {
         setTimeout(() => {
             console.log(num)
             // await 是等待的，也就是说当代码异步的函数中遇到了 await时候，代码就会暂停在这里，不会往下执行，等后面的promise对象执行完毕，然后拿到promise resolve 的值并进行返回，返回值拿到之后，它才会继续向下执行。
             resolve(num);
         }, seconds);
     })
 }

//写一个异步 函数，因为 await只能写在 async的中
async function fun() {
    let num1 = await getNum(1, 1000);
    let num2 = await getNum(2, 500);
    let num3 = await getNum(3, 800);
}
fun();
```

- 以上代码的解析过程：
  - 调用`fun`函数，它里面遇到了第一个`await`,就会暂停把await后面的promise对象执行完成之后 在继续往下执行，当执行完后面的promise对象，其实就打印了 `num=1`出来 
    - 程序怎么才知道 promise对象执行完成了呢？
    - 当拿到promise对象的` resolve`的值表示promise执行完成，所以需要调用` resolve()`
  - 第一个await后面的promise对象 执行完成之后，遇到 第二个 await，又会继续等待await后面的promise执行完成
  - 当第二个await后面的promise对象执行完成之后，遇到第三个 await，有继续等待 await后面的promise执行完成
- **总结：其实async / await就是用同的形式去解析 异步的代码**

## 4、终极解决回调地狱

- 使用封装好的pAjax函数，与async和await结合

  ```javascript
      <script>
          fun();
          async function fun() {
              // await 可以直接把promise执行结果返回
              // res1 就是 请求出来的数据(异步函数执行完的结果)
              let res1 = await pAjax({
                  url: '../api/data1.php',
              });
  
              // 想要执行 data2,php ,
              let res2 = await pAjax({
                  url: '../api/data2.php',
                  data: res1
              });
  
              let res3 = await pAjax({
                  url: '../api/data3.php',
                  data: res2
              })
              console.log(res3);
          }
      </script>
  ```

  