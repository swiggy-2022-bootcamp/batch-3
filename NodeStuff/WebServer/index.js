const http = require("http");

// console.log(http);

http
  .createServer((req, res) => {
    res.write("Hello World");
    res.end();
  })
  .listen(6969);
