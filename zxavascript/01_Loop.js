console.log("Looping");

let a = 1;

// For loop
for (let i = 0; i < 10; i++) {
     console.log(a + i);
}

console.log('\n');

let obj = {
     name: "Mayank",
     class: "409'A' ",
}

// For in loop
for (const key in obj) {
     const element = obj[key];
     console.log(key + ' ' + element);
}

console.log('\n');

// For of loop
for (const le of "Mayank") {
     console.log(le);
}

console.log('\n');

// while loop
let i = 2;
while (i < 6) {
     console.log(i);
     i++;
}

console.log('\n');

// do while loop
let b = 5;
do {
     console.log(b);
     b++;
}
while (b < 10);