var fs = require("fs");
//console.log(fs);

fs.readFile('./hello.txt','utf-8',(err,data)=> {
    console.log(data);
});

fs.writeFile('./hello1.txt',"Hello from new File",(err1,data1)=>{
    console.log(err1);
});


