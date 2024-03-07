let val = (2 == 2)
if (true) {
    console.log("\nYes\n")
}

if (false) {
    console.log("NO")
}

// < , > , <= , >= , == , != , === , !==

let score = 200;
if (score < 300) {
    let power = "fly";
    console.log(`user power: ${power}\n`);
}
// console.log(`user power: ${power}`) // in let it throws an error.




const balance = 1000;
if (balance > 500) console.log("True\n");


// Nesting

if (balance < 500) {
    console.log("Greater")
} else if (balance < 750) {
    console.log("Not lesser.");
} else if (balance == 1000) {
    console.log("True");
}

console.log("\n")


// Using of nesting in real life

const userLoggedIn = true;
const debitCard = true;

if (userLoggedIn && debitCard && 2 == 2) {
    console.log("Allow for shopping.")
} else console.log("Not allow for shopping.")

const loggedInFromGoogle = false;
const loggedInFromemail = true;

if (loggedInFromGoogle || loggedInFromemail) {
    console.log("You are not a robot.")
} else console.log("You are not allow for using this please logIn.")


console.log("\n")


// Falsy values
// false, 0, -0, BigInt On, "", null, undefined, NaN

// Truthy values
// "0", 'false', " ", [], {}, function(){}

const userEmail = [];
if (userEmail.length === 0) {
    console.log("Array is empty");
}

const emptyObj = {}

if (Object.keys(emptyObj).length === 0) {
    console.log("Object is empty");
}

console.log("\n")
// Nullish coalescing operator (??): null undefined

let val1;
val1 = null ?? 10 // If null comes then print 10
val1 = undefined ?? 15 // if undefined comes then print 15

console.log(val1)

// Ternery operators
const iceTeaPrice = 100;
iceTeaPrice <= 80 ? console.log("Less than 80") : console.log("Not less than 80")