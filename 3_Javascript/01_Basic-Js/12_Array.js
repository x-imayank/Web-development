// Array

const myArr = [0, 1, 2, 3, 4, 5]
console.log(myArr)

const myHeroes = ["Shaktiman", "naagraj"]

const myArr2 = new Array(1, 2, 3, 4)
console.log(myArr[0])

// Array methods

myArr.push(6)
myArr.pop() // remove the value from last

// myArr.unshift(9) // adding first element
// myArr.shift() // remove first element

console.log(myArr.includes(0)) // Returns true or false because it check the elements in the array.
console.log(myArr.includes(9))

const newArr = myArr.join() // it joins and bind our array into string

console.log(myArr)
console.log(newArr) // string

// Slice, Splice

console.log("A ", myArr)
const myn1 = myArr.slice(1, 3); // lesser than 3rd position. or it didnt removes the numbers from an array.
console.log(myn1)


console.log("B ", myArr)
const myn2 = myArr.splice(1, 3) // equal to 3rd position or it removes the numbers from the array.
console.log(myn2)

console.log("C ", myArr)