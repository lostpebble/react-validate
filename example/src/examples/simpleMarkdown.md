Simple Example
-------------

Since forms seem to be the most common use of validation, let's start with a simple email and password login form.

```
<form action="/post-form-data">
  <ValidateGroup onValidChange={this.setSubmit}>
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