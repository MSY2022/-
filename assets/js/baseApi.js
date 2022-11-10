$.ajaxPrefilter(function (options) {

    options.url = 'http://big-event-api-t.itheima.net' + options.url
    if (options.url.includes('/my/') === true) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})