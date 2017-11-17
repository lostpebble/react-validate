import React, { Component } from "react";
import PropTypes from "prop-types";

import introMarkdown from "./intro.md";

import SimpleExample from "./examples/simple/SimpleExample";
import simpleMarkdown from "./examples/simple/README.md";

import SimpleExampleWithErrors from "./examples/simpleWithErrors/SimpleWithErrorsExample";
import simpleWithErrorsMarkdown from "./examples/simpleWithErrors/README.md";

export default class Showcase extends Component {
  render() {
    // const validateLength = bind(validator.isLength, null, bind.placeholder, { min: 6 });
    // const validateEquals = bind(validator.equals, null, bind.placeholder, "correct");

    return (
      <div className="showcase">
        <div className="showcase-row">
          <div className="showcase-left" dangerouslySetInnerHTML={{ __html: introMarkdown }} />
          <div className="showcase-right" />
        </div>
        <div className="showcase-row">
          <div className="showcase-left" dangerouslySetInnerHTML={{ __html: simpleMarkdown }} />
          <div className="showcase-right">
            <SimpleExample />
          </div>
        </div>
        <div className="showcase-row">
          <div className="showcase-left" dangerouslySetInnerHTML={{ __html: simpleWithErrorsMarkdown }} />
          <div className="showcase-right">
            <SimpleExampleWithErrors />
          </div>
        </div>
        <div className="showcase-row">
          <div className="showcase-left" />
          <div className="showcase-right" />
        </div>
      </div>
    );
  }
}

/*
* <ValidateGroup>
 <div>These groups together are {this.state.outerGroupValid ? "VALID" : "INVALID"}</div>
 <ValidateGroup onValidChange={this.setGroupValid}>
 <div>This group is {this.state.groupValid ? "VALID" : "INVALID"}</div>
 <h3>Email</h3>
 <Validate onErrorChange={this.onValidateError} validators={[validator.isEmail]} impatientFeedback>
 <ErrorMessage>{errorMessages.email}</ErrorMessage>
 <input className="normal-input" type="text"/>
 </Validate>
 <Validate passError impatientFeedback validators={[validateEquals]} errorText="That's an unfortunate choice" onChangeValueKeys={[]} onChangeValuePosition={2}>
 <SelectField>
 <MenuItem value="correct" primaryText="Correct" />
 <MenuItem value="other" primaryText="Every Night" />
 <MenuItem value="another" primaryText="Weeknights" />
 </SelectField>
 </Validate>
 </ValidateGroup>
 <ValidateGroup onValidChange={this.setGroup2Valid}>
 <div>This group is {this.state.group2Valid ? "VALID" : "INVALID"}</div>
 <h3>Password</h3>
 <Validate validators={[validateLength]}>
 <input type="password"/>
 </Validate>
 </ValidateGroup>
 </ValidateGroup>
* */
