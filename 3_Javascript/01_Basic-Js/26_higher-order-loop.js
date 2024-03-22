// for of loop
// always use for an array
let arr = [1, 2, 3, 4, 5, 6]
for (const num of arr) {
    console.log(num)
}

const name = "Hello world"
for (const char of name) {
    console.log(`Each character of name is ${char}`)
}

// for in loop
// always use for object.
const ass = "inter"
for (const name in ass) {
    console.log(`printing same name ${ass}`) // Printing same name in order to the sum of words.
}


// For each loop

const coding = ["js", "ruby", "java", "cpp"]

// coding.forEach(function (item) {
//     console.log(item);
// })

// coding.forEach((item) => {
//     console.log(item);
// })

function printMe(item) {
    console.log(item);
}

coding.forEach(printMe)

