let users = [];
function getDataFromServer() {
  setTimeout(() => {
    users = ["Ram", "Ravi", "Sam", "Sunder"];
    displyData();
  }, 5000);
}
function displyData() {
  console.log(users);
}

getDataFromServer(displyData);
