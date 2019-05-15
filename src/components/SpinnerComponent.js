/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

const SpinnerComponent = props =>
    <div className="row">
        <div className="col-md-1 spinner">
            <div className="spinner-circle spinner-circle-outer"></div>
            <div className="spinner-circle-off spinner-circle-inner"></div>
            <div className="spinner-circle spinner-circle-single-1"></div>
            <div className="spinner-circle spinner-circle-single-2"></div>
        </div>
        <div className="col-md-11">
            <div className="text">{props.text}</div>
        </div>
    </div>

export default SpinnerComponent;

SpinnerComponent.propTypes = {
    text: PropTypes.string
}