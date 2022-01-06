let users = []

function getDataFromServer(cb,string) {
    // setTimeout(()=>{
    //     users = ["ram","ravi","sam","sundar"]
    //     console.log(users);
    //     cb();
    // },5000);
    return new Promise((sucess,failure) => {
        setTimeout(()=>{
            users = ["Ram","Ravi","Sam","Sundar"]
            failure()
        },5000);
    })
}

function displayData() {
    console.log(users);
}

getDataFromServer().then(()=>{
    console.log("Sucess");
}).catch(()=>{
    console.log("Failure");
});