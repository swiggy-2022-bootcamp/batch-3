var fs = require("fs");

// fs.readFile("./hello.txt", "utf-8", (err, data) => {
//     console.log(data);
// });

fs.readFile('./Book1.xlsx', 'utf-8', (err, data) => {
    console.log(data)
})