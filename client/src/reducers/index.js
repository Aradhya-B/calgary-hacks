import { combineReducers } from 'redux';
import keywordReducer from './keyword';
import modalReducer from './modal';

const rootReducer = combineReducers({
  keywordMap: keywordReducer,
  modals: modalReducer
})

export default rootReducer;