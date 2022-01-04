var person = {
    fname: "suhas",
    lname: "ravi"
}
//spread operator - clone
var person2 = { ...person };

person2.fname = "ram";

console.log(person.fname);


