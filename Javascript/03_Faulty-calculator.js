const prompt = require('prompt-sync')();

let a, b;
let sign;

a = Number(prompt("Enter your first number here: "))
b = Number(prompt("Enter your second number here: "))
sign = prompt("Enter your sign here: ");

let random = Math.random();
console.log(random);

switch (sign) {
     case '+':
          if (random > 0.1) {
               console.log("Addition: ", a - b);
          }
          else {
               console.log("Addition: ", a + b);
          }
          break;
     case '-':
          if (random > 0.1) {
               console.log("Substraction is: ", a + b);
          }
          else {
               console.log("Substraction is: ", a - b);
          }
          break;

     default:
          console.log("Please enter right number.");
          break;
}