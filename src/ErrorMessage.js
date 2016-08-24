import React, { Component, PropTypes } from 'react';

export default class ErrorMessage extends Component {
	render() {
		return (
			<div style={{ visibility: this.props.visible ? "visible" : "hidden" }} className={`${this.props.className}`}>{this.props.children}</div>
		);
	}
}

ErrorMessage.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	visible: PropTypes.bool,
};

ErrorMessage.defaultProps = {
	visible: false,
	className: "error-message",
};
