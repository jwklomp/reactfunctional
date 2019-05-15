/* eslint-disable require-jsdoc */
import React from "react";
import PropTypes from "prop-types";

const TableRowComponent = props => {
    const objectValues = Object.values(props.item);
    return (<tr>
        <td>{objectValues[0]}</td>
        <td>{objectValues[1]}</td>
        <td>{objectValues[2]}</td>
        <td>{objectValues[3]}</td>
    </tr>)
}

export default TableRowComponent;

TableRowComponent.propTypes = {
    item: PropTypes.object.isRequired
}