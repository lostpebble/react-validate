import React, { Component, PropTypes } from 'react';

import uniqueId from 'lodash/uniqueId';

export default class Validate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uncontrolled: true,
			childValue: props.defaultValue,
			validity: null,
			showError: false,
			id: props.id.length ? props.id : uniqueId('inptval_'),
		};

		this.onBlur = ::this.onBlur;
		this.onValueChange = ::this.onValueChange;

		// variable outside of setState to
		// trustfully hold most recent state
		this.recentChange = null;
	}

	componentWillMount() {
		if (typeof this.props.children.props[this.props.propForValue] !== 'undefined') {
			this.setState({
				uncontrolled: false,
				childValue: this.props.children.props[this.props.propForValue],
			});
		}

		this._checkValidation(
			this.state.uncontrolled ?
				this.state.childValue : this.props.children.props[this.props.propForValue],
			!(this.props.feedbackOnMount || this.props.impatientError));
	}

	componentWillReceiveProps(nextProps) {
		// extreme edge case, if the user is setting the value of the component
		// from outside the component (eg. not using onChange) maybe from a date-picker?...
		if (!this.state.uncontrolled) {
			if (nextProps.children.props[this.props.propForValue] !== this.recentChange) {
				this._checkValidation(nextProps.children.props[this.props.propForValue], !this.state.showError ? !this.props.impatientError : false);
			}
		}
	}

	componentWillUnmount() {
		if (this.props.validatorLeaveGroup) this.props.validatorLeaveGroup(this.state.id);
	}

	onValueChange(event) {
		// console.log(`${this.state.id} is changing`);

		let newValue = event;

		this.props.onChangeValueKeys.forEach((key) => {
			newValue = newValue[key];
		});

		this.setState({
			childValue: newValue,
		});

		this._checkValidation(newValue, !this.state.showError ? !this.props.impatientError : false);
	}

	onBlur() {
		this._checkValidation(this.state.uncontrolled ? this.state.childValue : this.props.children.props[this.props.propForValue]);
	}

	_interceptChange(originalOnChange) {
		return (changeEvent) => {
			if (typeof originalOnChange === 'function') {
				originalOnChange(changeEvent);
			}

			this.onValueChange(changeEvent);
		};
	}

	_checkValidation(value, patientError) {
		let newValidity = true;

		this.recentChange = value;

		if (this.props.validators.some((validator) => !validator(value))) {
			newValidity = false;
		}

		const state = {};

		if (!patientError) {
			console.log(`${this.state.id} checking validation`);

			if (this.state.showError !== !newValidity) {
				state.showError = !newValidity;
				if (this.props.onErrorChange) { this.props.onErrorChange(!newValidity, this.props.errorText, this.state.id); }
			}
		}

		if (this.state.validity !== newValidity) {
			state.validity = newValidity;

			if (this.props.onValidChange) { this.props.onValidChange(newValidity); }
			if (this.props.validChangeInGroup) { this.props.validChangeInGroup(newValidity, this.state.id); }
		}

		this.setState(state);
	}

	render() {
		const child = React.Children.only(this.props.children);

		const baseProps = {};
		if (this.props.passError) baseProps[this.props.propForErrorText] = this.state.showError ? this.props.errorText : "";
		if (this.props.propForShowError.length) baseProps[this.props.propForShowError] = this.state.showError;
		if (this.state.uncontrolled) {
			baseProps[this.props.propForOnChange] = this.onValueChange;
			baseProps[this.props.propForValue] = this.state.childValue;
		} else {
			baseProps[this.props.propForOnChange] = this._interceptChange(child.props[this.props.propForOnChange]);
		}

		Object.assign(baseProps, {
			onBlur: this.onBlur,
		});

		const childWithProps = React.cloneElement(child, baseProps);

		return (
			<div className={`${this.props.className} ${this.state.validity ? "valid" : "invalid"} ${this.state.showError ? "error" : ""}`}>{childWithProps}</div>
		);
	}
}

Validate.propTypes = {
	children: PropTypes.element.isRequired,
	validators: PropTypes.array.isRequired,
	onChangeValueKeys: PropTypes.array,
	defaultValue: PropTypes.string,
	errorText: PropTypes.string,
	className: PropTypes.string,
	propForValue: PropTypes.string,
	propForShowError: PropTypes.string,
	propForErrorText: PropTypes.string,
	propForOnChange: PropTypes.string,
	onValidChange: PropTypes.func,
	onErrorChange: PropTypes.func,
	passError: PropTypes.bool,
	impatientError: PropTypes.bool,
	feedbackOnMount: PropTypes.bool,
};

Validate.defaultProps = {
	defaultValue: "",
	onChangeValueKeys: ["target", "value"],
	propForShowError: "",
	propForErrorText: "errorText",
	propForValue: "value",
	propForOnChange: "onChange",
	id: "",
	validators: [],
	errorText: "",
	passError: false,
	impatientError: false,
	feedbackOnMount: false,
	className: "validate-component",
};
