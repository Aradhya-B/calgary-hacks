import { SET_KEYWORD_MAP, ADD_MODAL, REMOVE_MODAL, SET_SUMMARY, SET_ORIGINAL } from './types';

export const setKeywordMap = (keywordMap) => dispatch => {
  return dispatch({type: SET_KEYWORD_MAP, payload: keywordMap});
}

export const addModal = (modal) => dispatch => {
  return dispatch({type: ADD_MODAL, payload: modal});
}

export const removeModal = (keyword) => dispatch => {
  return dispatch({type: REMOVE_MODAL, payload: keyword});
}

export const setSummary = (text) => dispatch => {
  return dispatch({type: SET_SUMMARY, payload: text});
}

export const setOriginalNotes = (text) => dispatch => {
  return dispatch({type: SET_ORIGINAL, payload: text});
}