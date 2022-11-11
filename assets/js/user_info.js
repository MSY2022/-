$(function () {
    const layer = layui.layer;
    const form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    getUseInfo()
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: form.val("formUserInfo"),
            success: function (res) {
                if(res.status!==0) return   layer.msg(res.message)
                layer.msg('更改信息成功')
                window.parent.getUserInfo()
            }
        })

    })

    $('#btnReset').click(function (e) {
        e.preventDefault()
        getUseInfo()
    })
    function getUseInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取用户信息失败")
                // console.log(res);
                form.val("formUserInfo", res.data);

            }
        })
    }
})