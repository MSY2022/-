$(function () {
    const layer = layui.layer;
    const form = layui.form;

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePad: function (value) {
            if (value === $('[name="oldPwd"]').val()) {
                return "新密码不能和旧密码一样"
            }
        },
        rePwd: function (value) {
            if (value !== $('[name="rePwd"]').val()) {
                return "两次密码不一样"
            }
        }

    })
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})