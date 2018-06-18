var content = document.getElementById("content"),
    conLis = document.getElementsByTagName("li"),
    footer = document.getElementById("footer"),
    pageBox = document.getElementById("page-box"),
    firBox = document.getElementById("fir-box");
var studentMod = (function () {
    var p = 1, total = 0, data = null;

   //页脚总信息的数据绑定
    function getLastId() {
        var str2 = '';
        str2 += '<span>共' + lastId + '条,&nbsp;</span>';
        str2 += '<span>第' + p + '页,&nbsp;</span>';
        str2 += '<span>共' + total + '页</span>';
        firBox.innerHTML = str2;
    }
    //主体内容的数据绑定
    function bindHtml() {

        //请求最后一个的ID
        $.ajax({
            url: "/getData?p=" + total,
            success: function (jsonData) {
                if (jsonData && jsonData["code"] == 0) {
                    data = jsonData["data"];
                    for (var j = 0; j < data.length; j++) {
                        var curData = data[j];
                        if (j === data.length - 1) {
                            total = jsonData["total"];
                            lastId = curData["id"];
                            getLastId();
                        }
                    }
                }
            }
        });
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var curData = data[i];
            str += '<li studentId="' + curData["id"] + '">';
            str += '<span>' + curData["id"] + '</span>';
            str += '<span>' + curData["name"] + '</span>';
            str += '<span>' + (curData["sex"] == 0 ? "男" : "女") + '</span>';
            str += '<span>' + curData["score"] + '</span>';
            str += '</li>';
        }
        content.innerHTML = str;
        //给学生信息区域LI绑定跳转到detail页面
        for (i = 0; i < conLis.length; i++) {
            conLis[i].index = i;
            conLis[i].onclick = function () {
                var studentId = this.getAttribute("studentId");
                window.open("detail.html?id=" + studentId);
            }
        }


        pageBox.value = p;
    }

//给跳转页面绑定方法
    function pageClick() {
        //跳转框
        pageBox.onkeyup = function (e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                p = pageBox.value;
                if (pageBox.value > total) {
                    pageBox.value = total;
                    p = pageBox.value;
                } else if (pageBox.value < 1) {
                    pageBox.value = 1;
                    p = pageBox.value;
                }
                sendAjax();
            }
        };
        //点击上下页
        footer.onclick = function (e) {
            e = e || window.event;
            var tar = e.target || event.srcElement,
                tarTag = tar.tagName.toUpperCase(),
                tarInner = tar.innerHTML;
            if (tarTag === "SPAN") {
                if (tarInner === "首页") {
                    if (p === 1) {
                        return;
                    }
                    p = 1;
                }
                if (tarInner === "末页") {
                    if (p === total) {
                        return;
                    }
                    p = total;
                }
                if (tarInner === "上一页") {
                    if (p === 1) {
                        return;
                    }
                    p--;
                }
                if (tarInner === "下一页") {
                    if (p === total) {
                        return;
                    }
                    p++;
                }
            }
            if (tarInner === "跳转") {
                p = pageBox.value;
                if (pageBox.value > total) {
                    pageBox.value = total;
                    p = pageBox.value;
                } else if (pageBox.value < 1) {
                    pageBox.value = 1;
                    p = pageBox.value;
                }
            }
            if (tarTag === "INPUT") {
                return;
            }
            sendAjax();
        };
    }

//给主内容区域发送ajax请求
    function sendAjax() {
        $.ajax({
            url: "/getData?p=" + p,
            success: function (jsonData) {
                if (jsonData && jsonData["code"] == 0) {
                    total = jsonData["total"];
                    data = jsonData["data"];
                    bindHtml();
                }

            }
        });
    }

//模块的入口
    function init() {
        sendAjax();
        pageClick();
    }

    return {
        init: init
    };

})();


studentMod.init();