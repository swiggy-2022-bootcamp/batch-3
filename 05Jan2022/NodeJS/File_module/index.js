var fs = require("fs");

fs.readFile("./hello.txt", "utf-8", (err, data) => {
    console.log(data);
});
