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
As you can see we aren't controlling any of the inputs, which is most likely not going to be the case in most forms,
but this is the most basic use of React-Validate and shows how it Just Works™ out the box without any configuration.

> Try filling in a valid email and password (6 or more characters) and you'll see `<ValidateGroup>` takes care of enabling and disabling any
element inside of it that has a prop of type which has been set to submit, i.e. `type="submit"`.

You'll also notice there isn't much feedback to the user. This is bad design and can cause frustration
(even if we explicitly gave instructions to the user for it). In this example, if a user types in a password less
than 6 characters, how do they know they are in the wrong? This is where error feedback comes in.
