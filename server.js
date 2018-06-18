var http = require("http"),
    fs = require("fs"),
    url = require("url");
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    //静态文件资源请求
    var reg = /\.(HTML|CSS|JS|ICO)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase();
        var conType = suffix === "HTML" ? "text/html" : (suffix === "CSS" ? "text/css" : "text/javascript");
        try {
            var conFile = fs.readFileSync('.' + pathname, 'utf-8');
            res.writeHead(200, {'content-type': conType + ';charset=UTF-8;'});
            res.end(conFile);
        } catch (e) {
            res.writeHead(404);
            res.end("请求文件错误");
        }
        return;
    }

    var data = fs.readFileSync('./json/student.json', 'utf-8');
    data = JSON.parse(data);
    //1、获取每一页的数据
    if (pathname === "/getData") {
        var p = query["p"];
        var ary = [];
        for (var i = (p - 1) * 10; i <= p * 10 - 1; i++) {
            if (i > data.length - 1) {
                break;
            }
            ary.push(data[i]);
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify({
            code: 0,
            msg: "成功",
            total: Math.ceil(data.length / 10),
            data: ary
        }));
        return;

    }
    //2、获取详细信息
    if (pathname === "/getDetail") {
        var obj = null, flag = false, studentId = query["id"];
        var result = {
            code: 1,
            msg: "获取失败"
        };
        for (i = 0; i < data.length; i++) {
            if (data[i]["id"] == studentId) {
                obj = data[i];
                flag = true;
            }
        }
        if (flag) {
            result = {
                code: 0,
                msg: "成功",
                data: obj
            };
        }

        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
        return;
    }

    res.writeHead(404);
    res.end("请求端口不存在");


});
server.listen(8181, function () {
    console.log("服务已经创建成功，正在监听8181端口!");
});