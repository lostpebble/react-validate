import React, { Component, PropTypes } from 'react';
import Validate from './Validate';

import uniqueId from 'lodash/uniqueId';

export default class ValidateGroup extends Component {

	constructor(props) {
		super(props);

		// valid is initially null since we don't know
		// what the initial state of our Validate components will be
		this.state = {
			valid: null,
			validStates: new Map(),
			id: props.id.length ? props.id : uniqueId('valgrp_'),
		};

		this.validChangeInGroup = ::this.validChangeInGroup;
		this.checkValidation = ::this.checkValidation;
		this.validatorLeaveGroup = ::this.validatorLeaveGroup;
		// this.validationTimeout = null;
	}

	componentWillMount() {
		console.log(`Mounting validation group ${this.state.id}`);
		// console.dir(this.props);

		if (this.props.validChangeInGroup) {
			console.log(`Regsitering validation group in parent group ${this.state.id}`);

			this.props.validChangeInGroup(false, this.state.id);
		}
	}

	componentWillUnmount() {
		if (this.props.validatorLeaveGroup) this.props.validatorLeaveGroup();
	}

	checkValidation() {
		let validState = true;

		// console.log(`Checking group validation in ${this.state.id}`);

		for (const isValid of this.state.validStates.values()) {
			if (!isValid) {
				validState = false;
				break;
			}
		}

		if (this.state.valid !== validState) {
			// Validation state has changed

			this.setState({
				valid: validState,
			});

			if (this.props.onValidChange) this.props.onValidChange(validState);
			if (this.props.validChangeInGroup) this.props.validChangeInGroup(validState, this.state.id);
		}
	}

	validatorLeaveGroup(id) {
		// (each component inside this group will call this
		//  when they un-mount)
		this.state.validStates.delete(id);
		this.checkValidation();
	}

	validChangeInGroup(value, id) {
		// (each component inside this group calls this
		//  method immediately on mount to register itself)

		// console.log(`Valid change in group ${this.state.id} from ${id}`);

		this.state.validStates.set(id, value);

		this.checkValidation();

		// Small timeout to ensure all Validate components
		// are registered without calling checkValidation each time
		// this.validationTimeout = setTimeout(this.checkValidation, 1000);
	}

	render() {
		const baseProps = {
			validChangeInGroup: this.validChangeInGroup,
			validatorLeaveGroup: this.validatorLeaveGroup,
		};

		if (this.props.impatientFeedback != null) baseProps.impatientFeedback = this.props.impatientFeedback;

		const newChildren = React.Children.map(this.props.children, (child) => {
			if (child && (child.type === Validate || child.type.name === "ValidateGroup")) {
				return React.cloneElement(child, baseProps);
			}

			if (child && child.props && child.props.type === "submit") {
				return React.cloneElement(child, { disabled: !this.state.valid });
      }

			return child;
		});

		// console.dir(newChildren);

		return (
			<div className={`${this.props.className} ${this.state.valid ? "valid" : "invalid"}`}>{newChildren}</div>
		);
	}
}

ValidateGroup.propTypes = {
	impatientFeedback: PropTypes.bool,
	onValidChange: PropTypes.func,
	className: PropTypes.string,
	id: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]),
};

ValidateGroup.defaultProps = {
	id: "",
	impatientFeedback: null,
	className: "validate-group",
};
