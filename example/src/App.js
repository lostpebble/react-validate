import React, { Component } from 'react';
import { Validate, ValidateGroup } from '../../components/index';

import validator from 'validator';
import bind from 'lodash/bind';

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			inputValue: "",
			groupValid: false,
		};

		// Short-hand for binding functions to their own (this) context.
		// Requires Babel and preset-state-0
		this.changeInputValue = ::this.changeInputValue;
		this.setGroupValid = ::this.setGroupValid;
	}

	setGroupValid(value) {
		this.setState({
			groupValid: value,
		});
	}

	changeInputValue(event) {
		this.setState({
			inputValue: event.target.value,
		});
	}

	render() {
		const validateLength = bind(validator.isLength, null, bind.placeholder, { min: 6 });

		return (
			<div className="app">
				<h1>React-Validate</h1>
				<div>This group below is {this.state.groupValid ? "VALID" : "INVALID"}</div>
				<ValidateGroup validChange={this.setGroupValid}>
					<h3>Email</h3>
					<Validate validators={[validator.isEmail]} impatientError>
						<input type="text"/>
					</Validate>
					<h3>Password</h3>
					<Validate validators={[validateLength]}>
						<input value={this.state.inputValue} onChange={this.changeInputValue}/>
					</Validate>
				</ValidateGroup>
			</div>
		);
	}
}
