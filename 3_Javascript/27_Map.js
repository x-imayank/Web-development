// Map => it is in same order

const map = new Map()
map.set('IN', "India")
map.set('USA', "United States of America")
map.set('Fr', "France")

console.log(map);

/*for (const key of map) {
    console.log(key)
}*/
for (const [key, value] of map) {
    console.log(key, ':-', value)
}

const myObj = {
    'game1': 'NFS',
    'game2': 'Spiderman',
}

for (const key in myObj) {
    console.log(`${key} is use for ${myObj[key]}`);
}

const programming = ["js", "rb", "py", "java", "cpp"]
for (const key in programming) {
    console.log(key)
}