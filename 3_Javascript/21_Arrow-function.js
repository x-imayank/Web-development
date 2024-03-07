// This keyword

const user = {
    username: "Javascript",
    website: "js.com",

    WelcomeMessage: function () {
        console.log(`${this.username}, this is the username.`); //This keyword is use to assign value of given variable. it is only use in object
    }
}

console.log(user.WelcomeMessage())

user.username = "Function";
console.log(user.WelcomeMessage())


// Arrow function
// eg. 1
const addTwo = (num1, num2) => {
    return num1 + num2; // Explicit
}
console.log(addTwo(1, 2))

// eg. 2
const addOne = (num) => (num + 2) // Implicit
console.log(addOne(4))

// eg.3 (object in function)
const obj = () => ({ username: "Javascript" })
console.log(obj())