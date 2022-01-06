const http = require('http');

http.createServer(function(req,res){
    res.write("Hello World From NodeJS Server With Nodemon");
    res.end()
}).listen(8888)