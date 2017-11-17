import React, { Component } from "react";
import PropTypes from "proptypes";

export default class ErrorMessage extends Component {
  render() {
    return (
      <div
        style={{ visibility: this.props.manual || this.props.visible ? "visible" : "hidden" }}
        className={`${this.props.className} ${this.props.visible ? "visible" : "hidden"}`}
      >
        {this.props.children}
      </div>
    );
  }
}

ErrorMessage.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  visible: PropTypes.bool,
  manual: PropTypes.bool,
};

ErrorMessage.defaultProps = {
  visible: false,
  manual: false,
  className: "rv-error-message",
};
