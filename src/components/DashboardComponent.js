import React, { useEffect, useCallback, useReducer } from "react";
import ErrorComponent from './ErrorComponent';
import SpinnerComponent from './SpinnerComponent';
import TableComponent from './TableComponent';
import FormComponent from './FormComponent';
import * as DataUtils from '../utils/DataUtils'

const DashboardComponent = () => {
  const ONCHANGE = "onchange";
  const ERROR = "error";
  const SUCCESS = "success";

  const initialState = { error: null, isLoaded: false, items: [], subject: 'people', searchTerm: '' };

  const reducer = (state, action) => {
    switch (action.type) {
      case ONCHANGE:
        return { ...state, isLoaded: false, error: null, subject: action.subject, searchTerm: action.searchTerm };
      case ERROR:
        return { ...state, isLoaded: true, error: action.error };
      case SUCCESS:
        return { ...state, isLoaded: true, items: action.results };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const onSuccess = results => dispatch({ type: SUCCESS, results });
    const onError = error => dispatch({ type: ERROR, error });
    DataUtils.getStarWarsData(state.subject, state.searchTerm, onSuccess, onError);
  }, [state.subject, state.searchTerm]);

  // Create a memoized function to pass to FormComponent. This is necessary because otherwize the function reference is 
  // different on each render and the React.memo in FormComponent will not have any effect, resulting in endless rerender. 
  // Every value referenced inside the function should appear in the dependencies array, but in this case this is nothing.
  const memoizedHandleChange = useCallback((subject, searchTerm) => {
    dispatch({ type: ONCHANGE, subject, searchTerm });
  }, []);

  return (
    <div className='container'>
      <div className="row header">
        <img src="//cssanimation.rocks/demo/starwars/images/star.svg" alt="Star"></img>
        <img src="//cssanimation.rocks/demo/starwars/images/wars.svg" alt="Wars"></img>
      </div>
      <div className='row'>
        <h2 className="subtitle">If an item does not appear in our records, then is does not exist</h2>
      </div>
      <div className='row'>
        <div className="col-md-6">
          <FormComponent onChange={memoizedHandleChange} />
        </div>
        <div className="col-md-6">
          {!state.error && !state.isLoaded ? (
            <SpinnerComponent text="Searching Star Wars archives..." />
          ) : null}
        </div>
      </div>
      {state.error ? <ErrorComponent error={state.error} /> : null}
      {!state.error && state.isLoaded ? (
        <TableComponent
          data={state.items}
          title={state.items.length > 0 ? "The following results have been found" : "Your search returned no results. Try again."}
          subject={state.subject}
          headerFields={DataUtils.fieldsPerSubjectMap.get(state.subject)} />
      ) : null}
    </div>
  );
};

export default DashboardComponent;