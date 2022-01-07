var url = "http://sxcf.io";

function log(message) {
  //send a http request
  console.log(message);
}

module.exports.log = log;

//to load the module and use it in another module or file you need the require function
// it takes only one argument the path of the module or the file
