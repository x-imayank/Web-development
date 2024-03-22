const array = [1, 2, 3, 4]
const total = array.reduce(function (acc, currval) {
    console.log(`acc: ${acc} and currval ${currval}`)
    return acc + currval;
}, 0)

console.log(total)


// Use
const shoppingCart = [
    {
        itemName: "Javascript",
        price: 1549
    },
    {
        itemName: "Python",
        price: 1899
    },
    {
        itemName: "System-design",
        price: 7599
    },
    {
        itemName: "Machine learning",
        price: 4999
    },
]

const totalPrice = shoppingCart.reduce((acc, item) => acc + item.price, 0)

/*const totalPrice = shoppingCart.reduce(function (acc, item) {
    return acc + item.price
}, 0)*/
console.log(totalPrice)