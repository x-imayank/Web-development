// Destructring the object

const Course = {
     courseName: "JS in hindi",
     price: "free",
     courseInstructor: "Mayank",
}

// Course.courseInstructor

// const { courseInstructor } = Course;
// console.log(courseInstructor)

const { courseInstructor: name } = Course; // Small the name of courseInstructor
console.log(name)


// Json

// {
//      "name": "Mayank",
//      "courseName1": "free",
// }

