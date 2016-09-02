Simple Example with error feedback
-------------

Let's  try the same example with feedback this time.

```
<form onSubmit={this.formAction}>
  <ValidateGroup>
    <h3>Email</h3>
    <Validate validators={[validateEmail]}>
      <input type="text"/>
      <ErrorMessage>Not a valid email</ErrorMessage>
    </Validate>
    <h3>Password</h3>
    <Validate validators={[validateLength]}>
      <ErrorMessage>Password too short. Use at least 6 characters</ErrorMessage>
      <input type="password"/>
    </Validate>
    <button type="submit">Submit</button>
  </ValidateGroup>
</form>
```
One of the easiest ways to provide error feedback is to place `<ErrorMessage>` components inside of `<Validate>` components.
These components will become visible or hidden according to the error settings [(see next section)](#error-props) you've set via props on the `<Validate>` component. By default,
`<ErrorMessage>` will only display its contents when focus is lost and the input is found to be invalid.

> The `<ErrorMessage>` component and the input component can be placed in any order inside of the `<Validate>` component,
as shown in this example (not the nicest design, but for the sake of demonstration we'll make an exception!)

<div id="error-message-component"></div>

### A look at the`<ErrorMessage>` component

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

<div id="error-props"></div>

Error feedback configuration
-----------

You can set the following props on `<Validate>` components to control how and when error messages are displayed:

