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