# 运动 、JS轮播图

## 1、匀速运动

```javascript
 <img src="images/bird.gif" alt="" id="bird">
    <script>
        let bird = document.querySelector('#bird');
        let left = 0;
        let move = setInterval(() => {
            // 匀速运动：在相同的时间 运动的距离一样
            left += 7;
            if (left >= 800) {
                clearInterval(move);
                left = 800;
            }
            bird.style.left = left + 'px';
        }, 50)
    </script>
```

## 2、加速运动

```javascript
<img src="images/basketball.jpg" alt="" id="basketball">
    <script>
        // 加速运动：在同样的时间中，移动的距离更远
        let basketball = document.querySelector('#basketball');
        let basketballTop = 0;
        let speed = 0;
        let move = setInterval(() => {
            //定义一个速度的变量，每执行一次定时器，速度的就增加
            speed += 5;
            basketballTop = basketballTop + speed;
            if (basketballTop >= innerHeight - basketball.offsetHeight) {
                clearInterval(move);
                basketballTop = innerHeight - basketball.offsetHeight;
            }
            basketball.style.top = basketballTop + 'px';
        }, 50)
    </script>
```

## 3、减速运动

```javascript
<img src="images/car.jpg" alt="" id="car">
    <script>
    //减速运动不足的是，速度等于0的时候停下，而不知道最后停下的位置，所以缓冲运动更为适合
        let car = document.querySelector('#car');
        let left = 0;
        // 定义一个速度
        let speed = 100;
        // 减速运动（速度越来越小）
        let move = setInterval(() => {
            // speed减小
            speed -= 5;
            left += speed;
            // 当速度为0 的时候，就停止运动
            if (speed <= 0) {
                clearInterval(move);
            }
            car.style.left = left + 'px';
        }, 50)
    </script>
```

## 4、缓冲运动1

- 在规定的距离中做减速运动

  ```javascript
  <img src="images/car.jpg" alt="" id="car">
  
      <script>
          // 缓冲运动：在规定的距离中做减速运动
          // 减速运动：不知道速度为的目标点在什么位置
  
          let car = document.querySelector('#car');
          let left = 0;
          let target = 800; //目标值，到800的时候速度为0
          let speed;
          let move = setInterval(() => {
              // 用目标值 - 当前值 ,在除以一个系数（即每次移动剩下的百分之10）
              // 当这个速度为小数点的时候，那么应该向上取整
              // left=798.3
              // 800  - 798.3 = 1.7 /10 = 0.17 （这样到最后就一点点往上加，所以要取整，若是向下取整则一直加0，到不了800）
              speed = Math.ceil((target - left) / 10);
              left = left + speed;
              if (left == target) {
                  clearInterval(move);
              }
              car.style.left = left + 'px';
          }, 50)
  
      </script>
  ```

  

## 5、缓冲运动升级版

```javascript
  <img src="images/car.jpg" alt="" id="car">
    <script>
        // 缓冲运动：在规定的距离中做减速运动
        // 减速运动：不知道速度为的目标点在什么位置

        let car = document.querySelector('#car');
        let left = 800;
        let target = 0; //目标值，到800的时候速度为0
        let speed;
        let move = setInterval(() => {
            // 0 - 9 = -9==》-9/10 = -0.9
            // -0.9 向上取整 0  向下取整为 -1
            speed = (target - left) / 10;
            // 如果速度大于0 向上取整，如果速度小于0向下取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // console.log(speed); // 当 left = 1.speed = -1
            left += speed;  //left = left + speed  = 1-1 = 0
            if (left == target) {
                clearInterval(move);
            }
            car.style.left = left + 'px';
        }, 50)
    </script>
```

## 6、运动函数封装

```javascript
// 动画函数 （元素，改变的样式，函数执行完执行的回调函数）
function move(ele, obj, callback) {
    let speed;
    let index = 0; //【注意点1】记录定时器的个数，以便判断函数是否执行结束，执行回调函数
    // 循环对象创建定时器
    for (let attr in obj) {
        // 透明度的变化的时候 0-1
        // console.log(attr);
        index++;
        // 【注意点2-1】清除上一次的定时器，否则点击一次就会越来越快
        clearInterval(ele[attr])
        // 属性：attr
        // 属性值：obj[key]
        // 【注意点2-2】box['width'] 给box这个dom元素添加一个 width属性(dom属性),属性值是一个定时器
        // 【注意点2-3】dom 对象，以地址形式存储的，当上一次更改dom对象中的值，那么这次获取这个对象的时候是能拿到被更改之后的dom对象
        ele[attr] = setInterval(() => {
            // 【注意点3-1】把透明度的取值 改边为0-100的取值
            // 0-1=====》0-100
            let style;
            if (attr == 'opacity') {
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }
            speed = (obj[attr] - style) / 10;
            //【注意点3-2】因为这里有取整，而opacity的值为0，1，所以要讲值改为0-100
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            if (attr === 'opacity') {
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }
            if (style == obj[attr]) {
                clearInterval(ele[attr]);
                // 有多少个属性参数动画就会执行多少次
                // 没清除一次定时器，那么定时器的个数 -1
                index--;
                // 当定时器的个数 为0 的时候，说明所有动画执行完毕
                if (index === 0) {
                    callback && callback();
                }
            }
        }, 30)
    }
}
```

