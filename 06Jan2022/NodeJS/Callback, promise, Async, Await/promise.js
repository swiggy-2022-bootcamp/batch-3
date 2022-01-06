let users = []
function getDataFromServer() {
    return new Promise((success, failure) => {
        setTimeout(() => {
            users = ["Ram", "Ravi", "Sam", "Sunder"]
            success()
        }, 5000)
    })
}

function displyData() {
    console.log(users)
}

getDataFromServer().then(() => {
    console.log("Hello from success()")
}).catch(() => {
    console.log("Hello from failure()")
})