const Koa = require('koa');
const Bodyparser = require('koa-bodyparser')
// const csp = require('koa-csp');
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const fs = require("fs")
const path = require('path');
const staticFiles = require('koa-static')
const nodeExcel = require("excel-export");
var cors = require('koa-cors');
const app = new Koa();
// 解析post
app.use(Bodyparser())
// // 解析formdata数据，否则ctx.request.body为空
// app.use(Formidable())

// app.use(csp({
//     policy: {
//         defaultSrc: ['self', 'none', 'unsafe-inline', 'unsafe-eval', 'example.com'],
//         // you can alse add single quotes manually
//         imgSrc: ["'self'"],
//     },
// }));
app.use(staticFiles(path.join(__dirname + './public/')))
app.on('error', err => {
    log.error('server error', err)
});


app.use(cors()); //放到route前面
// app.use(async (ctx, next) => {
//     console.log('main');
//     // 允许来自所有域名请求
//     ctx.set("Access-Control-Allow-Origin", "*");
//     // 设置所允许的HTTP请求方法
//     ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//     // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
//     ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type",'sec-ch-ua','sec-ch-ua-mobile');
//     // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。
//     // Content-Type表示具体请求中的媒体类型信息
//     // ctx.set("Content-Type", "application/json;charset=utf-8");
//     // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
//     // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
//     // ctx.set("Access-Control-Allow-Credentials", false);
//     // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
//     // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
//     // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
//     // ctx.set("Access-Control-Max-Age", 300);
//     /*
//     CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
//         Cache-Control、
//         Content-Language、
//         Content-Type、
//         Expires、
//         Last-Modified、
//         Pragma。
//     */
//     // 需要获取其他字段时，使用Access-Control-Expose-Headers，
//     // getResponseHeader('myData')可以返回我们所需的值
//     ctx.set("Access-Control-Expose-Headers", "*");
//     console.log('sdfsdf')
//     await next()
// });
router.get('/hello/:name', async (ctx, next) => {
    console.log('get+/hello')
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

router.post('/downLoad', async (ctx) => {
    var data = fs.readFileSync('test.xlsx', "utf-8")
    // ctx.set('Content-Type', 'application/vnd.openxmlformats');
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.set("Content-Disposition", "attachment; filename=" + "user.xlsx"); //这里是告诉浏览器下载一个附件，名字叫什么 自己动态定义
    //下载文件需要的是以buffer流，  这样前端点击下载就能直接下载了
    ctx.body = data

})

router.all('/excel', async (ctx, next) => {
    console.log(ctx.request.body);
    var conf = {};
    conf.name = "mysheet";
    conf.cols = [{
            caption: "string",
            type: "string",
        },
        {
            caption: "date",
            type: "date",
        },
        {
            caption: "bool",
            type: "bool",
        },
        {
            caption: "number",
            type: "number",
        },
    ];
    conf.rows = [
        ["pi", new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182],
        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        ["null date", null, true, 1.414],
    ];
    var result = nodeExcel.execute(conf);
    //将数据转为二进制输出
	// let data1 = new Buffer(result);//废弃了
    let bufferData = Buffer.from(result);
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.set("Content-Disposition", `attachment; filename=${encodeURI('诞')}.xlsx`);
    // ctx.set({"Content-disposition": `attachment; filename*=UTF-8' '${encodeURI('圣诞节')}.xlsx`});
    // ctx.set({'Content-type': 'application/vnd.ms-excel'});
    // ctx.end(result, 'binary');
    ctx.body = bufferData
});
// add router middleware:
app.use(router.routes())
app.listen(3000);