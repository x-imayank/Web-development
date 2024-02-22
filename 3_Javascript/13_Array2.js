const marval_heroes = ["Thor", "Ironman", "Spiderman"]
const dc = ["Superman", "Flash", "Batman"]

// Method 1
marval_heroes.push(dc)

console.log(marval_heroes)
console.log(dc)

console.log(marval_heroes[3][1]) // For accesing the value of third element of first position.

// Method 2
marval_heroes.concat(dc)
console.log(marval_heroes)

const allHeroes = marval_heroes.concat(dc)
console.log(allHeroes);

const all_new_heroes = [...marval_heroes, ...dc]
console.log(all_new_heroes)