// Data Types
var fname = "Virang"; //string
var age = 21; //number
var male = true; //boolean
var education;
var language = null;

function handleClick() {
  document.getElementById("color-button").style.color = "red";
  document.getElementById("data-types").innerHTML =
    "<ul>" +
    "<li>" +
    fname +
    "</li>" +
    "<li>" +
    age +
    "</li>" +
    "<li>" +
    male +
    "</li>" +
    "<li>" +
    education +
    "</li>" +
    "<li>" +
    language +
    "</li>" +
    "</ul>";
}
