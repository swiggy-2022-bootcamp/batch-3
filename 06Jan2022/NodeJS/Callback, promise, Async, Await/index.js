let users = []
function getDataFromServer(displayData) {
    setTimeout(() => {
        users = ["Ram", "Ravi", "Sam", "Sunder"]
        displayData()
    }, 5000)
}
function displayData() {
    console.log(users)
}

getDataFromServer(displayData)
