import React, { useState } from "react";
import PropTypes from 'prop-types';
import * as DataUtils from './../utils/DataUtils'
import { getInputValue } from './../utils/InputUtils'

// Using React.memo causes Component only to rerender when the props change. 
const FormComponent = React.memo(props => {
  const [subject, setSubject] = useState('people');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSetSubject = e => {
    const value = getInputValue(e);
    setSubject(value);
    setSearchTerm("");    
    props.onChange(value, "");
  }     
  const handleSearchTerm = e => {
    const value = getInputValue(e);
    setSearchTerm(value);
    props.onChange(subject, value);
  }

  return (
    <form>
      <div className="form-row">
        <div className="formGroup col-md-6">
          <label>
            Pick your Star Wars Subject:
          <select name="subject" className="form-control" value={subject} onChange={handleSetSubject}>
              {DataUtils.subjects.map(item =>
                <option value={item.key} key={item.key}>{item.value}</option>
              )}
            </select>
          </label>
        </div>
        <div className="formGroup col-md-6">
          <label>
            Enter a filter term:
          <input name="searchTerm" className="form-control" type="text" value={searchTerm} onChange={handleSearchTerm} />
          </label>
        </div>
      </div>
    </form>
  );
});

export default FormComponent;

FormComponent.propTypes = {
  onChange: PropTypes.func.isRequired
};