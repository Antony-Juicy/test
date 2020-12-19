# 正则

- 正则表达式，又名 “规则表达式”

- 由我们自己来书写 “规则”，专门用来检测 **字符串** 是否符合 “规则” 使用的

- 我们使用一些特殊的字符或者符号定义一个 “规则公式”，然后用我们定义好的 “规则公式” 去检测字符串是不是合格

  ```javascript
  var reg = /\d+/
  var str1 = '123'
  var str2 = 'abc'
  console.log(reg.test(str1)) // true
  console.log(reg.test(str2)) // false
  ```

  - 上面的变量 `reg` 就是定制好的规则
  - 检测 `str1` 这个字符串的时候，符合规则
  - 检测 `str2` 这个字符串的时候，不符合规则



## 一、创建一个正则表达式

- 想制定 “规则”，必须要按照人家要求的方式来制定
- 把一些字母和符号写在 `//` 中间的东西，叫做正则表达式，比如 `/abcdefg/`
- 创建正则表达式有两个方式 **字面量** 和 **构造函数创建**



### 1、字面量创建

```javascript
// 下面就是字面量创建一个正则表达式
var reg = /abcdefg/
```

- 这个正则表达式就可以去检测字符串了



### 2、构造函数创建

```javascript
// 下面就是构造函数创建一个正则表达式 （一般不用）
var reg = new RegExp('abcdefg')
console.log(reg) //  /abcdefg/
```

- 使用构造函数方式创建的和字面量创建的，得到的结果一样



## 二、正则表达式里面的符号

- 知道了怎么创建一个正则表达式以后，我们就来详细的说一下正则表达式里面涉及到的一些符号了
  - /^[a-zA-Z]\d{3}$/ 表示匹配以字母开头，三个数字结尾



### 1、元字符（\d等）

- 匹配：包含。

- `.` ： 匹配非换行（单个）的任意字符 （\n表示换行，如果全都是\n，才返回false）
  + .本来是有特殊含义。如果只是想得到一个没有意义的.则\.就是普通的.
  + 再比如，d表示字母d,而\d表示匹配数字
