function calculatePrice(...num1) {
     return num1;
}

console.log(calculatePrice(7))
console.log(calculatePrice(3, 4, 5, 3))

// ...num1 = ... is the rest operator it contains multiple values.

// e.g 2
function calculatePrice2(num1, num2, ...var1) {
     return var1;
}
console.log(calculatePrice2(200, 300, 100, 240)) // 200 and 300 goes with num1,num2 and 100,200 goes with ...var1;