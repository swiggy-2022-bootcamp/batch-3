var request = require("request");

function handleRequest() {
  return new Promise((resolve, reject) => {
    request(
      "https://fakestoreapi.com/products",
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body);
        }else{
            reject()
        }
      }
    );
  });
}

module.exports=handleRequest