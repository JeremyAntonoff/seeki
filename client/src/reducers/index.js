import { combineReducers } from 'redux';
import authReducer from './authReducer';
import resultsReducer from './resultsReducer';
import savedItemsReducer from './savedItemsReducer';

export default combineReducers({
  auth: authReducer,
  results: resultsReducer,
  savedItems: savedItemsReducer
});
