var http = require("http");
var fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");
http
  .createServer(function(req, res) {
    console.log("==0>>>", req.url);
    let pathName = req.url;
    // let pathName = url.parse(req.url).pathname;
    pathName = pathName == "/" ? "index.html" : pathName;
    let acceptEncoding = req.headers['accept-encoding'];
    if (req.headers["x-no-compression"] && !/\bgzip\b/.test(acceptEncoding)) {
      // don't compress responses with this request header
      fs.readFile('./'+pathName, function(err, data) {
        if (err) {
          console.log("404");
        } else {
          res.writeHead(200, {});
          res.write(data);
          res.end();
        }
      });
      return false;
    }
    res.writeHead(200, {
      "Content-Encoding": "gzip",
    });
    pipeline(
      fs.createReadStream('./'+pathName),
      zlib.createGzip(),
      res,
      onError
    );
  })
  .listen(8080);
function onError(s) {
  console.log("onError", s);
}