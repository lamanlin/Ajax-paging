//随机创建一堆测试的学生信息
var fs = require("fs");
var str1 = ['伍', '韦', '申', '尤', '苗', '凤', '花', '方', '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '丁', '宣', '贲', '邓', '郁', '单', '杭', '洪'];
var str2 = ['际', '泰', '怡', '孙', '绍', '祖', '国', '柱', '光', '宗', '君', '克', '勤', '强', '辉', '宏', '宇', '富', '贵', '厚', '福'];

function getRandom(n, m) {
    return Math.round(Math.random() * (m - n) + n);
}
var ary = [];

for (var i = 1; i <= 154; i++) {
    var obj = {};
    obj.id = i;
    obj.name = str1[getRandom(0, 23)] + str2[getRandom(0, 20)] + str2[getRandom(0, 20)];
    obj.sex = getRandom(0, 1);
    obj.score = getRandom(45, 100);
    ary.push(obj);
}
ary = JSON.stringify(ary);
fs.writeFileSync("./student.json", ary,'utf-8');

