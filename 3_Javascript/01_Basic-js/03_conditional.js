let age = 17;

if (age > 18) {
    console.log("You can drive");
}
else
    console.log("You cannot drive.");

// Operators

let b = 2;
let c = 3;

console.log(b + c)
console.log(b - c)
console.log(b * c)
console.log(b / c)
console.log(b ** c)
console.log(b % c)
//  If else
if((b-c) <= 1){
    console.log(1);
}
else{
    console.log(0);
}


const prompt = require('prompt-sync')(); //It is for defining prompt for vs code.

// If-else
let a = prompt("Enter your age: ");
if(a >= 18){
    console.log("Your age is valid for voting.");
}
else{
    console.log("Your age is not valid for voting.");
}


// else-if

marks marks = prompt("Enter your marks");