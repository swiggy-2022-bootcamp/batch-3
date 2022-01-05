// Classes

class Employee {
  constructor(fname, lname, email) {
    this.city = "Pune";
    this.state = "Maharashtra";
    this.zip = 411018;
    this.company = "Swiggy";
    this.fname = fname;
    this.lname = lname;
    this.email = email;
  }
}

var EMP1 = new Employee("Virang", "Parekh", "abc@gmail.com");
var EMP2 = EMP1;
console.log(EMP1);
console.log(EMP2);
console.log(EMP1 == EMP2); //pointing to the same address