- `\` ： 转译符号，把有意义的 **符号** 转换成没有意义的 **字符**，把没有意义的 **字符** 转换成有意义的 **符号**
- `\s` ： 匹配空白字符（空格/制表符/...）
- `\S` ： 匹配非空白字符
- `\d` ： 匹配数字
- `\D` ： 匹配非数字
- `\w` ： 匹配数字字母下划线 （只要包含三个中的一种就可以，得到true。||关系）
- `\W` ： 匹配非数字字母下划线



- 有了元字符我们就可以简单的制定一些规则了

  ```javascript
  var reg = /\s/
  var str = 'a b'
  var str2 = 'ab'
  console.log(reg.test(str)) // true
  console.log(reg.test(str2)) // false
  ```

  ```javascript
  var reg = /\d/
  var str = 'abc1'
  var str2 = 'abc'
  console.log(reg.test(str)) // true
  console.log(reg.test(str2)) // false
  ```

  ```javascript
  var reg = /\w/
  var str = 'a1'
  var str2 = '#@$'
  console.log(reg.test(str)) // true
  console.log(reg.test(str2)) // false
  ```

  

### 2、限定符（+*？{n,}等）

- `*` ： 前一个内容重复至少 0 次，也就是可以出现 **0 ～ 正无穷** 次
  + `/\d*/` 表示数字至少0次
- `+` ： 前一个内容重复至少 1 次，也就是可以出现 **1 ～ 正无穷** 次
  + `/\d+/` 表示数字至少1次
- `?` ： 前一个内容重复 0 或者 1 次，也就是可以出现 **0 ～ 1** 次
- `{n}` ： 前一个内容重复 n 次，也就是必须出现 **n** 次
  + `/\d{3}/  ` 数字只能出现3次u
- `{n,}` ： 前一个内容至少出现 n 次，也就是出现 **n ～ 正无穷** 次
- `{n,m}` ： 前一个内容至少出现 n 次至多出现 m 次，也就是出现 **n ～ m** 次



- 限定符是配合元字符使用的

  ```javascript
  // 下面正则表示验证数字出现 0 ～ 正无穷次都可以
  var reg = /\d*/
  var str = 'abc'
  var str2 = 'abc1'
  var str3 = 'abc123'
  console.log(reg.test(str)) // true
  console.log(reg.test(str2)) // true
  console.log(reg.test(str3)) // true
  ```

  ```javascript
  // 下面正则表示验证数字出现 1 ～ 正无穷次都可以
  var reg = /\d+/
  var str = 'abc'
  var str2 = 'abc1'
  var str3 = 'abc123'
  console.log(reg.test(str)) // false
  console.log(reg.test(str2)) // true
  console.log(reg.test(str3)) // true
  ```

  ```javascript
  // 下面正则表示验证数字出现 0 ~ 1 次都可以
  var reg = /\d?/
  var str = 'abc'
  var str2 = 'abc1'
  console.log(reg.test(str)) // true
  console.log(reg.test(str2)) // true
  ```

  ```javascript
  // 下面正则表示验证数字必须出现 3 次
  var reg = /\d{3}/
  var str = 'abc'
  var str2 = 'abc1'
  var str3 = 'abc123'
  console.log(reg.test(str)) // false
  console.log(reg.test(str2)) // false
  console.log(reg.test(str3)) // true
  ```

  ```javascript
  // 下面正则表示验证数字出现 3 ～ 正无穷次
  var reg = /\d{3,}/
  var str = 'abc'
  var str2 = 'abc1'
  var str3 = 'abc123'
  var str4 = 'abcd1234567'
  console.log(reg.test(str)) // false
  console.log(reg.test(str2)) // false
  console.log(reg.test(str3)) // true
  console.log(reg.test(str4)) // true
  ```

  ```javascript
  // 下面正则表示验证数字只能出现 3 ～ 5 次
  var reg = /\d{3,5}/
  var str = 'abc'
  var str2 = 'abc1'
  var str3 = 'abc123'
  var str4 = 'abc12345'
  console.log(reg.test(str)) // false
  console.log(reg.test(str2)) // false
  console.log(reg.test(str3)) // true
  console.log(reg.test(str4)) // true
  ```



### 3、边界符（^$）

- `^` ： 表示开头（必须以这个正则开头）
- `$` ： 表示结尾 （必须以这个正则结尾）



- 边界符是限定字符串的开始和结束的

  ```javascript
  // 下面表示从开头到结尾只能有数字，并且出现 3 ～ 5 次
  var reg = /^\d{3,5}$/
  var str = 'abc'
  var str2 = 'abc123'
  var str3 = '1'
  var str4 = '1234567'
  var str5 = '123'
  var str6 = '12345'
  console.log(reg.test(str)) // false
  console.log(reg.test(str2)) // false
  console.log(reg.test(str3)) // false
  console.log(reg.test(str4)) // false
  console.log(reg.test(str5)) // true
  console.log(reg.test(str6)) // true
  ```



### 4、特殊符号 ()[]等

- `()` ： 限定一组元素，把一堆东西当作一个整体

- `[]` ： 字符集合，表示写在 `[]` 里面的任意**一个**都行

- `[^]` ： 反字符集合，表示写在 `[^]` 里面之外的任意**一个**都行 

  + 非的意思，必须要在[]里

  + /^[ ^0-9 ]/ 表示开头不是数字就行
  + /[ ^a ]/ 表示不是a

- `-` ： 范围，比如 `a-z` 表示从字母 a 到字母 z 都可以

- `|` ： 或，正则里面的或 `a|b` 表示字母 a 或者 b 都可以



- 现在我们就可以把若干符号组合在一起使用了

  ```javascript
  // 下面是一个简单的邮箱验证
  // 非_$开头，任意字符出现至少6次，一个@符号，(163|126|qq|sina)中的任意一个，一个点，(com|cn|net)中的任意一个
  var reg = /^[^_$].{6,}@(163|126|qq|sina)\.(com|cn|net)$/
  ```



### 5、标示符 （i g m）

- `i` ： 表示忽略大小写
  - 这个 i 是写在正则的最后面的
  - `/\w/i`
  - 就是在正则匹配的时候不去区分大小写
- `g` ： 表示全局匹配
  - 这个 g 是写在正则的最后面的
  - `/\w/g`
  - 就是全局匹配字母数字下划线
- `m`：表示换行匹配
  + 如果碰到换行就重新计算行首

### 6、空白符 （空格换行null等）

- `\0` null
- `\b` 空格
- `\n` 换行
- `\r` 回车
- `\t` 制表符
- `\s` 任意单个空白字符
### 7、中文正则表达式
 `\4e00-\u9fa5`
## 三、正则表达式的方法

- 正则提供了一些方法给我们使用
- 用来检测和捕获字符串中的内容的

### 1、test

- `test` 是用来检测字符串是否符合我们正则的标准

- 语法： `正则.test(字符串)`

- 返回值： boolean

  ```javascript
  console.log(/\d+/.test('123')) // true
  console.log(/\d+/.test('abc')) // false
  ```



### 2、exec

- `exec` 是把字符串中符合条件的内容捕获出来

- 语法： `正则.exec(字符串)`

- 返回值： 把字符串中符合正则要求的第一项以及一些其他信息，以**数组**的形式返回

  ```javascript
  var reg = /\d{3}/
  var str = 'hello123world456你好789'
  var res = reg.exec(str)
  console.log(res)
  /*
  	["123", index: 5, input: "hello123world456你好789", groups: undefined]
      0: "123"
      groups: undefined
      index: 5
      input: "hello123world456你好789"
      length: 1
    	__proto__: Array(0)
  */
  ```

  - 数组第 0 项就是匹配到的字符串内容
  - index 属性表示从字符串的索引几开始是匹配的到字符串



## 四、字符串的方法

- 字符串中有一些方法也是可以和正则一起使用的



### 1、search

- `search` 是查找字符串中是否有满足正则条件的内容

- 语法： `字符串.search(正则)`

- 返回值 ： 有的话返回开始索引，没有返回 -1 (就算有多个符合，且加了g，也是返回第一个匹配到的索引)

  ```javascript
  var reg = /\d{3}/
  var str = 'hello123'
  var str2 = 'hello'
  console.log(str.search(reg)) // 5
  console.log(str2.search(reg)) // -1
  
  ```

  

### 2、match

- `match` 找到字符串中符合正则条件的内容返回（以数组的形式返回，没有就返回null）

- 语法： `字符串.match(正则)`

- **返回值** ： 

  - 没有标示符 g 的时候，是和 exec 方法一样
  - 有标示符 g 的时候，是返回一个数组，里面是匹配到的每一项

  ```javascript
  var reg = /\d{3}/
  var str = 'hello123world456'
  var str2 = 'hello'
  console.log(str.match(reg)) 
  // ["123", index: 5, input: "hello123wor456", groups: undefined]
  console.log(str2.match(reg)) // null
  ```

  ```javascript
  var reg = /\d{3}/g
  var str = 'hello123world456'
  var str2 = 'hello'
  console.log(str.match(reg)) 
  // ["123", "456"]
  console.log(str2.match(reg)) // null
  ```

  

### 3、replace

- `replace` 是将字符串中满足正则条件的字符串替换掉

- 语法1： `字符串.replace(正则，要替换的字符串)`
- 语法2：`字符串.replace(正则，回调函数)`
```javascript
//语法2示例  （详见案例获取url参数）
var res = url.replace(/\??([a-z]+)=([0-9a-z]+)&?/gi, function (match, p1, p2) {
                // match 为正则匹配的字符串
                // p1 为正则中第一个圆括号里面的值   
                // p3 为正则第二个圆括号里面的值
                if (p1 in obj) {
                    // 把参数值用数组显示
                    var arr = [p2]; //['ww']
                    obj[p1] = arr.concat(obj[p1])
                } else {
                    obj[p1] = p2;
                }
            });
