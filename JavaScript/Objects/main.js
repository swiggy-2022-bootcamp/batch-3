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
