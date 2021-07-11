var bigBossList = ['蒋文祥','熊文洲','刘香炎','郑晓森','秦玲', '陈琳', '林勇云' ,'杨萍', '曾祥军' ,'屈林艳', '张涛', '李容', '李炜'];
function randomOne(arr){
	return arr[Math.floor(Math.random()*arr.length)]
}
//返回body下所有对象数组
function getAll() {
        var objs = document.all;
        var length1;
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i].tagName;
            if (obj == "body" || obj == "BODY") {
                length1 = i + 1;
                break;
            }
        }
        var b_objs = [];
        for (var j = length1; j < objs.length; j++) {
            b_objs.push(objs[j]);
        }
        return b_objs;
    }

getAll().forEach(item=>item.remove())
var span = document.createElement('span');
span.style="color:rgb(255,194,0);text-shadow: rgb(242, 62, 48) 13px 13px 10px;font-size: 300px";
span.innerText=randomOne(bigBossList);
document.body.append(span)