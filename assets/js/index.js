$(function () {
    const layer = layui.layer;
    getUserInfo()
    document.querySelector('#tuichu').addEventListener('click', function () {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            location.href = './login.html'
            localStorage.removeItem('token')
            layer.close(index)

        })
    })


})
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
            return layer.msg("获取用户信息失败")
            }
            renderAvatar(res.data)
        }
        
    })

}
function renderAvatar(user) {
    const name = user.nickname || user.username
    console.log(name);
    $('.welcome').html(name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').prop('src', user.user_pic).show().siblings('.text_avatar').hide()
    } else {
        $('.text_avatar').html(name.substring(0, 1).toUpperCase()).show().siblings('.layui-nav-img').hide()
    }
}