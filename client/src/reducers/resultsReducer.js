import { GET_RESULTS } from '../actions/types';
export default (state = null, action) => {
  switch (action.type) {
    case GET_RESULTS:
      if (action.payload.length > 1) {
        return action.payload;
      } else {
        return [];
      }
    default:
      return state;
  }
};
