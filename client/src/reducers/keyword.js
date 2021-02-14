import { GET_KEYWORD_MAP, RESET_STATE, SET_KEYWORD_MAP } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state={}, action) {
  switch(action.type) {
    case GET_KEYWORD_MAP:
    case SET_KEYWORD_MAP:
      return action.payload
    case RESET_STATE:
      return {};
    default:
      return state;
  }
}