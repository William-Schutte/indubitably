import jobsStoreReducer from './jobsStoreReducer';

import { combineReducers } from 'redux';

// REDUCER, modifies STORE after ACTION
const allReducers = combineReducers({
  jobsStoreReducer
});

export default allReducers;
