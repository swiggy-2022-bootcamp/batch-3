// arguments with default value
function calculate(a=10) {
    console.log(a);
}

calculate()
//calculate(100)
//calaulate("100")


var person = {
    fname: "Murali",
    lname: "Krishna"
}

var person2 = {
    fname: "Murali-VML",
    lname: "Krishna-VML"
}

console.log(person.fname);
console.log(person.lname);

let {fname,lname} = person;
console.log(fname);
console.log(lname);

// {fname,lname} = person2 => not allowed

function showInfo({fname,lname}) {
    console.log(fname);
    console.log(lname);
}

showInfo(person2);
