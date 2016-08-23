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
			group2Valid: false,
			outerGroupValid: false,
		};

		// Short-hand for binding functions to their own (this) context.
		// Requires Babel and preset-state-0
		this.changeInputValue = ::this.changeInputValue;
		this.setGroupValid = ::this.setGroupValid;
		this.setGroup2Valid = ::this.setGroup2Valid;
		this.setOuterGroupValid = ::this.setOuterGroupValid;
	}

	setGroupValid(value) {
		this.setState({
			groupValid: value,
		});
	}

	setGroup2Valid(value) {
		this.setState({
			group2Valid: value,
		});
	}

	setOuterGroupValid(value) {
		this.setState({
			outerGroupValid: value,
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
				<ValidateGroup className="outer-validate-group" validChange={this.setOuterGroupValid}>
					<div>These groups together are {this.state.outerGroupValid ? "VALID" : "INVALID"}</div>
					<ValidateGroup validChange={this.setGroupValid}>
						<div>This group is {this.state.groupValid ? "VALID" : "INVALID"}</div>
						<h3>Email</h3>
						<Validate validators={[validator.isEmail]} feedbackOnMount>
							<input type="text" value={this.state.inputValue} onChange={this.changeInputValue}/>
						</Validate>
						<h3>Password</h3>
						<Validate validators={[validateLength]} >
							<input type="password"/>
						</Validate>
					</ValidateGroup>
					<ValidateGroup validChange={this.setGroup2Valid}>
						<div>This group is {this.state.group2Valid ? "VALID" : "INVALID"}</div>
						<h3>Email</h3>
						<Validate>
							<input type="text" value={this.state.inputValue} onChange={this.changeInputValue}/>
						</Validate>
						<h3>Password</h3>
						<Validate validators={[validateLength]}>
							<input type="password"/>
						</Validate>
					</ValidateGroup>
				</ValidateGroup>
			</div>
		);
	}
}
