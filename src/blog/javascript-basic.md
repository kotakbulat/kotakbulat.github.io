````markdown
---
title: JavaScript Basics: Understanding the Fundamentals
date: 2026-03-07
tags: javascript, programming, web-development, beginners
description: A beginner-friendly introduction to JavaScript covering variables, data types, functions, control flow, and basic concepts used in modern web development.
image: blog-javascript-basic.png
---

## Introduction

JavaScript is one of the core technologies of the web, alongside HTML and CSS. It allows developers to create interactive and dynamic behavior in websites, such as updating content, handling user input, and communicating with servers.

Originally created to run in browsers, JavaScript is now used for many purposes including backend development, mobile apps, desktop apps, and even IoT devices.

---

## 1. Variables

Variables are used to store data that can be used later in the program.

JavaScript provides three main ways to declare variables:

```javascript
let name = "Alice";
const age = 25;
var city = "Tokyo";
````

### Explanation

* **let** → Used for variables that may change later.
* **const** → Used for values that should not change.
* **var** → Older syntax, mostly avoided in modern JavaScript.

Example:

```javascript
let score = 10;
score = 20; // allowed

const pi = 3.14;
// pi = 4; // error
```

---

## 2. Data Types

JavaScript supports several types of data.

### Primitive Types

```javascript
let number = 42;
let text = "Hello";
let isActive = true;
let empty = null;
let notDefined = undefined;
```

Common primitive types:

* Number
* String
* Boolean
* Null
* Undefined
* Symbol
* BigInt

### Objects

Objects store collections of key-value pairs.

```javascript
const user = {
  name: "John",
  age: 30
};

console.log(user.name);
```

Arrays are also objects:

```javascript
const fruits = ["apple", "banana", "orange"];
```

---

## 3. Operators

Operators perform operations on values.

### Arithmetic Operators

```javascript
let a = 10;
let b = 5;

console.log(a + b); 
console.log(a - b);
console.log(a * b);
console.log(a / b);
```

### Comparison Operators

```javascript
console.log(5 === "5"); // false
console.log(5 == "5");  // true
```

Best practice is to use **strict equality (`===`)**.

---

## 4. Control Flow

Control flow allows programs to make decisions.

### If Statement

```javascript
let age = 18;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

### Switch Statement

```javascript
let day = 2;

switch(day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Unknown day");
}
```

---

## 5. Functions

Functions allow you to reuse code.

### Function Declaration

```javascript
function greet(name) {
  return "Hello " + name;
}

console.log(greet("Alice"));
```

### Arrow Function

Modern JavaScript commonly uses arrow functions:

```javascript
const greet = (name) => {
  return `Hello ${name}`;
};
```

Shorter version:

```javascript
const greet = name => `Hello ${name}`;
```

---

## 6. Loops

Loops allow repeating tasks.

### For Loop

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### While Loop

```javascript
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

### For...of (for arrays)

```javascript
const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

---

## 7. DOM Manipulation

In browsers, JavaScript can interact with HTML using the Document Object Model (DOM).

Example:

```javascript
const button = document.querySelector("#btn");

button.addEventListener("click", () => {
  alert("Button clicked!");
});
```

This allows JavaScript to respond to user interactions.

---

## 8. Asynchronous JavaScript

JavaScript can run asynchronous tasks such as API requests.

### Promises

```javascript
fetch("https://api.example.com/data")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Async / Await

```javascript
async function loadData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

---

## Conclusion

JavaScript fundamentals include:

* Variables
* Data types
* Operators
* Control flow
* Functions
* Loops
* DOM manipulation
* Asynchronous programming

Mastering these basics provides the foundation needed to move on to advanced topics such as frameworks, state management, and modern frontend development tools.

```
```
