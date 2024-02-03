console.log("Functions");

function nice(name) {
     console.log("Hey " + name + " you are nice!");
}

nice("Suman");

for (let i = 1; i <= 10; i++) {
     // nice("Rohan");
}


function sum(a, b, c = 2) {
     // console.log(a + b);
     return a + b + c;
}


let p = 6;
let q = 3;
sum(p, q); //for console.log in function
console.log(sum(p, q, 1)); //For return in function


console.log("\n");

//arrow function

const func1 = (x) => {
     console.log("I am an arrow function.", x);
}

func1(12);
