const programming = ["js", "rb", "py", "java", "cpp"]

const values = programming.forEach((item) => {
    // console.log(item)
    // return item
})

//console.log(values) /*forEach loop didnt return anything*/

// Filter uses
const myNum = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// const newNums = myNum.filter((num) => num > 4)
const newNums = myNum.filter((num) => {
    return num > 4
})
console.log(newNums)

// make above in forEach
const newNum = []

newNums.forEach((numbers) => {
    if (numbers > 4) {
        newNum.push(numbers)
    } else {

    }
})
console.log(newNum)



// Filter uses

const books = [
    { title: 'Book One', genre: 'Fiction', publish: 1981, edition: 2004 },
    { title: 'Book Two', genre: 'Non-Fiction', publish: 1992, edition: 2008 },
    { title: 'Book Three', genre: 'History', publish: 1999, edition: 2007 },
    { title: 'Book Four', genre: 'Non-Fiction', publish: 1989, edition: 2010 },
    { title: 'Book Five', genre: 'Science', publish: 2009, edition: 2014 },
    { title: 'Book Six', genre: 'Fiction', publish: 1987, edition: 2010 },
    { title: 'Book Seven', genre: 'History', publish: 1986, edition: 1996 },
    { title: 'Book Eight', genre: 'Science', publish: 2011, edition: 2016 },
    { title: 'Book Nine', genre: 'Non-Fiction', publish: 1981, edition: 1989 },
];

const filt = books.filter((bk) => {
    return bk.genre === 'Fiction'
})
console.log(filt)

// map callback function
let number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const new1 = number.map((num) => num + 10)
console.log(new1)
