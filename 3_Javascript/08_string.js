const name = "Javascript ";
const repoCount = 50;

console.log(name + repoCount + " Value");

console.log(`Hello my name is ${name}and my repo count is ${repoCount}`);

const gameName = new String('Javascript')

console.log(gameName[3])
console.log(gameName.__proto__);


console.log(gameName.length)
console.log(gameName.toUpperCase())
console.log(gameName.indexOf('v'))


const newString = gameName.substring(0, 4)
console.log(newString)

const anotherString = gameName.slice(-8, 4)
console.log(anotherString)

const newStringOne = "                  Javascript         "
console.log(newStringOne)
console.log(newStringOne.trim()) // Trim the spaces before and after of newStringOne

const url = "https://google.com/gmail%20mail"

console.log(url.replace('%20', '-'))
console.log(url.includes('google'))

