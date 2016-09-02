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

  //{errorMessages.email}

	render() {
		const validateEmail = validator.isEmail;

		return (
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
		);
	}
}

/*
*           <Validate propForValue="checked" onChangeValueKeys={["target", "checked"]} impatientFeedback>
 <ErrorMessage>Falsy value</ErrorMessage>
 <input name="checkname" type="checkbox" defaultChecked={false}/>
 </Validate>
* */
