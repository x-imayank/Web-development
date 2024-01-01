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
if ((b - c) <= 1) {
    console.log(1);
}
else {
    console.log(0);
}


const prompt = require('prompt-sync')(); //It is for defining prompt for vs code.

// If-else
let a = prompt("Enter your age: ");
if (a >= 18) {
    console.log("Your age is valid for voting.");
}
else {
    console.log("Your age is not valid for voting.");
}


// else-if

const marks = prompt("Enter your marks: ");

if (marks >= 75 && marks <= 100) {
    console.log("First");
}

else if (marks >= 50 && marks < 75) {
    console.log("Second");
}

else if (marks >= 33 && marks < 50) {
    console.log("Third");
}

else {
    console.log("Fail");
}

// Nested if-else

let x = prompt("Enter first numbers: ");
let y = prompt("Enter second numbers: ");
let z = prompt("Enter third numbers: ");

if (x > y) {
    if (y > z) {
        console.log(x, " is greater.");
    }
    else {
        console.log(z, " is greater.");
    }
}
else {
    console.log(y, " is greater");
}

// Ternary

x > y ? console.log("Yes") : console.log("False"); 