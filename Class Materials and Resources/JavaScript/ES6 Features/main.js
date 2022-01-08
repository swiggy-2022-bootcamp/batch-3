//scope and constraints in varibles

function displayNos() {
  for (i = 0; i < 10; i++) {
    console.log(i);
  }
  console.log("Value of i is " + i);
}

displayNos();

const message = "Welcome to Javascript";
// message = "Hi This is a new message"; // once const is defined, it cannot change the value any which ways

//default value in function arguments

var defaultValue = "Hello this is a default value";
function displaySomething(a = defaultValue) {
  console.log(a);
}

displaySomething("Hello from passed argument");

var person = {
  fname: "Virang",
  age: 22,
};
var person2 = { ...person }; //spread operator --> creates a copy

console.log(person2);

function calculate(val1, val2, val3, ...args) {
  console.log(val1, val2, val3);
  console.log(args);
}

calculate(5, 6, 7, 8, 9, 10, 15, 147);
