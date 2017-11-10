import { GET_SAVED_ITEMS } from '../actions/types';
export default (state = [], action) => {
  switch (action.type) {
    case GET_SAVED_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
