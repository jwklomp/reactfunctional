/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";
import { pathOr } from 'ramda';

const ErrorComponent = props =>
    <div className="row error">An error has occured: {pathOr('', ['error', 'message'], props)}</div>;

export default ErrorComponent;

ErrorComponent.propTypes = {
    error: PropTypes.object
};