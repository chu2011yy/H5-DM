var fs = require('fs')
var path = require('path'); //解析需要遍历的文件夹
var filePath = path.resolve('./');
console.log(filePath);
readDir(filePath);

function readDir(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.warn(err)
    } else {
      //遍历读取到的文件列表
      files.forEach(function (filename) {
        // console.log(filename);
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function (eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isDir = stats.isDirectory(); //是文件夹
            if (isDir) {
              readDir(filedir);
            } else {
              /(\.vue)/g.test(filedir) && doFile(filedir);
            }
            console.log('文件的路径', filedir)
          }
        })
      })
    }
  })
}

// 读取文件
// 第一个参数就是要读取的文件路径
// 第二个参数是一个回调函数
//        成功
//          data 数据
//          error null
//        失败
//          data undefined没有数据
//          error 错误对象
function doFile(fileName) {
  fs.readFile(fileName, function (error, data) {
    if (error) {
      // 在这里就可以通过判断 error 来确认是否有错误发生
      console.log('读取文件失败了')
    } else {
      // <Buffer 68 65 6c 6c 6f 20 6e 6f 64 65 6a 73 0d 0a>
      // 文件中存储的其实都是二进制数据 0 1
      // 这里为什么看到的不是 0 和 1 呢？原因是二进制转为 16 进制了
      // 但是无论是二进制01还是16进制，人类都不认识
      // 所以我们可以通过 toString 方法把其转为我们能认识的字符
      console.log('读取文件')
      console.log(data.toString())
      var string = data.toString().replace(/(\s{2,})/g, ' ');
      string = string.replace(/(")/g, '\\\"');
      string = string.replace(/(')/g, '\\\'');
      string = string.replace(/(\s>)/g, '>');
      string = string.replace(/(\s<)/g, '<');
      string = string.replace(/\s*({{|}})\s*/g, '$1');
      string = string.replace(/^(<template>)|(<\/template>)$/g, '');
      console.log(string)
      console.log('输出读取文件')
      fs.writeFile(fileName.replace(/(\..*)$/, '.md'), string, function (error) {
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
}