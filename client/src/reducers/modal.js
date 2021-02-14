import { GET_MODALS, ADD_MODAL, REMOVE_MODAL } from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state=[], action) {
  switch(action.type) {
    case GET_MODALS:
      return action.payload
    case ADD_MODAL:
      let newState = [];

      const modalInState = state ? state.find(modal => modal.keyword === action.payload.keyword) : false;

      if(modalInState) {
        state.forEach(modal => {
          if(modal.keyword === action.payload.keyword) {
            newState.push(action.payload);
          } else {
            newState.push(modal);
          }
        })
        return newState;
      } else {
        return [...state, action.payload];
      }
    case REMOVE_MODAL: 
      return state.filter(modal => modal.keyword !== action.payload);
    default:
      return state;
  }
}