## 7、圆周运动

```javascript
<div class="box">
        <div class="box1"></div>
    </div>
    <script>
        let box1 = document.querySelector('.box1');
        let box = document.querySelector('.box');
        // 设置小盒子的left 和 top 值
        // 30deg===>弧度=(30*Math.PI)/180
        let d = 0;
        dingwei(d); //初始位置在圆上
        setInterval(() => {
            d += 10;
            dingwei(d)
        }, 100);
        function dingwei() {
            let h = (d * Math.PI) / 180;  //弧度
            let a = box.offsetHeight / 2 * Math.sin(h); //对边  半径*sin(弧度)
            let b = box.offsetWidth / 2 * Math.cos(h); //邻边  半径*cos(弧度)
            // 需要减去小盒子的宽度高度的一半
            box1.style.left = box.offsetHeight / 2 - b - box1.offsetWidth / 2 + 'px';
            box1.style.top = box.offsetWidth / 2 - a - box1.offsetHeight / 2 + 'px';
        }
    </script>
```

## 8、JS轮播图

```javascript
  <script>
        // 【1】轮播图的按钮 是根据轮播图的个数动态生成
        // 【2】给轮播图的容器 里面添加两个元素
        // 1】把最后一个元素复制下来插入 容器的第一位置
        // 2】把第一个元素复制下来插入容器的最后位置
        // 【3】让轮播图自动轮播

        // 【1】轮播图的按钮 是根据轮播图的个数动态生成
        let container = document.querySelector('#container');
        let lis = container.querySelectorAll('li');
        let activeBtn = document.querySelector('#activeBtn');
        let box = document.querySelector('.box');
        //动态生成轮播图的按钮，第一个有样式，其余没有
        lis.forEach((item, index) => {
            if (index === 0) {
                activeBtn.innerHTML += `<li class="active">${index + 1}</li>`;
            } else {
                activeBtn.innerHTML += `<li>${index + 1}</li>`;
            }
        })
        // 获取小圆点的元素
        let lisBtn = activeBtn.children;
        // 给轮播图的容器 里面添加两个元素
        let lastLi = container.lastElementChild.cloneNode(true);
        let firstLi = container.firstElementChild.cloneNode(true);
        // 1】把最后一个元素复制下来插入 容器的第一位置
        container.insertBefore(lastLi, container.firstElementChild);
        // 2】把第一个元素复制下来插入容器的最后位置
        container.appendChild(firstLi);

        let childLen = container.children.length;
        // 改变container的宽度 和left值
        container.style.width = 500 * childLen + 'px';
        container.style.left = -500 + 'px';
        // 让轮播图自动轮播
        let index = 1;
        let timer;
        autoPlay();
        function autoPlay() {
            timer = setInterval(() => {
                index++;
                //播放时小圆点样式跟着改变
                addActive();
                console.log(index)
                move(container, {
                    left: -index * 500
                }, function () {
                    // 当移动到 最后一个元素的时候，那么让container 瞬间移动第一个元素的位置
                    if (index === childLen - 1) {
                        index = 1;
                        container.style.left = -500 + 'px';
                    }
                })
            }, 1500)
        }

        // 鼠标移入box的时候 停止轮播
        box.onmouseover = function () {
            clearInterval(timer);
        }
        // 当出入移出的时候 自动轮播
        box.onmouseout = function () {
            autoPlay();
        }
        //小圆点的样式
        function addActive() {
            console.log(index);
            for (let i = 0; i < lisBtn.length; i++) {
                lisBtn[i].classList.remove('active');
            }
            // 当index = 6的时候，显示的其实是第一个轮播图
            if (index === childLen - 1) {
                lisBtn[0].classList.add('active');
            } else {
                lisBtn[index - 1].classList.add('active');
            }
        }
```

