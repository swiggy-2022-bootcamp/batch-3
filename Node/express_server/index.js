const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require('body-parser')

let users = ["John", "Bob", "Alice"];

app.use(bodyParser.json())

app.get('/', (req, res) => {
  
    // res.send('Hello from default route')
    res.json({users})
}); 

app.post('/addUser', (req, res) => {
  
    console.log(req.body);
    users.push(req.body.name);

    res.send({users});
});

app.post('/check', (req, res)=>{
    
    var userName = req.body.name;
    let checkUser = users.find((u)=> u == userName)

    if(checkUser)
        res.json({msg: "User is available. Allow to login"});
    else
        res.json({msg: "User is not available. Please register"});
});

app.get('/deleteUser/:user', (req, res) => {
    
    let delUser = req.params.user;
    let index = users.indexOf(delUser);

    if(index > -1)
        users.splice(index, 1);
    else
        res.json({msg: "User is not available"});

    res.json({users});

})

app.post('/delete', (req, res) => {
  
    let delUser = req.body.name;
    let index = users.indexOf(delUser);

    if(index > -1)
        users.splice(index, 1);
    else
        res.json({msg: "User is not available"});

    res.json({users});
})

app.listen(port, ()=>{
    console.log("Hello, this express server is running")
});