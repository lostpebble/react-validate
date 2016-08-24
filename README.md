## *Busy setting up this module. Don't use just yet!*

### [Examples in action and help getting started here](https://lostpebble.github.io/react-validate/)

React-Validate
-------------

React-Validate aims to simplify validation, be it for forms or any other sequence of components in your React app. To do so, React-Validate provides wrapper components which allow you to write code that is easy to conceptualize and read. These components are as follows:

### **`<Validate>`**
- the basic validation wrapper you'll wrap around any component you want to keep in check

### **`<ValidateGroup>`**
- Group bunches of **`<Validate>`** and know if they're all valid or not. You can even group different bunches of **`<ValidateGroup>`** if you like to be notified if all groups are valid or not

Simple Example
-------------

Since forms seem to be the most common use of validation, let's start with a simple email and password login form.

```
<form action="/post-form-data">
  <ValidateGroup onValidChange={this.setSubmit}>
    <h3>Email</h3>
	  <Validate validators={[ validateEmail ]}>
	    <input type="text"/>
	  </Validate>
	<h3>Password</h3>
	  <Validate validators={[ validateLength ]}>
	    <input type="password"/>
	  </Validate>
	<button type="submit">Submit</button>
  </ValidateGroup>
</form>
```

##...