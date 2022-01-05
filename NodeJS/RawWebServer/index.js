const http = require('http')

http.createServer((request,response)=>{
    response.write("Thank you for your request!")
    response.end()
}).listen(9000)