```

- 返回值 ： 替换后的字符串

  ```javascript
  var reg = /\d{3}/
  var str = 'hello123world456'
  var str2 = 'hello'
  console.log(str.replace(reg)) // hello666world456
  console.log(str2.replace(reg)) // hello
  ```

  ```javascript
  var reg = /\d{3}/g
  var str = 'hello123world456'
  var str2 = 'hello'
  console.log(str.replace(reg)) // hello666world666
  console.log(str2.replace(reg)) // hello
  ```
### 4、split （没懂）
  - 格式：字符串.split(分割符/正则)；
  - 功能：用分割符将原字符串进行分割
  - 返回值：分割剩下的子串组成的数据。
```javascript
    var str = "how are Are ARE you";
    var res = str.split(/are/i)      //因为split本身就会自动查找全局，所以不用加g
    console.log(arr);
```

## 五、案例

### 1、验证0~255案例

```javascript
<script>
        // 验证0-255的数字
        // var reg = /^[0-255]$/; //0 1 2 5
        /* 
            0-9   一位数 \d
            10-99 两位 \d{2}
            100-255  三位数的值
            百位数： 1 2
            十位：
                百位数：1   十位数：0-9  个位数：0-9   1\d{2}
                百位数：2   十位数：0-4  个位数：0-9   2[0-4]\d
                百位数：2   十位数：5     个位数：0-5  25[0-5]
         */
        // 验证0-255的数字
        var reg = /^(\d|\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/;
        var str = '0234';
        // console.log(str);
        console.log(reg.test(str));
    </script>

```

### 2、验证出生年月

```javascript
          /* 
            \1 表示和 第一个圆括号中的值一样
            \2 表示跟第二个 圆括号的值一样
         */

        var reg = /^\d{4}(-|\/|\.)?(0[1-9]|1[0-2])\1(0[1-9]|[12][0-9]|3[01])$/;
        var str = '1999-12-12';
```

### 3、查找文章中的手机号

```javascript
//文章中许多字以及数字
//老师的写法
    <script>
        var text = document.querySelector('#text').innerHTML;

        // 写一个正则来获取文章中的手机号
        // \b 边界的字符符号 得与其类型不同，本题中就是非数字
        var reg = /\b1[35789]\d{9}\b/g;
        var res = text.match(reg);
        console.log(res);
    </script>

		//错误写法
         //这样会从很多位数字中抽取出11位数字
		var res = str.match(/1[34578]\d{9}/g);
```

### 4、表单验证（用户名部分）

```javascript
//用户名中英文验证（字符串的长度在7-14之间，一个汉字等于两个字符）
	userName.onchange = function () {
            var str = userName.value;
            // var reg = /^[a-z]{7,14}$/i; 字母
            // var reg = /^[\u4e00-\u9fa5]{3,7}$/; 汉字
            var reg = /^([a-z\u4e00-\u9fa5]{7,14})$/
            // 一个中文有两个字节，
            var res = reg.test(str);
            if (res) {
            // 判断：用户名是否存在中文，如果存在就用两个字母替换中文
                str = str.replace(/[\u4e00-\u9fa5]/g, 'aa');
             // 判断字符串的长度，如果字符串的长度在7-14之间就满足要求，如果大于14
                if (str.length <= 14 && str.length >= 7) {
                    test.innerHTML = true;
                } else {
                    test.innerHTML = '用户名长度为7-14个字节';
                }
            }
            // test.innerHTML = res;
        }
```

### 5、获取url参数

```javascript
//自己的做法 缺点：只能返回参数值为id，和name的值
	function getUrl(url, attr) {
            //正则判断url id=  name = 
            var reg = /id=\d{0,}|name=[a-zA-Z\u4e00-\u9fa5]{0,}/g;
            // match找到内容返回数组
            var res = url.match(reg);
            // var arr = res.split('='); //不能直接分割，因为是个数组，所以应该循环
            var obj = {}
            res.forEach(function (item) {
                var res1 = item.split('=');
                // 第一项当成属性，第二项当成属性值
                obj[res1[0]] = res1[1];
            })
            // console.log(obj);

            //判断是否有参数传进,有就打印参数，没有就打印这个对象
            if (attr) {
                return obj[attr];
            } else {
                return obj;
            }
        }
```

```javascript
//老师的做法
          /*
            >规则：
                >1. 指定参数名称，返回该参数的值 或者 空字符串
                >2. 不指定参数名称，返回全部的参数对象 或者 {}
                >3. 如果存在多个同名参数，则返回数组
         */
	// url：https://www.baidu.com/?id=100&name=aa&name=ww
        function fun(url, attr) {
            // var index = url.indexOf('?'); 这是以前未学正则的做法
            // var res = url.substring(index + 1);
            // console.log(res);
            var obj = {};
            // \??表示问号0-1个  +表示出现一次及以上
            //新知识点：replace回调函数 
            // match 为正则匹配的字符串
            // p1 为正则中第一个圆括号里面的值   
            // p3 为正则第二个圆括号里面的值
            var res = url.replace(/\??([a-z]+)=([0-9a-z]+)&?/gi, function (match, p1, p2) {
                //这个是同名函数的判断                
                if (p1 in obj) {
                    // 把参数值用数组显示
                    var arr = [p2]; //['ww']
                    obj[p1] = arr.concat(obj[p1])
                } else {
                    obj[p1] = p2;
                }
            });
            // 如果第二个参数存在 就返回 这个参数的参数值
            // 如果{} 里面只有一句话的时候，{} 可以省略不写
            if (attr) return obj[attr];
            return obj;
        }
```



