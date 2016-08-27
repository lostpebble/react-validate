import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Showcase from './Showcase';

const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.6 31.8"><path d="M16.3 0C7.3 0 0 7.3 0 16.3c0 7.2 4.7 13.3 11.1 15.5.8.1 1.1-.4 1.1-.8v-2.8c-4.5 1-5.5-2.2-5.5-2.2-.7-1.9-1.8-2.4-1.8-2.4-1.5-1 .1-1 .1-1 1.6.1 2.5 1.7 2.5 1.7 1.5 2.5 3.8 1.8 4.7 1.4.1-1.1.6-1.8 1-2.2-3.6-.4-7.4-1.8-7.4-8.1 0-1.8.6-3.2 1.7-4.4-.1-.3-.7-2 .2-4.2 0 0 1.4-.4 4.5 1.7 1.3-.4 2.7-.5 4.1-.5 1.4 0 2.8.2 4.1.5 3.1-2.1 4.5-1.7 4.5-1.7.9 2.2.3 3.9.2 4.3 1 1.1 1.7 2.6 1.7 4.4 0 6.3-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3V31c0 .4.3.9 1.1.8 6.5-2.2 11.1-8.3 11.1-15.5C32.6 7.3 25.3 0 16.3 0z" /></svg>;

export default class App extends Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div className="app">
          <div className="github"><a className="target" target="_blank" href="https://github.com/lostpebble/react-validate"><div className="box"><GithubIcon/></div></a></div>
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
