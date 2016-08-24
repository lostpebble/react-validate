import React, {Component, PropTypes} from 'react';
import { Validate, ValidateGroup, ErrorMessage } from '../../../src/index';

import { errorMessages } from '../messages';

import validator from 'validator';
import bind from 'lodash/bind';

export default class SimpleExample extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formInvalid: true,
		};

		this.setSubmit = ::this.setSubmit;
	}

	setSubmit(value) {
		this.setState({
			formInvalid: value,
		});
	}

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
					<button type="submit" disabled={this.state.formInvalid}>Submit</button>
				</ValidateGroup>
			</form>
		);
	}
}
