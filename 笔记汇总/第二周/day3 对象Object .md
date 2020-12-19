# object 对象

# 1、创建对象
>(1)字面量（赋值式创建）（推荐）：var obj = {name:'小明',age:18}

>(2)内置构造函数创建：var obj = new Object();
>
>​	注：给内置构造函数对象添加内容，要把内容用{}括起来，因为麻烦，所以一般不使用。var obj = new Object(**{name:'小明',age:18}**);
>
>(3)对象中的内容 是以键值对的形式书写   键：值 （key:value**,**）==》 属性：属性值。(color:red**;**)

# 2、读取对象
- (1)`obj.name;//==>小明`

- (2) `obj['name']//==>小明`

>如果读取一个不存在的属性，返回undefined

# 3、添加属性
- 如果存在此属性就是修改，没有就是添加。
```
(1) .语法 对象.属性 = 属性值
	obj.sex = '男';
	obj.marry = false;
(2) []中括号语法  对象[变量 | '属性'] = 属性值;
	obj['weight'] = 60;
```

# 4、删除属性
```
var obj = {name:'laoxie',age:18,gender:'man'}

//删除age属性
delete obj.age;
```

# 5、遍历对象 for...in(){}
```
var obj = {
    name:'laoxie',
    age:18
    gender:'男'
}

//遍历对象
for(var key in obj){
    //遍历过程把每次把对象属性赋值给key
    //所以获取对象属性值为：obj[key]
    document.write(obj[key]);//分别输出：'laoxie',18,'男'
}
```
>注意：有几个属性，就遍历几次

# 6、数组 与 对象的组合
```javascript
var product = [{
    id:'001',
    name:'iphone7 plugs',
    nickname:'肾7',
    imgurl:'img/ip7.jpg',
    price:5899.00,
    sale:5888.00,
    color:'土豪金'
},{
    id:'002',
    name:'Note7',
    nickname:'爆炸7',
    imgurl:'img/note7.jpg',
    price:3899.00,
    sale:998.00,
    color:'黑色'
},{
    id:'003',
    name:'荣耀7',
    nickname:'牛x7',
    imgurl:'img/honor7.jpg',
    price:1999.00,
    sale:1899.00,
    color:'白色'
}]
```

根据以上数据，生成一个商品列表

- 模板字符串 ``可以换行

- 模板字符串中写变量 ${ }

  ```javascript
  for(var i = 0;i < product.length; i++){
      output.innerHTML += `<li>
         <h2>${product.id}号</h2>
         <p>姓名:${product.name}</p>
  `
  }
  ```

- `sort方法`可以根据对象的某个属性值来排序

## 显示成绩的案例
```javascript
<h1>成绩表</h1>
    <div id="datalist">
        <table>
            <thead>
                <tr>
                    <th>学号</th>
                    <th>语文</th>
                    <th>数学</th>
                    <th>英语</th>
                    <th>总成绩</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody id="content">
            </tbody>
        </table>
    </div>
    <script>
        var stu = [
            { id: 1, chinese: 105, math: 62, english: 118 },
            { id: 2, chinese: 89, math: 78, english: 120 },
            { id: 3, chinese: 86, math: 64, english: 91 },
            { id: 4, chinese: 78, math: 99, english: 80 },
            { id: 5, chinese: 107.5, math: 97, english: 70 },
            { id: 6, chinese: 112, math: 61, english: 100 },
            { id: 7, chinese: 101, math: 100, english: 104 },
            { id: 8, chinese: 71, math: 72, english: 105 },
            { id: 9, chinese: 56, math: 68, english: 61 },
            { id: 10, chinese: 98, math: 83, english: 77 },
        ];
        // 给学生对象添加一个总成绩的属性
        // for循环拿到每一个对象，并且给对象添加总成绩属性
        for (var k = 0; k < stu.length; k++) {
            stu[k].total = stu[k].chinese + stu[k].math + stu[k].english;
        }
        // 保存语文成绩最高的学生
        var chineseMax = stu.sort(function (a, b) {
            return b.chinese - a.chinese
        })[0]

        // 保存数学成绩最高的学生
        var mathMax = stu.sort(function (a, b) {
            return b.math - a.math
        })[0]

        // 保存数学成绩最高的学生
        var englishMax = stu.sort(function (a, b) {
            return b.english - a.english
        })[0]

        // 按照总成绩降序的排序
        stu.sort(function (a, b) {
            return b.total - a.total
        })
        var content = document.getElementById('content');
        for (var i = 0; i < stu.length; i++) {
            var tip = '';
            // 用循环得到的对象 跟 上面保存的 语文成绩最高的对比
            if (stu[i].chinese === chineseMax.chinese) {
                tip += '语文成绩最高'
            }
            if (stu[i].math === mathMax.math) {
                tip += '数学成绩最高'
            }
            if (stu[i].english === englishMax.english) {
                tip += '英语成绩最高'
            }
            content.innerHTML += ` <tr>
                <td>${stu[i].id}</td>
                <td>${stu[i].chinese}</td>
                <td>${stu[i].math}</td>
                <td>${stu[i].english}</td>
                <td>${stu[i].total}</td>
                <td>${tip}</td>
            </tr>`
        }
    </script>
```

#  7、静态属性，动态方法
- 静态属性：
- 动态方法：当属性的属性值为一个函数的时候，这个属性就叫做动态方法
```javascript
var person = {
    name:'wangwu';
    height:170
    age:18
    say: function(){
    //对象中的方法中的this指向这个对象
        console.log(this.name); //这里的this是指person
    } 
}
person.say()
```







