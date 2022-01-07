let users = [];
function getDataFromServer() {
  return new Promise((success, failure) => {
    setTimeout(() => {
      users = ["Ram", "Ravi", "Sam", "Sunder"];
      success();
    }, 5000);
  });
}

function displyData() {
  console.log(users);
}

getDataFromServer()
  .then(() => {
    console.log("hello From Success");
  })
  .catch(() => {
    console.log("hello From failer");
  });
