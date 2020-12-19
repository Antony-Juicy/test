var username = document.querySelector("#usernameInput");
var password = document.querySelector("#passwordInput1");
var password2 = document.querySelector("#passwordInput2");
var submitBtn = document.querySelector("#submitBtn");



jQuery.validator.addMethod('testTel', function (value) {
        let reg = /^[a-zA-Z]\w{3,10}$/; // 请输入长度3~10之间的数字、字母、下划线组成的密码'
        if (reg.test(value)) {
            return true
        } else {
            return false
        }
    }, "请输入字母开头长度3~10之间的数字、字母、下划线组成的密码"),

    $('#login').validate({
        // 填写的 输入框验证的规则
        rules: {
            // 就是input的name属性的属性值来验证 
            username: {
                required: true, // 必须输入的字段
                minlength: 2, //	输入长度最小2

            },
            password: {
                required: true,
                minlength: 3,
                maxlength: 12,
                testTel: true
            },
            tel: {
                required: true,
                equalTo: "#passwordInput1"
            }
        },
        // 当不满足规则的是 编写的提示信息
        messages: {
            username: {
                required: '用户名必填项',
                minlength: '用户名不能低于2位字符'
            },
            password: {
                maxlength: '用户的最大长度只能为12位',
                minlength: '请输入长度3~10之间的数字、字母、下划线组成的密码',
                required: '密码必填项',
            },
            tel: {
                required: '确认密码必填项',

            }

        },
        submitHandler: function () {
            // 当界面中所有的表单验证都成功的时候 就会执行这个 方法
            // 一般用跟后端进行数据交互 
            // 发送ajax请求

            // 定义两个变量

            pAjax({
                type: "post",
                url: "../../php/zhuce.php",
                data: {
                    username: username.value,

                }
            }).then(res => {
                console.log(res);
                if (res.error == 0) {
                    pAjax({
                        type: "post",
                        url: "../../php/regist.php",
                        data: {
                            username: username.value,
                            password: password.value
                        }
                    }).then(res => {
                        console.log(res);
                       
                    })
                    location.href = "../html/login.html"

                } else {
                    alert("用户名与存在")
                }

            })

        }

    })