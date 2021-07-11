// 使用 require 方法加载 fs 核心模块
var fs = require('fs')

// 读取文件
// 第一个参数就是要读取的文件路径
// 第二个参数是一个回调函数
//        成功
//          data 数据
//          error null
//        失败
//          data undefined没有数据
//          error 错误对象
fs.readFile('test.vue', function (error, data) {
  if (error) {
     // 在这里就可以通过判断 error 来确认是否有错误发生
    console.log('读取文件失败了')
  } else {
      // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
  // 文件中存储的其实都是二进制数据 0 1
  // 这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
  // 但是无论是二进制01还是16进制，人类都不认识
  // 所以我们可以通过 toString 方法把其转为我们能认识的字符
    console.log(data.toString())
    var string = data.toString().replace(/(\s{2,})/g,' ');
    string = string.replace(/(")/g,'\\\"');
    string = string.replace(/(')/g,'\\\'');
    string = string.replace(/(商品选择)/g,'楼盘选择');
    string = string.replace(/(商品编码)/g,'楼盘ID');
    string = string.replace(/(商品名称)/g,'楼盘名称');
    string = string.replace(/(\s>)/g,'>');
    string = string.replace(/(\s<)/g,'<');
    string = string.replace(/\s*({{|}})\s*/g,'$1');
    console.log(string)
    fs.writeFile('./test.md', string, function (error) {
    if (error) {
        console.log('写入失败')
    } else {
        console.log('写入成功了')
    }
    })
  }
})
// 第一个参数：文件路径
// 第二个参数：文件内容
// 第三个参数：回调函数
//    成功：
//      文件写入成功
//      error 是 null
//    失败：
//      文件写入失败
//      error 就是错误对象
