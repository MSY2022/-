// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
const layer = layui.layer;
const form = layui.form;
// 1.3 创建裁剪区域
$image.cropper(options)
$('#imageChooseBtn').click(function () {
    $('#file').click()
})
$('#file').change(function (e) {
    if (e.target.files.length === 0) return layer.msg("未更换图片")
    const file = e.target.files[0]
    const newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})
$('#btnUpload').click(function () {
    const dataURL = $image
      .cropper('getCroppedCanvas', { 
        width: 100,
        height: 100
      })
      .toDataURL('image/png')  
      $.ajax({
        method:"POST",
        url:'/my/update/avatar',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        data:{
            avatar:dataURL
        },
        success:function(res){
            if(res.status!==0) return  layer.msg("更换头像失败")
            layer.msg("更换头像成功")
            window.parent.getUserInfo()
        }
      }) 
})