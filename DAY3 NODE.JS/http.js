const httpRequest = require("http");
const server = httpRequest.createServer((req, res) => {
  if (req.url == "/") {
    res.write("Hello World!");
    res.end();
  }

  if (req.url == "/api/courses") {
    res.write(JSON.stringify([1, 2, 3, 4]));
    res.end();
  }
}); // also an Event Emitter

//server.on("connection", (socket) => console.log("Connection established..."));

server.listen(3000);
console.log("Listening to port 3000...");
