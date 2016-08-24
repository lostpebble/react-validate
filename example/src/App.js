import React, { Component } from 'react';
import { Validate, ValidateGroup, ErrorMessage } from '../../src/index';

import validator from 'validator';
import bind from 'lodash/bind';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const errorMessages = {
	email: "Not a valid email",
	password: "Password too short. Use at least 6 characters.",
};

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

	changeInputValue(event, asd, payload) {
		this.setState({
			inputValue: payload,
		});
	}

	onValidateError(value, errorMessage, uniqueId) {
		console.log(`${uniqueId} error change to ${value} with message : ${errorMessage}`);
	}

	render() {
		const validateLength = bind(validator.isLength, null, bind.placeholder, { min: 6 });
		const validateEquals = bind(validator.equals, null, bind.placeholder, "correct");

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div className="app">
						<h1>React-Validate</h1>
						<ValidateGroup className="outer-validate-group" onValidChange={this.setOuterGroupValid}>
							<div>These groups together are {this.state.outerGroupValid ? "VALID" : "INVALID"}</div>
							<ValidateGroup validChange={this.setGroupValid}>
								<div>This group is {this.state.groupValid ? "VALID" : "INVALID"}</div>
								<h3>Email</h3>
								<Validate onErrorChange={this.onValidateError} validators={[validator.isEmail]} impatientError>
									<ErrorMessage>{errorMessages.email}</ErrorMessage>
									<input className="normal-input" type="text"/>
								</Validate>
								<h3>Password</h3>
								<Validate onErrorChange={this.onValidateError} validators={[validateLength]} errorText="Password minimum six characters" passError>
									<TextField type="password" />
								</Validate>
								<Validate validators={[validateEquals]} impatientError>
									<select className="normal-input">
										<option value="first">First</option>
										<option value="second">Second</option>
										<option value="correct">Correct</option>
									</select>
								</Validate>
								<Validate validators={[validateEquals]} errorText="That's an unfortunate choice" onChangeValueKeys={[]} onChangeValuePosition={2} impatientError passError>
									<SelectField>
										<MenuItem value="correct" primaryText="Correct" />
										<MenuItem value="other" primaryText="Every Night" />
										<MenuItem value="another" primaryText="Weeknights" />
									</SelectField>
								</Validate>
							</ValidateGroup>
							<ValidateGroup onValidChange={this.setGroup2Valid}>
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
			</MuiThemeProvider>
		);
	}
}

// value={this.state.inputValue} onChange={this.changeInputValue}