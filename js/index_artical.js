$(function () {
    //获取数据库博文将博文展示在博文列表页中。博文列表页面
    ajax({
        method: 'post',
        url: './js/revise_artical.php',
        data: {},
        success: function (text) {
            var json = JSON.parse(text);
            var arthtml = '';
            // alert(json[1].date) 可以获取到所有的博文内容
            for (var i = 0; i < json.length; i++) {
                arthtml += '<div class="content"><strong>o</strong><h2 id=' + json[i].id + '>' + json[i].title + '<em>(' + json[i].date + ')</em></span><a href="artical_change.html" class="edit">编辑</a><span>|</span><a href="javascript:void(0);" class="del">删除</a></h2></div>';

            }

            $('#artmain').html(arthtml);
        },
        async: true
    });

    // 删除文章
    $(document.body).click(function (ev) {
        var el = ev.target;
        var paren = el.parentNode;  //可以得到paren父元素也就是h2标签
        // console.log(paren.id);  这样便可以获取到点击id
        var id = paren.id;

        if (el.className.toLowerCase() === 'del') {

            if (confirm('此博文删除将不可恢复，是否继续？')) {

                ajax({
                    method: 'get',
                    url: './js/delete.php?id=' + id,
                    success: function (text) {
                        alert(text);
                    },
                    async: true
                });

                paren.style.display = 'none';

            }
        }
    });
});












