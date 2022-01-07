var products = [];

// function getDatafromServer() {
//   return new Promise((resolve, reject) => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         resolve(data); //passing to resolve function directly as then block is going to
//       });
//   });
// }

// //handling through then() block

// // getDatafromServer().then((products) => {
// //   console.log(products);
// // });

// // handling through async function

// async function handleData() {
//   products = await getDatafromServer();
//   console.log(products);
// }

// handleData();

//Converting entire block to async-await without handler function

async function getDatafromServer() {
  let getInfo = await fetch("https://fakestoreapi.com/products");
  console.log(getInfo);
  let details = await getInfo.json();
  console.log(details);
}

getDatafromServer();
