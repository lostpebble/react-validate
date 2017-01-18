### [Examples in action and help getting started here](https://lostpebble.github.io/react-validate/)

***WARNING: Still Under Construction***
------------------------

![that's a tick, not some blades of grass XD](https://raw.github.com/lostpebble/react-validate/master/gh-pages/logo_small.png?raw=true "Koa MobX React Goodness")

React-Validate
-------------

React-Validate aims to simplify validation, be it for forms or any other sequence of components in your React app. To do so, React-Validate provides wrapper components which allow you to write code that is easy to conceptualize and read. These components are as follows:

### **`<Validate>`**
- the basic validation wrapper you'll wrap around any component you want to keep in check

### **`<ValidateGroup>`**
- Group bunches of **`<Validate>`** and know if they're all valid or not. You can even group different bunches of **`<ValidateGroup>`** if you like, to be notified if all groups are valid or not

For the sake of keeping things simple, we'll refer to the components that are wrapped by `<Validate>` as **inputs** from now on.

One important concept to grasp before continuing:
There is a difference between something being _invalid_ and something being in a state of _error_.
For a better user experience, even if an input is invalid, we often don't want to shove an error into a user's face straight away.
There are various ways React-Validate deals with this, which we'll get to soon.

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

Simple Example
-------------

Since forms seem to be the most common use of validation, let's start with a simple email and password login form.

```
<form action="/post-form-data">
  <ValidateGroup>
    <h3>Email</h3>
    <Validate validators={[validateEmail]}>
      <input type="text"/>
    </Validate>
    <h3>Password</h3>
    <Validate validators={[validateLength]}>
      <input type="password"/>
    </Validate>
    <button type="submit">Submit</button>
  </ValidateGroup>
</form>
```
This is the render method of our simple example.
As you can see we arn't controlling any of the inputs, which is most likely not going to be the case in most forms,
but this is the most basic use of React-Validate and shows how it Just Works™ out the box without any configuration.

Try filling in a valid email and password (6 or more characters) and you'll see `<ValidateGroup>` takes care of enabling and disabling any
element inside of it with a prop of type that's equal to submit, i.e. `type="submit"`.

You'll also notice, there isn't much feedback to the user. This is bad design and can cause frustration. In this example,
if a user types in a password less than 6 characters, how do they know they are in the wrong? This is where error feedback
comes in.

Simple Example with error feedback
-------------

Let's  try the same example with feedback this time.

```
<form action="/post-form-data">
  <ValidateGroup>
    <h3>Email</h3>
    <Validate validators={[validateEmail]}>
      <input type="text"/>
      <ErrorMessage>{errorMessages.email}</ErrorMessage>
    </Validate>
    <h3>Password</h3>
    <Validate validators={[validateLength]}>
      <input type="password"/>
      <ErrorMessage>{errorMessages.password}</ErrorMessage>
    </Validate>
    <button type="submit">Submit</button>
  </ValidateGroup>
</form>
```
One of the easiest ways to provide error feedback is to place `<ErrorMessage>` components inside of `<Validate>` components.
These components will become visible or hidden according to the error settings you've set via props on the `<Validate>` component. By default,
`<ErrorMessage>` will only display its contents when focus is lost and the input is found to be invalid.

### ** A look at the`<ErrorMessage>` component**

Default CSS class name: `.error-message`

<table>
  <tbody>
  <tr>
    <th align="left">Props</th>
    <th align="left">Values and defaults</th>
  </tr>
  <tr>
      <td><code>manual</code></td>
      <td align="left"><strong>boolean</strong> : default <code>false</code><br/>Use your own css to make this component visible or hidden. You can target those states with the class names <code>.visible</code> and <code>.hidden</code></td>
    </tr>
  </tbody>
</table>

Error feedback configuration
-----------

You can set the following props on `<Validate>` components to control how and when error messages are displayed:

