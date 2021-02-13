import { GET_KEYWORD_MAP, SET_KEYWORD_MAP, GET_MODALS, ADD_MODAL, REMOVE_MODAL } from './types';

export const getKeywordMap = (state, id) => {
  return state.keywordMap ? state.keywordMap : {};
}

export const setKeywordMap = (keywordMap) => dispatch => {
  return dispatch({type: SET_KEYWORD_MAP, payload: keywordMap});
}

export const getModals = (state, id) => {
  return state.modals ? state.modals : [];
}

export const addModal = (modal) => dispatch => {
  return dispatch({type: ADD_MODAL, payload: modal});
}

export const removeModal = (modal) => dispatch => {
  return dispatch({type: REMOVE_MODAL, modal});
}