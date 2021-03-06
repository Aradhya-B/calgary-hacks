import { RESET_STATE, SET_SUMMARY } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state='', action) {
  switch(action.type) {
    case SET_SUMMARY:
      return action.payload
    case RESET_STATE:
      return '';
    default:
      return state;
  }
}