React-Validate
-------------

React-Validate aims to simplify validation, be it for forms or any other sequence of components in your React app. To do so, React-Validate provides wrapper components which allow you to write code that is easy to conceptualize and read. These components are as follows:

### **`<Validate>`**
- the basic validation wrapper you'll wrap around any component you want to keep in check

### **`<ValidateGroup>`**
- Group bunches of **`<Validate>`** and know if they're all valid or not. You can even group different bunches of **`<ValidateGroup>`** if you like, to be notified if all groups are valid or not

For the sake of keeping things simple, we'll refer to the components that are wrapped by `<Validate>` as **inputs** from now on.

One important concept to grasp before continuing:
There is a difference between something being _invalid_ and something being _in a state of error_.
For a better user experience, even if an input is invalid, we often don't want to shove an error into a user's face straight away.
[There are various ways React-Validate deals with this](#error-props), which we'll get to soon.

Validator functions
-------------

In order for our inputs to be validated we need to define what it means for that input value to be valid.
With React-Validate we do that by means of functions we'll refer to here as **validators**. A validator is a function that
takes only one argument (the input's value) and returns either true or false, valid or invalid respectively.

```
function containsNumbers(value) {
  // This tests the regex /d (match a digit)
  // against our value
  return /\d/.test(value);
}
```

A great library for validator functions is one called [validator](https://github.com/chriso/validator.js),
which we'll use for our examples on this page. One small note to make here: we know our validator functions
can only take one argument (the value to check) but some validator functions will require options,
so sometimes we need to wrap validator functions inside a one argument function like so:

```
function validateLength(value) {
  return validator.isLength(value, { min: 6 });
}
```
