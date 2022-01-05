const express = require('express')
const app = express()
const port = 9090

//**********Server Configuration

app.use(
    express.urlencoded({
      extended: true
    })
)

app.use(express.json())

app.listen(port, ()=>{
    console.log("Express Server is up and running on port 9090")
})

//**********Server Code

var users = ['Alice','Bob','Candice','Duke']

app.get("/", (request,response)=>{
    response.send("Thanks for calling Express Server")
})

app.get("/users", (request,response)=>{
    response.send({users})
})

app.get("/check", (request,response)=>{
    var idx = users.findIndex(element => element == request.body.username)
    if(idx >= 0){
        response.send(true)
    } else {
        response.send(false)
    }
})

app.post("/add-user", (request,response)=>{
    console.log("Adding user : " + request.body.username)
    users.push(request.body.username)
    response.send({"Response" : "User added successfully"})
})