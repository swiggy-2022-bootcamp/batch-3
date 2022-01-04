function display() {
    for(var i = 0;i<10;i++) {
        console.log(i);
    }
    console.log("Value of I = ",i);
}

display();
//Not accesible outside function scope
//console.log("Outside of I =",i);

//var = > function scope
// let = > lexical or block scope