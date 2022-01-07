const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");

let users = ["Prateek", "Joshi", "Takur", "Ravi Kiran"];
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({msg:'Hello From Default Route'})
  res.send("Hello from Express")
  res.json({ users });
  res.write();
  res.send("Hello from Write...")
});

app.post("/addUser", (req, res) => {
  console.log(req.body);
  users.push(req.body.name);
  res.send({ users });
});

app.get('/deleteUser/:user',(req,res)=>{
    console.log(req.params.user)
    let delUser = req.params.user
    let checkUser = users.find((u)=>u == delUser)
        if(checkUser){
            users = users.filter((u)=>u != delUser)
            res.json({users})
        }else{
            res.json({msg:"User is not available in List"})
        }
    
})

app.post("/check", (req, res) => {
  var userName = req.body.name;
  console.log("userName", userName);
  let checkUser = users.find((u) => u == userName);
  console.log(checkUser);
  if (checkUser) {
    res.json({ msg: "User is Avaiable.. Allow Him to Login" });
  } else {
    res.json({ msg: "User Is not available .. ask him to Register" });
  }
});

app.delete("/deleteUser",(req,res)=>{
    let delUser = req.body.name
    let checkUser = users.find((u)=>u == delUser)
    if(checkUser){
        users = users.filter((u)=>u != delUser)
        res.json({users})
    }else{
        res.json({msg:"User is not available in List"})
    }
    users.filter((u)=>u != delUser)

})

app.listen(port, () => {
  console.log("Listening...");
});