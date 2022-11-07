$(function () {
    $('.loginAndRegBox').on('click', 'a', function (e) {
        $(this).parents('.mx').hide().siblings().show()
    })
    const form = layui.form
    // const layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if ($('.reg_box [name="password"]').val() !== value) {
                return "两次输入的密码不一致"
            }
        }
    })
    $('#form_reg').submit(function (e) {
        e.preventDefault()
        const username = $('.reg_box [name="username"]').val()
        const pwd = $('.reg_box [name="repassword"]').val()
        $.ajax({
            type: 'POST',
            url: "/api/reguser",
            data: {
                username: username,
                password: pwd
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功")
                $('.reg_box a').click()
            }
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POSt",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg(res.message)
                // console.log(res);
                localStorage.setItem('token', res.token)
                location.href = './index.html'
               
            }
        })
    })
})