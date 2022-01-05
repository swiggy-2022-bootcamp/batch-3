var fs = require("fs");

fs.readFile("./hello.txt", (err, data) => {
    console.log(data);
});
