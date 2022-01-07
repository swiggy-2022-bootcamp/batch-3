let users = [];

function getDataFromServer(callback) {
  setTimeout(() => {
    users = ["Virang", "Parekh", "Manish", "Manoj"];
    callback();
  }, 5000);
}

function displayData() {
  console.log(users);
}

getDataFromServer(displayData); //gets delayed by 5 seconds
// displayData(); //exceutes first returns empty array

//use displayData as callback funtion --> get's executed in time
