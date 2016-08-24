import React, { Component, PropTypes } from 'react';

export default class ErrorMessage extends Component {
	render() {
		return (
			<div style={{ visibility: (this.props.manual || this.props.visible) ? "visible" : "hidden" }} className={`${this.props.className} ${this.props.visible ? "visible" : "hidden"}`}>{this.props.children}</div>
		);
	}
}

ErrorMessage.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	visible: PropTypes.bool,
  manual: PropTypes.bool,
};

ErrorMessage.defaultProps = {
	visible: false,
  manual: false,
	className: "error-message",
};
