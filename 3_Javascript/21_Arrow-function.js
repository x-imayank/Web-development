// This keyword

const user = {
    username: "Javascript",
    website: "js.com",

    WelcomeMessage: function () {
        console.log(`${this.username}, this is the username.`); //This keyword is use to assign value of given declearation.
    }
}

console.log(user.WelcomeMessage())

user.username = "Function";
console.log(user.WelcomeMessage())

