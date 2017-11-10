import { combineReducers } from 'redux';
import authReducer from './authReducer';
import resultsReducer from './resultsReducer';

export default combineReducers({
  auth: authReducer,
  results: resultsReducer
});
