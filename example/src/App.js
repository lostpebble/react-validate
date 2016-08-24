import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Showcase from './Showcase';

export default class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div className="app">
					<div className="header">
						<h1>React-Validate</h1>
					</div>
					<div className="showcase-blurb">
						<h2>Validate any and all react components</h2>
						<h4>*which manipulate some kind of value</h4>
					</div>
					<Showcase/>
					<div className="header"></div>
				</div>
			</MuiThemeProvider>
		);
	}
}

/*
 <h3>Password</h3>
 <Validate onErrorChange={this.onValidateError} validators={[validateLength]} errorText="Password minimum six characters" passError>
 <TextField id="pop" type="password" />
 </Validate>
 <Validate validators={[validateEquals]} impatientFeedback>
 <select className="normal-input">
 <option value="first">First</option>
 <option value="second">Second</option>
 <option value="correct">Correct</option>
 </select>
 </Validate>*/

// value={this.state.inputValue} onChange={this.changeInputValue}