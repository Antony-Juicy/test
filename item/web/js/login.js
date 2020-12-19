var username = document.querySelector("#usernameInput");
var password = document.querySelector("#passwordInput1");

$('#login').validate({
    // 填写的 输入框验证的规则
    rules: {
        // 就是input的name属性的属性值来验证 
        username: {
            required: true, // 必须输入的字段
            minlength: 2, //	输入长度最小2位字符

        },
        password: {
            required: true,
            minlength: 3,
            maxlength: 12,
        },

    },
    // 当不满足规则的是 编写的提示信息
    messages: {
        username: {
            required: '用户名必填项',
            minlength: '用户名不能低于2位字符'
        },
        password: {
            maxlength: '用户的最大长度只能为12位',
            required: '密码必填项',
            minlength: '密码不能低于3位字符'
        },


    },
    submitHandler: function () {
        // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
        // 一般用跟后端进行数据交互 
        // 发送ajax请求
        // console.log($("#usernameInput").val(),$("#passwordInput1").val());

        // 发送ajax请求
        pAjax({
            type: "post",
            url: "../../php/login.php",
            data: {
                username: username.value,
                password: password.value
            }
        }).then(res => {
            // console.log(res);
            if (res.code == 1) {
                // 登录成功存储 登录的状态
                setCookie('login', username.value);
                let url = localStorage.getItem('url');
                console.log(url);
                if (url) {
                    location.href = url;
                    // 登录成功的时候把url的这个cookie值清除
                    localStorage.removeItem('url');
                } else {
                    location.href = '../index.html';
                }
            }
           
        })
    
    }
})