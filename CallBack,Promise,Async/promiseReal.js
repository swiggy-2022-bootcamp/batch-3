function getUsersFromServer(){
    fetch("https://fakestoreapi.com/products").then(res=>{
        return res.json()
    }).then(data=>{
        console.log(data)
    })
}

getUsersFromServer()