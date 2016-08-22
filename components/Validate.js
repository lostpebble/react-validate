import React, { Component, PropTypes } from 'react';

import uniqueId from 'lodash/uniqueId';

export default class Validate extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uncontrolled: true,
			childValue: props.defaultValue,
			isInvalid: false,
			id: props.id.length ? props.id : uniqueId('inptval_'),
		};

		this.onBlur = ::this.onBlur;
		this.onValueChange = ::this.onValueChange;
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
			!this.props.impatientError);
	}

	componentWillReceiveProps(nextProps) {
		// extreme edge case, if the user is setting the value of the component
		// from outside the component (eg. not using onChange) maybe from a date-picker?...
		if (!this.state.uncontrolled && !nextProps.children.props[this.props.onChangeProp]) {
			console.dir(nextProps);
			console.log(nextProps.children.props[this.props.onChangeProp]);

			// console.log("checking props");
			// this._checkValidation(nextProps.children.props[this.props.valueProp], !this.state.isInvalid ? !this.props.impatientError : true);
		}
	}

	componentWillUnmount() {
		if (this.props.validatorLeaveGroup) this.props.validatorLeaveGroup(this.state.id);
	}

	onValueChange(event) {
		this.setState({
			childValue: event.target.value,
		});

		this._checkValidation(event.target.value, !this.state.isInvalid ? !this.props.impatientError : false);
	}

	onBlur() {
		this._checkValidation(this.state.uncontrolled ? this.state.childValue : this.props.children.props[this.props.valueProp]);
	}

	interceptChange(originalOnChange) {
		return (changeEvent) => {
			if (typeof originalOnChange === 'function') {
				originalOnChange(changeEvent);
			}

			this.onValueChange(changeEvent);
		};
	}

	_checkValidation(value, patient) {
		let validState = true;

		// validation check
		if (this.props.validators.some((validator) => !validator(value))) {
			validState = false;
		}

		if (!patient) {
			this.setState({
				isInvalid: !validState,
			});
		}

		if (this.props.validChange) { this.props.validChange(validState); }
		if (this.props.validChangeInGroup) { this.props.validChangeInGroup(validState, this.state.id); }
	}

	render() {
		const child = React.Children.only(this.props.children);

		const baseProps = {};
		if (this.props.passError) baseProps[this.props.errorTextProp] = this.state.isInvalid ? this.props.errorText : "";
		if (this.props.showErrorProp.length) baseProps[this.props.showErrorProp] = this.state.isInvalid;
		if (this.state.uncontrolled) {
			baseProps[this.props.onChangeProp] = this.onValueChange;
			baseProps.value = this.state.childValue;
		} else {
			baseProps[this.props.onChangeProp] = this.interceptChange(child.props[this.props.onChangeProp]);
		}

		const newChildProps = Object.assign(baseProps, {
			onBlur: this.onBlur,
			onFocus: this.onFocus,
		});

		const childWithProps = React.cloneElement(child, newChildProps);

		let className = "validate-component";
		const typeofClassName = typeof this.props.className;
		if (typeofClassName === 'string' || typeofClassName === 'number') {
			className = this.props.className;
		}

		return (
			<div className={`${className} ${this.state.isInvalid ? "invalid" : "valid"}`}>{childWithProps}</div>
		);
	}
}

Validate.propTypes = {
	children: PropTypes.element.isRequired,
	validators: PropTypes.array.isRequired,
	defaultValue: PropTypes.string,
	errorText: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	errorTextProp: PropTypes.string,
	showErrorProp: PropTypes.string,
	valueProp: PropTypes.string,
	onChangeProp: PropTypes.string,
	validChange: PropTypes.func,
	passError: PropTypes.bool,
	impatientError: PropTypes.bool,
};

Validate.defaultProps = {
	defaultValue: "",
	errorTextProp: "errorText",
	showErrorProp: "",
	valueProp: "value",
	onChangeProp: "onChange",
	id: "",
	passError: false,
	impatientError: false,
};
