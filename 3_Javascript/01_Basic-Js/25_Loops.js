// For loop

let Arr = [1, 2, 3, 4, 12, 3]
for (let i = 0; i <= Arr.length; i++) {
    console.log(Arr[i]);
}

// break and continue

for (let i = 0; i <= 10; i++) {
    if (i == 5) {
        break;
    }
    console.log(i)
}
console.log("\n")

for (let i = 0; i <= 10; i++) {
    if (i == 5) {
        continue;
    }
    console.log(i)
}

// while

let index = 0;
while (index <= 10) {
    console.log(`value of index ${index}`)
    index = index + 2;
}

// do while

do {
    console.log(`value of index ${index}`)
    index = index + 1;
} while (index <= 10)