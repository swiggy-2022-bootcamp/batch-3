var users = [];

function getDatafromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      users = ["Virang", "Parekh", "Manish", "Manoj"];
      resolve();
      //   reject();
    }, 5000);
  });
}

// function displayData() {
//   console.log(users);
// }

getDatafromServer()
  .then(() => {
    console.log("Hello from resolve");
    console.log(users);
  })
  .catch(() => {
    console.log("Hello from reject");
  });

function getAPIdata() {
  fetch("https://fakestoreapi.com/carts") //return promise --> move to then block which returns native data and then data in the next data
    .then((res) => {
      //   console.log(res.json());
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}

getAPIdata();
