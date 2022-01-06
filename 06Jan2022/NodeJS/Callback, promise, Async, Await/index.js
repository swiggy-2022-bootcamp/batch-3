let users = []
function getDataFromServer() {
    setTimeout(() => {
        users = ["Ram", "Ravi", "Sam", "Sunder"]
    }, 5000)
}
function displayData() {
    console.log(users)
}

getDataFromServer()
displayData()