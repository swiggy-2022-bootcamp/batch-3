const fileSystem = require("fs");
// const filePath = fileSystem.readdirSync("./");
// console.log(filePath);

// async function

// const filePath = fileSystem.readdir("./", function (err, files) {
//   if (err) console.log("Error", err);
//   else console.log("Result", files);
// });

const filePath = fileSystem.readFile(
  "./hello.txt",
  "utf-8",
  function (err, files) {
    if (err) console.log("Error", err);
    else console.log(files);
  }
);
