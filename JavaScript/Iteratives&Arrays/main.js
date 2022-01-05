// Loop Statements

var person = {
  fname: "Virang", // property --> Key-value pair
  lname: "Parekh",
  email: "virangparekh73@gmail.com",
  mobile: 83908390892,
};

//for in loop

for (key in person) {
  console.log(person[key]);
}

var students = ["Virang", "Manish", "Parekh", "Manoj"];

//adding to the array
students.push("Prateek"); // Will add the value to the last index
students.unshift("Raghuram"); // will add the value to the First index
students.splice(2, 0, "RaviKishan"); // Will add a value at given Index

students.pop(); // Will remove the last index value
students.shift(); // will remove the first value
students.splice(1, 1); // will remove at specified index

var values = students.find((std) => {
  //arrow function
  return std.length == 3;
}); //finds first element

var values1 = students.filter((std) => {
  return std.length !== 3;
}); //finds all values

let check = students.every((std) => {
  return std.length >= 6;
});

let check1 = students.some((std) => {
  return std.length === 6;
});

console.log(check);

console.log(values);
var studentInfo = "";

// For Each Statement Is Used to Interate or reading the array
students.forEach((std) => {
  studentInfo = studentInfo + std + "<br>";
});

students.map((std) => {
  studentInfo = studentInfo + std + "<br/>";
});

// Map Statement will able to create a new Array without desturning the existing array
var newStudents = students.map((std) => {
  return std + "-SLK";
});
console.log(students.sort().reverse());
console.log(newStudents);
// document.getElementById("demo").innerHTML=studentInfo
