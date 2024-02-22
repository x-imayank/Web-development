// Object literals

const JsUser = {
     name: "Javascript",
     location: "Unknown",
     email: "js@google.com",
     isLoggedIn: false,
     lastLoggedDays: ["Monday", "Tuesday"]
}

console.log(JsUser.email)
// console.log(JsUser[email])

JsUser.email = "js@chatgpt.com"
console.log(JsUser.email)
Object.freeze(JsUser)
JsUser.email = "js@freeze.com" // Not changing the email because is is freezzed.
console.log(JsUser)