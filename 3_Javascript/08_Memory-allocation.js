// Stack (Premitive), Heap (Non-Premitive)

let myName = "javascript"

let anotherName = myName;
anotherName = "myname";
console.log(anotherName);

// Making a block.
let userOne = {
     email: "xyz@google.com",
     upi: "user@ybl",
}

// we use userTwo for using the value of userOne.
let userTwo = userOne;

console.log(userTwo.email) 