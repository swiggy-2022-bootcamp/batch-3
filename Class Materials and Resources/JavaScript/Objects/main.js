// Objects

//using literal ways (curly braces)

var person = {
  fname: "Virang", // property --> Key-value pair
  lname: "Parekh",
  email: "virangparekh73@gmail.com",
  mobile: 83908390892,
};

// Adding a property

person.city = "Kolkata";
//extracting a property value
person["state"] = "West Bengal";

//destructuring scheme
let { fname, lname } = person;

function handleClick() {
  document.querySelector("div").innerHTML =
    "<p>Hi there" + fname + " " + lname + "</p>";
}

//To delete a property

delete person.mobile;

var student = new Object({
  fname: "Manish",
  roll_no: 37,
  college: "DJSCE",
});

console.log(student);

function newStudent(fname, roll_no, college) {
  this.fname = fname;
  this.roll_no = roll_no;
  this.college = college;
}

var std = new newStudent("Manish", 37, "DJSCE");
console.log(std);

// console.log(fname);

function Employee(fname, lname, email) {
  this.fname = fname;
  this.lname = lname;
  this.email = email;
  this.city = "Bangalore";
  this.state = "karnataka";
  this.zip = 560066;
  this.company = "Swiggy";
}

var std1 = new Employee("Murali", "krishna", "murali@gmail.com");
var std2 = new Employee("Paras", "KK", "parasKK@gmail.com");

console.log(std1);
console.log(std2);
