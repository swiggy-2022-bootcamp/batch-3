const express = require('express');
const app = express()
const port = 8080
const bodyParser = require('body-parser');

let users = ["Prateek","Joshi","Thakur","Ravi"];
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    //res.send("hello from default route")
    res.json({users});
});

app.post('/addUser',(req,res)=>{
    console.log(req.body);
    users.push(req.body.name);

    res.send({users});
})

app.post("/check",(req,res) => {
    let userName = req.body.name;
    let checkUser = users.find((u)=>u == userName);
    if(checkUser) {
        res.json({msg:"User is Availble"});
    }
})

app.get('/deleteUser/:user',(req,res) => {
    console.log(req.params.user);
    let deluser = req.params.user;
    let checkUser = users.find((u)=> u == deluser);
    if(checkUser) {
        users = users.filter((u)=>u != deluser);
        res.json(users);
    } else {
        res.json("msg : User is not available");
    }
})

app.listen(port,()=>{
    console.log("Hello... express server running");
})