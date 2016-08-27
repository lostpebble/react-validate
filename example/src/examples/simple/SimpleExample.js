import React, { Component } from 'react';
import { Validate, ValidateGroup } from '../../../../src/index';

import validator from 'validator';

function validateLength(value) {
  return validator.isLength(value, { min: 6 });
}

function containsNumbers(value) {
  // This tests the regex /d (match a digit)
  // against our value
  return /\d/.test(value);
}

export default class SimpleExample extends Component {

  formAction(event) {
    event.preventDefault();
    alert(`Mock submit form`);
  }

	render() {
		const validateEmail = validator.isEmail;

		return (
			<form onSubmit={this.formAction}>
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
		);
	}
}
