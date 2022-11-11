$.ajaxPrefilter(function (options) {

    options.url = 'http://big-event-api-t.itheima.net' + options.url
    if (options.url.includes('/my/') === true) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            location.href = './login.html'
            localStorage.removeItem('token')
           console.log(res);
        }
    }
})