
// { } //Scope

// if (true) {
//      let a = 10
//      const b = 20
//      var c = 30
//      console.log("Inner", a)
//      console.log("Inner", c)

// } // These curly braces declears scope in js.

// let a = 20
// console.log(a)

// var c = 12
// console.log(c)
// console.log(b)
// console.log(c)


// nested Scope

function one() {
     const username = "Javascript"

     function two() {
          const website = "Google"
          console.log(username);
     }
     // console.log(website);

     two()
}

one()

if (true) {
     const username = "javascript"
     if (username == "javascript") {
          const website = " Google"
          console.log(username + website)
     }
     // console.log(website) // The scope of website is in the if condition.
}
// console.log(username) // the scope of username in the if statement.
