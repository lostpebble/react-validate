import React, {Component, PropTypes} from 'react';
import { Validate, ValidateGroup, ErrorMessage } from '../../../src/index';

import { errorMessages } from '../messages';

import validator from 'validator';
import bind from 'lodash/bind';

export default class SimpleExample extends Component {
	render() {
		const validateLength = bind(validator.isLength, null, bind.placeholder, { min: 6 });
		const validateEmail = validator.isEmail;

		return (
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
		);
	}
}
