// const tinderUser = new Object()
const tinderUser = {}

tinderUser.id = "xyz";
tinderUser.name = "sam"
tinderUser.loggedIn = false;

// console.log(tinderUser)

const regularUser = {
     email: "xyz@gmail.com",
     fullName: {
          userFullName: {
               firstName: "Javascript",
               lastName: "Backend"

          }
     }
}

console.log(regularUser.fullName.fullName.userFullName.firstName);