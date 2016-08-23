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
		if (typeof this.props.children.props[this.props.valueProp] !== 'undefined') {
			this.setState({
				uncontrolled: false,
				childValue: this.props.children.props[this.props.valueProp],
			});
		}

		this._checkValidation(
			this.state.uncontrolled ?
				this.state.childValue : this.props.children.props[this.props.valueProp],
			!(this.props.feedbackOnMount || this.props.impatientError));
	}

	componentWillReceiveProps(nextProps) {
		// extreme edge case, if the user is setting the value of the component
		// from outside the component (eg. not using onChange) maybe from a date-picker?...
		if (!this.state.uncontrolled) {
			if (nextProps.children.props[this.props.valueProp] !== this.recentChange) {
				this._checkValidation(nextProps.children.props[this.props.valueProp], !this.state.showError ? !this.props.impatientError : false);
			}
		}
	}

	componentWillUnmount() {
		if (this.props.validatorLeaveGroup) this.props.validatorLeaveGroup(this.state.id);
	}

	onValueChange(event) {
		this.setState({
			childValue: event.target.value,
		});

		this._checkValidation(event.target.value, !this.state.showError ? !this.props.impatientError : false);
	}

	onBlur() {
		this._checkValidation(this.state.uncontrolled ? this.state.childValue : this.props.children.props[this.props.valueProp]);
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
			state.showError = !newValidity;
			if (this.props.onErrorChange) { this.props.onErrorChange(!newValidity); }
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
		if (this.props.passError) baseProps[this.props.errorTextProp] = this.state.showError ? this.props.errorText : "";
		if (this.props.showErrorProp.length) baseProps[this.props.showErrorProp] = this.state.showError;
		if (this.state.uncontrolled) {
			baseProps[this.props.onChangeProp] = this.onValueChange;
			baseProps.value = this.state.childValue;
		} else {
			baseProps[this.props.onChangeProp] = this._interceptChange(child.props[this.props.onChangeProp]);
		}

		const newChildProps = Object.assign(baseProps, {
			onBlur: this.onBlur,
			onFocus: this.onFocus,
		});

		const childWithProps = React.cloneElement(child, newChildProps);

		return (
			<div className={`${this.props.className} ${this.state.validity ? "valid" : "invalid"} ${this.state.showError ? "error" : ""}`}>{childWithProps}</div>
		);
	}
}

Validate.propTypes = {
	children: PropTypes.element.isRequired,
	validators: PropTypes.array.isRequired,
	targetValue: PropTypes.array,
	defaultValue: PropTypes.string,
	errorTextProp: PropTypes.string,
	errorText: PropTypes.string,
	className: PropTypes.string,
	showErrorProp: PropTypes.string,
	valueProp: PropTypes.string,
	onChangeProp: PropTypes.string,
	onValidChange: PropTypes.func,
	onErrorChange: PropTypes.func,
	passError: PropTypes.bool,
	impatientError: PropTypes.bool,
	feedbackOnMount: PropTypes.bool,
};

Validate.defaultProps = {
	defaultValue: "",
	targetValue: ["target", "value"],
	errorTextProp: "errorText",
	showErrorProp: "",
	valueProp: "value",
	onChangeProp: "onChange",
	id: "",
	validators: [],
	passError: false,
	impatientError: false,
	feedbackOnMount: false,
	className: "validate-component",
};
