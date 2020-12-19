## 循环嵌套
-   执行重复的代码
```javascript
    // 外层循环--控制行
    for(var i = 0;i < 3;i++){
        // 内层循环--控制列
        for(var j = 0;  j < 4;j++){
            //内层的循环体
        }
        document.write('<br>')
    }
    // 内层的f循环其实就是 外层循环体
```

## 拼接HTML结构
-   当利用的 循环嵌套的时候，内层循环开始之前 只拼接行标签的开头
-   执行内层循环的时候拼接 列的标签
-   内层循环执行完之后，拼接行标签的结尾
```javascript
    for (var i = 0; i < 3; i++) {
        // 用一个变量 存储 循环生成的 标签
        res = '<tr>';
        for (var j = 0; j < 3; j++) {
            res += '<td>1111</td>';
        }
        res += '</tr>';
    }
```
```javascript
  btn.onclick = function () {
            // tb.innerHTML = '';
            var res = "";
            var n = ipt.value * 1;
            for (var i = 0; i < n; i++) {
                if (i % 2 == 0) {
                    //这边用了res+=，所以res得赋初值，否则会有一个undefined
                    //最后的tb.innerHTML就不用+=，可以直接覆盖
                    
                    //新的拼接方式
                    res += '<tr class=' + 'bgc' + '>' + '<td>' + "吴扬文被柯扬睡了" + '</td>';
                } else {
                    res += '<tr class=' + 'bgc2' + '>'+ '<td>' + "柯扬被吴扬文睡了" + '</td>';
                }
                res += "</tr>";
                tb.innerHTML = res;
            }
        }
```
-   给双标签动态设置内容 innerHTML
    +   div.innerHTML = 123  表示给div这个标签设置内容为123
    +   innerHTML设置内容，会把原来的内容覆盖 
    +  如果不是覆盖，只是在原来的基础之上添加内容 div.innerHTML += 123
    +   div.innerHTML = div.innerHTML + 123

## 循环的标识符
-   名字:for(){}

## 循环中的关键字
-   break：终止循环 ,整个循环被终止掉
-   continue：跳过循环，进入下一次循环，本次continue后面的代码不会被执行
-   这两个关键字写在那个循环中 ，那么就表示对这个循环有作用

## 练习
- 早上
  ```javascript  
  //打印100以内的所偶数 的和
    var sum = 0;
      for(var i = 0;i  <= 100;i++){
          if(i % 2 === 0){
              sum += i;
          }
      }
      console.log(sum)
  ```

  ```javascript
  //- 求出1-1/2 + 1/3 - 1/4 + 1/5....... 1/100的和
    var sum = 0;
      for(var i = 1;i <= 100; i++){
          if(i % 2 === 0){
              sum -= 1/i;
          }else {
             sum += 1/i 
          }
      }
      console.log(sum)
```

   ```javascript
   //- 求出1000-9999之间的 4叶玫瑰数
   
 // 例如：1634 == Math.pow(1,4)  +  6 * 6 * 6 * 6  + 3 * 3 * 3 * 3  + 4 * 4 * 4 * 4 
        for (var i = 1000; i <= 9999; i++) {
            var g = i % 10; // 个位数
            var s = parseInt(i % 100 / 10); //十位数
            var b = parseInt(i % 1000 / 100); //百位数
            var q = parseInt(i / 1000); //千位数
        
            var res = g * g * g * g + s * s * s * s + b * b * b * b + q * q * q * q
            if (i === res) {
                console.log(i)
            }
        }
 ```

```javascript 
 // 山上有一口缸可以装50升水，现在有15升水。老和尚叫小和尚下山挑水，每次可以挑5升。问：小和尚要挑几次水才可以把水缸挑满？通过编程解决这个问题。
var water = 15;
      var k = 0;
      while(water <= 50){
          water += 5;
          k++;
      }
      console.log(k)
```

```javascript
/* 使用 *打印三角形
      *
      **
      ***
      ****
      *****
      ******
      *******
      ********
      *********
      */
      for(var i = 0; i <=9 ;i++){
         for(var j = 1;j <= i;j++){
              document.write('*');
          }
          document.write('<br />')
      }
  
```

- 中午

```javascript
/*
- 求1 + 2！ + 3！ + 4！....+20!的值
  2！ = 2 * 1
  3！ = 3 * 2 * 1
*/
      var sum = 0;
      for (var i = 1; i <= 20; i++) {
          var res = 1;
          for (var j = 1; j <= i; j++) {
              res *= j;
          }
          sum += res;
      }
      console.log(sum);
``` 

```javascript    
/*
- 求叠数之和
  - 如输入的是 n=3， a=2；则输出 2 + 22 + 222  的值。
  - 如输入的是 n=4， a=3；输出 3 + 33 + 333 + 3333的值
    n = 3,相加三次,每次相加比前一次相加的数,多一位
     每次多的这个位数的值为a, 如果a为2则  2 * 10 + 2 =22,  22 * 10+2 = 222
*/
var num = 2;
        var times = 3;
        var sum = 0; //存放结果的
        for (var i = 0; i < times; i++) {
            console.log(num);
            sum += num;
            num = num * 10 + num % 10;
        }
        console.log(sum)
```
- 晚上

```javascript    

/*

- 输入两个数求两个数的最大公约数
  - 先取出两个数中最小的数
  - 最小的数不断递减，取出能同时被两个数整除的数，并退出循环
*/
 <button onclick="gcd()"> </button>
      function gcd(){
          //获取两个数的值
          var num1 = num1.value;
      	var num2 = num2.value;
          
          //判断两个数中较小的值
          var min = num1 > num2 ? num2 : num1;
          
          //用最小的值 递减找出能被两个数整除的值
          for(var i = min; i >= 1;i--){
              if(num1 % i === 0 && num2 % i === 0){
                  console.log(i + '就是' + num1 +'和'+ num2 + '的最大公约数')；
                  break
              }
          }
      }

```
     
  


/*
- 输入两个数，求两个数的最小公倍数
  - 先取出两个数中最大的数
  - 最大的数不断递增，提出能整除两个数的那个数，然后退出循环
  - 
*/
 function lcm(){
           //获取两个数的值
          var num1 = num1.value;
      	var num2 = num2.value;
          
          //判断两个数中较小的值
          var max = num1 > num2 ? num1 : num2;
          for(var i = max;i >= 1;i++){
              if(i % num1 === 0 && i % num2 === 0){
                  console.log(i + '就是' + num1 +'和' + num2 +'的最小公倍数')
              }
          }
      }

     
  
- 回文数
  - 要求：打印10000~99999区间的回文数字，形如12321 23432 34543等
  - 提示: 回文数需同时满足下面的条件
                [1] 第一位和倒数第一位相等
                [2] 第二位和倒数第二位相等
                [2] 第二位等于第一位数加一
                [3] 第三位等于第二位数加一

        for(var i = 10000;i <=99999;i++){
            var g = i % 10;
            var s = parseInt(i /10 % 10);
            var b = parseInt(i /100 % 10);
            var q = parseInt(i /1000 % 10);
            var w = parseInt(i / 10000);
            if(g === w && s === q && s === g+1 && b === s+1){
               document.write(i)
            }
        }
    


