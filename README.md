
## 1. What is the difference between var, let, and const?

# => var, let, and const are three ways to declare variables in JavaScript. var is the old style, function-scoped, allows redeclaration and reassignment. let is modern, block-scoped, prevents redeclaration in the same scope, but allows reassignment, making it safer for variables that change. const is also block-scoped, cannot be redeclared or reassigned, providing immutable bindings for variables whose values should not change, though object and array contents can still be modified.

## 2. What is the difference between map(), forEach(), and filter()?
# => **forEach()**  Used to execute a function on each element of an array for side effects; it does not produce a new array.**map()**  Used to transform elements of an array and returns a new array containing the transformed values.**filter()**  Used to select a subset of elements that satisfy a specific condition, producing a new array with only those elements.


## 3. What are arrow functions in ES6?
# => **Arrow functions** are a compact, modern way to write functions in JavaScript, especially useful for callbacks and functional programming, with the added benefit of lexical scoping for this.


## 4. How does destructuring assignment work in ES6?
# => **Destructuring assignment** lets you unpack values from arrays or objects directly into variables, making your code more concise, readable, and expressive.

## 5. Explain template literals in ES6. How are they different from string concatenation?
# => **Template literals** are a new way to work with strings in ES6 using backticks (``) instead of single or double quotes and provide a clean, readable, and powerful way to create strings with embedded variables and expressions, replacing traditional string concatenation for better clarity and maintainability.