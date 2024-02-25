const prompt = require("prompt-sync")({ sigint: true });

function sayMyName() {
     console.log("M")
     console.log("A")
     console.log("Y")
     console.log("A")
     console.log("N")
     console.log("K")
}

// sayMyName();

// First
function addNumbers(a, b) {
     console.log(a + b);
}

addNumbers(4, 5)

// Second
function add(a, b) {
     let result = a + b;
     return result;
}

let result = add(1, 2);
console.log(result);

// Third Parameters

function loginUser(username) {
     if (username == undefined) {
          console.log("Please enter a username")
          return
     }
     else {
          return `${username} just logged in`
     }
}

// console.log(loginUser("Mayank"));
console.log(loginUser()); // It returns undefined


const name1 = prompt("Enter your name: ")
const email1 = prompt("Enter your email: ")
const age1 = prompt("Enter your age: ")
newUser = {
     name: "",
     email: "",
     age: "",
}

newUser.name = name1;
newUser.email = email1;
newUser.age = Number(age1);

console.log(newUser.name)
console.log(newUser.email)
console.log(newUser.age)
console.log(typeof newUser.age)

let a = Number(prompt());
console.log(typeof a)


