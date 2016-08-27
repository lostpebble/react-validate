import React, { Component } from 'react';
import { Validate, ValidateGroup, ErrorMessage } from '../../../../src/index';

import validator from 'validator';

import { errorMessages } from '../../messages';

function validateLength(value) {
  return validator.isLength(value, { min: 6 });
}

export default class SimpleWithErrors extends Component {

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
            <ErrorMessage>{errorMessages.email}</ErrorMessage>
					</Validate>
					<h3>Password</h3>
					<Validate validators={[validateLength]}>
            <ErrorMessage>{errorMessages.password}</ErrorMessage>
						<input type="password"/>
					</Validate>
					<button type="submit">Submit</button>
				</ValidateGroup>
			</form>
		);
	}
}
