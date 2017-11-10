import { GET_USER } from './types';
import { GET_RESULTS } from './types';
import { GET_SAVED_ITEMS } from './types';
import axios from 'axios';

export const getUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  dispatch({ type: GET_USER, payload: res.data });
};

export const getResults = searchTerm => async dispatch => {
  const res = await axios.get(`/api/results/${searchTerm}`);
  dispatch({ type: GET_RESULTS, payload: res.data });
};

export const getSavedItems = () => async dispatch => {
  const res = await axios.get('/api/user');
  dispatch({ type: GET_SAVED_ITEMS, payload: res.data });
};

export const saveResultItem = resultObj => async dispatch => {
  const res = await axios.post('/api/user', resultObj);
  dispatch({ type: GET_SAVED_ITEMS, payload: res.data });
};

export const deleteSavedItem = id => async dispatch => {
  const res = await axios.get(`/api/user/${id}`);
  console.log(res.data);
  dispatch({ type: GET_SAVED_ITEMS, payload: res.data });
};
