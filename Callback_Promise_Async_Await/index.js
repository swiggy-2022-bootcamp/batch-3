let users = []

function getDataFromServer(cb,string) {
    setTimeout(()=>{
        users = ["ram","ravi","sam","sundar"]
        console.log(users);
        cb(string);
    },5000);
}

function displayData(string) {
    console.log(users);
    console.log(string)
}

getDataFromServer(displayData,"finished");
//displayData()

