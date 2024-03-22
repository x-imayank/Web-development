// Dates

let myDate = new Date()
console.log(myDate.toString())
console.log(myDate.toJSON())
console.log(myDate.toLocaleString())

console.log(typeof myDate);

let myCreatedDate = new Date(2023, 0, 23) // year,month,date
console.log(myCreatedDate.toDateString())
console.log(myCreatedDate.toLocaleString())

let myTimeStamp = Date.now()

console.log(myTimeStamp);
console.log(myCreatedDate.getTime());
console.log(Date.now())

let newDate = new Date()
console.log(newDate);
console.log(newDate)