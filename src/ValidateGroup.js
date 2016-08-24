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
			id: props.id.length ? props.id : uniqueId('inptval_'),
		};

		this.validChangeInGroup = ::this.validChangeInGroup;
		this.checkValidation = ::this.checkValidation;
		this.validatorLeaveGroup = ::this.validatorLeaveGroup;
		this.validationTimeout = null;
	}

	componentWillMount() {
		if (this.props.validChangeInGroup) this.props.validChangeInGroup(false, this.state.id);
	}

	componentWillUnmount() {
		if (this.props.validatorLeaveGroup) this.props.validatorLeaveGroup();
	}

	checkValidation() {
		let validState = true;

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

		this.state.validStates.set(id, value);

		// Small timeout to ensure all Validate components
		// are registered without calling checkValidation each time
		this.validationTimeout = setTimeout(this.checkValidation, 20);
	}

	render() {
		const baseProps = {};

		if (this.props.impatientError != null) baseProps.impatientError = this.props.impatientError;

		const newChildren = React.Children.map(this.props.children, (child) => {
			if (child && (child.type === Validate || child.type === ValidateGroup)) {
				return React.cloneElement(child, Object.assign(baseProps, { validChangeInGroup: this.validChangeInGroup, validatorLeaveGroup: this.validatorLeaveGroup }));
			}

			return child;
		});

		return (
			<div className={`${this.props.className} ${this.state.valid ? "valid" : "invalid"}`}>{newChildren}</div>
		);
	}
}

ValidateGroup.propTypes = {
	impatientError: PropTypes.bool,
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
	impatientError: null,
	className: "validate-group",
};
