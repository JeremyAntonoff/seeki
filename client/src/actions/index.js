import { GET_USER } from './types';
import { GET_RESULTS } from './types';
import axios from 'axios';

export const getUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  dispatch({ type: GET_USER, payload: res.data });
};

export const getResults = searchTerm => async dispatch => {
  const res = await axios.get(`/api/results/${searchTerm}`);
  dispatch({ type: GET_RESULTS, payload: res.data.tracks.items });
};

export const saveResult = resultObj => async dispatch => {
  const saveResult = JSON.stringify(resultObj);
  const res = await axios.post('/api/saveitems', saveResult);
};
